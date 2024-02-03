

let pwd = document.getElementById("txtPwd");
let code = document.getElementById("txtCode");
let form = document.querySelector("form");
const confirmtBtn = document.getElementById('Confirm');

confirmtBtn.addEventListener('click', () => {
    container.classList.add("active");
});

function validateInput() {
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
/*form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInput();
    let password = document.getElementById("txtPwd").value;
    let confirmCode = document.getElementById("txtCode").value;
    let obj = {
        password,
        confirmCode
    }
    console.log(password);
    console.log(confirmCode);
    restPassword(obj);
 
})
*/
document.querySelector("button")
    .addEventListener("click", (event) => {
        event.preventDefault();
        validateInput();
        let password = document.getElementById("txtPwd").value;
        let confirmCode = document.getElementById("txtCode").value;
        let obj = {
            password,
            confirmCode
        }
        console.log(password);
        console.log(confirmCode);
        restPassword(obj);
    });

async function restPassword(obj) {
    try {
        let res = await fetch(`http://localhost:5000/auth/forgotPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        let out = await res.json();
        alert(out.msg);
        if (out.msg === "Successfully Reset Password") {
            window.location.href = "../signin.html"
        }
    } catch (error) {
        console.log("error while rest password from frontend");
        alert("error while rest password")
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

document.querySelector("button")
    .addEventListener("click", (event) => {
        event.preventDefault();

        validateInput();
    });

function isValidPwd(pwd) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(pwd);
};

//  function isValidCPwd(cpwd){
//     return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(pwd);
//  };


