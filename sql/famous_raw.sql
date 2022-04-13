CREATE TABLE IF NOT EXISTS public.famous_raw
(
    en_curid character varying(256),
    lang character varying(256),
    name character varying(256),
    numlangs character varying(256),
    countryCode3 character varying(256),
    birthyear character varying(256),
    birthcity character varying(256),
    gender character varying(256),
    occupation character varying(256),
    industry character varying(256),
    domain character varying(256),
    yr2008_01 character varying(256),
    yr2008_02 character varying(256),
    yr2008_03 character varying(256),
    yr2008_04 character varying(256),
    yr2008_05 character varying(256),
    yr2008_06 character varying(256),
    yr2008_07 character varying(256),
    yr2008_08 character varying(256),
    yr2008_09 character varying(256),
    yr2008_10 character varying(256),
    yr2008_11 character varying(256),
    yr2008_12 character varying(256),
    yr2009_01 character varying(256),
    yr2009_02 character varying(256),
    yr2009_03 character varying(256),
    yr2009_04 character varying(256),
    yr2009_05 character varying(256),
    yr2009_06 character varying(256),
    yr2009_07 character varying(256),
    yr2009_08 character varying(256),
    yr2009_09 character varying(256),
    yr2009_10 character varying(256),
    yr2009_11 character varying(256),
    yr2009_12 character varying(256),
    yr2010_01 character varying(256),
    yr2010_02 character varying(256),
    yr2010_03 character varying(256),
    yr2010_04 character varying(256),
    yr2010_05 character varying(256),
    yr2010_06 character varying(256),
    yr2010_07 character varying(256),
    yr2010_08 character varying(256),
    yr2010_09 character varying(256),
    yr2010_10 character varying(256),
    yr2010_11 character varying(256),
    yr2010_12 character varying(256),
    yr2011_01 character varying(256),
    yr2011_02 character varying(256),
    yr2011_03 character varying(256),
    yr2011_04 character varying(256),
    yr2011_05 character varying(256),
    yr2011_06 character varying(256),
    yr2011_07 character varying(256),
    yr2011_08 character varying(256),
    yr2011_09 character varying(256),
    yr2011_10 character varying(256),
    yr2011_11 character varying(256),
    yr2011_12 character varying(256),
    yr2012_01 character varying(256),
    yr2012_02 character varying(256),
    yr2012_03 character varying(256),
    yr2012_04 character varying(256),
    yr2012_05 character varying(256),
    yr2012_06 character varying(256),
    yr2012_07 character varying(256),
    yr2012_08 character varying(256),
    yr2012_09 character varying(256),
    yr2012_10 character varying(256),
    yr2012_11 character varying(256),
    yr2012_12 character varying(256),
    yr2013_01 character varying(256),
    yr2013_02 character varying(256),
    yr2013_03 character varying(256),
    yr2013_04 character varying(256),
    yr2013_05 character varying(256),
    yr2013_06 character varying(256),
    yr2013_07 character varying(256),
    yr2013_08 character varying(256),
    yr2013_09 character varying(256),
    yr2013_10 character varying(256),
    yr2013_11 character varying(256),
    yr2013_12 character varying(256)
)

SELECT en_curid, lang, name, numlangs, countrycode3, birthyear, birthcity, gender, occupation, industry, domain, yr2008_01, yr2008_02, yr2008_03, yr2008_04, yr2008_05, yr2008_06, yr2008_07, yr2008_08, yr2008_09, yr2008_10, yr2008_11, yr2008_12, yr2009_01, yr2009_02, yr2009_03, yr2009_04, yr2009_05, yr2009_06, yr2009_07, yr2009_08, yr2009_09, yr2009_10, yr2009_11, yr2009_12, yr2010_01, yr2010_02, yr2010_03, yr2010_04, yr2010_05, yr2010_06, yr2010_07, yr2010_08, yr2010_09, yr2010_10, yr2010_11, yr2010_12, yr2011_01, yr2011_02, yr2011_03, yr2011_04, yr2011_05, yr2011_06, yr2011_07, yr2011_08, yr2011_09, yr2011_10, yr2011_11, yr2011_12, yr2012_01, yr2012_02, yr2012_03, yr2012_04, yr2012_05, yr2012_06, yr2012_07, yr2012_08, yr2012_09, yr2012_10, yr2012_11, yr2012_12, yr2013_01, yr2013_02, yr2013_03, yr2013_04, yr2013_05, yr2013_06, yr2013_07, yr2013_08, yr2013_09, yr2013_10, yr2013_11, yr2013_12
	FROM public.famous_raw limit 10;

create table famous as (
	with data as (
		select distinct 
			name,
			lower(gender)::varchar(10) as gender,
			lower(occupation)::varchar(256) as occupation,
			lower(domain)::varchar(256) as domain,
			birthcity as place_of_birth,
			countrycode3::varchar(3) as country_code
		from famous_raw
		order by 1
	)
	select 
		row_number() over() as id,
		* 
	from data
)

drop table famous
select * from famous

select * from countries limit 10

create table countries_04 as (
	SELECT 
		brk_name as name,
		brk_a3 as country_code,
		geom as shape
	FROM public.countries
	order by 1
)

\COPY public.famous_raw FROM program 'cmd /c "type D:\temp\supply_hist_current_year_04.csv"' WITH (FORMAT text, delimiter '|', NULL "NULL")

\COPY public.famous_raw FROM program '/home/ec2-user/programming/birthplace/sql/data/famous.tsv' WITH (FORMAT text, delimiter E'\t', NULL "NULL")

CREATE INDEX countries_shape_idx ON countries USING GIST(shape);

create table countries_05 as (
	SELECT 
		id,	
		name,
		country_code,
		shape
	FROM public.countries_04
	order by 1
)

select * from countries_05
drop table countries
drop table countries_02
drop table countries_03
drop table countries_04

ALTER TABLE countries_05 RENAME TO countries;
CREATE INDEX countries_shape_idx ON countries USING GIST(shape);
select * from countries

select distinct occupation from famous

select 
	*
from famous f
join countries c on c.country_code = f.country_code
where occupation = 'actor'
