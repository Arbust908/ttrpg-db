-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.alternate_names (
  id integer NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  category text NOT NULL,
  slug text NOT NULL,
  CONSTRAINT alternate_names_pkey PRIMARY KEY (id)
);
CREATE TABLE public.full_game_data (
  id bigint NOT NULL,
  title text NOT NULL,
  description text,
  year integer,
  subtitle text,
  image_url text,
  thumbnail text,
  rating_geek numeric,
  rating_average numeric,
  rating_voters integer,
  rank_category text,
  rank_position integer,
  url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT full_game_data_pkey PRIMARY KEY (id)
);
CREATE TABLE public.game_alternate_names (
  game_id bigint NOT NULL,
  alternate_name_id integer NOT NULL,
  position smallint,
  CONSTRAINT game_alternate_names_pkey PRIMARY KEY (game_id, alternate_name_id),
  CONSTRAINT game_alternate_names_alternate_name_id_fkey FOREIGN KEY (alternate_name_id) REFERENCES public.alternate_names(id),
  CONSTRAINT game_alternate_names_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.full_game_data(id)
);
CREATE TABLE public.game_honors (
  game_id bigint NOT NULL,
  honor_id integer NOT NULL,
  position smallint,
  CONSTRAINT game_honors_pkey PRIMARY KEY (game_id, honor_id),
  CONSTRAINT game_honors_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.full_game_data(id),
  CONSTRAINT game_honors_honor_id_fkey FOREIGN KEY (honor_id) REFERENCES public.honors(id)
);
CREATE TABLE public.game_primary_names (
  game_id bigint NOT NULL,
  primary_name_id integer NOT NULL,
  position smallint,
  CONSTRAINT game_primary_names_pkey PRIMARY KEY (game_id, primary_name_id),
  CONSTRAINT game_primary_names_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.full_game_data(id),
  CONSTRAINT game_primary_names_primary_name_id_fkey FOREIGN KEY (primary_name_id) REFERENCES public.primary_names(id)
);
CREATE TABLE public.game_rpg_families (
  game_id bigint NOT NULL,
  rpg_family_id integer NOT NULL,
  position smallint,
  CONSTRAINT game_rpg_families_pkey PRIMARY KEY (game_id, rpg_family_id),
  CONSTRAINT game_rpg_families_rpg_family_id_fkey FOREIGN KEY (rpg_family_id) REFERENCES public.rpg_families(id),
  CONSTRAINT game_rpg_families_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.full_game_data(id)
);
CREATE TABLE public.game_rpg_mechanics (
  game_id bigint NOT NULL,
  rpg_mechanic_id integer NOT NULL,
  position smallint,
  CONSTRAINT game_rpg_mechanics_pkey PRIMARY KEY (game_id, rpg_mechanic_id),
  CONSTRAINT game_rpg_mechanics_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.full_game_data(id),
  CONSTRAINT game_rpg_mechanics_rpg_mechanic_id_fkey FOREIGN KEY (rpg_mechanic_id) REFERENCES public.rpg_mechanics(id)
);
CREATE TABLE public.game_rpg_systems (
  game_id bigint NOT NULL,
  rpg_system_id integer NOT NULL,
  position smallint,
  CONSTRAINT game_rpg_systems_pkey PRIMARY KEY (game_id, rpg_system_id),
  CONSTRAINT game_rpg_systems_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.full_game_data(id),
  CONSTRAINT game_rpg_systems_rpg_system_id_fkey FOREIGN KEY (rpg_system_id) REFERENCES public.rpg_systems(id)
);
CREATE TABLE public.honors (
  id integer NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  category text NOT NULL,
  slug text NOT NULL,
  CONSTRAINT honors_pkey PRIMARY KEY (id)
);
CREATE TABLE public.primary_names (
  id integer NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  category text NOT NULL,
  slug text NOT NULL,
  CONSTRAINT primary_names_pkey PRIMARY KEY (id)
);
CREATE TABLE public.rpg_families (
  id integer NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  category text NOT NULL,
  slug text NOT NULL,
  CONSTRAINT rpg_families_pkey PRIMARY KEY (id)
);
CREATE TABLE public.rpg_mechanics (
  id integer NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  category text NOT NULL,
  slug text NOT NULL,
  CONSTRAINT rpg_mechanics_pkey PRIMARY KEY (id)
);
CREATE TABLE public.rpg_systems (
  id integer NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  category text NOT NULL,
  slug text NOT NULL,
  CONSTRAINT rpg_systems_pkey PRIMARY KEY (id)
);
