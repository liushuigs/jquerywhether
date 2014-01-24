jQuery.extend({
    whether: function(firstParam) {
        var sliceDeferred = [].slice;
        var args = sliceDeferred.call(arguments, 0), 
        i = 0, 
        length = args.length, 
        pValues = new Array(length), 
        count = length, 
        pCount = length, 
        deferred = length <= 1 && firstParam && jQuery.isFunction(firstParam.promise) ? 
        firstParam : 
        jQuery.Deferred(), 
        promise = deferred.promise();
        function rejectFunc(i) {
            return function(value) {
                args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                if (!(--count)) {
                    deferred.rejectWith(deferred,args);
                }
            };
        }
        function resolveFunc() {
            var fired = 0;
            return fired++ ? function(){} : function(value){
                deferred.resolveWith(deferred,[value]);
            }
        }
        function progressFunc(i) {
            return function(value) {
                pValues[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                deferred.notifyWith(promise, pValues);
            };
        }
        if (length > 1) {
            for (; i < length; i++) {
                if (args[i] && args[i].promise && jQuery.isFunction(args[i].promise)) {
                    args[i].promise().then(resolveFunc(), rejectFunc(i), progressFunc(i));
                } else {
                    --count;
                }
            }
            if (!count) {
                deferred.rejectWith(deferred, args);
            }
        } else if (deferred !== firstParam) {
            deferred.rejectWith(deferred, length ? [firstParam] : []);
        }
        return promise;
    }
});
