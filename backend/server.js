require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAILS = new Set(
  (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
);
const DEFAULT_TIME_SLOTS = ["09:00", "11:00", "13:00", "15:00"];
const ACTIVE_BOOKING_STATUSES = ["pending", "confirmed", "completed"];
const ALL_BOOKING_STATUSES = [...ACTIVE_BOOKING_STATUSES, "cancelled"];

function isValidDateValue(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime());
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in backend environment.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

app.use(
  cors({
    origin: FRONTEND_URL === "*" ? true : FRONTEND_URL.split(",").map((url) => url.trim()),
    credentials: false,
  })
);
app.use(express.json());

function normalizeAuthToken(headerValue) {
  if (!headerValue || !headerValue.startsWith("Bearer ")) {
    return null;
  }

  return headerValue.slice("Bearer ".length).trim();
}

function isAllowedAdmin(user) {
  const normalizedEmail = user?.email?.trim().toLowerCase();

  if (!normalizedEmail) {
    return false;
  }

  if (ADMIN_EMAILS.size === 0) {
    console.warn("ADMIN_EMAILS is empty. No users will be authorized for admin endpoints.");
    return false;
  }

  return ADMIN_EMAILS.has(normalizedEmail);
}

function createBookingReference() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `RZ-${timestamp}-${randomPart}`;
}

function normalizeBookingPayload(payload) {
  return {
    categoryId: payload?.categoryId?.trim() || "",
    categoryName: payload?.categoryName?.trim() || "",
    packageId: payload?.packageId?.trim() || "",
    packageName: payload?.packageName?.trim() || "",
    packagePrice: Number(payload?.packagePrice || 0),
    bookingDate: payload?.bookingDate?.trim() || "",
    bookingTime: payload?.bookingTime?.trim() || "",
    firstName: payload?.firstName?.trim() || "",
    lastName: payload?.lastName?.trim() || "",
    email: payload?.email?.trim().toLowerCase() || "",
    phone: payload?.phone?.trim() || "",
    vehicleDetails: payload?.vehicleDetails?.trim() || "",
    notes: payload?.notes?.trim() || "",
  };
}

function validateBookingPayload(payload) {
  const requiredFields = [
    ["categoryId", "Service category is required."],
    ["categoryName", "Service category label is required."],
    ["packageId", "Package selection is required."],
    ["packageName", "Package label is required."],
    ["bookingDate", "Booking date is required."],
    ["bookingTime", "Booking time is required."],
    ["firstName", "First name is required."],
    ["lastName", "Last name is required."],
    ["email", "Email is required."],
    ["phone", "Phone is required."],
  ];

  for (const [field, message] of requiredFields) {
    if (!payload[field]) {
      return message;
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return "Enter a valid email address.";
  }

  if (!isValidDateValue(payload.bookingDate)) {
    return "Choose a valid booking date.";
  }

  if (!DEFAULT_TIME_SLOTS.includes(payload.bookingTime)) {
    return "Choose a valid booking time.";
  }

  if (!Number.isFinite(payload.packagePrice) || payload.packagePrice < 0) {
    return "Package price must be a valid number.";
  }

  return null;
}

async function getAdminSetting(key, fallbackValue = "") {
  const { data, error } = await supabaseAdmin
    .from("admin_settings")
    .select("setting_value")
    .eq("setting_key", key)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.setting_value || fallbackValue;
}

async function upsertAdminSetting(key, value) {
  const { data, error } = await supabaseAdmin
    .from("admin_settings")
    .upsert(
      {
        setting_key: key,
        setting_value: value,
      },
      {
        onConflict: "setting_key",
      }
    )
    .select("setting_key, setting_value")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function getDateAvailability(date) {
  const [{ data: overrides, error: overridesError }, { data: bookings, error: bookingsError }] =
    await Promise.all([
      supabaseAdmin
        .from("booking_availability")
        .select("booking_time, is_available")
        .eq("booking_date", date),
      supabaseAdmin
        .from("bookings")
        .select("booking_time, status")
        .eq("booking_date", date)
        .in("status", ACTIVE_BOOKING_STATUSES),
    ]);

  if (overridesError) {
    throw overridesError;
  }

  if (bookingsError) {
    throw bookingsError;
  }

  const overrideMap = new Map(
    (overrides || []).map((slot) => [slot.booking_time, slot.is_available])
  );
  const bookedSet = new Set((bookings || []).map((booking) => booking.booking_time));

  const slots = DEFAULT_TIME_SLOTS.map((time) => {
    const blockedByAdmin = overrideMap.get(time) === false;
    const booked = bookedSet.has(time);

    return {
      time,
      available: !blockedByAdmin && !booked,
      blockedByAdmin,
      booked,
    };
  });

  return {
    date,
    slots,
    availableSlots: slots.filter((slot) => slot.available).map((slot) => slot.time),
  };
}

async function requireAdmin(req, res, next) {
  const accessToken = normalizeAuthToken(req.headers.authorization);

  if (!accessToken) {
    return res.status(401).json({ error: "Missing authorization token." });
  }

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    return res.status(401).json({ error: error?.message || "Invalid session." });
  }

  if (!isAllowedAdmin(data.user)) {
    return res.status(403).json({ error: "This account is not authorized for admin access." });
  }

  req.adminUser = data.user;
  req.accessToken = accessToken;
  return next();
}

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "royalz-render-backend" });
});

app.get("/api/booking-availability", async (req, res) => {
  const date = `${req.query.date || ""}`.trim();

  if (!date) {
    return res.status(400).json({ error: "A booking date is required." });
  }

  if (!isValidDateValue(date)) {
    return res.status(400).json({ error: "Enter a valid booking date." });
  }

  try {
    const availability = await getDateAvailability(date);
    return res.json(availability);
  } catch (error) {
    console.error("Unable to load booking availability.", error);
    return res.status(500).json({ error: "Unable to load booking availability." });
  }
});

app.post("/api/bookings", async (req, res) => {
  const booking = normalizeBookingPayload(req.body || {});
  const validationError = validateBookingPayload(booking);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const availability = await getDateAvailability(booking.bookingDate);

    if (!availability.availableSlots.includes(booking.bookingTime)) {
      return res.status(409).json({
        error: "That date and time is no longer available. Please choose another slot.",
      });
    }
  } catch (error) {
    console.error("Unable to validate booking availability.", error);
    return res.status(500).json({
      error: "Unable to validate booking availability right now. Please try again.",
    });
  }

  const reference = createBookingReference();

  const insertPayload = {
    reference,
    service_category_id: booking.categoryId,
    service_category_name: booking.categoryName,
    package_id: booking.packageId,
    package_name: booking.packageName,
    package_price: booking.packagePrice,
    booking_date: booking.bookingDate,
    booking_time: booking.bookingTime,
    customer_first_name: booking.firstName,
    customer_last_name: booking.lastName,
    customer_email: booking.email,
    customer_phone: booking.phone,
    vehicle_details: booking.vehicleDetails || null,
    notes: booking.notes || null,
    status: "pending",
  };

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert(insertPayload)
    .select("id, reference, status, booking_date, booking_time, package_name")
    .single();

  if (error) {
    console.error("Unable to save booking.", error);

    if (`${error.message || ""}`.toLowerCase().includes("duplicate")) {
      return res.status(409).json({
        error: "That date and time is already booked. Please choose another slot.",
      });
    }

    return res.status(500).json({
      error:
        "Unable to save the booking. Check the Supabase bookings table and backend service role configuration.",
    });
  }

  return res.status(201).json({
    message: "Booking request saved successfully.",
    booking: data,
  });
});

app.get("/api/auth/session", requireAdmin, async (req, res) => {
  return res.json({
    user: {
      id: req.adminUser.id,
      email: req.adminUser.email,
    },
  });
});

app.get("/api/admin/dashboard", requireAdmin, async (req, res) => {
  try {
    const [{ data: bookings, error: bookingsError }, emailRecipient] = await Promise.all([
      supabaseAdmin
        .from("bookings")
        .select(
          "id, reference, status, booking_date, booking_time, package_name, service_category_name, customer_first_name, customer_last_name, customer_email, customer_phone, vehicle_details, notes, created_at"
        )
        .order("created_at", { ascending: false })
        .limit(50),
      getAdminSetting("email_recipient", req.adminUser.email || "admin@example.com"),
    ]);

    if (bookingsError) {
      throw bookingsError;
    }

    const formattedBookings = (bookings || []).map((booking) => ({
      id: booking.id,
      reference: booking.reference,
      status: booking.status,
      name: `${booking.customer_first_name} ${booking.customer_last_name}`.trim(),
      email: booking.customer_email,
      phone: booking.customer_phone,
      bookingType: booking.package_name,
      serviceCategory: booking.service_category_name,
      date: booking.booking_date,
      time: booking.booking_time,
      details: booking.vehicle_details || booking.notes || "No extra details provided.",
      createdAt: booking.created_at,
    }));

    const statusCounts = formattedBookings.reduce(
      (counts, booking) => {
        counts.total += 1;
        counts[booking.status] = (counts[booking.status] || 0) + 1;
        return counts;
      },
      { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 }
    );

    return res.json({
      emailRecipient,
      customers: formattedBookings,
      stats: statusCounts,
    });
  } catch (error) {
    console.error("Unable to load admin dashboard.", error);
    return res.status(500).json({
      error:
        "Unable to load dashboard data. Check the Supabase bookings and admin_settings tables.",
    });
  }
});

app.get("/api/admin/availability", requireAdmin, async (req, res) => {
  const date = `${req.query.date || ""}`.trim();

  if (!date) {
    return res.status(400).json({ error: "A booking date is required." });
  }

  if (!isValidDateValue(date)) {
    return res.status(400).json({ error: "Enter a valid booking date." });
  }

  try {
    const availability = await getDateAvailability(date);
    return res.json(availability);
  } catch (error) {
    console.error("Unable to load admin availability.", error);
    return res.status(500).json({ error: "Unable to load availability." });
  }
});

app.put("/api/admin/availability", requireAdmin, async (req, res) => {
  const date = `${req.body?.bookingDate || ""}`.trim();
  const time = `${req.body?.bookingTime || ""}`.trim();
  const isAvailable = Boolean(req.body?.isAvailable);

  if (!date || !time) {
    return res.status(400).json({ error: "Booking date and time are required." });
  }

  if (!isValidDateValue(date)) {
    return res.status(400).json({ error: "Enter a valid booking date." });
  }

  if (!DEFAULT_TIME_SLOTS.includes(time)) {
    return res.status(400).json({ error: "Invalid booking time." });
  }

  try {
    const { data: bookedRow, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .select("id")
      .eq("booking_date", date)
      .eq("booking_time", time)
      .in("status", ACTIVE_BOOKING_STATUSES)
      .maybeSingle();

    if (bookingError) {
      throw bookingError;
    }

    if (bookedRow && isAvailable) {
      return res.status(409).json({
        error: "That slot is already booked. Update the booking status before reopening it.",
      });
    }

    const { error } = await supabaseAdmin.from("booking_availability").upsert(
      {
        booking_date: date,
        booking_time: time,
        is_available: isAvailable,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "booking_date,booking_time",
      }
    );

    if (error) {
      throw error;
    }

    const availability = await getDateAvailability(date);
    return res.json({
      message: "Availability updated.",
      ...availability,
    });
  } catch (error) {
    console.error("Unable to update availability.", error);
    return res.status(500).json({ error: "Unable to update availability." });
  }
});

app.put("/api/admin/bookings/:bookingId/status", requireAdmin, async (req, res) => {
  const bookingId = `${req.params.bookingId || ""}`.trim();
  const nextStatus = `${req.body?.status || ""}`.trim().toLowerCase();

  if (!bookingId) {
    return res.status(400).json({ error: "Booking id is required." });
  }

  if (!ALL_BOOKING_STATUSES.includes(nextStatus)) {
    return res.status(400).json({ error: "Choose a valid booking status." });
  }

  try {
    const { data: existingBooking, error: existingBookingError } = await supabaseAdmin
      .from("bookings")
      .select("id, reference, status, booking_date, booking_time")
      .eq("id", bookingId)
      .maybeSingle();

    if (existingBookingError) {
      throw existingBookingError;
    }

    if (!existingBooking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    const { data: updatedBooking, error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({ status: nextStatus })
      .eq("id", bookingId)
      .select("id, reference, status, booking_date, booking_time")
      .single();

    if (updateError) {
      const lowerMessage = `${updateError.message || ""}`.toLowerCase();

      if (lowerMessage.includes("duplicate")) {
        return res.status(409).json({
          error:
            "That slot is already reserved by another active booking, so this status update cannot be applied.",
        });
      }

      throw updateError;
    }

    const availability = await getDateAvailability(updatedBooking.booking_date);

    return res.json({
      message: `Booking marked as ${nextStatus}.`,
      booking: updatedBooking,
      availability,
    });
  } catch (error) {
    console.error("Unable to update booking status.", error);
    return res.status(500).json({ error: "Unable to update booking status." });
  }
});

app.put("/api/admin/email-recipient", requireAdmin, async (req, res) => {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const setting = await upsertAdminSetting("email_recipient", email.trim().toLowerCase());

    return res.json({
      message: "Email recipient updated.",
      emailRecipient: setting.setting_value,
    });
  } catch (error) {
    console.error("Unable to update email recipient.", error);
    return res.status(500).json({
      error:
        "Unable to update the email recipient. Check the Supabase admin_settings table.",
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Render backend listening on port ${PORT}`);
});
