import{r as p,j as t}from"./iframe-BcVx5NPK.js";import{a as b}from"./Box-C3Uk66F7.js";import{B as h}from"./Button-RWJVCgmd.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-C2GHsrzr.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-E75q4Srw.js";import"./Divider-DR7YAXWA.js";import"./FormControl-BDC5JdLb.js";import"./InputLabel-CUhYhSht.js";import"./TooltipIcon-BaO7ej8h.js";import"./LegacyTooltip-DyrhzydW.js";import"./useLink-oi60uFHG.js";import"./useFocusable-sOy4Nhxz.js";import"./useFocusRing-B3lGQQyY.js";import"./useEffectEvent-DXIGhCEt.js";import"./chain-CQw_duRO.js";import"./index-B7yv6Trq.js";import"./usePopper-Bl-ygjjc.js";import"./index-BM8Vr14O.js";import"./Portal-6qi5tGkP.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D8mxuONa.js";import"./IconCheckMark-2IBl3Pfz.js";import"./IconExclamationMarkCircle24-QcrGoLdb.js";import"./IconExclamationMarkTriangle-6jtpVZPg.js";import"./IconExclamationMarkTriangle24-PShe76FC.js";import"./IconQuestionMarkCircle-BPbpPbfN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CIxzqMKC.js";import"./Switch-DEZ4k8o7.js";import"./TabItem-mjMEiDoZ.js";import"./elements-BOYmskOL.js";import"./TextInput-Cp16C1LO.js";import"./IconCross-l8JGVZNG.js";import"./Tree-DkRcL4mr.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CrOcaT6T.js";import"./IconCaretDown-Bcj1UjOS.js";import"./IconCaretDown16-CymR5yEU.js";import"./IconTrashBin16-De3Vw11G.js";import"./IconTrashBin24-DsBjmQ36.js";import"./useButton-_aFHH79R.js";import"./useClickOutside-tPfe4O2A.js";import"./EnablePortalWrapper-Cd2XASpE.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const bt=["Default","WithPortal"];export{e as Default,o as WithPortal,bt as __namedExportsOrder,wt as default};
