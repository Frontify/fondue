import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import{c as r}from"./fondue-icons352-BBEDZbgo.js";import{a as E}from"./index-B-lxVbXh.js";import{L as _}from"./Label-C5tEo_EU.js";import{T as n}from"./Tooltip-DtFtg8Ev.js";import{S as k,a as q,b as t}from"./SegmentedControl-CWBgA7kw.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./index-CMmqAaFT.js";import"./index-BUMxx5F6.js";import"./index-Q_VQqEV0.js";import"./styleUtilities-Byf6Fdv2.js";import"./index-DulyF36n.js";import"./index-CWz5EflU.js";import"./index-JHbJ-wYR.js";import"./index-BezEZHzC.js";import"./index-BZQsQlpo.js";import"./ThemeProvider-Dbar5Ost.js";import"./index-CisXfU_o.js";import"./index-DVmTVPLY.js";import"./index-CZKF78Oq.js";import"./useControllableState-D84sIWhr.js";const ae={title:"Components/Segmented Control",component:q,subcomponents:{"SegmentedControl.Item":k},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:E("onValueChange")},decorators:o=>e.jsx("div",{className:"tw-w-64",children:e.jsx(o,{})})},s={render:o=>e.jsxs(t.Root,{...o,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})},d={render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(n.Root,{children:[e.jsx(n.Trigger,{asChild:!0,children:e.jsx(t.Item,{value:"first",children:"First"})}),e.jsx(n.Content,{children:"First one"})]}),e.jsxs(n.Root,{children:[e.jsx(n.Trigger,{asChild:!0,children:e.jsx(t.Item,{value:"second",children:"Second"})}),e.jsx(n.Content,{children:"Second one"})]}),e.jsxs(n.Root,{children:[e.jsx(n.Trigger,{asChild:!0,children:e.jsx(t.Item,{value:"third",children:"Third"})}),e.jsx(n.Content,{children:"Third one"})]})]})},l={render:o=>e.jsxs(t.Root,{...o,children:[e.jsx(t.Item,{value:"first",children:e.jsx(r,{size:20})}),e.jsx(t.Item,{value:"second",children:e.jsx(r,{size:20})}),e.jsx(t.Item,{value:"third",children:e.jsx(r,{size:20})})]})},i={render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(r,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(r,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(r,{size:20}),"Third"]})]}),decorators:o=>e.jsx("div",{className:"tw-w-80",children:e.jsx(o,{})})},m={render:o=>e.jsxs(t.Root,{...o,disabled:!0,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(r,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(r,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(r,{size:20}),"Third"]})]}),decorators:o=>e.jsx("div",{className:"tw-w-80",children:e.jsx(o,{})})},a={render:o=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(_,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(t.Root,{...o,id:"segmented-control",children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})]})},c={render:o=>e.jsxs(t.Root,{...o,hugWidth:!1,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]}),decorators:o=>e.jsx("div",{className:"tw-w-96",children:e.jsx(o,{})})},g={render:o=>e.jsxs(t.Root,{...o,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]}),decorators:o=>e.jsx("div",{className:"tw-w-40",children:e.jsx(o,{})})};var S,h,I;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(I=(h=s.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};var u,C,p;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(p=(C=d.parameters)==null?void 0:C.docs)==null?void 0:p.source}}};var x,j,v;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(v=(j=l.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var T,R,f;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(f=(R=i.parameters)==null?void 0:R.docs)==null?void 0:f.source}}};var w,F,z;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args} disabled>
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
}`,...(z=(F=m.parameters)==null?void 0:F.docs)==null?void 0:z.source}}};var y,b,N;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(N=(b=a.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var W,L,O;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args} hugWidth={false}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
  decorators: Story => <div className="tw-w-96">
            <Story />
        </div>
}`,...(O=(L=c.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};var V,A,D;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
  decorators: Story => <div className="tw-w-40">
            <Story />
        </div>
}`,...(D=(A=g.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};const ce=["TextOnly","WithTooltip","IconOnly","IconAndText","Disabled","WithLabel","FullWidth","ContainerTooSmall"];export{g as ContainerTooSmall,m as Disabled,c as FullWidth,i as IconAndText,l as IconOnly,s as TextOnly,a as WithLabel,d as WithTooltip,ce as __namedExportsOrder,ae as default};
