/*! For license information please see simpleab-sdk.es5.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SimpleABSDK=e():t.SimpleABSDK=e()}("undefined"!=typeof self?self:this,(function(){return function(){var t={987:function(t,e,r){var n=r(36),o=n.SimpleABSDK,i=n.BaseAPIUrls,a=n.AggregationTypes,s=n.Treatments,c=n.Stages;"undefined"!=typeof window&&(window.SimpleABSDK=o,window.BaseAPIUrls=i,window.AggregationTypes=a,window.Treatments=s,window.Stages=c),t.exports={SimpleABSDK:o,BaseAPIUrls:i,AggregationTypes:a,Treatments:s,Stages:c}},203:function(t){function e(t,e){var r=t[0],s=t[1],c=t[2],u=t[3];r=n(r,s,c,u,e[0],7,-680876936),u=n(u,r,s,c,e[1],12,-389564586),c=n(c,u,r,s,e[2],17,606105819),s=n(s,c,u,r,e[3],22,-1044525330),r=n(r,s,c,u,e[4],7,-176418897),u=n(u,r,s,c,e[5],12,1200080426),c=n(c,u,r,s,e[6],17,-1473231341),s=n(s,c,u,r,e[7],22,-45705983),r=n(r,s,c,u,e[8],7,1770035416),u=n(u,r,s,c,e[9],12,-1958414417),c=n(c,u,r,s,e[10],17,-42063),s=n(s,c,u,r,e[11],22,-1990404162),r=n(r,s,c,u,e[12],7,1804603682),u=n(u,r,s,c,e[13],12,-40341101),c=n(c,u,r,s,e[14],17,-1502002290),r=o(r,s=n(s,c,u,r,e[15],22,1236535329),c,u,e[1],5,-165796510),u=o(u,r,s,c,e[6],9,-1069501632),c=o(c,u,r,s,e[11],14,643717713),s=o(s,c,u,r,e[0],20,-373897302),r=o(r,s,c,u,e[5],5,-701558691),u=o(u,r,s,c,e[10],9,38016083),c=o(c,u,r,s,e[15],14,-660478335),s=o(s,c,u,r,e[4],20,-405537848),r=o(r,s,c,u,e[9],5,568446438),u=o(u,r,s,c,e[14],9,-1019803690),c=o(c,u,r,s,e[3],14,-187363961),s=o(s,c,u,r,e[8],20,1163531501),r=o(r,s,c,u,e[13],5,-1444681467),u=o(u,r,s,c,e[2],9,-51403784),c=o(c,u,r,s,e[7],14,1735328473),r=i(r,s=o(s,c,u,r,e[12],20,-1926607734),c,u,e[5],4,-378558),u=i(u,r,s,c,e[8],11,-2022574463),c=i(c,u,r,s,e[11],16,1839030562),s=i(s,c,u,r,e[14],23,-35309556),r=i(r,s,c,u,e[1],4,-1530992060),u=i(u,r,s,c,e[4],11,1272893353),c=i(c,u,r,s,e[7],16,-155497632),s=i(s,c,u,r,e[10],23,-1094730640),r=i(r,s,c,u,e[13],4,681279174),u=i(u,r,s,c,e[0],11,-358537222),c=i(c,u,r,s,e[3],16,-722521979),s=i(s,c,u,r,e[6],23,76029189),r=i(r,s,c,u,e[9],4,-640364487),u=i(u,r,s,c,e[12],11,-421815835),c=i(c,u,r,s,e[15],16,530742520),r=a(r,s=i(s,c,u,r,e[2],23,-995338651),c,u,e[0],6,-198630844),u=a(u,r,s,c,e[7],10,1126891415),c=a(c,u,r,s,e[14],15,-1416354905),s=a(s,c,u,r,e[5],21,-57434055),r=a(r,s,c,u,e[12],6,1700485571),u=a(u,r,s,c,e[3],10,-1894986606),c=a(c,u,r,s,e[10],15,-1051523),s=a(s,c,u,r,e[1],21,-2054922799),r=a(r,s,c,u,e[8],6,1873313359),u=a(u,r,s,c,e[15],10,-30611744),c=a(c,u,r,s,e[6],15,-1560198380),s=a(s,c,u,r,e[13],21,1309151649),r=a(r,s,c,u,e[4],6,-145523070),u=a(u,r,s,c,e[11],10,-1120210379),c=a(c,u,r,s,e[2],15,718787259),s=a(s,c,u,r,e[9],21,-343485551),t[0]=h(r,t[0]),t[1]=h(s,t[1]),t[2]=h(c,t[2]),t[3]=h(u,t[3])}function r(t,e,r,n,o,i){return e=h(h(e,t),h(n,i)),h(e<<o|e>>>32-o,r)}function n(t,e,n,o,i,a,s){return r(e&n|~e&o,t,e,i,a,s)}function o(t,e,n,o,i,a,s){return r(e&o|n&~o,t,e,i,a,s)}function i(t,e,n,o,i,a,s){return r(e^n^o,t,e,i,a,s)}function a(t,e,n,o,i,a,s){return r(n^(e|~o),t,e,i,a,s)}function s(t){var e,r=[];for(e=0;e<64;e+=4)r[e>>2]=t.charCodeAt(e)+(t.charCodeAt(e+1)<<8)+(t.charCodeAt(e+2)<<16)+(t.charCodeAt(e+3)<<24);return r}var c="0123456789abcdef".split("");function u(t){for(var e="",r=0;r<4;r++)e+=c[t>>8*r+4&15]+c[t>>8*r&15];return e}function f(t){return function(t){for(var e=0;e<t.length;e++)t[e]=u(t[e]);return t.join("")}(function(t){var r,n=t.length,o=[1732584193,-271733879,-1732584194,271733878];for(r=64;r<=t.length;r+=64)e(o,s(t.substring(r-64,r)));t=t.substring(r-64);var i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(r=0;r<t.length;r++)i[r>>2]|=t.charCodeAt(r)<<(r%4<<3);if(i[r>>2]|=128<<(r%4<<3),r>55)for(e(o,i),r=0;r<16;r++)i[r]=0;return i[14]=8*n,e(o,i),o}(t))}function h(t,e){return t+e&4294967295}if("5d41402abc4b2a76b9719d911017c592"!=f("hello"))function h(t,e){var r=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(r>>16)<<16|65535&r}t.exports=f},36:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function o(t,e){if(t){if("string"==typeof t)return n(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,s=[],c=!0,u=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(s.push(n.value),s.length!==e);c=!0);}catch(t){u=!0,o=t}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(u)throw o}}return s}}(t,e)||o(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function s(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function s(t){a(i,n,o,s,c,"next",t)}function c(t){a(i,n,o,s,c,"throw",t)}s(void 0)}))}}function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function u(t){var e=function(t){if("object"!=c(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=c(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==c(e)?e:e+""}function f(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,u(n.key),n)}}function h(t,e,r){return e&&f(t.prototype,e),r&&f(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e,r){return(e=u(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var d=r(756),y=r.n(d);function m(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return v(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?v(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}t=r.hmd(t);var b=r(203),g=r(945),w=h((function t(){l(this,t)}));p(w,"CAPTCHIFY_NA","https://api.captchify.com");var x=function(){return h((function t(){l(this,t)}),null,[{key:"isValid",value:function(t){return[this.ONE_MINUTE,this.FIVE_MINUTE].includes(t)}}])}();p(x,"ONE_MINUTE",6e4);var E=function(){return h((function t(){l(this,t)}),null,[{key:"isValid",value:function(t){return[this.SUM,this.AVERAGE,this.PERCENTILE].includes(t)}}])}();p(E,"SUM","sum"),p(E,"AVERAGE","average"),p(E,"PERCENTILE","percentile");var T=function(){return h((function t(){l(this,t)}),null,[{key:"isValid",value:function(t){return[this.NONE,this.CONTROL].concat((e=this.TREATMENTS,function(t){if(Array.isArray(t))return n(t)}(e)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())).includes(t);var e}}])}();p(T,"NONE",""),p(T,"CONTROL","C"),p(T,"TREATMENTS",Array.from({length:255},(function(t,e){return"T".concat(e+1)})));var _=function(){return h((function t(){l(this,t)}),null,[{key:"isValid",value:function(t){return[this.BETA,this.PROD].includes(t)}}])}();p(_,"BETA","Beta"),p(_,"PROD","Prod");var A=function(){function t(e,r,n){l(this,t),this.countryCode=e||"",this.region=r||"",this.deviceType=n||""}return h(t,[{key:"toJSON",value:function(){return{countryCode:this.countryCode,region:this.region,deviceType:this.deviceType}}}],[{key:"fromJSON",value:function(e){return new t(e.countryCode,e.region,e.deviceType)}}])}(),S=function(){return h((function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];l(this,t),this.apiURL=e,this.apiKey=r,this.experiments=n,this.cache=new Map,this.buffer={},this.flushInterval=x.ONE_MINUTE,n.length>0&&this._loadExperiments(n).catch((function(t){console.log("Error loading experiments:",t.message)})),this._startCacheRefresh(),this._startBufferFlush()}),[{key:"getTreatment",value:(p=s(y().mark((function t(e,r,n,o){var i,a,s,c,u,f,h;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._getExperiment(e);case 2:if(i=t.sent,t.prev=3,!(a=this._checkForOverride(i,r,n,o))){t.next=7;break}return t.abrupt("return",a);case 7:if(s=i.stages.find((function(t){return t.stage===r}))){t.next=10;break}throw new Error("Stage ".concat(r," not found for experiment ").concat(e));case 10:if(c=s.stageDimensions.find((function(t){return t.dimension===n}))){t.next=13;break}throw new Error("Dimension ".concat(n," not found for stage ").concat(r," in experiment ").concat(e));case 13:if(c.enabled){t.next=15;break}return t.abrupt("return","");case 15:if(u=this._calculateHash(o+i.allocationRandomizationToken),f=this._calculateHash(o+i.exposureRandomizationToken),this._isInExposureBucket(f,c.exposure)){t.next=19;break}return t.abrupt("return","");case 19:return h=this._determineTreatment(u,c.treatmentAllocations),t.abrupt("return",h||"");case 23:return t.prev=23,t.t0=t.catch(3),t.abrupt("return","");case 26:case"end":return t.stop()}}),t,this,[[3,23]])}))),function(t,e,r,n){return p.apply(this,arguments)})},{key:"_checkForOverride",value:function(t,e,r,n){if(!t.overrides)return null;var o,i=m(t.overrides);try{for(i.s();!(o=i.n()).done;){var a=o.value;if(a.allocationKey===n){var s,c=m(a.stageOverrides);try{for(c.s();!(s=c.n()).done;){var u=s.value;if(u.stage===e&&u.enabled&&u.dimensions.includes(r))return u.treatment}}catch(t){c.e(t)}finally{c.f()}}}}catch(t){i.e(t)}finally{i.f()}return null}},{key:"_getExperiment",value:(f=s(y().mark((function t(e){return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.cache.has(e)){t.next=2;break}return t.abrupt("return",this.cache.get(e));case 2:return t.next=4,this._loadExperiments([e]);case 4:if(this.cache.has(e)){t.next=6;break}throw new Error("Experiment ".concat(e," not found"));case 6:return t.abrupt("return",this.cache.get(e));case 7:case"end":return t.stop()}}),t,this)}))),function(t){return f.apply(this,arguments)})},{key:"_loadExperiments",value:(u=s(y().mark((function t(e){var r,n,o,i,a,s,c,u;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.prev=0,r=50,n=0;case 3:if(!(n<e.length)){t.next=18;break}return o=e.slice(n,n+r),t.next=7,g("".concat(this.apiURL,"/experiments/batch/list"),{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":this.apiKey},body:JSON.stringify({ids:o})});case 7:if((i=t.sent).ok){t.next=10;break}throw new Error("API request failed with status code: ".concat(i.status));case 10:return t.next=12,i.json();case 12:a=t.sent,s=m(a.success);try{for(s.s();!(c=s.n()).done;)u=c.value,this.cache.set(u.id,u)}catch(t){s.e(t)}finally{s.f()}case 15:n+=r,t.next=3;break;case 18:t.next=24;break;case 20:throw t.prev=20,t.t0=t.catch(0),console.error("Error loading experiments:",t.t0.message),t.t0;case 24:case"end":return t.stop()}}),t,this,[[0,20]])}))),function(t){return u.apply(this,arguments)})},{key:"_startCacheRefresh",value:function(){var t=this;this.cacheRefreshInterval=setInterval((function(){return t._refreshCache()}),6e5)}},{key:"close",value:function(){this.cacheRefreshInterval&&(clearInterval(this.cacheRefreshInterval),this.cacheRefreshInterval=null),this.bufferFlushInterval&&(clearInterval(this.bufferFlushInterval),this.bufferFlushInterval=null)}},{key:"_refreshCache",value:(c=s(y().mark((function t(){var e;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e=Array.from(this.cache.keys()),t.next=4,this._loadExperiments(e);case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.error("Error refreshing experiments:",t.t0.message);case 9:case"end":return t.stop()}}),t,this,[[0,6]])}))),function(){return c.apply(this,arguments)})},{key:"_calculateHash",value:function(t){return b(t)}},{key:"_isInExposureBucket",value:function(t,e){var r=parseInt(t.substring(0,8),16);return 4294967295===r&&100===e||(0!==r||0!==e)&&r/4294967295<e/100}},{key:"_determineTreatment",value:function(t,e){var r,n=parseInt(t.substring(0,8),16)/4294967295,o=0,i=m(e);try{for(i.s();!(r=i.n()).done;){var a=r.value;if(n<(o+=a.allocation/100))return a.id}}catch(t){i.e(t)}finally{i.f()}return""}},{key:"trackMetric",value:(a=s(y().mark((function t(e){var r,n,o,i,a,s,c,u,f,h,l;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.experimentID,n=e.stage,o=e.dimension,i=e.treatment,a=e.metricName,s=e.metricValue,c=e.aggregationType,u=void 0===c?E.SUM:c,T.isValid(i)){t.next=3;break}throw new Error("Invalid treatment string");case 3:if(_.isValid(n)){t.next=5;break}throw new Error("Invalid stage string");case 5:if(E.isValid(u)){t.next=7;break}throw new Error("Invalid aggregation type: ".concat(u));case 7:if(""!==i){t.next=9;break}return t.abrupt("return");case 9:return t.next=11,this._getExperiment(r);case 11:if(f=t.sent,h=f.stages.find((function(t){return t.stage===n}))){t.next=15;break}throw new Error("Stage ".concat(n," not found for experiment ").concat(r));case 15:if(h.stageDimensions.find((function(t){return t.dimension===o}))){t.next=18;break}throw new Error("Dimension ".concat(o," not found for stage ").concat(n," in experiment ").concat(r));case 18:if(f.treatments.find((function(t){return t.id===i}))){t.next=21;break}throw new Error("Treatment ".concat(i," in experiment ").concat(r));case 21:if(l="".concat(r,"-").concat(n,"-").concat(o,"-").concat(i,"-").concat(a,"-").concat(u),this.buffer[l]||(this.buffer[l]={sum:0,count:0,values:[]}),!(u===E.SUM&&s<0)){t.next=25;break}throw new Error("Metric ".concat(a," cannot be negative for AggregrationTypes.SUM"));case 25:this.buffer[l].sum+=s,this.buffer[l].count+=1,u===E.PERCENTILE&&this.buffer[l].values.push(s);case 28:case"end":return t.stop()}}),t,this)}))),function(t){return a.apply(this,arguments)})},{key:"_startBufferFlush",value:function(){var t=this;this.bufferFlushInterval=setInterval((function(){Object.keys(t.buffer).length>0&&t._flushMetrics()}),this.flushInterval)}},{key:"_calculatePercentiles",value:function(t,e){if(0===t.length)return{};t.sort((function(t,e){return t-e}));var r={};return e.forEach((function(e){var n=Math.ceil(e/100*t.length)-1;r[e]=t[n]})),r}},{key:"_flushMetrics",value:(o=s(y().mark((function t(){var e,r,n,o=this;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e=Object.entries(this.buffer).map((function(t){var e,r=i(t,2),n=r[0],a=r[1],s=i(n.split("-"),6),c=s[0],u=s[1],f=s[2],h=s[3],l=s[4],p=s[5];if(p===E.AVERAGE)e=a.sum/a.count;else{if(p===E.PERCENTILE){var d=o._calculatePercentiles(a.values,[50,90,99]);return{experimentID:c,stage:u,dimension:f,treatment:h,metricName:l,aggregationType:p,p50:d[50],p90:d[90],p99:d[99],count:a.count}}e=a.sum}return{experimentID:c,stage:u,dimension:f,treatment:h,metricName:l,aggregationType:p,value:e,count:a.count}})),r=[],n=0;n<e.length;n+=150)r.push(e.slice(n,n+150));return t.prev=4,t.next=7,Promise.all(r.map(function(){var t=s(y().mark((function t(e){var r;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,g("".concat(o.apiURL,"/metrics/track/batch"),{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":o.apiKey},body:JSON.stringify({metrics:e})});case 3:if((r=t.sent).ok){t.next=6;break}throw new Error("API request failed with status code: ".concat(r.status));case 6:t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error("Error sending metrics batch:",t.t0.message);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()));case 7:this.buffer={},t.next=13;break;case 10:t.prev=10,t.t0=t.catch(4),console.error("Error sending metrics batches:",t.t0.message);case 13:case"end":return t.stop()}}),t,this,[[4,10]])}))),function(){return o.apply(this,arguments)})},{key:"flush",value:(n=s(y().mark((function t(){return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._flushMetrics();case 2:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)})},{key:"getSegment",value:(r=s(y().mark((function t(){var e,r,n,o=arguments;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=o.length>0&&void 0!==o[0]?o[0]:{},t.prev=1,t.next=4,g("".concat(this.apiURL,"/segment"),{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":this.apiKey},body:JSON.stringify({ip:e.ip,userAgent:e.userAgent})});case 4:if((r=t.sent).ok){t.next=7;break}throw new Error("API request failed with status code: ".concat(r.status));case 7:return t.next=9,r.json();case 9:return n=t.sent,t.abrupt("return",A.fromJSON(n));case 13:throw t.prev=13,t.t0=t.catch(1),console.error("Error getting segment:",t.t0.message),t.t0;case 17:case"end":return t.stop()}}),t,this,[[1,13]])}))),function(){return r.apply(this,arguments)})},{key:"getTreatmentWithSegment",value:(e=s(y().mark((function t(e,r,n,o){var i,a;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._getExperiment(e);case 2:if(i=t.sent,""!==(a=this._getDimensionFromSegment(i,r,n))){t.next=6;break}return t.abrupt("return","");case 6:return t.abrupt("return",this.getTreatment(e,r,a,o));case 7:case"end":return t.stop()}}),t,this)}))),function(t,r,n,o){return e.apply(this,arguments)})},{key:"trackMetricWithSegment",value:(t=s(y().mark((function t(e){var r,n,o,i,a,s,c,u,f,h;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.experimentID,n=e.stage,o=e.segment,i=e.treatment,a=e.metricName,s=e.metricValue,c=e.aggregationType,u=void 0===c?E.SUM:c,t.next=3,this._getExperiment(r);case 3:if(f=t.sent,""!==(h=this._getDimensionFromSegment(f,n,o))){t.next=7;break}return t.abrupt("return");case 7:return t.abrupt("return",this.trackMetric({experimentID:r,stage:n,dimension:h,treatment:i,metricName:a,metricValue:s,aggregationType:u}));case 8:case"end":return t.stop()}}),t,this)}))),function(e){return t.apply(this,arguments)})},{key:"_getDimensionFromSegment",value:function(t,e,r){var n=t.stages.find((function(t){return t.stage===e}));if(!n)throw new Error("Stage ".concat(e," not found for experiment ").concat(t.id));for(var o=n.stageDimensions.map((function(t){return t.dimension})),i=0,a=["".concat(r.countryCode,"-").concat(r.deviceType),"".concat(r.countryCode,"-all"),"".concat(r.region,"-").concat(r.deviceType),"".concat(r.region,"-all"),"GLO-".concat(r.deviceType),"GLO-all"];i<a.length;i++){var s=a[i];if(o.includes(s))return s}return""}}]);var t,e,r,n,o,a,c,u,f,p}();t.exports={SimpleABSDK:S,BaseAPIUrls:w,AggregationTypes:E,Treatments:T,Stages:_,Segment:A}},945:function(t,e,r){var n="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==r.g&&r.g,o=function(){function t(){this.fetch=!1,this.DOMException=n.DOMException}return t.prototype=n,new t}();!function(t){!function(e){var r=void 0!==t&&t||"undefined"!=typeof self&&self||void 0!==r&&r,n="URLSearchParams"in r,o="Symbol"in r&&"iterator"in Symbol,i="FileReader"in r&&"Blob"in r&&function(){try{return new Blob,!0}catch(t){return!1}}(),a="FormData"in r,s="ArrayBuffer"in r;if(s)var c=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(t){return t&&c.indexOf(Object.prototype.toString.call(t))>-1};function f(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t)||""===t)throw new TypeError('Invalid character in header field name: "'+t+'"');return t.toLowerCase()}function h(t){return"string"!=typeof t&&(t=String(t)),t}function l(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return o&&(e[Symbol.iterator]=function(){return e}),e}function p(t){this.map={},t instanceof p?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function d(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function y(t){return new Promise((function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}}))}function m(t){var e=new FileReader,r=y(e);return e.readAsArrayBuffer(t),r}function v(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function b(){return this.bodyUsed=!1,this._initBody=function(t){var e;this.bodyUsed=this.bodyUsed,this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:i&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:a&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:n&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():s&&i&&(e=t)&&DataView.prototype.isPrototypeOf(e)?(this._bodyArrayBuffer=v(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s&&(ArrayBuffer.prototype.isPrototypeOf(t)||u(t))?this._bodyArrayBuffer=v(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},i&&(this.blob=function(){var t=d(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?d(this)||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer)):this.blob().then(m)}),this.text=function(){var t,e,r,n=d(this);if(n)return n;if(this._bodyBlob)return t=this._bodyBlob,r=y(e=new FileReader),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},a&&(this.formData=function(){return this.text().then(x)}),this.json=function(){return this.text().then(JSON.parse)},this}p.prototype.append=function(t,e){t=f(t),e=h(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},p.prototype.delete=function(t){delete this.map[f(t)]},p.prototype.get=function(t){return t=f(t),this.has(t)?this.map[t]:null},p.prototype.has=function(t){return this.map.hasOwnProperty(f(t))},p.prototype.set=function(t,e){this.map[f(t)]=h(e)},p.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},p.prototype.keys=function(){var t=[];return this.forEach((function(e,r){t.push(r)})),l(t)},p.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),l(t)},p.prototype.entries=function(){var t=[];return this.forEach((function(e,r){t.push([r,e])})),l(t)},o&&(p.prototype[Symbol.iterator]=p.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function w(t,e){if(!(this instanceof w))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,n,o=(e=e||{}).body;if(t instanceof w){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new p(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,o||null==t._bodyInit||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new p(e.headers)),this.method=(n=(r=e.method||this.method||"GET").toUpperCase(),g.indexOf(n)>-1?n:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(o),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==e.cache&&"no-cache"!==e.cache)){var i=/([?&])_=[^&]*/;i.test(this.url)?this.url=this.url.replace(i,"$1_="+(new Date).getTime()):this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}function x(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}})),e}function E(t,e){if(!(this instanceof E))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText=void 0===e.statusText?"":""+e.statusText,this.headers=new p(e.headers),this.url=e.url||"",this._initBody(t)}w.prototype.clone=function(){return new w(this,{body:this._bodyInit})},b.call(w.prototype),b.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new p(this.headers),url:this.url})},E.error=function(){var t=new E(null,{status:0,statusText:""});return t.type="error",t};var T=[301,302,303,307,308];E.redirect=function(t,e){if(-1===T.indexOf(e))throw new RangeError("Invalid status code");return new E(null,{status:e,headers:{location:t}})},e.DOMException=r.DOMException;try{new e.DOMException}catch(t){e.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},e.DOMException.prototype=Object.create(Error.prototype),e.DOMException.prototype.constructor=e.DOMException}function _(t,n){return new Promise((function(o,a){var c=new w(t,n);if(c.signal&&c.signal.aborted)return a(new e.DOMException("Aborted","AbortError"));var u=new XMLHttpRequest;function f(){u.abort()}u.onload=function(){var t,e,r={status:u.status,statusText:u.statusText,headers:(t=u.getAllResponseHeaders()||"",e=new p,t.replace(/\r?\n[\t ]+/g," ").split("\r").map((function(t){return 0===t.indexOf("\n")?t.substr(1,t.length):t})).forEach((function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}})),e)};r.url="responseURL"in u?u.responseURL:r.headers.get("X-Request-URL");var n="response"in u?u.response:u.responseText;setTimeout((function(){o(new E(n,r))}),0)},u.onerror=function(){setTimeout((function(){a(new TypeError("Network request failed"))}),0)},u.ontimeout=function(){setTimeout((function(){a(new TypeError("Network request failed"))}),0)},u.onabort=function(){setTimeout((function(){a(new e.DOMException("Aborted","AbortError"))}),0)},u.open(c.method,function(t){try{return""===t&&r.location.href?r.location.href:t}catch(e){return t}}(c.url),!0),"include"===c.credentials?u.withCredentials=!0:"omit"===c.credentials&&(u.withCredentials=!1),"responseType"in u&&(i?u.responseType="blob":s&&c.headers.get("Content-Type")&&-1!==c.headers.get("Content-Type").indexOf("application/octet-stream")&&(u.responseType="arraybuffer")),!n||"object"!=typeof n.headers||n.headers instanceof p?c.headers.forEach((function(t,e){u.setRequestHeader(e,t)})):Object.getOwnPropertyNames(n.headers).forEach((function(t){u.setRequestHeader(t,h(n.headers[t]))})),c.signal&&(c.signal.addEventListener("abort",f),u.onreadystatechange=function(){4===u.readyState&&c.signal.removeEventListener("abort",f)}),u.send(void 0===c._bodyInit?null:c._bodyInit)}))}_.polyfill=!0,r.fetch||(r.fetch=_,r.Headers=p,r.Request=w,r.Response=E),e.Headers=p,e.Request=w,e.Response=E,e.fetch=_}({})}(o),o.fetch.ponyfill=!0,delete o.fetch.polyfill;var i=n.fetch?n:o;(e=i.fetch).default=i.fetch,e.fetch=i.fetch,e.Headers=i.Headers,e.Request=i.Request,e.Response=i.Response,t.exports=e},633:function(t,e,r){var n=r(738).default;function o(){"use strict";t.exports=o=function(){return r},t.exports.__esModule=!0,t.exports.default=t.exports;var e,r={},i=Object.prototype,a=i.hasOwnProperty,s=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",f=c.asyncIterator||"@@asyncIterator",h=c.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(e){l=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var o=e&&e.prototype instanceof w?e:w,i=Object.create(o.prototype),a=new L(n||[]);return s(i,"_invoke",{value:I(t,r,a)}),i}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}r.wrap=p;var y="suspendedStart",m="suspendedYield",v="executing",b="completed",g={};function w(){}function x(){}function E(){}var T={};l(T,u,(function(){return this}));var _=Object.getPrototypeOf,A=_&&_(_(R([])));A&&A!==i&&a.call(A,u)&&(T=A);var S=E.prototype=w.prototype=Object.create(T);function k(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,i,s,c){var u=d(t[o],t,i);if("throw"!==u.type){var f=u.arg,h=f.value;return h&&"object"==n(h)&&a.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,s,c)}),(function(t){r("throw",t,s,c)})):e.resolve(h).then((function(t){f.value=t,s(f)}),(function(t){return r("throw",t,s,c)}))}c(u.arg)}var o;s(this,"_invoke",{value:function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}})}function I(t,r,n){var o=y;return function(i,a){if(o===v)throw Error("Generator is already running");if(o===b){if("throw"===i)throw a;return{value:e,done:!0}}for(n.method=i,n.arg=a;;){var s=n.delegate;if(s){var c=P(s,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=b,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var u=d(t,r,n);if("normal"===u.type){if(o=n.done?b:m,u.arg===g)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=b,n.method="throw",n.arg=u.arg)}}}function P(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,P(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=d(o,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function B(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function R(t){if(t||""===t){var r=t[u];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(a.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}throw new TypeError(n(t)+" is not iterable")}return x.prototype=E,s(S,"constructor",{value:E,configurable:!0}),s(E,"constructor",{value:x,configurable:!0}),x.displayName=l(E,h,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,l(t,h,"GeneratorFunction")),t.prototype=Object.create(S),t},r.awrap=function(t){return{__await:t}},k(O.prototype),l(O.prototype,f,(function(){return this})),r.AsyncIterator=O,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new O(p(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},k(S),l(S,h,"Generator"),l(S,u,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=R,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(B),!t)for(var r in this)"t"===r.charAt(0)&&a.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=a.call(i,"catchLoc"),u=a.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),B(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;B(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:R(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},r}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},738:function(t){function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},756:function(t,e,r){var n=r(633)();t.exports=n;try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={id:n,loaded:!1,exports:{}};return t[n](i,i.exports,r),i.loaded=!0,i.exports}return r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,{a:e}),e},r.d=function(t,e){for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.hmd=function(t){return(t=Object.create(t)).children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r(987)}()}));