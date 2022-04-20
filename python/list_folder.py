import private
import psycopg2
import psycopg2.extras
from os import walk

def get_image_filenames():
    f = []

    mypath = '/home/ec2-user/programming/birthplace/python/images'
    for (dirpath, dirnames, filenames) in walk(mypath):
        f.extend(filenames)
        break

    return f

conn_string = private.conn_str
conn = psycopg2.connect(conn_string)

sleep_secs = 2

sql = """
select 
    id,
    name
from famous_03
"""
cur = conn.cursor()
cur.execute(sql)

for row in cur:
    
    id = row[0]
    # print('id', id)

    name = row[1]
    # print('name', name)
    
    local_images = get_image_filenames()

    for image in local_images:

        img_id = image.split('_')[0]

        if(int(img_id) == int(id)):
            update_sql = """update famous_03 set image='{}' where id={};""".format(image, id)
        
            print(update_sql)

            update_cur = conn.cursor()
            update_cur.execute(update_sql)
            conn.commit()