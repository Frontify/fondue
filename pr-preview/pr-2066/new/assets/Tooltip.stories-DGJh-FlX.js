import{j as o}from"./jsx-runtime-Nms4Y4qS.js";import{r as b}from"./index-BwDkhjyp.js";import{b as L,c as O}from"./fondue-icons326-xfcb5yXJ.js";import{B as e}from"./Button-Bmc9bttI.js";import{h as l}from"./Dropdown-3HBC_iIX.js";import{F as r}from"./Flex-CwuMknTo.js";import{L as s}from"./Label-DGO3QOB6.js";import{S as E}from"./Switch-BkmYdC2_.js";import{T as h}from"./TextInput-BqTiflci.js";import{a as P,b as z,c as N,T as t}from"./Tooltip-DvWejVSX.js";import{i}from"./Dialog-CeXzm0Ka.js";import{F as a}from"./Flyout-COhimhgB.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./index-DOnKqARA.js";import"./index-Brw_kfkv.js";import"./index-DxjWwZXO.js";import"./index-BWD2N0gV.js";import"./index-DGaPG0k3.js";import"./index-BCwfsm-V.js";import"./index-C8IlRUt1.js";import"./index-9q6yCIGA.js";import"./index-kUwV4muI.js";import"./usePreventDropdownOverflow-hl17Ppn0.js";import"./index-DduqEaLY.js";import"./index-BwIM2_zL.js";import"./index-ImmjAmjo.js";import"./propsToCssVariables-BE5Q_-YS.js";import"./index-BgCrdp81.js";import"./index-FKkhIU6G.js";const To={component:P,title:"Components/Tooltip",subcomponents:{"Tooltip.Content":z,"Tooltip.Trigger":N},tags:["autodocs"],parameters:{status:{type:"in_progress"}},render:({...n})=>o.jsxs(t.Root,{...n,children:[o.jsx(t.Trigger,{children:o.jsx(e,{children:"Hover over me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})},p={args:{}},c={args:{enterDelay:0}},m={args:{enterDelay:2e3}},d={decorators:[n=>o.jsx("div",{className:"tw-flex tw-gap-4",children:o.jsx(n,{})})],render:()=>{const[n,x]=b.useState(!1);return o.jsxs(o.Fragment,{children:[o.jsxs(t.Root,{open:n,onOpenChange:x,children:[o.jsx(t.Trigger,{children:o.jsx(e,{children:"Hover over me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]}),o.jsx(e,{onPress:()=>x(!0),children:"Open Tooltip"}),o.jsx(e,{onPress:()=>x(!1),children:"Close Tooltip"})]})}},g={decorators:[n=>o.jsx(r,{direction:"column",gap:"16px",align:"flex-start",children:o.jsx(n,{})})],render:()=>o.jsxs(o.Fragment,{children:[o.jsxs(r,{direction:"column",gap:"4px",align:"flex-start",children:[o.jsx(s,{htmlFor:"switch",children:"Switch with tooltip"}),o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(E,{id:"switch","aria-label":"Hover me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})]}),o.jsxs(r,{direction:"column",gap:"4px",align:"flex-start",children:[o.jsx(s,{htmlFor:"noop",children:"Input with tooltips"}),o.jsxs(h.Root,{children:[o.jsx(h.Slot,{name:"left",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(L,{size:16})}),o.jsx(t.Content,{children:"I have a pen"})]})}),o.jsx(h.Slot,{name:"right",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(O,{size:16})}),o.jsx(t.Content,{children:"I am an icon with a tooltip"})]})})]})]}),o.jsxs(r,{direction:"column",gap:"4px",align:"flex-start",children:[o.jsx(s,{htmlFor:"noop",children:"Button with tooltip"}),o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(e,{children:"Hover me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})]}),o.jsxs(r,{direction:"column",gap:"4px",align:"flex-start",children:[o.jsx(s,{htmlFor:"noop",children:"Dropdown trigger with tooltip"}),o.jsxs(l.Root,{children:[o.jsx(l.Trigger,{children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(e,{children:"Hover me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})}),o.jsxs(l.Content,{children:[o.jsx(l.Item,{onSelect:()=>{},children:"Item 1"}),o.jsx(l.Item,{onSelect:()=>{},children:"Item 2"}),o.jsx(l.Item,{onSelect:()=>{},children:"Item 3"})]})]})]}),o.jsxs(r,{direction:"column",gap:"4px",align:"flex-start",children:[o.jsx(s,{htmlFor:"noop",children:"Flyout trigger with tooltip"}),o.jsxs(a.Root,{children:[o.jsx(a.Trigger,{children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(e,{children:"Hover me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})}),o.jsxs(a.Content,{children:[o.jsx(a.Header,{children:"Header"}),o.jsx(a.Body,{children:"I am a flyout"})]})]})]}),o.jsxs(r,{direction:"column",gap:"4px",align:"flex-start",children:[o.jsx(s,{htmlFor:"noop",children:"Dialog trigger with tooltip"}),o.jsxs(i.Root,{children:[o.jsx(i.Trigger,{children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(e,{children:"Hover me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})}),o.jsxs(i.Content,{children:[o.jsx(i.Header,{children:o.jsx(i.Title,{children:"Header"})}),o.jsx(i.Body,{}),o.jsxs(i.Footer,{children:[o.jsx(e,{emphasis:"default",children:"Cancel"}),o.jsx(e,{children:"Submit"})]})]})]})]})]})};var T,u,j;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {}
}`,...(j=(u=p.parameters)==null?void 0:u.docs)==null?void 0:j.source}}};var I,C,F;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    enterDelay: 0
  }
}`,...(F=(C=c.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var f,w,D;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    enterDelay: 2000
  }
}`,...(D=(w=m.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var R,y,S;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  decorators: [Story => {
    return <div className="tw-flex tw-gap-4">
                    <Story />
                </div>;
  }],
  render: () => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    return <>
                <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                    <Tooltip.Trigger>
                        <Button>Hover over me!</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                </Tooltip.Root>
                <Button onPress={() => setIsTooltipOpen(true)}>Open Tooltip</Button>
                <Button onPress={() => setIsTooltipOpen(false)}>Close Tooltip</Button>
            </>;
  }
}`,...(S=(y=d.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var B,v,H;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  decorators: [Story => {
    return <Flex direction="column" gap="16px" align="flex-start">
                    <Story />
                </Flex>;
  }],
  render: () => {
    return <>
                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="switch">Switch with tooltip</Label>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Switch id="switch" aria-label="Hover me!" />
                        </Tooltip.Trigger>
                        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                    </Tooltip.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Input with tooltips</Label>
                    <TextInput.Root>
                        <TextInput.Slot name="left">
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <IconPen size={16} />
                                </Tooltip.Trigger>
                                <Tooltip.Content>I have a pen</Tooltip.Content>
                            </Tooltip.Root>
                        </TextInput.Slot>
                        <TextInput.Slot name="right">
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <IconIcon size={16} />
                                </Tooltip.Trigger>
                                <Tooltip.Content>I am an icon with a tooltip</Tooltip.Content>
                            </Tooltip.Root>
                        </TextInput.Slot>
                    </TextInput.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Button with tooltip</Label>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Button>Hover me!</Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                    </Tooltip.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Dropdown trigger with tooltip</Label>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <Button>Hover me!</Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                            </Tooltip.Root>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Flyout trigger with tooltip</Label>
                    <Flyout.Root>
                        <Flyout.Trigger>
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <Button>Hover me!</Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                            </Tooltip.Root>
                        </Flyout.Trigger>
                        <Flyout.Content>
                            <Flyout.Header>Header</Flyout.Header>
                            <Flyout.Body>I am a flyout</Flyout.Body>
                        </Flyout.Content>
                    </Flyout.Root>
                </Flex>

                <Flex direction="column" gap="4px" align="flex-start">
                    <Label htmlFor="noop">Dialog trigger with tooltip</Label>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <Button>Hover me!</Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                            </Tooltip.Root>
                        </Dialog.Trigger>

                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Header</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body />
                            <Dialog.Footer>
                                <Button emphasis="default">Cancel</Button>
                                <Button>Submit</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>
            </>;
  }
}`,...(H=(v=g.parameters)==null?void 0:v.docs)==null?void 0:H.source}}};const uo=["Default","NoDelay","LongDelay","ControlledComponent","WithInteractiveElements"];export{d as ControlledComponent,p as Default,m as LongDelay,c as NoDelay,g as WithInteractiveElements,uo as __namedExportsOrder,To as default};
