-- Newsletter double opt-in + rate-limit storage.
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement is idempotent.

create table if not exists public.newsletter_signups (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  status       text not null default 'pending'
               check (status in ('pending', 'confirmed', 'spam')),
  token        uuid not null default gen_random_uuid(),
  ip_address   text,
  user_agent   text,
  source       text,
  created_at   timestamptz not null default now(),
  confirmed_at timestamptz
);

-- Fast token lookup on confirmation.
create index if not exists newsletter_signups_token_idx
  on public.newsletter_signups (token);

-- Powers the per-IP / per-hour rate limit.
create index if not exists newsletter_signups_ip_created_idx
  on public.newsletter_signups (ip_address, created_at);

-- One confirmed subscriber per email (pending duplicates are allowed).
create unique index if not exists newsletter_signups_email_confirmed_idx
  on public.newsletter_signups (email)
  where status = 'confirmed';

-- Lock the table down. Only the server (service_role key) touches it, and
-- service_role bypasses RLS — so enabling RLS with no policies makes the table
-- unreadable via the public anon key while the API keeps working.
alter table public.newsletter_signups enable row level security;
