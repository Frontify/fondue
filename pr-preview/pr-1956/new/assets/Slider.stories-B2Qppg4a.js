import{j as u}from"./jsx-runtime-DBEcOq3S.js";import{r as c}from"./index-DtJulBIN.js";import{L as Oe}from"./Label-CVvaVZ2g.js";import{T as Ue}from"./TextInput-CSGLPyha.js";import{u as $e,c as M}from"./index-BHYJtXto.js";import{u as A,P as U}from"./index-Dhc4yksV.js";import{c as We}from"./index-P-l_ls5c.js";import{c as Ye,u as Ge}from"./index-6kD61ZNA.js";import{u as Xe}from"./index-BRCTM6zp.js";import{u as Je}from"./index-CvTA8V3i.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-T76WvCte.js";import"./fondue-icons324-D7hKQcWe.js";import"./index-BqTDQIm7.js";function Me(e,[t,r]){return Math.min(r,Math.max(t,e))}var Ee=["PageUp","PageDown"],De=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],Ie={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},E="Slider",[G,Qe,Ze]=Ye(E),[je,Bt]=We(E,[Ze]),[et,$]=je(E),Ae=c.forwardRef((e,t)=>{const{name:r,min:n=0,max:a=100,step:o=1,orientation:s="horizontal",disabled:i=!1,minStepsBetweenThumbs:d=0,defaultValue:g=[n],value:v,onValueChange:l=()=>{},onValueCommit:m=()=>{},inverted:b=!1,...y}=e,h=c.useRef(new Set),p=c.useRef(0),R=s==="horizontal"?tt:nt,[f=[],w]=$e({prop:v,defaultProp:g,onChange:S=>{var V;(V=[...h.current][p.current])==null||V.focus(),l(S)}}),P=c.useRef(f);function Z(S){const C=it(f,S);I(S,C)}function W(S){I(S,p.current)}function Fe(){const S=P.current[p.current];f[p.current]!==S&&m(f)}function I(S,C,{commit:V}={commit:!1}){const ee=ct(o),Y=mt(Math.round((S-n)/o)*o+n,ee),j=Me(Y,[n,a]);w((_=[])=>{const T=st(_,j,C);if(dt(T,d*o)){p.current=T.indexOf(j);const te=String(T)!==String(_);return te&&V&&m(T),te?T:_}else return _})}return u.jsx(et,{scope:e.__scopeSlider,name:r,disabled:i,min:n,max:a,valueIndexToChangeRef:p,thumbs:h.current,values:f,orientation:s,children:u.jsx(G.Provider,{scope:e.__scopeSlider,children:u.jsx(G.Slot,{scope:e.__scopeSlider,children:u.jsx(R,{"aria-disabled":i,"data-disabled":i?"":void 0,...y,ref:t,onPointerDown:M(y.onPointerDown,()=>{i||(P.current=f)}),min:n,max:a,inverted:b,onSlideStart:i?void 0:Z,onSlideMove:i?void 0:W,onSlideEnd:i?void 0:Fe,onHomeKeyDown:()=>!i&&I(n,0,{commit:!0}),onEndKeyDown:()=>!i&&I(a,f.length-1,{commit:!0}),onStepKeyDown:({event:S,direction:C})=>{if(!i){const Y=Ee.includes(S.key)||S.shiftKey&&De.includes(S.key)?10:1,j=p.current,_=f[j],T=o*Y*C;I(_+T,j,{commit:!0})}}})})})})});Ae.displayName=E;var[ke,Be]=je(E,{startEdge:"left",endEdge:"right",size:"width",direction:1}),tt=c.forwardRef((e,t)=>{const{min:r,max:n,dir:a,inverted:o,onSlideStart:s,onSlideMove:i,onSlideEnd:d,onStepKeyDown:g,...v}=e,[l,m]=c.useState(null),b=A(t,f=>m(f)),y=c.useRef(),h=Ge(a),p=h==="ltr",x=p&&!o||!p&&o;function R(f){const w=y.current||l.getBoundingClientRect(),P=[0,w.width],W=Q(P,x?[r,n]:[n,r]);return y.current=w,W(f-w.left)}return u.jsx(ke,{scope:e.__scopeSlider,startEdge:x?"left":"right",endEdge:x?"right":"left",direction:x?1:-1,size:"width",children:u.jsx(Ke,{dir:h,"data-orientation":"horizontal",...v,ref:b,style:{...v.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:f=>{const w=R(f.clientX);s==null||s(w)},onSlideMove:f=>{const w=R(f.clientX);i==null||i(w)},onSlideEnd:()=>{y.current=void 0,d==null||d()},onStepKeyDown:f=>{const P=Ie[x?"from-left":"from-right"].includes(f.key);g==null||g({event:f,direction:P?-1:1})}})})}),nt=c.forwardRef((e,t)=>{const{min:r,max:n,inverted:a,onSlideStart:o,onSlideMove:s,onSlideEnd:i,onStepKeyDown:d,...g}=e,v=c.useRef(null),l=A(t,v),m=c.useRef(),b=!a;function y(h){const p=m.current||v.current.getBoundingClientRect(),x=[0,p.height],f=Q(x,b?[n,r]:[r,n]);return m.current=p,f(h-p.top)}return u.jsx(ke,{scope:e.__scopeSlider,startEdge:b?"bottom":"top",endEdge:b?"top":"bottom",size:"height",direction:b?1:-1,children:u.jsx(Ke,{"data-orientation":"vertical",...g,ref:l,style:{...g.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:h=>{const p=y(h.clientY);o==null||o(p)},onSlideMove:h=>{const p=y(h.clientY);s==null||s(p)},onSlideEnd:()=>{m.current=void 0,i==null||i()},onStepKeyDown:h=>{const x=Ie[b?"from-bottom":"from-top"].includes(h.key);d==null||d({event:h,direction:x?-1:1})}})})}),Ke=c.forwardRef((e,t)=>{const{__scopeSlider:r,onSlideStart:n,onSlideMove:a,onSlideEnd:o,onHomeKeyDown:s,onEndKeyDown:i,onStepKeyDown:d,...g}=e,v=$(E,r);return u.jsx(U.span,{...g,ref:t,onKeyDown:M(e.onKeyDown,l=>{l.key==="Home"?(s(l),l.preventDefault()):l.key==="End"?(i(l),l.preventDefault()):Ee.concat(De).includes(l.key)&&(d(l),l.preventDefault())}),onPointerDown:M(e.onPointerDown,l=>{const m=l.target;m.setPointerCapture(l.pointerId),l.preventDefault(),v.thumbs.has(m)?m.focus():n(l)}),onPointerMove:M(e.onPointerMove,l=>{l.target.hasPointerCapture(l.pointerId)&&a(l)}),onPointerUp:M(e.onPointerUp,l=>{const m=l.target;m.hasPointerCapture(l.pointerId)&&(m.releasePointerCapture(l.pointerId),o(l))})})}),Ne="SliderTrack",He=c.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,a=$(Ne,r);return u.jsx(U.span,{"data-disabled":a.disabled?"":void 0,"data-orientation":a.orientation,...n,ref:t})});He.displayName=Ne;var X="SliderRange",Le=c.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,a=$(X,r),o=Be(X,r),s=c.useRef(null),i=A(t,s),d=a.values.length,g=a.values.map(m=>qe(m,a.min,a.max)),v=d>1?Math.min(...g):0,l=100-Math.max(...g);return u.jsx(U.span,{"data-orientation":a.orientation,"data-disabled":a.disabled?"":void 0,...n,ref:i,style:{...e.style,[o.startEdge]:v+"%",[o.endEdge]:l+"%"}})});Le.displayName=X;var J="SliderThumb",ze=c.forwardRef((e,t)=>{const r=Qe(e.__scopeSlider),[n,a]=c.useState(null),o=A(t,i=>a(i)),s=c.useMemo(()=>n?r().findIndex(i=>i.ref.current===n):-1,[r,n]);return u.jsx(rt,{...e,ref:o,index:s})}),rt=c.forwardRef((e,t)=>{const{__scopeSlider:r,index:n,name:a,...o}=e,s=$(J,r),i=Be(J,r),[d,g]=c.useState(null),v=A(t,R=>g(R)),l=d?!!d.closest("form"):!0,m=Je(d),b=s.values[n],y=b===void 0?0:qe(b,s.min,s.max),h=ot(n,s.values.length),p=m==null?void 0:m[i.size],x=p?lt(p,y,i.direction):0;return c.useEffect(()=>{if(d)return s.thumbs.add(d),()=>{s.thumbs.delete(d)}},[d,s.thumbs]),u.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[i.startEdge]:`calc(${y}% + ${x}px)`},children:[u.jsx(G.ItemSlot,{scope:e.__scopeSlider,children:u.jsx(U.span,{role:"slider","aria-label":e["aria-label"]||h,"aria-valuemin":s.min,"aria-valuenow":b,"aria-valuemax":s.max,"aria-orientation":s.orientation,"data-orientation":s.orientation,"data-disabled":s.disabled?"":void 0,tabIndex:s.disabled?void 0:0,...o,ref:v,style:b===void 0?{display:"none"}:e.style,onFocus:M(e.onFocus,()=>{s.valueIndexToChangeRef.current=n})})}),l&&u.jsx(at,{name:a??(s.name?s.name+(s.values.length>1?"[]":""):void 0),value:b},n)]})});ze.displayName=J;var at=e=>{const{value:t,...r}=e,n=c.useRef(null),a=Xe(t);return c.useEffect(()=>{const o=n.current,s=window.HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(s,"value").set;if(a!==t&&d){const g=new Event("input",{bubbles:!0});d.call(o,t),o.dispatchEvent(g)}},[a,t]),u.jsx("input",{style:{display:"none"},...r,ref:n,defaultValue:t})};function st(e=[],t,r){const n=[...e];return n[r]=t,n.sort((a,o)=>a-o)}function qe(e,t,r){const o=100/(r-t)*(e-t);return Me(o,[0,100])}function ot(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function it(e,t){if(e.length===1)return 0;const r=e.map(a=>Math.abs(a-t)),n=Math.min(...r);return r.indexOf(n)}function lt(e,t,r){const n=e/2,o=Q([0,50],[0,n]);return(n-o(t)*r)*r}function ut(e){return e.slice(0,-1).map((t,r)=>e[r+1]-t)}function dt(e,t){if(t>0){const r=ut(e);return Math.min(...r)>=t}return!0}function Q(e,t){return r=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const n=(t[1]-t[0])/(e[1]-e[0]);return t[0]+n*(r-e[0])}}function ct(e){return(String(e).split(".")[1]||"").length}function mt(e,t){const r=Math.pow(10,t);return Math.round(e*r)/r}var pt=Ae,ft=He,gt=Le,ht=ze;const bt="_slider_aupky_5",St="_track_aupky_16",vt="_range_aupky_23",yt="_thumb_aupky_32",k={slider:bt,track:St,range:vt,thumb:yt},xt=({value:e,defaultValue:t=[0],onChange:r,onCommit:n,"data-test-id":a="fondue-slider",...o},s)=>u.jsxs(pt,{ref:s,className:k.slider,value:e,defaultValue:t,onValueChange:r,onValueCommit:n,"data-test-id":a,...o,children:[u.jsx(ft,{className:k.track,children:u.jsx(gt,{className:k.range})}),(e||t).map((i,d)=>u.jsx(ht,{className:k.thumb},d))]}),D=c.forwardRef(xt);D.displayName="Slider";D.__docgenInfo={description:"",methods:[],displayName:"Slider",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The default value of the slider
Used for uncontrolled components
@default [0]`,defaultValue:{value:"[0]",computed:!1}},value:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The controlled value of the slider
@default [0]`},min:{required:!1,tsType:{name:"number"},description:`Minimum value of the slider
@default 0`},max:{required:!1,tsType:{name:"number"},description:`Maximum value of the slider
@default 100`},step:{required:!1,tsType:{name:"number"},description:`The granularity with which the slider can step through values
@default 1`},minStepsBetweenThumbs:{required:!1,tsType:{name:"number"},description:`The minimum steps between thumbs in a range slider
@default 0`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disable the slider
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},onCommit:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-slider'",computed:!1}}}};const Kt={component:D,tags:["autodocs"],parameters:{status:{type:"in_progress"}},argTypes:{defaultValue:{control:"object",description:"The default value of the slider, used for uncontrolled components.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},value:{control:"object",description:"The controlled value of the slider.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},min:{control:"number",description:"Minimum value of the slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},max:{control:"number",description:"Maximum value of the slider.",defaultValue:100,table:{type:{summary:"number"},defaultValue:{summary:"100"}}},step:{control:"number",description:"The granularity with which the slider can step through values.",defaultValue:1,table:{type:{summary:"number"},defaultValue:{summary:"1"}}},minStepsBetweenThumbs:{control:"number",description:"The minimum steps between thumbs in a range slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},disabled:{control:"boolean",description:"Disable the slider.",defaultValue:!1,table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onChange:{action:"onChange",description:"Function called when the value changes.",table:{type:{summary:"(value: number[]) => void"}}},onCommit:{action:"onCommit",description:"Function called when the value change is committed.",table:{type:{summary:"(value: number[]) => void"}}}},args:{min:0,max:100}},B={args:{name:"Simple slider"}},K={args:{disabled:!0,defaultValue:[50]}},N={args:{min:50,max:1e3}},H={args:{minStepsBetweenThumbs:25}},L={args:{step:25}},z={args:{defaultValue:[33,67]}},q={render:e=>{const[t,r]=c.useState([50]),n=c.useRef(!1);return u.jsx(D,{onChange:a=>{a[0]&&(a[0]>80&&!n.current&&(n.current=!0,alert("You're going a bit high there")),r(a))},value:t,...e})}},F={render:e=>{const[t,r]=c.useState([33,67]);return u.jsx(D,{onChange:n=>{if(!(!n[0]||!n[1])){if(n[1]-n[0]>80){alert("The range is too large");return}r(n)}},value:t,...e})}},O={decorators:e=>u.jsx("div",{style:{display:"flex",gap:16},children:u.jsx(e,{})}),render:()=>{const[e,t]=c.useState([250,450]),r=a=>{t(a)},n=a=>o=>{const s=parseInt(o.target.value,10);s>=200&&s<=500&&t(i=>{const d=[...i];return d[a]=s,d})};return u.jsxs(u.Fragment,{children:[u.jsx(Oe,{id:"new-slider-label",htmlFor:"new-slider",children:"Price range"}),u.jsx(D,{id:"new-slider","aria-labelledby":"new-slider-label",value:e,min:200,max:500,onChange:r}),e.map((a,o)=>u.jsx(Ue,{id:`new-slider-input-${o}`,value:a,type:"number","aria-label":`Price range ${o===0?"from":"to"}`,onChange:n(o)},o))]})}};var ne,re,ae;B.parameters={...B.parameters,docs:{...(ne=B.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    name: 'Simple slider'
  }
}`,...(ae=(re=B.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,oe,ie;K.parameters={...K.parameters,docs:{...(se=K.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: [50]
  }
}`,...(ie=(oe=K.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var le,ue,de;N.parameters={...N.parameters,docs:{...(le=N.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    min: 50,
    max: 1000
  }
}`,...(de=(ue=N.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};var ce,me,pe;H.parameters={...H.parameters,docs:{...(ce=H.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    minStepsBetweenThumbs: 25
  }
}`,...(pe=(me=H.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var fe,ge,he;L.parameters={...L.parameters,docs:{...(fe=L.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    step: 25
  }
}`,...(he=(ge=L.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var be,Se,ve;z.parameters={...z.parameters,docs:{...(be=z.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    defaultValue: [33, 67]
  }
}`,...(ve=(Se=z.parameters)==null?void 0:Se.docs)==null?void 0:ve.source}}};var ye,xe,we;q.parameters={...q.parameters,docs:{...(ye=q.parameters)==null?void 0:ye.docs,source:{originalSource:`{
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
}`,...(we=(xe=q.parameters)==null?void 0:xe.docs)==null?void 0:we.source}}};var Re,Ce,Te;F.parameters={...F.parameters,docs:{...(Re=F.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(Te=(Ce=F.parameters)==null?void 0:Ce.docs)==null?void 0:Te.source}}};var Pe,Ve,_e;O.parameters={...O.parameters,docs:{...(Pe=O.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  decorators: Story => {
    return <div style={{
      display: 'flex',
      gap: 16
    }}>
                <Story />
            </div>;
  },
  render: () => {
    const [range, setRange] = useState([250, 450]);
    const onRangeChange = (value: number[]) => {
      setRange(value);
    };
    const onInputChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (newValue >= 200 && newValue <= 500) {
        setRange(prev => {
          const newRange = [...prev];
          newRange[index] = newValue;
          return newRange;
        });
      }
    };
    return <>
                <Label id="new-slider-label" htmlFor="new-slider">
                    Price range
                </Label>

                <Slider id="new-slider" aria-labelledby="new-slider-label" value={range} min={200} max={500} onChange={onRangeChange} />

                {range.map((value, index) => <TextInput key={index} id={\`new-slider-input-\${index}\`} value={value} type="number" aria-label={\`Price range \${index === 0 ? 'from' : 'to'}\`} onChange={onInputChange(index)} />)}
            </>;
  }
}`,...(_e=(Ve=O.parameters)==null?void 0:Ve.docs)==null?void 0:_e.source}}};const Nt=["SimpleSlider","Disabled","MinimumAndMaximum","MinimumGap","StepSize","MultipleThumbsUncontrolled","ExternallyControlled","MultipleThumbsExternallyControlled","WithInputs"];export{K as Disabled,q as ExternallyControlled,N as MinimumAndMaximum,H as MinimumGap,F as MultipleThumbsExternallyControlled,z as MultipleThumbsUncontrolled,B as SimpleSlider,L as StepSize,O as WithInputs,Nt as __namedExportsOrder,Kt as default};
