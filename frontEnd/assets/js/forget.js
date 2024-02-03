const container = document.getElementById('container');
const requestBtn = document.getElementById('Request');


requestBtn.addEventListener('click', () => {
    container.classList.add("active");
});



let email = document.getElementById("txtEmail");



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




}
document.querySelector("button")
    .addEventListener("click", (event) => {
        event.preventDefault();
        validateInput();
    });

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