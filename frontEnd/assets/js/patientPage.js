// add hovered class to selected list item
let token = localStorage.getItem("token");

if (token) {
    const $ = selector => document.querySelector(selector);

    let list = document.querySelectorAll(".navigation li");

    function activeLink() {
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink));

    // Menu Toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    toggle.onclick = function () {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
    };
    const logOutBtn = document.getElementById('logOut');


    logOutBtn.addEventListener('click', () => {
        try {
            localStorage.clear();

            window.location.href = "../index.html"

        } catch (error) {

            alert(error)
        }
    });
    async function getTotalPatient() {
        try {
            let res = await fetch(`http://localhost:5000/doctor/getTotalPatient`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            let out = await res.json();
            if (out.msg === "Successfully Count") {
                $(".numberOfPatient").innerHTML = out.Data;
            }
        } catch (error) {
            console.log(error.message);
            console.log("error from fetching all files")
        }
    }


    async function getTotalImage() {
        try {
            let res = await fetch(`http://localhost:5000/doctor/getTotalImage`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            let out = await res.json();
            if (out.msg === "Successfully Count") {
                $(".numberOfImages").innerHTML = out.Data;
            }
        } catch (error) {
            console.log(error.message);
            console.log("error from fetching total file count")
        }
    }
    async function getTotalResult() {
        try {
            let res = await fetch(`http://localhost:5000/doctor/getTotalResult`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            let out = await res.json();
            if (out.msg === "Successfully Count") {
                $(".numberOfResults").innerHTML = out.Data;

            }
        } catch (error) {
            console.log(error.message);
            console.log("error from fetching total file count")
        }
    }
    getTotalPatient();
    getTotalImage();
    getTotalResult();

} else {
    alert("Login First to Come to this Page");
    window.location.href = "../signin.html"
}




