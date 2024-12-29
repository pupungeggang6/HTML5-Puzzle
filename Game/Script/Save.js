function saveInit() {
    let tempSave = localStorage.getItem(fileName)

    if (!tempSave) {
        localStorage.setItem(fileName, JSON.stringify(emptySave))
    }

    save = JSON.parse(localStorage.getItem(fileName))
}

function saveData() {
    localStorage.setItem(fileName, JSON.stringify(save))
}

function loadData() {
    save = JSON.parse(localStorage.getItem(fileName))
}

function eraseData() {
    localStorage.setItem(fileName, JSON.stringify(emptySave))
    save = JSON.parse(localStorage.getItem(fileName))
}
