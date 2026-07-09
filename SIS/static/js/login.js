const form = document.getElementById("loginForm");


form.addEventListener("submit", function(event) {

    event.preventDefault();


    const phone = document.getElementById("phone").value.trim();

    const password = document.getElementById("password").value.trim();



    if (phone === "" || password === "") {

        alert("Please fill in all fields.");

        return;

    }



    fetch("/login", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },


        body: JSON.stringify({

            phone: phone,

            password: password

        })

    })


    .then(response => response.json())


    .then(data => {


        console.log(data);



        if (data.status === "success") {



            localStorage.setItem(

                "student",

                JSON.stringify(data.student)

            );



            window.location.href = "/dashboard";



        } else {



            alert(data.message);



        }


    })



    .catch(error => {


        console.error(error);


        alert("Server connection failed.");


    });


});