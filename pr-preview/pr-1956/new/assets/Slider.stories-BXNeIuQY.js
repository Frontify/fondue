import{j as d}from"./jsx-runtime-DBEcOq3S.js";import{r as u}from"./index-DtJulBIN.js";import{u as He,c as E}from"./index-BHYJtXto.js";import{u as j,P as U}from"./index-B6WxdOXM.js";import{c as qe}from"./index-P-l_ls5c.js";import{c as Oe,u as Le}from"./index-D8PusfQX.js";import{u as Ue}from"./index-BRCTM6zp.js";import{u as Ye}from"./index-CvTA8V3i.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DD2ZIxVL.js";function Pe(e,[t,n]){return Math.min(n,Math.max(t,e))}var Ce=["PageUp","PageDown"],Te=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],De={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},M="Slider",[$,Fe,We]=Oe(M),[Ee,Ct]=qe(M,[We]),[$e,Y]=Ee(M),Me=u.forwardRef((e,t)=>{const{name:n,min:r=0,max:s=100,step:i=1,orientation:o="horizontal",disabled:l=!1,minStepsBetweenThumbs:c=0,defaultValue:g=[r],value:v,onValueChange:a=()=>{},onValueCommit:m=()=>{},inverted:S=!1,...x}=e,h=u.useRef(new Set),f=u.useRef(0),R=o==="horizontal"?Ge:Xe,[p=[],w]=He({prop:v,defaultProp:g,onChange:b=>{var T;(T=[...h.current][f.current])==null||T.focus(),a(b)}}),C=u.useRef(p);function Q(b){const _=tt(p,b);A(b,_)}function F(b){A(b,f.current)}function Ne(){const b=C.current[f.current];p[f.current]!==b&&m(p)}function A(b,_,{commit:T}={commit:!1}){const Z=ot(i),W=at(Math.round((b-r)/i)*i+r,Z),V=Pe(W,[r,s]);w((D=[])=>{const P=Ze(D,V,_);if(st(P,c*i)){f.current=P.indexOf(V);const ee=String(P)!==String(D);return ee&&T&&m(P),ee?P:D}else return D})}return d.jsx($e,{scope:e.__scopeSlider,name:n,disabled:l,min:r,max:s,valueIndexToChangeRef:f,thumbs:h.current,values:p,orientation:o,children:d.jsx($.Provider,{scope:e.__scopeSlider,children:d.jsx($.Slot,{scope:e.__scopeSlider,children:d.jsx(R,{"aria-disabled":l,"data-disabled":l?"":void 0,...x,ref:t,onPointerDown:E(x.onPointerDown,()=>{l||(C.current=p)}),min:r,max:s,inverted:S,onSlideStart:l?void 0:Q,onSlideMove:l?void 0:F,onSlideEnd:l?void 0:Ne,onHomeKeyDown:()=>!l&&A(r,0,{commit:!0}),onEndKeyDown:()=>!l&&A(s,p.length-1,{commit:!0}),onStepKeyDown:({event:b,direction:_})=>{if(!l){const W=Ce.includes(b.key)||b.shiftKey&&Te.includes(b.key)?10:1,V=f.current,D=p[V],P=i*W*_;A(D+P,V,{commit:!0})}}})})})})});Me.displayName=M;var[Ae,Ve]=Ee(M,{startEdge:"left",endEdge:"right",size:"width",direction:1}),Ge=u.forwardRef((e,t)=>{const{min:n,max:r,dir:s,inverted:i,onSlideStart:o,onSlideMove:l,onSlideEnd:c,onStepKeyDown:g,...v}=e,[a,m]=u.useState(null),S=j(t,p=>m(p)),x=u.useRef(),h=Le(s),f=h==="ltr",y=f&&!i||!f&&i;function R(p){const w=x.current||a.getBoundingClientRect(),C=[0,w.width],F=J(C,y?[n,r]:[r,n]);return x.current=w,F(p-w.left)}return d.jsx(Ae,{scope:e.__scopeSlider,startEdge:y?"left":"right",endEdge:y?"right":"left",direction:y?1:-1,size:"width",children:d.jsx(je,{dir:h,"data-orientation":"horizontal",...v,ref:S,style:{...v.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:p=>{const w=R(p.clientX);o==null||o(w)},onSlideMove:p=>{const w=R(p.clientX);l==null||l(w)},onSlideEnd:()=>{x.current=void 0,c==null||c()},onStepKeyDown:p=>{const C=De[y?"from-left":"from-right"].includes(p.key);g==null||g({event:p,direction:C?-1:1})}})})}),Xe=u.forwardRef((e,t)=>{const{min:n,max:r,inverted:s,onSlideStart:i,onSlideMove:o,onSlideEnd:l,onStepKeyDown:c,...g}=e,v=u.useRef(null),a=j(t,v),m=u.useRef(),S=!s;function x(h){const f=m.current||v.current.getBoundingClientRect(),y=[0,f.height],p=J(y,S?[r,n]:[n,r]);return m.current=f,p(h-f.top)}return d.jsx(Ae,{scope:e.__scopeSlider,startEdge:S?"bottom":"top",endEdge:S?"top":"bottom",size:"height",direction:S?1:-1,children:d.jsx(je,{"data-orientation":"vertical",...g,ref:a,style:{...g.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:h=>{const f=x(h.clientY);i==null||i(f)},onSlideMove:h=>{const f=x(h.clientY);o==null||o(f)},onSlideEnd:()=>{m.current=void 0,l==null||l()},onStepKeyDown:h=>{const y=De[S?"from-bottom":"from-top"].includes(h.key);c==null||c({event:h,direction:y?-1:1})}})})}),je=u.forwardRef((e,t)=>{const{__scopeSlider:n,onSlideStart:r,onSlideMove:s,onSlideEnd:i,onHomeKeyDown:o,onEndKeyDown:l,onStepKeyDown:c,...g}=e,v=Y(M,n);return d.jsx(U.span,{...g,ref:t,onKeyDown:E(e.onKeyDown,a=>{a.key==="Home"?(o(a),a.preventDefault()):a.key==="End"?(l(a),a.preventDefault()):Ce.concat(Te).includes(a.key)&&(c(a),a.preventDefault())}),onPointerDown:E(e.onPointerDown,a=>{const m=a.target;m.setPointerCapture(a.pointerId),a.preventDefault(),v.thumbs.has(m)?m.focus():r(a)}),onPointerMove:E(e.onPointerMove,a=>{a.target.hasPointerCapture(a.pointerId)&&s(a)}),onPointerUp:E(e.onPointerUp,a=>{const m=a.target;m.hasPointerCapture(a.pointerId)&&(m.releasePointerCapture(a.pointerId),i(a))})})}),Ie="SliderTrack",ke=u.forwardRef((e,t)=>{const{__scopeSlider:n,...r}=e,s=Y(Ie,n);return d.jsx(U.span,{"data-disabled":s.disabled?"":void 0,"data-orientation":s.orientation,...r,ref:t})});ke.displayName=Ie;var G="SliderRange",Be=u.forwardRef((e,t)=>{const{__scopeSlider:n,...r}=e,s=Y(G,n),i=Ve(G,n),o=u.useRef(null),l=j(t,o),c=s.values.length,g=s.values.map(m=>ze(m,s.min,s.max)),v=c>1?Math.min(...g):0,a=100-Math.max(...g);return d.jsx(U.span,{"data-orientation":s.orientation,"data-disabled":s.disabled?"":void 0,...r,ref:l,style:{...e.style,[i.startEdge]:v+"%",[i.endEdge]:a+"%"}})});Be.displayName=G;var X="SliderThumb",Ke=u.forwardRef((e,t)=>{const n=Fe(e.__scopeSlider),[r,s]=u.useState(null),i=j(t,l=>s(l)),o=u.useMemo(()=>r?n().findIndex(l=>l.ref.current===r):-1,[n,r]);return d.jsx(Je,{...e,ref:i,index:o})}),Je=u.forwardRef((e,t)=>{const{__scopeSlider:n,index:r,name:s,...i}=e,o=Y(X,n),l=Ve(X,n),[c,g]=u.useState(null),v=j(t,R=>g(R)),a=c?!!c.closest("form"):!0,m=Ye(c),S=o.values[r],x=S===void 0?0:ze(S,o.min,o.max),h=et(r,o.values.length),f=m==null?void 0:m[l.size],y=f?rt(f,x,l.direction):0;return u.useEffect(()=>{if(c)return o.thumbs.add(c),()=>{o.thumbs.delete(c)}},[c,o.thumbs]),d.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[l.startEdge]:`calc(${x}% + ${y}px)`},children:[d.jsx($.ItemSlot,{scope:e.__scopeSlider,children:d.jsx(U.span,{role:"slider","aria-label":e["aria-label"]||h,"aria-valuemin":o.min,"aria-valuenow":S,"aria-valuemax":o.max,"aria-orientation":o.orientation,"data-orientation":o.orientation,"data-disabled":o.disabled?"":void 0,tabIndex:o.disabled?void 0:0,...i,ref:v,style:S===void 0?{display:"none"}:e.style,onFocus:E(e.onFocus,()=>{o.valueIndexToChangeRef.current=r})})}),a&&d.jsx(Qe,{name:s??(o.name?o.name+(o.values.length>1?"[]":""):void 0),value:S},r)]})});Ke.displayName=X;var Qe=e=>{const{value:t,...n}=e,r=u.useRef(null),s=Ue(t);return u.useEffect(()=>{const i=r.current,o=window.HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(o,"value").set;if(s!==t&&c){const g=new Event("input",{bubbles:!0});c.call(i,t),i.dispatchEvent(g)}},[s,t]),d.jsx("input",{style:{display:"none"},...n,ref:r,defaultValue:t})};function Ze(e=[],t,n){const r=[...e];return r[n]=t,r.sort((s,i)=>s-i)}function ze(e,t,n){const i=100/(n-t)*(e-t);return Pe(i,[0,100])}function et(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function tt(e,t){if(e.length===1)return 0;const n=e.map(s=>Math.abs(s-t)),r=Math.min(...n);return n.indexOf(r)}function rt(e,t,n){const r=e/2,i=J([0,50],[0,r]);return(r-i(t)*n)*n}function nt(e){return e.slice(0,-1).map((t,n)=>e[n+1]-t)}function st(e,t){if(t>0){const n=nt(e);return Math.min(...n)>=t}return!0}function J(e,t){return n=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const r=(t[1]-t[0])/(e[1]-e[0]);return t[0]+r*(n-e[0])}}function ot(e){return(String(e).split(".")[1]||"").length}function at(e,t){const n=Math.pow(10,t);return Math.round(e*n)/n}var it=Me,lt=ke,ct=Be,ut=Ke;const dt="_slider_1x7zk_5",mt="_track_1x7zk_17",ft="_range_1x7zk_24",pt="_thumb_1x7zk_30",k={slider:dt,track:mt,range:ft,thumb:pt},gt=({value:e,defaultValue:t=[0],onChange:n,onCommit:r,"data-test-id":s="fondue-slider",...i},o)=>d.jsxs(it,{ref:o,className:k.slider,value:e,defaultValue:t,onValueChange:n,onValueCommit:r,"data-test-id":s,...i,children:[d.jsx(lt,{className:k.track,children:d.jsx(ct,{className:k.range})}),(e||t).map((l,c)=>d.jsx(ut,{className:k.thumb},c))]}),I=u.forwardRef(gt);I.displayName="Slider";I.__docgenInfo={description:"",methods:[],displayName:"Slider",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The default value of the slider
Used for uncontrolled components
@default [0]`,defaultValue:{value:"[0]",computed:!1}},value:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The controlled value of the slider
@default [0]`},min:{required:!1,tsType:{name:"number"},description:`Minimum value of the slider
@default 0`},max:{required:!1,tsType:{name:"number"},description:`Maximum value of the slider
@default 100`},step:{required:!1,tsType:{name:"number"},description:`The granularity with which the slider can step through values
@default 1`},minStepsBetweenThumbs:{required:!1,tsType:{name:"number"},description:`The minimum steps between thumbs in a range slider
@default 0`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disable the slider
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},onCommit:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-slider'",computed:!1}}}};const Tt={component:I,tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{"aria-labelledby":"some-label-id","aria-label":"Slider"}},B={args:{name:"Simple slider"}},K={args:{disabled:!0}},z={args:{min:50,max:1e3}},N={args:{minStepsBetweenThumbs:25}},H={args:{step:25}},q={args:{defaultValue:[33,67]}},O={render:e=>{const[t,n]=u.useState([50]),r=u.useRef(!1);return d.jsx(I,{onChange:s=>{s[0]&&(s[0]>80&&!r.current&&(r.current=!0,alert("You're going a bit high there")),n(s))},value:t,...e})}},L={render:e=>{const[t,n]=u.useState([33,67]);return d.jsx(I,{onChange:r=>{if(!(!r[0]||!r[1])){if(r[1]-r[0]>80){alert("The range is too large");return}n(r)}},value:t,...e})}};var te,re,ne;B.parameters={...B.parameters,docs:{...(te=B.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    name: 'Simple slider'
  }
}`,...(ne=(re=B.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var se,oe,ae;K.parameters={...K.parameters,docs:{...(se=K.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(ae=(oe=K.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};var ie,le,ce;z.parameters={...z.parameters,docs:{...(ie=z.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    min: 50,
    max: 1000
  }
}`,...(ce=(le=z.parameters)==null?void 0:le.docs)==null?void 0:ce.source}}};var ue,de,me;N.parameters={...N.parameters,docs:{...(ue=N.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    minStepsBetweenThumbs: 25
  }
}`,...(me=(de=N.parameters)==null?void 0:de.docs)==null?void 0:me.source}}};var fe,pe,ge;H.parameters={...H.parameters,docs:{...(fe=H.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    step: 25
  }
}`,...(ge=(pe=H.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var he,Se,be;q.parameters={...q.parameters,docs:{...(he=q.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    defaultValue: [33, 67]
  }
}`,...(be=(Se=q.parameters)==null?void 0:Se.docs)==null?void 0:be.source}}};var ve,xe,ye;O.parameters={...O.parameters,docs:{...(ve=O.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: args => {
    const [sliderRange, setSliderRange] = useState([50]);
    const userIsWarned = useRef(false);
    return <Slider onChange={value => {
      if (!value[0]) {
        return;
      }
      if (value[0] > 80 && !userIsWarned.current) {
        userIsWarned.current = true;
        alert("You're going a bit high there");
      }
      setSliderRange(value);
    }} value={sliderRange} {...args} />;
  }
}`,...(ye=(xe=O.parameters)==null?void 0:xe.docs)==null?void 0:ye.source}}};var we,Re,_e;L.parameters={...L.parameters,docs:{...(we=L.parameters)==null?void 0:we.docs,source:{originalSource:`{
  render: args => {
    const [sliderRange, setSliderRange] = useState([33, 67]);
    return <Slider onChange={value => {
      if (!value[0] || !value[1]) {
        return;
      }
      if (value[1] - value[0] > 80) {
        alert('The range is too large');
        return;
      }
      setSliderRange(value);
    }} value={sliderRange} {...args} />;
  }
}`,...(_e=(Re=L.parameters)==null?void 0:Re.docs)==null?void 0:_e.source}}};const Dt=["SimpleSlider","Disabled","MinimumAndMaximum","MinimumGap","StepSize","MultipleThumbsUncontrolled","ExternallyControlled","MultipleThumbsExternallyControlled"];export{K as Disabled,O as ExternallyControlled,z as MinimumAndMaximum,N as MinimumGap,L as MultipleThumbsExternallyControlled,q as MultipleThumbsUncontrolled,B as SimpleSlider,H as StepSize,Dt as __namedExportsOrder,Tt as default};