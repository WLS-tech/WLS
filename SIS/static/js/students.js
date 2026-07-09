const searchInput = document.getElementById("searchStudent");

const tableBody = document.getElementById("studentList");



let students = [];



// Load verified students from Flask

fetch("/verified_students")

.then(response => response.json())

.then(data => {


    students = data;


    displayStudents(students);


})

.catch(error => {


    console.error(error);


    alert("Could not load students.");


});






function displayStudents(data) {


    tableBody.innerHTML = "";



    data.forEach(student => {


        tableBody.innerHTML += `

        <tr>


            <td>
                ${student.student_id}
            </td>


            <td>
                ${student.full_name}
            </td>


            <td>
                ${student.department}
            </td>


            <td>
                ${student.phone}
            </td>


            <td>
                Verified
            </td>


        </tr>


        `;


    });


}






// Search student

searchInput.addEventListener("keyup", function(){


    const filter = searchInput.value.toLowerCase();



    const filteredStudents = students.filter(student => {


        return (

            student.full_name.toLowerCase().includes(filter)

            ||

            student.student_id.toLowerCase().includes(filter)

        );


    });



    displayStudents(filteredStudents);



});






// Logout

const logoutBtn = document.getElementById("logoutBtn");



logoutBtn.addEventListener("click", function(event){


    event.preventDefault();


    localStorage.removeItem("student");


    window.location.href = "/";


});