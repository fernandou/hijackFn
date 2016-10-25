'use strict'
(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.hijackFn = f();
    }
})(function() {
	function isFunction(fn) {
	    return typeof fn === 'function';
	}

	function hijack(object, prope, hijack_fn) {
	    if (!object || !object[prope]) {
	        throw new Error('no original function to hijack with');
	        return;
	    }

	    if (!hijack_fn) {
	        throw new Error('no hijack function');
	        return;
	    }

	    if (!isFunction(object[prope]) || !isFunction(hijack_fn)) {
	        throw new Error('object.prope and hijack_fn must a function')
	        return
	    }

	    var original = object[prope];
	    var hijacked = hijack_fn.call(object, original, name);

	    hijacked.__unhijack = function() {
	        if (object[prope] === hijacked) object[prope] = original;
	    }
	    hijacked.__hijacked = true;

	    object[prope] = hijacked;

	    return hijacked;
	}

	function unhijack(object, prope) {
	    if (!object[prope].__hijacked) {
	        console.error('please make sure object[prope] is hijacked!');
	    } else {
	        return object[prope].__unhijack();
	    }
	}

	return {
		hijack:hijack,
		unhijack:unhijack
	}
});