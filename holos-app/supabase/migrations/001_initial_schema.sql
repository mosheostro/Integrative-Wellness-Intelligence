-- ============================================================
-- HOLOS — Initial Schema
-- Run in Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── Profiles ─────────────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text unique not null,
  full_name   text,
  avatar_url  text,
  role        text not null default 'user' check (role in ('user','coach','admin')),
  locale      text not null default 'en' check (locale in ('en','ru','he')),
  timezone    text default 'UTC',
  onboarded   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Assessments ───────────────────────────────────────────────
create table public.assessments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  framework       text not null default 'swarga',
  status          text not null default 'in_progress' check (status in ('in_progress','completed','abandoned')),
  wellness_state  text,
  composite_score integer,
  started_at      timestamptz not null default now(),
  completed_at    timestamptz,
  version         integer not null default 1
);

-- ── Assessment answers ─────────────────────────────────────────
create table public.answers (
  id              uuid primary key default gen_random_uuid(),
  assessment_id   uuid not null references public.assessments(id) on delete cascade,
  question_id     text not null,
  question_text   text not null,
  option_index    integer not null,
  option_text     text not null,
  dimension       text not null,
  answered_at     timestamptz not null default now()
);

-- ── Dimension scores ───────────────────────────────────────────
create table public.dimension_scores (
  id              uuid primary key default gen_random_uuid(),
  assessment_id   uuid not null references public.assessments(id) on delete cascade,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  framework       text not null,
  nutrition       integer not null default 0 check (nutrition between 0 and 100),
  sleep           integer not null default 0 check (sleep between 0 and 100),
  recovery        integer not null default 0 check (recovery between 0 and 100),
  stress          integer not null default 0 check (stress between 0 and 100),
  movement        integer not null default 0 check (movement between 0 and 100),
  emotional       integer not null default 0 check (emotional between 0 and 100),
  life_balance    integer not null default 0 check (life_balance between 0 and 100),
  purpose         integer not null default 0 check (purpose between 0 and 100),
  energy          integer not null default 0 check (energy between 0 and 100),
  composite       integer not null default 0 check (composite between 0 and 100),
  recorded_at     timestamptz not null default now()
);

-- ── Framework-specific results ────────────────────────────────
create table public.framework_results (
  id              uuid primary key default gen_random_uuid(),
  assessment_id   uuid not null references public.assessments(id) on delete cascade,
  framework       text not null,
  -- Ayurveda / Swarga
  dosha_vata      integer,
  dosha_pitta     integer,
  dosha_kapha     integer,
  dominant_dosha  text,
  -- Five elements
  element_wood    integer,
  element_fire    integer,
  element_earth   integer,
  element_metal   integer,
  element_water   integer,
  -- Framework narrative (AI-generated or template)
  narrative       text,
  raw_data        jsonb,
  created_at      timestamptz not null default now()
);

-- ── Recommendations (issued to user) ──────────────────────────
create table public.issued_recommendations (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  assessment_id       uuid references public.assessments(id),
  rec_id              text not null,   -- references the static recommendation catalogue
  category            text not null,
  title               text not null,
  description         text not null,
  impact_score        integer not null default 50,
  difficulty_score    integer not null default 50,
  priority_score      integer not null default 50,
  framework           text not null,
  status              text not null default 'active' check (status in ('active','completed','dismissed','snoozed')),
  due_date            date,
  completed_at        timestamptz,
  issued_at           timestamptz not null default now()
);

-- ── Habits ────────────────────────────────────────────────────
create table public.habits (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  rec_id          text,
  title           text not null,
  description     text,
  frequency       text not null default 'daily' check (frequency in ('daily','weekly','monthly')),
  streak_current  integer not null default 0,
  streak_best     integer not null default 0,
  total_completions integer not null default 0,
  last_completed  date,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ── Habit completions ─────────────────────────────────────────
create table public.habit_completions (
  id          uuid primary key default gen_random_uuid(),
  habit_id    uuid not null references public.habits(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  completed_at date not null default current_date,
  notes       text
);

-- ── Goals ─────────────────────────────────────────────────────
create table public.goals (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  title           text not null,
  description     text,
  category        text not null,
  target_score    integer,
  current_score   integer,
  target_date     date,
  status          text not null default 'active' check (status in ('active','achieved','paused','abandoned')),
  created_at      timestamptz not null default now()
);

-- ── Coaching sessions ─────────────────────────────────────────
create table public.coaching_sessions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  title           text,
  messages        jsonb not null default '[]',
  context_memory  jsonb not null default '{}',
  framework       text,
  session_mode    text default 'general',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── Achievements ──────────────────────────────────────────────
create table public.achievements (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  achievement_id  text not null,
  title           text not null,
  description     text,
  icon            text,
  category        text,
  xp_awarded      integer not null default 0,
  earned_at       timestamptz not null default now(),
  unique (user_id, achievement_id)
);

-- ── User XP / levels ─────────────────────────────────────────
create table public.user_progress (
  user_id     uuid primary key references public.profiles(id) on delete cascade,
  total_xp    integer not null default 0,
  level       integer not null default 1,
  updated_at  timestamptz not null default now()
);

-- ── Progress snapshots (for trend charts) ────────────────────
create table public.progress_snapshots (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  snapshot_date   date not null default current_date,
  composite       integer,
  nutrition       integer,
  sleep           integer,
  recovery        integer,
  stress          integer,
  movement        integer,
  emotional       integer,
  life_balance    integer,
  purpose         integer,
  energy          integer,
  wellness_state  text,
  unique (user_id, snapshot_date)
);

-- ── Notifications ─────────────────────────────────────────────
create table public.notifications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  type        text not null,
  title       text not null,
  body        text,
  read        boolean not null default false,
  action_url  text,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, locale, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    coalesce(new.raw_user_meta_data->>'locale', 'en'),
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  insert into public.user_progress (user_id) values (new.id);
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql
as $$ begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger coaching_updated_at before update on public.coaching_sessions
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- RLS POLICIES
-- ============================================================

alter table public.profiles enable row level security;
alter table public.assessments enable row level security;
alter table public.answers enable row level security;
alter table public.dimension_scores enable row level security;
alter table public.framework_results enable row level security;
alter table public.issued_recommendations enable row level security;
alter table public.habits enable row level security;
alter table public.habit_completions enable row level security;
alter table public.goals enable row level security;
alter table public.coaching_sessions enable row level security;
alter table public.achievements enable row level security;
alter table public.user_progress enable row level security;
alter table public.progress_snapshots enable row level security;
alter table public.notifications enable row level security;

-- Helper
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public
as $$ select exists(select 1 from profiles where id = auth.uid() and role = 'admin'); $$;

-- Own-row policies (pattern: auth.uid() = user_id / id)
create policy "own_profile" on public.profiles for all using (auth.uid() = id);
create policy "own_assessments" on public.assessments for all using (auth.uid() = user_id);
create policy "own_answers" on public.answers for all using (
  exists(select 1 from assessments where id = answers.assessment_id and user_id = auth.uid())
);
create policy "own_scores" on public.dimension_scores for all using (auth.uid() = user_id);
create policy "own_fw_results" on public.framework_results for all using (
  exists(select 1 from assessments where id = framework_results.assessment_id and user_id = auth.uid())
);
create policy "own_recs" on public.issued_recommendations for all using (auth.uid() = user_id);
create policy "own_habits" on public.habits for all using (auth.uid() = user_id);
create policy "own_completions" on public.habit_completions for all using (auth.uid() = user_id);
create policy "own_goals" on public.goals for all using (auth.uid() = user_id);
create policy "own_sessions" on public.coaching_sessions for all using (auth.uid() = user_id);
create policy "own_achievements" on public.achievements for all using (auth.uid() = user_id);
create policy "own_progress" on public.user_progress for all using (auth.uid() = user_id);
create policy "own_snapshots" on public.progress_snapshots for all using (auth.uid() = user_id);
create policy "own_notifications" on public.notifications for all using (auth.uid() = user_id);

-- Admins see all
create policy "admin_profiles" on public.profiles for all using (is_admin());
