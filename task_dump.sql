--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: page_title; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_title (
    id integer NOT NULL,
    title character varying(100),
    description character varying(200)
);


ALTER TABLE public.page_title OWNER TO postgres;

--
-- Name: page_title_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.page_title_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.page_title_id_seq OWNER TO postgres;

--
-- Name: page_title_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.page_title_id_seq OWNED BY public.page_title.id;


--
-- Name: tasky; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasky (
    id integer NOT NULL,
    name text,
    description text,
    status character varying(100),
    icon text,
    statusicon text
);


ALTER TABLE public.tasky OWNER TO postgres;

--
-- Name: tasky_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasky_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasky_id_seq OWNER TO postgres;

--
-- Name: tasky_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasky_id_seq OWNED BY public.tasky.id;


--
-- Name: page_title id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_title ALTER COLUMN id SET DEFAULT nextval('public.page_title_id_seq'::regclass);


--
-- Name: tasky id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasky ALTER COLUMN id SET DEFAULT nextval('public.tasky_id_seq'::regclass);


--
-- Data for Name: page_title; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.page_title (id, title, description) FROM stdin;
1	My task board	Task to keep you organised
\.


--
-- Data for Name: tasky; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasky (id, name, description, status, icon, statusicon) FROM stdin;
35	Service clientèle	 dfghjklkjhgfd	In Progress	https://img.icons8.com/emoji/48/books-emoji.png	https://img.icons8.com/badges/48/slice.png
34	mother	 fils sorry	Won't do	https://img.icons8.com/emoji/48/technologyst.png	https://img.icons8.com/pulsar-gradient/48/cancel.png
33	like we did it	inh!	Completed	https://img.icons8.com/emoji/48/person-lifting-weights.png	https://img.icons8.com/doodle/48/ok.png
36	Pomme	 vbv	Completed	https://img.icons8.com/emoji/48/alarm-clock-emoji.png	https://img.icons8.com/doodle/48/ok.png
37	bon	 test	Completed	https://img.icons8.com/emoji/48/books-emoji.png	https://img.icons8.com/doodle/48/ok.png
5	Read Documentation	Go through the new API documentation for integration.	Completed	https://img.icons8.com/emoji/48/books-emoji.png	https://img.icons8.com/doodle/48/ok.png
4	Workout	30 minutes of exercise to stay active and healthy.	In Progress	https://img.icons8.com/emoji/48/person-lifting-weights.png	https://img.icons8.com/badges/48/slice.png
38	ouhum	 ghj	Won't do	https://img.icons8.com/emoji/48/hot-beverage.png	https://img.icons8.com/pulsar-gradient/48/cancel.png
3	Coffee Breaky	Take a short break to refresh and recharge.	Won't do	https://img.icons8.com/emoji/48/hot-beverage.png	https://img.icons8.com/pulsar-gradient/48/cancel.png
2	Team Meeting	Discuss project updates and next steps with the team.	In Progress	https://img.icons8.com/emoji/48/speech-balloon.png	https://img.icons8.com/badges/48/slice.png
1	Develop APItrue	Create the backend API for user authentication.	Completed	https://img.icons8.com/emoji/48/technologyst.png	https://img.icons8.com/doodle/48/ok.png
32	the	 stiu	Won't do	https://img.icons8.com/emoji/48/alarm-clock-emoji.png	https://img.icons8.com/pulsar-gradient/48/cancel.png
\.


--
-- Name: page_title_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.page_title_id_seq', 1, true);


--
-- Name: tasky_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasky_id_seq', 38, true);


--
-- Name: page_title page_title_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_title
    ADD CONSTRAINT page_title_pkey PRIMARY KEY (id);


--
-- Name: tasky tasky_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasky
    ADD CONSTRAINT tasky_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

