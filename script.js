let mainList = [];
let waitingList = [];
let ratingsList = [];

function addPlayer() {
    const playerName = document.getElementById('player-name').value;
    if (playerName && mainList.length < 18 && !mainList.includes(playerName)) {
        mainList.push(playerName);
        ratingsList.push({ name: playerName, rating: 0 });
        updateMainList();
        updateRatingsList();
    }
}

function addWaitingPlayer() {
    const playerName = document.getElementById('waiting-player-name').value;
    if (playerName && waitingList.length < 5 && !waitingList.includes(playerName)) {
        waitingList.push(playerName);
        updateWaitingList();
    }
}

function updateMainList() {
    const listElement = document.getElementById('player-list');
    listElement.innerHTML = '';
    mainList.forEach((player, index) => {
        const listItem = document.createElement('li');
        const color = document.createElement('div');
        color.className = 'square';
        color.style.backgroundColor = '#ccc';  // Default color

        listItem.innerHTML = `${index + 1}. ${player}`;
        listItem.appendChild(color);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editPlayer(index);

        listItem.appendChild(editButton);
        listElement.appendChild(listItem);
    });
}

function updateWaitingList() {
    const listElement = document.getElementById('waiting-player-list');
    listElement.innerHTML = '';
    waitingList.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${index + 1}. ${player}`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editWaitingPlayer(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Șterge';
        deleteButton.onclick = () => deleteWaitingPlayer(index);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        listElement.appendChild(listItem);
    });
}

function deleteMainList() {
    const password = prompt("Introduceți parola:");
    if (password === '1234567') {
        mainList = [];
        updateMainList();
    } else {
        alert("Parolă incorectă!");
    }
}

function editPlayer(index) {
    const password = prompt("Introduceți parola:");
    if (password === '1234567') {
        const newPlayerName = prompt("Introduceți noul nume:");
        const newColor = prompt("Introduceți noua culoare (ex: red):");
        if (newPlayerName) {
            mainList[index] = newPlayerName;
            ratingsList[index].name = newPlayerName;
        }
        if (newColor) {
            document.querySelectorAll('.square')[index].style.backgroundColor = newColor;
        }
        updateMainList();
    } else {
        alert("Parolă incorectă!");
    }
}

function editWaitingPlayer(index) {
    const password = prompt("Introduceți parola:");
    if (password === '1234567') {
        const newPlayerName = prompt("Introduceți noul nume:");
        if (newPlayerName) {
            waitingList[index] = newPlayerName;
            updateWaitingList();
        }
    } else {
        alert("Parolă incorectă!");
    }
}

function deleteWaitingPlayer(index) {
    const password = prompt("Introduceți parola:");
    if (password === '1234567') {
        waitingList.splice(index, 1);
        updateWaitingList();
        alert("Jucătorul a fost șters cu succes!");
    } else {
        alert("Parolă incorectă!");
    }
}

function updateRatingsList() {
    const listElement = document.getElementById('rating-player-list');
    listElement.innerHTML = '';
    ratingsList.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${player.name} 
            <input type="number" min="1" max="10" value="${player.rating}" 
            onchange="updateRating(${index}, this.value)">`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Șterge';
        deleteButton.onclick = () => deleteRatingPlayer(index);

        listItem.appendChild(deleteButton);
        listElement.appendChild(listItem);
    });
}

function deleteRatingPlayer(index) {
    const password = prompt("Introduceți parola:");
    if (password === '1234567') {
        ratingsList.splice(index, 1);
        updateRatingsList();
        alert("Jucătorul a fost șters cu succes!");
    } else {
        alert("Parolă incorectă!");
    }
}

function updateRating(index, rating) {
    ratingsList[index].rating = Number(rating);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateTeams() {
    let players = shuffle([...ratingsList]);

    let team1 = players.slice(0, 6);
    let team2 = players.slice(6, 12);
    let team3 = players.slice(12, 18);

    displayTeams(team1, team2, team3);
}

function displayTeams(team1, team2, team3) {
    document.getElementById('teams').innerHTML = `
        <h3>Team 1</h3>
        <ul>${team1.map(player => `<li>${player.name} (${player.rating})</li>`).join('')}</ul>
        <h3>Team 2</h3>
        <ul>${team2.map(player => `<li>${player.name} (${player.rating})</li>`).join('')}</ul>
        <h3>Team 3</h3>
        <ul>${team3.map(player => `<li>${player.name} (${player.rating})</li>`).join('')}</ul>
    `;
}

function regenerateTeams() {
    generateTeams();
}

function deleteTeams() {
    const password = prompt("Introduceți parola:");
    if (password === '1234567') {
        document.getElementById('teams').innerHTML = '';
    } else {
        alert("Parolă incorectă!");
    }
}

// Save and load functions
function saveLists() {
    localStorage.setItem('mainList', JSON.stringify(mainList));
    localStorage.setItem('waitingList', JSON.stringify(waitingList));
    localStorage.setItem('ratingsList', JSON.stringify(ratingsList));
}

function loadLists() {
    if (localStorage.getItem('mainList')) {
        mainList = JSON.parse(localStorage.getItem('mainList'));
    }
    if (localStorage.getItem('waitingList')) {
        waitingList = JSON.parse(localStorage.getItem('waitingList'));
    }
    if (localStorage.getItem('ratingsList')) {
        ratingsList = JSON.parse(localStorage.getItem('ratingsList'));
    }
    updateMainList();
    updateWaitingList();
    updateRatingsList();
}

window.onload = loadLists;
window.onbeforeunload = saveLists;
