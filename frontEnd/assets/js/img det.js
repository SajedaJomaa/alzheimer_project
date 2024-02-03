let token = localStorage.getItem("token");

if (token) {
    const $ = selector => document.querySelector(selector);

    const form = document.getElementById("form");

    form.addEventListener("submit", submitForm);
    form.addEventListener("submit", callPredect);

    async function submitForm(e) {
        e.preventDefault();
        const id = document.getElementById("id");
        const files = document.getElementById("files");
        const formData = new FormData();
        formData.append("DIDE", id.value);
        formData.append("file", files.files[0]);

        try {
            const response = await fetch("http://localhost:5000/insertImage/insertImage", {
                method: 'POST',
                body: formData,  // No need to set Content-Type here; it will be set automatically
            });

            const out = await response.json();

            if (out.msg === "Successfully Upload") {
                //modal.classList.add('active')
                //overlay.classList.add('active')
                //$(".modal-body").innerHTML = out.predect;
                alert(out.msg);

            } else {
                console.log("Error response from server:", out);
                alert("Error while uploading");
            }
        } catch (error) {
            console.log("Error while uploading from frontend:", error.message);
            alert("Error while uploading");
        }
    }

    async function callPredect(e) {
        e.preventDefault();
        const id = document.getElementById("id");
        const files = document.getElementById("files");
        const formData = new FormData();
        formData.append("DIDE", id.value);
        formData.append("file", files.files[0]);

        try {
            const response = await fetch("http://localhost:5000/insertImage/callPredect", {
                method: 'POST',
                body: formData,// No need to set Content-Type here; it will be set automatically
            });

            const out = await response.json();

            if (out.msg === "Successfully Predict") {
                modal.classList.add('active')
                overlay.classList.add('active')
                $(".modal-body").innerHTML = out.predect;


            } else {
                console.log("Error response from server:", out);
                alert("Error while uploading");
            }
        } catch (error) {
            console.log("Error while uploading from frontend:", error.message);
            alert("Error while uploading");
        }
    }


    const closeModalButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')
    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })
} else {
    alert("Login First to Come to this Page");
    window.location.href = "../signin.html"
}