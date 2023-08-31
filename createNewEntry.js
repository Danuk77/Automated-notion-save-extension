// Check the chrome storage to see if there is a configuration already set up for the extension
const submit = document.getElementById("Submit");
const settings = document.getElementById("Settings");
const url = document.getElementById("URLin");
const title = document.getElementById("Titlein");
const description = document.getElementById("Descriptionin");

// Values relating to the website the user is on
let urlValue = null;
let titleValue = null;
let icon = null;
let integrationKey = null;
let databaseID = null;

// TODO - add functionality when it doesnt exist
chrome.storage.sync.get(["integrationKey"]).then((result) => {
    if(result.integrationKey){
        integrationKey = result.integrationKey;
    }
});

// TODO - add functionality when it doesnt exist
chrome.storage.sync.get(["databaseID"]).then((result) => {
    if(result.integrationKey){
        databaseID = result.integrationKey;
    }
});


// Update the variables depending on what page the user is in
try{
    chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
        urlValue = tabs[0].url;
        titleValue = tabs[0].title;
        icon = tabs[0].favIconUrl;

        // Update the UI fields
        url.value = tabs[0].url;
        title.value = tabs[0].title;
    });
}catch(err){
    console.log(err);
}

submit.addEventListener("click", async () => {
    try{        
        // Retrieve the information and make a call to the backend
        chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
            let databaseID = 'fb62e501905e400c988b713255375537';
            let pageID = '04fb5ffc2fd142e290669caacdcd4e13';
            // Test version (The API endpoint for testing)
            const res = await fetch('http://127.0.0.1:5001/savetonotion-6acf8/us-central1/addDBEntry', {
                method: 'POST',
                body: JSON.stringify({
                    url: urlValue,
                    title: titleValue,
                    icon: icon,
                    pageID: pageID,
                    databaseID: databaseID,
                    description:description.value
                })
            });
            // Production version (The API endpoint for production)
            // const res = await fetch('https://addmessage-hfmr2rshba-uc.a.run.app', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         text: "SomeURL"
            //     })
            // });

        console.log(res);
        });

    }catch(err){
        console.log(err);
    }
});


// Animations for clicking on buttons
// Submit button
submit.addEventListener("click", function() {
    this.classList.add("clicked");

    setTimeout(() => {
        this.classList.remove("clicked");
    }, 50);
})

// Settings button
settings.addEventListener("click", async function() {
    this.classList.add("clicked");

    setTimeout(() => {
        this.classList.remove("clicked");
    }, 50);

    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('configuration.html'));
    }
})