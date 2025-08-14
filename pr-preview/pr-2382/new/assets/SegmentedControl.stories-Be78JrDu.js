import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import{c as r}from"./fondue-icons351-CNs5B0wj.js";import{a as N}from"./index-B-lxVbXh.js";import{L as V}from"./Label-DLdJYH0f.js";import{T as n}from"./Tooltip-DbfWYHFM.js";import{S as A,a as D,b as t}from"./SegmentedControl-BEi0a-fn.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./index-Cr2iZZCw.js";import"./index-Cho7bklK.js";import"./index-BUNfiIdP.js";import"./styleUtilities-Byf6Fdv2.js";import"./index-BIU06K05.js";import"./index-CWz5EflU.js";import"./index-DuL23WnM.js";import"./index-6uuHhnjI.js";import"./index-Dkr9yJHh.js";import"./ThemeProvider-DsLTl1GE.js";import"./index-CkS44jOL.js";import"./index-BPwneg5l.js";import"./index-CZKF78Oq.js";import"./useControllableState-BFVgFTLk.js";const de={title:"Components/Segmented Control",component:D,subcomponents:{"SegmentedControl.Item":A},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:N("onValueChange")},decorators:o=>e.jsx("div",{className:"tw-w-64",children:e.jsx(o,{})})},s={render:o=>e.jsxs(t.Root,{...o,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})},d={render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(n.Root,{children:[e.jsx(n.Trigger,{asChild:!0,children:e.jsx(t.Item,{value:"first",children:"First"})}),e.jsx(n.Content,{children:"First one"})]}),e.jsxs(n.Root,{children:[e.jsx(n.Trigger,{asChild:!0,children:e.jsx(t.Item,{value:"second",children:"Second"})}),e.jsx(n.Content,{children:"Second one"})]}),e.jsxs(n.Root,{children:[e.jsx(n.Trigger,{asChild:!0,children:e.jsx(t.Item,{value:"third",children:"Third"})}),e.jsx(n.Content,{children:"Third one"})]})]})},l={render:o=>e.jsxs(t.Root,{...o,children:[e.jsx(t.Item,{value:"first",children:e.jsx(r,{size:20})}),e.jsx(t.Item,{value:"second",children:e.jsx(r,{size:20})}),e.jsx(t.Item,{value:"third",children:e.jsx(r,{size:20})})]})},i={render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(r,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(r,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(r,{size:20}),"Third"]})]})},m={render:o=>e.jsxs(t.Root,{...o,disabled:!0,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(r,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(r,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(r,{size:20}),"Third"]})]})},a={render:o=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(V,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(t.Root,{...o,id:"segmented-control",children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})]})},c={render:o=>e.jsxs(t.Root,{...o,hugWidth:!1,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})};var g,h,I;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(I=(h=s.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};var S,p,u;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(u=(p=d.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var C,x,j;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(j=(x=l.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var T,v,R;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
        </SegmentedControl.Root>
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};var f,z,F;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
        </SegmentedControl.Root>
}`,...(F=(z=m.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var b,w,W;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(W=(w=a.parameters)==null?void 0:w.docs)==null?void 0:W.source}}};var L,y,O;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args} hugWidth={false}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(O=(y=c.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};const le=["TextOnly","WithTooltip","IconOnly","IconAndText","Disabled","WithLabel","FullWidth"];export{m as Disabled,c as FullWidth,i as IconAndText,l as IconOnly,s as TextOnly,a as WithLabel,d as WithTooltip,le as __namedExportsOrder,de as default};
