create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  service_interest text,
  preferred_date date,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_customer_email_idx on public.inquiries (customer_email);
