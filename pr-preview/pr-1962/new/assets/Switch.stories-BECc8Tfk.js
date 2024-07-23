import{j as o}from"./jsx-runtime-DBEcOq3S.js";import{r as c}from"./index-DtJulBIN.js";import{u as ge,c as be}from"./index-DYI_kRwo.js";import{u as ve,P as le}from"./index-B6WxdOXM.js";import{c as Se}from"./index-P-l_ls5c.js";import{u as we}from"./index-BRCTM6zp.js";import{u as ye}from"./index-CMjj8zSi.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DD2ZIxVL.js";var V="Switch",[ke,Ae]=Se(V),[Ce,Te]=ke(V),ie=c.forwardRef((e,s)=>{const{__scopeSwitch:t,name:a,checked:r,defaultChecked:d,required:l,disabled:n,value:i="on",onCheckedChange:m,...z}=e,[u,x]=c.useState(null),pe=ve(s,h=>x(h)),q=c.useRef(!1),P=u?!!u.closest("form"):!0,[p=!1,he]=ge({prop:r,defaultProp:d,onChange:m});return o.jsxs(Ce,{scope:t,checked:p,disabled:n,children:[o.jsx(le.button,{type:"button",role:"switch","aria-checked":p,"aria-required":l,"data-state":me(p),"data-disabled":n?"":void 0,disabled:n,value:i,...z,ref:pe,onClick:be(e.onClick,h=>{he(fe=>!fe),P&&(q.current=h.isPropagationStopped(),q.current||h.stopPropagation())})}),P&&o.jsx(_e,{control:u,bubbles:!q.current,name:a,value:i,checked:p,required:l,disabled:n,style:{transform:"translateX(-100%)"}})]})});ie.displayName=V;var de="SwitchThumb",ue=c.forwardRef((e,s)=>{const{__scopeSwitch:t,...a}=e,r=Te(de,t);return o.jsx(le.span,{"data-state":me(r.checked),"data-disabled":r.disabled?"":void 0,...a,ref:s})});ue.displayName=de;var _e=e=>{const{control:s,checked:t,bubbles:a=!0,...r}=e,d=c.useRef(null),l=we(t),n=ye(s);return c.useEffect(()=>{const i=d.current,m=window.HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(m,"checked").set;if(l!==t&&u){const x=new Event("click",{bubbles:a});u.call(i,t),i.dispatchEvent(x)}},[l,t,a]),o.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...r,tabIndex:-1,ref:d,style:{...e.style,...n,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function me(e){return e?"checked":"unchecked"}var Ee=ie,xe=ue;const qe="_root_19pm0_5",Ve="_indeterminate_19pm0_33",ze="_thumb_19pm0_36",Pe="_small_19pm0_50",je="_medium_19pm0_54",He="_large_19pm0_58",Me="_fullwidth_19pm0_62",f={root:qe,indeterminate:Ve,thumb:ze,small:Pe,medium:je,large:He,fullwidth:Me},Re=({value:e,defaultValue:s,size:t="medium",hugWidth:a=!1,onChange:r,"data-test-id":d="fondue-switch","aria-label":l="Switch",...n},i)=>{const m=[f.root,f[t],a&&f.fullwidth].join(" ");return o.jsx(Ee,{ref:i,checked:e,defaultChecked:s,className:m,onCheckedChange:r,"aria-label":l,"data-test-id":d,...n,children:o.jsx(xe,{className:f.thumb})})},E=c.forwardRef(Re);E.displayName="Switch";E.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"The size of the switch component.",defaultValue:{value:"'medium'",computed:!1}},hugWidth:{required:!1,tsType:{name:"boolean"},description:"Whether the switch should be full width.",defaultValue:{value:"false",computed:!1}},value:{required:!1,tsType:{name:"boolean"},description:"The active value in the select component. This is used to control the select externally."},defaultValue:{required:!1,tsType:{name:"boolean"},description:"The default value of the select component. Used for uncontrolled usages."},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the select component."},required:{required:!1,tsType:{name:"boolean"},description:"Whether the switch is required."},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:"Callback function that is called when the switch is toggled."},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:"Event handler called when the checkbox is blurred"},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:"Event handler called when the checkbox is focused"},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-switch'",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Switch'",computed:!1}},"aria-labelledby":{required:!1,tsType:{name:"string"},description:""},"aria-describedby":{required:!1,tsType:{name:"string"},description:""}}};const Xe={component:E,tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"}},g={args:{defaultValue:!0}},b={args:{defaultValue:!1}},v={args:{defaultValue:!1,disabled:!0}},S={args:{defaultValue:!1,required:!0}},w={args:{}},y={render:e=>{const[s,t]=c.useState(!1),a=r=>{t(r)};return o.jsx(E,{value:s,onChange:a,...e})}},k={args:{defaultValue:!1,hugWidth:!0}},C={args:{defaultValue:!1,size:"small"}},T={args:{defaultValue:!1,size:"medium"}},_={args:{defaultValue:!1,size:"large"}};var j,H,M;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(M=(H=g.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var R,B,L;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(L=(B=b.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var F,N,W;v.parameters={...v.parameters,docs:{...(F=v.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(W=(N=v.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var I,D,U;S.parameters={...S.parameters,docs:{...(I=S.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(U=(D=S.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var O,A,X;w.parameters={...w.parameters,docs:{...(O=w.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {}
}`,...(X=(A=w.parameters)==null?void 0:A.docs)==null?void 0:X.source}}};var $,G,J;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(J=(G=y.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,Y;k.parameters={...k.parameters,docs:{...(K=k.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    hugWidth: true
  }
}`,...(Y=(Q=k.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};var Z,ee,te;C.parameters={...C.parameters,docs:{...(Z=C.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'small'
  }
}`,...(te=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,re,se;T.parameters={...T.parameters,docs:{...(ae=T.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'medium'
  }
}`,...(se=(re=T.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ne,oe,ce;_.parameters={..._.parameters,docs:{...(ne=_.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'large'
  }
}`,...(ce=(oe=_.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};const $e=["Checked","Unchecked","Disabled","Required","Indeterminate","ExternallyControlled","HugWidth","SizeSmall","SizeMedium","SizeLarge"];export{g as Checked,v as Disabled,y as ExternallyControlled,k as HugWidth,w as Indeterminate,S as Required,_ as SizeLarge,T as SizeMedium,C as SizeSmall,b as Unchecked,$e as __namedExportsOrder,Xe as default};
