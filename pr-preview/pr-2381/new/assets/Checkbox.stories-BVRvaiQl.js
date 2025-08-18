import{j as e}from"./jsx-runtime-BYYWji4R.js";import{a as o}from"./index-B-lxVbXh.js";import{r as R}from"./index-ClcD9ViR.js";import{F as l}from"./Flex-CjzBXb8-.js";import{L as b}from"./Label-CTEqO8Hf.js";import{C as B,a as t}from"./Checkbox-Cj-X8XcL.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-CMmqAaFT.js";import"./index-BUMxx5F6.js";import"./index-Q_VQqEV0.js";import"./styleUtilities-Byf6Fdv2.js";import"./fondue-icons351-B_bKa-IH.js";import"./index-CWz5EflU.js";import"./index-DulyF36n.js";import"./index-BZQsQlpo.js";import"./index-sY83p_TZ.js";import"./index-DPfZWLhs.js";import"./focusStyle-IgMhxCMT.js";const oe={title:"Components/Checkbox",component:B,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,required:!1,readOnly:!1,onChange:o("onChange"),onBlur:o("onBlur"),onFocus:o("onFocus")},render:a=>{const[u,p]=R.useState(a.value),h=x=>{o("onChange")(x),p(r=>r==="indeterminate"?!0:!r)};return e.jsxs("div",{className:"tw-flex tw-gap-2 tw-items-center",children:[e.jsx(t,{...a,id:"checkbox","aria-labelledby":"label",value:u,onChange:h}),e.jsx(b,{id:"label",htmlFor:"checkbox",required:a.required,children:"Checkbox"})]})}},n={},s={args:{value:"indeterminate"}},c={args:{disabled:!0}},i={args:{required:!0}},d={render:a=>{const[u,p]=R.useState(a.value),h=x=>{o("onChange")(x),p(r=>r==="indeterminate"?!0:!r)};return e.jsx("div",{className:"tw-flex tw-gap-2 tw-items-center",children:e.jsx(t,{...a,id:"checkbox","aria-labelledby":"label",value:u,onChange:h})})}},m={render:a=>e.jsxs(l,{gap:"1rem",direction:"column",children:[e.jsxs(l,{gap:"4px",direction:"row",children:[e.jsx(t,{...a,id:"checkbox","aria-labelledby":"label",value:!0,onChange:()=>{}}),e.jsx(b,{id:"label",htmlFor:"checkbox",children:"Checkbox 1"})]}),e.jsxs(l,{gap:"4px",direction:"row",children:[e.jsx(t,{...a,id:"checkbox","aria-labelledby":"label",value:!1,onChange:()=>{}}),e.jsx(b,{id:"label",htmlFor:"checkbox",children:"Checkbox 2"})]}),e.jsxs(l,{gap:"4px",direction:"row",children:[e.jsx(t,{...a,id:"checkbox","aria-labelledby":"label",value:"indeterminate",onChange:()=>{}}),e.jsx(b,{id:"label",htmlFor:"checkbox",children:"Checkbox 3"})]})]})};var g,C,k;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(k=(C=n.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var v,F,f;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(f=(F=s.parameters)==null?void 0:F.docs)==null?void 0:f.source}}};var j,w,y;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(y=(w=c.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var L,S,q;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(q=(S=i.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};var D,E,T;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(T=(E=d.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var V,I,N;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => {
    return <Flex gap="1rem" direction="column">
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox" aria-labelledby="label" value onChange={() => {}} />
                    <Label id="label" htmlFor="checkbox">
                        Checkbox 1
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox" aria-labelledby="label" value={false} onChange={() => {}} />
                    <Label id="label" htmlFor="checkbox">
                        Checkbox 2
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox" aria-labelledby="label" value="indeterminate" onChange={() => {}} />
                    <Label id="label" htmlFor="checkbox">
                        Checkbox 3
                    </Label>
                </Flex>
            </Flex>;
  }
}`,...(N=(I=m.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};const te=["Default","Indeterminate","Disabled","Required","WithoutLabel","Checklist"];export{m as Checklist,n as Default,c as Disabled,s as Indeterminate,i as Required,d as WithoutLabel,te as __namedExportsOrder,oe as default};
