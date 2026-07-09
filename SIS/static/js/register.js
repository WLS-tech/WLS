const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const studentid = document.getElementById("studentid").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (
        fullname === "" ||
        studentid === "" ||
        phone === "" ||
        email === "" ||
        department === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

   fetch("http://127.0.0.1:5000/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        full_name: fullname,
        student_id: studentid,
        phone: phone,
        email: email,
        department: department,
        password: password
    })
})
.then(response => response.json())
.then(data => {
    alert(data.message);
})
.catch(error => {
    console.error(error);
    alert("Could not connect to the server.");
});

});
