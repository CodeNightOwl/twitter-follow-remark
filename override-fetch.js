const originalFetch = window.fetch;
window.fetch = function (...args) {
  // if (args[0].includes("x.com")) {
    console.log("Fetch request:", args);

    return originalFetch.apply(this, args).then(response => {
        const responseClone = response.clone();

        responseClone.json().then(json => {
            // console.log(`Fetch response for ${args[0]}:`, json);
        }).catch(error => {
            console.error("Error in reading response body as JSON:", error);
        });

        return response;
    });
  // }
};



