create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  phone text unique not null,
  name text not null,
  role text not null check (role in ('CHO', 'ANM', 'ASHA')),
  facility text not null,
  district text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- App access is gated to CHO only for now (see src/hooks/useAuth.ts).
-- ANM and ASHA rows can be seeded ahead of time; the client blocks sign-in
-- for any role other than 'CHO' until that flow ships.
