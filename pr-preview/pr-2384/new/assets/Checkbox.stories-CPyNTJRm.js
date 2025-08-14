import{j as e}from"./jsx-runtime-BYYWji4R.js";import{a}from"./index-B-lxVbXh.js";import{r as R}from"./index-ClcD9ViR.js";import{F as o}from"./Flex-CjzBXb8-.js";import{L as i}from"./Label-DLdJYH0f.js";import{C as B,a as d}from"./Checkbox-6EhT-2wr.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-Cr2iZZCw.js";import"./index-Cho7bklK.js";import"./index-BUNfiIdP.js";import"./styleUtilities-Byf6Fdv2.js";import"./fondue-icons351-CNs5B0wj.js";import"./index-CWz5EflU.js";import"./index-BIU06K05.js";import"./index-6uuHhnjI.js";import"./index-sY83p_TZ.js";import"./index-Dkr9yJHh.js";import"./focusStyle-IgMhxCMT.js";const $={title:"Components/Checkbox",component:B,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,required:!1,readOnly:!1,onChange:a("onChange"),onBlur:a("onBlur"),onFocus:a("onFocus")},render:r=>{const[q,S]=R.useState(r.value),D=E=>{a("onChange")(E),S(m=>m==="indeterminate"?!0:!m)};return e.jsxs("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:[e.jsx(d,{...r,id:"checkbox","aria-labelledby":"label",value:q,onChange:D}),e.jsx(i,{id:"label",htmlFor:"checkbox",required:r.required,children:"Checkbox"})]})}},n={},l={args:{value:"indeterminate"}},t={args:{disabled:!0}},s={args:{required:!0}},c={render:r=>e.jsxs(o,{gap:"1rem",direction:"column",children:[e.jsxs(o,{gap:"4px",direction:"row",children:[e.jsx(d,{...r,id:"checkbox","aria-labelledby":"label",value:!0,onChange:()=>{}}),e.jsx(i,{id:"label",htmlFor:"checkbox",children:"Checkbox 1"})]}),e.jsxs(o,{gap:"4px",direction:"row",children:[e.jsx(d,{...r,id:"checkbox","aria-labelledby":"label",value:!1,onChange:()=>{}}),e.jsx(i,{id:"label",htmlFor:"checkbox",children:"Checkbox 2"})]}),e.jsxs(o,{gap:"4px",direction:"row",children:[e.jsx(d,{...r,id:"checkbox","aria-labelledby":"label",value:"indeterminate",onChange:()=>{}}),e.jsx(i,{id:"label",htmlFor:"checkbox",children:"Checkbox 3"})]})]})};var b,p,x;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:"{}",...(x=(p=n.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var u,h,g;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(g=(h=l.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var k,C,F;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(F=(C=t.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var f,j,v;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(v=(j=s.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var w,y,L;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => {
    return <Flex gap="1rem" direction="column">
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox" aria-labelledby="label" value={true} onChange={() => {}} />
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
}`,...(L=(y=c.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};const ee=["Default","Indeterminate","Disabled","Required","Checklist"];export{c as Checklist,n as Default,t as Disabled,l as Indeterminate,s as Required,ee as __namedExportsOrder,$ as default};
