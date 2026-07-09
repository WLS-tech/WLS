// =====================
// Logged-in Student
// =====================


const studentName = document.getElementById("studentName");


const student = JSON.parse(localStorage.getItem("student"));



if (student) {


    studentName.textContent = student.full_name;


} else {


    window.location.href = "/";


}





// =====================
// Logout
// =====================


const logoutBtn = document.getElementById("logoutBtn");



logoutBtn.addEventListener("click", function(event) {


    event.preventDefault();



    localStorage.removeItem("student");



    window.location.href = "/";


});