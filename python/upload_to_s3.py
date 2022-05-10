import boto3
import private
from os import walk

def get_files_in_local(path):
    
    f = []
    for (dirpath, dirnames, filenames) in walk(path):
        f.extend(filenames)
        break

    return f

session = boto3.Session(aws_access_key_id = private.aws_access_key_id, aws_secret_access_key = private.aws_secret_access_key)
s3 = session.resource('s3')

path = '/home/ec2-user/programming/birthplace/display/images/'

images = get_files_in_local(path)

for image in images:
    upload_img = """{}{}""".format(path, image)
    s3.meta.client.upload_file(Filename=upload_img, Bucket='images-famous', Key=image)
    print("""image uploaded: {}""".format(image))

# Filename - File to upload
# Bucket - Bucket to upload to (the top level directory under AWS S3)
# Key - S3 object name (can contain subdirectories). If not specified then file_name is used
# s3.meta.client.upload_file(Filename='/home/ec2-user/programming/birthplace/python/images/2_50_cent.png', Bucket='images-famous', Key='2_50_cent.png')
# print('uploaded')