const originalFetch = window.fetch;
window.fetch = function (...args) {
  if (args[0].includes("x.com")) {
    // console.log("Fetch request:", args);
    args[1].headers['x-csrf-token'] = document.cookie.match(/ct0=([^;]+)/)[1];

    return originalFetch.apply(this, args).then(response => {
        const responseClone = response.clone();

        responseClone.json().then(json => {
            // console.log(`Fetch response for ${args[0]}:`, json);
        }).catch(error => {
            console.error("Error in reading response body as JSON:", error);
        });
        // 只能拿到自己请求的，无意义。
        // console.log("Fetch response:", response);
        return response;
    });
   }
};



