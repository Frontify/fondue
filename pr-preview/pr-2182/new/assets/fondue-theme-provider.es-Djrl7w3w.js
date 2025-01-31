import{r as c,e as v}from"./index-i66itsuO.js";var x={exports:{}},t={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function g(){if(d)return t;d=1;var s=v,n=Symbol.for("react.element"),h=Symbol.for("react.fragment"),y=Object.prototype.hasOwnProperty,E=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m={key:!0,ref:!0,__self:!0,__source:!0};function i(o,e,u){var r,a={},_=null,l=null;u!==void 0&&(_=""+u),e.key!==void 0&&(_=""+e.key),e.ref!==void 0&&(l=e.ref);for(r in e)y.call(e,r)&&!m.hasOwnProperty(r)&&(a[r]=e[r]);if(o&&o.defaultProps)for(r in e=o.defaultProps,e)a[r]===void 0&&(a[r]=e[r]);return{$$typeof:n,type:o,key:_,ref:l,props:a,_owner:E.current}}return t.Fragment=h,t.jsx=i,t.jsxs=i,t}x.exports=g();var p=x.exports;const O="_dark_i2b4x_76",k="_light_i2b4x_219",S={dark:O,light:k},f=c.createContext("light"),j=()=>c.useContext(f),w=({children:s,theme:n="light"})=>p.jsx(f.Provider,{value:n,children:p.jsx("div",{className:S[n],children:s})});export{w as E,j as y};
