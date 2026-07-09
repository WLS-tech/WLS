// =====================
// Load Student Profile
// =====================


const student = JSON.parse(localStorage.getItem("student"));



const name = document.getElementById("studentName");

const studentID = document.getElementById("studentID");

const phone = document.getElementById("studentPhone");

const email = document.getElementById("studentEmail");

const department = document.getElementById("studentDepartment");





if (student) {


    name.textContent = student.full_name;


    studentID.textContent = student.student_id;


    phone.textContent = student.phone;


    email.textContent = student.email;


    department.textContent = student.department;



} else {


    window.location.href = "/";


}





// =====================
// Edit Profile Button
// =====================


const editButton = document.getElementById("editProfile");



editButton.addEventListener("click", function () {


    alert("Profile editing will be added soon.");


});





// =====================
// Logout
// =====================


const logoutBtn = document.getElementById("logoutBtn");



logoutBtn.addEventListener("click", function(event){


    event.preventDefault();



    localStorage.removeItem("student");



    window.location.href = "/";


});