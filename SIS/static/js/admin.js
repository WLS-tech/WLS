// Load pending students when page opens

loadPendingStudents();



function loadPendingStudents() {


    fetch("/pending_students")


    .then(response => response.json())


    .then(students => {



        const tbody = document.querySelector("#studentsTable tbody");



        tbody.innerHTML = "";



        if (students.length === 0) {



            tbody.innerHTML = `

            <tr>

                <td colspan="5">
                    No pending students.
                </td>

            </tr>

            `;


            return;

        }





        students.forEach(student => {



            tbody.innerHTML += `


            <tr>


                <td>
                    ${student.full_name}
                </td>



                <td>
                    ${student.student_id}
                </td>



                <td>
                    ${student.phone}
                </td>



                <td>
                    ${student.department}
                </td>



                <td>


                    <button onclick="verifyStudent(${student.id})">

                        Verify

                    </button>


                </td>



            </tr>


            `;


        });



    })


    .catch(error => {


        console.error(error);


        alert("Could not load students.");


    });


}






function verifyStudent(id) {



    fetch(`/verify_student/${id}`, {


        method: "POST"


    })


    .then(response => response.json())


    .then(data => {



        alert(data.message);



        loadPendingStudents();



    })


    .catch(error => {



        console.error(error);



        alert("Verification failed.");



    });



}