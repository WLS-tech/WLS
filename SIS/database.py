import psycopg2
import os


try:

    connection = psycopg2.connect(

        host=os.getenv("DB_HOST", "localhost"),

        database=os.getenv("DB_NAME", "postgres"),

        user=os.getenv("DB_USER", "postgres"),

        password=os.getenv("DB_PASSWORD", "Divider@3461"),

        port=os.getenv("DB_PORT", "5432")

    )


    print("Connected to PostgreSQL successfully!")



except Exception as e:


    print("Connection failed:")

    print(e)