import{j as e}from"./jsx-runtime-BYYWji4R.js";import{a}from"./index-B-lxVbXh.js";import{r as S}from"./index-ClcD9ViR.js";import{F as o}from"./Flex-Bv2clOW9.js";import{L as s}from"./Label-p7gJ-758.js";import{C as D,a as i}from"./Checkbox-76f6maj4.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-R-TRi7i8.js";import"./index-Cho7bklK.js";import"./index-BxcciFvf.js";import"./styleUtilities-Byf6Fdv2.js";import"./fondue-icons349-izFEZ7jD.js";import"./index-CWz5EflU.js";import"./index-Cf7qgl8U.js";import"./index-BnD2ijW9.js";import"./index-sY83p_TZ.js";import"./index-X3Ss1B-F.js";import"./focusStyle-IgMhxCMT.js";const W={title:"Components/Checkbox",component:D,tags:["autodocs"],parameters:{status:{type:"released"}},args:{onChange:a("onChange"),onBlur:a("onBlur"),onFocus:a("onFocus")},render:r=>{const[v,w]=S.useState(r.value),y=L=>{a("onChange")(L),w(d=>d==="indeterminate"?!0:!d)};return e.jsxs("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:[e.jsx(i,{...r,id:"checkbox","aria-labelledby":"label",value:v,onChange:y}),e.jsx(s,{id:"label",htmlFor:"checkbox",children:"Checkbox"})]})}},l={},n={args:{value:"indeterminate"}},t={args:{disabled:!0}},c={render:r=>e.jsxs(o,{gap:"1rem",direction:"column",children:[e.jsxs(o,{gap:"4px",direction:"row",children:[e.jsx(i,{...r,id:"checkbox","aria-labelledby":"label",value:!0,onChange:()=>{}}),e.jsx(s,{id:"label",htmlFor:"checkbox",children:"Checkbox 1"})]}),e.jsxs(o,{gap:"4px",direction:"row",children:[e.jsx(i,{...r,id:"checkbox","aria-labelledby":"label",value:!1,onChange:()=>{}}),e.jsx(s,{id:"label",htmlFor:"checkbox",children:"Checkbox 2"})]}),e.jsxs(o,{gap:"4px",direction:"row",children:[e.jsx(i,{...r,id:"checkbox","aria-labelledby":"label",value:"indeterminate",onChange:()=>{}}),e.jsx(s,{id:"label",htmlFor:"checkbox",children:"Checkbox 3"})]})]})};var m,b,x;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(x=(b=l.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var p,h,u;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(u=(h=n.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var g,k,C;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(C=(k=t.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var F,j,f;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(f=(j=c.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};const X=["Default","Indeterminate","Disabled","Checklist"];export{c as Checklist,l as Default,t as Disabled,n as Indeterminate,X as __namedExportsOrder,W as default};
