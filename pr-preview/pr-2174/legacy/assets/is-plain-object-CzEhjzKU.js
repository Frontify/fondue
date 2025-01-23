import{g as i}from"./_commonjsHelpers-BosuxZz1.js";var n={exports:{}},f="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",u=f,y=u;function a(){}function s(){}s.resetWarningCache=a;var l=function(){function e(T,h,O,P,b,c){if(c!==y){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}e.isRequired=e;function r(){return e}var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:s,resetWarningCache:a};return t.PropTypes=t,t};n.exports=l();var m=n.exports;const v=i(m);/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function p(e){return Object.prototype.toString.call(e)==="[object Object]"}function R(e){var r,t;return p(e)===!1?!1:(r=e.constructor,r===void 0?!0:(t=r.prototype,!(p(t)===!1||t.hasOwnProperty("isPrototypeOf")===!1)))}export{v as P,R as i};
