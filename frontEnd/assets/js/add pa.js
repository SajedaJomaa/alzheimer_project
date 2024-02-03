let token = localStorage.getItem("token");

if (token) {
    let id = document.getElementById("txtId");
    let userName = document.getElementById("txtUserName");
    let email = document.getElementById("txtEmail");
    let phone = document.getElementById("txtPhoneNumber");
    let date = document.getElementById("txtBirth Date");
    let pwd = document.getElementById("txtPwd");
    let gender = document.getElementById("male");
    let gender1 = document.getElementById("female");
    let form = document.querySelector("form");
    document.querySelector("button")
        .addEventListener("click", (event) => {
            event.preventDefault();

            validateInput();
        });
    function validateInput() {
        //check id,username is empty 
        if (id.value.trim() === "") {
            onError(id, "ID cannot be empty");
        } else {
            if (!isValidId(id.value.trim())) {
                onError(id, "ID must be  9 number");
            } else {
                onSuccess(id);
            }
        }
        if (userName.value.trim() === "") {
            onError(userName, "User Name cannot be empty");
        } else {
            if (!isValidName(userName.value.trim())) {
                onError(userName, "User Name  must be 3 word.");
            }
            else {
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
        //phonenum
        if (phone.value.trim() === "") {
            onError(phone, "Phone Number cannot be empty");
        }
        else {
            if (!isValidPhone(phone.value.trim())) {
                onError(phone, "phone Number must be 10 number.");
            }
            else {
                onSuccess(phone);
            }
        }
        if (date.value.trim() === "") {
            onError(date, "Birth Date cannot be empty");
        } else {
            onSuccess(date);
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

        //gender
        if (gender.checked == false & gender1.checked == false) {
            onError(gender, "Please Select Gender");
        }
        else {
            onSuccess(gender);
        }
    }

    function submitFormData(e) {
        e.preventDefault();
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validateInput();
        let DIDE = document.getElementById("txtId").value;
        let userName = document.getElementById("txtUserName").value;
        let email = document.getElementById("txtEmail").value;
        let password = document.getElementById("txtPwd").value;
        let phoneNumber = document.getElementById("txtPhoneNumber").value;
        let dateOfBarth = document.getElementById("txtBirth Date").value;
        let age = new Date().getYear() - new Date(dateOfBarth).getYear();
        if (document.getElementsByName('gender').checked == true) {
            gender = 'Male';
        }
        else {
            gender = 'Female';
        }
        let obj = {
            DIDE,
            userName,
            email,
            password,
            role: "patient",
            phoneNumber,
            gender,
            age,

        }
        registerNewUser(obj);
    })

    async function registerNewUser(obj) {
        try {
            let res = await fetch(`http://localhost:5000/doctor/addPatient`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            let out = await res.json();
            alert(out.msg);
            if (out.msg === "Successfully register") {
                window.location.href = "../signin.html"
            }
        } catch (error) {
            console.log("error while registering from frontend");
            alert("error while register")
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
    };
    function isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    };
    function isValidId(id) {
        return /^\d{9}$/.test(id);
    };
    function isValidPwd(pwd) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(pwd);
    };
    function isValidName(userName) {
        return /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/.test(userName);
    };

} else {
    alert("Login First to Come to this Page");
    window.location.href = "./login.html";
}
