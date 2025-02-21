import{j as e}from"./jsx-runtime-Blucd9Qg.js";import"./index-CcKhGcwW.js";import{c as o}from"./fondue-icons348-B2f6cy1d.js";import{a as R}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import{L as b}from"./Label-B5L12TY_.js";import{S as T,a as F,b as t}from"./SegmentedControl-SfeYhWE0.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./index-CgtKoCjW.js";import"./index-BP1ZzxOr.js";import"./styleUtilities-Byf6Fdv2.js";import"./index-wv0ygH-x.js";import"./index-D0NW8ecy.js";import"./index-CCn5tDqq.js";import"./index-DltKixQ7.js";import"./index-DlzMWMjO.js";import"./index-DCff3nt3.js";import"./index-25t9Xkul.js";import"./useControllableState-B--d65Fu.js";const P={title:"Components/Segmented Control",component:F,subcomponents:{"SegmentedControl.Item":T},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:R("onValueChange")},decorators:n=>e.jsx("div",{className:"tw-w-64",children:e.jsx(n,{})})},r={render:n=>e.jsxs(t.Root,{...n,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})},s={render:n=>e.jsxs(t.Root,{...n,children:[e.jsx(t.Item,{value:"first",children:e.jsx(o,{size:20})}),e.jsx(t.Item,{value:"second",children:e.jsx(o,{size:20})}),e.jsx(t.Item,{value:"third",children:e.jsx(o,{size:20})})]})},d={render:n=>e.jsxs(t.Root,{...n,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(o,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(o,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(o,{size:20}),"Third"]})]})},m={render:n=>e.jsxs(t.Root,{...n,disabled:!0,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(o,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(o,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(o,{size:20}),"Third"]})]})},l={render:n=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(b,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(t.Root,{...n,id:"segmented-control",children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})]})};var a,i,c;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(c=(i=r.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var g,I,S;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(S=(I=s.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};var u,C,p;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(p=(C=d.parameters)==null?void 0:C.docs)==null?void 0:p.source}}};var h,x,j;m.parameters={...m.parameters,docs:{...(h=m.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(j=(x=m.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var v,f,z;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(z=(f=l.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};const Q=["TextOnly","IconOnly","IconAndText","Disabled","WithLabel"];export{m as Disabled,d as IconAndText,s as IconOnly,r as TextOnly,l as WithLabel,Q as __namedExportsOrder,P as default};
