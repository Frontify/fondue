import{j as n,F as Nn}from"./iframe-DyhKgWoB.js";import{c as o,h}from"./fondue-icons369-DDbfNuPU.js";import{B as g}from"./Button-Cfl17lXT.js";import{L as En}from"./Label-D2n4DdyB.js";import{a as An,b as Dn,T as e}from"./TextInput-Dq8vqfJA.js";import"./preload-helper-DgBJLACL.js";import"./index-CTnmWXmu.js";import"./LoadingCircle-BbEboBDp.js";const{action:T}=__STORYBOOK_MODULE_ACTIONS__,Zn={title:"Components/Text Input",component:Dn,subcomponents:{"TextInput.Slot":An},tags:["autodocs"],parameters:{status:{type:"released"}},args:{placeholder:"Placeholder",defaultValue:"Hello from Frontify",onChange:T("onChange"),onBlur:T("onBlur"),onFocus:T("onFocus")},render:t=>{const f=_n=>n.jsx(e,{..._n});return f.displayName="TextInput",n.jsx(f,{...t})}},s={},r={args:{type:"password"}},a={args:{disabled:!0},render:t=>n.jsxs(n.Fragment,{children:[n.jsx(e,{...t}),n.jsxs(e.Root,{...t,children:[n.jsx(e.Slot,{children:n.jsx(o,{size:16})}),n.jsx(e.Slot,{name:"right",children:n.jsx(g,{aspect:"square",rounding:"full",emphasis:"weak",size:"small",disabled:!0,children:n.jsx(o,{size:16})})})]})]}),decorators:[t=>n.jsx("div",{className:"tw-flex tw-flex-col tw-gap-4",children:n.jsx(t,{})})]},l={args:{readOnly:!0},render:t=>n.jsxs(n.Fragment,{children:[n.jsx(e,{...t}),n.jsxs(e.Root,{...t,children:[n.jsx(e.Slot,{children:n.jsx(o,{size:16})}),n.jsx(e.Slot,{name:"right",children:t.readOnly?null:n.jsx(g,{aspect:"square",rounding:"full",emphasis:"weak",size:"small",disabled:!0,children:n.jsx(o,{size:16})})})]})]}),decorators:[t=>n.jsx("div",{className:"tw-flex tw-flex-col tw-gap-4",children:n.jsx(t,{})})]},c={render:t=>n.jsx(e.Root,{...t,children:n.jsx(e.Slot,{name:"left",children:n.jsx(o,{size:16})})})},u={render:t=>n.jsx(e.Root,{...t,children:n.jsx(e.Slot,{name:"right",children:n.jsx(o,{size:16})})})},i={render:t=>n.jsxs(e.Root,{...t,children:[n.jsx(e.Slot,{name:"left",children:n.jsx(h,{size:16})}),n.jsx(e.Slot,{name:"right",children:n.jsx(o,{size:16})})]})},p={render:t=>n.jsx(e.Root,{...t,children:n.jsxs(e.Slot,{name:"right",children:[n.jsx(g,{aspect:"square",rounding:"full",emphasis:"weak",size:"small",children:n.jsx(o,{size:16})}),n.jsx(g,{aspect:"square",rounding:"full",emphasis:"weak",size:"small",children:n.jsx(o,{size:16})})]})})},d={render:t=>n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[n.jsx(En,{htmlFor:"text-input",children:"Label"}),n.jsxs(e.Root,{...t,id:"text-input",children:[n.jsx(e.Slot,{name:"left",children:n.jsx(h,{size:16})}),n.jsx(e.Slot,{name:"right",children:n.jsx(o,{size:16})})]})]})},m={args:{status:"success"},render:t=>n.jsxs(Nn,{gap:2,direction:"column",children:[n.jsx(e,{...t}),n.jsxs(e.Root,{...t,children:[n.jsx(e.Slot,{name:"left",children:n.jsx(h,{size:16})}),n.jsx(e.Slot,{name:"right",children:n.jsx(o,{size:16})})]})]})},x={args:{status:"error"},render:t=>n.jsxs(Nn,{gap:2,direction:"column",children:[n.jsx(e,{...t}),n.jsxs(e.Root,{...t,children:[n.jsx(e.Slot,{name:"left",children:n.jsx(h,{size:16})}),n.jsx(e.Slot,{name:"right",children:n.jsx(o,{size:16})})]})]})},I={args:{status:"loading"},render:t=>n.jsxs(e.Root,{...t,children:[n.jsx(e.Slot,{name:"left",children:n.jsx(h,{size:16})}),n.jsx(e.Slot,{name:"right",children:n.jsx(o,{size:16})})]})};var S,F,j;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{code:`const Text = () => {
  // Used to get the correct component in the Storybook for the simple cases (\`TextInput\` instead of \`TextInput.Root\`)
  // More complex cases are using the Story \`render\` function
  const Component = (props: ComponentProps<typeof TextInput>) => (
    <TextInput {...props} />
  );
  Component.displayName = "TextInput";

  return (
    <Component
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
    />
  );
};
`,...(j=(F=s.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var z,R,B;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{code:`const Password = () => {
  // Used to get the correct component in the Storybook for the simple cases (\`TextInput\` instead of \`TextInput.Root\`)
  // More complex cases are using the Story \`render\` function
  const Component = (props: ComponentProps<typeof TextInput>) => (
    <TextInput {...props} />
  );
  Component.displayName = "TextInput";

  return (
    <Component
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      type="password"
    />
  );
};
`,...(B=(R=r.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var C,y,w;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{code:`const Disabled = () => (
  <>
    <TextInput
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      disabled
    />
    <TextInput.Root
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      disabled
    >
      <TextInput.Slot>
        <IconIcon size={16} />
      </TextInput.Slot>
      <TextInput.Slot name="right">
        <Button
          aspect="square"
          rounding="full"
          emphasis="weak"
          size="small"
          disabled
        >
          <IconIcon size={16} />
        </Button>
      </TextInput.Slot>
    </TextInput.Root>
  </>
);
`,...(w=(y=a.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var P,b,L;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{code:`const Readonly = () => (
  <>
    <TextInput
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      readOnly
    />
    <TextInput.Root
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      readOnly
    >
      <TextInput.Slot>
        <IconIcon size={16} />
      </TextInput.Slot>
      <TextInput.Slot name="right">
        {!args.readOnly ? (
          <Button
            aspect="square"
            rounding="full"
            emphasis="weak"
            size="small"
            disabled
          >
            <IconIcon size={16} />
          </Button>
        ) : null}
      </TextInput.Slot>
    </TextInput.Root>
  </>
);
`,...(L=(b=l.parameters)==null?void 0:b.docs)==null?void 0:L.source}}};var H,V,W;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{code:`const WithLeftItem = () => (
  <TextInput.Root
    placeholder="Placeholder"
    defaultValue="Hello from Frontify"
    onChange={action("onChange")}
    onBlur={action("onBlur")}
    onFocus={action("onFocus")}
  >
    <TextInput.Slot name="left">
      <IconIcon size={16} />
    </TextInput.Slot>
  </TextInput.Root>
);
`,...(W=(V=c.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var k,O,q;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{code:`const WithRightItem = () => (
  <TextInput.Root
    placeholder="Placeholder"
    defaultValue="Hello from Frontify"
    onChange={action("onChange")}
    onBlur={action("onBlur")}
    onFocus={action("onFocus")}
  >
    <TextInput.Slot name="right">
      <IconIcon size={16} />
    </TextInput.Slot>
  </TextInput.Root>
);
`,...(q=(O=u.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var v,N,_;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{code:`const WithLeftAndRightItem = () => (
  <TextInput.Root
    placeholder="Placeholder"
    defaultValue="Hello from Frontify"
    onChange={action("onChange")}
    onBlur={action("onBlur")}
    onFocus={action("onFocus")}
  >
    <TextInput.Slot name="left">
      <IconPen size={16} />
    </TextInput.Slot>
    <TextInput.Slot name="right">
      <IconIcon size={16} />
    </TextInput.Slot>
  </TextInput.Root>
);
`,...(_=(N=i.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};var E,A,D;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{code:`const WithButtons = () => (
  <TextInput.Root
    placeholder="Placeholder"
    defaultValue="Hello from Frontify"
    onChange={action("onChange")}
    onBlur={action("onBlur")}
    onFocus={action("onFocus")}
  >
    <TextInput.Slot name="right">
      <Button aspect="square" rounding="full" emphasis="weak" size="small">
        <IconIcon size={16} />
      </Button>
      <Button aspect="square" rounding="full" emphasis="weak" size="small">
        <IconIcon size={16} />
      </Button>
    </TextInput.Slot>
  </TextInput.Root>
);
`,...(D=(A=p.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var M,U,K;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{code:`const WithLabel = () => (
  <div className="tw-flex tw-flex-col tw-gap-2">
    <Label htmlFor="text-input">Label</Label>
    <TextInput.Root
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      id="text-input"
    >
      <TextInput.Slot name="left">
        <IconPen size={16} />
      </TextInput.Slot>
      <TextInput.Slot name="right">
        <IconIcon size={16} />
      </TextInput.Slot>
    </TextInput.Root>
  </div>
);
`,...(K=(U=d.parameters)==null?void 0:U.docs)==null?void 0:K.source}}};var Y,G,J;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{code:`const Success = () => (
  <Flex gap={2} direction="column">
    <TextInput
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      status="success"
    />
    <TextInput.Root
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      status="success"
    >
      <TextInput.Slot name="left">
        <IconPen size={16} />
      </TextInput.Slot>
      <TextInput.Slot name="right">
        <IconIcon size={16} />
      </TextInput.Slot>
    </TextInput.Root>
  </Flex>
);
`,...(J=(G=m.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,X,Z;x.parameters={...x.parameters,docs:{...(Q=x.parameters)==null?void 0:Q.docs,source:{code:`const Errored = () => (
  <Flex gap={2} direction="column">
    <TextInput
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      status="error"
    />
    <TextInput.Root
      placeholder="Placeholder"
      defaultValue="Hello from Frontify"
      onChange={action("onChange")}
      onBlur={action("onBlur")}
      onFocus={action("onFocus")}
      status="error"
    >
      <TextInput.Slot name="left">
        <IconPen size={16} />
      </TextInput.Slot>
      <TextInput.Slot name="right">
        <IconIcon size={16} />
      </TextInput.Slot>
    </TextInput.Root>
  </Flex>
);
`,...(Z=(X=x.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,nn,en;I.parameters={...I.parameters,docs:{...($=I.parameters)==null?void 0:$.docs,source:{code:`const Loading = () => (
  <TextInput.Root
    placeholder="Placeholder"
    defaultValue="Hello from Frontify"
    onChange={action("onChange")}
    onBlur={action("onBlur")}
    onFocus={action("onFocus")}
    status="loading"
  >
    <TextInput.Slot name="left">
      <IconPen size={16} />
    </TextInput.Slot>
    <TextInput.Slot name="right">
      <IconIcon size={16} />
    </TextInput.Slot>
  </TextInput.Root>
);
`,...(en=(nn=I.parameters)==null?void 0:nn.docs)==null?void 0:en.source}}};var tn,on,sn;s.parameters={...s.parameters,docs:{...(tn=s.parameters)==null?void 0:tn.docs,source:{originalSource:"{}",...(sn=(on=s.parameters)==null?void 0:on.docs)==null?void 0:sn.source}}};var rn,an,ln;r.parameters={...r.parameters,docs:{...(rn=r.parameters)==null?void 0:rn.docs,source:{originalSource:`{
  args: {
    type: 'password'
  }
}`,...(ln=(an=r.parameters)==null?void 0:an.docs)==null?void 0:ln.source}}};var cn,un,pn;a.parameters={...a.parameters,docs:{...(cn=a.parameters)==null?void 0:cn.docs,source:{originalSource:`{
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
}`,...(pn=(un=a.parameters)==null?void 0:un.docs)==null?void 0:pn.source}}};var dn,mn,xn;l.parameters={...l.parameters,docs:{...(dn=l.parameters)==null?void 0:dn.docs,source:{originalSource:`{
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
}`,...(xn=(mn=l.parameters)==null?void 0:mn.docs)==null?void 0:xn.source}}};var In,hn,gn;c.parameters={...c.parameters,docs:{...(In=c.parameters)==null?void 0:In.docs,source:{originalSource:`{
  render: args => <TextInput.Root {...args}>
            <TextInput.Slot name="left">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
}`,...(gn=(hn=c.parameters)==null?void 0:hn.docs)==null?void 0:gn.source}}};var Tn,fn,Sn;u.parameters={...u.parameters,docs:{...(Tn=u.parameters)==null?void 0:Tn.docs,source:{originalSource:`{
  render: args => <TextInput.Root {...args}>
            <TextInput.Slot name="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
}`,...(Sn=(fn=u.parameters)==null?void 0:fn.docs)==null?void 0:Sn.source}}};var Fn,jn,zn;i.parameters={...i.parameters,docs:{...(Fn=i.parameters)==null?void 0:Fn.docs,source:{originalSource:`{
  render: args => <TextInput.Root {...args}>
            <TextInput.Slot name="left">
                <IconPen size={16} />
            </TextInput.Slot>
            <TextInput.Slot name="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
}`,...(zn=(jn=i.parameters)==null?void 0:jn.docs)==null?void 0:zn.source}}};var Rn,Bn,Cn;p.parameters={...p.parameters,docs:{...(Rn=p.parameters)==null?void 0:Rn.docs,source:{originalSource:`{
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
}`,...(Cn=(Bn=p.parameters)==null?void 0:Bn.docs)==null?void 0:Cn.source}}};var yn,wn,Pn;d.parameters={...d.parameters,docs:{...(yn=d.parameters)==null?void 0:yn.docs,source:{originalSource:`{
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
}`,...(Pn=(wn=d.parameters)==null?void 0:wn.docs)==null?void 0:Pn.source}}};var bn,Ln,Hn;m.parameters={...m.parameters,docs:{...(bn=m.parameters)==null?void 0:bn.docs,source:{originalSource:`{
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
}`,...(Hn=(Ln=m.parameters)==null?void 0:Ln.docs)==null?void 0:Hn.source}}};var Vn,Wn,kn;x.parameters={...x.parameters,docs:{...(Vn=x.parameters)==null?void 0:Vn.docs,source:{originalSource:`{
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
}`,...(kn=(Wn=x.parameters)==null?void 0:Wn.docs)==null?void 0:kn.source}}};var On,qn,vn;I.parameters={...I.parameters,docs:{...(On=I.parameters)==null?void 0:On.docs,source:{originalSource:`{
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
}`,...(vn=(qn=I.parameters)==null?void 0:qn.docs)==null?void 0:vn.source}}};const $n=["Text","Password","Disabled","Readonly","WithLeftItem","WithRightItem","WithLeftAndRightItem","WithButtons","WithLabel","Success","Errored","Loading"];export{a as Disabled,x as Errored,I as Loading,r as Password,l as Readonly,m as Success,s as Text,p as WithButtons,d as WithLabel,i as WithLeftAndRightItem,c as WithLeftItem,u as WithRightItem,$n as __namedExportsOrder,Zn as default};
