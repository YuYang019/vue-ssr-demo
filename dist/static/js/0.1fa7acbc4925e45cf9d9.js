(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){"use strict";var o=n(13);n.n(o).a},17:function(e,t,n){"use strict";n.r(t);var o=n(3),r=n(7);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(n,!0).forEach(function(t){s(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={asyncData:function(e){var t=e.store;return t.registerModule("foo",r.a),console.log("registered"),t.dispatch("foo/getItems")},data:function(){return{}},computed:i({},function(){return console.log("map state"),o.c.apply(void 0,arguments)}({list:function(e){return e.foo.list}})),methods:i({},function(){return console.log("map actions"),o.b.apply(void 0,arguments)}("foo",["getItems"]),{handleClick:function(){console.log(this.$store.state)}}),destroyed:function(){this.$store.unregisterModule("foo")}},a=(n(15),n(5)),l=Object(a.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.list?n("div",{staticClass:"foo"},[n("p",[e._v("foo")]),n("button",{on:{click:e.handleClick}},[e._v("aaa")]),n("ul",e._l(e.list,function(t){return n("li",{key:t.id},[e._v(e._s(t.name))])}),0)]):e._e()},[],!1,null,"7d651f8e",null);t.default=l.exports}}]);