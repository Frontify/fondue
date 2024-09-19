import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as i}from"./index-BwDkhjyp.js";import{b as de}from"./fondue-icons326-DXd15KB3.js";import{L as te}from"./Label-DGO3QOB6.js";import{T as j}from"./Tooltip-DvWejVSX.js";import{c as ue}from"./index-DOnKqARA.js";import{u as me,P as ae}from"./index-Brw_kfkv.js";import{c as pe}from"./index-BWD2N0gV.js";import{u as he}from"./index-DGaPG0k3.js";import{u as fe}from"./index-BgCrdp81.js";import{u as be}from"./index-kUwV4muI.js";import{c as ge}from"./styleUtilities-BnElyh0X.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-9q6yCIGA.js";import"./index-DxjWwZXO.js";import"./index-DduqEaLY.js";import"./index-BwIM2_zL.js";var _="Switch",[we,Xe]=pe(_),[ve,Se]=we(_),re=i.forwardRef((t,n)=>{const{__scopeSwitch:a,name:r,checked:s,defaultChecked:d,required:l,disabled:c,value:m="on",onCheckedChange:x,...q}=t,[u,y]=i.useState(null),ce=me(n,h=>y(h)),C=i.useRef(!1),L=u?!!u.closest("form"):!0,[p=!1,ie]=he({prop:s,defaultProp:d,onChange:x});return e.jsxs(ve,{scope:a,checked:p,disabled:c,children:[e.jsx(ae.button,{type:"button",role:"switch","aria-checked":p,"aria-required":l,"data-state":oe(p),"data-disabled":c?"":void 0,disabled:c,value:m,...q,ref:ce,onClick:ue(t.onClick,h=>{ie(le=>!le),L&&(C.current=h.isPropagationStopped(),C.current||h.stopPropagation())})}),L&&e.jsx(Te,{control:u,bubbles:!C.current,name:r,value:m,checked:p,required:l,disabled:c,style:{transform:"translateX(-100%)"}})]})});re.displayName=_;var se="SwitchThumb",ne=i.forwardRef((t,n)=>{const{__scopeSwitch:a,...r}=t,s=Se(se,a);return e.jsx(ae.span,{"data-state":oe(s.checked),"data-disabled":s.disabled?"":void 0,...r,ref:n})});ne.displayName=se;var Te=t=>{const{control:n,checked:a,bubbles:r=!0,...s}=t,d=i.useRef(null),l=fe(a),c=be(n);return i.useEffect(()=>{const m=d.current,x=window.HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(x,"checked").set;if(l!==a&&u){const y=new Event("click",{bubbles:r});u.call(m,a),m.dispatchEvent(y)}},[l,a,r]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:a,...s,tabIndex:-1,ref:d,style:{...t.style,...c,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function oe(t){return t?"checked":"unchecked"}var ke=re,xe=ne;const ye="_root_b6n55_5",Ce="_small_b6n55_27",je="_medium_b6n55_31",Ee="_large_b6n55_35",_e="_thumb_b6n55_49",E={root:ye,small:Ce,medium:je,large:Ee,thumb:_e},qe=({value:t,defaultValue:n,size:a="medium",onChange:r,"data-test-id":s="fondue-switch","aria-label":d="Switch",...l},c)=>e.jsx(ke,{ref:c,checked:t,defaultChecked:n,className:ge([E.root,E[a]]),onCheckedChange:r,"aria-label":d,"data-test-id":s,...l,children:e.jsx(xe,{className:E.thumb})}),o=i.forwardRef(qe);o.displayName="Switch";o.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{id:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The size of the switch component.
@default medium`,defaultValue:{value:"'medium'",computed:!1}},value:{required:!1,tsType:{name:"boolean"},description:`The active value in the select component. This is used to control the select externally.
@default false`},defaultValue:{required:!1,tsType:{name:"boolean"},description:`The default value of the select component. Used for uncontrolled usages.
@default false`},disabled:{required:!1,tsType:{name:"boolean"},description:`Disables the select component.
@default false`},required:{required:!1,tsType:{name:"boolean"},description:`Whether the switch is required.
@default false`},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:`Callback function that is called when the switch is toggled.
@param checked - The new checked state of the switch`},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is blurred
@param event - The event object`},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLButtonElement"}],raw:"FormEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:`Event handler called when the checkbox is focused
@param event - The event object`},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-switch'",computed:!1}},"aria-label":{defaultValue:{value:"'Switch'",computed:!1},required:!1}}};const $e={component:o,tags:["autodocs"],parameters:{status:{type:"in_progress"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"},decorators:[t=>e.jsx("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:e.jsx(t,{})})]},f={args:{defaultValue:!0}},b={args:{defaultValue:!1}},g={args:{defaultValue:!1,disabled:!0}},w={args:{defaultValue:!1,required:!0}},v={render:t=>e.jsxs(e.Fragment,{children:[e.jsx(te,{id:"label",htmlFor:"switch",children:"Switch"}),e.jsx(o,{...t,id:"switch","aria-labelledby":"label"})]})},S={render:t=>e.jsxs(e.Fragment,{children:[e.jsxs(te,{id:"label",htmlFor:"switch",children:["Switch",e.jsxs(j.Root,{children:[e.jsx(j.Trigger,{children:e.jsx(de,{size:"16"})}),e.jsx(j.Content,{children:"Tooltip"})]})]}),e.jsx(o,{...t,id:"switch","aria-labelledby":"label"})]})},T={render:t=>{const[n,a]=i.useState(!1),r=s=>{a(s)};return e.jsx(o,{value:n,onChange:r,...t})}},k={render:t=>e.jsxs(e.Fragment,{children:[e.jsx(o,{...t,size:"small"}),e.jsx(o,{...t,size:"medium"}),e.jsx(o,{...t,size:"large"})]})};var z,F,R;f.parameters={...f.parameters,docs:{...(z=f.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(R=(F=f.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var P,V,B;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(B=(V=b.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};var M,H,N;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(N=(H=g.parameters)==null?void 0:H.docs)==null?void 0:N.source}}};var I,W,A;w.parameters={...w.parameters,docs:{...(I=w.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(A=(W=w.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};var D,U,O;v.parameters={...v.parameters,docs:{...(D=v.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch">
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(O=(U=v.parameters)==null?void 0:U.docs)==null?void 0:O.source}}};var Q,X,$;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <>
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
        </>
}`,...($=(X=S.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var G,J,K;T.parameters={...T.parameters,docs:{...(G=T.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(K=(J=T.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Y,Z,ee;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => <>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </>
}`,...(ee=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};const Ge=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelAndTooltip","ExternallyControlled","Size"];export{f as Checked,g as Disabled,T as ExternallyControlled,w as Required,k as Size,b as Unchecked,v as WithLabel,S as WithLabelAndTooltip,Ge as __namedExportsOrder,$e as default};
