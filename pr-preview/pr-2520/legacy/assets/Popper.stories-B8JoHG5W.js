import{r as s,j as e}from"./iframe-CiwACjsc.js";import{a as b}from"./Box-Dp7Q6bhQ.js";import{B as h}from"./Button-CjIneEiB.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-UY50aFdL.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CqZp0YBX.js";import"./DialogBody-DDM7skyb.js";import"./dialog-D9O7a7Fm.js";import"./LoadingCircle-Ba4wKdIB.js";import"./TabItem-DHaJBlEw.js";import"./elements-BOYmskOL.js";import"./TextInput-DnVh3KN0.js";import"./useFocusRing-CZtrS9NI.js";import"./useEffectEvent-HHgJO59M.js";import"./IconCheckMark-BnRnhIos.js";import"./IconSize-BcCrF_mi.js";import"./IconCross-S71LHmur.js";import"./IconExclamationMarkTriangle-l6D6erCL.js";import"./IconExclamationMarkTriangle24-B-7f8jU_.js";import"./useMemoizedId-Q2Jad74z.js";import"./validation-C9S5KgfE.js";import"./LegacyTooltip-BD7-6yIc.js";import"./useLink-BjVU2b7g.js";import"./useFocusable-CdD2RH-C.js";import"./chain-DsjYALZ0.js";import"./index-DXMRjXjX.js";import"./usePopper-Bpxh3YGr.js";import"./index-C5iC6E4o.js";import"./Portal-BK4Sz22d.js";import"./IconExclamationMarkCircle24-CTQNwKTd.js";import"./Tree-DiHLrcTa.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-D584SNKT.js";import"./useClickOutside-BfZwb7Cd.js";import"./EnablePortalWrapper-CgFhD3Y5.js";const se={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-flex tw-justify-center">
            <Button ref={anchorRef} onClick={() => setOpen(!open)}>
                Hello
            </Button>
            <Popper {...args} anchor={anchorRef} open={open}>
                <Box className="tw-bg-base tw-border tw-border-black tw-w-[400px]">
                    <p>Some content</p>
                </Box>
            </Popper>
        </div>;
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,l,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-flex tw-justify-center">
            <Button ref={anchorRef} onClick={() => setOpen(!open)}>
                Hello
            </Button>
            <Popper {...args} anchor={anchorRef} open={open}>
                <Box className="tw-bg-base tw-border tw-border-black tw-w-[400px]">
                    <p>Some content</p>
                </Box>
            </Popper>
        </div>;
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const pe=["Default","WithPortal"];export{t as Default,o as WithPortal,pe as __namedExportsOrder,se as default};
