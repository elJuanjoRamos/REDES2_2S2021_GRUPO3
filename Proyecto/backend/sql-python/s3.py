
import os
import boto3, botocore
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())


#BOTO3 CONFIG
DEFAULT_FILE_STORAGE = os.environ.get('DEFAULT_FILE_STORAGE')
AWS_S3_ACCESS_KEY_ID = os.environ.get('AWS_S3_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
AWS_QUERYSTRING_AUTH = False

# BOTO 3 CONFIG
s3 = boto3.client("s3", aws_access_key_id=AWS_S3_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)


# function to check file extension
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            AWS_STORAGE_BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

        bucket_location = s3.get_bucket_location(Bucket=AWS_STORAGE_BUCKET_NAME)
        object_url = "https://s3-{0}.amazonaws.com/{1}/{2}".format(
            bucket_location['LocationConstraint'],
            AWS_STORAGE_BUCKET_NAME,
            file.filename)
        return object_url
    except Exception as e:
        print("Something Happened: ", e)
        return e
