create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  service_category_id text not null,
  service_category_name text not null,
  package_id text not null,
  package_name text not null,
  package_price numeric(10, 2) not null default 0,
  booking_date date not null,
  booking_time text not null,
  customer_first_name text not null,
  customer_last_name text not null,
  customer_email text not null,
  customer_phone text not null,
  vehicle_details text,
  notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists bookings_booking_date_idx on public.bookings (booking_date);
create index if not exists bookings_customer_email_idx on public.bookings (customer_email);
create unique index if not exists bookings_active_slot_unique_idx
on public.bookings (booking_date, booking_time)
where status in ('pending', 'confirmed', 'completed');
