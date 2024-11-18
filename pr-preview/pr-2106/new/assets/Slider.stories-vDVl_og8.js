import{j as u}from"./jsx-runtime-Nms4Y4qS.js";import{r as c}from"./index-BwDkhjyp.js";import{L as Ue}from"./Label-Dm6TJ1JV.js";import{T as $e}from"./TextInput-DcY5Xcnu.js";import{c as De}from"./index-BdQq_4o_.js";import{c as _}from"./index-DOnKqARA.js";import{u as A,P as U}from"./index-BtCsUTRM.js";import{c as We}from"./index-BSNoMcJN.js";import{u as Ye}from"./index-DGaPG0k3.js";import{u as Ge}from"./index-C8IlRUt1.js";import{u as Xe}from"./index-BgCrdp81.js";import{u as Je}from"./index-kUwV4muI.js";import{c as Qe}from"./index-B0lKOUy8.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./fondue-icons332-CM-LLheB.js";import"./index-CS4BWtGh.js";import"./index-BnOD_KYf.js";var Ee=["PageUp","PageDown"],Me=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],Ie={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},D="Slider",[X,Ze,et]=Qe(D),[je,Lt]=We(D,[et]),[tt,$]=je(D),Ae=c.forwardRef((e,t)=>{const{name:r,min:n=0,max:a=100,step:s=1,orientation:o="horizontal",disabled:i=!1,minStepsBetweenThumbs:d=0,defaultValue:p=[n],value:g,onValueChange:l=()=>{},onValueCommit:m=()=>{},inverted:v=!1,form:x,...S}=e,h=c.useRef(new Set),f=c.useRef(0),y=o==="horizontal"?nt:rt,[b=[],M]=Ye({prop:g,defaultProp:p,onChange:w=>{var P;(P=[...h.current][f.current])==null||P.focus(),l(w)}}),W=c.useRef(b);function Y(w){const R=lt(b,w);I(w,R)}function qe(w){I(w,f.current)}function Oe(){const w=W.current[f.current];b[f.current]!==w&&m(b)}function I(w,R,{commit:P}={commit:!1}){const ee=mt(s),G=pt(Math.round((w-n)/s)*s+n,ee),j=De(G,[n,a]);M((V=[])=>{const C=st(V,j,R);if(ct(C,d*s)){f.current=C.indexOf(j);const te=String(C)!==String(V);return te&&P&&m(C),te?C:V}else return V})}return u.jsx(tt,{scope:e.__scopeSlider,name:r,disabled:i,min:n,max:a,valueIndexToChangeRef:f,thumbs:h.current,values:b,orientation:o,form:x,children:u.jsx(X.Provider,{scope:e.__scopeSlider,children:u.jsx(X.Slot,{scope:e.__scopeSlider,children:u.jsx(y,{"aria-disabled":i,"data-disabled":i?"":void 0,...S,ref:t,onPointerDown:_(S.onPointerDown,()=>{i||(W.current=b)}),min:n,max:a,inverted:v,onSlideStart:i?void 0:Y,onSlideMove:i?void 0:qe,onSlideEnd:i?void 0:Oe,onHomeKeyDown:()=>!i&&I(n,0,{commit:!0}),onEndKeyDown:()=>!i&&I(a,b.length-1,{commit:!0}),onStepKeyDown:({event:w,direction:R})=>{if(!i){const G=Ee.includes(w.key)||w.shiftKey&&Me.includes(w.key)?10:1,j=f.current,V=b[j],C=s*G*R;I(V+C,j,{commit:!0})}}})})})})});Ae.displayName=D;var[Be,ke]=je(D,{startEdge:"left",endEdge:"right",size:"width",direction:1}),nt=c.forwardRef((e,t)=>{const{min:r,max:n,dir:a,inverted:s,onSlideStart:o,onSlideMove:i,onSlideEnd:d,onStepKeyDown:p,...g}=e,[l,m]=c.useState(null),v=A(t,y=>m(y)),x=c.useRef(),S=Ge(a),h=S==="ltr",f=h&&!s||!h&&s;function T(y){const b=x.current||l.getBoundingClientRect(),M=[0,b.width],Y=Z(M,f?[r,n]:[n,r]);return x.current=b,Y(y-b.left)}return u.jsx(Be,{scope:e.__scopeSlider,startEdge:f?"left":"right",endEdge:f?"right":"left",direction:f?1:-1,size:"width",children:u.jsx(Ke,{dir:S,"data-orientation":"horizontal",...g,ref:v,style:{...g.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:y=>{const b=T(y.clientX);o==null||o(b)},onSlideMove:y=>{const b=T(y.clientX);i==null||i(b)},onSlideEnd:()=>{x.current=void 0,d==null||d()},onStepKeyDown:y=>{const M=Ie[f?"from-left":"from-right"].includes(y.key);p==null||p({event:y,direction:M?-1:1})}})})}),rt=c.forwardRef((e,t)=>{const{min:r,max:n,inverted:a,onSlideStart:s,onSlideMove:o,onSlideEnd:i,onStepKeyDown:d,...p}=e,g=c.useRef(null),l=A(t,g),m=c.useRef(),v=!a;function x(S){const h=m.current||g.current.getBoundingClientRect(),f=[0,h.height],y=Z(f,v?[n,r]:[r,n]);return m.current=h,y(S-h.top)}return u.jsx(Be,{scope:e.__scopeSlider,startEdge:v?"bottom":"top",endEdge:v?"top":"bottom",size:"height",direction:v?1:-1,children:u.jsx(Ke,{"data-orientation":"vertical",...p,ref:l,style:{...p.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:S=>{const h=x(S.clientY);s==null||s(h)},onSlideMove:S=>{const h=x(S.clientY);o==null||o(h)},onSlideEnd:()=>{m.current=void 0,i==null||i()},onStepKeyDown:S=>{const f=Ie[v?"from-bottom":"from-top"].includes(S.key);d==null||d({event:S,direction:f?-1:1})}})})}),Ke=c.forwardRef((e,t)=>{const{__scopeSlider:r,onSlideStart:n,onSlideMove:a,onSlideEnd:s,onHomeKeyDown:o,onEndKeyDown:i,onStepKeyDown:d,...p}=e,g=$(D,r);return u.jsx(U.span,{...p,ref:t,onKeyDown:_(e.onKeyDown,l=>{l.key==="Home"?(o(l),l.preventDefault()):l.key==="End"?(i(l),l.preventDefault()):Ee.concat(Me).includes(l.key)&&(d(l),l.preventDefault())}),onPointerDown:_(e.onPointerDown,l=>{const m=l.target;m.setPointerCapture(l.pointerId),l.preventDefault(),g.thumbs.has(m)?m.focus():n(l)}),onPointerMove:_(e.onPointerMove,l=>{l.target.hasPointerCapture(l.pointerId)&&a(l)}),onPointerUp:_(e.onPointerUp,l=>{const m=l.target;m.hasPointerCapture(l.pointerId)&&(m.releasePointerCapture(l.pointerId),s(l))})})}),Ne="SliderTrack",Fe=c.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,a=$(Ne,r);return u.jsx(U.span,{"data-disabled":a.disabled?"":void 0,"data-orientation":a.orientation,...n,ref:t})});Fe.displayName=Ne;var J="SliderRange",He=c.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,a=$(J,r),s=ke(J,r),o=c.useRef(null),i=A(t,o),d=a.values.length,p=a.values.map(m=>ze(m,a.min,a.max)),g=d>1?Math.min(...p):0,l=100-Math.max(...p);return u.jsx(U.span,{"data-orientation":a.orientation,"data-disabled":a.disabled?"":void 0,...n,ref:i,style:{...e.style,[s.startEdge]:g+"%",[s.endEdge]:l+"%"}})});He.displayName=J;var Q="SliderThumb",Le=c.forwardRef((e,t)=>{const r=Ze(e.__scopeSlider),[n,a]=c.useState(null),s=A(t,i=>a(i)),o=c.useMemo(()=>n?r().findIndex(i=>i.ref.current===n):-1,[r,n]);return u.jsx(at,{...e,ref:s,index:o})}),at=c.forwardRef((e,t)=>{const{__scopeSlider:r,index:n,name:a,...s}=e,o=$(Q,r),i=ke(Q,r),[d,p]=c.useState(null),g=A(t,T=>p(T)),l=d?o.form||!!d.closest("form"):!0,m=Je(d),v=o.values[n],x=v===void 0?0:ze(v,o.min,o.max),S=it(n,o.values.length),h=m==null?void 0:m[i.size],f=h?ut(h,x,i.direction):0;return c.useEffect(()=>{if(d)return o.thumbs.add(d),()=>{o.thumbs.delete(d)}},[d,o.thumbs]),u.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[i.startEdge]:`calc(${x}% + ${f}px)`},children:[u.jsx(X.ItemSlot,{scope:e.__scopeSlider,children:u.jsx(U.span,{role:"slider","aria-label":e["aria-label"]||S,"aria-valuemin":o.min,"aria-valuenow":v,"aria-valuemax":o.max,"aria-orientation":o.orientation,"data-orientation":o.orientation,"data-disabled":o.disabled?"":void 0,tabIndex:o.disabled?void 0:0,...s,ref:g,style:v===void 0?{display:"none"}:e.style,onFocus:_(e.onFocus,()=>{o.valueIndexToChangeRef.current=n})})}),l&&u.jsx(ot,{name:a??(o.name?o.name+(o.values.length>1?"[]":""):void 0),form:o.form,value:v},n)]})});Le.displayName=Q;var ot=e=>{const{value:t,...r}=e,n=c.useRef(null),a=Xe(t);return c.useEffect(()=>{const s=n.current,o=window.HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(o,"value").set;if(a!==t&&d){const p=new Event("input",{bubbles:!0});d.call(s,t),s.dispatchEvent(p)}},[a,t]),u.jsx("input",{style:{display:"none"},...r,ref:n,defaultValue:t})};function st(e=[],t,r){const n=[...e];return n[r]=t,n.sort((a,s)=>a-s)}function ze(e,t,r){const s=100/(r-t)*(e-t);return De(s,[0,100])}function it(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function lt(e,t){if(e.length===1)return 0;const r=e.map(a=>Math.abs(a-t)),n=Math.min(...r);return r.indexOf(n)}function ut(e,t,r){const n=e/2,s=Z([0,50],[0,n]);return(n-s(t)*r)*r}function dt(e){return e.slice(0,-1).map((t,r)=>e[r+1]-t)}function ct(e,t){if(t>0){const r=dt(e);return Math.min(...r)>=t}return!0}function Z(e,t){return r=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const n=(t[1]-t[0])/(e[1]-e[0]);return t[0]+n*(r-e[0])}}function mt(e){return(String(e).split(".")[1]||"").length}function pt(e,t){const r=Math.pow(10,t);return Math.round(e*r)/r}var ft=Ae,gt=Fe,ht=He,bt=Le;const St="_root_oitg9_5",vt="_thumb_oitg9_17",yt="_track_oitg9_21",wt="_range_oitg9_28",B={root:St,thumb:vt,track:yt,range:wt},xt=({value:e,defaultValue:t=[0],onChange:r,onCommit:n,"data-test-id":a="fondue-slider",...s},o)=>{const i=c.useRef(null);return u.jsxs(ft,{ref:o,className:B.root,value:e,defaultValue:t,onValueChange:r,onValueCommit:n,"data-test-id":a,...s,children:[u.jsx(gt,{onPointerDown:()=>{i.current&&(i.current.dataset.showFocusRing="false")},className:B.track,children:u.jsx(ht,{className:B.range})}),(e||t).map((d,p)=>u.jsx(bt,{ref:i,className:B.thumb,onPointerDown:g=>{g.currentTarget.dataset.showFocusRing="false"},onBlur:g=>{g.currentTarget.dataset.showFocusRing="true"}},p))]})},E=c.forwardRef(xt);E.displayName="Slider";E.__docgenInfo={description:"",methods:[],displayName:"Slider",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The default value of the slider
Used for uncontrolled components
@default [0]`,defaultValue:{value:"[0]",computed:!1}},value:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The controlled value of the slider
@default [0]`},min:{required:!1,tsType:{name:"number"},description:`Minimum value of the slider
@default 0`},max:{required:!1,tsType:{name:"number"},description:`Maximum value of the slider
@default 100`},step:{required:!1,tsType:{name:"number"},description:`The granularity with which the slider can step through values
@default 1`},minStepsBetweenThumbs:{required:!1,tsType:{name:"number"},description:`The minimum steps between thumbs in a range slider
@default 0`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disable the slider
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},onCommit:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-slider'",computed:!1}}}};const zt={component:E,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{defaultValue:{control:"object",description:"The default value of the slider, used for uncontrolled components.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},value:{control:"object",description:"The controlled value of the slider.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},min:{control:"number",description:"Minimum value of the slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},max:{control:"number",description:"Maximum value of the slider.",defaultValue:100,table:{type:{summary:"number"},defaultValue:{summary:"100"}}},step:{control:"number",description:"The granularity with which the slider can step through values.",defaultValue:1,table:{type:{summary:"number"},defaultValue:{summary:"1"}}},minStepsBetweenThumbs:{control:"number",description:"The minimum steps between thumbs in a range slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},disabled:{control:"boolean",description:"Disable the slider.",defaultValue:!1,table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onChange:{action:"onChange",description:"Function called when the value changes.",table:{type:{summary:"(value: number[]) => void"}}},onCommit:{action:"onCommit",description:"Function called when the value change is committed.",table:{type:{summary:"(value: number[]) => void"}}}},args:{min:0,max:100}},k={args:{name:"Simple slider"}},K={args:{disabled:!0,defaultValue:[50]}},N={args:{min:50,max:1e3}},F={args:{minStepsBetweenThumbs:25}},H={args:{step:25}},L={args:{defaultValue:[33,67]}},z={render:e=>{const[t,r]=c.useState([50]),n=c.useRef(!1);return u.jsx(E,{onChange:a=>{a[0]&&(a[0]>80&&!n.current&&(n.current=!0,alert("You're going a bit high there")),r(a))},value:t,...e})}},q={render:e=>{const[t,r]=c.useState([33,67]);return u.jsx(E,{onChange:n=>{if(!(!n[0]||!n[1])){if(n[1]-n[0]>80){alert("The range is too large");return}r(n)}},value:t,...e})}},O={decorators:e=>u.jsx("div",{style:{display:"flex",gap:16},children:u.jsx(e,{})}),render:()=>{const[e,t]=c.useState([250,450]),r=a=>{t(a)},n=a=>s=>{const o=parseInt(s.target.value,10);o>=200&&o<=500&&t(i=>{const d=[...i];return d[a]=o,d})};return u.jsxs(u.Fragment,{children:[u.jsx(Ue,{id:"new-slider-label",htmlFor:"new-slider",children:"Price range"}),u.jsx(E,{id:"new-slider","aria-labelledby":"new-slider-label",value:e,min:200,max:500,onChange:r}),e.map((a,s)=>u.jsx($e,{id:`new-slider-input-${s}`,value:a,type:"number","aria-label":`Price range ${s===0?"from":"to"}`,onChange:n(s)},s))]})}};var ne,re,ae;k.parameters={...k.parameters,docs:{...(ne=k.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(de=(ue=N.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};var ce,me,pe;F.parameters={...F.parameters,docs:{...(ce=F.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    minStepsBetweenThumbs: 25
  }
}`,...(pe=(me=F.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var fe,ge,he;H.parameters={...H.parameters,docs:{...(fe=H.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    step: 25
  }
}`,...(he=(ge=H.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var be,Se,ve;L.parameters={...L.parameters,docs:{...(be=L.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    defaultValue: [33, 67]
  }
}`,...(ve=(Se=L.parameters)==null?void 0:Se.docs)==null?void 0:ve.source}}};var ye,we,xe;z.parameters={...z.parameters,docs:{...(ye=z.parameters)==null?void 0:ye.docs,source:{originalSource:`{
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
}`,...(xe=(we=z.parameters)==null?void 0:we.docs)==null?void 0:xe.source}}};var Re,Ce,Te;q.parameters={...q.parameters,docs:{...(Re=q.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(_e=(Ve=O.parameters)==null?void 0:Ve.docs)==null?void 0:_e.source}}};const qt=["SimpleSlider","Disabled","MinimumAndMaximum","MinimumGap","StepSize","MultipleThumbsUncontrolled","ExternallyControlled","MultipleThumbsExternallyControlled","WithInputs"];export{K as Disabled,z as ExternallyControlled,N as MinimumAndMaximum,F as MinimumGap,q as MultipleThumbsExternallyControlled,L as MultipleThumbsUncontrolled,k as SimpleSlider,H as StepSize,O as WithInputs,qt as __namedExportsOrder,zt as default};
