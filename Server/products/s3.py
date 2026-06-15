import boto3

from decouple import config


s3 = boto3.client(
    "s3",
    aws_access_key_id=config(
        "AWS_ACCESS_KEY_ID"
    ),
    aws_secret_access_key=config(
        "AWS_SECRET_ACCESS_KEY"
    ),
    region_name=config(
        "AWS_S3_REGION_NAME"
    ),
)


def upload_file_to_s3(file, filename):
    bucket_name = config("AWS_STORAGE_BUCKET_NAME")
    region_name = config("AWS_S3_REGION_NAME")

    s3.upload_fileobj(
        file,
        bucket_name,
        filename,
        ExtraArgs={
            "ContentType": file.content_type,
            "ACL": "public-read"
        },
    )

    # Regional URL is more reliable for access
    url = f"https://{bucket_name}.s3.{region_name}.amazonaws.com/{filename}"

    return url