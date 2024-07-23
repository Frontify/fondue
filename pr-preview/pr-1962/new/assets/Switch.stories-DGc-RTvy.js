import{j as e}from"./jsx-runtime-DBEcOq3S.js";import{r as l}from"./index-DtJulBIN.js";import{b as de}from"./fondue-icons311-DLInLznX.js";import{L as te}from"./Label-BEgfzlhL.js";import{T as j}from"./Tooltip-iErnfzB3.js";import{u as ue,c as me}from"./index-DYI_kRwo.js";import{u as pe,P as ae}from"./index-B6WxdOXM.js";import{c as he}from"./index-P-l_ls5c.js";import{u as fe}from"./index-BRCTM6zp.js";import{u as ge}from"./index-CMjj8zSi.js";import{c as be}from"./styleUtilities-T76WvCte.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-Ddz0BVCY.js";import"./index-DD2ZIxVL.js";import"./index-DBH0Kh6a.js";import"./index-jbnhK9sQ.js";import"./index-BK_vzMtd.js";var _="Switch",[we,Qe]=he(_),[ve,Se]=we(_),re=l.forwardRef((t,n)=>{const{__scopeSwitch:a,name:r,checked:s,defaultChecked:u,required:c,disabled:i,value:d="on",onCheckedChange:x,...q}=t,[m,y]=l.useState(null),ie=pe(n,h=>y(h)),C=l.useRef(!1),L=m?!!m.closest("form"):!0,[p=!1,le]=ue({prop:s,defaultProp:u,onChange:x});return e.jsxs(ve,{scope:a,checked:p,disabled:i,children:[e.jsx(ae.button,{type:"button",role:"switch","aria-checked":p,"aria-required":c,"data-state":oe(p),"data-disabled":i?"":void 0,disabled:i,value:d,...q,ref:ie,onClick:me(t.onClick,h=>{le(ce=>!ce),L&&(C.current=h.isPropagationStopped(),C.current||h.stopPropagation())})}),L&&e.jsx(ke,{control:m,bubbles:!C.current,name:r,value:d,checked:p,required:c,disabled:i,style:{transform:"translateX(-100%)"}})]})});re.displayName=_;var se="SwitchThumb",ne=l.forwardRef((t,n)=>{const{__scopeSwitch:a,...r}=t,s=Se(se,a);return e.jsx(ae.span,{"data-state":oe(s.checked),"data-disabled":s.disabled?"":void 0,...r,ref:n})});ne.displayName=se;var ke=t=>{const{control:n,checked:a,bubbles:r=!0,...s}=t,u=l.useRef(null),c=fe(a),i=ge(n);return l.useEffect(()=>{const d=u.current,x=window.HTMLInputElement.prototype,m=Object.getOwnPropertyDescriptor(x,"checked").set;if(c!==a&&m){const y=new Event("click",{bubbles:r});m.call(d,a),d.dispatchEvent(y)}},[c,a,r]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:a,...s,tabIndex:-1,ref:u,style:{...t.style,...i,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function oe(t){return t?"checked":"unchecked"}var Te=re,xe=ne;const ye="_small_1hk73_28",Ce="_medium_1hk73_32",je="_large_1hk73_36",Ee="_thumb_1hk73_44",E={switch:"_switch_1hk73_5",small:ye,medium:Ce,large:je,thumb:Ee},_e=({value:t,defaultValue:n,size:a="medium",onChange:r,"data-test-id":s="fondue-switch","aria-label":u="Switch",...c},i)=>{const d=be([E.switch,E[a]]);return e.jsx(Te,{ref:i,checked:t,defaultChecked:n,className:d,onCheckedChange:r,"aria-label":u,"data-test-id":s,...c,children:e.jsx(xe,{className:E.thumb})})},o=l.forwardRef(_e);o.displayName="Switch";o.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The size of the switch component.
@default medium`,defaultValue:{value:"'medium'",computed:!1}},value:{required:!1,tsType:{name:"boolean"},description:`The active value in the select component. This is used to control the select externally.
@default false`},defaultValue:{required:!1,tsType:{name:"boolean"},description:`The default value of the select component. Used for uncontrolled usages.
@default false`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disables the select component.
@default false`},required:{required:!1,tsType:{name:"boolean"},description:`Whether the switch is required.
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:`Callback function that is called when the switch is toggled.
@param checked - The new checked state of the switch`},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is blurred
@param event - The event object`},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is focused
@param event - The event object`},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-switch'",computed:!1}},"aria-label":{defaultValue:{value:"'Switch'",computed:!1},required:!1}}};const Xe={component:o,tags:["autodocs"],parameters:{status:{type:"in_progress"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"}},f={args:{defaultValue:!0}},g={args:{defaultValue:!1}},b={args:{defaultValue:!1,disabled:!0}},w={args:{defaultValue:!1,required:!0}},v={render:t=>e.jsxs("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:[e.jsx(te,{id:"label",htmlFor:"switch",children:"Switch"}),e.jsx(o,{...t,id:"switch","aria-labelledby":"label"})]})},S={render:t=>e.jsxs("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:[e.jsxs(te,{id:"label",htmlFor:"switch",children:["Switch",e.jsxs(j.Root,{children:[e.jsx(j.Trigger,{children:e.jsx(de,{size:"16"})}),e.jsx(j.Content,{children:"Tooltip"})]})]}),e.jsx(o,{...t,id:"switch","aria-labelledby":"label"})]})},k={render:t=>{const[n,a]=l.useState(!1),r=s=>{a(s)};return e.jsx(o,{value:n,onChange:r,...t})}},T={render:t=>e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[e.jsx(o,{...t,size:"small"}),e.jsx(o,{...t,size:"medium"}),e.jsx(o,{...t,size:"large"})]})};var z,R,P;f.parameters={...f.parameters,docs:{...(z=f.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(P=(R=f.parameters)==null?void 0:R.docs)==null?void 0:P.source}}};var F,N,V;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(V=(N=g.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var B,M,H;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(H=(M=b.parameters)==null?void 0:M.docs)==null?void 0:H.source}}};var I,W,A;w.parameters={...w.parameters,docs:{...(I=w.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(A=(W=w.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};var D,U,O;v.parameters={...v.parameters,docs:{...(D=v.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-gap-1.5 tw-items-center">
            <Label id="label" htmlFor="switch">
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </div>
}`,...(O=(U=v.parameters)==null?void 0:U.docs)==null?void 0:O.source}}};var Q,X,$;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-gap-1.5 tw-items-center">
            <Label id="label" htmlFor="switch">
                Switch
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconQuestionMarkCircle size="16" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>Tooltip</Tooltip.Content>
                </Tooltip.Root>
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </div>
}`,...($=(X=S.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var G,J,K;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(K=(J=k.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Y,Z,ee;T.parameters={...T.parameters,docs:{...(Y=T.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </div>
}`,...(ee=(Z=T.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};const $e=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelAndTooltip","ExternallyControlled","Size"];export{f as Checked,b as Disabled,k as ExternallyControlled,w as Required,T as Size,g as Unchecked,v as WithLabel,S as WithLabelAndTooltip,$e as __namedExportsOrder,Xe as default};
