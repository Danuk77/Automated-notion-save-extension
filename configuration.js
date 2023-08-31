const submit = document.getElementById("Submit");
const intField = document.getElementById("IntegrationIn");
const dbField = document.getElementById("DatabaseIn");

// Load the already existing integration key value
chrome.storage.sync.get(["integrationKey"]).then((result) => {
    if(result.integrationKey){
        intField.value = result.integrationKey;
    }
});

// Load the already existing database ID value
chrome.storage.sync.get(["databaseID"]).then((result) => {
    if(result.databaseID){
        dbField.value = result.databaseID;
    }
});

// Settings button
submit.addEventListener("click", async function() {
    // Do the button click animation
    this.classList.add("clicked");

    setTimeout(() => {
        this.classList.remove("clicked");
    }, 50);

    let integrationKey = document.getElementById("IntegrationIn").value;
    let databaseID = document.getElementById("DatabaseIn").value;

    // Update the chrome storage elements
    await chrome.storage.sync.set({integrationKey}, function () {
        console.log("Done");
    });

    await chrome.storage.sync.set({databaseID}, function () {
        console.log("Done");
    });
});