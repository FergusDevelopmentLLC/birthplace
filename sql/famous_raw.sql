SELECT id, name, country_code, shape
FROM public.countries
limit 10;

CREATE INDEX countries_country_code_idx ON public.countries USING btree (country_code ASC NULLS LAST)


drop table famous;
select * from famous_raw where birthyear = '--1000'
select * from famous_raw where birthyear = '-310/-305'
select * from famous_raw where birthyear = '1237?'
1237?

select * from famous_raw where (birthyear ~* '[/]') is true

select * from famous_raw where birthcity = 'Unknown'

drop table famous;
" music"

create table famous_03 as (
	with data as (
		select distinct 
			name,
			lower(domain)::varchar(256) as domain,	
			trim(lower(industry))::varchar(256) as industry,
			lower(occupation)::varchar(256) as occupation,
			lower(gender)::varchar(10) as gender,	
			birthyear::integer as birth_year,
			birthcity as birth_place,
			NULL::numeric as bp_lat,
			NULL::numeric as bp_lon,
			countrycode3::varchar(3) as country_code
		from famous_raw
		where name not in ('Aisha bint Abu Bakr', 'Alboin', 'Anne Boleyn', 'Pope Sixtus I', 'Terah', 'Callimachus', 'Adam de la Halle', 'Yun Chi-ho') -- have weird birthyear
		and birthcity not in ('Unknown', '')
		and gender in ('Male', 'Female')
		and countrycode3 not in ('GIB', 'GLP', 'GUF', 'MTQ', 'PRT', 'PSE', 'SCG', 'SSD', 'TWN')
		order by 1
	)
	select 
		row_number() over() as id,
		* 
	from data
)

CREATE INDEX famous_country_code_idx ON public.famous USING btree (country_code ASC NULLS LAST)

select * from famous limit 100

select count(*) from famous
--10526

select * from famous where name = 'Mr. T'
select * from famous where name = 'Woody Allen'
select * from famous where name = 'Jeff Bridges'

select 
	f.*,
	c.name
from famous f
join countries c on c.country_code = f.country_code
--10526

select 
	f.*,
	c.name
from famous f
left join countries c on c.country_code = f.country_code
--10526

select 
	f.*,
	c.name
from famous f
join countries c on c.country_code = f.country_code

select 
	f.id,
	f.name,
	f.birth_place, 
	c.name
from famous f
join countries c on c.country_code = f.country_code

select 
	*
from famous
where bp_lat is null
order by id
--10301

2	"50 Cent"	"singer"	"arts"	1975	"male"	"Queens"	40.7135078	-73.8283132	"USA"
68	"Abraham Lincoln"	"politician"	"institutions"	1809	"male"	"Hodgenville"	37.5737487	-85.740353	"USA"

select 
	f.id,
	f.name,
	f.occupation,
	f.gender,
	f.birth_year,
	f.birth_place,
	st_setsrid(st_makepoint(bp_lon, bp_lat), 4326) as shape
from famous f
where bp_lat is not null
and birth_year = 1936

and occupation = 'actor'

select 
	f.id,
	f.name,
	f.occupation,
	f.gender,
	f.birth_year,
	f.birth_place,
	st_setsrid(st_makepoint(bp_lon, bp_lat), 4326) as shape
from famous f
where bp_lat is not null
and birth_place = 'Michigan City'

select 
	f.name,
	f.occupation,
	f.birth_year,
	f.birth_place	
from famous f
where bp_lat is not null
and birth_place = 'Hartford'

select 
	f.name,
	f.occupation,
	f.birth_year,
	f.birth_place	
from famous f
where bp_lat is not null
and birth_place = 'Dallas'

select 
	f.name,
	f.occupation,
	f.birth_year,
	f.birth_place	
from famous f
where bp_lat is not null
and occupation = 'pornographic actor'

select 
	f.name,
	f.occupation,
	f.birth_year,
	f.birth_place	
from famous f
where bp_lat is not null
and name = 'Mr. T'


select * from famous_01 limit 100

UPDATE famous_01
SET famous_01.bp_lat = famous.bp_lat
FROM famous
WHERE famous_01.id = famous.id
and famous_01.name = famous.name

UPDATE famous_01
SET bp_lat = famous.bp_lat
FROM famous
WHERE famous_01.name = famous.name

UPDATE famous_01
SET bp_lon = famous.bp_lon
FROM famous
WHERE famous_01.name = famous.name

select * 
from famous_01 
order by name
limit 100

select * from famous_01

alter table famous_01 add primary key (id);

create table famous_02 as (
	select * from famous_01 order by id
)

drop table famous
drop table famous_01
select * from famous_02

alter table famous_02 rename to famous

CREATE INDEX famous_country_code_idx ON public.famous USING btree (country_code ASC NULLS LAST)

select * from famous

alter table famous add primary key (id);

select * from famous where domain = 'arts'

select distinct domain from famous order by 1
"arts"
"business & law"
"exploration"
"humanities"
"institutions"
"public figure"
"science & technology"
"sports"

select distinct industry from famous order by 1
"activism"
"business"
"companions"
"computer science"
"dance"
"design"
"engineering"
"explorers"
"film and theatre"
"fine arts"
"government"
"history"
"individual sports"
"invention"
"language"
"law"
"math"
"media personality"
"medicine"
"military"
"music"
"natural sciences"
"outlaws"
"philosophy"
"religion"
"social sciences"
"team sports"

select distinct occupation from famous order by 1
"actor"
"american football player"
"anthropologist"
"archaeologist"
"architect"
"artist"
"astronaut"
"astronomer"
"athlete"
"baseball player"
"basketball player"
"biologist"
"boxer"
"businessperson"
"celebrity"
"chef"
"chemist"
"chessmaster"
"coach"
"comedian"
"comic artist"
"companion"
"composer"
"computer scientist"
"conductor"
"cricketer"
"critic"
"cyclist"
"dancer"
"designer"
"diplomat"
"economist"
"engineer"
"explorer"
"extremist"
"fashion designer"
"film director"
"game designer"
"geographer"
"geologist"
"golfer"
"gymnast"
"historian"
"hockey player"
"inventor"
"journalist"
"judge"
"lawyer"
"linguist"
"mafioso"
"magician"
"martial arts"
"mathematician"
"military personnel"
"model"
"mountaineer"
"musician"
"nobleman"
"painter"
"philosopher"
"photographer"
"physician"
"physicist"
"pilot"
"pirate"
"political scientist"
"politician"
"pornographic actor"
"presenter"
"producer"
"psychologist"
"public worker"
"racecar driver"
"referee"
"religious figure"
"sculptor"
"singer"
"skater"
"skier"
"snooker"
"soccer player"
"social activist"
"sociologist"
"statistician"
"swimmer"
"tennis player"
"wrestler"
"writer"

select * from famous where industry = 'companions'

