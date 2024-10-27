var scriptFetch = document.createElement('script');
scriptFetch.src = chrome.runtime.getURL('override-fetch.js');
(document.head || document.documentElement).appendChild(scriptFetch);

var scriptXHR = document.createElement('script');
scriptXHR.src = chrome.runtime.getURL('override-xhr.js');
(document.head || document.documentElement).appendChild(scriptXHR);


var scriptXHR2 = document.createElement('script');
scriptXHR2.src = chrome.runtime.getURL('override-xhr2.js');
(document.head || document.documentElement).appendChild(scriptXHR2);



// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.action === "showFollowersDialog") {
//         console.log("Received message:", message);
//         showFollowersDialog(message.data);
//         sendResponse({status: "Function executed successfully"});
//     }
// });


// setInterval(showFollowersDialog,1000)