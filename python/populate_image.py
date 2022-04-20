import private
import psycopg2
import psycopg2.extras
import requests
from bs4 import BeautifulSoup
import time
import urllib.request
import re

def get_image(name):

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }

    url = """https://en.wikipedia.org/wiki/{}""".format(name.replace(' ', '_'))
    
    req = requests.get(url, headers)
    soup = BeautifulSoup(req.content, 'html.parser')

    images_raw = soup.find_all('img')
    
    for image in images_raw:
        if(name.replace(' ', '_') in image['src'] and 'signatur' not in image['src'].lower() and 'autograph' not in image['src'].lower()):
            return("""https:{}""".format(image['src']))

conn_string = private.conn_str
conn = psycopg2.connect(conn_string)

sleep_secs = 2

sql = """
select 
    id,
    name
from famous_01
where image is NULL
order by id
--limit 100
"""
cur = conn.cursor()
cur.execute(sql)

index = 0
for row in cur:
    
    index = index + 1
    print('index', index)
    
    id = row[0]
    print('id', id)

    name = row[1]
    print('name', name)

    src = get_image(name)
    
    if(src == None):
        src = 'Unknown'

    if(src != 'Unknown'):
        local_img_name = """{}_{}""".format(id, name.lower().replace(' ', '_'))
        
        img_name = re.sub(r'[^\w\s]', '', local_img_name)

        if('.jpg' in src.lower()):
            local_img_name = img_name + '.jpg'

        if('.png' in src.lower()):
            local_img_name = img_name + '.png'

        if('.gif' in src.lower()):
            local_img_name = img_name + '.gif'

        urllib.request.urlretrieve(src, 'images/' + local_img_name)
    
    
    update_sql = """update famous_01 set image='{}' where id={};""".format(src, id)
    print(update_sql)

    update_cur = conn.cursor()
    update_cur.execute(update_sql)
    conn.commit()

    print("""sleeping {} secs...""".format(sleep_secs))
    time.sleep(sleep_secs)

    