import{j as l}from"./jsx-runtime-DBEcOq3S.js";import{r as n}from"./index-DtJulBIN.js";import{u as ge,c as be}from"./index-DYI_kRwo.js";import{u as Se,P as ie}from"./index-B6WxdOXM.js";import{c as we}from"./index-P-l_ls5c.js";import{u as ke}from"./index-BRCTM6zp.js";import{u as Ce}from"./index-CMjj8zSi.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DD2ZIxVL.js";var E="Switch",[ve,Fe]=we(E),[_e,ye]=ve(E),de=n.forwardRef((e,r)=>{const{__scopeSwitch:t,name:a,checked:s,defaultChecked:u,required:i,disabled:c,value:d="on",onCheckedChange:m,...g}=e,[o,p]=n.useState(null),P=Se(r,S=>p(S)),h=n.useRef(!1),j=o?!!o.closest("form"):!0,[b=!1,he]=ge({prop:s,defaultProp:u,onChange:m});return l.jsxs(_e,{scope:t,checked:b,disabled:c,children:[l.jsx(ie.button,{type:"button",role:"switch","aria-checked":b,"aria-required":i,"data-state":pe(b),"data-disabled":c?"":void 0,disabled:c,value:d,...g,ref:P,onClick:be(e.onClick,S=>{he(fe=>!fe),j&&(h.current=S.isPropagationStopped(),h.current||S.stopPropagation())})}),j&&l.jsx(Te,{control:o,bubbles:!h.current,name:a,value:d,checked:b,required:i,disabled:c,style:{transform:"translateX(-100%)"}})]})});de.displayName=E;var ue="SwitchThumb",me=n.forwardRef((e,r)=>{const{__scopeSwitch:t,...a}=e,s=ye(ue,t);return l.jsx(ie.span,{"data-state":pe(s.checked),"data-disabled":s.disabled?"":void 0,...a,ref:r})});me.displayName=ue;var Te=e=>{const{control:r,checked:t,bubbles:a=!0,...s}=e,u=n.useRef(null),i=ke(t),c=Ce(r);return n.useEffect(()=>{const d=u.current,m=window.HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(m,"checked").set;if(i!==t&&o){const p=new Event("click",{bubbles:a});o.call(d,t),d.dispatchEvent(p)}},[i,t,a]),l.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...s,tabIndex:-1,ref:u,style:{...e.style,...c,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function pe(e){return e?"checked":"unchecked"}var xe=de,Ve=me;const qe="_root_19pm0_5",ze="_indeterminate_19pm0_33",Pe="_thumb_19pm0_36",Ee="_small_19pm0_50",je="_medium_19pm0_54",Re="_large_19pm0_58",Ie="_fullwidth_19pm0_62",f={root:qe,indeterminate:ze,thumb:Pe,small:Ee,medium:je,large:Re,fullwidth:Ie},Ne=({value:e,defaultValue:r,size:t="medium",hugWidth:a=!1,onChange:s,"data-test-id":u="fondue-switch","aria-label":i="Switch",...c},d)=>{const[m,g]=n.useState(r),o=e===void 0&&m===void 0,p=[f.root,f[t],a&&f.fullwidth,o&&f.indeterminate].join(" "),P=h=>{h.stopPropagation(),o&&g(!0)};return l.jsx(xe,{ref:d,checked:e,defaultChecked:m,className:p,onCheckedChange:s,onClick:P,"aria-label":i,"data-test-id":u,...c,children:l.jsx(Ve,{className:f.thumb})})},z=n.forwardRef(Ne);z.displayName="Switch";z.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"The size of the switch component.",defaultValue:{value:"'medium'",computed:!1}},hugWidth:{required:!1,tsType:{name:"boolean"},description:"Whether the switch should be full width.",defaultValue:{value:"false",computed:!1}},value:{required:!1,tsType:{name:"boolean"},description:"The active value in the select component. This is used to control the select externally."},defaultValue:{required:!1,tsType:{name:"boolean"},description:"The default value of the select component. Used for uncontrolled usages."},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the select component."},required:{required:!1,tsType:{name:"boolean"},description:"Whether the switch is required."},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:"Callback function that is called when the switch is toggled."},"aria-label":{required:!1,tsType:{name:"string"},description:"The aria label of the select component.",defaultValue:{value:"'Switch'",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The data test id of the select component.",defaultValue:{value:"'fondue-switch'",computed:!1}}}};const Xe={component:z,tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"}},w={args:{defaultValue:!0}},k={args:{defaultValue:!1}},C={args:{defaultValue:!1,disabled:!0}},v={args:{defaultValue:!1,required:!0}},_={args:{}},y={render:e=>{const[r,t]=n.useState(!1),a=s=>{t(s)};return l.jsx(z,{value:r,onChange:a,...e})}},T={args:{defaultValue:!1,hugWidth:!0}},x={args:{defaultValue:!1,size:"small"}},V={args:{defaultValue:!1,size:"medium"}},q={args:{defaultValue:!1,size:"large"}};var R,I,N;w.parameters={...w.parameters,docs:{...(R=w.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(N=(I=w.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var W,H,M;k.parameters={...k.parameters,docs:{...(W=k.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(M=(H=k.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var D,B,U;C.parameters={...C.parameters,docs:{...(D=C.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(U=(B=C.parameters)==null?void 0:B.docs)==null?void 0:U.source}}};var L,O,A;v.parameters={...v.parameters,docs:{...(L=v.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(A=(O=v.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var F,X,$;_.parameters={..._.parameters,docs:{...(F=_.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {}
}`,...($=(X=_.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var G,J,K;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(K=(J=y.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,Y,Z;T.parameters={...T.parameters,docs:{...(Q=T.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    hugWidth: true
  }
}`,...(Z=(Y=T.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,te,ae;x.parameters={...x.parameters,docs:{...(ee=x.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'small'
  }
}`,...(ae=(te=x.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var se,re,oe;V.parameters={...V.parameters,docs:{...(se=V.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'medium'
  }
}`,...(oe=(re=V.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var ne,ce,le;q.parameters={...q.parameters,docs:{...(ne=q.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    size: 'large'
  }
}`,...(le=(ce=q.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};const $e=["Checked","Unchecked","Disabled","Required","Indeterminate","ExternallyControlled","HugWidth","SizeSmall","SizeMedium","SizeLarge"];export{w as Checked,C as Disabled,y as ExternallyControlled,T as HugWidth,_ as Indeterminate,v as Required,q as SizeLarge,V as SizeMedium,x as SizeSmall,k as Unchecked,$e as __namedExportsOrder,Xe as default};
