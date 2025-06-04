import{j as m}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";var pe=Object.defineProperty,o=(e,t)=>pe(e,"name",{value:t,configurable:!0});function y(){return y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)({}).hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},y.apply(null,arguments)}o(y,"_extends");function V(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}o(V,"_assertThisInitialized");function v(e,t){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(a,r){return a.__proto__=r,a},v(e,t)}o(v,"_setPrototypeOf");function K(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,v(e,t)}o(K,"_inheritsLoose");function B(e){return B=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},B(e)}o(B,"_getPrototypeOf");function J(e){try{return Function.toString.call(e).indexOf("[native code]")!==-1}catch{return typeof e=="function"}}o(J,"_isNativeFunction");function N(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(N=o(function(){return!!e},"_isNativeReflectConstruct"))()}o(N,"_isNativeReflectConstruct");function Q(e,t,a){if(N())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,t);var n=new(e.bind.apply(e,r));return a&&v(n,a.prototype),n}o(Q,"_construct");function I(e){var t=typeof Map=="function"?new Map:void 0;return I=o(function(a){if(a===null||!J(a))return a;if(typeof a!="function")throw new TypeError("Super expression must either be null or a function");if(t!==void 0){if(t.has(a))return t.get(a);t.set(a,r)}function r(){return Q(a,arguments,B(this).constructor)}return o(r,"Wrapper"),r.prototype=Object.create(a.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),v(r,a)},"_wrapNativeSuper"),I(e)}o(I,"_wrapNativeSuper");var ce={1:`Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,2:`Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,3:`Passed an incorrect argument to a color function, please pass a string representation of a color.

`,4:`Couldn't generate valid rgb string from %s, it returned %s.

`,5:`Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,6:`Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,7:`Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,8:`Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,9:`Please provide a number of steps to the modularScale helper.

`,10:`Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,11:`Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,12:`Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,13:`Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,14:`Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,15:`Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,16:`You must provide a template to this method.

`,17:`You passed an unsupported selector state to this method.

`,18:`minScreen and maxScreen must be provided as stringified numbers with the same units.

`,19:`fromSize and toSize must be provided as stringified numbers with the same units.

`,20:`expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,21:"expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",22:"expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",23:`fontFace expects a name of a font-family.

`,24:`fontFace expects either the path to the font file(s) or a name of a local copy.

`,25:`fontFace expects localFonts to be an array.

`,26:`fontFace expects fileFormats to be an array.

`,27:`radialGradient requries at least 2 color-stops to properly render.

`,28:`Please supply a filename to retinaImage() as the first argument.

`,29:`Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,30:"Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",31:`The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,32:`To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,33:`The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,34:`borderRadius expects a radius value as a string or number as the second argument.

`,35:`borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,36:`Property must be a string value.

`,37:`Syntax Error at %s.

`,38:`Formula contains a function that needs parentheses at %s.

`,39:`Formula is missing closing parenthesis at %s.

`,40:`Formula has too many closing parentheses at %s.

`,41:`All values in a formula must have the same unit or be unitless.

`,42:`Please provide a number of steps to the modularScale helper.

`,43:`Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,44:`Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,45:`Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,46:`Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,47:`minScreen and maxScreen must be provided as stringified numbers with the same units.

`,48:`fromSize and toSize must be provided as stringified numbers with the same units.

`,49:`Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,50:`Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,51:`Expects the first argument object to have the properties prop, fromSize, and toSize.

`,52:`fontFace expects either the path to the font file(s) or a name of a local copy.

`,53:`fontFace expects localFonts to be an array.

`,54:`fontFace expects fileFormats to be an array.

`,55:`fontFace expects a name of a font-family.

`,56:`linearGradient requries at least 2 color-stops to properly render.

`,57:`radialGradient requries at least 2 color-stops to properly render.

`,58:`Please supply a filename to retinaImage() as the first argument.

`,59:`Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,60:"Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",61:`Property must be a string value.

`,62:`borderRadius expects a radius value as a string or number as the second argument.

`,63:`borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,64:`The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,65:`To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,66:`The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,67:`You must provide a template to this method.

`,68:`You passed an unsupported selector state to this method.

`,69:`Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,70:`Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,71:`Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,72:`Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,73:`Please provide a valid CSS variable.

`,74:`CSS variable not found and no default was provided.

`,75:`important requires a valid style object, got a %s instead.

`,76:`fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,77:`remToPx expects a value in "rem" but you provided it in "%s".

`,78:`base must be set in "px" or "%" but you set it in "%s".
`};function X(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var r=t[0],n=[],s;for(s=1;s<t.length;s+=1)n.push(t[s]);return n.forEach(function(i){r=r.replace(/%[a-z]/,i)}),r}o(X,"format");var p=function(e){K(t,e);function t(a){for(var r,n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return r=e.call(this,X.apply(void 0,[ce[a]].concat(s)))||this,V(r)}return o(t,"PolishedError"),t}(I(Error));function C(e){return Math.round(e*255)}o(C,"colorToInt");function Z(e,t,a){return C(e)+","+C(t)+","+C(a)}o(Z,"convertToInt");function w(e,t,a,r){if(r===void 0&&(r=Z),t===0)return r(a,a,a);var n=(e%360+360)%360/60,s=(1-Math.abs(2*a-1))*t,i=s*(1-Math.abs(n%2-1)),u=0,f=0,d=0;n>=0&&n<1?(u=s,f=i):n>=1&&n<2?(u=i,f=s):n>=2&&n<3?(f=s,d=i):n>=3&&n<4?(f=i,d=s):n>=4&&n<5?(u=i,d=s):n>=5&&n<6&&(u=s,d=i);var b=a-s/2,h=u+b,c=f+b,_=d+b;return r(h,c,_)}o(w,"hslToRgb");var G={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};function W(e){if(typeof e!="string")return e;var t=e.toLowerCase();return G[t]?"#"+G[t]:e}o(W,"nameToHex");var ge=/^#[a-fA-F0-9]{6}$/,me=/^#[a-fA-F0-9]{8}$/,be=/^#[a-fA-F0-9]{3}$/,he=/^#[a-fA-F0-9]{4}$/,M=/^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,ye=/^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,ve=/^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,we=/^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;function j(e){if(typeof e!="string")throw new p(3);var t=W(e);if(t.match(ge))return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16)};if(t.match(me)){var a=parseFloat((parseInt(""+t[7]+t[8],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16),alpha:a}}if(t.match(be))return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16)};if(t.match(he)){var r=parseFloat((parseInt(""+t[4]+t[4],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16),alpha:r}}var n=M.exec(t);if(n)return{red:parseInt(""+n[1],10),green:parseInt(""+n[2],10),blue:parseInt(""+n[3],10)};var s=ye.exec(t.substring(0,50));if(s)return{red:parseInt(""+s[1],10),green:parseInt(""+s[2],10),blue:parseInt(""+s[3],10),alpha:parseFloat(""+s[4])>1?parseFloat(""+s[4])/100:parseFloat(""+s[4])};var i=ve.exec(t);if(i){var u=parseInt(""+i[1],10),f=parseInt(""+i[2],10)/100,d=parseInt(""+i[3],10)/100,b="rgb("+w(u,f,d)+")",h=M.exec(b);if(!h)throw new p(4,t,b);return{red:parseInt(""+h[1],10),green:parseInt(""+h[2],10),blue:parseInt(""+h[3],10)}}var c=we.exec(t.substring(0,50));if(c){var _=parseInt(""+c[1],10),fe=parseInt(""+c[2],10)/100,de=parseInt(""+c[3],10)/100,U="rgb("+w(_,fe,de)+")",k=M.exec(U);if(!k)throw new p(4,t,U);return{red:parseInt(""+k[1],10),green:parseInt(""+k[2],10),blue:parseInt(""+k[3],10),alpha:parseFloat(""+c[4])>1?parseFloat(""+c[4])/100:parseFloat(""+c[4])}}throw new p(5)}o(j,"parseToRgb");function ee(e){var t=e.red/255,a=e.green/255,r=e.blue/255,n=Math.max(t,a,r),s=Math.min(t,a,r),i=(n+s)/2;if(n===s)return e.alpha!==void 0?{hue:0,saturation:0,lightness:i,alpha:e.alpha}:{hue:0,saturation:0,lightness:i};var u,f=n-s,d=i>.5?f/(2-n-s):f/(n+s);switch(n){case t:u=(a-r)/f+(a<r?6:0);break;case a:u=(r-t)/f+2;break;default:u=(t-a)/f+4;break}return u*=60,e.alpha!==void 0?{hue:u,saturation:d,lightness:i,alpha:e.alpha}:{hue:u,saturation:d,lightness:i}}o(ee,"rgbToHsl");function $(e){return ee(j(e))}o($,"parseToHsl");var xe=o(function(e){return e.length===7&&e[1]===e[2]&&e[3]===e[4]&&e[5]===e[6]?"#"+e[1]+e[3]+e[5]:e},"reduceHexValue"),A=xe;function g(e){var t=e.toString(16);return t.length===1?"0"+t:t}o(g,"numberToHex");function F(e){return g(Math.round(e*255))}o(F,"colorToHex");function te(e,t,a){return A("#"+F(e)+F(t)+F(a))}o(te,"convertToHex");function x(e,t,a){return w(e,t,a,te)}o(x,"hslToHex");function ae(e,t,a){if(typeof e=="number"&&typeof t=="number"&&typeof a=="number")return x(e,t,a);if(typeof e=="object"&&t===void 0&&a===void 0)return x(e.hue,e.saturation,e.lightness);throw new p(1)}o(ae,"hsl");function re(e,t,a,r){if(typeof e=="number"&&typeof t=="number"&&typeof a=="number"&&typeof r=="number")return r>=1?x(e,t,a):"rgba("+w(e,t,a)+","+r+")";if(typeof e=="object"&&t===void 0&&a===void 0&&r===void 0)return e.alpha>=1?x(e.hue,e.saturation,e.lightness):"rgba("+w(e.hue,e.saturation,e.lightness)+","+e.alpha+")";throw new p(2)}o(re,"hsla");function T(e,t,a){if(typeof e=="number"&&typeof t=="number"&&typeof a=="number")return A("#"+g(e)+g(t)+g(a));if(typeof e=="object"&&t===void 0&&a===void 0)return A("#"+g(e.red)+g(e.green)+g(e.blue));throw new p(6)}o(T,"rgb");function S(e,t,a,r){if(typeof e=="string"&&typeof t=="number"){var n=j(e);return"rgba("+n.red+","+n.green+","+n.blue+","+t+")"}else{if(typeof e=="number"&&typeof t=="number"&&typeof a=="number"&&typeof r=="number")return r>=1?T(e,t,a):"rgba("+e+","+t+","+a+","+r+")";if(typeof e=="object"&&t===void 0&&a===void 0&&r===void 0)return e.alpha>=1?T(e.red,e.green,e.blue):"rgba("+e.red+","+e.green+","+e.blue+","+e.alpha+")"}throw new p(7)}o(S,"rgba");var Se=o(function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},"isRgb"),ke=o(function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&typeof e.alpha=="number"},"isRgba"),Ce=o(function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},"isHsl"),Fe=o(function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&typeof e.alpha=="number"},"isHsla");function q(e){if(typeof e!="object")throw new p(8);if(ke(e))return S(e);if(Se(e))return T(e);if(Fe(e))return re(e);if(Ce(e))return ae(e);throw new p(8)}o(q,"toColorString");function D(e,t,a){return o(function(){var r=a.concat(Array.prototype.slice.call(arguments));return r.length>=t?e.apply(this,r):D(e,t,r)},"fn")}o(D,"curried");function E(e){return D(e,e.length,[])}o(E,"curry");function R(e,t,a){return Math.max(e,Math.min(t,a))}o(R,"guard");function oe(e,t){if(t==="transparent")return t;var a=$(t);return q(y({},a,{lightness:R(0,1,a.lightness-parseFloat(e))}))}o(oe,"darken");var Be=E(oe),Ie=Be;function ne(e,t){if(t==="transparent")return t;var a=$(t);return q(y({},a,{lightness:R(0,1,a.lightness+parseFloat(e))}))}o(ne,"lighten");var Te=E(ne),Pe=Te;function se(e,t){if(t==="transparent")return t;var a=j(t),r=typeof a.alpha=="number"?a.alpha:1,n=y({},a,{alpha:R(0,1,+(r*100-parseFloat(e)*100).toFixed(2)/100)});return S(n)}o(se,"transparentize");var je=E(se),Ee=je,l={secondary:"#029CFD",lightest:"#FFFFFF",mediumlight:"#ECF4F9",medium:"#D9E8F2",mediumdark:"#73828C",dark:"#5C6870",darkest:"#2E3438",border:"hsla(203, 50%, 30%, 0.15)"},L={app:"#F6F9FC",hoverable:Ee(.9,l.secondary)},P={fonts:{base:['"Nunito Sans"',"-apple-system",'".SFNSText-Regular"','"San Francisco"',"BlinkMacSystemFont",'"Segoe UI"','"Helvetica Neue"',"Helvetica","Arial","sans-serif"].join(", "),mono:["ui-monospace","Menlo","Monaco",'"Roboto Mono"','"Oxygen Mono"','"Ubuntu Monospace"','"Source Code Pro"','"Droid Sans Mono"','"Courier New"',"monospace"].join(", ")}},Re={base:"dark",colorPrimary:"#FF4785",colorSecondary:"#029CFD",appBg:"#222425",appContentBg:"#1B1C1D",appPreviewBg:l.lightest,appBorderColor:"rgba(255,255,255,.1)",appBorderRadius:4,fontBase:P.fonts.base,fontCode:P.fonts.mono,textColor:"#C9CDCF",textInverseColor:"#222425",textMutedColor:"#798186",barTextColor:l.mediumdark,barHoverColor:l.secondary,barSelectedColor:l.secondary,barBg:"#292C2E",buttonBg:"#222425",buttonBorder:"rgba(255,255,255,.1)",booleanBg:"#222425",booleanSelectedBg:"#2E3438",inputBg:"#1B1C1D",inputBorder:"rgba(255,255,255,.1)",inputTextColor:l.lightest,inputBorderRadius:4},_e=Re,Me={base:"light",colorPrimary:"#FF4785",colorSecondary:"#029CFD",appBg:L.app,appContentBg:l.lightest,appPreviewBg:l.lightest,appBorderColor:l.border,appBorderRadius:4,fontBase:P.fonts.base,fontCode:P.fonts.mono,textColor:l.darkest,textInverseColor:l.lightest,textMutedColor:l.dark,barTextColor:l.mediumdark,barHoverColor:l.secondary,barSelectedColor:l.secondary,barBg:l.lightest,buttonBg:L.app,buttonBorder:l.medium,booleanBg:l.mediumlight,booleanSelectedBg:l.lightest,inputBg:l.lightest,inputBorder:l.border,inputTextColor:l.darkest,inputBorderRadius:4},Y=Me,Oe=(()=>{let e;return typeof window<"u"?e=window:typeof globalThis<"u"?e=globalThis:typeof global<"u"?e=global:typeof self<"u"?e=self:e={},e})();const{logger:ze}=__STORYBOOK_MODULE_CLIENT_LOGGER__;var{window:O}=Oe,He=o(e=>typeof e!="string"?(ze.warn(`Color passed to theme object should be a string. Instead ${e}(${typeof e}) was passed.`),!1):!0,"isColorString"),Ae=o(e=>!/(gradient|var|calc)/.test(e),"isValidColorForPolished"),Ne=o((e,t)=>e==="darken"?S(`${Ie(1,t)}`,.95):e==="lighten"?S(`${Pe(1,t)}`,.95):t,"applyPolished"),ie=o(e=>t=>{if(!He(t)||!Ae(t))return t;try{return Ne(e,t)}catch{return t}},"colorFactory");ie("lighten");ie("darken");var $e=o(()=>!O||!O.matchMedia?"light":O.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light","getPreferredColorScheme"),z={light:Y,dark:_e,normal:Y},H=$e(),le=o((e={base:H},t)=>{let a={...z[H],...z[e.base]||{},...e,base:z[e.base]?e.base:H};return{...t,...a,barSelectedColor:e.barSelectedColor||a.colorSecondary}},"create");const qe=le({base:"light",colorPrimary:"#2d3232",colorSecondary:"#825fff",appBg:"white",appBorderColor:"#EAEBEE",appBorderRadius:4,fontBase:"Diatype, 'Space Grotesk Frontify', Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",fontCode:"Menlo, Courier, monospace",textColor:"#2d3232",barTextColor:"#2d3232",barSelectedColor:"#2d3232",barBg:"#FFFFFF",inputBg:"#FFFFFF",inputBorder:"#EAEBEE",inputTextColor:"#2d3232",inputBorderRadius:4,brandTitle:"Frontify Storybook",brandUrl:"https://frontify.com",brandImage:"/img/logo-charcoal.svg"}),De=le({base:"dark",colorPrimary:"#fafafa",colorSecondary:"#825fff",appBg:"#1a1c1c",appBorderColor:"#424747",appBorderRadius:4,fontBase:"Diatype, 'Space Grotesk Frontify', Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",fontCode:"Menlo, Courier, monospace",textColor:"#fafafa",barTextColor:"#fafafa",barSelectedColor:"#fafafa",barBg:"#1a1d1d",inputBg:"#1a1c1c",inputBorder:"#424747",inputTextColor:"#fafafa",inputBorderRadius:4,brandTitle:"Frontify Storybook",brandUrl:"https://frontify.com",brandImage:"/img/logo-white.svg"}),ue=(e,t)=>{const a=t.parameters.theme||t.globals.theme;switch(a){case"side-by-side":return m.jsxs("div",{className:"side-by-side",children:[m.jsx("div",{className:"light theme",children:m.jsx(e,{})}),m.jsx("div",{className:"tw-dark theme",children:m.jsx(e,{})})]});default:return m.jsx("div",{className:`${a} theme`,children:m.jsx(e,{})})}},Ye=[ue],Ve={theme:{name:"Theme",description:"Global theme for components",defaultValue:"light",toolbar:{icon:"circlehollow",items:[{value:"light",icon:"circlehollow",title:"light"},{value:"tw-dark",icon:"circle",title:"dark"},{value:"side-by-side",icon:"sidebar",title:"side by side"}],showName:!0}}},Ke={options:{storySort:{order:["Tokens","Foundation","Layout","Typography","Components"]}},darkMode:{current:"light",darkClass:"tw-dark",classTarget:"html",stylePreview:!0,dark:{...De},light:{...qe}},layout:"fullscreen",docs:{canvas:{sourceState:"shown"}},status:{type:"legacy",statuses:{released:{background:"rgb(50, 210, 182)",color:"#ffffff",description:"This component is stable and released"},in_progress:{background:"rgb(154, 126, 254)",color:"#ffffff",description:"This component is in progress"},planned:{background:"rgb(254, 194, 50)",color:"#ffffff",description:"This component is planned to be revamped"},legacy:{background:"rgb(129, 132, 132)",color:"#ffffff",description:"This is a legacy component"},deprecated:{background:"rgb(153, 33, 54)",color:"#ffffff",description:"This is a legacy component"}}}};ue.__docgenInfo={description:"",methods:[],displayName:"withTheme"};export{Ye as decorators,Ve as globalTypes,Ke as parameters,ue as withTheme};
