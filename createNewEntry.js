// Check the chrome storage to see if there is a configuration already set up for the extension


document.getElementById("Send").addEventListener("click", async () => {
    try{
        chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
            let url = tabs[0].url;
            let title = tabs[0].title;
            let iconURL = tabs[0].favIconUrl;
            let databaseID = 'fb62e501905e400c988b713255375537';
            let pageID = '04fb5ffc2fd142e290669caacdcd4e13';

            // Test version (The API endpoint for testing)
            const res = await fetch('http://127.0.0.1:5001/savetonotion-6acf8/us-central1/addDBEntry', {
                method: 'POST',
                body: JSON.stringify({
                    url: url,
                    title: title,
                    icon: iconURL,
                    pageID: pageID,
                    databaseID: databaseID
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
})