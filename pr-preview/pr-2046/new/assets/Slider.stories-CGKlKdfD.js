import{j as u}from"./jsx-runtime-Nms4Y4qS.js";import{r as d}from"./index-BwDkhjyp.js";import{L as Oe}from"./Label-DGO3QOB6.js";import{T as Ue}from"./TextInput-DrsOQVhD.js";import{c as De}from"./index-BdQq_4o_.js";import{c as D}from"./index-DOnKqARA.js";import{u as A,P as U}from"./index-Brw_kfkv.js";import{c as $e}from"./index-BWD2N0gV.js";import{u as We}from"./index-DGaPG0k3.js";import{u as Ye}from"./index-C8IlRUt1.js";import{u as Ge}from"./index-BgCrdp81.js";import{u as Xe}from"./index-kUwV4muI.js";import{c as Je}from"./index-BCwfsm-V.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./fondue-icons324-_g5P3FDE.js";import"./index-DxjWwZXO.js";var Ee=["PageUp","PageDown"],Me=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],Ie={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},E="Slider",[G,Qe,Ze]=Je(E),[je,Nt]=$e(E,[Ze]),[et,$]=je(E),Ae=d.forwardRef((e,t)=>{const{name:r,min:n=0,max:a=100,step:s=1,orientation:o="horizontal",disabled:i=!1,minStepsBetweenThumbs:c=0,defaultValue:g=[n],value:h,onValueChange:l=()=>{},onValueCommit:m=()=>{},inverted:S=!1,...y}=e,b=d.useRef(new Set),p=d.useRef(0),R=o==="horizontal"?tt:nt,[f=[],w]=We({prop:h,defaultProp:g,onChange:v=>{var V;(V=[...b.current][p.current])==null||V.focus(),l(v)}}),P=d.useRef(f);function Z(v){const C=it(f,v);I(v,C)}function W(v){I(v,p.current)}function qe(){const v=P.current[p.current];f[p.current]!==v&&m(f)}function I(v,C,{commit:V}={commit:!1}){const ee=dt(s),Y=mt(Math.round((v-n)/s)*s+n,ee),j=De(Y,[n,a]);w((_=[])=>{const T=ot(_,j,C);if(ct(T,c*s)){p.current=T.indexOf(j);const te=String(T)!==String(_);return te&&V&&m(T),te?T:_}else return _})}return u.jsx(et,{scope:e.__scopeSlider,name:r,disabled:i,min:n,max:a,valueIndexToChangeRef:p,thumbs:b.current,values:f,orientation:o,children:u.jsx(G.Provider,{scope:e.__scopeSlider,children:u.jsx(G.Slot,{scope:e.__scopeSlider,children:u.jsx(R,{"aria-disabled":i,"data-disabled":i?"":void 0,...y,ref:t,onPointerDown:D(y.onPointerDown,()=>{i||(P.current=f)}),min:n,max:a,inverted:S,onSlideStart:i?void 0:Z,onSlideMove:i?void 0:W,onSlideEnd:i?void 0:qe,onHomeKeyDown:()=>!i&&I(n,0,{commit:!0}),onEndKeyDown:()=>!i&&I(a,f.length-1,{commit:!0}),onStepKeyDown:({event:v,direction:C})=>{if(!i){const Y=Ee.includes(v.key)||v.shiftKey&&Me.includes(v.key)?10:1,j=p.current,_=f[j],T=s*Y*C;I(_+T,j,{commit:!0})}}})})})})});Ae.displayName=E;var[Be,ke]=je(E,{startEdge:"left",endEdge:"right",size:"width",direction:1}),tt=d.forwardRef((e,t)=>{const{min:r,max:n,dir:a,inverted:s,onSlideStart:o,onSlideMove:i,onSlideEnd:c,onStepKeyDown:g,...h}=e,[l,m]=d.useState(null),S=A(t,f=>m(f)),y=d.useRef(),b=Ye(a),p=b==="ltr",x=p&&!s||!p&&s;function R(f){const w=y.current||l.getBoundingClientRect(),P=[0,w.width],W=Q(P,x?[r,n]:[n,r]);return y.current=w,W(f-w.left)}return u.jsx(Be,{scope:e.__scopeSlider,startEdge:x?"left":"right",endEdge:x?"right":"left",direction:x?1:-1,size:"width",children:u.jsx(Ke,{dir:b,"data-orientation":"horizontal",...h,ref:S,style:{...h.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:f=>{const w=R(f.clientX);o==null||o(w)},onSlideMove:f=>{const w=R(f.clientX);i==null||i(w)},onSlideEnd:()=>{y.current=void 0,c==null||c()},onStepKeyDown:f=>{const P=Ie[x?"from-left":"from-right"].includes(f.key);g==null||g({event:f,direction:P?-1:1})}})})}),nt=d.forwardRef((e,t)=>{const{min:r,max:n,inverted:a,onSlideStart:s,onSlideMove:o,onSlideEnd:i,onStepKeyDown:c,...g}=e,h=d.useRef(null),l=A(t,h),m=d.useRef(),S=!a;function y(b){const p=m.current||h.current.getBoundingClientRect(),x=[0,p.height],f=Q(x,S?[n,r]:[r,n]);return m.current=p,f(b-p.top)}return u.jsx(Be,{scope:e.__scopeSlider,startEdge:S?"bottom":"top",endEdge:S?"top":"bottom",size:"height",direction:S?1:-1,children:u.jsx(Ke,{"data-orientation":"vertical",...g,ref:l,style:{...g.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:b=>{const p=y(b.clientY);s==null||s(p)},onSlideMove:b=>{const p=y(b.clientY);o==null||o(p)},onSlideEnd:()=>{m.current=void 0,i==null||i()},onStepKeyDown:b=>{const x=Ie[S?"from-bottom":"from-top"].includes(b.key);c==null||c({event:b,direction:x?-1:1})}})})}),Ke=d.forwardRef((e,t)=>{const{__scopeSlider:r,onSlideStart:n,onSlideMove:a,onSlideEnd:s,onHomeKeyDown:o,onEndKeyDown:i,onStepKeyDown:c,...g}=e,h=$(E,r);return u.jsx(U.span,{...g,ref:t,onKeyDown:D(e.onKeyDown,l=>{l.key==="Home"?(o(l),l.preventDefault()):l.key==="End"?(i(l),l.preventDefault()):Ee.concat(Me).includes(l.key)&&(c(l),l.preventDefault())}),onPointerDown:D(e.onPointerDown,l=>{const m=l.target;m.setPointerCapture(l.pointerId),l.preventDefault(),h.thumbs.has(m)?m.focus():n(l)}),onPointerMove:D(e.onPointerMove,l=>{l.target.hasPointerCapture(l.pointerId)&&a(l)}),onPointerUp:D(e.onPointerUp,l=>{const m=l.target;m.hasPointerCapture(l.pointerId)&&(m.releasePointerCapture(l.pointerId),s(l))})})}),ze="SliderTrack",Ne=d.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,a=$(ze,r);return u.jsx(U.span,{"data-disabled":a.disabled?"":void 0,"data-orientation":a.orientation,...n,ref:t})});Ne.displayName=ze;var X="SliderRange",Fe=d.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,a=$(X,r),s=ke(X,r),o=d.useRef(null),i=A(t,o),c=a.values.length,g=a.values.map(m=>Le(m,a.min,a.max)),h=c>1?Math.min(...g):0,l=100-Math.max(...g);return u.jsx(U.span,{"data-orientation":a.orientation,"data-disabled":a.disabled?"":void 0,...n,ref:i,style:{...e.style,[s.startEdge]:h+"%",[s.endEdge]:l+"%"}})});Fe.displayName=X;var J="SliderThumb",He=d.forwardRef((e,t)=>{const r=Qe(e.__scopeSlider),[n,a]=d.useState(null),s=A(t,i=>a(i)),o=d.useMemo(()=>n?r().findIndex(i=>i.ref.current===n):-1,[r,n]);return u.jsx(rt,{...e,ref:s,index:o})}),rt=d.forwardRef((e,t)=>{const{__scopeSlider:r,index:n,name:a,...s}=e,o=$(J,r),i=ke(J,r),[c,g]=d.useState(null),h=A(t,R=>g(R)),l=c?!!c.closest("form"):!0,m=Xe(c),S=o.values[n],y=S===void 0?0:Le(S,o.min,o.max),b=st(n,o.values.length),p=m==null?void 0:m[i.size],x=p?lt(p,y,i.direction):0;return d.useEffect(()=>{if(c)return o.thumbs.add(c),()=>{o.thumbs.delete(c)}},[c,o.thumbs]),u.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[i.startEdge]:`calc(${y}% + ${x}px)`},children:[u.jsx(G.ItemSlot,{scope:e.__scopeSlider,children:u.jsx(U.span,{role:"slider","aria-label":e["aria-label"]||b,"aria-valuemin":o.min,"aria-valuenow":S,"aria-valuemax":o.max,"aria-orientation":o.orientation,"data-orientation":o.orientation,"data-disabled":o.disabled?"":void 0,tabIndex:o.disabled?void 0:0,...s,ref:h,style:S===void 0?{display:"none"}:e.style,onFocus:D(e.onFocus,()=>{o.valueIndexToChangeRef.current=n})})}),l&&u.jsx(at,{name:a??(o.name?o.name+(o.values.length>1?"[]":""):void 0),value:S},n)]})});He.displayName=J;var at=e=>{const{value:t,...r}=e,n=d.useRef(null),a=Ge(t);return d.useEffect(()=>{const s=n.current,o=window.HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(o,"value").set;if(a!==t&&c){const g=new Event("input",{bubbles:!0});c.call(s,t),s.dispatchEvent(g)}},[a,t]),u.jsx("input",{style:{display:"none"},...r,ref:n,defaultValue:t})};function ot(e=[],t,r){const n=[...e];return n[r]=t,n.sort((a,s)=>a-s)}function Le(e,t,r){const s=100/(r-t)*(e-t);return De(s,[0,100])}function st(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function it(e,t){if(e.length===1)return 0;const r=e.map(a=>Math.abs(a-t)),n=Math.min(...r);return r.indexOf(n)}function lt(e,t,r){const n=e/2,s=Q([0,50],[0,n]);return(n-s(t)*r)*r}function ut(e){return e.slice(0,-1).map((t,r)=>e[r+1]-t)}function ct(e,t){if(t>0){const r=ut(e);return Math.min(...r)>=t}return!0}function Q(e,t){return r=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const n=(t[1]-t[0])/(e[1]-e[0]);return t[0]+n*(r-e[0])}}function dt(e){return(String(e).split(".")[1]||"").length}function mt(e,t){const r=Math.pow(10,t);return Math.round(e*r)/r}var pt=Ae,ft=Ne,gt=Fe,ht=He;const bt="_root_cpzhx_5",St="_thumb_cpzhx_16",vt="_track_cpzhx_20",yt="_range_cpzhx_27",B={root:bt,thumb:St,track:vt,range:yt},xt=({value:e,defaultValue:t=[0],onChange:r,onCommit:n,"data-test-id":a="fondue-slider",...s},o)=>{const i=d.useRef(null);return u.jsxs(pt,{ref:o,className:B.root,value:e,defaultValue:t,onValueChange:r,onValueCommit:n,"data-test-id":a,...s,children:[u.jsx(ft,{onPointerDown:()=>{i.current&&(i.current.dataset.showFocusRing="false")},className:B.track,children:u.jsx(gt,{className:B.range})}),(e||t).map((c,g)=>u.jsx(ht,{ref:i,className:B.thumb,onPointerDown:h=>{h.currentTarget.dataset.showFocusRing="false"},onBlur:h=>{h.currentTarget.dataset.showFocusRing="true"}},g))]})},M=d.forwardRef(xt);M.displayName="Slider";M.__docgenInfo={description:"",methods:[],displayName:"Slider",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The default value of the slider
Used for uncontrolled components
@default [0]`,defaultValue:{value:"[0]",computed:!1}},value:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The controlled value of the slider
@default [0]`},min:{required:!1,tsType:{name:"number"},description:`Minimum value of the slider
@default 0`},max:{required:!1,tsType:{name:"number"},description:`Maximum value of the slider
@default 100`},step:{required:!1,tsType:{name:"number"},description:`The granularity with which the slider can step through values
@default 1`},minStepsBetweenThumbs:{required:!1,tsType:{name:"number"},description:`The minimum steps between thumbs in a range slider
@default 0`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disable the slider
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},onCommit:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-slider'",computed:!1}}}};const Ft={component:M,tags:["autodocs"],parameters:{status:{type:"in_progress"}},argTypes:{defaultValue:{control:"object",description:"The default value of the slider, used for uncontrolled components.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},value:{control:"object",description:"The controlled value of the slider.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},min:{control:"number",description:"Minimum value of the slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},max:{control:"number",description:"Maximum value of the slider.",defaultValue:100,table:{type:{summary:"number"},defaultValue:{summary:"100"}}},step:{control:"number",description:"The granularity with which the slider can step through values.",defaultValue:1,table:{type:{summary:"number"},defaultValue:{summary:"1"}}},minStepsBetweenThumbs:{control:"number",description:"The minimum steps between thumbs in a range slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},disabled:{control:"boolean",description:"Disable the slider.",defaultValue:!1,table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onChange:{action:"onChange",description:"Function called when the value changes.",table:{type:{summary:"(value: number[]) => void"}}},onCommit:{action:"onCommit",description:"Function called when the value change is committed.",table:{type:{summary:"(value: number[]) => void"}}}},args:{min:0,max:100}},k={args:{name:"Simple slider"}},K={args:{disabled:!0,defaultValue:[50]}},z={args:{min:50,max:1e3}},N={args:{minStepsBetweenThumbs:25}},F={args:{step:25}},H={args:{defaultValue:[33,67]}},L={render:e=>{const[t,r]=d.useState([50]),n=d.useRef(!1);return u.jsx(M,{onChange:a=>{a[0]&&(a[0]>80&&!n.current&&(n.current=!0,alert("You're going a bit high there")),r(a))},value:t,...e})}},q={render:e=>{const[t,r]=d.useState([33,67]);return u.jsx(M,{onChange:n=>{if(!(!n[0]||!n[1])){if(n[1]-n[0]>80){alert("The range is too large");return}r(n)}},value:t,...e})}},O={decorators:e=>u.jsx("div",{style:{display:"flex",gap:16},children:u.jsx(e,{})}),render:()=>{const[e,t]=d.useState([250,450]),r=a=>{t(a)},n=a=>s=>{const o=parseInt(s.target.value,10);o>=200&&o<=500&&t(i=>{const c=[...i];return c[a]=o,c})};return u.jsxs(u.Fragment,{children:[u.jsx(Oe,{id:"new-slider-label",htmlFor:"new-slider",children:"Price range"}),u.jsx(M,{id:"new-slider","aria-labelledby":"new-slider-label",value:e,min:200,max:500,onChange:r}),e.map((a,s)=>u.jsx(Ue,{id:`new-slider-input-${s}`,value:a,type:"number","aria-label":`Price range ${s===0?"from":"to"}`,onChange:n(s)},s))]})}};var ne,re,ae;k.parameters={...k.parameters,docs:{...(ne=k.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    name: 'Simple slider'
  }
}`,...(ae=(re=k.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var oe,se,ie;K.parameters={...K.parameters,docs:{...(oe=K.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: [50]
  }
}`,...(ie=(se=K.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var le,ue,ce;z.parameters={...z.parameters,docs:{...(le=z.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    min: 50,
    max: 1000
  }
}`,...(ce=(ue=z.parameters)==null?void 0:ue.docs)==null?void 0:ce.source}}};var de,me,pe;N.parameters={...N.parameters,docs:{...(de=N.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    minStepsBetweenThumbs: 25
  }
}`,...(pe=(me=N.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var fe,ge,he;F.parameters={...F.parameters,docs:{...(fe=F.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    step: 25
  }
}`,...(he=(ge=F.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var be,Se,ve;H.parameters={...H.parameters,docs:{...(be=H.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    defaultValue: [33, 67]
  }
}`,...(ve=(Se=H.parameters)==null?void 0:Se.docs)==null?void 0:ve.source}}};var ye,xe,we;L.parameters={...L.parameters,docs:{...(ye=L.parameters)==null?void 0:ye.docs,source:{originalSource:`{
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
}`,...(we=(xe=L.parameters)==null?void 0:xe.docs)==null?void 0:we.source}}};var Re,Ce,Te;q.parameters={...q.parameters,docs:{...(Re=q.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(Te=(Ce=q.parameters)==null?void 0:Ce.docs)==null?void 0:Te.source}}};var Pe,Ve,_e;O.parameters={...O.parameters,docs:{...(Pe=O.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
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
}`,...(_e=(Ve=O.parameters)==null?void 0:Ve.docs)==null?void 0:_e.source}}};const Ht=["SimpleSlider","Disabled","MinimumAndMaximum","MinimumGap","StepSize","MultipleThumbsUncontrolled","ExternallyControlled","MultipleThumbsExternallyControlled","WithInputs"];export{K as Disabled,L as ExternallyControlled,z as MinimumAndMaximum,N as MinimumGap,q as MultipleThumbsExternallyControlled,H as MultipleThumbsUncontrolled,k as SimpleSlider,F as StepSize,O as WithInputs,Ht as __namedExportsOrder,Ft as default};
