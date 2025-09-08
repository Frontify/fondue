import{j as e}from"./jsx-runtime-BYYWji4R.js";import{a as o}from"./index-B-lxVbXh.js";import{r as C}from"./index-ClcD9ViR.js";import{F as s}from"./Flex-CjzBXb8-.js";import{L as h}from"./Label-DlO2j_ek.js";import{C as G,a as n}from"./Checkbox-CZaMDWTN.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-CMmqAaFT.js";import"./index-BUMxx5F6.js";import"./index-Q_VQqEV0.js";import"./styleUtilities-Byf6Fdv2.js";import"./fondue-icons351-B_bKa-IH.js";import"./index-CWz5EflU.js";import"./index-DulyF36n.js";import"./index-BZQsQlpo.js";import"./index-sY83p_TZ.js";import"./index-DPfZWLhs.js";import"./focusStyle-IgMhxCMT.js";const de={title:"Components/Checkbox",component:G,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,required:!1,readOnly:!1,onChange:o("onChange"),onBlur:o("onBlur"),onFocus:o("onFocus")},render:r=>{const[x,g]=C.useState(r.value),t=C.useId(),l=`checkbox-${t}`,a=`label-${t}`,z=A=>{o("onChange")(A),g(k=>k==="indeterminate"?!0:!k)};return e.jsxs("div",{className:"tw-flex tw-gap-2 tw-items-center",children:[e.jsx(n,{...r,id:l,"aria-labelledby":a,value:x,onChange:z}),e.jsx(h,{id:a,htmlFor:l,required:r.required,children:"Checkbox"})]})}},c={},i={args:{value:"indeterminate"}},d={args:{disabled:!0}},m={args:{required:!0}},u={args:{readOnly:!0,value:!0}},b={render:r=>{const[x,g]=C.useState(r.value),t=l=>{o("onChange")(l),g(a=>a==="indeterminate"?!0:!a)};return e.jsx("div",{className:"tw-flex tw-gap-2 tw-items-center",children:e.jsx(n,{...r,id:"checkbox","aria-labelledby":"label",value:x,onChange:t})})}},p={render:r=>e.jsxs(s,{gap:"1rem",direction:"column",children:[e.jsxs(s,{gap:"4px",direction:"row",children:[e.jsx(n,{...r,id:"checkbox-1","aria-labelledby":"label-1",value:!0,onChange:()=>{}}),e.jsx(h,{id:"label-1",htmlFor:"checkbox-1",children:"Checkbox 1"})]}),e.jsxs(s,{gap:"4px",direction:"row",children:[e.jsx(n,{...r,id:"checkbox-2","aria-labelledby":"label-2",value:!1,onChange:()=>{}}),e.jsx(h,{id:"label-2",htmlFor:"checkbox-2",children:"Checkbox 2"})]}),e.jsxs(s,{gap:"4px",direction:"row",children:[e.jsx(n,{...r,id:"checkbox-3","aria-labelledby":"label-3",value:"indeterminate",onChange:()=>{}}),e.jsx(h,{id:"label-3",htmlFor:"checkbox-3",children:"Checkbox 3"})]})]})};var v,f,F;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:"{}",...(F=(f=c.parameters)==null?void 0:f.docs)==null?void 0:F.source}}};var j,w,y;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(y=(w=i.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var L,S,q;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(q=(S=d.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};var I,O,R;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(R=(O=m.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var D,E,T;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    value: true
  }
}`,...(T=(E=u.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var V,N,B;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(args.value);
    const handleToggle = (event: FormEvent) => {
      action('onChange')(event);
      setValue(prevIsChecked => prevIsChecked === 'indeterminate' ? true : !prevIsChecked);
    };
    return <div className="tw-flex tw-gap-2 tw-items-center">
                <Checkbox {...args} id="checkbox" aria-labelledby="label" value={value} onChange={handleToggle} />
            </div>;
  }
}`,...(B=(N=b.parameters)==null?void 0:N.docs)==null?void 0:B.source}}};var W,_,$;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => {
    return <Flex gap="1rem" direction="column">
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox-1" aria-labelledby="label-1" value onChange={() => undefined} />
                    <Label id="label-1" htmlFor="checkbox-1">
                        Checkbox 1
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox-2" aria-labelledby="label-2" value={false} onChange={() => undefined} />
                    <Label id="label-2" htmlFor="checkbox-2">
                        Checkbox 2
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox-3" aria-labelledby="label-3" value="indeterminate" onChange={() => undefined} />
                    <Label id="label-3" htmlFor="checkbox-3">
                        Checkbox 3
                    </Label>
                </Flex>
            </Flex>;
  }
}`,...($=(_=p.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};const me=["Default","Indeterminate","Disabled","Required","ReadOnly","WithoutLabel","Checklist"];export{p as Checklist,c as Default,d as Disabled,i as Indeterminate,u as ReadOnly,m as Required,b as WithoutLabel,me as __namedExportsOrder,de as default};
