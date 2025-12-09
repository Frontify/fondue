import{r as d,j as e,u as N,f as ye,F as O}from"./iframe-C023JDTn.js";import{a as Le}from"./fondue-icons369-zwa5BVxZ.js";import{L as j}from"./Label-CKq6GBlS.js";import{T as w}from"./Tooltip-DB0fwM4O.js";import{c as B}from"./index-Az_SQfnx.js";import{c as ne}from"./index-ZgTAn34V.js";import{P as E}from"./index-Btkm7yRl.js";import{c as de,R as qe,I as _e}from"./index-DEkAGUPk.js";import{u as Fe,a as Ie}from"./index-B0HLNkil.js";import{u as Ce}from"./index-DSWlN-_q.js";import{u as Ee}from"./index-D1khv0-Y.js";import{P as Se}from"./index-DYGrn-PQ.js";import{c as we}from"./styleUtilities-A7Ia-tuh.js";import"./preload-helper-BKQYPUyr.js";import"./index-CsnDkmwd.js";import"./index-BGmyYuMq.js";var k="Radio",[Be,ce]=ne(k),[Pe,Ne]=Be(k),ue=d.forwardRef((o,i)=>{const{__scopeRadio:r,name:a,checked:t=!1,required:s,disabled:n,value:u="on",onCheck:p,form:R,...f}=o,[m,v]=d.useState(null),c=N(i,x=>v(x)),h=d.useRef(!1),g=m?R||!!m.closest("form"):!0;return e.jsxs(Pe,{scope:r,checked:t,disabled:n,children:[e.jsx(E.button,{type:"button",role:"radio","aria-checked":t,"data-state":Re(t),"data-disabled":n?"":void 0,disabled:n,value:u,...f,ref:c,onClick:B(o.onClick,x=>{t||p==null||p(),g&&(h.current=x.isPropagationStopped(),h.current||x.stopPropagation())})}),g&&e.jsx(me,{control:m,bubbles:!h.current,name:a,value:u,checked:t,required:s,disabled:n,form:R,style:{transform:"translateX(-100%)"}})]})});ue.displayName=k;var pe="RadioIndicator",le=d.forwardRef((o,i)=>{const{__scopeRadio:r,forceMount:a,...t}=o,s=Ne(pe,r);return e.jsx(Se,{present:a||s.checked,children:e.jsx(E.span,{"data-state":Re(s.checked),"data-disabled":s.disabled?"":void 0,...t,ref:i})})});le.displayName=pe;var ke="RadioBubbleInput",me=d.forwardRef(({__scopeRadio:o,control:i,checked:r,bubbles:a=!0,...t},s)=>{const n=d.useRef(null),u=N(n,s),p=Ee(r),R=Ie(i);return d.useEffect(()=>{const f=n.current;if(!f)return;const m=window.HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(m,"checked").set;if(p!==r&&c){const h=new Event("click",{bubbles:a});c.call(f,r),f.dispatchEvent(h)}},[p,r,a]),e.jsx(E.input,{type:"radio","aria-hidden":!0,defaultChecked:r,...t,tabIndex:-1,ref:u,style:{...t.style,...R,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});me.displayName=ke;function Re(o){return o?"checked":"unchecked"}var De=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],S="RadioGroup",[Ge]=ne(S,[de,ce]),fe=de(),ve=ce(),[Ae,$e]=Ge(S),he=d.forwardRef((o,i)=>{const{__scopeRadioGroup:r,name:a,defaultValue:t,value:s,required:n=!1,disabled:u=!1,orientation:p,dir:R,loop:f=!0,onValueChange:m,...v}=o,c=fe(r),h=Ce(R),[g,x]=Fe({prop:s,defaultProp:t??null,onChange:m,caller:S});return e.jsx(Ae,{scope:r,name:a,required:n,disabled:u,value:g,onValueChange:x,children:e.jsx(qe,{asChild:!0,...c,orientation:p,dir:h,loop:f,children:e.jsx(E.div,{role:"radiogroup","aria-required":n,"aria-orientation":p,"data-disabled":u?"":void 0,dir:h,...v,ref:i})})})});he.displayName=S;var ge="RadioGroupItem",xe=d.forwardRef((o,i)=>{const{__scopeRadioGroup:r,disabled:a,...t}=o,s=$e(ge,r),n=s.disabled||a,u=fe(r),p=ve(r),R=d.useRef(null),f=N(i,R),m=s.value===t.value,v=d.useRef(!1);return d.useEffect(()=>{const c=g=>{De.includes(g.key)&&(v.current=!0)},h=()=>v.current=!1;return document.addEventListener("keydown",c),document.addEventListener("keyup",h),()=>{document.removeEventListener("keydown",c),document.removeEventListener("keyup",h)}},[]),e.jsx(_e,{asChild:!0,...u,focusable:!n,active:m,children:e.jsx(ue,{disabled:n,required:s.required,checked:m,...p,...t,name:s.name,ref:f,onCheck:()=>s.onValueChange(t.value),onKeyDown:B(c=>{c.key==="Enter"&&c.preventDefault()}),onFocus:B(t.onFocus,()=>{var c;v.current&&((c=R.current)==null||c.click())})})})});xe.displayName=ge;var Te="RadioGroupIndicator",je=d.forwardRef((o,i)=>{const{__scopeRadioGroup:r,...a}=o,t=ve(r);return e.jsx(le,{...t,...a,ref:i})});je.displayName=Te;var Me=he,Ve=xe,We=je;const Ke="_root_8wi6j_3",Ue="_item_8wi6j_21",ze="_indicator_8wi6j_55",P={root:Ke,item:Ue,indicator:ze},Oe=({asChild:o,children:i,className:r,disabled:a,emphasis:t="default",onValueChange:s,orientation:n,readOnly:u,required:p,value:R,"data-test-id":f})=>{const{dir:m}=ye();return e.jsx(Me,{"aria-readonly":u,asChild:o,className:we([r,o?void 0:P.root]),"data-emphasis":t,"data-readonly":u,"data-test-id":f,dir:m,disabled:a,onValueChange:s,orientation:n,required:p,value:R,onFocus:v=>{if(u)return v.preventDefault(),v.target.blur(),!1},children:i})};Oe.displayName="RadioList.Root";const be=({readOnly:o,disabled:i,value:r,id:a,"data-test-id":t,...s})=>e.jsx(Ve,{onFocus:n=>{if(o)return n.preventDefault(),n.target.blur(),!1},"aria-readonly":o,className:`tw-peer ${P.item}`,"data-readonly":o,"data-test-id":t,disabled:i,id:a,value:r,...s,children:e.jsx(We,{className:P.indicator})});be.displayName="RadioList.RadioButton";const l={Root:Oe,RadioButton:be},po={title:"Components/RadioList",component:l.Root,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,readOnly:!1,required:!1,value:void 0,orientation:void 0,emphasis:void 0},argTypes:{value:{type:"string"},orientation:{type:"string",options:[void 0,"horizontal","vertical"],control:{type:"select"}},emphasis:{type:"string",options:[void 0,"default","highlight"],control:{type:"select"}}},render:o=>{const i=d.useId(),r=`${i}-option-1`,a=`${i}-option-2`,t=`${i}-option-3`;return e.jsxs(l.Root,{...o,children:[e.jsx(l.RadioButton,{id:r,value:"1"}),e.jsx(j,{htmlFor:r,required:o.required,children:"Option 1"}),e.jsx(l.RadioButton,{id:a,value:"2"}),e.jsx(j,{htmlFor:a,required:o.required,children:"Option 2"}),e.jsx(l.RadioButton,{id:t,value:"3"}),e.jsxs(j,{htmlFor:t,required:o.required,children:["Option 3",e.jsxs(w.Root,{children:[e.jsx(w.Trigger,{children:e.jsx(Le,{size:"16"})}),e.jsx(w.Content,{children:"I'm a tooltip!"})]})]})]})}},b={},y={args:{disabled:!0}},L={args:{readOnly:!0}},q={args:{required:!0}},_={args:{orientation:"vertical"}},F={args:{emphasis:"highlight"}},I={render:o=>{const i=d.useId(),r=`${i}-option-1`,a=`${i}-option-2`,t=`${i}-option-3`;return e.jsxs(l.Root,{...o,children:[e.jsx(l.RadioButton,{id:r,value:"1"}),e.jsx(l.RadioButton,{id:a,value:"2"}),e.jsx(l.RadioButton,{id:t,value:"3"})]})}},C={render:o=>{const i=d.useId(),r=`${i}-option-1`,a=`${i}-option-2`,t=`${i}-option-3`;return e.jsx(l.Root,{disabled:o.disabled,required:o.required,value:o.value,asChild:!0,children:e.jsxs(O,{gap:4,children:[e.jsxs(O,{gap:2,align:"center",children:[e.jsx(l.RadioButton,{id:r,value:"1"}),e.jsx(j,{htmlFor:r,required:o.required,children:"Option 1"})]}),e.jsxs(O,{gap:2,align:"center",children:[e.jsx(l.RadioButton,{id:a,value:"2"}),e.jsx(j,{htmlFor:a,required:o.required,children:"Option 2"})]}),e.jsxs(O,{gap:2,align:"center",children:[e.jsx(l.RadioButton,{id:t,value:"3"}),e.jsx(j,{htmlFor:t,required:o.required,children:"Option 3"})]})]})})}};var D,G,A;b.parameters={...b.parameters,docs:{...(D=b.parameters)==null?void 0:D.docs,source:{originalSource:"{}",...(A=(G=b.parameters)==null?void 0:G.docs)==null?void 0:A.source}}};var $,T,M;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(M=(T=y.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var V,W,K;L.parameters={...L.parameters,docs:{...(V=L.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(se=(ae=C.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};const lo=["Default","Disabled","ReadOnly","Required","Vertical","WithEmphasisHighlight","WithoutLabels","WithCustomLayout"];export{b as Default,y as Disabled,L as ReadOnly,q as Required,_ as Vertical,C as WithCustomLayout,F as WithEmphasisHighlight,I as WithoutLabels,lo as __namedExportsOrder,po as default};
