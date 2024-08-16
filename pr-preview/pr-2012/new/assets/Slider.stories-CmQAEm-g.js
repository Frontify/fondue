import{j as u}from"./jsx-runtime-DBEcOq3S.js";import{r as c}from"./index-DtJulBIN.js";import{L as Fe}from"./Label-CVvaVZ2g.js";import{T as Ue}from"./TextInput-DfszU8Fz.js";import{u as $e,c as D}from"./index-BHYJtXto.js";import{u as A,P as U}from"./index-Dhc4yksV.js";import{c as We}from"./index-P-l_ls5c.js";import{c as Ye,u as Ge}from"./index-6kD61ZNA.js";import{u as Xe}from"./index-BRCTM6zp.js";import{u as Je}from"./index-CvTA8V3i.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-T76WvCte.js";import"./fondue-icons324-Bw2AQYl8.js";import"./index-BqTDQIm7.js";function De(e,[t,r]){return Math.min(r,Math.max(t,e))}var Me=["PageUp","PageDown"],Ee=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],Ie={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},M="Slider",[G,Qe,Ze]=Ye(M),[je,kt]=We(M,[Ze]),[et,$]=je(M),Ae=c.forwardRef((e,t)=>{const{name:r,min:n=0,max:a=100,step:s=1,orientation:o="horizontal",disabled:i=!1,minStepsBetweenThumbs:d=0,defaultValue:g=[n],value:h,onValueChange:l=()=>{},onValueCommit:m=()=>{},inverted:S=!1,...y}=e,b=c.useRef(new Set),p=c.useRef(0),R=o==="horizontal"?tt:nt,[f=[],w]=$e({prop:h,defaultProp:g,onChange:v=>{var V;(V=[...b.current][p.current])==null||V.focus(),l(v)}}),P=c.useRef(f);function Z(v){const C=it(f,v);I(v,C)}function W(v){I(v,p.current)}function qe(){const v=P.current[p.current];f[p.current]!==v&&m(f)}function I(v,C,{commit:V}={commit:!1}){const ee=ct(s),Y=mt(Math.round((v-n)/s)*s+n,ee),j=De(Y,[n,a]);w((_=[])=>{const T=ot(_,j,C);if(dt(T,d*s)){p.current=T.indexOf(j);const te=String(T)!==String(_);return te&&V&&m(T),te?T:_}else return _})}return u.jsx(et,{scope:e.__scopeSlider,name:r,disabled:i,min:n,max:a,valueIndexToChangeRef:p,thumbs:b.current,values:f,orientation:o,children:u.jsx(G.Provider,{scope:e.__scopeSlider,children:u.jsx(G.Slot,{scope:e.__scopeSlider,children:u.jsx(R,{"aria-disabled":i,"data-disabled":i?"":void 0,...y,ref:t,onPointerDown:D(y.onPointerDown,()=>{i||(P.current=f)}),min:n,max:a,inverted:S,onSlideStart:i?void 0:Z,onSlideMove:i?void 0:W,onSlideEnd:i?void 0:qe,onHomeKeyDown:()=>!i&&I(n,0,{commit:!0}),onEndKeyDown:()=>!i&&I(a,f.length-1,{commit:!0}),onStepKeyDown:({event:v,direction:C})=>{if(!i){const Y=Me.includes(v.key)||v.shiftKey&&Ee.includes(v.key)?10:1,j=p.current,_=f[j],T=s*Y*C;I(_+T,j,{commit:!0})}}})})})})});Ae.displayName=M;var[Be,ke]=je(M,{startEdge:"left",endEdge:"right",size:"width",direction:1}),tt=c.forwardRef((e,t)=>{const{min:r,max:n,dir:a,inverted:s,onSlideStart:o,onSlideMove:i,onSlideEnd:d,onStepKeyDown:g,...h}=e,[l,m]=c.useState(null),S=A(t,f=>m(f)),y=c.useRef(),b=Ge(a),p=b==="ltr",x=p&&!s||!p&&s;function R(f){const w=y.current||l.getBoundingClientRect(),P=[0,w.width],W=Q(P,x?[r,n]:[n,r]);return y.current=w,W(f-w.left)}return u.jsx(Be,{scope:e.__scopeSlider,startEdge:x?"left":"right",endEdge:x?"right":"left",direction:x?1:-1,size:"width",children:u.jsx(Ke,{dir:b,"data-orientation":"horizontal",...h,ref:S,style:{...h.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:f=>{const w=R(f.clientX);o==null||o(w)},onSlideMove:f=>{const w=R(f.clientX);i==null||i(w)},onSlideEnd:()=>{y.current=void 0,d==null||d()},onStepKeyDown:f=>{const P=Ie[x?"from-left":"from-right"].includes(f.key);g==null||g({event:f,direction:P?-1:1})}})})}),nt=c.forwardRef((e,t)=>{const{min:r,max:n,inverted:a,onSlideStart:s,onSlideMove:o,onSlideEnd:i,onStepKeyDown:d,...g}=e,h=c.useRef(null),l=A(t,h),m=c.useRef(),S=!a;function y(b){const p=m.current||h.current.getBoundingClientRect(),x=[0,p.height],f=Q(x,S?[n,r]:[r,n]);return m.current=p,f(b-p.top)}return u.jsx(Be,{scope:e.__scopeSlider,startEdge:S?"bottom":"top",endEdge:S?"top":"bottom",size:"height",direction:S?1:-1,children:u.jsx(Ke,{"data-orientation":"vertical",...g,ref:l,style:{...g.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:b=>{const p=y(b.clientY);s==null||s(p)},onSlideMove:b=>{const p=y(b.clientY);o==null||o(p)},onSlideEnd:()=>{m.current=void 0,i==null||i()},onStepKeyDown:b=>{const x=Ie[S?"from-bottom":"from-top"].includes(b.key);d==null||d({event:b,direction:x?-1:1})}})})}),Ke=c.forwardRef((e,t)=>{const{__scopeSlider:r,onSlideStart:n,onSlideMove:a,onSlideEnd:s,onHomeKeyDown:o,onEndKeyDown:i,onStepKeyDown:d,...g}=e,h=$(M,r);return u.jsx(U.span,{...g,ref:t,onKeyDown:D(e.onKeyDown,l=>{l.key==="Home"?(o(l),l.preventDefault()):l.key==="End"?(i(l),l.preventDefault()):Me.concat(Ee).includes(l.key)&&(d(l),l.preventDefault())}),onPointerDown:D(e.onPointerDown,l=>{const m=l.target;m.setPointerCapture(l.pointerId),l.preventDefault(),h.thumbs.has(m)?m.focus():n(l)}),onPointerMove:D(e.onPointerMove,l=>{l.target.hasPointerCapture(l.pointerId)&&a(l)}),onPointerUp:D(e.onPointerUp,l=>{const m=l.target;m.hasPointerCapture(l.pointerId)&&(m.releasePointerCapture(l.pointerId),s(l))})})}),Ne="SliderTrack",He=c.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,a=$(Ne,r);return u.jsx(U.span,{"data-disabled":a.disabled?"":void 0,"data-orientation":a.orientation,...n,ref:t})});He.displayName=Ne;var X="SliderRange",Le=c.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,a=$(X,r),s=ke(X,r),o=c.useRef(null),i=A(t,o),d=a.values.length,g=a.values.map(m=>ze(m,a.min,a.max)),h=d>1?Math.min(...g):0,l=100-Math.max(...g);return u.jsx(U.span,{"data-orientation":a.orientation,"data-disabled":a.disabled?"":void 0,...n,ref:i,style:{...e.style,[s.startEdge]:h+"%",[s.endEdge]:l+"%"}})});Le.displayName=X;var J="SliderThumb",Oe=c.forwardRef((e,t)=>{const r=Qe(e.__scopeSlider),[n,a]=c.useState(null),s=A(t,i=>a(i)),o=c.useMemo(()=>n?r().findIndex(i=>i.ref.current===n):-1,[r,n]);return u.jsx(rt,{...e,ref:s,index:o})}),rt=c.forwardRef((e,t)=>{const{__scopeSlider:r,index:n,name:a,...s}=e,o=$(J,r),i=ke(J,r),[d,g]=c.useState(null),h=A(t,R=>g(R)),l=d?!!d.closest("form"):!0,m=Je(d),S=o.values[n],y=S===void 0?0:ze(S,o.min,o.max),b=st(n,o.values.length),p=m==null?void 0:m[i.size],x=p?lt(p,y,i.direction):0;return c.useEffect(()=>{if(d)return o.thumbs.add(d),()=>{o.thumbs.delete(d)}},[d,o.thumbs]),u.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[i.startEdge]:`calc(${y}% + ${x}px)`},children:[u.jsx(G.ItemSlot,{scope:e.__scopeSlider,children:u.jsx(U.span,{role:"slider","aria-label":e["aria-label"]||b,"aria-valuemin":o.min,"aria-valuenow":S,"aria-valuemax":o.max,"aria-orientation":o.orientation,"data-orientation":o.orientation,"data-disabled":o.disabled?"":void 0,tabIndex:o.disabled?void 0:0,...s,ref:h,style:S===void 0?{display:"none"}:e.style,onFocus:D(e.onFocus,()=>{o.valueIndexToChangeRef.current=n})})}),l&&u.jsx(at,{name:a??(o.name?o.name+(o.values.length>1?"[]":""):void 0),value:S},n)]})});Oe.displayName=J;var at=e=>{const{value:t,...r}=e,n=c.useRef(null),a=Xe(t);return c.useEffect(()=>{const s=n.current,o=window.HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(o,"value").set;if(a!==t&&d){const g=new Event("input",{bubbles:!0});d.call(s,t),s.dispatchEvent(g)}},[a,t]),u.jsx("input",{style:{display:"none"},...r,ref:n,defaultValue:t})};function ot(e=[],t,r){const n=[...e];return n[r]=t,n.sort((a,s)=>a-s)}function ze(e,t,r){const s=100/(r-t)*(e-t);return De(s,[0,100])}function st(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function it(e,t){if(e.length===1)return 0;const r=e.map(a=>Math.abs(a-t)),n=Math.min(...r);return r.indexOf(n)}function lt(e,t,r){const n=e/2,s=Q([0,50],[0,n]);return(n-s(t)*r)*r}function ut(e){return e.slice(0,-1).map((t,r)=>e[r+1]-t)}function dt(e,t){if(t>0){const r=ut(e);return Math.min(...r)>=t}return!0}function Q(e,t){return r=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const n=(t[1]-t[0])/(e[1]-e[0]);return t[0]+n*(r-e[0])}}function ct(e){return(String(e).split(".")[1]||"").length}function mt(e,t){const r=Math.pow(10,t);return Math.round(e*r)/r}var pt=Ae,ft=He,gt=Le,ht=Oe;const bt="_root_acy8u_5",St="_track_acy8u_16",vt="_range_acy8u_23",yt="_thumb_acy8u_32",B={root:bt,track:St,range:vt,thumb:yt},xt=({value:e,defaultValue:t=[0],onChange:r,onCommit:n,"data-test-id":a="fondue-slider",...s},o)=>{const i=c.useRef(null);return u.jsxs(pt,{ref:o,className:B.root,value:e,defaultValue:t,onValueChange:r,onValueCommit:n,"data-test-id":a,...s,children:[u.jsx(ft,{onPointerDown:()=>{i.current&&(i.current.dataset.preventBlueOutline="true")},className:B.track,children:u.jsx(gt,{className:B.range})}),(e||t).map((d,g)=>u.jsx(ht,{ref:i,onPointerDown:h=>{h.currentTarget.dataset.preventBlueOutline="true"},onBlur:h=>{h.currentTarget.dataset.preventBlueOutline="false"},className:B.thumb},g))]})},E=c.forwardRef(xt);E.displayName="Slider";E.__docgenInfo={description:"",methods:[],displayName:"Slider",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The default value of the slider
Used for uncontrolled components
@default [0]`,defaultValue:{value:"[0]",computed:!1}},value:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The controlled value of the slider
@default [0]`},min:{required:!1,tsType:{name:"number"},description:`Minimum value of the slider
@default 0`},max:{required:!1,tsType:{name:"number"},description:`Maximum value of the slider
@default 100`},step:{required:!1,tsType:{name:"number"},description:`The granularity with which the slider can step through values
@default 1`},minStepsBetweenThumbs:{required:!1,tsType:{name:"number"},description:`The minimum steps between thumbs in a range slider
@default 0`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disable the slider
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},onCommit:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-slider'",computed:!1}}}};const Kt={component:E,tags:["autodocs"],parameters:{status:{type:"in_progress"}},argTypes:{defaultValue:{control:"object",description:"The default value of the slider, used for uncontrolled components.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},value:{control:"object",description:"The controlled value of the slider.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},min:{control:"number",description:"Minimum value of the slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},max:{control:"number",description:"Maximum value of the slider.",defaultValue:100,table:{type:{summary:"number"},defaultValue:{summary:"100"}}},step:{control:"number",description:"The granularity with which the slider can step through values.",defaultValue:1,table:{type:{summary:"number"},defaultValue:{summary:"1"}}},minStepsBetweenThumbs:{control:"number",description:"The minimum steps between thumbs in a range slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},disabled:{control:"boolean",description:"Disable the slider.",defaultValue:!1,table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onChange:{action:"onChange",description:"Function called when the value changes.",table:{type:{summary:"(value: number[]) => void"}}},onCommit:{action:"onCommit",description:"Function called when the value change is committed.",table:{type:{summary:"(value: number[]) => void"}}}},args:{min:0,max:100}},k={args:{name:"Simple slider"}},K={args:{disabled:!0,defaultValue:[50]}},N={args:{min:50,max:1e3}},H={args:{minStepsBetweenThumbs:25}},L={args:{step:25}},O={args:{defaultValue:[33,67]}},z={render:e=>{const[t,r]=c.useState([50]),n=c.useRef(!1);return u.jsx(E,{onChange:a=>{a[0]&&(a[0]>80&&!n.current&&(n.current=!0,alert("You're going a bit high there")),r(a))},value:t,...e})}},q={render:e=>{const[t,r]=c.useState([33,67]);return u.jsx(E,{onChange:n=>{if(!(!n[0]||!n[1])){if(n[1]-n[0]>80){alert("The range is too large");return}r(n)}},value:t,...e})}},F={decorators:e=>u.jsx("div",{style:{display:"flex",gap:16},children:u.jsx(e,{})}),render:()=>{const[e,t]=c.useState([250,450]),r=a=>{t(a)},n=a=>s=>{const o=parseInt(s.target.value,10);o>=200&&o<=500&&t(i=>{const d=[...i];return d[a]=o,d})};return u.jsxs(u.Fragment,{children:[u.jsx(Fe,{id:"new-slider-label",htmlFor:"new-slider",children:"Price range"}),u.jsx(E,{id:"new-slider","aria-labelledby":"new-slider-label",value:e,min:200,max:500,onChange:r}),e.map((a,s)=>u.jsx(Ue,{id:`new-slider-input-${s}`,value:a,type:"number","aria-label":`Price range ${s===0?"from":"to"}`,onChange:n(s)},s))]})}};var ne,re,ae;k.parameters={...k.parameters,docs:{...(ne=k.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    name: 'Simple slider'
  }
}`,...(ae=(re=k.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var oe,se,ie;K.parameters={...K.parameters,docs:{...(oe=K.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: [50]
  }
}`,...(ie=(se=K.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var le,ue,de;N.parameters={...N.parameters,docs:{...(le=N.parameters)==null?void 0:le.docs,source:{originalSource:`{
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
}`,...(he=(ge=L.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var be,Se,ve;O.parameters={...O.parameters,docs:{...(be=O.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    defaultValue: [33, 67]
  }
}`,...(ve=(Se=O.parameters)==null?void 0:Se.docs)==null?void 0:ve.source}}};var ye,xe,we;z.parameters={...z.parameters,docs:{...(ye=z.parameters)==null?void 0:ye.docs,source:{originalSource:`{
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
}`,...(we=(xe=z.parameters)==null?void 0:xe.docs)==null?void 0:we.source}}};var Re,Ce,Te;q.parameters={...q.parameters,docs:{...(Re=q.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(Te=(Ce=q.parameters)==null?void 0:Ce.docs)==null?void 0:Te.source}}};var Pe,Ve,_e;F.parameters={...F.parameters,docs:{...(Pe=F.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
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
}`,...(_e=(Ve=F.parameters)==null?void 0:Ve.docs)==null?void 0:_e.source}}};const Nt=["SimpleSlider","Disabled","MinimumAndMaximum","MinimumGap","StepSize","MultipleThumbsUncontrolled","ExternallyControlled","MultipleThumbsExternallyControlled","WithInputs"];export{K as Disabled,z as ExternallyControlled,N as MinimumAndMaximum,H as MinimumGap,q as MultipleThumbsExternallyControlled,O as MultipleThumbsUncontrolled,k as SimpleSlider,L as StepSize,F as WithInputs,Nt as __namedExportsOrder,Kt as default};
