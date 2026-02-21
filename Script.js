let currentUser = localStorage.getItem("user");

let parkours = JSON.parse(localStorage.getItem("parkours")) || [];
let players = JSON.parse(localStorage.getItem("players")) || {};

function login() {
    let name = document.getElementById("username").value;
    if (!name) return;

    currentUser = name;
    localStorage.setItem("user", name);

    if (!players[name]) {
        players[name] = { points: 0 };
    }

    savePlayers();
    updateUI();
}

function savePlayers() {
    localStorage.setItem("players", JSON.stringify(players));
}

function saveParkours() {
    localStorage.setItem("parkours", JSON.stringify(parkours));
}

function addParkour() {
    let name = document.getElementById("parkourName").value;
    let diff = parseInt(document.getElementById("difficulty").value);
    let img = document.getElementById("imageUrl").value;

    parkours.push({ name, diff, img });
    parkours.sort((a, b) => b.diff - a.diff);

    saveParkours();
    renderParkours();
}

function beatParkour(points) {
    if (!currentUser) {
        alert("Login first!");
        return;
    }

    players[currentUser].points += points;
    savePlayers();
    renderLeaderboard();
}

function renderParkours() {
    let container = document.getElementById("parkourList");
    container.innerHTML = "";

    parkours.forEach((p, i) => {
        container.innerHTML += `
            <div class="parkour">
                <h3>#${i + 1} ${p.name}</h3>
                <img src="${p.img}">
                <p>Difficulty: ${p.diff}</p>
                <button onclick="beatParkour(${p.diff})">I Beat This</button>
            </div>
        `;
    });
}

function renderLeaderboard() {
    let board = document.getElementById("leaderboard");
    board.innerHTML = "";

    let sorted = Object.entries(players)
        .sort((a, b) => b[1].points - a[1].points);

    sorted.forEach(([name, data], i) => {
        board.innerHTML += `<p>#${i + 1} ${name} — ${data.points} pts</p>`;
    });
}

function updateUI() {
    document.getElementById("welcome").innerText =
        currentUser ? "Welcome " + currentUser : "";

    renderParkours();
    renderLeaderboard();
}

updateUI();
