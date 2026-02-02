import{j as e}from"./iframe-B_xB_xs9.js";import{p as A,q as N}from"./fondue-icons369--V7gLjqJ.js";import{T as _,a as q,b as s}from"./Textarea-BB8R5e5V.js";import"./preload-helper-GpaA8_CI.js";import"./useSyncRefs-8Hh1uf7R.js";import"./domUtilities-DGDVwu3_.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,U={title:"Components/Textarea",component:q,subcomponents:{"Textarea.Slot":_},tags:["autodocs"],parameters:{status:{type:"released"}},args:{autocomplete:!1,autosize:!1,clearable:!1,defaultValue:"Hello from Frontify",disabled:!1,focusOnMount:!1,minRows:1,maxRows:void 0,onBlur:t("onBlur"),onChange:t("onChange"),onEnterPressed:t("onEnterPressed"),onFocus:t("onFocus"),placeholder:"Placeholder",readOnly:!1,resizable:!1,selectable:!0,value:void 0},render:l=>{const c=M=>e.jsx(s,{...M});return c.displayName="Textarea",e.jsx(c,{...l})}},o={},n={args:{autosize:!0,decorator:e.jsx(A,{size:16}),placeholder:"Enter some long form text here"}},r={args:{placeholder:"Enter some long form text here",required:!0}},a={args:{placeholder:"Enter some long form text here",autosize:!0},render:l=>e.jsxs(s.Root,{...l,children:[e.jsx(s.Slot,{name:"left",children:e.jsx(A,{size:16})}),e.jsx(s.Slot,{name:"right",children:e.jsx("button",{onClick:()=>alert("Action clicked!"),style:{cursor:"pointer"},children:e.jsx(N,{size:16})})})]})};var i,d,u;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{code:`const Default = () => {
  // Used to get the correct component in the Storybook for the simple cases (\`Textarea\` instead of \`Textarea.Root\`)
  // More complex cases are using the Story \`render\` function
  const Component = (props: ComponentProps<typeof Textarea>) => (
    <Textarea {...props} />
  );
  Component.displayName = "Textarea";

  return (
    <Component
      autocomplete={false}
      autosize={false}
      clearable={false}
      defaultValue="Hello from Frontify"
      disabled={false}
      focusOnMount={false}
      minRows={1}
      maxRows={undefined}
      onBlur={action("onBlur")}
      onChange={action("onChange")}
      onEnterPressed={action("onEnterPressed")}
      onFocus={action("onFocus")}
      placeholder="Placeholder"
      readOnly={false}
      resizable={false}
      selectable
      value={undefined}
    />
  );
};
`,...(u=(d=o.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,p,f;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{code:`const WithDecoratorAndAutosize = () => {
  // Used to get the correct component in the Storybook for the simple cases (\`Textarea\` instead of \`Textarea.Root\`)
  // More complex cases are using the Story \`render\` function
  const Component = (props: ComponentProps<typeof Textarea>) => (
    <Textarea {...props} />
  );
  Component.displayName = "Textarea";

  return (
    <Component
      autocomplete={false}
      autosize
      clearable={false}
      defaultValue="Hello from Frontify"
      disabled={false}
      focusOnMount={false}
      minRows={1}
      maxRows={undefined}
      onBlur={action("onBlur")}
      onChange={action("onChange")}
      onEnterPressed={action("onEnterPressed")}
      onFocus={action("onFocus")}
      placeholder="Enter some long form text here"
      readOnly={false}
      resizable={false}
      selectable
      value={undefined}
      decorator={<IconNook size={16} />}
    />
  );
};
`,...(f=(p=n.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var x,h,g;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{code:`const Required = () => {
  // Used to get the correct component in the Storybook for the simple cases (\`Textarea\` instead of \`Textarea.Root\`)
  // More complex cases are using the Story \`render\` function
  const Component = (props: ComponentProps<typeof Textarea>) => (
    <Textarea {...props} />
  );
  Component.displayName = "Textarea";

  return (
    <Component
      autocomplete={false}
      autosize={false}
      clearable={false}
      defaultValue="Hello from Frontify"
      disabled={false}
      focusOnMount={false}
      minRows={1}
      maxRows={undefined}
      onBlur={action("onBlur")}
      onChange={action("onChange")}
      onEnterPressed={action("onEnterPressed")}
      onFocus={action("onFocus")}
      placeholder="Enter some long form text here"
      readOnly={false}
      resizable={false}
      selectable
      value={undefined}
      required
    />
  );
};
`,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var T,b,C;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{code:`const WithSlots = () => (
  <Textarea.Root
    autocomplete={false}
    autosize
    clearable={false}
    defaultValue="Hello from Frontify"
    disabled={false}
    focusOnMount={false}
    minRows={1}
    maxRows={undefined}
    onBlur={action("onBlur")}
    onChange={action("onChange")}
    onEnterPressed={action("onEnterPressed")}
    onFocus={action("onFocus")}
    placeholder="Enter some long form text here"
    readOnly={false}
    resizable={false}
    selectable
    value={undefined}
  >
    <Textarea.Slot name="left">
      <IconNook size={16} />
    </Textarea.Slot>
    <Textarea.Slot name="right">
      <button
        onClick={() => alert("Action clicked!")}
        style={{ cursor: "pointer" }}
      >
        <IconClipboard size={16} />
      </button>
    </Textarea.Slot>
  </Textarea.Root>
);
`,...(C=(b=a.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var y,S,z;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:"{}",...(z=(S=o.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var R,E,O;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    autosize: true,
    decorator: <IconNook size={16} />,
    placeholder: 'Enter some long form text here'
  }
}`,...(O=(E=n.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var F,P,k;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter some long form text here',
    required: true
  }
}`,...(k=(P=r.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};var j,B,w;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter some long form text here',
    autosize: true
  },
  render: args => <Textarea.Root {...args}>
            <Textarea.Slot name="left">
                <IconNook size={16} />
            </Textarea.Slot>
            <Textarea.Slot name="right">
                <button onClick={() => alert('Action clicked!')} style={{
        cursor: 'pointer'
      }}>
                    <IconClipboard size={16} />
                </button>
            </Textarea.Slot>
        </Textarea.Root>
}`,...(w=(B=a.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};const K=["Default","WithDecoratorAndAutosize","Required","WithSlots"];export{o as Default,r as Required,n as WithDecoratorAndAutosize,a as WithSlots,K as __namedExportsOrder,U as default};
