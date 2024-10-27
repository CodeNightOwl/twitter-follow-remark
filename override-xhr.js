// (function() {
//     var originalXHR = window.XMLHttpRequest;

//     function overrideXHR() {
//         var xhr = new originalXHR();
//         var requestUrl;

//         var originalOpen = xhr.open;
//         xhr.open = function(method, url, async, user, password) {
//             requestUrl = url; 
//             console.log("XHR request opened:", method, url); 
//             return originalOpen.apply(xhr, arguments);
//         };

//         var originalOnReadyStateChange = xhr.onreadystatechange;
//         xhr.onreadystatechange = function() {
//             if (originalOnReadyStateChange) {
//                 originalOnReadyStateChange.apply(xhr, arguments);
//             }
//             if (xhr.readyState === 4) {
//                 console.log("XHR request completed for URL:", requestUrl, xhr);
//             }
//         };

//         xhr.onerror = function() {
//             console.log("XHR request error for URL:", requestUrl, xhr);
//         };

//         xhr.ontimeout = function() {
//             console.log("XHR request timeout for URL:", requestUrl, xhr);
//         };

//         xhr.onabort = function() {
//             console.log("XHR request aborted for URL:", requestUrl, xhr);
//         };

//         return xhr;
//     }

//     window.XMLHttpRequest = overrideXHR;
// })();