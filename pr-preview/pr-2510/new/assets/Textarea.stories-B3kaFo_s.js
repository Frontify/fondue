import{j as r}from"./iframe-ByMsQ7z2.js";import{f as b,g as z,h as j}from"./fondue-icons367-Bf6aPLMC.js";import{T as a}from"./Textarea-_sUxTrZU.js";import"./preload-helper-Axf9xzD9.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,T=[{icon:r.jsx(z,{size:16}),title:"Save to Clipboard",callback:()=>{alert("Mock Copied to Clipboard")}},{icon:r.jsx(j,{size:16}),title:"Help Desk",callback:()=>alert("Here to Help")}],D={title:"Components/Textarea",component:a,tags:["autodocs"],parameters:{status:{type:"released"}},args:{autocomplete:!1,autosize:!1,clearable:!1,defaultValue:"Hello from Frontify",disabled:!1,focusOnMount:!1,minRows:1,maxRows:void 0,onBlur:o("onBlur"),onChange:o("onChange"),onEnterPressed:o("onEnterPressed"),onFocus:o("onFocus"),placeholder:"Placeholder",readOnly:!1,resizable:!1,selectable:!0,value:void 0}},s={render:e=>r.jsx(a,{...e})},t={args:{autosize:!0,decorator:r.jsx(b,{size:16}),placeholder:"Enter some long form text here"},render:e=>r.jsx(a,{...e})},n={args:{extraActions:T,placeholder:"Enter some long form text here",clearable:!0},render:e=>r.jsx(a,{...e})},c={args:{placeholder:"Enter some long form text here",required:!0},render:e=>r.jsx(a,{...e})};var l,d,i;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <Textarea {...args} />
}`,...(i=(d=s.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var m,u,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,E,A;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter some long form text here',
    required: true
  },
  render: args => <Textarea {...args} />
}`,...(A=(E=c.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};const R=["Default","WithDecoratorAndAutosize","WithExtraActions","Required"];export{s as Default,c as Required,t as WithDecoratorAndAutosize,n as WithExtraActions,R as __namedExportsOrder,D as default};
