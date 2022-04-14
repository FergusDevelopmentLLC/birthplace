import private
import psycopg2
import psycopg2.extras
from geopy.geocoders import Nominatim

conn_string = private.conn_str
conn = psycopg2.connect(conn_string)
# print(conn)

sql = """
select 
	f.id,
	f.name,
	f.birth_place, 
	c.name
from famous f
join countries c on c.country_code = f.country_code
where f.bp_lat is null
order by f.id
--limit 5000
"""
cur = conn.cursor()
cur.execute(sql)

geolocator = Nominatim(user_agent='myapplication')

for row in cur:
    
    try:
        location = geolocator.geocode(row[2] + " " + row[3])
    
        if(location):
            update_sql = """update famous set bp_lat={}, bp_lon={} where id={};""".format(location.raw["lat"], location.raw["lon"], row[0])
            print(update_sql)

            update_cur = conn.cursor()
            update_cur.execute(update_sql)
            conn.commit()

    except:
        print(print(row[0]))