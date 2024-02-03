let token = localStorage.getItem("token");

if (token) {
    const $ = selector => document.querySelector(selector);

    let cont = document.getElementById("data");

    async function getAllFiles() {
        try {
            let res = await fetch(`http://localhost:5000/doctor/getPatient`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            let out = await res.json();
            if (out.msg === "Successfully Show") {
                displayAllFiles(out.Data)
            }
        } catch (error) {
            console.log(error.message);
            console.log("error from fetching all files")
        }
    }

    getAllFiles();

    async function getTotalFile(id) {
        try {
            let res = await fetch(`http://localhost:5000/doctor/getTotalFile/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            let out = await res.json();
            if (out.msg === "Successfully Count") {
                return out.Data; // Return the value
            }
        } catch (error) {
            console.log(error.message);
            console.log("error from fetching total file count")
        }
    }

    async function displayAllFiles(arr) {
        cont.innerHTML = "";
        cont.innerHTML = `
            <h1 h1 style="text-align: center; margin-bottom:20px"> Patient Files & Images</h1>
            <table class="table table table-script">
                <thead>
                    <tr>
                        <th>Folder Name</th>
                        <th>Total File</th>
                        <th>Update User</th>
                        <th>Delete</th>
                        <th>View Uploaded File</th>
                    </tr>
                </thead>
                <tbody>
                    ${await Promise.all(arr.map(async (elem) => {
            const totalFiles = await getTotalFile(elem.DIDE);
            return `
                            <tr>
                                <td>${elem.DIDE}</td>
                                <td class="Count">${totalFiles}</td>
                                <td><button class="UpdateUser" data-id=${elem.DIDE}>UpdateUser</button></td>
                                <td><button class="Delete" data-id=${elem.DIDE}>Delete</button></td>
                                <td><button class="ViewFile" data-id=${elem.DIDE}>View File</button></td>
                            </tr>`;
        })).then(htmlArray => htmlArray.join(""))}
                </tbody>
            </table>
        `;

        let DeleteBtns = document.querySelectorAll(".Delete");

        for (let DeleteBtn of DeleteBtns) {
            DeleteBtn.addEventListener("click", (e) => {
                let id = e.target.dataset.id;
                removePatient(id, token);
            });
        }

        let ViewFileBtns = document.querySelectorAll(".ViewFile");

        for (let ViewFileBtn of ViewFileBtns) {
            ViewFileBtn.addEventListener("click", (e) => {
                let id = e.target.dataset.id;
                ViewFile(id, token);
            });
        }

        let UpdateUserBtns = document.querySelectorAll(".UpdateUser");

        for (let UpdateUserBtn of UpdateUserBtns) {
            UpdateUserBtn.addEventListener("click", (e) => {
                let id = e.target.dataset.id;
                modal.classList.add('active')
                overlay.classList.add('active')
                $(".title").innerHTML = "Update User";
                $(".modal-body").innerHTML = ` 
                <div class="box">
            <form class="form" id="updateUserForm">
            <div class="edite-box">
                <div>
                  <input type="text" id="txtUserName" name="username" required />
                  <label for="username" name="username">User Name</label>
                  <small>Error Message</small>
                </div>
      
                <div>
                  <input type="email" id="txtEmail" name="email" required />
                  <label for="email" name="email">Email</label>
                  <small>Error Message</small>
                </div>
      
                <div>
                  <input type="password" id="txtPwd" name="pwd" required />
                  <label for="pwd" name="pwd">Password</label>
                  <small>Error Message</small>
                </div>
      
                <button type="submit">Edit My Data</button>
              </div>
            </form>
            </div>
          `;
                // let form = document.querySelector("form");

                document.getElementById("updateUserForm").addEventListener("submit", (e) => {
                    e.preventDefault();
                    const userName = document.getElementById("txtUserName").value;
                    const email = document.getElementById("txtEmail").value;
                    const password = document.getElementById("txtPwd").value;

                    let obj = {
                        userName,
                        email,
                        password,
                    }
                    UpdateUser(obj, id);
                })
            });
        }
    }
    async function UpdateUser(obj, DIDE) {
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
                alert(out.msg);
            }
        } catch (error) {
            console.log("error while signin from frontend");
            alert("error while signin")
        }
    }


    async function ViewFile(id, token) {
        try {
            let res = await fetch(`http://localhost:5000/doctor/viewFile/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `${token}`
                },
            })
            let out = await res.json();
            modal.classList.add('active')
            overlay.classList.add('active')
            $(".title").innerHTML = "View File";
            if (out.msg === 'Successfully Show') {
                showImages(out.Data);

            }
            if (out.msg === 'No Images for the Patient') {
                $(".modal-body").innerHTML = out.msg;

            }

        } catch (error) {
            console.log(error);
            alert("Something Went Wrong!")
        }
    }

    async function removePatient(id, token) {
        try {
            let res = await fetch(`http://localhost:5000/doctor/remove/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `${token}`
                },
            })
            let out = await res.json();
            console.log(out);
            if (out.msg === 'User deleted succesfully') {
                getAllFiles();
                alert('User deleted succesfully')
            } else {
                alert(out.msg)
            }

        } catch (error) {
            console.log(error);
            alert("Something Went Wrong!")
        }
    }
    const showImages = (images) => {
        console.log(images);
        const imageContainer = document.getElementById('imageContainer');

        images.forEach(function (image) {
            const imgElement = document.createElement('img');

            // Replace backslashes with forward slashes and encode special characters
            const imagePath = image.Path.replace(/\\/g, '/');

            // Create a Blob URL for the local image file
            const imageUrl = URL.createObjectURL(new Blob([imagePath], { type: 'image/png' }));

            imgElement.src = imageUrl;
            imgElement.style.maxWidth = '100%';
            imgElement.style.maxHeight = '100px';

            // Append the image directly to the image container
            imageContainer.appendChild(imgElement);
        });
    };






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

    function validateInput(userName, email, password) {
        //check  username is empty 
        if (userName.trim() === "") {
            onError(userName, "User Name cannot be empty");
        } else {
            if (!isValidName(userName.trim())) {
                onError(userName, "User Name  must be 3 word.");

            } else {
                onSuccess(userName);
            }
        }

        if (email.trim() === "") {
            onError(email, "Email cannot be empty");
        } else {
            if (!isValidEmail(email.trim())) {
                onError(email, "Email is not valid");
            } else {
                onSuccess(email);
            }
        }

        //password
        if (password.trim() === "") {
            onError(password, "Password cannot be empty");
        }
        else {
            if (!isValidPwd(password.trim())) {
                onError(password, "Password must be at least 8,numer,\n uppercase and lowercase");
            }
            else {
                onSuccess(password);
            }
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
    window.location.href = "./signin.html";
}
