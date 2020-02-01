export const config = {
  "dev": {
    "username": "udagramnpdev",
    "password": "Javac1234",
    "database": "udagramnpdev",
    "host": "udagramnpdev.c0xfzwcskk4d.us-west-2.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-west-2",
    "aws_profile": "default",
    "aws_media_bucket": "udagram-np-dev"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt": {
    "secret" : "helloworld"
  }
}
