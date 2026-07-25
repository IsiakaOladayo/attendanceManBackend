--
-- PostgreSQL database dump
--

\restrict 1w3SAg3oMgO01mpo0KzffOgXoydigNfaSOR27mii6SyVIYUnlcvEWAzeDwT5tMQ

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: allowed_networks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.allowed_networks (
    id integer NOT NULL,
    ssid character varying(100),
    bssid character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.allowed_networks OWNER TO postgres;

--
-- Name: allowed_networks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.allowed_networks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.allowed_networks_id_seq OWNER TO postgres;

--
-- Name: allowed_networks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.allowed_networks_id_seq OWNED BY public.allowed_networks.id;


--
-- Name: attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance (
    id integer NOT NULL,
    user_id integer NOT NULL,
    check_in timestamp without time zone NOT NULL,
    check_out timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.attendance OWNER TO postgres;

--
-- Name: attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attendance_id_seq OWNER TO postgres;

--
-- Name: attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attendance_id_seq OWNED BY public.attendance.id;


--
-- Name: biometric_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.biometric_sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    verified_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.biometric_sessions OWNER TO postgres;

--
-- Name: biometric_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.biometric_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.biometric_sessions_id_seq OWNER TO postgres;

--
-- Name: biometric_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.biometric_sessions_id_seq OWNED BY public.biometric_sessions.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role_name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    role_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: allowed_networks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allowed_networks ALTER COLUMN id SET DEFAULT nextval('public.allowed_networks_id_seq'::regclass);


--
-- Name: attendance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance ALTER COLUMN id SET DEFAULT nextval('public.attendance_id_seq'::regclass);


--
-- Name: biometric_sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.biometric_sessions ALTER COLUMN id SET DEFAULT nextval('public.biometric_sessions_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: allowed_networks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.allowed_networks (id, ssid, bssid, created_at) FROM stdin;
1	Unilorin_Cloud	98:A9:42:45:BE:F2	2026-07-20 03:28:13.965635
\.


--
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance (id, user_id, check_in, check_out, created_at) FROM stdin;
1	1	2026-07-20 03:45:25.504734	2026-07-20 04:00:45.130455	2026-07-20 03:45:25.504734
\.


--
-- Data for Name: biometric_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.biometric_sessions (id, user_id, verified_at) FROM stdin;
1	1	2026-07-20 00:09:54.086204
2	1	2026-07-20 03:59:52.89293
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, role_name) FROM stdin;
1	Admin
2	Lecturer
3	Student
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role_id, created_at) FROM stdin;
1	Admin User	admin@test.com	$2b$10$Nvvi6qiCWKG7pKsMXD2ZweuWUiMvP2F/IN88KxxOaop83OOOABPaS	1	2026-07-19 23:40:18.780199
2	Isiaka Ismail	adminismail@test.com	$2b$10$8hiNrYTcTuImQjHm0ifdfOyhl9M5GdQgAQlMsVFq39mOD/BOdrkLG	3	2026-07-20 04:31:05.192939
4	Dele John	delejohn@test.com	$2b$10$W1WI6gGxHniYxKEQtGwkJ.OPl7p/1gHy/Co9avGs4/awCWMctYVqu	3	2026-07-20 05:09:42.513072
5	Victor Onyekayi	victoronyekachi@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:12:06.494637
6	Adebayo Ibrahim	adebayo.ibrahim@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
8	Musa Abdullahi	musa.abdullahi@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
9	Fatima Bello	fatima.bello@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
10	Emmanuel Johnson	emmanuel.johnson@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
11	Blessing Eze	blessing.eze@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
12	Oluwaseun Adewale	oluwaseun.adewale@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
13	Maryam Yusuf	maryam.yusuf@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
14	Samuel Ojo	samuel.ojo@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
15	Grace Nwosu	grace.nwosu@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
16	Chinedu Umeh	chinedu.umeh@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
17	Aisha Garba	aisha.garba@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
18	David Ekanem	david.ekanem@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
19	Esther Akinola	esther.akinola@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
20	Ifeanyi Nnamdi	ifeanyi.nnamdi@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
21	Halima Suleiman	halima.suleiman@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
22	Precious Daniels	precious.daniels@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
23	Tunde Alabi	tunde.alabi@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
24	Zainab Mohammed	zainab.mohammed@markme.com	$2b$10$11h8zS0H9BV2HzWOIB0JY.exQqjkBJ5Q1ffj1.Sb9cxt2lafBn.y2	3	2026-07-20 09:22:19.87954
25	Prof. Salman Abdrahman	salmanrahman@markme.com	$2b$10$TpI/3CHgAIC.y15eDyW.PO2Yu.AqW/bimZP1w8vL34zAa3qxutv7O	2	2026-07-20 09:41:27.798185
\.


--
-- Name: allowed_networks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.allowed_networks_id_seq', 1, true);


--
-- Name: attendance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attendance_id_seq', 1, true);


--
-- Name: biometric_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.biometric_sessions_id_seq', 2, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 25, true);


--
-- Name: allowed_networks allowed_networks_bssid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allowed_networks
    ADD CONSTRAINT allowed_networks_bssid_key UNIQUE (bssid);


--
-- Name: allowed_networks allowed_networks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allowed_networks
    ADD CONSTRAINT allowed_networks_pkey PRIMARY KEY (id);


--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- Name: biometric_sessions biometric_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.biometric_sessions
    ADD CONSTRAINT biometric_sessions_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: attendance attendance_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: biometric_sessions fk_biometric_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.biometric_sessions
    ADD CONSTRAINT fk_biometric_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 1w3SAg3oMgO01mpo0KzffOgXoydigNfaSOR27mii6SyVIYUnlcvEWAzeDwT5tMQ

