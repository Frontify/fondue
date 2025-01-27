import{j as u}from"./jsx-runtime-BSxFkHFN.js";import{r as c}from"./index-i66itsuO.js";import{L as Ue}from"./Label-CuL99xi1.js";import{T as $e}from"./TextInput-DbqIn8ri.js";import{c as De}from"./index-BdQq_4o_.js";import{c as _}from"./index-BNYVQE02.js";import{u as A,P as U}from"./index-C7Xses_O.js";import{c as We}from"./index-BwxsjnLo.js";import{u as Ye}from"./index-P4w4wmP2.js";import{u as Ge}from"./index-DLXHbKnz.js";import{u as Xe}from"./index-Dh_oXSn4.js";import{u as Je}from"./index-BVL3yOfb.js";import{c as Qe}from"./index-Cao5XaZ_.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./styleUtilities-rhQWLmVU.js";import"./fondue-icons348-COpsOkcC.js";import"./index-BQPO3JLn.js";var Ee=["PageUp","PageDown"],Me=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],je={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},D="Slider",[X,Ze,en]=Qe(D),[Ie,Hn]=We(D,[en]),[nn,$]=Ie(D),Ae=c.forwardRef((e,n)=>{const{name:r,min:t=0,max:a=100,step:o=1,orientation:s="horizontal",disabled:i=!1,minStepsBetweenThumbs:d=0,defaultValue:f=[t],value:g,onValueChange:l=()=>{},onValueCommit:m=()=>{},inverted:y=!1,form:x,...S}=e,h=c.useRef(new Set),p=c.useRef(0),v=s==="horizontal"?tn:rn,[b=[],M]=Ye({prop:g,defaultProp:f,onChange:w=>{var P;(P=[...h.current][p.current])==null||P.focus(),l(w)}}),W=c.useRef(b);function Y(w){const R=un(b,w);j(w,R)}function qe(w){j(w,p.current)}function Oe(){const w=W.current[p.current];b[p.current]!==w&&m(b)}function j(w,R,{commit:P}={commit:!1}){const ee=fn(o),G=pn(Math.round((w-t)/o)*o+t,ee),I=De(G,[t,a]);M((V=[])=>{const C=on(V,I,R);if(mn(C,d*o)){p.current=C.indexOf(I);const ne=String(C)!==String(V);return ne&&P&&m(C),ne?C:V}else return V})}return u.jsx(nn,{scope:e.__scopeSlider,name:r,disabled:i,min:t,max:a,valueIndexToChangeRef:p,thumbs:h.current,values:b,orientation:s,form:x,children:u.jsx(X.Provider,{scope:e.__scopeSlider,children:u.jsx(X.Slot,{scope:e.__scopeSlider,children:u.jsx(v,{"aria-disabled":i,"data-disabled":i?"":void 0,...S,ref:n,onPointerDown:_(S.onPointerDown,()=>{i||(W.current=b)}),min:t,max:a,inverted:y,onSlideStart:i?void 0:Y,onSlideMove:i?void 0:qe,onSlideEnd:i?void 0:Oe,onHomeKeyDown:()=>!i&&j(t,0,{commit:!0}),onEndKeyDown:()=>!i&&j(a,b.length-1,{commit:!0}),onStepKeyDown:({event:w,direction:R})=>{if(!i){const G=Ee.includes(w.key)||w.shiftKey&&Me.includes(w.key)?10:1,I=p.current,V=b[I],C=o*G*R;j(V+C,I,{commit:!0})}}})})})})});Ae.displayName=D;var[Be,ke]=Ie(D,{startEdge:"left",endEdge:"right",size:"width",direction:1}),tn=c.forwardRef((e,n)=>{const{min:r,max:t,dir:a,inverted:o,onSlideStart:s,onSlideMove:i,onSlideEnd:d,onStepKeyDown:f,...g}=e,[l,m]=c.useState(null),y=A(n,v=>m(v)),x=c.useRef(void 0),S=Ge(a),h=S==="ltr",p=h&&!o||!h&&o;function T(v){const b=x.current||l.getBoundingClientRect(),M=[0,b.width],Y=Z(M,p?[r,t]:[t,r]);return x.current=b,Y(v-b.left)}return u.jsx(Be,{scope:e.__scopeSlider,startEdge:p?"left":"right",endEdge:p?"right":"left",direction:p?1:-1,size:"width",children:u.jsx(Ke,{dir:S,"data-orientation":"horizontal",...g,ref:y,style:{...g.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:v=>{const b=T(v.clientX);s==null||s(b)},onSlideMove:v=>{const b=T(v.clientX);i==null||i(b)},onSlideEnd:()=>{x.current=void 0,d==null||d()},onStepKeyDown:v=>{const M=je[p?"from-left":"from-right"].includes(v.key);f==null||f({event:v,direction:M?-1:1})}})})}),rn=c.forwardRef((e,n)=>{const{min:r,max:t,inverted:a,onSlideStart:o,onSlideMove:s,onSlideEnd:i,onStepKeyDown:d,...f}=e,g=c.useRef(null),l=A(n,g),m=c.useRef(void 0),y=!a;function x(S){const h=m.current||g.current.getBoundingClientRect(),p=[0,h.height],v=Z(p,y?[t,r]:[r,t]);return m.current=h,v(S-h.top)}return u.jsx(Be,{scope:e.__scopeSlider,startEdge:y?"bottom":"top",endEdge:y?"top":"bottom",size:"height",direction:y?1:-1,children:u.jsx(Ke,{"data-orientation":"vertical",...f,ref:l,style:{...f.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:S=>{const h=x(S.clientY);o==null||o(h)},onSlideMove:S=>{const h=x(S.clientY);s==null||s(h)},onSlideEnd:()=>{m.current=void 0,i==null||i()},onStepKeyDown:S=>{const p=je[y?"from-bottom":"from-top"].includes(S.key);d==null||d({event:S,direction:p?-1:1})}})})}),Ke=c.forwardRef((e,n)=>{const{__scopeSlider:r,onSlideStart:t,onSlideMove:a,onSlideEnd:o,onHomeKeyDown:s,onEndKeyDown:i,onStepKeyDown:d,...f}=e,g=$(D,r);return u.jsx(U.span,{...f,ref:n,onKeyDown:_(e.onKeyDown,l=>{l.key==="Home"?(s(l),l.preventDefault()):l.key==="End"?(i(l),l.preventDefault()):Ee.concat(Me).includes(l.key)&&(d(l),l.preventDefault())}),onPointerDown:_(e.onPointerDown,l=>{const m=l.target;m.setPointerCapture(l.pointerId),l.preventDefault(),g.thumbs.has(m)?m.focus():t(l)}),onPointerMove:_(e.onPointerMove,l=>{l.target.hasPointerCapture(l.pointerId)&&a(l)}),onPointerUp:_(e.onPointerUp,l=>{const m=l.target;m.hasPointerCapture(l.pointerId)&&(m.releasePointerCapture(l.pointerId),o(l))})})}),ze="SliderTrack",Ne=c.forwardRef((e,n)=>{const{__scopeSlider:r,...t}=e,a=$(ze,r);return u.jsx(U.span,{"data-disabled":a.disabled?"":void 0,"data-orientation":a.orientation,...t,ref:n})});Ne.displayName=ze;var J="SliderRange",Fe=c.forwardRef((e,n)=>{const{__scopeSlider:r,...t}=e,a=$(J,r),o=ke(J,r),s=c.useRef(null),i=A(n,s),d=a.values.length,f=a.values.map(m=>Le(m,a.min,a.max)),g=d>1?Math.min(...f):0,l=100-Math.max(...f);return u.jsx(U.span,{"data-orientation":a.orientation,"data-disabled":a.disabled?"":void 0,...t,ref:i,style:{...e.style,[o.startEdge]:g+"%",[o.endEdge]:l+"%"}})});Fe.displayName=J;var Q="SliderThumb",He=c.forwardRef((e,n)=>{const r=Ze(e.__scopeSlider),[t,a]=c.useState(null),o=A(n,i=>a(i)),s=c.useMemo(()=>t?r().findIndex(i=>i.ref.current===t):-1,[r,t]);return u.jsx(an,{...e,ref:o,index:s})}),an=c.forwardRef((e,n)=>{const{__scopeSlider:r,index:t,name:a,...o}=e,s=$(Q,r),i=ke(Q,r),[d,f]=c.useState(null),g=A(n,T=>f(T)),l=d?s.form||!!d.closest("form"):!0,m=Je(d),y=s.values[t],x=y===void 0?0:Le(y,s.min,s.max),S=ln(t,s.values.length),h=m==null?void 0:m[i.size],p=h?dn(h,x,i.direction):0;return c.useEffect(()=>{if(d)return s.thumbs.add(d),()=>{s.thumbs.delete(d)}},[d,s.thumbs]),u.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[i.startEdge]:`calc(${x}% + ${p}px)`},children:[u.jsx(X.ItemSlot,{scope:e.__scopeSlider,children:u.jsx(U.span,{role:"slider","aria-label":e["aria-label"]||S,"aria-valuemin":s.min,"aria-valuenow":y,"aria-valuemax":s.max,"aria-orientation":s.orientation,"data-orientation":s.orientation,"data-disabled":s.disabled?"":void 0,tabIndex:s.disabled?void 0:0,...o,ref:g,style:y===void 0?{display:"none"}:e.style,onFocus:_(e.onFocus,()=>{s.valueIndexToChangeRef.current=t})})}),l&&u.jsx(sn,{name:a??(s.name?s.name+(s.values.length>1?"[]":""):void 0),form:s.form,value:y},t)]})});He.displayName=Q;var sn=e=>{const{value:n,...r}=e,t=c.useRef(null),a=Xe(n);return c.useEffect(()=>{const o=t.current,s=window.HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(s,"value").set;if(a!==n&&d){const f=new Event("input",{bubbles:!0});d.call(o,n),o.dispatchEvent(f)}},[a,n]),u.jsx("input",{style:{display:"none"},...r,ref:t,defaultValue:n})};function on(e=[],n,r){const t=[...e];return t[r]=n,t.sort((a,o)=>a-o)}function Le(e,n,r){const o=100/(r-n)*(e-n);return De(o,[0,100])}function ln(e,n){return n>2?`Value ${e+1} of ${n}`:n===2?["Minimum","Maximum"][e]:void 0}function un(e,n){if(e.length===1)return 0;const r=e.map(a=>Math.abs(a-n)),t=Math.min(...r);return r.indexOf(t)}function dn(e,n,r){const t=e/2,o=Z([0,50],[0,t]);return(t-o(n)*r)*r}function cn(e){return e.slice(0,-1).map((n,r)=>e[r+1]-n)}function mn(e,n){if(n>0){const r=cn(e);return Math.min(...r)>=n}return!0}function Z(e,n){return r=>{if(e[0]===e[1]||n[0]===n[1])return n[0];const t=(n[1]-n[0])/(e[1]-e[0]);return n[0]+t*(r-e[0])}}function fn(e){return(String(e).split(".")[1]||"").length}function pn(e,n){const r=Math.pow(10,n);return Math.round(e*r)/r}var gn=Ae,hn=Ne,bn=Fe,Sn=He;const yn="_root_fs3zj_5",vn="_thumb_fs3zj_17",wn="_track_fs3zj_21",xn="_range_fs3zj_28",B={root:yn,thumb:vn,track:wn,range:xn},Rn=({value:e,defaultValue:n=[0],onChange:r,onCommit:t,"data-test-id":a="fondue-slider",...o},s)=>{const i=c.useRef(null);return u.jsxs(gn,{ref:s,className:B.root,value:e,defaultValue:n,onValueChange:r,onValueCommit:t,"data-test-id":a,...o,children:[u.jsx(hn,{onPointerDown:()=>{i.current&&(i.current.dataset.showFocusRing="false")},className:B.track,children:u.jsx(bn,{className:B.range})}),(e||n).map((d,f)=>u.jsx(Sn,{ref:i,className:B.thumb,onPointerDown:g=>{g.currentTarget.dataset.showFocusRing="false"},onBlur:g=>{g.currentTarget.dataset.showFocusRing="true"}},f))]})},E=c.forwardRef(Rn);E.displayName="Slider";E.__docgenInfo={description:"",methods:[],displayName:"Slider",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The default value of the slider
Used for uncontrolled components
@default [0]`,defaultValue:{value:"[0]",computed:!1}},value:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:`The controlled value of the slider
@default [0]`},min:{required:!1,tsType:{name:"number"},description:`Minimum value of the slider
@default 0`},max:{required:!1,tsType:{name:"number"},description:`Maximum value of the slider
@default 100`},step:{required:!1,tsType:{name:"number"},description:`The granularity with which the slider can step through values
@default 1`},minStepsBetweenThumbs:{required:!1,tsType:{name:"number"},description:`The minimum steps between thumbs in a range slider
@default 0`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disable the slider
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},onCommit:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"value"}],return:{name:"void"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-slider'",computed:!1}}}};const Ln={component:E,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{defaultValue:{control:"object",description:"The default value of the slider, used for uncontrolled components.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},value:{control:"object",description:"The controlled value of the slider.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},min:{control:"number",description:"Minimum value of the slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},max:{control:"number",description:"Maximum value of the slider.",defaultValue:100,table:{type:{summary:"number"},defaultValue:{summary:"100"}}},step:{control:"number",description:"The granularity with which the slider can step through values.",defaultValue:1,table:{type:{summary:"number"},defaultValue:{summary:"1"}}},minStepsBetweenThumbs:{control:"number",description:"The minimum steps between thumbs in a range slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},disabled:{control:"boolean",description:"Disable the slider.",defaultValue:!1,table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onChange:{action:"onChange",description:"Function called when the value changes.",table:{type:{summary:"(value: number[]) => void"}}},onCommit:{action:"onCommit",description:"Function called when the value change is committed.",table:{type:{summary:"(value: number[]) => void"}}}},args:{min:0,max:100}},k={args:{name:"Simple slider"}},K={args:{disabled:!0,defaultValue:[50]}},z={args:{min:50,max:1e3}},N={args:{minStepsBetweenThumbs:25}},F={args:{step:25}},H={args:{defaultValue:[33,67]}},L={render:e=>{const[n,r]=c.useState([50]),t=c.useRef(!1);return u.jsx(E,{onChange:a=>{a[0]&&(a[0]>80&&!t.current&&(t.current=!0,alert("You're going a bit high there")),r(a))},value:n,...e})}},q={render:e=>{const[n,r]=c.useState([33,67]);return u.jsx(E,{onChange:t=>{if(!(!t[0]||!t[1])){if(t[1]-t[0]>80){alert("The range is too large");return}r(t)}},value:n,...e})}},O={decorators:e=>u.jsx("div",{style:{display:"flex",gap:16},children:u.jsx(e,{})}),render:()=>{const[e,n]=c.useState([250,450]),r=a=>{n(a)},t=a=>o=>{const s=parseInt(o.target.value,10);s>=200&&s<=500&&n(i=>{const d=[...i];return d[a]=s,d})};return u.jsxs(u.Fragment,{children:[u.jsx(Ue,{id:"new-slider-label",htmlFor:"new-slider",children:"Price range"}),u.jsx(E,{id:"new-slider","aria-labelledby":"new-slider-label",value:e,min:200,max:500,onChange:r}),e.map((a,o)=>u.jsx($e,{id:`new-slider-input-${o}`,value:a,type:"number","aria-label":`Price range ${o===0?"from":"to"}`,onChange:t(o)},o))]})}};var te,re,ae;k.parameters={...k.parameters,docs:{...(te=k.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    name: 'Simple slider'
  }
}`,...(ae=(re=k.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,oe,ie;K.parameters={...K.parameters,docs:{...(se=K.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: [50]
  }
}`,...(ie=(oe=K.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var le,ue,de;z.parameters={...z.parameters,docs:{...(le=z.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    min: 50,
    max: 1000
  }
}`,...(de=(ue=z.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};var ce,me,fe;N.parameters={...N.parameters,docs:{...(ce=N.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    minStepsBetweenThumbs: 25
  }
}`,...(fe=(me=N.parameters)==null?void 0:me.docs)==null?void 0:fe.source}}};var pe,ge,he;F.parameters={...F.parameters,docs:{...(pe=F.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    step: 25
  }
}`,...(he=(ge=F.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var be,Se,ye;H.parameters={...H.parameters,docs:{...(be=H.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    defaultValue: [33, 67]
  }
}`,...(ye=(Se=H.parameters)==null?void 0:Se.docs)==null?void 0:ye.source}}};var ve,we,xe;L.parameters={...L.parameters,docs:{...(ve=L.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(xe=(we=L.parameters)==null?void 0:we.docs)==null?void 0:xe.source}}};var Re,Ce,Te;q.parameters={...q.parameters,docs:{...(Re=q.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(_e=(Ve=O.parameters)==null?void 0:Ve.docs)==null?void 0:_e.source}}};const qn=["SimpleSlider","Disabled","MinimumAndMaximum","MinimumGap","StepSize","MultipleThumbsUncontrolled","ExternallyControlled","MultipleThumbsExternallyControlled","WithInputs"];export{K as Disabled,L as ExternallyControlled,z as MinimumAndMaximum,N as MinimumGap,q as MultipleThumbsExternallyControlled,H as MultipleThumbsUncontrolled,k as SimpleSlider,F as StepSize,O as WithInputs,qn as __namedExportsOrder,Ln as default};
