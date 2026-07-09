// =====================
// Student Results
// =====================


const resultSearch = document.getElementById("searchResult");

const resultsBody = document.getElementById("resultsBody");

const searchBtn = document.getElementById("searchBtn");

const semester = document.getElementById("semester");




// Temporary data
// Later replace with Flask / PostgreSQL API

const results = [

    {
        subject: "Mathematics",
        grade: "A",
        remark: "Excellent"
    },

    {
        subject: "Physics",
        grade: "B+",
        remark: "Very Good"
    },

    {
        subject: "English",
        grade: "A-",
        remark: "Excellent"
    },

    {
        subject: "Computer Science",
        grade: "A+",
        remark: "Outstanding"
    }

];





function displayResults(data){


    resultsBody.innerHTML = "";



    data.forEach(result => {


        resultsBody.innerHTML += `

        <tr>

            <td>
                ${result.subject}
            </td>


            <td>
                ${result.grade}
            </td>


            <td>
                ${result.remark}
            </td>


        </tr>

        `;


    });


}



displayResults(results);







// Search results

searchBtn.addEventListener("click", function(event){


    event.preventDefault();



    const filter = resultSearch.value.toLowerCase();



    const filtered = results.filter(result => {


        return (

            result.subject.toLowerCase().includes(filter)

        );


    });



    displayResults(filtered);



});







// Semester selection

semester.addEventListener("change", function(){


    console.log("Selected:", semester.value);


});






// Logout

const logoutBtn = document.getElementById("logoutBtn");



logoutBtn.addEventListener("click", function(event){


    event.preventDefault();


    localStorage.removeItem("student");


    window.location.href = "/";


});