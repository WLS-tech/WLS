from flask import Flask, render_template, request, jsonify
import psycopg2
import os
from dotenv import load_dotenv


load_dotenv()


app = Flask(__name__)

app.secret_key = os.getenv(
    "SECRET_KEY",
    "sis-secret-key"
)



# Database connection function
def get_connection():

    return psycopg2.connect(

        host=os.getenv("DB_HOST", "localhost"),

        database=os.getenv("DB_NAME", "postgres"),

        user=os.getenv("DB_USER", "postgres"),

        password=os.getenv("DB_PASSWORD", "Divider@3461"),

        port=os.getenv("DB_PORT", "5432")

    )



# Login page
@app.route("/")
def login_page():

    return render_template("login.html")



# Dashboard page
@app.route("/dashboard")
def dashboard():

    return render_template("index.html")



# Register page
@app.route("/register", methods=["GET"])
def register_page():

    return render_template("register.html")



# Register student
@app.route("/register", methods=["POST"])
def register():

    data = request.json


    connection = get_connection()

    cursor = connection.cursor()


    cursor.execute("""
        INSERT INTO students
        (full_name, student_id, phone, email, department, password)
        VALUES (%s,%s,%s,%s,%s,%s)
    """,
    (
        data["full_name"],
        data["student_id"],
        data["phone"],
        data["email"],
        data["department"],
        data["password"]
    ))


    connection.commit()


    cursor.close()
    connection.close()


    return jsonify({

        "status":"success",

        "message":"Registration Successful"

    })





# Login student
@app.route("/login", methods=["POST"])
def login():

    data = request.json


    connection = get_connection()

    cursor = connection.cursor()



    cursor.execute("""
        SELECT id,
               full_name,
               student_id,
               phone,
               email,
               department,
               status
        FROM students
        WHERE phone=%s AND password=%s
    """,
    (
        data["phone"],
        data["password"]
    ))



    student = cursor.fetchone()



    cursor.close()
    connection.close()



    if student is None:

        return jsonify({

            "status":"error",

            "message":"Invalid phone number or password."

        })




    if student[6] != "Verified":

        return jsonify({

            "status":"error",

            "message":"Your account is waiting for verification."

        })




    return jsonify({

        "status":"success",

        "student":{

            "id":student[0],

            "full_name":student[1],

            "student_id":student[2],

            "phone":student[3],

            "email":student[4],

            "department":student[5]

        }

    })







# Pending students for admin
@app.route("/pending_students", methods=["GET"])
def pending_students():


    connection = get_connection()

    cursor = connection.cursor()



    cursor.execute("""
        SELECT id,
               full_name,
               student_id,
               phone,
               department
        FROM students
        WHERE status='Pending'
    """)



    students = cursor.fetchall()



    cursor.close()
    connection.close()



    result = []



    for student in students:

        result.append({

            "id":student[0],

            "full_name":student[1],

            "student_id":student[2],

            "phone":student[3],

            "department":student[4]

        })



    return jsonify(result)







# Verify student
@app.route("/verify_student/<int:student_id>", methods=["POST"])
def verify_student(student_id):


    connection = get_connection()

    cursor = connection.cursor()



    cursor.execute("""
        UPDATE students
        SET status='Verified'
        WHERE id=%s
    """,
    (student_id,))



    connection.commit()



    cursor.close()
    connection.close()



    return jsonify({

        "status":"success",

        "message":"Student verified successfully."

    })








# Verified students
@app.route("/verified_students", methods=["GET"])
def verified_students():


    connection = get_connection()

    cursor = connection.cursor()



    cursor.execute("""
        SELECT id,
               full_name,
               student_id,
               phone,
               department,
               email
        FROM students
        WHERE status='Verified'
    """)



    students = cursor.fetchall()



    cursor.close()
    connection.close()



    result = []



    for student in students:


        result.append({

            "id":student[0],

            "full_name":student[1],

            "student_id":student[2],

            "phone":student[3],

            "department":student[4],

            "email":student[5]

        })



    return jsonify(result)






if __name__ == "__main__":

    app.run()