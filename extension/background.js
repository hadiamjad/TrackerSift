window.tabId=0;
chrome.tabs.query({active:true},
  function(d){
    //current tab_id--d[1].id--d[1].url==top_level_url
    window.tabId = d[0].id;
    console.log(d);
    chrome.debugger.attach({tabId:tabId}, version,
     function(err){
       if(err)
          console.log(err);
       else
          console.log("debugger attached");
     } );
    chrome.debugger.sendCommand({tabId:tabId}, "Network.enable");
    chrome.debugger.onEvent.addListener(onEvent);
  })
  
  function onEvent(debuggeeId, message, params) {
    if (tabId != debuggeeId.tabId)
    return;

  if (message == "Network.requestWillBeSent") {
    fetch("http://localhost:3000/request", {
      method: "POST", 
      body: JSON.stringify({"http_req": params.request.url,
      "request_id":params.requestId,
      "top_level_url":params.documentURL,
      "resource_type":params.type,
      "header": params.request.headers,
      "call_stack":params.initiator}),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log("Request complete! response");
    });

  }
  else if (message == "Network.responseReceived") {
      chrome.debugger.sendCommand({
          tabId: tabId
      }, "Network.getResponseBody", {
          "requestId": params.requestId
      }, function(response) {
              // you get the response body here!
              fetch("http://localhost:3000/response", {
                method: "POST", 
                body: JSON.stringify({
                "request_id":params.requestId,
                "response":params.response,
                "response_body":response,
                "resource_type":params.type}),
                mode: 'cors',
                headers: {
                  'Access-Control-Allow-Origin':'*',
                  "Content-Type": "application/json"
                }
              }).then(res => {
                console.log("Response complete! response");
              });
      });
    

  }
}


// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.debugger.attach({tabId:tab.id}, version,
//       onAttach.bind(null, tab.id));
// });

// var version = "1.0";


// function onAttach(tabId) {
//   if (chrome.runtime.lastError) {
//     alert(chrome.runtime.lastError.message);
//     return;
//   }

//   chrome.windows.create(
//       {url: "headers.html?" + tabId, type: "popup", width: 800, height: 600});
// }

var version = "1.0";