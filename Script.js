const ADMIN_PASSWORD = "joewalmartisacat"; 

let parkours = JSON.parse(localStorage.getItem("parkours")) || [];
let adminLogged = false;

function save() {
    localStorage.setItem("parkours", JSON.stringify(parkours));
}

function render() {
    const list = document.getElementById("parkourList");
    list.innerHTML = "";

    parkours.sort((a, b) => b.diff - a.diff);

    parkours.forEach((p, i) => {
        list.innerHTML += `
            <div class="card">
                <img src="${p.img}">
                <h3>#${i + 1} ${p.name}</h3>
                <p>Difficulty: ${p.diff}</p>
            </div>
        `;
    });
}

function showAdmin() {
    document.getElementById("adminPanel").classList.toggle("hidden");
}

function loginAdmin() {
    const pass = document.getElementById("adminPass").value;

    if (pass === ADMIN_PASSWORD) {
        adminLogged = true;
        document.getElementById("adminControls").classList.remove("hidden");
    } else {
        alert("Wrong password");
    }
}

function addParkour() {
    if (!adminLogged) return;

    const name = document.getElementById("parkourName").value;
    const diff = parseInt(document.getElementById("difficulty").value);
    const img = document.getElementById("imageUrl").value;

    parkours.push({ name, diff, img });

    save();
    render();
}

render();
