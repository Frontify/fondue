import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as c}from"./index-ClcD9ViR.js";import{F as b}from"./Flex-CjzBXb8-.js";import{L as y}from"./Label-BrhatqBa.js";import{c as S}from"./index-DulyF36n.js";import{u as w}from"./index-Q_VQqEV0.js";import{c as re}from"./index-CWz5EflU.js";import{P as E}from"./index-CMmqAaFT.js";import{c as te,R as ge,I as xe}from"./index-CUvq6TH0.js";import{u as ye,a as be}from"./index-BZQsQlpo.js";import{u as je}from"./index-CZKF78Oq.js";import{u as Oe}from"./index-sY83p_TZ.js";import{P as qe}from"./index-DPfZWLhs.js";import{c as _e}from"./styleUtilities-Byf6Fdv2.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-BUMxx5F6.js";import"./index-DVmTVPLY.js";import"./index-DluzJQuJ.js";import"./index-kkVLZR_L.js";var N="Radio",[Fe,ae]=re(N),[Le,Ce]=Fe(N),ie=c.forwardRef((o,a)=>{const{__scopeRadio:t,name:i,checked:r=!1,required:s,disabled:n,value:u="on",onCheck:p,form:m,...R}=o,[l,h]=c.useState(null),d=w(a,x=>h(x)),f=c.useRef(!1),g=l?m||!!l.closest("form"):!0;return e.jsxs(Le,{scope:t,checked:r,disabled:n,children:[e.jsx(E.button,{type:"button",role:"radio","aria-checked":r,"data-state":ce(r),"data-disabled":n?"":void 0,disabled:n,value:u,...R,ref:d,onClick:S(o.onClick,x=>{r||p==null||p(),g&&(f.current=x.isPropagationStopped(),f.current||x.stopPropagation())})}),g&&e.jsx(de,{control:l,bubbles:!f.current,name:i,value:u,checked:r,required:s,disabled:n,form:m,style:{transform:"translateX(-100%)"}})]})});ie.displayName=N;var se="RadioIndicator",ne=c.forwardRef((o,a)=>{const{__scopeRadio:t,forceMount:i,...r}=o,s=Ce(se,t);return e.jsx(qe,{present:i||s.checked,children:e.jsx(E.span,{"data-state":ce(s.checked),"data-disabled":s.disabled?"":void 0,...r,ref:a})})});ne.displayName=se;var Ee="RadioBubbleInput",de=c.forwardRef(({__scopeRadio:o,control:a,checked:t,bubbles:i=!0,...r},s)=>{const n=c.useRef(null),u=w(n,s),p=Oe(t),m=be(a);return c.useEffect(()=>{const R=n.current;if(!R)return;const l=window.HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(l,"checked").set;if(p!==t&&d){const f=new Event("click",{bubbles:i});d.call(R,t),R.dispatchEvent(f)}},[p,t,i]),e.jsx(E.input,{type:"radio","aria-hidden":!0,defaultChecked:t,...r,tabIndex:-1,ref:u,style:{...r.style,...m,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});de.displayName=Ee;function ce(o){return o?"checked":"unchecked"}var Ie=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],I="RadioGroup",[Se,no]=re(I,[te,ae]),ue=te(),pe=ae(),[Pe,we]=Se(I),le=c.forwardRef((o,a)=>{const{__scopeRadioGroup:t,name:i,defaultValue:r,value:s,required:n=!1,disabled:u=!1,orientation:p,dir:m,loop:R=!0,onValueChange:l,...h}=o,d=ue(t),f=je(m),[g,x]=ye({prop:s,defaultProp:r??null,onChange:l,caller:I});return e.jsx(Pe,{scope:t,name:i,required:n,disabled:u,value:g,onValueChange:x,children:e.jsx(ge,{asChild:!0,...d,orientation:p,dir:f,loop:R,children:e.jsx(E.div,{role:"radiogroup","aria-required":n,"aria-orientation":p,"data-disabled":u?"":void 0,dir:f,...h,ref:a})})})});le.displayName=I;var me="RadioGroupItem",Re=c.forwardRef((o,a)=>{const{__scopeRadioGroup:t,disabled:i,...r}=o,s=we(me,t),n=s.disabled||i,u=ue(t),p=pe(t),m=c.useRef(null),R=w(a,m),l=s.value===r.value,h=c.useRef(!1);return c.useEffect(()=>{const d=g=>{Ie.includes(g.key)&&(h.current=!0)},f=()=>h.current=!1;return document.addEventListener("keydown",d),document.addEventListener("keyup",f),()=>{document.removeEventListener("keydown",d),document.removeEventListener("keyup",f)}},[]),e.jsx(xe,{asChild:!0,...u,focusable:!n,active:l,children:e.jsx(ie,{disabled:n,required:s.required,checked:l,...p,...r,name:s.name,ref:R,onCheck:()=>s.onValueChange(r.value),onKeyDown:S(d=>{d.key==="Enter"&&d.preventDefault()}),onFocus:S(r.onFocus,()=>{var d;h.current&&((d=m.current)==null||d.click())})})})});Re.displayName=me;var Ne="RadioGroupIndicator",fe=c.forwardRef((o,a)=>{const{__scopeRadioGroup:t,...i}=o,r=pe(t);return e.jsx(ne,{...r,...i,ref:a})});fe.displayName=Ne;var Be=le,Ge=Re,ke=fe;const De="_root_a2zf0_3",Ae="_item_a2zf0_21",$e="_indicator_a2zf0_55",P={root:De,item:Ae,indicator:$e},ve=({asChild:o,children:a,className:t,disabled:i,emphasis:r="default",onValueChange:s,orientation:n,readOnly:u,required:p,value:m,"data-test-id":R})=>e.jsx(Be,{"aria-readonly":u,asChild:o,className:_e([t,o?void 0:P.root]),"data-emphasis":r,"data-readonly":u,"data-test-id":R,disabled:i,onValueChange:s,orientation:n,required:p,value:m,onFocus:l=>{if(u)return l.preventDefault(),l.target.blur(),!1},children:a});ve.displayName="RadioList.Root";const he=({readOnly:o,disabled:a,value:t,id:i,"data-test-id":r,...s})=>e.jsx(Ge,{onFocus:n=>{if(o)return n.preventDefault(),n.target.blur(),!1},"aria-readonly":o,className:`tw-peer ${P.item}`,"data-readonly":o,"data-test-id":r,disabled:a,id:i,value:t,...s,children:e.jsx(ke,{className:P.indicator})});he.displayName="RadioList.RadioButton";const v={Root:ve,RadioButton:he},co={title:"Components/RadioList",component:v.Root,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,readOnly:!1,required:!1,value:void 0,orientation:void 0,emphasis:void 0},argTypes:{value:{type:"string"},orientation:{type:"string",options:[void 0,"horizontal","vertical"],control:{type:"select"}},emphasis:{type:"string",options:[void 0,"default","highlight"],control:{type:"select"}}},render:o=>{const a=c.useId(),t=`${a}-option-1`,i=`${a}-option-2`,r=`${a}-option-3`;return e.jsxs(v.Root,{...o,children:[e.jsx(v.RadioButton,{id:t,value:"1"}),e.jsx(y,{htmlFor:t,required:o.required,children:"Option 1"}),e.jsx(v.RadioButton,{id:i,value:"2"}),e.jsx(y,{htmlFor:i,required:o.required,children:"Option 2"}),e.jsx(v.RadioButton,{id:r,value:"3"}),e.jsx(y,{htmlFor:r,required:o.required,children:"Option 3"})]})}},j={},O={args:{disabled:!0}},q={args:{readOnly:!0}},_={args:{required:!0}},F={args:{orientation:"vertical"}},L={args:{emphasis:"highlight"}},C={render:o=>{const a=c.useId(),t=`${a}-option-1`,i=`${a}-option-2`,r=`${a}-option-3`;return e.jsx(v.Root,{disabled:o.disabled,required:o.required,value:o.value,asChild:!0,children:e.jsxs(b,{gap:4,children:[e.jsxs(b,{gap:2,align:"center",children:[e.jsx(v.RadioButton,{id:t,value:"1"}),e.jsx(y,{htmlFor:t,required:o.required,children:"Option 1"})]}),e.jsxs(b,{gap:2,align:"center",children:[e.jsx(v.RadioButton,{id:i,value:"2"}),e.jsx(y,{htmlFor:i,required:o.required,children:"Option 2"})]}),e.jsxs(b,{gap:2,align:"center",children:[e.jsx(v.RadioButton,{id:r,value:"3"}),e.jsx(y,{htmlFor:r,required:o.required,children:"Option 3"})]})]})})}};var B,G,k;j.parameters={...j.parameters,docs:{...(B=j.parameters)==null?void 0:B.docs,source:{originalSource:"{}",...(k=(G=j.parameters)==null?void 0:G.docs)==null?void 0:k.source}}};var D,A,$;O.parameters={...O.parameters,docs:{...(D=O.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...($=(A=O.parameters)==null?void 0:A.docs)==null?void 0:$.source}}};var M,V,z;q.parameters={...q.parameters,docs:{...(M=q.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(z=(V=q.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var T,K,U;_.parameters={..._.parameters,docs:{...(T=_.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(U=(K=_.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var W,H,X;F.parameters={...F.parameters,docs:{...(W=F.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  }
}`,...(X=(H=F.parameters)==null?void 0:H.docs)==null?void 0:X.source}}};var Y,J,Q;L.parameters={...L.parameters,docs:{...(Y=L.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    emphasis: 'highlight'
  }
}`,...(Q=(J=L.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Z,ee,oe;C.parameters={...C.parameters,docs:{...(Z=C.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(oe=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:oe.source}}};const uo=["Default","Disabled","ReadOnly","Required","Vertical","WithEmphasisHighlight","WithCustomLayout"];export{j as Default,O as Disabled,q as ReadOnly,_ as Required,F as Vertical,C as WithCustomLayout,L as WithEmphasisHighlight,uo as __namedExportsOrder,co as default};
