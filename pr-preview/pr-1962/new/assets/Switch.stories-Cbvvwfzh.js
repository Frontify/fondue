import{j as o}from"./jsx-runtime-DBEcOq3S.js";import{r as c}from"./index-DtJulBIN.js";import{u as ee,c as te}from"./index-DYI_kRwo.js";import{u as ae,P as X}from"./index-B6WxdOXM.js";import{c as se}from"./index-P-l_ls5c.js";import{u as re}from"./index-BRCTM6zp.js";import{u as ne}from"./index-CMjj8zSi.js";import{c as oe}from"./styleUtilities-T76WvCte.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DD2ZIxVL.js";var E="Switch",[ce,qe]=se(E),[le,ie]=ce(E),$=c.forwardRef((e,r)=>{const{__scopeSwitch:t,name:a,checked:s,defaultChecked:d,required:l,disabled:n,value:i="on",onCheckedChange:S,..._}=e,[u,y]=c.useState(null),Q=ae(r,p=>y(p)),C=c.useRef(!1),x=u?!!u.closest("form"):!0,[m=!1,Y]=ee({prop:s,defaultProp:d,onChange:S});return o.jsxs(le,{scope:t,checked:m,disabled:n,children:[o.jsx(X.button,{type:"button",role:"switch","aria-checked":m,"aria-required":l,"data-state":K(m),"data-disabled":n?"":void 0,disabled:n,value:i,..._,ref:Q,onClick:te(e.onClick,p=>{Y(Z=>!Z),x&&(C.current=p.isPropagationStopped(),C.current||p.stopPropagation())})}),x&&o.jsx(de,{control:u,bubbles:!C.current,name:a,value:i,checked:m,required:l,disabled:n,style:{transform:"translateX(-100%)"}})]})});$.displayName=E;var G="SwitchThumb",J=c.forwardRef((e,r)=>{const{__scopeSwitch:t,...a}=e,s=ie(G,t);return o.jsx(X.span,{"data-state":K(s.checked),"data-disabled":s.disabled?"":void 0,...a,ref:r})});J.displayName=G;var de=e=>{const{control:r,checked:t,bubbles:a=!0,...s}=e,d=c.useRef(null),l=re(t),n=ne(r);return c.useEffect(()=>{const i=d.current,S=window.HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(S,"checked").set;if(l!==t&&u){const y=new Event("click",{bubbles:a});u.call(i,t),i.dispatchEvent(y)}},[l,t,a]),o.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...s,tabIndex:-1,ref:d,style:{...e.style,...n,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function K(e){return e?"checked":"unchecked"}var ue=$,me=J;const pe="_small_1hipw_28",he="_medium_1hipw_32",fe="_large_1hipw_36",ge="_thumb_1hipw_44",T={switch:"_switch_1hipw_5",small:pe,medium:he,large:fe,thumb:ge},ve=({value:e,defaultValue:r,size:t="medium",onChange:a,"data-test-id":s="fondue-switch","aria-label":d="Switch",...l},n)=>{const i=oe([T.switch,T[t]]);return o.jsx(ue,{ref:n,checked:e,defaultChecked:r,className:i,onCheckedChange:a,"aria-label":d,"data-test-id":s,...l,children:o.jsx(me,{className:T.thumb})})},k=c.forwardRef(ve);k.displayName="Switch";k.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The size of the switch component.
@default medium`,defaultValue:{value:"'medium'",computed:!1}},value:{required:!1,tsType:{name:"boolean"},description:`The active value in the select component. This is used to control the select externally.
@default false`},defaultValue:{required:!1,tsType:{name:"boolean"},description:`The default value of the select component. Used for uncontrolled usages.
@default false`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disables the select component.
@default false`},required:{required:!1,tsType:{name:"boolean"},description:`Whether the switch is required.
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:`Callback function that is called when the switch is toggled.
@param checked - The new checked state of the switch`},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is blurred
@param event - The event object`},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is focused
@param event - The event object`},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-switch'",computed:!1}},"aria-label":{defaultValue:{value:"'Switch'",computed:!1},required:!1}}};const Pe={component:k,tags:["autodocs"],parameters:{status:{type:"in_progress"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"}},h={args:{defaultValue:!0}},f={args:{defaultValue:!1}},g={args:{defaultValue:!1,disabled:!0}},v={args:{defaultValue:!1,required:!0}},b={render:e=>{const[r,t]=c.useState(!1),a=s=>{t(s)};return o.jsx(k,{value:r,onChange:a,...e})}},w={args:{defaultValue:!1,size:"small"}};var q,P,V;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(V=(P=h.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var j,R,B;f.parameters={...f.parameters,docs:{...(j=f.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(B=(R=f.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var H,M,z;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(z=(M=g.parameters)==null?void 0:M.docs)==null?void 0:z.source}}};var F,N,L;v.parameters={...v.parameters,docs:{...(F=v.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(L=(N=v.parameters)==null?void 0:N.docs)==null?void 0:L.source}}};var I,D,U;b.parameters={...b.parameters,docs:{...(I=b.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(U=(D=b.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var O,A,W;w.parameters={...w.parameters,docs:{...(O=w.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'small'
  }
}`,...(W=(A=w.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};const Ve=["Checked","Unchecked","Disabled","Required","ExternallyControlled","Size"];export{h as Checked,g as Disabled,b as ExternallyControlled,v as Required,w as Size,f as Unchecked,Ve as __namedExportsOrder,Pe as default};
