import psycopg2
import os



connection = psycopg2.connect(

    host=os.getenv("DB_HOST", "localhost"),

    database=os.getenv("DB_NAME", "postgres"),

    user=os.getenv("DB_USER", "postgres"),

    password=os.getenv("DB_PASSWORD", "Divider@3461"),

    port=os.getenv("DB_PORT", "5432")

)



cursor = connection.cursor()



cursor.execute("""

CREATE TABLE IF NOT EXISTS students (

    id SERIAL PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    student_id VARCHAR(20) UNIQUE NOT NULL,

    phone VARCHAR(20) UNIQUE NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    department VARCHAR(100) NOT NULL,

    password VARCHAR(255) NOT NULL,

    status VARCHAR(20) DEFAULT 'Pending'

);

""")





connection.commit()



print("Students table created successfully!")



cursor.close()

connection.close()