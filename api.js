var Embeditor = {
    getInstance: function(id){
      id = id || "embeditor";
      /*return document.getElementById(id).contentWindow.postMessage({
        
      })*/
    },
    getValue: function(id, cb){
        id = id || "embeditor";
        Embeditor.recieveValue = cb;
        document.getElementById(id).contentWindow.postMessage({
            message: "embeditor:getValue"
        }, "*")
    },
    setValue: function(id, val){
        id = id || "embeditor";
        document.getElementById(id).contentWindow.postMessage({
            message: "embeditor:setValue",
            value: val
        }, "*")
    }
}

window.addEventListener("message", function(e){
    if (e.data.message === "embeditor:ready") {
        Embeditor.onReady(e.windowName);   
    }
    else if (e.data.message === "embeditor:sendValue") {
        //console.log(e.data.value);   
        Embeditor.recieveValue(e.data.value);
    }
}, false);