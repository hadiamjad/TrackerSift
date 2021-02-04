var tabId = parseInt(window.location.search.substring(1));

window.addEventListener("load", function() {
  chrome.debugger.sendCommand({tabId:tabId}, "Network.enable");
  chrome.debugger.onEvent.addListener(onEvent);
});

window.addEventListener("unload", function() {
  chrome.debugger.detach({tabId:tabId});
});

var requests = {};

function onEvent(debuggeeId, message, params) {
  if (tabId != debuggeeId.tabId)
    return;

  if (message == "Network.requestWillBeSent") {
    var requestDiv = requests[params.requestId];
    if (!requestDiv) {
      var requestDiv = document.createElement("div");
      requestDiv.className = "request";
      requests[params.requestId] = requestDiv;

      // request url
      var urlLine = document.createElement("div");
      urlLine.textContent = params.request.url;
      requestDiv.appendChild(urlLine);   
    }

    // request call stack
    var stack = document.createElement("div");
    stack.textContent = "\n" + JSON.stringify(params.initiator);
    requestDiv.appendChild(stack);

    fetch("http://localhost:3000/", {
      method: "POST", 
      body: "lol",
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      console.log("Request complete! response");
    });

    document.getElementById("container").appendChild(requestDiv);
  } 
}