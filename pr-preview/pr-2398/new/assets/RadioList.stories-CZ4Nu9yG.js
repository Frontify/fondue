import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as d}from"./index-ClcD9ViR.js";import{F as b}from"./Flex-CjzBXb8-.js";import{L as O}from"./Label-BrhatqBa.js";import{c as B}from"./index-DulyF36n.js";import{u as w}from"./index-Q_VQqEV0.js";import{c as ne}from"./index-CWz5EflU.js";import{P as E}from"./index-CMmqAaFT.js";import{c as se,R as ye,I as je}from"./index-CUvq6TH0.js";import{u as Le,a as qe}from"./index-BZQsQlpo.js";import{u as _e}from"./index-CZKF78Oq.js";import{u as Fe}from"./index-sY83p_TZ.js";import{P as Ie}from"./index-DPfZWLhs.js";import{c as Ce}from"./styleUtilities-Byf6Fdv2.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-BUMxx5F6.js";import"./index-DVmTVPLY.js";import"./index-DluzJQuJ.js";import"./index-kkVLZR_L.js";var N="Radio",[Ee,de]=ne(N),[Se,Be]=Ee(N),ce=d.forwardRef((o,i)=>{const{__scopeRadio:r,name:a,checked:t=!1,required:n,disabled:s,value:u="on",onCheck:p,form:R,...f}=o,[l,h]=d.useState(null),c=w(i,x=>h(x)),v=d.useRef(!1),g=l?R||!!l.closest("form"):!0;return e.jsxs(Se,{scope:r,checked:t,disabled:s,children:[e.jsx(E.button,{type:"button",role:"radio","aria-checked":t,"data-state":me(t),"data-disabled":s?"":void 0,disabled:s,value:u,...f,ref:c,onClick:B(o.onClick,x=>{t||p==null||p(),g&&(v.current=x.isPropagationStopped(),v.current||x.stopPropagation())})}),g&&e.jsx(le,{control:l,bubbles:!v.current,name:a,value:u,checked:t,required:n,disabled:s,form:R,style:{transform:"translateX(-100%)"}})]})});ce.displayName=N;var ue="RadioIndicator",pe=d.forwardRef((o,i)=>{const{__scopeRadio:r,forceMount:a,...t}=o,n=Be(ue,r);return e.jsx(Ie,{present:a||n.checked,children:e.jsx(E.span,{"data-state":me(n.checked),"data-disabled":n.disabled?"":void 0,...t,ref:i})})});pe.displayName=ue;var Pe="RadioBubbleInput",le=d.forwardRef(({__scopeRadio:o,control:i,checked:r,bubbles:a=!0,...t},n)=>{const s=d.useRef(null),u=w(s,n),p=Fe(r),R=qe(i);return d.useEffect(()=>{const f=s.current;if(!f)return;const l=window.HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(l,"checked").set;if(p!==r&&c){const v=new Event("click",{bubbles:a});c.call(f,r),f.dispatchEvent(v)}},[p,r,a]),e.jsx(E.input,{type:"radio","aria-hidden":!0,defaultChecked:r,...t,tabIndex:-1,ref:u,style:{...t.style,...R,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});le.displayName=Pe;function me(o){return o?"checked":"unchecked"}var we=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],S="RadioGroup",[Ne,lo]=ne(S,[se,de]),Re=se(),fe=de(),[Ge,ke]=Ne(S),ve=d.forwardRef((o,i)=>{const{__scopeRadioGroup:r,name:a,defaultValue:t,value:n,required:s=!1,disabled:u=!1,orientation:p,dir:R,loop:f=!0,onValueChange:l,...h}=o,c=Re(r),v=_e(R),[g,x]=Le({prop:n,defaultProp:t??null,onChange:l,caller:S});return e.jsx(Ge,{scope:r,name:a,required:s,disabled:u,value:g,onValueChange:x,children:e.jsx(ye,{asChild:!0,...c,orientation:p,dir:v,loop:f,children:e.jsx(E.div,{role:"radiogroup","aria-required":s,"aria-orientation":p,"data-disabled":u?"":void 0,dir:v,...h,ref:i})})})});ve.displayName=S;var he="RadioGroupItem",ge=d.forwardRef((o,i)=>{const{__scopeRadioGroup:r,disabled:a,...t}=o,n=ke(he,r),s=n.disabled||a,u=Re(r),p=fe(r),R=d.useRef(null),f=w(i,R),l=n.value===t.value,h=d.useRef(!1);return d.useEffect(()=>{const c=g=>{we.includes(g.key)&&(h.current=!0)},v=()=>h.current=!1;return document.addEventListener("keydown",c),document.addEventListener("keyup",v),()=>{document.removeEventListener("keydown",c),document.removeEventListener("keyup",v)}},[]),e.jsx(je,{asChild:!0,...u,focusable:!s,active:l,children:e.jsx(ce,{disabled:s,required:n.required,checked:l,...p,...t,name:n.name,ref:f,onCheck:()=>n.onValueChange(t.value),onKeyDown:B(c=>{c.key==="Enter"&&c.preventDefault()}),onFocus:B(t.onFocus,()=>{var c;h.current&&((c=R.current)==null||c.click())})})})});ge.displayName=he;var De="RadioGroupIndicator",xe=d.forwardRef((o,i)=>{const{__scopeRadioGroup:r,...a}=o,t=fe(r);return e.jsx(pe,{...t,...a,ref:i})});xe.displayName=De;var Ae=ve,$e=ge,Me=xe;const Ve="_root_a2zf0_3",We="_item_a2zf0_21",ze="_indicator_a2zf0_55",P={root:Ve,item:We,indicator:ze},Oe=({asChild:o,children:i,className:r,disabled:a,emphasis:t="default",onValueChange:n,orientation:s,readOnly:u,required:p,value:R,"data-test-id":f})=>e.jsx(Ae,{"aria-readonly":u,asChild:o,className:Ce([r,o?void 0:P.root]),"data-emphasis":t,"data-readonly":u,"data-test-id":f,disabled:a,onValueChange:n,orientation:s,required:p,value:R,onFocus:l=>{if(u)return l.preventDefault(),l.target.blur(),!1},children:i});Oe.displayName="RadioList.Root";const be=({readOnly:o,disabled:i,value:r,id:a,"data-test-id":t,...n})=>e.jsx($e,{onFocus:s=>{if(o)return s.preventDefault(),s.target.blur(),!1},"aria-readonly":o,className:`tw-peer ${P.item}`,"data-readonly":o,"data-test-id":t,disabled:i,id:a,value:r,...n,children:e.jsx(Me,{className:P.indicator})});be.displayName="RadioList.RadioButton";const m={Root:Oe,RadioButton:be},mo={title:"Components/RadioList",component:m.Root,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,readOnly:!1,required:!1,value:void 0,orientation:void 0,emphasis:void 0},argTypes:{value:{type:"string"},orientation:{type:"string",options:[void 0,"horizontal","vertical"],control:{type:"select"}},emphasis:{type:"string",options:[void 0,"default","highlight"],control:{type:"select"}}},render:o=>{const i=d.useId(),r=`${i}-option-1`,a=`${i}-option-2`,t=`${i}-option-3`;return e.jsxs(m.Root,{...o,children:[e.jsx(m.RadioButton,{id:r,value:"1"}),e.jsx(O,{htmlFor:r,required:o.required,children:"Option 1"}),e.jsx(m.RadioButton,{id:a,value:"2"}),e.jsx(O,{htmlFor:a,required:o.required,children:"Option 2"}),e.jsx(m.RadioButton,{id:t,value:"3"}),e.jsx(O,{htmlFor:t,required:o.required,children:"Option 3"})]})}},y={},j={args:{disabled:!0}},L={args:{readOnly:!0}},q={args:{required:!0}},_={args:{orientation:"vertical"}},F={args:{emphasis:"highlight"}},I={render:o=>{const i=d.useId(),r=`${i}-option-1`,a=`${i}-option-2`,t=`${i}-option-3`;return e.jsxs(m.Root,{...o,children:[e.jsx(m.RadioButton,{id:r,value:"1"}),e.jsx(m.RadioButton,{id:a,value:"2"}),e.jsx(m.RadioButton,{id:t,value:"3"})]})}},C={render:o=>{const i=d.useId(),r=`${i}-option-1`,a=`${i}-option-2`,t=`${i}-option-3`;return e.jsx(m.Root,{disabled:o.disabled,required:o.required,value:o.value,asChild:!0,children:e.jsxs(b,{gap:4,children:[e.jsxs(b,{gap:2,align:"center",children:[e.jsx(m.RadioButton,{id:r,value:"1"}),e.jsx(O,{htmlFor:r,required:o.required,children:"Option 1"})]}),e.jsxs(b,{gap:2,align:"center",children:[e.jsx(m.RadioButton,{id:a,value:"2"}),e.jsx(O,{htmlFor:a,required:o.required,children:"Option 2"})]}),e.jsxs(b,{gap:2,align:"center",children:[e.jsx(m.RadioButton,{id:t,value:"3"}),e.jsx(O,{htmlFor:t,required:o.required,children:"Option 3"})]})]})})}};var G,k,D;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:"{}",...(D=(k=y.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var A,$,M;j.parameters={...j.parameters,docs:{...(A=j.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(M=($=j.parameters)==null?void 0:$.docs)==null?void 0:M.source}}};var V,W,z;L.parameters={...L.parameters,docs:{...(V=L.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(z=(W=L.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var T,K,U;q.parameters={...q.parameters,docs:{...(T=q.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(U=(K=q.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var H,X,Y;_.parameters={..._.parameters,docs:{...(H=_.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  }
}`,...(Y=(X=_.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var J,Q,Z;F.parameters={...F.parameters,docs:{...(J=F.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    emphasis: 'highlight'
  }
}`,...(Z=(Q=F.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var ee,oe,te;I.parameters={...I.parameters,docs:{...(ee=I.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => {
    const id = useId();
    const idOption1 = \`\${id}-option-1\`;
    const idOption2 = \`\${id}-option-2\`;
    const idOption3 = \`\${id}-option-3\`;
    return <RadioList.Root {...args}>
                <RadioList.RadioButton id={idOption1} value="1" />
                <RadioList.RadioButton id={idOption2} value="2" />
                <RadioList.RadioButton id={idOption3} value="3" />
            </RadioList.Root>;
  }
}`,...(te=(oe=I.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var re,ie,ae;C.parameters={...C.parameters,docs:{...(re=C.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: args => {
    const id = useId();
    const idOption1 = \`\${id}-option-1\`;
    const idOption2 = \`\${id}-option-2\`;
    const idOption3 = \`\${id}-option-3\`;
    return <RadioList.Root disabled={args.disabled} required={args.required} value={args.value} asChild>
                <Flex gap={4}>
                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption1} value="1" />
                        <Label htmlFor={idOption1} required={args.required}>
                            Option 1
                        </Label>
                    </Flex>

                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption2} value="2" />
                        <Label htmlFor={idOption2} required={args.required}>
                            Option 2
                        </Label>
                    </Flex>

                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption3} value="3" />
                        <Label htmlFor={idOption3} required={args.required}>
                            Option 3
                        </Label>
                    </Flex>
                </Flex>
            </RadioList.Root>;
  }
}`,...(ae=(ie=C.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};const Ro=["Default","Disabled","ReadOnly","Required","Vertical","WithEmphasisHighlight","WithoutLabels","WithCustomLayout"];export{y as Default,j as Disabled,L as ReadOnly,q as Required,_ as Vertical,C as WithCustomLayout,F as WithEmphasisHighlight,I as WithoutLabels,Ro as __namedExportsOrder,mo as default};
