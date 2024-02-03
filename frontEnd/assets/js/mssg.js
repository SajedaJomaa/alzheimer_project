let token = localStorage.getItem("token");

if (token) {
	const $ = selector => document.querySelector(selector);
	var clickedID = 0;
	const chatBody = document.querySelector(".chat-body");
	const txtInput = document.querySelector("#txtInput");
	const send = document.querySelector(".send");
	// getPatients();
	// async function getPatients() {
	// 	try {
	// 		let res = await fetch(`http://localhost:5000/doctor/getPatient`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-type': 'application/json'
	// 			},
	// 		});
	// 		let out = await res.json();
	// 		if (out.msg === "Successfully Show") {
	// 			patientsData = out.Data; // Assign data to the global variable
	// 			displayAllPatients(patientsData);
	// 		}
	// 	} catch (error) {
	// 		console.log(error.message);
	// 		console.log("error from fetching all files");
	// 	}
	// }

	// function displayAllPatients(arr) {
	// 	cont.innerHTML = "";
	// 	cont.innerHTML = `
	// 		${arr.map((elem, index) => {
	// 		return `
	// 				<li>
	// 					<a href="#" onclick="handleClick(${index})">
	// 						<span class="icon">
	// 							<i class="bi bi-person"></i>
	// 						</span>
	// 						<span class="title">${elem.userName}</span>
	// 					</a>
	// 				</li>`;
	// 	}).join("")}
	// 	`;
	// }

	// function handleClick(index) {
	// 	// Access the clicked item using the index
	// 	console.log("Item clicked:", index);
	// 	// Access the corresponding data from the global variable
	// 	console.log("Item details:", patientsData[index].DIDE);
	// 	// Add your logic to handle the click event for the specific item
	// 	$(".title").innerHTML = patientsData[index].userName;
	// 	$(".userName").innerHTML = patientsData[index].userName;
	// 	clickedID = patientsData[index].DIDE;
	// }
	send.addEventListener("click", () => submitForm(clickedID));
	async function submitForm(id) {
		const DIDE = JSON.parse(localStorage.getItem('DIDE'));
		const files = document.getElementById("files");
		const formData = new FormData();
		formData.append("DIDE", DIDE);
		formData.append("file", files.files[0]);
		try {
			const response = await fetch("http://localhost:5000/message/insertMessage", {
				method: 'POST',
				body: formData,  // No need to set Content-Type here; it will be set automatically
			});

			const out = await response.json();

			if (out.msg === "Successfully Send") {
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




	send.addEventListener("click", () => renderUserMessage());

	txtInput.addEventListener("keyup", (event) => {
		if (event.keyCode === 13) {
			renderUserMessage();
		}
	});

	const renderUserMessage = () => {
		const userInput = txtInput.value;
		renderMessageEle(userInput, "user");
		txtInput.value = "";
		setTimeout(() => {
			renderChatbotResponse(userInput);
			setScrollPosition();
		}, 600);
	};

	const renderChatbotResponse = (userInput) => {
		const res = getChatbotResponse(userInput);
		renderMessageEle(res);
	};

	const renderMessageEle = (txt, type) => {
		let className = "user-message";
		if (type !== "user") {
			className = "chatbot-message";
		}
		const messageEle = document.createElement("div");
		const txtNode = document.createTextNode(txt);
		messageEle.classList.add(className);
		messageEle.append(txtNode);
		chatBody.append(messageEle);
	};

	const getChatbotResponse = (userInput) => {
		return responseObj[userInput] == undefined
			? "Please try something else"
			: responseObj[userInput];
	};

	const setScrollPosition = () => {
		if (chatBody.scrollHeight > 0) {
			chatBody.scrollTop = chatBody.scrollHeight;
		}
	};
	// add hovered class to selected list item
	// add hovered class to selected list item
	let list = document.querySelectorAll(".navigation li");

	function activeLink() {
		list.forEach((item) => {
			item.classList.remove("hovered");
		});
		this.classList.add("hovered");
	}

	list.forEach((item) => item.addEventListener("mouseover", activeLink));



} else {
	alert("Login First to Come to this Page");
	window.location.href = "./signin.html";
}