(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{333:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"withParams",{enumerable:!0,get:function(){return o.default}}),t.regex=t.ref=t.len=t.req=void 0;var n,o=(n=r(343))&&n.__esModule?n:{default:n};function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var f=function(e){if(Array.isArray(e))return!!e.length;if(null==e)return!1;if(!1===e)return!0;if(e instanceof Date)return!isNaN(e.getTime());if("object"===c(e)){for(var t in e)return!0;return!1}return!!String(e).length};t.req=f;t.len=function(e){return Array.isArray(e)?e.length:"object"===c(e)?Object.keys(e).length:String(e).length};t.ref=function(e,t,r){return"function"==typeof e?e.call(t,r):r[e]};t.regex=function(e,t){return(0,o.default)({type:e},(function(e){return!f(e)||t.test(e)}))}},341:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"alpha",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"alphaNum",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"numeric",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"between",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"email",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"ipAddress",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"macAddress",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"maxLength",{enumerable:!0,get:function(){return A.default}}),Object.defineProperty(t,"minLength",{enumerable:!0,get:function(){return m.default}}),Object.defineProperty(t,"required",{enumerable:!0,get:function(){return y.default}}),Object.defineProperty(t,"requiredIf",{enumerable:!0,get:function(){return j.default}}),Object.defineProperty(t,"requiredUnless",{enumerable:!0,get:function(){return h.default}}),Object.defineProperty(t,"sameAs",{enumerable:!0,get:function(){return w.default}}),Object.defineProperty(t,"url",{enumerable:!0,get:function(){return P.default}}),Object.defineProperty(t,"or",{enumerable:!0,get:function(){return x.default}}),Object.defineProperty(t,"and",{enumerable:!0,get:function(){return O.default}}),Object.defineProperty(t,"not",{enumerable:!0,get:function(){return S.default}}),Object.defineProperty(t,"minValue",{enumerable:!0,get:function(){return _.default}}),Object.defineProperty(t,"maxValue",{enumerable:!0,get:function(){return M.default}}),Object.defineProperty(t,"integer",{enumerable:!0,get:function(){return Y.default}}),Object.defineProperty(t,"decimal",{enumerable:!0,get:function(){return z.default}}),t.helpers=void 0;var n=k(r(342)),o=k(r(345)),c=k(r(346)),f=k(r(347)),l=k(r(348)),d=k(r(349)),v=k(r(350)),A=k(r(351)),m=k(r(352)),y=k(r(353)),j=k(r(354)),h=k(r(355)),w=k(r(356)),P=k(r(357)),x=k(r(358)),O=k(r(359)),S=k(r(360)),_=k(r(361)),M=k(r(362)),Y=k(r(363)),z=k(r(364)),B=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};desc.get||desc.set?Object.defineProperty(t,r,desc):t[r]=e[r]}return t.default=e,t}(r(333));function k(e){return e&&e.__esModule?e:{default:e}}t.helpers=B},342:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(333).regex)("alpha",/^[a-zA-Z]*$/);t.default=n},343:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n="web"===e.env.BUILD?r(344).withParams:r(206).withParams;t.default=n}).call(this,r(90))},344:function(e,t,r){"use strict";(function(e){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.withParams=void 0;var n="undefined"!=typeof window?window:void 0!==e?e:{},o=n.vuelidate?n.vuelidate.withParams:function(e,t){return"object"===r(e)&&void 0!==t?t:e((function(){}))};t.withParams=o}).call(this,r(14))},345:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(333).regex)("alphaNum",/^[a-zA-Z0-9]*$/);t.default=n},346:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(333).regex)("numeric",/^[0-9]*$/);t.default=n},347:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(e,t){return(0,n.withParams)({type:"between",min:e,max:t},(function(r){return!(0,n.req)(r)||(!/\s/.test(r)||r instanceof Date)&&+e<=+r&&+t>=+r}))}},348:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(333).regex)("email",/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/);t.default=n},349:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333),o=(0,n.withParams)({type:"ipAddress"},(function(e){if(!(0,n.req)(e))return!0;if("string"!=typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(c)}));t.default=o;var c=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},350:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,n.withParams)({type:"macAddress"},(function(t){if(!(0,n.req)(t))return!0;if("string"!=typeof t)return!1;var r="string"==typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==r&&(6===r.length||8===r.length)&&r.every(o)}))};var o=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},351:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(e){return(0,n.withParams)({type:"maxLength",max:e},(function(t){return!(0,n.req)(t)||(0,n.len)(t)<=e}))}},352:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(e){return(0,n.withParams)({type:"minLength",min:e},(function(t){return!(0,n.req)(t)||(0,n.len)(t)>=e}))}},353:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333),o=(0,n.withParams)({type:"required"},(function(e){return"string"==typeof e?(0,n.req)(e.trim()):(0,n.req)(e)}));t.default=o},354:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(e){return(0,n.withParams)({type:"requiredIf",prop:e},(function(t,r){return!(0,n.ref)(e,this,r)||(0,n.req)(t)}))}},355:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(e){return(0,n.withParams)({type:"requiredUnless",prop:e},(function(t,r){return!!(0,n.ref)(e,this,r)||(0,n.req)(t)}))}},356:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(e){return(0,n.withParams)({type:"sameAs",eq:e},(function(t,r){return t===(0,n.ref)(e,this,r)}))}},357:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(333).regex)("url",/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i);t.default=n},358:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"or"},(function(){for(var e=this,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return t.length>0&&t.reduce((function(t,r){return t||r.apply(e,n)}),!1)}))}},359:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"and"},(function(){for(var e=this,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return t.length>0&&t.reduce((function(t,r){return t&&r.apply(e,n)}),!0)}))}},360:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(e){return(0,n.withParams)({type:"not"},(function(t,r){return!(0,n.req)(t)||!e.call(this,t,r)}))}},361:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(e){return(0,n.withParams)({type:"minValue",min:e},(function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e}))}},362:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(333);t.default=function(e){return(0,n.withParams)({type:"maxValue",max:e},(function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e}))}},363:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(333).regex)("integer",/(^[0-9]*$)|(^-[0-9]+$)/);t.default=n},364:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(333).regex)("decimal",/^[-]?\d*(\.\d+)?$/);t.default=n},390:function(e,t,r){var n=r(9);t.f=n},424:function(e,t,r){"use strict";var n=r(7),o=r(11),c=r(37),f=r(33),l=r(20),d=r(139),v=r(209),A=r(12),m=r(19),y=r(98),j=r(15),h=r(13),w=r(30),P=r(35),x=r(92),O=r(53),S=r(93),_=r(71),M=r(135),Y=r(425),z=r(138),B=r(52),k=r(28),D=r(94),E=r(29),G=r(22),J=r(136),U=r(95),L=r(96),N=r(137),Q=r(9),I=r(390),X=r(426),C=r(55),K=r(36),Z=r(38).forEach,F=U("hidden"),T=Q("toPrimitive"),W=K.set,H=K.getterFor("Symbol"),R=Object.prototype,V=o.Symbol,$=c("JSON","stringify"),ee=B.f,te=k.f,re=Y.f,ne=D.f,oe=J("symbols"),ie=J("op-symbols"),ae=J("string-to-symbol-registry"),ue=J("symbol-to-string-registry"),ce=J("wks"),fe=o.QObject,se=!fe||!fe.prototype||!fe.prototype.findChild,le=l&&A((function(){return 7!=S(te({},"a",{get:function(){return te(this,"a",{value:7}).a}})).a}))?function(e,t,r){var n=ee(R,t);n&&delete R[t],te(e,t,r),n&&e!==R&&te(R,t,n)}:te,de=function(e,t){var symbol=oe[e]=S(V.prototype);return W(symbol,{type:"Symbol",tag:e,description:t}),l||(symbol.description=t),symbol},ve=v?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof V},pe=function(e,t,r){e===R&&pe(ie,t,r),h(e);var n=x(t,!0);return h(r),m(oe,n)?(r.enumerable?(m(e,F)&&e[F][n]&&(e[F][n]=!1),r=S(r,{enumerable:O(0,!1)})):(m(e,F)||te(e,F,O(1,{})),e[F][n]=!0),le(e,n,r)):te(e,n,r)},Ae=function(e,t){h(e);var r=P(t),n=_(r).concat(je(r));return Z(n,(function(t){l&&!me.call(r,t)||pe(e,t,r[t])})),e},me=function(e){var t=x(e,!0),r=ne.call(this,t);return!(this===R&&m(oe,t)&&!m(ie,t))&&(!(r||!m(this,t)||!m(oe,t)||m(this,F)&&this[F][t])||r)},ye=function(e,t){var r=P(e),n=x(t,!0);if(r!==R||!m(oe,n)||m(ie,n)){var o=ee(r,n);return!o||!m(oe,n)||m(r,F)&&r[F][n]||(o.enumerable=!0),o}},be=function(e){var t=re(P(e)),r=[];return Z(t,(function(e){m(oe,e)||m(L,e)||r.push(e)})),r},je=function(e){var t=e===R,r=re(t?ie:P(e)),n=[];return Z(r,(function(e){!m(oe,e)||t&&!m(R,e)||n.push(oe[e])})),n};(d||(G((V=function(){if(this instanceof V)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=N(e),r=function(e){this===R&&r.call(ie,e),m(this,F)&&m(this[F],t)&&(this[F][t]=!1),le(this,t,O(1,e))};return l&&se&&le(R,t,{configurable:!0,set:r}),de(t,e)}).prototype,"toString",(function(){return H(this).tag})),G(V,"withoutSetter",(function(e){return de(N(e),e)})),D.f=me,k.f=pe,B.f=ye,M.f=Y.f=be,z.f=je,I.f=function(e){return de(Q(e),e)},l&&(te(V.prototype,"description",{configurable:!0,get:function(){return H(this).description}}),f||G(R,"propertyIsEnumerable",me,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!d,sham:!d},{Symbol:V}),Z(_(ce),(function(e){X(e)})),n({target:"Symbol",stat:!0,forced:!d},{for:function(e){var t=String(e);if(m(ae,t))return ae[t];var symbol=V(t);return ae[t]=symbol,ue[symbol]=t,symbol},keyFor:function(e){if(!ve(e))throw TypeError(e+" is not a symbol");if(m(ue,e))return ue[e]},useSetter:function(){se=!0},useSimple:function(){se=!1}}),n({target:"Object",stat:!0,forced:!d,sham:!l},{create:function(e,t){return void 0===t?S(e):Ae(S(e),t)},defineProperty:pe,defineProperties:Ae,getOwnPropertyDescriptor:ye}),n({target:"Object",stat:!0,forced:!d},{getOwnPropertyNames:be,getOwnPropertySymbols:je}),n({target:"Object",stat:!0,forced:A((function(){z.f(1)}))},{getOwnPropertySymbols:function(e){return z.f(w(e))}}),$)&&n({target:"JSON",stat:!0,forced:!d||A((function(){var symbol=V();return"[null]"!=$([symbol])||"{}"!=$({a:symbol})||"{}"!=$(Object(symbol))}))},{stringify:function(e,t,r){for(var n,o=[e],c=1;arguments.length>c;)o.push(arguments[c++]);if(n=t,(j(t)||void 0!==e)&&!ve(e))return y(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!ve(t))return t}),o[1]=t,$.apply(null,o)}});V.prototype[T]||E(V.prototype,T,V.prototype.valueOf),C(V,"Symbol"),L[F]=!0},425:function(e,t,r){var n=r(35),o=r(135).f,c={}.toString,f="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return f&&"[object Window]"==c.call(e)?function(e){try{return o(e)}catch(e){return f.slice()}}(e):o(n(e))}},426:function(e,t,r){var path=r(208),n=r(19),o=r(390),c=r(28).f;e.exports=function(e){var t=path.Symbol||(path.Symbol={});n(t,e)||c(t,e,{value:o.f(e)})}},427:function(e,t,r){"use strict";var n=r(7),o=r(20),c=r(11),f=r(19),l=r(15),d=r(28).f,v=r(207),A=c.Symbol;if(o&&"function"==typeof A&&(!("description"in A.prototype)||void 0!==A().description)){var m={},y=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof y?new A(e):void 0===e?A():A(e);return""===e&&(m[t]=!0),t};v(y,A);var j=y.prototype=A.prototype;j.constructor=y;var h=j.toString,w="Symbol(test)"==String(A("test")),P=/^Symbol\((.*)\)[^)]+$/;d(j,"description",{configurable:!0,get:function(){var symbol=l(this)?this.valueOf():this,e=h.call(symbol);if(f(m,symbol))return"";var desc=w?e.slice(7,-1):e.replace(P,"$1");return""===desc?void 0:desc}}),n({global:!0,forced:!0},{Symbol:y})}},430:function(e,t,r){var content=r(431);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(43).default)("b963e0c2",content,!0,{sourceMap:!1})},431:function(e,t,r){(t=r(42)(!1)).push([e.i,'/*!\nDefault styles for videojs-record 4.1.1\n*/@font-face{font-family:videojs-record;src:url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAW0AAsAAAAACewAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAPAAAAFY6l0dQY21hcAAAAYAAAAByAAAB4PJQ5/VnbHlmAAAB9AAAAYYAAALMPcs3OGhlYWQAAAN8AAAALQAAADYQhba0aGhlYQAAA6wAAAAWAAAAJABhADtobXR4AAADxAAAAA4AAAAoAbAAAGxvY2EAAAPUAAAAFgAAABYELgNEbWF4cAAAA+wAAAAdAAAAIAEXADxuYW1lAAAEDAAAATYAAAJemUJQLnBvc3QAAAVEAAAAcAAAALoqjqNHeJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGTQZpzAwMrAwCDHoAgk2aC0OAMTAw8DkGBlZsAKAtJcUxgcPjJ+5GQwAHJZwCQDAyOIAADEhgVmeJztkcENw0AIBOd8+GyilOKXC/IrZaTpq8BhIWUYaXbFCvEAYAV6cAQG7UNDdUXaMu+8MjfOnDHl0+87tEmjt9QlZi02DjZ2PKLBU+/U779zXa3IOy4F8l7oH9MKXXauhX41R4F8K5DvBXIv8B9LThoJAAB4nG1Sf0+DMBC9a4+WEJxTgRGdywKEzTmngXX7w+j3/1i+g/0wxhZer23u9d1ryZC2N9pQTe9Ex3pV+7pyz5wVnxx2HPqs6A5A5/O+O3zxvvWZq1oEh67I105ScQZtIk4iFwEnOjNi8LWCoUTEXmwUWfE8Lkw1JVbA6Txo2FBDD1AQ9u0rnxXoibNQMZfMA8RPXqNMwccFjfpb2lJKS2SPEsf0YzbhCiXU2YL7vA/dN4fSiLYbC63WWmcFfyYmxbqCs5Ex2HHiPSYn/g96gbb5hf8ssK9BuwqV84djmK21nuVQ2UehriRxakymCwARL8YmRjxdan5DT8FaTRgaoW+/4zJKoihJFLanEXDNadAtcvq8TsuyKUlnA9eWYmh8wZ7emboQrnd5Fr7ysGT/zd2CYc89qlcT3EW6E/UEKwrlYJG9Gy9tvMrFaQ9A57Pf6RXRA830BeX98c+pvg59O51KoxwjNFUKT+YaA5ZzZRm93uEl3A4v4R+WzW+KzZXgsSD6Act6LFcAAHicY2BkYGAA4gm5SzLj+W2+MnAzGABFGG7M3rMWmQaK6gJJDgYmEAcANXsKBgAAAHicY2BkYGAwYGBAIhkZUAEXAA5yAJ0AAHicY2AAAgPCGAAgOAGxAAAAAAAAAEIAYACQALwA1gDiASABRgFmAAB4nGNgZGBg4GIwYGBmAAEmMI8LSP4H8xkADk0BVAAAAHicfZA/asMwGMWf8680hlIo7ZRBUOhSYicZQ+cEOmbI7tiyY2NbRlYCuUEP0hP0EB17kJ6iL6qWZLAE0u+9732fQADu8Q0P5+Xhzp7n1cMN1T/3SY+OB+Rnx0P4mDse0X9zPMYr3h37eMCBE7zBLZ0JPhz3mP903Kf/5XhA/nE8xBN+HY8w8eB4jK03cezjxdPHPJGqaKdaxkonG5kdyujKvFRbqdtc1WIezC4La1lLHRmZiN1JtMdsYUwqUq0qsVK1kWWpRKNVIWMT7I1plmGYOj+IVYUjciSQUCjQYgpNjqk03Q0541+UiKi7kl21LVnTzalrCP5/gFlnx5pc264IhnfCrh1OPFv2ZVjQNUipU2YUKtLKTj+nS25Fp7G1ws41fHNvuxosEXKnV/nAvl79AXudcPYAAHicfctLDsIwDARQT/mUJt3DJXIoK7HULIotN+35QS1ihZjVG42GOvqfgA4nnHHBFT1uGBAQqectmfgctlpED/Ja6sG4ZBd57h5dsnpJS2Nv8VvURpu0aco8i/PDam6rS6rv14f74/5zUCN6AYpyMIA=) format("woff");font-weight:400;font-style:normal}.vjs-icon-av-perm{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-av-perm:before{content:"\\f101"}.vjs-icon-sv-perm{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-sv-perm:before{content:"\\f104"}.vjs-icon-video-perm{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-video-perm:before{content:"\\f102"}.vjs-icon-audio-perm{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-audio-perm:before{content:"\\f103"}.vjs-icon-screen-perm{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-screen-perm:before{content:"\\f104"}.vjs-icon-record-start{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-record-start:before{content:"\\f105"}.vjs-icon-record-stop{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-record-stop:before{content:"\\f106"}.vjs-icon-photo-camera{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-photo-camera:before{content:"\\f107"}.vjs-icon-picture-in-picture-start{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-picture-in-picture-start:before{content:"\\f108"}.vjs-icon-picture-in-picture-stop{font-family:videojs-record;font-weight:400;font-style:normal}.vjs-icon-picture-in-picture-stop:before{content:"\\f109"}.vjs-record.video-js .vjs-control.vjs-fullscreen-control{position:absolute;right:0}.vjs-record .vjs-using-native-controls .vjs-control-bar{display:flex!important}.vjs-record.vjs-fluid .vjs-animation-display>img:first-child,.vjs-record.vjs-fluid .vjs-record-canvas>canvas:first-child,.vjs-record.vjs-fluid wave.vjs-wavedisplay{top:0;position:absolute!important;width:100%;min-width:100%;max-width:100%;height:100%}.vjs-record .vjs-device-button.vjs-control{font-size:3em;position:absolute;z-index:2;top:50%;left:50%;width:4em;height:2.8em;margin-top:-1.8em;margin-left:-2.1em;display:block;cursor:pointer;opacity:1;transition:all .4s;text-align:center;vertical-align:middle;border-radius:.8em;background-color:#07141e;background-color:rgba(7,20,30,.7);box-shadow:0 0 1em hsla(0,0%,100%,.25)}.vjs-record .vjs-error .vjs-device-button{display:none}.vjs-record button.vjs-device-button.vjs-control.vjs-icon-audio-perm:before,.vjs-record button.vjs-device-button.vjs-control.vjs-icon-av-perm:before,.vjs-record button.vjs-device-button.vjs-control.vjs-icon-screen-perm:before,.vjs-record button.vjs-device-button.vjs-control.vjs-icon-sv-perm:before,.vjs-record button.vjs-device-button.vjs-control.vjs-icon-video-perm:before{font-size:2.4em}.vjs-record .vjs-record-button.vjs-control{cursor:pointer}.vjs-record .vjs-error .vjs-record-button{display:none}.vjs-record .vjs-record-button.vjs-control.vjs-icon-record-start:before{font-size:1.4em;line-height:2.2em}.vjs-record .vjs-record-button.vjs-control.vjs-icon-record-stop:before{font-size:2.2em;line-height:1.4em}.vjs-record .vjs-camera-button.vjs-control,.vjs-record .vjs-play-control.vjs-control{cursor:pointer}.vjs-record .vjs-error .vjs-camera-button{display:none}.vjs-record .vjs-camera-button.vjs-control.vjs-icon-photo-camera:before{font-size:2em;line-height:1.4em}.vjs-record .vjs-camera-button.vjs-control.vjs-icon-replay:before{font-size:2.2em;line-height:1.4em}.vjs-record.video-js .vjs-control.vjs-record-indicator.vjs-hidden{display:block!important;opacity:0;transform:translateX(1em) rotateX(-90deg) scale(.9);transition:all .5s,transform .5s .25s}.vjs-record.video-js .vjs-control.vjs-record-indicator{width:.8em;height:.8em;background-color:#ff625e;line-height:1.1em;border-radius:50%;right:2.5ex;top:2ex;position:absolute;opacity:1;transform:rotateX(0) scale(1.3);transition:all .5s,transform .2s .1s}.vjs-record.video-js .vjs-control.vjs-record-indicator:before{content:attr(data-label);color:#fff;position:absolute;left:-2.7em;font-family:"Helvetica",sans-serif;-webkit-animation-name:pulsetext;animation-name:pulsetext;-webkit-animation-duration:5s;animation-duration:5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;top:-.1em;font-size:.8em;opacity:1;transition:opacity .5s .2s}.vjs-record.video-js .vjs-control.vjs-record-indicator:after{content:"";display:block;height:calc(.8em - 4px);width:calc(.8em - 4px);border:2px solid #ff625e;border-radius:50%;position:absolute;top:2px;left:2px;transform-origin:center;-webkit-animation-name:pulse;animation-name:pulse;-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-delay:.25s;animation-delay:.25s}@-webkit-keyframes pulsetext{0%{opacity:.75}25%{opacity:.5}50%{opacity:.75}75%{opacity:.5}to{opacity:.75}}@keyframes pulsetext{0%{opacity:.75}25%{opacity:.5}50%{opacity:.75}75%{opacity:.5}to{opacity:.75}}@-webkit-keyframes pulse{0%{opacity:1;transform:scale(1.6)}50%{opacity:.5;transform:scale(2.5)}to{opacity:0;transform:scale(3.5)}}@keyframes pulse{0%{opacity:1;transform:scale(1.6)}50%{opacity:.5;transform:scale(2.5)}to{opacity:0;transform:scale(3.5)}}.vjs-record .vjs-pip-button.vjs-control{cursor:pointer}.vjs-record .vjs-error .vjs-pip-button{display:none}.vjs-record .vjs-pip-button.vjs-control.vjs-icon-picture-in-picture-start:before,.vjs-record .vjs-pip-button.vjs-control.vjs-icon-picture-in-picture-stop:before{font-size:1.4em;line-height:2.2em}',""]),e.exports=t}}]);