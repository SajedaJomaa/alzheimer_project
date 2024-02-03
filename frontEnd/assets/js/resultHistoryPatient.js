

let token = localStorage.getItem("token");

if (token) {

    let cont = document.getElementById("data");

    async function getAllPatient() {
        let DIDE = localStorage.getItem("DIDE");
        try {
            let res = await fetch(`http://localhost:5000/result/getSpecificPredict/${DIDE}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `${token}`
                },
            })
            let out = await res.json();
            //console.log(out);
            displayAllPatients(out.Data)
        } catch (error) {
            console.log(error.message);
            console.log("error from fetching all appointments")
        }
    }
    getAllPatient();

    function displayAllPatients(arr) {
        cont.innerHTML = ""
        cont.innerHTML = `
        <h1 style="text-align: center; margin-bottom:20px">Result History</h1>
    <table  class="table table table-script">
       <thead>
           <tr>
               <th>Image ID</th>
               <th>Predict</th>
               <th>Patient ID</th>
               <th>createdAt</th>
               <th>updatedAt</th>
           </tr>
       </thead>
       <tbody>
       ${arr.map((elem) => {
            return `
            <tr>
                <td>${elem.id}</td>
               <td>${elem.predect}</td>
               <td>${elem.DIDE}</td>
               <td>${elem.createdAt}</td>
               <td>${elem.updatedAt}</td>
            </tr>
        `
        }).join("")}
           
       </tbody>
   </table>
   `}

} else {
    alert("Login First to Come to this Page");
    window.location.href = "./signin.html"
}