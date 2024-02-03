let token = localStorage.getItem("token");

if (token) {

    showPatient();
    let cont = document.getElementById("data");

    async function showPatient() {
        try {
            let res = await fetch(`http://localhost:5000/result/getResultPredect `, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            })
            let out = await res.json();
            if (out.msg === "Successfully Show") {
                displayAllFiles(out.Data);
            }
            alert(out.msg);
        } catch (error) {
            console.log("error while showing data from frontend");
            alert("error while show data")
        }
    }
    function displayAllFiles(arr) {
        cont.innerHTML = ""
        cont.innerHTML = `
    <h1 style="text-align: center; margin-bottom:20px">Result History</h1>
    <table  class="table table table-script">
        <thead>
            <tr>
            <th>Patient ID</th>
        <th>Image ID</th>
        <th>Predection</th>
        <th>Date&Time</th>
            </tr>
        </thead>
        <tbody>
        ${arr.map((elem) => {
            return `
             <tr>
             <td>${elem.DIDE}</td>
             <td>${elem.id}</td>
             <td>${elem.predect}</td>
             <td>${elem.createdAt}</td>
             </tr>
         `
        }).join("")}
            
        </tbody>
    </table>
`}
} else {
    alert("Login First to Come to this Page");
    window.location.href = "../signin.html"
}