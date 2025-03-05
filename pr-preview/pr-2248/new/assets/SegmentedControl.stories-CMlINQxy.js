import{j as e}from"./jsx-runtime-BSxFkHFN.js";import"./index-i66itsuO.js";import{c as o}from"./fondue-icons348-g6CPHV6m.js";import{a as y}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{L as N}from"./Label-165tYYFV.js";import{S as V,a as A,b as t}from"./SegmentedControl-Dz35k844.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./index-kGoNTBW-.js";import"./index-BQPO3JLn.js";import"./index-CdcT0Fdx.js";import"./styleUtilities-rhQWLmVU.js";import"./index-BwxsjnLo.js";import"./index-C_kHMVgZ.js";import"./index-lavJW8GG.js";import"./index-BFKpAWVr.js";import"./index-BUPiTiMQ.js";import"./index-X47fo0zq.js";import"./index-DLXHbKnz.js";import"./useControllableState-BeU1Rl3I.js";import"./Tooltip-bHu_uEoG.js";import"./index-BJJ-8-3y.js";import"./ThemeProvider-Bg3D_IMF.js";const se={title:"Components/Segmented Control",component:V,subcomponents:{"SegmentedControl.Item":A},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:y("onValueChange")},decorators:n=>e.jsx("div",{className:"tw-w-64",children:e.jsx(n,{})})},r={render:n=>e.jsxs(t.Root,{...n,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})},s={render:n=>e.jsxs(t.Root,{...n,children:[e.jsx(t.Item,{tooltip:"First One",value:"first",children:"First"}),e.jsx(t.Item,{tooltip:"Second One",value:"second",children:"Second"}),e.jsx(t.Item,{tooltip:"Third One",value:"third",children:"Third"})]})},d={render:n=>e.jsxs(t.Root,{...n,children:[e.jsx(t.Item,{value:"first",children:e.jsx(o,{size:20})}),e.jsx(t.Item,{value:"second",children:e.jsx(o,{size:20})}),e.jsx(t.Item,{value:"third",children:e.jsx(o,{size:20})})]})},m={render:n=>e.jsxs(t.Root,{...n,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(o,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(o,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(o,{size:20}),"Third"]})]})},l={render:n=>e.jsxs(t.Root,{...n,disabled:!0,children:[e.jsxs(t.Item,{value:"first",children:[e.jsx(o,{size:20}),"First"]}),e.jsxs(t.Item,{value:"second",children:[e.jsx(o,{size:20}),"Second"]}),e.jsxs(t.Item,{value:"third",children:[e.jsx(o,{size:20}),"Third"]})]})},i={render:n=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(N,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(t.Root,{...n,id:"segmented-control",children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})]})},a={render:n=>e.jsxs(t.Root,{...n,hugWidth:!1,children:[e.jsx(t.Item,{value:"first",children:"First"}),e.jsx(t.Item,{value:"second",children:"Second"}),e.jsx(t.Item,{value:"third",children:"Third"})]})};var c,g,I;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(I=(g=r.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var S,u,h;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item tooltip="First One" value="first">
                First
            </SegmentedControl.Item>
            <SegmentedControl.Item tooltip="Second One" value="second">
                Second
            </SegmentedControl.Item>
            <SegmentedControl.Item tooltip="Third One" value="third">
                Third
            </SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(h=(u=s.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var p,C,x;d.parameters={...d.parameters,docs:{...(p=d.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(x=(C=d.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var v,j,f;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(f=(j=m.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};var R,T,z;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(z=(T=l.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var F,b,O;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(O=(b=i.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};var w,W,L;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args} hugWidth={false}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(L=(W=a.parameters)==null?void 0:W.docs)==null?void 0:L.source}}};const de=["TextOnly","WithTooltip","IconOnly","IconAndText","Disabled","WithLabel","FullWidth"];export{l as Disabled,a as FullWidth,m as IconAndText,d as IconOnly,r as TextOnly,i as WithLabel,s as WithTooltip,de as __namedExportsOrder,se as default};
