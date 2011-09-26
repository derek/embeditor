(function(exports){
    
    var callbacks = {};
    
    var Embeditor = function(id){
        return {
            getValue: function(fn){
                callbacks['asd'] = fn;
                document.getElementById(id).contentWindow.postMessage({
                    message: "embeditor:getValue"
                    cbid   : "asd",
                }, "*");
            },
            setValue: function(val){
                document.getElementById(id).contentWindow.postMessage({
                    message: "embeditor:setValue",
                    value  : val
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