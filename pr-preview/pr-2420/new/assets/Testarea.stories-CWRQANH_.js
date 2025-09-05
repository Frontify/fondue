import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import{e as g,f as h,g as E}from"./fondue-icons351-C7Ml7GAl.js";import{a}from"./index-B-lxVbXh.js";import{T as n}from"./Textarea-CeTz8oT7.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";const b=[{icon:e.jsx(h,{size:16}),title:"Save to Clipboard",callback:()=>{alert("Mock Copied to Clipboard")}},{icon:e.jsx(E,{size:16}),title:"Help Desk",callback:()=>alert("Here to Help")}],v={title:"Components/Textarea",component:n,tags:["autodocs"],parameters:{status:{type:"released"}},args:{autocomplete:!1,autosize:!1,clearable:!1,defaultValue:"Hello from Frontify",disabled:!1,focusOnMount:!1,minRows:1,maxRows:void 0,onBlur:a("onBlur"),onChange:a("onChange"),onEnterPressed:a("onEnterPressed"),onFocus:a("onFocus"),placeholder:"Placeholder",readOnly:!1,resizable:!1,selectable:!0,value:void 0}},o={render:r=>e.jsx(n,{...r})},t={args:{autosize:!0,decorator:e.jsx(g,{size:16}),placeholder:"Enter some long form text here"},render:r=>e.jsx(n,{...r})},s={args:{extraActions:b,placeholder:"Enter some long form text here",clearable:!0},render:r=>e.jsx(n,{...r})};var l,c,i;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <Textarea {...args} />
}`,...(i=(c=o.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var d,m,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    autosize: true,
    decorator: <IconNook size={16} />,
    placeholder: 'Enter some long form text here'
  },
  render: args => <Textarea {...args} />
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,x,f;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    extraActions: ExtraActions,
    placeholder: 'Enter some long form text here',
    clearable: true
  },
  render: args => <Textarea {...args} />
}`,...(f=(x=s.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};const H=["Default","WithDecoratorAndAutosize","WithExtraActions"];export{o as Default,t as WithDecoratorAndAutosize,s as WithExtraActions,H as __namedExportsOrder,v as default};
