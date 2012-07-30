(function(exports){
    
    var callbacks  = {},
        isReady    = false,
        Embeditor;
    
    Embeditor = function(id){
        return {
            getValue: function(fn){
                if (isReady){
                    var callback_id = Math.random();
                    callbacks[callback_id] = fn;
                    document.getElementById(id).contentWindow.postMessage({
                        "message"    : "embeditor:getValue",
                        "cbid"       : callback_id,
                        "instanceId" : id
                    }, "*");
                }
                else{
                    //console.log("Not ready");
                }
            },
            setValue: function(val){
                if (isReady){
                    document.getElementById(id).contentWindow.postMessage({
                        message : "embeditor:setValue",
                        value   : val
                    }, "*")
                }
                else{
                    //console.log("Not ready");
                }
            },
            onReady: function(fn){
                callbacks["onReady" + id] = fn;
            }
        }
    };
    
    window.addEventListener("message", function(e){
        switch(e.data.message) {
            case "embeditor:ready":
                isReady = true;
                if (callbacks["onReady" + e.data.windowName]) {
                    callbacks["onReady" + e.data.windowName]();
                }
                break;
                
            case "embeditor:sendValue":
                callbacks[e.data.cbid](e.data.value);
                delete callbacks[e.data.cbid];
                break;
        }
    }, false);
    
    exports.Embeditor = Embeditor;
    
})(window);