import{j as o}from"./jsx-runtime-DBEcOq3S.js";import{r as c}from"./index-DtJulBIN.js";import{u as ee,c as te}from"./index-DYI_kRwo.js";import{u as ae,P as X}from"./index-B6WxdOXM.js";import{c as re}from"./index-P-l_ls5c.js";import{u as se}from"./index-BRCTM6zp.js";import{u as ne}from"./index-CMjj8zSi.js";import{c as oe}from"./styleUtilities-T76WvCte.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DD2ZIxVL.js";var E="Switch",[ce,Pe]=re(E),[le,ie]=ce(E),$=c.forwardRef((e,s)=>{const{__scopeSwitch:t,name:a,checked:r,defaultChecked:d,required:l,disabled:n,value:i="on",onCheckedChange:S,..._}=e,[u,y]=c.useState(null),Q=ae(s,p=>y(p)),C=c.useRef(!1),x=u?!!u.closest("form"):!0,[m=!1,Y]=ee({prop:r,defaultProp:d,onChange:S});return o.jsxs(le,{scope:t,checked:m,disabled:n,children:[o.jsx(X.button,{type:"button",role:"switch","aria-checked":m,"aria-required":l,"data-state":K(m),"data-disabled":n?"":void 0,disabled:n,value:i,..._,ref:Q,onClick:te(e.onClick,p=>{Y(Z=>!Z),x&&(C.current=p.isPropagationStopped(),C.current||p.stopPropagation())})}),x&&o.jsx(de,{control:u,bubbles:!C.current,name:a,value:i,checked:m,required:l,disabled:n,style:{transform:"translateX(-100%)"}})]})});$.displayName=E;var G="SwitchThumb",J=c.forwardRef((e,s)=>{const{__scopeSwitch:t,...a}=e,r=ie(G,t);return o.jsx(X.span,{"data-state":K(r.checked),"data-disabled":r.disabled?"":void 0,...a,ref:s})});J.displayName=G;var de=e=>{const{control:s,checked:t,bubbles:a=!0,...r}=e,d=c.useRef(null),l=se(t),n=ne(s);return c.useEffect(()=>{const i=d.current,S=window.HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(S,"checked").set;if(l!==t&&u){const y=new Event("click",{bubbles:a});u.call(i,t),i.dispatchEvent(y)}},[l,t,a]),o.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...r,tabIndex:-1,ref:d,style:{...e.style,...n,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function K(e){return e?"checked":"unchecked"}var ue=$,me=J;const pe="_root_1eprm_5",he="_small_1eprm_28",fe="_medium_1eprm_32",ge="_large_1eprm_36",ve="_thumb_1eprm_44",T={root:pe,small:he,medium:fe,large:ge,thumb:ve},be=({value:e,defaultValue:s,size:t="medium",onChange:a,"data-test-id":r="fondue-switch","aria-label":d="Switch",...l},n)=>{const i=oe([T.root,T[t]]);return o.jsx(ue,{ref:n,checked:e,defaultChecked:s,className:i,onCheckedChange:a,"aria-label":d,"data-test-id":r,...l,children:o.jsx(me,{className:T.thumb})})},k=c.forwardRef(be);k.displayName="Switch";k.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The size of the switch component.
@default medium`,defaultValue:{value:"'medium'",computed:!1}},value:{required:!1,tsType:{name:"boolean"},description:`The active value in the select component. This is used to control the select externally.
@default false`},defaultValue:{required:!1,tsType:{name:"boolean"},description:`The default value of the select component. Used for uncontrolled usages.
@default false`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disables the select component.
@default false`},required:{required:!1,tsType:{name:"boolean"},description:`Whether the switch is required.
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:`Callback function that is called when the switch is toggled.
@param checked - The new checked state of the switch`},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is blurred
@param event - The event object`},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is focused
@param event - The event object`},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-switch'",computed:!1}},"aria-label":{defaultValue:{value:"'Switch'",computed:!1},required:!1}}};const Ve={component:k,tags:["autodocs"],parameters:{status:{type:"in_progress"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"}},h={args:{defaultValue:!0}},f={args:{defaultValue:!1}},g={args:{defaultValue:!1,disabled:!0}},v={args:{defaultValue:!1,required:!0}},b={render:e=>{const[s,t]=c.useState(!1),a=r=>{t(r)};return o.jsx(k,{value:s,onChange:a,...e})}},w={args:{defaultValue:!1,size:"small"}};var q,P,V;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(W=(A=w.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};const je=["Checked","Unchecked","Disabled","Required","ExternallyControlled","Size"];export{h as Checked,g as Disabled,b as ExternallyControlled,v as Required,w as Size,f as Unchecked,je as __namedExportsOrder,Ve as default};
