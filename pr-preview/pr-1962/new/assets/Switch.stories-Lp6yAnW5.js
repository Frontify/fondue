import{j as a}from"./jsx-runtime-DBEcOq3S.js";import{r as c}from"./index-DtJulBIN.js";import{u as ee,c as te}from"./index-DYI_kRwo.js";import{u as ae,P as X}from"./index-B6WxdOXM.js";import{c as se}from"./index-P-l_ls5c.js";import{u as re}from"./index-BRCTM6zp.js";import{u as ne}from"./index-CMjj8zSi.js";import{c as oe}from"./styleUtilities-T76WvCte.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DD2ZIxVL.js";var x="Switch",[ce,qe]=se(x),[ie,le]=ce(x),$=c.forwardRef((e,n)=>{const{__scopeSwitch:t,name:s,checked:r,defaultChecked:u,required:i,disabled:o,value:l="on",onCheckedChange:y,...E}=e,[m,S]=c.useState(null),Q=ae(n,h=>S(h)),C=c.useRef(!1),_=m?!!m.closest("form"):!0,[p=!1,Y]=ee({prop:r,defaultProp:u,onChange:y});return a.jsxs(ie,{scope:t,checked:p,disabled:o,children:[a.jsx(X.button,{type:"button",role:"switch","aria-checked":p,"aria-required":i,"data-state":K(p),"data-disabled":o?"":void 0,disabled:o,value:l,...E,ref:Q,onClick:te(e.onClick,h=>{Y(Z=>!Z),_&&(C.current=h.isPropagationStopped(),C.current||h.stopPropagation())})}),_&&a.jsx(de,{control:m,bubbles:!C.current,name:s,value:l,checked:p,required:i,disabled:o,style:{transform:"translateX(-100%)"}})]})});$.displayName=x;var G="SwitchThumb",J=c.forwardRef((e,n)=>{const{__scopeSwitch:t,...s}=e,r=le(G,t);return a.jsx(X.span,{"data-state":K(r.checked),"data-disabled":r.disabled?"":void 0,...s,ref:n})});J.displayName=G;var de=e=>{const{control:n,checked:t,bubbles:s=!0,...r}=e,u=c.useRef(null),i=re(t),o=ne(n);return c.useEffect(()=>{const l=u.current,y=window.HTMLInputElement.prototype,m=Object.getOwnPropertyDescriptor(y,"checked").set;if(i!==t&&m){const S=new Event("click",{bubbles:s});m.call(l,t),l.dispatchEvent(S)}},[i,t,s]),a.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...r,tabIndex:-1,ref:u,style:{...e.style,...o,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function K(e){return e?"checked":"unchecked"}var ue=$,me=J;const pe="_small_1hipw_28",he="_medium_1hipw_32",fe="_large_1hipw_36",ge="_thumb_1hipw_44",T={switch:"_switch_1hipw_5",small:pe,medium:he,large:fe,thumb:ge},ve=({value:e,defaultValue:n,size:t="medium",onChange:s,"data-test-id":r="fondue-switch","aria-label":u="Switch",...i},o)=>{const l=oe([T.switch,T[t]]);return a.jsx(ue,{ref:o,checked:e,defaultChecked:n,className:l,onCheckedChange:s,"aria-label":u,"data-test-id":r,...i,children:a.jsx(me,{className:T.thumb})})},d=c.forwardRef(ve);d.displayName="Switch";d.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The size of the switch component.
@default medium`,defaultValue:{value:"'medium'",computed:!1}},value:{required:!1,tsType:{name:"boolean"},description:`The active value in the select component. This is used to control the select externally.
@default false`},defaultValue:{required:!1,tsType:{name:"boolean"},description:`The default value of the select component. Used for uncontrolled usages.
@default false`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disables the select component.
@default false`},required:{required:!1,tsType:{name:"boolean"},description:`Whether the switch is required.
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:`Callback function that is called when the switch is toggled.
@param checked - The new checked state of the switch`},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is blurred
@param event - The event object`},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is focused
@param event - The event object`},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-switch'",computed:!1}},"aria-label":{defaultValue:{value:"'Switch'",computed:!1},required:!1}}};const je={component:d,tags:["autodocs"],parameters:{status:{type:"in_progress"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"}},f={args:{defaultValue:!0}},g={args:{defaultValue:!1}},v={args:{defaultValue:!1,disabled:!0}},w={args:{defaultValue:!1,required:!0}},b={render:e=>{const[n,t]=c.useState(!1),s=r=>{t(r)};return a.jsx(d,{value:n,onChange:s,...e})}},k={render:e=>a.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[a.jsx(d,{...e,size:"small"}),a.jsx(d,{...e,size:"medium"}),a.jsx(d,{...e,size:"large"})]})};var q,j,P;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(P=(j=f.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var z,R,V;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(V=(R=g.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var B,H,M;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(M=(H=v.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var F,N,I;w.parameters={...w.parameters,docs:{...(F=w.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(I=(N=w.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var L,D,U;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(U=(D=b.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var O,A,W;k.parameters={...k.parameters,docs:{...(O=k.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </div>
}`,...(W=(A=k.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};const Pe=["Checked","Unchecked","Disabled","Required","ExternallyControlled","Size"];export{f as Checked,v as Disabled,b as ExternallyControlled,w as Required,k as Size,g as Unchecked,Pe as __namedExportsOrder,je as default};
