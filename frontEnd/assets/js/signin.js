const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

let email = document.getElementById("txtEmail");
let pwd = document.getElementById("txtPwd");
let form = document.querySelector("form");

function validateInput() {
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
        if (pwd.value.length < 8) {
            onError(pwd, "password must be at least 8 character.");
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
    let email = document.getElementById("txtEmail").value;
    let password = document.getElementById("txtPwd").value;
    let obj = {
        email,
        password,

    }
    signinUser(obj);

})

async function signinUser(obj) {
    try {
        let res = await fetch(`http://localhost:5000/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        let out = await res.json();
        localStorage.setItem("token", JSON.stringify(out.token));
        localStorage.setItem("role", JSON.stringify(out.role));
        localStorage.setItem("DIDE", JSON.stringify(out.DIDE));

        alert(out.msg);
        if (out.msg === "Successfully signin" && out.role == "doctor") {
            window.location.href = "../doctor.html"
        }
        if (out.msg === "Successfully signin" && out.role == "patient") {
            window.location.href = "../patientpage.html";
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

