chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  sendResponse('received');
  console.log(11111111111,request,sender)
  // 获取reqeust，sender中的数据内容，并进行匹配拼装，发送到后台
  

})



chrome.webRequest.onBeforeSendHeaders.addListener(details =>{
  console.log(11111111111,details)
  // '''
  // 获取到请求数据之后，新增到map中
  // '''
},{urls:["<all_urls>"]},['requestHeaders'])



chrome.webRequest.onCompleted.addListener(details =>{
  console.log(3333333,details)
  // '''
  // 获取到响应数据之后，查找请求信息组装到map中
  // '''
},{urls:["<all_urls>"]},['requestHeaders'])




chrome.runtime.onInstalled.addListener(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.type === 'FROM_PAGE_TO_CONTENT_SCRIPT') {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                  action: "showFollowersDialog",
                  data: request.data.friends
              });
          });
      }
  });
});

window.addEventListener("message", function(event) {
  if (event.source == window && event.data.type && (event.data.type == "FROM_PAGE")) {
      chrome.runtime.sendMessage({type: 'FROM_PAGE_TO_CONTENT_SCRIPT', data: event.data.data});
  }
}, false);