require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

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

const adminState = {
  emailRecipient: "admin@example.com",
  customers: [
    {
      name: "John Doe",
      email: "john@example.com",
      bookingType: "Full Detailing",
      date: "2026-03-20",
      time: "10:00 AM",
      details: "Sedan, Black, Interior+Exterior",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      bookingType: "Express Wash",
      date: "2026-03-21",
      time: "2:30 PM",
      details: "SUV, White, Exterior Only",
    },
    {
      name: "Mike Brown",
      email: "mike@example.com",
      bookingType: "Ceramic Coating",
      date: "2026-03-22",
      time: "9:00 AM",
      details: "Coupe, Red, Premium Package",
    },
  ],
};

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

async function requireAdmin(req, res, next) {
  const accessToken = normalizeAuthToken(req.headers.authorization);

  if (!accessToken) {
    return res.status(401).json({ error: "Missing authorization token." });
  }

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    return res.status(401).json({ error: error?.message || "Invalid session." });
  }

  req.adminUser = data.user;
  req.accessToken = accessToken;
  return next();
}

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "royalz-render-backend" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session || !data.user) {
    return res.status(401).json({ error: error?.message || "Unable to log in." });
  }

  return res.json({
    message: "Login successful.",
    user: {
      id: data.user.id,
      email: data.user.email,
    },
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
      token_type: data.session.token_type,
    },
  });
});

app.post("/api/auth/reset-password", async (req, res) => {
  const { email, redirectTo } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({ message: "Password reset email sent." });
});

app.get("/api/auth/session", requireAdmin, async (req, res) => {
  return res.json({
    user: {
      id: req.adminUser.id,
      email: req.adminUser.email,
    },
  });
});

app.post("/api/auth/logout", requireAdmin, async (req, res) => {
  return res.json({ message: "Logged out." });
});

app.get("/api/admin/dashboard", requireAdmin, (req, res) => {
  res.json({
    emailRecipient: adminState.emailRecipient,
    customers: adminState.customers,
  });
});

app.put("/api/admin/email-recipient", requireAdmin, (req, res) => {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  adminState.emailRecipient = email;

  return res.json({
    message: "Email recipient updated.",
    emailRecipient: adminState.emailRecipient,
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Render backend listening on port ${PORT}`);
});
