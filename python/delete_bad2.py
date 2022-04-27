import private
import psycopg2
import psycopg2.extras
import os
from os import walk

conn_string = private.conn_str
conn = psycopg2.connect(conn_string)

def get_image_filenames():
    f = []

    mypath = '/home/ec2-user/programming/birthplace/display/images/crop'
    for (dirpath, dirnames, filenames) in walk(mypath):
        f.extend(filenames)
        break

    return f

sql = """
select image from famous_06 where image <> 'Unknown'
"""
cur = conn.cursor()
cur.execute(sql)

db_images = []

for row in cur:
    i = row[0]
    db_images.append(i)

print(len(db_images))

files = get_image_filenames()

print(len(files))

for f in files:
    if not(f in db_images):
        # print("delete this image: {}".format(f))
        os.remove("""/home/ec2-user/programming/birthplace/display/images/crop/{}""".format(f))
