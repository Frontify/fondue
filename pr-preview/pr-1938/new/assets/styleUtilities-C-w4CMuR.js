const le="-";function Se(e){const t=Ge(e),{conflictingClassGroups:r,conflictingClassGroupModifiers:s}=e;function l(n){const a=n.split(le);return a[0]===""&&a.length!==1&&a.shift(),be(a,t)||je(n)}function o(n,a){const u=r[n]||[];return a&&s[n]?[...u,...s[n]]:u}return{getClassGroupId:l,getConflictingClassGroupIds:o}}function be(e,t){var n;if(e.length===0)return t.classGroupId;const r=e[0],s=t.nextPart.get(r),l=s?be(e.slice(1),s):void 0;if(l)return l;if(t.validators.length===0)return;const o=e.join(le);return(n=t.validators.find(({validator:a})=>a(o)))==null?void 0:n.classGroupId}const ce=/^\[(.+)\]$/;function je(e){if(ce.test(e)){const t=ce.exec(e)[1],r=t==null?void 0:t.substring(0,t.indexOf(":"));if(r)return"arbitrary.."+r}}function Ge(e){const{theme:t,prefix:r}=e,s={nextPart:new Map,validators:[]};return Pe(Object.entries(e.classGroups),r).forEach(([o,n])=>{oe(n,s,o,t)}),s}function oe(e,t,r,s){e.forEach(l=>{if(typeof l=="string"){const o=l===""?t:de(t,l);o.classGroupId=r;return}if(typeof l=="function"){if(Re(l)){oe(l(s),t,r,s);return}t.validators.push({validator:l,classGroupId:r});return}Object.entries(l).forEach(([o,n])=>{oe(n,de(t,o),r,s)})})}function de(e,t){let r=e;return t.split(le).forEach(s=>{r.nextPart.has(s)||r.nextPart.set(s,{nextPart:new Map,validators:[]}),r=r.nextPart.get(s)}),r}function Re(e){return e.isThemeGetter}function Pe(e,t){return t?e.map(([r,s])=>{const l=s.map(o=>typeof o=="string"?t+o:typeof o=="object"?Object.fromEntries(Object.entries(o).map(([n,a])=>[t+n,a])):o);return[r,l]}):e}function Te(e){if(e<1)return{get:()=>{},set:()=>{}};let t=0,r=new Map,s=new Map;function l(o,n){r.set(o,n),t++,t>e&&(t=0,s=r,r=new Map)}return{get(o){let n=r.get(o);if(n!==void 0)return n;if((n=s.get(o))!==void 0)return l(o,n),n},set(o,n){r.has(o)?r.set(o,n):l(o,n)}}}const ge="!";function Ve(e){const t=e.separator,r=t.length===1,s=t[0],l=t.length;return function(n){const a=[];let u=0,A=0,p;for(let x=0;x<n.length;x++){let k=n[x];if(u===0){if(k===s&&(r||n.slice(x,x+l)===t)){a.push(n.slice(A,x)),A=x+l;continue}if(k==="/"){p=x;continue}}k==="["?u++:k==="]"&&u--}const C=a.length===0?n:n.substring(A),M=C.startsWith(ge),G=M?C.substring(1):C,R=p&&p>A?p-A:void 0;return{modifiers:a,hasImportantModifier:M,baseClassName:G,maybePostfixModifierPosition:R}}}function $e(e){if(e.length<=1)return e;const t=[];let r=[];return e.forEach(s=>{s[0]==="["?(t.push(...r.sort(),s),r=[]):r.push(s)}),t.push(...r.sort()),t}function Ie(e){return{cache:Te(e.cacheSize),splitModifiers:Ve(e),...Se(e)}}const Ee=/\s+/;function Oe(e,t){const{splitModifiers:r,getClassGroupId:s,getConflictingClassGroupIds:l}=t,o=new Set;return e.trim().split(Ee).map(n=>{const{modifiers:a,hasImportantModifier:u,baseClassName:A,maybePostfixModifierPosition:p}=r(n);let C=s(p?A.substring(0,p):A),M=!!p;if(!C){if(!p)return{isTailwindClass:!1,originalClassName:n};if(C=s(A),!C)return{isTailwindClass:!1,originalClassName:n};M=!1}const G=$e(a).join(":");return{isTailwindClass:!0,modifierId:u?G+ge:G,classGroupId:C,originalClassName:n,hasPostfixModifier:M}}).reverse().filter(n=>{if(!n.isTailwindClass)return!0;const{modifierId:a,classGroupId:u,hasPostfixModifier:A}=n,p=a+u;return o.has(p)?!1:(o.add(p),l(u,A).forEach(C=>o.add(a+C)),!0)}).reverse().map(n=>n.originalClassName).join(" ")}function Ne(){let e=0,t,r,s="";for(;e<arguments.length;)(t=arguments[e++])&&(r=me(t))&&(s&&(s+=" "),s+=r);return s}function me(e){if(typeof e=="string")return e;let t,r="";for(let s=0;s<e.length;s++)e[s]&&(t=me(e[s]))&&(r&&(r+=" "),r+=t);return r}function ne(e,...t){let r,s,l,o=n;function n(u){const A=t.reduce((p,C)=>C(p),e());return r=Ie(A),s=r.cache.get,l=r.cache.set,o=a,a(u)}function a(u){const A=s(u);if(A)return A;const p=Oe(u,r);return l(u,p),p}return function(){return o(Ne.apply(null,arguments))}}function w(e){const t=r=>r[e]||[];return t.isThemeGetter=!0,t}const ye=/^\[(?:([a-z-]+):)?(.+)\]$/i,Le=/^\d+\/\d+$/,We=new Set(["px","full","screen"]),_e=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Be=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ue=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Fe=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Je=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function V(e){return O(e)||We.has(e)||Le.test(e)}function I(e){return W(e,"length",De)}function O(e){return!!e&&!Number.isNaN(Number(e))}function Y(e){return W(e,"number",O)}function J(e){return!!e&&Number.isInteger(Number(e))}function qe(e){return e.endsWith("%")&&O(e.slice(0,-1))}function c(e){return ye.test(e)}function E(e){return _e.test(e)}const Ke=new Set(["length","size","percentage"]);function Ze(e){return W(e,Ke,he)}function He(e){return W(e,"position",he)}const Xe=new Set(["image","url"]);function Qe(e){return W(e,Xe,rr)}function Ye(e){return W(e,"",er)}function q(){return!0}function W(e,t,r){const s=ye.exec(e);return s?s[1]?typeof t=="string"?s[1]===t:t.has(s[1]):r(s[2]):!1}function De(e){return Be.test(e)&&!Ue.test(e)}function he(){return!1}function er(e){return Fe.test(e)}function rr(e){return Je.test(e)}function se(){const e=w("colors"),t=w("spacing"),r=w("blur"),s=w("brightness"),l=w("borderColor"),o=w("borderRadius"),n=w("borderSpacing"),a=w("borderWidth"),u=w("contrast"),A=w("grayscale"),p=w("hueRotate"),C=w("invert"),M=w("gap"),G=w("gradientColorStops"),R=w("gradientColorStopPositions"),x=w("inset"),k=w("margin"),T=w("opacity"),y=w("padding"),H=w("saturate"),N=w("scale"),X=w("sepia"),Q=w("skew"),_=w("space"),B=w("translate"),L=()=>["auto","contain","none"],U=()=>["auto","hidden","clip","visible","scroll"],F=()=>["auto",c,t],i=()=>[c,t],f=()=>["",V,I],d=()=>["auto",O,c],g=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],b=()=>["solid","dashed","dotted","double","none"],m=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],h=()=>["start","end","center","between","around","evenly","stretch"],v=()=>["","0",c],z=()=>["auto","avoid","all","avoid-page","page","left","right","column"],P=()=>[O,Y],j=()=>[O,c];return{cacheSize:500,separator:":",theme:{colors:[q],spacing:[V,I],blur:["none","",E,c],brightness:P(),borderColor:[e],borderRadius:["none","","full",E,c],borderSpacing:i(),borderWidth:f(),contrast:P(),grayscale:v(),hueRotate:j(),invert:v(),gap:i(),gradientColorStops:[e],gradientColorStopPositions:[qe,I],inset:F(),margin:F(),opacity:P(),padding:i(),saturate:P(),scale:P(),sepia:v(),skew:j(),space:i(),translate:i()},classGroups:{aspect:[{aspect:["auto","square","video",c]}],container:["container"],columns:[{columns:[E]}],"break-after":[{"break-after":z()}],"break-before":[{"break-before":z()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...g(),c]}],overflow:[{overflow:U()}],"overflow-x":[{"overflow-x":U()}],"overflow-y":[{"overflow-y":U()}],overscroll:[{overscroll:L()}],"overscroll-x":[{"overscroll-x":L()}],"overscroll-y":[{"overscroll-y":L()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[x]}],"inset-x":[{"inset-x":[x]}],"inset-y":[{"inset-y":[x]}],start:[{start:[x]}],end:[{end:[x]}],top:[{top:[x]}],right:[{right:[x]}],bottom:[{bottom:[x]}],left:[{left:[x]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",J,c]}],basis:[{basis:F()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",c]}],grow:[{grow:v()}],shrink:[{shrink:v()}],order:[{order:["first","last","none",J,c]}],"grid-cols":[{"grid-cols":[q]}],"col-start-end":[{col:["auto",{span:["full",J,c]},c]}],"col-start":[{"col-start":d()}],"col-end":[{"col-end":d()}],"grid-rows":[{"grid-rows":[q]}],"row-start-end":[{row:["auto",{span:[J,c]},c]}],"row-start":[{"row-start":d()}],"row-end":[{"row-end":d()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",c]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",c]}],gap:[{gap:[M]}],"gap-x":[{"gap-x":[M]}],"gap-y":[{"gap-y":[M]}],"justify-content":[{justify:["normal",...h()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...h(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...h(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[y]}],px:[{px:[y]}],py:[{py:[y]}],ps:[{ps:[y]}],pe:[{pe:[y]}],pt:[{pt:[y]}],pr:[{pr:[y]}],pb:[{pb:[y]}],pl:[{pl:[y]}],m:[{m:[k]}],mx:[{mx:[k]}],my:[{my:[k]}],ms:[{ms:[k]}],me:[{me:[k]}],mt:[{mt:[k]}],mr:[{mr:[k]}],mb:[{mb:[k]}],ml:[{ml:[k]}],"space-x":[{"space-x":[_]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[_]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",c,t]}],"min-w":[{"min-w":[c,t,"min","max","fit"]}],"max-w":[{"max-w":[c,t,"none","full","min","max","fit","prose",{screen:[E]},E]}],h:[{h:[c,t,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[c,t,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[c,t,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[c,t,"auto","min","max","fit"]}],"font-size":[{text:["base",E,I]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Y]}],"font-family":[{font:[q]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",c]}],"line-clamp":[{"line-clamp":["none",O,Y]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",V,c]}],"list-image":[{"list-image":["none",c]}],"list-style-type":[{list:["none","disc","decimal",c]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[T]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[T]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...b(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",V,I]}],"underline-offset":[{"underline-offset":["auto",V,c]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:i()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",c]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",c]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[T]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...g(),He]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",Ze]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Qe]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[R]}],"gradient-via-pos":[{via:[R]}],"gradient-to-pos":[{to:[R]}],"gradient-from":[{from:[G]}],"gradient-via":[{via:[G]}],"gradient-to":[{to:[G]}],rounded:[{rounded:[o]}],"rounded-s":[{"rounded-s":[o]}],"rounded-e":[{"rounded-e":[o]}],"rounded-t":[{"rounded-t":[o]}],"rounded-r":[{"rounded-r":[o]}],"rounded-b":[{"rounded-b":[o]}],"rounded-l":[{"rounded-l":[o]}],"rounded-ss":[{"rounded-ss":[o]}],"rounded-se":[{"rounded-se":[o]}],"rounded-ee":[{"rounded-ee":[o]}],"rounded-es":[{"rounded-es":[o]}],"rounded-tl":[{"rounded-tl":[o]}],"rounded-tr":[{"rounded-tr":[o]}],"rounded-br":[{"rounded-br":[o]}],"rounded-bl":[{"rounded-bl":[o]}],"border-w":[{border:[a]}],"border-w-x":[{"border-x":[a]}],"border-w-y":[{"border-y":[a]}],"border-w-s":[{"border-s":[a]}],"border-w-e":[{"border-e":[a]}],"border-w-t":[{"border-t":[a]}],"border-w-r":[{"border-r":[a]}],"border-w-b":[{"border-b":[a]}],"border-w-l":[{"border-l":[a]}],"border-opacity":[{"border-opacity":[T]}],"border-style":[{border:[...b(),"hidden"]}],"divide-x":[{"divide-x":[a]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[a]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[T]}],"divide-style":[{divide:b()}],"border-color":[{border:[l]}],"border-color-x":[{"border-x":[l]}],"border-color-y":[{"border-y":[l]}],"border-color-t":[{"border-t":[l]}],"border-color-r":[{"border-r":[l]}],"border-color-b":[{"border-b":[l]}],"border-color-l":[{"border-l":[l]}],"divide-color":[{divide:[l]}],"outline-style":[{outline:["",...b()]}],"outline-offset":[{"outline-offset":[V,c]}],"outline-w":[{outline:[V,I]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:f()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[T]}],"ring-offset-w":[{"ring-offset":[V,I]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",E,Ye]}],"shadow-color":[{shadow:[q]}],opacity:[{opacity:[T]}],"mix-blend":[{"mix-blend":[...m(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":m()}],filter:[{filter:["","none"]}],blur:[{blur:[r]}],brightness:[{brightness:[s]}],contrast:[{contrast:[u]}],"drop-shadow":[{"drop-shadow":["","none",E,c]}],grayscale:[{grayscale:[A]}],"hue-rotate":[{"hue-rotate":[p]}],invert:[{invert:[C]}],saturate:[{saturate:[H]}],sepia:[{sepia:[X]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[r]}],"backdrop-brightness":[{"backdrop-brightness":[s]}],"backdrop-contrast":[{"backdrop-contrast":[u]}],"backdrop-grayscale":[{"backdrop-grayscale":[A]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[p]}],"backdrop-invert":[{"backdrop-invert":[C]}],"backdrop-opacity":[{"backdrop-opacity":[T]}],"backdrop-saturate":[{"backdrop-saturate":[H]}],"backdrop-sepia":[{"backdrop-sepia":[X]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[n]}],"border-spacing-x":[{"border-spacing-x":[n]}],"border-spacing-y":[{"border-spacing-y":[n]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",c]}],duration:[{duration:j()}],ease:[{ease:["linear","in","out","in-out",c]}],delay:[{delay:j()}],animate:[{animate:["none","spin","ping","pulse","bounce",c]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[N]}],"scale-x":[{"scale-x":[N]}],"scale-y":[{"scale-y":[N]}],rotate:[{rotate:[J,c]}],"translate-x":[{"translate-x":[B]}],"translate-y":[{"translate-y":[B]}],"skew-x":[{"skew-x":[Q]}],"skew-y":[{"skew-y":[Q]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",c]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",c]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":i()}],"scroll-mx":[{"scroll-mx":i()}],"scroll-my":[{"scroll-my":i()}],"scroll-ms":[{"scroll-ms":i()}],"scroll-me":[{"scroll-me":i()}],"scroll-mt":[{"scroll-mt":i()}],"scroll-mr":[{"scroll-mr":i()}],"scroll-mb":[{"scroll-mb":i()}],"scroll-ml":[{"scroll-ml":i()}],"scroll-p":[{"scroll-p":i()}],"scroll-px":[{"scroll-px":i()}],"scroll-py":[{"scroll-py":i()}],"scroll-ps":[{"scroll-ps":i()}],"scroll-pe":[{"scroll-pe":i()}],"scroll-pt":[{"scroll-pt":i()}],"scroll-pr":[{"scroll-pr":i()}],"scroll-pb":[{"scroll-pb":i()}],"scroll-pl":[{"scroll-pl":i()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",c]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[V,I,Y]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}function tr(e,{cacheSize:t,prefix:r,separator:s,extend:l={},override:o={}}){D(e,"cacheSize",t),D(e,"prefix",r),D(e,"separator",s);for(const n in o)or(e[n],o[n]);for(const n in l)nr(e[n],l[n]);return e}function D(e,t,r){r!==void 0&&(e[t]=r)}function or(e,t){if(t)for(const r in t)D(e,r,t[r])}function nr(e,t){if(t)for(const r in t){const s=t[r];s!==void 0&&(e[r]=(e[r]||[]).concat(s))}}function ve(e,...t){return typeof e=="function"?ne(se,e,...t):ne(()=>tr(se(),e),...t)}const sr=ne(se);var ue=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,S=e=>!e||typeof e!="object"||Object.keys(e).length===0,ir=(e,t)=>JSON.stringify(e)===JSON.stringify(t);function xe(e,t){e.forEach(function(r){Array.isArray(r)?xe(r,t):t.push(r)})}function we(e){let t=[];return xe(e,t),t}var ke=(...e)=>we(e).filter(Boolean),Ae=(e,t)=>{let r={},s=Object.keys(e),l=Object.keys(t);for(let o of s)if(l.includes(o)){let n=e[o],a=t[o];typeof n=="object"&&typeof a=="object"?r[o]=Ae(n,a):Array.isArray(n)||Array.isArray(a)?r[o]=ke(a,n):r[o]=a+" "+n}else r[o]=e[o];for(let o of l)s.includes(o)||(r[o]=t[o]);return r},pe=e=>!e||typeof e!="string"?e:e.replace(/\s+/g," ").trim(),lr={twMerge:!0,twMergeConfig:{},responsiveVariants:!1},Ce=e=>e||void 0,Z=(...e)=>Ce(we(e).filter(Boolean).join(" ")),te=null,$={},ie=!1,K=(...e)=>t=>t.twMerge?((!te||ie)&&(ie=!1,te=S($)?sr:ve({...$,extend:{theme:$.theme,classGroups:$.classGroups,conflictingClassGroupModifiers:$.conflictingClassGroupModifiers,conflictingClassGroups:$.conflictingClassGroups,...$.extend}})),Ce(te(Z(e)))):Z(e),fe=(e,t)=>{for(let r in t)e.hasOwnProperty(r)?e[r]=Z(e[r],t[r]):e[r]=t[r];return e},ar=(e,t)=>{let{extend:r=null,slots:s={},variants:l={},compoundVariants:o=[],compoundSlots:n=[],defaultVariants:a={}}=e,u={...lr,...t},A=r!=null&&r.base?Z(r.base,e==null?void 0:e.base):e==null?void 0:e.base,p=r!=null&&r.variants&&!S(r.variants)?Ae(l,r.variants):l,C=r!=null&&r.defaultVariants&&!S(r.defaultVariants)?{...r.defaultVariants,...a}:a;!S(u.twMergeConfig)&&!ir(u.twMergeConfig,$)&&(ie=!0,$=u.twMergeConfig);let M=S(r==null?void 0:r.slots),G=S(s)?{}:{base:Z(e==null?void 0:e.base,M&&(r==null?void 0:r.base)),...s},R=M?G:fe({...r==null?void 0:r.slots},S(G)?{base:e==null?void 0:e.base}:G),x=S(r==null?void 0:r.compoundVariants)?o:ke(r==null?void 0:r.compoundVariants,o),k=y=>{if(S(p)&&S(s)&&M)return K(A,y==null?void 0:y.class,y==null?void 0:y.className)(u);if(x&&!Array.isArray(x))throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof x}`);if(n&&!Array.isArray(n))throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof n}`);let H=(i,f,d=[],g)=>{let b=d;if(typeof f=="string")b=b.concat(pe(f).split(" ").map(m=>`${i}:${m}`));else if(Array.isArray(f))b=b.concat(f.reduce((m,h)=>m.concat(`${i}:${h}`),[]));else if(typeof f=="object"&&typeof g=="string"){for(let m in f)if(f.hasOwnProperty(m)&&m===g){let h=f[m];if(h&&typeof h=="string"){let v=pe(h);b[g]?b[g]=b[g].concat(v.split(" ").map(z=>`${i}:${z}`)):b[g]=v.split(" ").map(z=>`${i}:${z}`)}else Array.isArray(h)&&h.length>0&&(b[g]=h.reduce((v,z)=>v.concat(`${i}:${z}`),[]))}}return b},N=(i,f=p,d=null,g=null)=>{var b;let m=f[i];if(!m||S(m))return null;let h=(b=g==null?void 0:g[i])!=null?b:y==null?void 0:y[i];if(h===null)return null;let v=ue(h),z=Array.isArray(u.responsiveVariants)&&u.responsiveVariants.length>0||u.responsiveVariants===!0,P=C==null?void 0:C[i],j=[];if(typeof v=="object"&&z)for(let[re,ae]of Object.entries(v)){let Me=m[ae];if(re==="initial"){P=ae;continue}Array.isArray(u.responsiveVariants)&&!u.responsiveVariants.includes(re)||(j=H(re,Me,j,d))}let ze=v!=null&&typeof v!="object"?v:ue(P),ee=m[ze||"false"];return typeof j=="object"&&typeof d=="string"&&j[d]?fe(j,ee):j.length>0?(j.push(ee),j):ee},X=()=>p?Object.keys(p).map(i=>N(i,p)):null,Q=(i,f)=>{if(!p||typeof p!="object")return null;let d=new Array;for(let g in p){let b=N(g,p,i,f),m=i==="base"&&typeof b=="string"?b:b&&b[i];m&&(d[d.length]=m)}return d},_={};for(let i in y)y[i]!==void 0&&(_[i]=y[i]);let B=(i,f)=>{var d;let g=typeof(y==null?void 0:y[i])=="object"?{[i]:(d=y[i])==null?void 0:d.initial}:{};return{...C,..._,...g,...f}},L=(i=[],f)=>{let d=[];for(let{class:g,className:b,...m}of i){let h=!0;for(let[v,z]of Object.entries(m)){let P=B(v,f);if(Array.isArray(z)){if(!z.includes(P[v])){h=!1;break}}else if(P[v]!==z){h=!1;break}}h&&(g&&d.push(g),b&&d.push(b))}return d},U=i=>{let f=L(x,i);if(!Array.isArray(f))return f;let d={};for(let g of f)if(typeof g=="string"&&(d.base=K(d.base,g)(u)),typeof g=="object")for(let[b,m]of Object.entries(g))d[b]=K(d[b],m)(u);return d},F=i=>{if(n.length<1)return null;let f={};for(let{slots:d=[],class:g,className:b,...m}of n){if(!S(m)){let h=!0;for(let v of Object.keys(m)){let z=B(v,i)[v];if(z===void 0||(Array.isArray(m[v])?!m[v].includes(z):m[v]!==z)){h=!1;break}}if(!h)continue}for(let h of d)f[h]=f[h]||[],f[h].push([g,b])}return f};if(!S(s)||!M){let i={};if(typeof R=="object"&&!S(R))for(let f of Object.keys(R))i[f]=d=>{var g,b;return K(R[f],Q(f,d),((g=U(d))!=null?g:[])[f],((b=F(d))!=null?b:[])[f],d==null?void 0:d.class,d==null?void 0:d.className)(u)};return i}return K(A,X(),L(x),y==null?void 0:y.class,y==null?void 0:y.className)(u)},T=()=>{if(!(!p||typeof p!="object"))return Object.keys(p)};return k.variantKeys=T(),k.extend=r,k.base=A,k.slots=R,k.variants=p,k.defaultVariants=C,k.compoundSlots=n,k.compoundVariants=x,k};const cr=ve({prefix:"tw-",extend:{classGroups:{"font-size":["text-body-x-small","text-body-small","text-body-medium","text-body-large"]}}}),dr=(...e)=>cr(...e),ur=e=>ar(e);export{dr as c,ur as s};