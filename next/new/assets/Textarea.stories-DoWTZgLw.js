import{j as e}from"./iframe-B9HwFvdU.js";import{p as j,q as b}from"./fondue-icons369-B3g093-t.js";import{T as R,a as C,b as n}from"./Textarea-xdIlNy-h.js";import"./preload-helper-mNEUNaaY.js";import"./useSyncRefs-DUY_35ln.js";import"./domUtilities-DGDVwu3_.js";import"./styleUtilities-A7Ia-tuh.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,I={title:"Components/Textarea",component:C,subcomponents:{"Textarea.Slot":R},tags:["autodocs"],parameters:{status:{type:"released"}},args:{autocomplete:!1,autosize:!1,clearable:!1,defaultValue:"Hello from Frontify",disabled:!1,focusOnMount:!1,minRows:1,maxRows:void 0,onBlur:r("onBlur"),onChange:r("onChange"),onEnterPressed:r("onEnterPressed"),onFocus:r("onFocus"),placeholder:"Placeholder",readOnly:!1,resizable:!1,selectable:!0,value:void 0},render:l=>{const c=E=>e.jsx(n,{...E});return c.displayName="Textarea",e.jsx(c,{...l})}},o={},t={args:{autosize:!0,decorator:e.jsx(j,{size:16}),placeholder:"Enter some long form text here"}},a={args:{placeholder:"Enter some long form text here",required:!0}},s={args:{placeholder:"Enter some long form text here",autosize:!0},render:l=>e.jsxs(n.Root,{...l,children:[e.jsx(n.Slot,{name:"left",children:e.jsx(j,{size:16})}),e.jsx(n.Slot,{name:"right",children:e.jsx("button",{onClick:()=>alert("Action clicked!"),style:{cursor:"pointer"},children:e.jsx(b,{size:16})})})]})};var i,m,u;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(u=(m=o.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var d,p,x;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    autosize: true,
    decorator: <IconNook size={16} />,
    placeholder: 'Enter some long form text here'
  }
}`,...(x=(p=t.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var h,f,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter some long form text here',
    required: true
  }
}`,...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var S,T,z;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(z=(T=s.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};const N=["Default","WithDecoratorAndAutosize","Required","WithSlots"];export{o as Default,a as Required,t as WithDecoratorAndAutosize,s as WithSlots,N as __namedExportsOrder,I as default};
