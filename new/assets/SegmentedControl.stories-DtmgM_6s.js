import{j as e}from"./jsx-runtime-BSxFkHFN.js";import"./index-i66itsuO.js";import{c as o}from"./fondue-icons348-g6CPHV6m.js";import{a as w}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{L}from"./Label-165tYYFV.js";import{S as W,a as y,b as t}from"./SegmentedControl-DOqWNug0.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./index-kGoNTBW-.js";import"./index-BQPO3JLn.js";import"./index-CdcT0Fdx.js";import"./styleUtilities-rhQWLmVU.js";import"./index-BwxsjnLo.js";import"./index-BoR4MukD.js";import"./index-BNYVQE02.js";import"./index-BFKpAWVr.js";import"./index-BJaWHrbV.js";import"./index-P4w4wmP2.js";import"./index-DLXHbKnz.js";import"./useControllableState-BeU1Rl3I.js";const Z={title:"Components/Segmented Control",component:W,subcomponents:{"SegmentedControl.Item":y},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:w("onValueChange")},decorators:n=>e.jsx("div",{className:"tw-w-64",children:e.jsx(n,{})})},r={render:n=>e.jsxs(t.Root,{...n,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})},s={render:n=>e.jsxs(t.Root,{...n,children:[e.jsx(t.Item,{value:"first",children:e.jsx(o,{size:20})}),e.jsx(t.Item,{value:"second",children:e.jsx(o,{size:20})}),e.jsx(t.Item,{value:"third",children:e.jsx(o,{size:20})})]})},d={render:n=>e.jsxs(t.Root,{...n,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(o,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(o,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(o,{size:20}),"Third"]})]})},m={render:n=>e.jsxs(t.Root,{...n,disabled:!0,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(o,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(o,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(o,{size:20}),"Third"]})]})},l={render:n=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(L,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(t.Root,{...n,id:"segmented-control",children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})]})},a={render:n=>e.jsxs(t.Root,{...n,hugWidth:!1,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})};var i,c,g;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(g=(c=r.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var I,S,u;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(u=(S=s.parameters)==null?void 0:S.docs)==null?void 0:u.source}}};var h,C,p;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(p=(C=d.parameters)==null?void 0:C.docs)==null?void 0:p.source}}};var x,v,j;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(j=(v=m.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var f,R,z;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(z=(R=l.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var F,T,b;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args} hugWidth={false}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(b=(T=a.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};const $=["TextOnly","IconOnly","IconAndText","Disabled","WithLabel","FullWidth"];export{m as Disabled,a as FullWidth,d as IconAndText,s as IconOnly,r as TextOnly,l as WithLabel,$ as __namedExportsOrder,Z as default};
