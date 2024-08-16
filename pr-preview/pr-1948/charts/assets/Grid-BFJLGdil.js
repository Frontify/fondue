import{r as q,R as w}from"./index-Cs7sjTYM.js";import{p as U,P as D}from"./index-Dk74W0Oi.js";import{f as F}from"./Legend-aZ5_FRI6.js";import{P as E,f as ae,s as I,A as ne,h as oe,j as ie,k as se,l as le,m as ce,n as ue,o as de,p as fe,q as me,r as pe,t as ve,v as he,z as ye,B as ge,C as ke,E as Se,F as xe,G as be,H as we,I as Z,D as $e}from"./useMargin-pslCW85t.js";import{a as N}from"./_commonjsHelpers-BosuxZz1.js";import{G as Oe}from"./Group-jdHZOvHl.js";const _e=Object.freeze(Object.defineProperty({__proto__:null,Group:Oe},Symbol.toStringTag,{value:"Module"}));function Pe(e,t){return new E({x:e.x+t.x,y:e.y+t.y})}function Te(e,t){return new E({x:e.x-t.x,y:e.y-t.y})}const je=Object.freeze(Object.defineProperty({__proto__:null,Point:E,subtractPoints:Te,sumPoints:Pe},Symbol.toStringTag,{value:"Module"})),J=N(je);var Ce=I("domain","range","clamp","nice","round","unknown");function Ge(e){return Ce(ae.scaleRadial(),e)}var Re=I.apply(void 0,ne);function Le(e,t){return Re(e.copy(),t)}function We(e){return"paddingInner"in e?"band":"padding"in e?"point":"quantiles"in e?"quantile":"base"in e?"log":"exponent"in e?e.exponent()===.5?"sqrt":"pow":"constant"in e?"symlog":"clamp"in e?e.ticks()[0]instanceof Date?oe(e)?"utc":"time":"linear":"nice"in e?"quantize":"invertExtent"in e?"threshold":"ordinal"}const qe=Object.freeze(Object.defineProperty({__proto__:null,coerceNumber:ie,createScale:se,getTicks:le,inferScaleType:We,scaleBand:ce,scaleCanBeZeroed:ue,scaleLinear:de,scaleLog:fe,scaleOrdinal:me,scalePoint:pe,scalePower:ve,scaleQuantile:he,scaleQuantize:ye,scaleRadial:Ge,scaleSqrt:ge,scaleSymlog:ke,scaleThreshold:Se,scaleTime:xe,scaleUtc:be,toString:we,updateScale:Le},Symbol.toStringTag,{value:"Module"})),X=N(_e),Y=N(qe);var T={};T.__esModule=!0;T.default=Ee;function Ee(e){return"bandwidth"in e?e.bandwidth():0}var Ne=ee,B=$(U),V=$(q),De=$(F),Be=$(Z),Ve=X,z=J,M=Y,ze=$(T),Me=["top","left","scale","width","stroke","strokeWidth","strokeDasharray","className","children","numTicks","lineStyle","offset","tickValues"];function $(e){return e&&e.__esModule?e:{default:e}}function R(){return R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},R.apply(this,arguments)}function Ae(e,t){if(e==null)return{};var a={},r=Object.keys(e),o,n;for(n=0;n<r.length;n++)o=r[n],!(t.indexOf(o)>=0)&&(a[o]=e[o]);return a}function ee(e){var t=e.top,a=t===void 0?0:t,r=e.left,o=r===void 0?0:r,n=e.scale,k=e.width,u=e.stroke,s=u===void 0?"#eaf0f6":u,d=e.strokeWidth,h=d===void 0?1:d,y=e.strokeDasharray,f=e.className,m=e.children,p=e.numTicks,g=p===void 0?10:p,_=e.lineStyle,S=e.offset,x=e.tickValues,j=Ae(e,Me),C=x??(0,M.getTicks)(n,g),G=(S??0)+(0,ze.default)(n)/2,b=C.map(function(i,v){var l,c=((l=(0,M.coerceNumber)(n(i)))!=null?l:0)+G;return{index:v,from:new z.Point({x:0,y:c}),to:new z.Point({x:k,y:c})}});return V.default.createElement(Ve.Group,{className:(0,De.default)("visx-rows",f),top:a,left:o},m?m({lines:b}):b.map(function(i){var v=i.from,l=i.to,c=i.index;return V.default.createElement(Be.default,R({key:"row-line-"+c,from:v,to:l,stroke:s,strokeWidth:h,strokeDasharray:y,style:_},j))}))}ee.propTypes={tickValues:B.default.array,width:B.default.number.isRequired};var Qe=te,A=O(U),Q=O(q),He=O(F),Ke=O(Z),Ue=X,H=J,K=Y,Fe=O(T),Ie=["top","left","scale","height","stroke","strokeWidth","strokeDasharray","className","numTicks","lineStyle","offset","tickValues","children"];function O(e){return e&&e.__esModule?e:{default:e}}function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},L.apply(this,arguments)}function Ze(e,t){if(e==null)return{};var a={},r=Object.keys(e),o,n;for(n=0;n<r.length;n++)o=r[n],!(t.indexOf(o)>=0)&&(a[o]=e[o]);return a}function te(e){var t=e.top,a=t===void 0?0:t,r=e.left,o=r===void 0?0:r,n=e.scale,k=e.height,u=e.stroke,s=u===void 0?"#eaf0f6":u,d=e.strokeWidth,h=d===void 0?1:d,y=e.strokeDasharray,f=e.className,m=e.numTicks,p=m===void 0?10:m,g=e.lineStyle,_=e.offset,S=e.tickValues,x=e.children,j=Ze(e,Ie),C=S??(0,K.getTicks)(n,p),G=(_??0)+(0,Fe.default)(n)/2,b=C.map(function(i,v){var l,c=((l=(0,K.coerceNumber)(n(i)))!=null?l:0)+G;return{index:v,from:new H.Point({x:c,y:0}),to:new H.Point({x:c,y:k})}});return Q.default.createElement(Ue.Group,{className:(0,He.default)("visx-columns",f),top:a,left:o},x?x({lines:b}):b.map(function(i){var v=i.from,l=i.to,c=i.index;return Q.default.createElement(Ke.default,L({key:"column-line-"+c,from:v,to:l,stroke:s,strokeWidth:h,strokeDasharray:y,style:g},j))}))}te.propTypes={tickValues:A.default.array,height:A.default.number.isRequired};var Je=["rows","columns","GridRowsComponent","GridColumnsComponent"];function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},P.apply(this,arguments)}function Xe(e,t){if(e==null)return{};var a={},r=Object.keys(e),o,n;for(n=0;n<r.length;n++)o=r[n],!(t.indexOf(o)>=0)&&(a[o]=e[o]);return a}function re(e){var t=e.rows,a=t===void 0?!0:t,r=e.columns,o=r===void 0?!0:r,n=e.GridRowsComponent,k=e.GridColumnsComponent,u=Xe(e,Je),s=q.useContext($e),d=s.theme,h=s.xScale,y=s.yScale,f=s.margin,m=s.innerWidth,p=s.innerHeight,g=d==null?void 0:d.gridStyles;return w.createElement(w.Fragment,null,a&&y&&m!=null&&w.createElement(n,P({left:f==null?void 0:f.left,lineStyle:g,width:m,scale:y},u)),o&&h&&p!=null&&w.createElement(k,P({top:f==null?void 0:f.top,lineStyle:g,height:p,scale:h},u)))}re.propTypes={rows:D.bool,columns:D.bool};function W(){return W=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},W.apply(this,arguments)}function ot(e){return w.createElement(re,W({GridRowsComponent:Ne,GridColumnsComponent:Qe},e))}export{ot as G};