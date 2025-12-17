import{j as e}from"./iframe-B6EpHfGw.js";import{c as r}from"./fondue-icons369-CbSAQOuL.js";import{L as le}from"./Label-DXrEza0r.js";import{T as o}from"./Tooltip-CgXCkHpT.js";import{S as ae,a as me,b as n}from"./SegmentedControl-BcLHNQ2S.js";import"./preload-helper-mNEUNaaY.js";import"./index-zUZN5FSl.js";import"./index-BtoJYxRy.js";import"./index-Bs4i2X9i.js";import"./index-VSdojzO-.js";import"./index-C8wwbbqK.js";import"./index-Cgf_QHKk.js";import"./styleUtilities-2BeOq_wU.js";import"./index-DitUrC84.js";import"./index-DdmptBRa.js";import"./index-BDXKwjDT.js";import"./useControllableState-BNuR45w-.js";const{action:ie}=__STORYBOOK_MODULE_ACTIONS__,Ve={title:"Components/Segmented Control",component:me,subcomponents:{"SegmentedControl.Item":ae},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:ie("onValueChange")},decorators:t=>e.jsx("div",{className:"tw-w-64",children:e.jsx(t,{})})},s={render:t=>e.jsxs(n.Root,{...t,children:[e.jsx(n.Item,{value:"first",children:"First"}),e.jsx(n.Item,{value:"second",children:"Second"}),e.jsx(n.Item,{value:"third",children:"Third"})]})},d={render:t=>e.jsxs(n.Root,{...t,children:[e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{asChild:!0,children:e.jsx(n.Item,{value:"first",children:"First"})}),e.jsx(o.Content,{children:"First one"})]}),e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{asChild:!0,children:e.jsx(n.Item,{value:"second",children:"Second"})}),e.jsx(o.Content,{children:"Second one"})]}),e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{asChild:!0,children:e.jsx(n.Item,{value:"third",children:"Third"})}),e.jsx(o.Content,{children:"Third one"})]})]})},l={render:t=>e.jsxs(n.Root,{...t,children:[e.jsx(n.Item,{value:"first",children:e.jsx(r,{size:20})}),e.jsx(n.Item,{value:"second",children:e.jsx(r,{size:20})}),e.jsx(n.Item,{value:"third",children:e.jsx(r,{size:20})})]})},a={render:t=>e.jsxs(n.Root,{...t,children:[e.jsxs(n.Item,{value:"first",children:[e.jsx(r,{size:20}),"First"]}),e.jsxs(n.Item,{value:"second",children:[e.jsx(r,{size:20}),"Second"]}),e.jsxs(n.Item,{value:"third",children:[e.jsx(r,{size:20}),"Third"]})]}),decorators:t=>e.jsx("div",{className:"tw-w-80",children:e.jsx(t,{})})},m={args:{disabled:!0},render:t=>e.jsxs(n.Root,{...t,children:[e.jsxs(n.Item,{value:"first",children:[e.jsx(r,{size:20}),"First"]}),e.jsxs(n.Item,{value:"second",children:[e.jsx(r,{size:20}),"Second"]}),e.jsxs(n.Item,{value:"third",children:[e.jsx(r,{size:20}),"Third"]})]}),decorators:t=>e.jsx("div",{className:"tw-w-80",children:e.jsx(t,{})})},i={render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(le,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(n.Root,{...t,id:"segmented-control",children:[e.jsx(n.Item,{value:"first",children:"First"}),e.jsx(n.Item,{value:"second",children:"Second"}),e.jsx(n.Item,{value:"third",children:"Third"})]})]})},c={render:t=>e.jsxs(n.Root,{...t,hugWidth:!1,children:[e.jsx(n.Item,{value:"first",children:"First"}),e.jsx(n.Item,{value:"second",children:"Second"}),e.jsx(n.Item,{value:"third",children:"Third"})]}),decorators:t=>e.jsx("div",{className:"tw-w-96",children:e.jsx(t,{})})},g={render:t=>e.jsxs(n.Root,{...t,children:[e.jsx(n.Item,{value:"first",children:"First"}),e.jsx(n.Item,{value:"second",children:"Second"}),e.jsx(n.Item,{value:"third",children:"Third"})]}),decorators:t=>e.jsx("div",{className:"tw-w-40",children:e.jsx(t,{})})};var C,S,u;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{code:`const TextOnly = () => (
  <SegmentedControl.Root
    defaultValue="first"
    disabled={false}
    onValueChange={action("onValueChange")}
  >
    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
  </SegmentedControl.Root>
);
`,...(u=(S=s.parameters)==null?void 0:S.docs)==null?void 0:u.source}}};var I,h,p;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{code:`const WithTooltip = () => (
  <SegmentedControl.Root
    defaultValue="first"
    disabled={false}
    onValueChange={action("onValueChange")}
  >
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SegmentedControl.Item value="first">First</SegmentedControl.Item>
      </Tooltip.Trigger>
      <Tooltip.Content>First one</Tooltip.Content>
    </Tooltip.Root>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
      </Tooltip.Trigger>
      <Tooltip.Content>Second one</Tooltip.Content>
    </Tooltip.Root>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
      </Tooltip.Trigger>
      <Tooltip.Content>Third one</Tooltip.Content>
    </Tooltip.Root>
  </SegmentedControl.Root>
);
`,...(p=(h=d.parameters)==null?void 0:h.docs)==null?void 0:p.source}}};var T,v,x;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{code:`const IconOnly = () => (
  <SegmentedControl.Root
    defaultValue="first"
    disabled={false}
    onValueChange={action("onValueChange")}
  >
    <SegmentedControl.Item value="first">
      <IconIcon size={20} />
    </SegmentedControl.Item>
    <SegmentedControl.Item value="second">
      <IconIcon size={20} />
    </SegmentedControl.Item>
    <SegmentedControl.Item value="third">
      <IconIcon size={20} />
    </SegmentedControl.Item>
  </SegmentedControl.Root>
);
`,...(x=(v=l.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var f,j,R;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{code:`const IconAndText = () => (
  <SegmentedControl.Root
    defaultValue="first"
    disabled={false}
    onValueChange={action("onValueChange")}
  >
    <SegmentedControl.Item value="first">
      <IconIcon size={20} />
      First
    </SegmentedControl.Item>
    <SegmentedControl.Item value="second">
      <IconIcon size={20} />
      Second
    </SegmentedControl.Item>
    <SegmentedControl.Item value="third">
      <IconIcon size={20} />
      Third
    </SegmentedControl.Item>
  </SegmentedControl.Root>
);
`,...(R=(j=a.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};var F,w,z;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{code:`const Disabled = () => (
  <SegmentedControl.Root
    defaultValue="first"
    disabled
    onValueChange={action("onValueChange")}
  >
    <SegmentedControl.Item value="first">
      <IconIcon size={20} />
      First
    </SegmentedControl.Item>
    <SegmentedControl.Item value="second">
      <IconIcon size={20} />
      Second
    </SegmentedControl.Item>
    <SegmentedControl.Item value="third">
      <IconIcon size={20} />
      Third
    </SegmentedControl.Item>
  </SegmentedControl.Root>
);
`,...(z=(w=m.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var V,b,y;i.parameters={...i.parameters,docs:{...(V=i.parameters)==null?void 0:V.docs,source:{code:`const WithLabel = () => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <Label htmlFor="segmented-control">Segmented Control</Label>
      <SegmentedControl.Root
        defaultValue="first"
        disabled={false}
        onValueChange={action("onValueChange")}
        id="segmented-control"
      >
        <SegmentedControl.Item value="first">First</SegmentedControl.Item>
        <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
        <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  );
};
`,...(y=(b=i.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var N,O,W;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{code:`const FullWidth = () => (
  <SegmentedControl.Root
    defaultValue="first"
    disabled={false}
    onValueChange={action("onValueChange")}
    hugWidth={false}
  >
    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
  </SegmentedControl.Root>
);
`,...(W=(O=c.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var L,_,A;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{code:`const ContainerTooSmall = () => (
  <SegmentedControl.Root
    defaultValue="first"
    disabled={false}
    onValueChange={action("onValueChange")}
  >
    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
  </SegmentedControl.Root>
);
`,...(A=(_=g.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var D,E,B;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(B=(E=s.parameters)==null?void 0:E.docs)==null?void 0:B.source}}};var K,M,U;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
                </Tooltip.Trigger>
                <Tooltip.Content>First one</Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
                </Tooltip.Trigger>
                <Tooltip.Content>Second one</Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
                </Tooltip.Trigger>
                <Tooltip.Content>Third one</Tooltip.Content>
            </Tooltip.Root>
        </SegmentedControl.Root>
}`,...(U=(M=d.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};var Y,k,q;l.parameters={...l.parameters,docs:{...(Y=l.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">
                <IconIcon size={20} />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={20} />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={20} />
            </SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(q=(k=l.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var G,H,J;a.parameters={...a.parameters,docs:{...(G=a.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">
                <IconIcon size={20} />
                First
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={20} />
                Second
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={20} />
                Third
            </SegmentedControl.Item>
        </SegmentedControl.Root>,
  decorators: Story => <div className="tw-w-80">
            <Story />
        </div>
}`,...(J=(H=a.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var P,Q,X;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">
                <IconIcon size={20} />
                First
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={20} />
                Second
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={20} />
                Third
            </SegmentedControl.Item>
        </SegmentedControl.Root>,
  decorators: Story => <div className="tw-w-80">
            <Story />
        </div>
}`,...(X=(Q=m.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,$,ee;i.parameters={...i.parameters,docs:{...(Z=i.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: args => {
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label htmlFor="segmented-control">Segmented Control</Label>

                <SegmentedControl.Root {...args} id="segmented-control">
                    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
                    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
                    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
                </SegmentedControl.Root>
            </div>;
  }
}`,...(ee=($=i.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var ne,te,oe;c.parameters={...c.parameters,docs:{...(ne=c.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args} hugWidth={false}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
  decorators: Story => <div className="tw-w-96">
            <Story />
        </div>
}`,...(oe=(te=c.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var re,se,de;g.parameters={...g.parameters,docs:{...(re=g.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
  decorators: Story => <div className="tw-w-40">
            <Story />
        </div>
}`,...(de=(se=g.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};const be=["TextOnly","WithTooltip","IconOnly","IconAndText","Disabled","WithLabel","FullWidth","ContainerTooSmall"];export{g as ContainerTooSmall,m as Disabled,c as FullWidth,a as IconAndText,l as IconOnly,s as TextOnly,i as WithLabel,d as WithTooltip,be as __namedExportsOrder,Ve as default};
