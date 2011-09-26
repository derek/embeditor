(function(exports){
    
    var callbacks = {};
    
    var Embeditor = function(id){
        return {
            getValue: function(fn){
                var callback_id = Math.random();
                callbacks[callback_id] = fn;
                document.getElementById(id).contentWindow.postMessage({
                    message : "embeditor:getValue",
                    cbid    : callback_id
                }, "*");
            },
            setValue: function(val){
                document.getElementById(id).contentWindow.postMessage({
                    message : "embeditor:setValue",
                    value   : val
                }, "*")
            }
        }
    }
    
    window.addEventListener("message", function(e){
        switch(e.data.message) {
            case "embeditor:ready":
                // TODO
                break;
                
            case "embeditor:sendValue":
                callbacks[e.data.cbid](e.data.value);
                delete callbacks[e.data.cbid];
                break;
        }
        
    }, false);
    
    exports.Embeditor = Embeditor;
    
})(window);