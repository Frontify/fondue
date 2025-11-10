import{j as e,F as se}from"./iframe-Bjn1nJOR.js";import{c as n,d as r}from"./fondue-icons366-DiHapnJa.js";import{B as h}from"./Button-B09nGg2r.js";import{L as re}from"./Label-DNV8oX2T.js";import{a as oe,b as ae,T as t}from"./TextInput-C-fX5f0r.js";import"./preload-helper-n5gCVCPL.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./index-D_GDYq1I.js";const{action:S}=__STORYBOOK_MODULE_ACTIONS__,ge={title:"Components/Text Input",component:ae,subcomponents:{"TextInput.Slot":oe},tags:["autodocs"],parameters:{status:{type:"released"}},args:{placeholder:"Placeholder",defaultValue:"Hello from Frontify",onChange:S("onChange"),onBlur:S("onBlur"),onFocus:S("onFocus")},render:s=>{const T=ne=>e.jsx(t,{...ne});return T.displayName="TextInput",e.jsx(T,{...s})}},o={},a={args:{type:"password"}},l={args:{disabled:!0},render:s=>e.jsxs(e.Fragment,{children:[e.jsx(t,{...s}),e.jsxs(t.Root,{...s,children:[e.jsx(t.Slot,{children:e.jsx(n,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(h,{aspect:"square",rounding:"full",emphasis:"weak",size:"small",disabled:!0,children:e.jsx(n,{size:16})})})]})]}),decorators:[s=>e.jsx("div",{className:"tw-flex tw-flex-col tw-gap-4",children:e.jsx(s,{})})]},c={args:{readOnly:!0},render:s=>e.jsxs(e.Fragment,{children:[e.jsx(t,{...s}),e.jsxs(t.Root,{...s,children:[e.jsx(t.Slot,{children:e.jsx(n,{size:16})}),e.jsx(t.Slot,{name:"right",children:s.readOnly?null:e.jsx(h,{aspect:"square",rounding:"full",emphasis:"weak",size:"small",disabled:!0,children:e.jsx(n,{size:16})})})]})]}),decorators:[s=>e.jsx("div",{className:"tw-flex tw-flex-col tw-gap-4",children:e.jsx(s,{})})]},i={render:s=>e.jsx(t.Root,{...s,children:e.jsx(t.Slot,{name:"left",children:e.jsx(n,{size:16})})})},u={render:s=>e.jsx(t.Root,{...s,children:e.jsx(t.Slot,{name:"right",children:e.jsx(n,{size:16})})})},d={render:s=>e.jsxs(t.Root,{...s,children:[e.jsx(t.Slot,{name:"left",children:e.jsx(r,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(n,{size:16})})]})},p={render:s=>e.jsx(t.Root,{...s,children:e.jsxs(t.Slot,{name:"right",children:[e.jsx(h,{aspect:"square",rounding:"full",emphasis:"weak",size:"small",children:e.jsx(n,{size:16})}),e.jsx(h,{aspect:"square",rounding:"full",emphasis:"weak",size:"small",children:e.jsx(n,{size:16})})]})})},x={render:s=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(re,{htmlFor:"text-input",children:"Label"}),e.jsxs(t.Root,{...s,id:"text-input",children:[e.jsx(t.Slot,{name:"left",children:e.jsx(r,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(n,{size:16})})]})]})},m={args:{status:"success"},render:s=>e.jsxs(se,{gap:2,direction:"column",children:[e.jsx(t,{...s}),e.jsxs(t.Root,{...s,children:[e.jsx(t.Slot,{name:"left",children:e.jsx(r,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(n,{size:16})})]})]})},I={args:{status:"error"},render:s=>e.jsxs(se,{gap:2,direction:"column",children:[e.jsx(t,{...s}),e.jsxs(t.Root,{...s,children:[e.jsx(t.Slot,{name:"left",children:e.jsx(r,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(n,{size:16})})]})]})},g={args:{status:"loading"},render:s=>e.jsxs(t.Root,{...s,children:[e.jsx(t.Slot,{name:"left",children:e.jsx(r,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(n,{size:16})})]})};var j,f,z;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:"{}",...(z=(f=o.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};var R,w,b;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    type: 'password'
  }
}`,...(b=(w=a.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var y,B,F;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => <>
            <TextInput {...args} />
            <TextInput.Root {...args}>
                <TextInput.Slot>
                    <IconIcon size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    <Button aspect="square" rounding="full" emphasis="weak" size="small" disabled>
                        <IconIcon size={16} />
                    </Button>
                </TextInput.Slot>
            </TextInput.Root>
        </>,
  decorators: [Story => <div className="tw-flex tw-flex-col tw-gap-4">
                <Story />
            </div>]
}`,...(F=(B=l.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var L,O,W;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    readOnly: true
  },
  render: args => <>
            <TextInput {...args} />

            <TextInput.Root {...args}>
                <TextInput.Slot>
                    <IconIcon size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    {!args.readOnly ? <Button aspect="square" rounding="full" emphasis="weak" size="small" disabled>
                            <IconIcon size={16} />
                        </Button> : null}
                </TextInput.Slot>
            </TextInput.Root>
        </>,
  decorators: [Story => <div className="tw-flex tw-flex-col tw-gap-4">
                <Story />
            </div>]
}`,...(W=(O=c.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var v,k,q;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <TextInput.Root {...args}>
            <TextInput.Slot name="left">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
}`,...(q=(k=i.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var N,P,_;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <TextInput.Root {...args}>
            <TextInput.Slot name="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
}`,...(_=(P=u.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var C,E,A;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <TextInput.Root {...args}>
            <TextInput.Slot name="left">
                <IconPen size={16} />
            </TextInput.Slot>
            <TextInput.Slot name="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
}`,...(A=(E=d.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var D,H,K;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <TextInput.Root {...args}>
            <TextInput.Slot name="right">
                <Button aspect="square" rounding="full" emphasis="weak" size="small">
                    <IconIcon size={16} />
                </Button>
                <Button aspect="square" rounding="full" emphasis="weak" size="small">
                    <IconIcon size={16} />
                </Button>
            </TextInput.Slot>
        </TextInput.Root>
}`,...(K=(H=p.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var M,U,V;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-flex-col tw-gap-2">
            <Label htmlFor="text-input">Label</Label>

            <TextInput.Root {...args} id="text-input">
                <TextInput.Slot name="left">
                    <IconPen size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    <IconIcon size={16} />
                </TextInput.Slot>
            </TextInput.Root>
        </div>
}`,...(V=(U=x.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var Y,G,J;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    status: 'success'
  },
  render: args => <Flex gap={2} direction="column">
            <TextInput {...args} />
            <TextInput.Root {...args}>
                <TextInput.Slot name="left">
                    <IconPen size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    <IconIcon size={16} />
                </TextInput.Slot>
            </TextInput.Root>
        </Flex>
}`,...(J=(G=m.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,X,Z;I.parameters={...I.parameters,docs:{...(Q=I.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    status: 'error'
  },
  render: args => <Flex gap={2} direction="column">
            <TextInput {...args} />
            <TextInput.Root {...args}>
                <TextInput.Slot name="left">
                    <IconPen size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    <IconIcon size={16} />
                </TextInput.Slot>
            </TextInput.Root>
        </Flex>
}`,...(Z=(X=I.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,te;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  },
  render: args => <TextInput.Root {...args}>
            <TextInput.Slot name="left">
                <IconPen size={16} />
            </TextInput.Slot>
            <TextInput.Slot name="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
}`,...(te=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const he=["Text","Password","Disabled","Readonly","WithLeftItem","WithRightItem","WithLeftAndRightItem","WithButtons","WithLabel","Success","Errored","Loading"];export{l as Disabled,I as Errored,g as Loading,a as Password,c as Readonly,m as Success,o as Text,p as WithButtons,x as WithLabel,d as WithLeftAndRightItem,i as WithLeftItem,u as WithRightItem,he as __namedExportsOrder,ge as default};
