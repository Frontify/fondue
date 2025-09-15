import{j as r}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import{f as z,g as A,h as j}from"./fondue-icons351-BwRByKtE.js";import{a as o}from"./index-B-lxVbXh.js";import{T as a}from"./Textarea-DYtpLe6v.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";const T=[{icon:r.jsx(A,{size:16}),title:"Save to Clipboard",callback:()=>{alert("Mock Copied to Clipboard")}},{icon:r.jsx(j,{size:16}),title:"Help Desk",callback:()=>alert("Here to Help")}],H={title:"Components/Textarea",component:a,tags:["autodocs"],parameters:{status:{type:"released"}},args:{autocomplete:!1,autosize:!1,clearable:!1,defaultValue:"Hello from Frontify",disabled:!1,focusOnMount:!1,minRows:1,maxRows:void 0,onBlur:o("onBlur"),onChange:o("onChange"),onEnterPressed:o("onEnterPressed"),onFocus:o("onFocus"),placeholder:"Placeholder",readOnly:!1,resizable:!1,selectable:!0,value:void 0}},s={render:e=>r.jsx(a,{...e})},t={args:{autosize:!0,decorator:r.jsx(z,{size:16}),placeholder:"Enter some long form text here"},render:e=>r.jsx(a,{...e})},n={args:{extraActions:T,placeholder:"Enter some long form text here",clearable:!0},render:e=>r.jsx(a,{...e})},c={args:{placeholder:"Enter some long form text here",required:!0},render:e=>r.jsx(a,{...e})};var l,i,d;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <Textarea {...args} />
}`,...(d=(i=s.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var m,u,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    autosize: true,
    decorator: <IconNook size={16} />,
    placeholder: 'Enter some long form text here'
  },
  render: args => <Textarea {...args} />
}`,...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var x,g,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    extraActions: ExtraActions,
    placeholder: 'Enter some long form text here',
    clearable: true
  },
  render: args => <Textarea {...args} />
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,E,b;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter some long form text here',
    required: true
  },
  render: args => <Textarea {...args} />
}`,...(b=(E=c.parameters)==null?void 0:E.docs)==null?void 0:b.source}}};const W=["Default","WithDecoratorAndAutosize","WithExtraActions","Required"];export{s as Default,c as Required,t as WithDecoratorAndAutosize,n as WithExtraActions,W as __namedExportsOrder,H as default};
