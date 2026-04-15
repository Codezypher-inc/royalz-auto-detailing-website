create table if not exists public.booking_availability (
  booking_date date not null,
  booking_time text not null,
  is_available boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (booking_date, booking_time)
);
