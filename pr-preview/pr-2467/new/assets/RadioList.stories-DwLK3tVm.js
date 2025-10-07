import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as d}from"./index-ClcD9ViR.js";import{a as be}from"./fondue-icons352-BBEDZbgo.js";import{F as y}from"./Flex-BQUHScux.js";import{L as j}from"./Label-1bHheCUK.js";import{T as B}from"./Tooltip-DtFtg8Ev.js";import{c as P}from"./index-DulyF36n.js";import{u as D}from"./index-Q_VQqEV0.js";import{c as ne}from"./index-CWz5EflU.js";import{P as E}from"./index-CMmqAaFT.js";import{c as de,R as Le,I as qe}from"./index-CisXfU_o.js";import{u as _e,a as Fe}from"./index-BZQsQlpo.js";import{u as Ie}from"./index-CZKF78Oq.js";import{u as Ce}from"./index-sY83p_TZ.js";import{P as Ee}from"./index-BezEZHzC.js";import{g as Se}from"./domUtilities-9yCChYS0.js";import{c as Be}from"./styleUtilities-Byf6Fdv2.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-JHbJ-wYR.js";import"./index-BUMxx5F6.js";import"./ThemeProvider-Dbar5Ost.js";import"./index-DVmTVPLY.js";var N="Radio",[Pe,ce]=ne(N),[we,De]=Pe(N),ue=d.forwardRef((o,i)=>{const{__scopeRadio:r,name:a,checked:t=!1,required:s,disabled:c,value:p="on",onCheck:l,form:f,...v}=o,[R,h]=d.useState(null),n=D(i,x=>h(x)),u=d.useRef(!1),g=R?f||!!R.closest("form"):!0;return e.jsxs(we,{scope:r,checked:t,disabled:c,children:[e.jsx(E.button,{type:"button",role:"radio","aria-checked":t,"data-state":Re(t),"data-disabled":c?"":void 0,disabled:c,value:p,...v,ref:n,onClick:P(o.onClick,x=>{t||l==null||l(),g&&(u.current=x.isPropagationStopped(),u.current||x.stopPropagation())})}),g&&e.jsx(me,{control:R,bubbles:!u.current,name:a,value:p,checked:t,required:s,disabled:c,form:f,style:{transform:"translateX(-100%)"}})]})});ue.displayName=N;var pe="RadioIndicator",le=d.forwardRef((o,i)=>{const{__scopeRadio:r,forceMount:a,...t}=o,s=De(pe,r);return e.jsx(Ee,{present:a||s.checked,children:e.jsx(E.span,{"data-state":Re(s.checked),"data-disabled":s.disabled?"":void 0,...t,ref:i})})});le.displayName=pe;var Ne="RadioBubbleInput",me=d.forwardRef(({__scopeRadio:o,control:i,checked:r,bubbles:a=!0,...t},s)=>{const c=d.useRef(null),p=D(c,s),l=Ce(r),f=Fe(i);return d.useEffect(()=>{const v=c.current;if(!v)return;const R=window.HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(R,"checked").set;if(l!==r&&n){const u=new Event("click",{bubbles:a});n.call(v,r),v.dispatchEvent(u)}},[l,r,a]),e.jsx(E.input,{type:"radio","aria-hidden":!0,defaultChecked:r,...t,tabIndex:-1,ref:p,style:{...t.style,...f,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});me.displayName=Ne;function Re(o){return o?"checked":"unchecked"}var Ge=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],S="RadioGroup",[ke,go]=ne(S,[de,ce]),fe=de(),ve=ce(),[Ae,$e]=ke(S),he=d.forwardRef((o,i)=>{const{__scopeRadioGroup:r,name:a,defaultValue:t,value:s,required:c=!1,disabled:p=!1,orientation:l,dir:f,loop:v=!0,onValueChange:R,...h}=o,n=fe(r),u=Ie(f),[g,x]=_e({prop:s,defaultProp:t??null,onChange:R,caller:S});return e.jsx(Ae,{scope:r,name:a,required:c,disabled:p,value:g,onValueChange:x,children:e.jsx(Le,{asChild:!0,...n,orientation:l,dir:u,loop:v,children:e.jsx(E.div,{role:"radiogroup","aria-required":c,"aria-orientation":l,"data-disabled":p?"":void 0,dir:u,...h,ref:i})})})});he.displayName=S;var ge="RadioGroupItem",xe=d.forwardRef((o,i)=>{const{__scopeRadioGroup:r,disabled:a,...t}=o,s=$e(ge,r),c=s.disabled||a,p=fe(r),l=ve(r),f=d.useRef(null),v=D(i,f),R=s.value===t.value,h=d.useRef(!1);return d.useEffect(()=>{const n=g=>{Ge.includes(g.key)&&(h.current=!0)},u=()=>h.current=!1;return document.addEventListener("keydown",n),document.addEventListener("keyup",u),()=>{document.removeEventListener("keydown",n),document.removeEventListener("keyup",u)}},[]),e.jsx(qe,{asChild:!0,...p,focusable:!c,active:R,children:e.jsx(ue,{disabled:c,required:s.required,checked:R,...l,...t,name:s.name,ref:v,onCheck:()=>s.onValueChange(t.value),onKeyDown:P(n=>{n.key==="Enter"&&n.preventDefault()}),onFocus:P(t.onFocus,()=>{var n;h.current&&((n=f.current)==null||n.click())})})})});xe.displayName=ge;var Me="RadioGroupIndicator",je=d.forwardRef((o,i)=>{const{__scopeRadioGroup:r,...a}=o,t=ve(r);return e.jsx(le,{...t,...a,ref:i})});je.displayName=Me;var Te=he,Ve=xe,We=je;const Ke="_root_4y9jp_3",Ue="_item_4y9jp_21",ze="_indicator_4y9jp_55",w={root:Ke,item:Ue,indicator:ze},ye=({asChild:o,children:i,className:r,disabled:a,emphasis:t="default",onValueChange:s,orientation:c,readOnly:p,required:l,value:f,"data-test-id":v})=>{const[R,h]=d.useState(void 0),n=d.useRef(null);return d.useEffect(()=>{if(!n.current)return;const u=Se(n.current);h(u)},[]),e.jsx(Te,{ref:n,"aria-readonly":p,asChild:o,className:Be([r,o?void 0:w.root]),"data-emphasis":t,"data-readonly":p,"data-test-id":v,dir:R,disabled:a,onValueChange:s,orientation:c,required:l,value:f,onFocus:u=>{if(p)return u.preventDefault(),u.target.blur(),!1},children:i})};ye.displayName="RadioList.Root";const Oe=({readOnly:o,disabled:i,value:r,id:a,"data-test-id":t,...s})=>e.jsx(Ve,{onFocus:c=>{if(o)return c.preventDefault(),c.target.blur(),!1},"aria-readonly":o,className:`tw-peer ${w.item}`,"data-readonly":o,"data-test-id":t,disabled:i,id:a,value:r,...s,children:e.jsx(We,{className:w.indicator})});Oe.displayName="RadioList.RadioButton";const m={Root:ye,RadioButton:Oe},xo={title:"Components/RadioList",component:m.Root,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,readOnly:!1,required:!1,value:void 0,orientation:void 0,emphasis:void 0},argTypes:{value:{type:"string"},orientation:{type:"string",options:[void 0,"horizontal","vertical"],control:{type:"select"}},emphasis:{type:"string",options:[void 0,"default","highlight"],control:{type:"select"}}},render:o=>{const i=d.useId(),r=`${i}-option-1`,a=`${i}-option-2`,t=`${i}-option-3`;return e.jsxs(m.Root,{...o,children:[e.jsx(m.RadioButton,{id:r,value:"1"}),e.jsx(j,{htmlFor:r,required:o.required,children:"Option 1"}),e.jsx(m.RadioButton,{id:a,value:"2"}),e.jsx(j,{htmlFor:a,required:o.required,children:"Option 2"}),e.jsx(m.RadioButton,{id:t,value:"3"}),e.jsxs(j,{htmlFor:t,required:o.required,children:["Option 3",e.jsxs(B.Root,{children:[e.jsx(B.Trigger,{children:e.jsx(be,{size:"16"})}),e.jsx(B.Content,{children:"I'm a tooltip!"})]})]})]})}},O={},b={args:{disabled:!0}},L={args:{readOnly:!0}},q={args:{required:!0}},_={args:{orientation:"vertical"}},F={args:{emphasis:"highlight"}},I={render:o=>{const i=d.useId(),r=`${i}-option-1`,a=`${i}-option-2`,t=`${i}-option-3`;return e.jsxs(m.Root,{...o,children:[e.jsx(m.RadioButton,{id:r,value:"1"}),e.jsx(m.RadioButton,{id:a,value:"2"}),e.jsx(m.RadioButton,{id:t,value:"3"})]})}},C={render:o=>{const i=d.useId(),r=`${i}-option-1`,a=`${i}-option-2`,t=`${i}-option-3`;return e.jsx(m.Root,{disabled:o.disabled,required:o.required,value:o.value,asChild:!0,children:e.jsxs(y,{gap:4,children:[e.jsxs(y,{gap:2,align:"center",children:[e.jsx(m.RadioButton,{id:r,value:"1"}),e.jsx(j,{htmlFor:r,required:o.required,children:"Option 1"})]}),e.jsxs(y,{gap:2,align:"center",children:[e.jsx(m.RadioButton,{id:a,value:"2"}),e.jsx(j,{htmlFor:a,required:o.required,children:"Option 2"})]}),e.jsxs(y,{gap:2,align:"center",children:[e.jsx(m.RadioButton,{id:t,value:"3"}),e.jsx(j,{htmlFor:t,required:o.required,children:"Option 3"})]})]})})}};var G,k,A;O.parameters={...O.parameters,docs:{...(G=O.parameters)==null?void 0:G.docs,source:{originalSource:"{}",...(A=(k=O.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var $,M,T;b.parameters={...b.parameters,docs:{...($=b.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(T=(M=b.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var V,W,K;L.parameters={...L.parameters,docs:{...(V=L.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(K=(W=L.parameters)==null?void 0:W.docs)==null?void 0:K.source}}};var U,z,H;q.parameters={...q.parameters,docs:{...(U=q.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(H=(z=q.parameters)==null?void 0:z.docs)==null?void 0:H.source}}};var X,Y,J;_.parameters={..._.parameters,docs:{...(X=_.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  }
}`,...(J=(Y=_.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var Q,Z,ee;F.parameters={...F.parameters,docs:{...(Q=F.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    emphasis: 'highlight'
  }
}`,...(ee=(Z=F.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var oe,te,re;I.parameters={...I.parameters,docs:{...(oe=I.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
}`,...(re=(te=I.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var ie,ae,se;C.parameters={...C.parameters,docs:{...(ie=C.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(se=(ae=C.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};const jo=["Default","Disabled","ReadOnly","Required","Vertical","WithEmphasisHighlight","WithoutLabels","WithCustomLayout"];export{O as Default,b as Disabled,L as ReadOnly,q as Required,_ as Vertical,C as WithCustomLayout,F as WithEmphasisHighlight,I as WithoutLabels,jo as __namedExportsOrder,xo as default};
