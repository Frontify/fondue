import{j as e}from"./iframe-pojAo36N.js";import{p as w,q as N}from"./fondue-icons372-CPCnPfhf.js";import{T as I,a as W,b as s}from"./Textarea-C-ZwEP08.js";import"./preload-helper-zta_rV5C.js";import"./useSyncRefs-B0bLa56F.js";import"./domUtilities-DGDVwu3_.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,U={title:"Components/Textarea",component:W,subcomponents:{"Textarea.Slot":I},tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A multi-line text field for longer-form content — descriptions, comments, or code. Supports auto-sizing, character limits, and action slots.","","**When to use:** When users need to enter more than a single line of text. For short inputs use `<TextInput>`."].join(`
`)}}},args:{autocomplete:!1,autosize:!1,clearable:!1,defaultValue:"Hello from Frontify",disabled:!1,focusOnMount:!1,minRows:1,maxRows:void 0,onBlur:a("onBlur"),onChange:a("onChange"),onEnterPressed:a("onEnterPressed"),onFocus:a("onFocus"),placeholder:"Placeholder",readOnly:!1,resizable:!1,selectable:!0,value:void 0},render:l=>{const c=M=>e.jsx(s,{...M});return c.displayName="Textarea",e.jsx(c,{...l})}},o={},n={args:{autosize:!0,decorator:e.jsx(w,{size:16}),placeholder:"Enter some long form text here"}},r={args:{placeholder:"Enter some long form text here",required:!0}},t={args:{placeholder:"Enter some long form text here",autosize:!0},render:l=>e.jsxs(s.Root,{...l,children:[e.jsx(s.Slot,{name:"left",children:e.jsx(w,{size:16})}),e.jsx(s.Slot,{name:"right",children:e.jsx("button",{onClick:()=>alert("Action clicked!"),style:{cursor:"pointer"},children:e.jsx(N,{size:16})})})]})};var i,d,u;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{code:`const Default = () => {
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
`,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var T,b,C;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{code:`const WithSlots = () => (
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
`,...(C=(b=t.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var S,y,z;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:"{}",...(z=(y=o.parameters)==null?void 0:y.docs)==null?void 0:z.source}}};var R,E,F;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    autosize: true,
    decorator: <IconNook size={16} />,
    placeholder: 'Enter some long form text here'
  }
}`,...(F=(E=n.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var O,P,k;r.parameters={...r.parameters,docs:{...(O=r.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter some long form text here',
    required: true
  }
}`,...(k=(P=r.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};var j,A,B;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(B=(A=t.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};const K=["Default","WithDecoratorAndAutosize","Required","WithSlots"];export{o as Default,r as Required,n as WithDecoratorAndAutosize,t as WithSlots,K as __namedExportsOrder,U as default};
