let token = localStorage.getItem("token");

if (token) {


    let email = document.getElementById("txtEmail");
    let pwd = document.getElementById("txtPwd");
    let userName = document.getElementById("txtUserName")
    let form = document.querySelector("form");

    function validateInput() {
        //check  username is empty 
        if (userName.value.trim() === "") {
            onError(userName, "User Name cannot be empty");
        } else {
            if (!isValidName(userName.value.trim())) {
                onError(userName, "User Name  must be 3 word.");

            } else {
                onSuccess(userName);
            }
        }

        if (email.value.trim() === "") {
            onError(email, "Email cannot be empty");
        } else {
            if (!isValidEmail(email.value.trim())) {
                onError(email, "Email is not valid");
            } else {
                onSuccess(email);
            }
        }

        //password
        if (pwd.value.trim() === "") {
            onError(pwd, "Password cannot be empty");
        }
        else {
            if (!isValidPwd(pwd.value.trim())) {
                onError(pwd, "Password must be at least 8,numer,\n uppercase and lowercase");

            }
            else {
                onSuccess(pwd);
            }
        }


    }

    function submitFormData() {
        preventDefault();
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validateInput();
        let userName = document.getElementById("txtUserName").value;
        let email = document.getElementById("txtEmail").value;
        let password = document.getElementById("txtPwd").value;
        const DIDE = JSON.parse(localStorage.getItem('DIDE'));
        let obj = {
            userName,
            email,
            password,


        }
        editData(obj, DIDE);

    })

    async function editData(obj, DIDE) {
        try {
            let res = await fetch(`http://localhost:5000/doctor/editData/${DIDE}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"


                },
                body: JSON.stringify(obj)
            })
            let out = await res.json();



            alert(out.msg);
            if (out.msg === "Successfully Updated") {
                window.location.href = "../signin.html"
            }
        } catch (error) {
            console.log("error while signin from frontend");
            alert("error while signin")
        }
    }

    function onSuccess(input) {
        let parent = input.parentElement;
        let messageEle = parent.querySelector("small");
        messageEle.style.visibility = "hidden";
        parent.classList.remove("error");
        parent.classList.add("success");
    }
    function onError(input, message) {
        let parent = input.parentElement;
        let messageEle = parent.querySelector("small");
        messageEle.style.visibility = "visible";
        messageEle.innerText = message;
        parent.classList.add("error");
        parent.classList.remove("success");

    }
    function isValidEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    function isValidPwd(pwd) {
        return /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,20}$/.test(pwd);
    };
    function isValidName(userName) {
        return /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/.test(userName);
    };




} else {
    alert("Login First to Come to this Page");
    window.location.href = "../signin.html"
}
