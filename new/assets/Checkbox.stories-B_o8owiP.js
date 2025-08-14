import{j as e}from"./jsx-runtime-BYYWji4R.js";import{a as r}from"./index-B-lxVbXh.js";import{r as S}from"./index-ClcD9ViR.js";import{F as o}from"./Flex-CjzBXb8-.js";import{L as c}from"./Label-DLdJYH0f.js";import{C as D,a as i}from"./Checkbox-6EhT-2wr.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-Cr2iZZCw.js";import"./index-Cho7bklK.js";import"./index-BUNfiIdP.js";import"./styleUtilities-Byf6Fdv2.js";import"./fondue-icons351-CNs5B0wj.js";import"./index-CWz5EflU.js";import"./index-BIU06K05.js";import"./index-6uuHhnjI.js";import"./index-sY83p_TZ.js";import"./index-Dkr9yJHh.js";import"./focusStyle-IgMhxCMT.js";const W={title:"Components/Checkbox",component:D,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,required:!1,readOnly:!1,onChange:r("onChange"),onBlur:r("onBlur"),onFocus:r("onFocus")},render:a=>{const[v,w]=S.useState(a.value),y=L=>{r("onChange")(L),w(d=>d==="indeterminate"?!0:!d)};return e.jsxs("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:[e.jsx(i,{...a,id:"checkbox","aria-labelledby":"label",value:v,onChange:y}),e.jsx(c,{id:"label",htmlFor:"checkbox",children:"Checkbox"})]})}},l={},n={args:{value:"indeterminate"}},t={args:{disabled:!0}},s={render:a=>e.jsxs(o,{gap:"1rem",direction:"column",children:[e.jsxs(o,{gap:"4px",direction:"row",children:[e.jsx(i,{...a,id:"checkbox","aria-labelledby":"label",value:!0,onChange:()=>{}}),e.jsx(c,{id:"label",htmlFor:"checkbox",children:"Checkbox 1"})]}),e.jsxs(o,{gap:"4px",direction:"row",children:[e.jsx(i,{...a,id:"checkbox","aria-labelledby":"label",value:!1,onChange:()=>{}}),e.jsx(c,{id:"label",htmlFor:"checkbox",children:"Checkbox 2"})]}),e.jsxs(o,{gap:"4px",direction:"row",children:[e.jsx(i,{...a,id:"checkbox","aria-labelledby":"label",value:"indeterminate",onChange:()=>{}}),e.jsx(c,{id:"label",htmlFor:"checkbox",children:"Checkbox 3"})]})]})};var m,b,x;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(x=(b=l.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var p,h,u;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(u=(h=n.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var g,k,C;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(C=(k=t.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var F,f,j;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(j=(f=s.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};const X=["Default","Indeterminate","Disabled","Checklist"];export{s as Checklist,l as Default,t as Disabled,n as Indeterminate,X as __namedExportsOrder,W as default};
