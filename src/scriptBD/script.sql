CREATE TABLE IF NOT EXISTS public.mutantes
(
    dna character varying(120) COLLATE pg_catalog."default" NOT NULL,
    esmutant boolean,
    CONSTRAINT mutante_pkey PRIMARY KEY (dna)
)