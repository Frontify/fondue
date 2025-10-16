import{j as e}from"./iframe-CO5NeokU.js";import{c as r}from"./fondue-icons352-hfAwHyfO.js";import{L as E}from"./Label-sMmvu784.js";import{T as n}from"./Tooltip-Depuz93Z.js";import{S as V,a as B,b as t}from"./SegmentedControl-DT2ae7eR.js";import"./preload-helper-BFukNH9h.js";import"./index-C3_umOEn.js";import"./styleUtilities-Byf6Fdv2.js";import"./index-B0EsBma3.js";import"./index-CAttW14V.js";import"./index-Dm1UKkAk.js";import"./index-D0ZCmNZE.js";import"./index-BlNlwEt2.js";import"./index-Dgl23Hku.js";import"./index-DDzR9QD8.js";import"./index-CLEuXr0K.js";import"./useControllableState-CvHVoM-h.js";const{action:K}=__STORYBOOK_MODULE_ACTIONS__,re={title:"Components/Segmented Control",component:B,subcomponents:{"SegmentedControl.Item":V},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:K("onValueChange")},decorators:o=>e.jsx("div",{className:"tw-w-64",children:e.jsx(o,{})})},s={render:o=>e.jsxs(t.Root,{...o,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})},d={render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(n.Root,{children:[e.jsx(n.Trigger,{asChild:!0,children:e.jsx(t.Item,{value:"first",children:"First"})}),e.jsx(n.Content,{children:"First one"})]}),e.jsxs(n.Root,{children:[e.jsx(n.Trigger,{asChild:!0,children:e.jsx(t.Item,{value:"second",children:"Second"})}),e.jsx(n.Content,{children:"Second one"})]}),e.jsxs(n.Root,{children:[e.jsx(n.Trigger,{asChild:!0,children:e.jsx(t.Item,{value:"third",children:"Third"})}),e.jsx(n.Content,{children:"Third one"})]})]})},l={render:o=>e.jsxs(t.Root,{...o,children:[e.jsx(t.Item,{value:"first",children:e.jsx(r,{size:20})}),e.jsx(t.Item,{value:"second",children:e.jsx(r,{size:20})}),e.jsx(t.Item,{value:"third",children:e.jsx(r,{size:20})})]})},i={render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(r,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(r,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(r,{size:20}),"Third"]})]}),decorators:o=>e.jsx("div",{className:"tw-w-80",children:e.jsx(o,{})})},m={render:o=>e.jsxs(t.Root,{...o,disabled:!0,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(r,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(r,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(r,{size:20}),"Third"]})]}),decorators:o=>e.jsx("div",{className:"tw-w-80",children:e.jsx(o,{})})},a={render:o=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(E,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(t.Root,{...o,id:"segmented-control",children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})]})},c={render:o=>e.jsxs(t.Root,{...o,hugWidth:!1,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]}),decorators:o=>e.jsx("div",{className:"tw-w-96",children:e.jsx(o,{})})},g={render:o=>e.jsxs(t.Root,{...o,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]}),decorators:o=>e.jsx("div",{className:"tw-w-40",children:e.jsx(o,{})})};var S,h,I;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(I=(h=s.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};var C,u,p;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(p=(u=d.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var x,j,v;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(N=(b=a.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var O,W,_;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args} hugWidth={false}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
  decorators: Story => <div className="tw-w-96">
            <Story />
        </div>
}`,...(_=(W=c.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var L,A,D;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
  decorators: Story => <div className="tw-w-40">
            <Story />
        </div>
}`,...(D=(A=g.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};const se=["TextOnly","WithTooltip","IconOnly","IconAndText","Disabled","WithLabel","FullWidth","ContainerTooSmall"];export{g as ContainerTooSmall,m as Disabled,c as FullWidth,i as IconAndText,l as IconOnly,s as TextOnly,a as WithLabel,d as WithTooltip,se as __namedExportsOrder,re as default};
