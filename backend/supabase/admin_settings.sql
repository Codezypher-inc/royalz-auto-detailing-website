create table if not exists public.admin_settings (
  setting_key text primary key,
  setting_value text not null,
  updated_at timestamptz not null default now()
);

insert into public.admin_settings (setting_key, setting_value)
values ('email_recipient', 'admin@example.com')
on conflict (setting_key) do nothing;
