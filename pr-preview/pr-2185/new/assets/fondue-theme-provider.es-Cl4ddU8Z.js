import{r as c,e as v}from"./index-i66itsuO.js";var f={exports:{}},t={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function k(){if(d)return t;d=1;var s=v,n=Symbol.for("react.element"),h=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,E=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m={key:!0,ref:!0,__self:!0,__source:!0};function i(o,e,u){var r,a={},_=null,l=null;u!==void 0&&(_=""+u),e.key!==void 0&&(_=""+e.key),e.ref!==void 0&&(l=e.ref);for(r in e)x.call(e,r)&&!m.hasOwnProperty(r)&&(a[r]=e[r]);if(o&&o.defaultProps)for(r in e=o.defaultProps,e)a[r]===void 0&&(a[r]=e[r]);return{$$typeof:n,type:o,key:_,ref:l,props:a,_owner:E.current}}return t.Fragment=h,t.jsx=i,t.jsxs=i,t}f.exports=k();var p=f.exports;const g="_dark_ikqby_1",O="_light_ikqby_250",j={dark:g,light:O},y=c.createContext("light"),w=()=>c.useContext(y),C=({children:s,theme:n="light"})=>p.jsx(y.Provider,{value:n,children:p.jsx("div",{className:j[n],children:s})});export{C as E,w as b};
