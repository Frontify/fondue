import{j as o}from"./jsx-runtime-DBEcOq3S.js";import{r as c}from"./index-DtJulBIN.js";import{u as me,c as pe}from"./index-DYI_kRwo.js";import{u as he,P as se}from"./index-B6WxdOXM.js";import{c as fe}from"./index-P-l_ls5c.js";import{u as ge}from"./index-BRCTM6zp.js";import{u as we}from"./index-CMjj8zSi.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DD2ZIxVL.js";var z="Switch",[be,We]=fe(z),[ve,Se]=be(z),ne=c.forwardRef((e,s)=>{const{__scopeSwitch:t,name:a,checked:r,defaultChecked:u,required:l,disabled:n,value:i="on",onCheckedChange:m,...q}=e,[d,E]=c.useState(null),ie=he(s,h=>E(h)),x=c.useRef(!1),V=d?!!d.closest("form"):!0,[p=!1,ue]=me({prop:r,defaultProp:u,onChange:m});return o.jsxs(ve,{scope:t,checked:p,disabled:n,children:[o.jsx(se.button,{type:"button",role:"switch","aria-checked":p,"aria-required":l,"data-state":le(p),"data-disabled":n?"":void 0,disabled:n,value:i,...q,ref:ie,onClick:pe(e.onClick,h=>{ue(de=>!de),V&&(x.current=h.isPropagationStopped(),x.current||h.stopPropagation())})}),V&&o.jsx(ye,{control:d,bubbles:!x.current,name:a,value:i,checked:p,required:l,disabled:n,style:{transform:"translateX(-100%)"}})]})});ne.displayName=z;var oe="SwitchThumb",ce=c.forwardRef((e,s)=>{const{__scopeSwitch:t,...a}=e,r=Se(oe,t);return o.jsx(se.span,{"data-state":le(r.checked),"data-disabled":r.disabled?"":void 0,...a,ref:s})});ce.displayName=oe;var ye=e=>{const{control:s,checked:t,bubbles:a=!0,...r}=e,u=c.useRef(null),l=ge(t),n=we(s);return c.useEffect(()=>{const i=u.current,m=window.HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(m,"checked").set;if(l!==t&&d){const E=new Event("click",{bubbles:a});d.call(i,t),i.dispatchEvent(E)}},[l,t,a]),o.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...r,tabIndex:-1,ref:u,style:{...e.style,...n,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function le(e){return e?"checked":"unchecked"}var ke=ne,Ce=ce;const _e="_root_1yiwz_5",Te="_indeterminate_1yiwz_33",Ee="_thumb_1yiwz_36",xe="_small_1yiwz_50",ze="_medium_1yiwz_54",qe="_large_1yiwz_58",Ve="_fullwidth_1yiwz_62",f={root:_e,indeterminate:Te,thumb:Ee,small:xe,medium:ze,large:qe,fullwidth:Ve},Pe=({value:e,defaultValue:s,size:t="medium",hug:a=!1,onChange:r,"data-test-id":u="fondue-switch","aria-label":l="Switch",...n},i)=>{const m=[f.root,f[t],a&&f.fullwidth].join(" ");return o.jsx(ke,{ref:i,checked:e,defaultChecked:s,className:m,onCheckedChange:r,"aria-label":l,"data-test-id":u,...n,children:o.jsx(Ce,{className:f.thumb})})},T=c.forwardRef(Pe);T.displayName="Switch";T.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"The size of the switch component.",defaultValue:{value:"'medium'",computed:!1}},hug:{required:!1,tsType:{name:"boolean"},description:"Whether the switch should be full width.",defaultValue:{value:"false",computed:!1}},value:{required:!1,tsType:{name:"boolean"},description:"The active value in the select component. This is used to control the select externally."},defaultValue:{required:!1,tsType:{name:"boolean"},description:"The default value of the select component. Used for uncontrolled usages."},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the select component."},required:{required:!1,tsType:{name:"boolean"},description:"Whether the switch is required."},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:"Callback function that is called when the switch is toggled."},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:"Event handler called when the checkbox is blurred"},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:"Event handler called when the checkbox is focused"},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-switch'",computed:!1}},"aria-label":{defaultValue:{value:"'Switch'",computed:!1},required:!1}}};const De={component:T,tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"}},g={args:{defaultValue:!0}},w={args:{defaultValue:!1}},b={args:{defaultValue:!1,disabled:!0}},v={args:{defaultValue:!1,required:!0}},S={render:e=>{const[s,t]=c.useState(!1),a=r=>{t(r)};return o.jsx(T,{value:s,onChange:a,...e})}},y={args:{defaultValue:!1,hug:!0}},k={args:{defaultValue:!1,size:"small"}},C={args:{defaultValue:!1,size:"medium"}},_={args:{defaultValue:!1,size:"large"}};var P,j,H;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(H=(j=g.parameters)==null?void 0:j.docs)==null?void 0:H.source}}};var M,R,B;w.parameters={...w.parameters,docs:{...(M=w.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(B=(R=w.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var L,F,N;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(N=(F=b.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var I,W,D;v.parameters={...v.parameters,docs:{...(I=v.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(D=(W=v.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var U,O,A;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(A=(O=S.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var X,$,G;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    hug: true
  }
}`,...(G=($=y.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var J,K,Q;k.parameters={...k.parameters,docs:{...(J=k.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'small'
  }
}`,...(Q=(K=k.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var Y,Z,ee;C.parameters={...C.parameters,docs:{...(Y=C.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'medium'
  }
}`,...(ee=(Z=C.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ae,re;_.parameters={..._.parameters,docs:{...(te=_.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'large'
  }
}`,...(re=(ae=_.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};const Ue=["Checked","Unchecked","Disabled","Required","ExternallyControlled","HugWidth","SizeSmall","SizeMedium","SizeLarge"];export{g as Checked,b as Disabled,S as ExternallyControlled,y as HugWidth,v as Required,_ as SizeLarge,C as SizeMedium,k as SizeSmall,w as Unchecked,Ue as __namedExportsOrder,De as default};
