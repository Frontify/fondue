import{r as p,j as t}from"./iframe-CMpkON89.js";import{a as b}from"./Box-g_fvXqx6.js";import{B as h}from"./Button-DBQd5wjc.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BUYOplGK.js";import"./preload-helper-B3whO8fc.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DWk1JnjE.js";import"./DialogBody-BUjD0nOH.js";import"./dialog-D9O7a7Fm.js";import"./Divider-BKkgUAbC.js";import"./FormControl-BcgCajyc.js";import"./InputLabel-hjiDARke.js";import"./TooltipIcon-VB0vu51_.js";import"./LegacyTooltip-COl642PU.js";import"./useLink-BukK8isd.js";import"./useFocusable-HnrZsKbR.js";import"./useFocusRing-DIEOJSVz.js";import"./useEffectEvent-4-XY5svK.js";import"./chain-BCNQpcpO.js";import"./index-B9LBdfw3.js";import"./usePopper-P6sL91Sq.js";import"./index-Ckuc5XOc.js";import"./Portal-5x1gUpXv.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BQ7TLkNl.js";import"./IconCheckMark-B_wXSDGe.js";import"./IconExclamationMarkCircle24-B5rNnrJ5.js";import"./IconExclamationMarkTriangle-Jy0sbFD7.js";import"./IconExclamationMarkTriangle24-C4ujeA1c.js";import"./IconQuestionMarkCircle-tH6uHRs_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-QlXdVjZL.js";import"./Switch-DRlDhOgo.js";import"./TabItem-D6DFutG5.js";import"./elements-BOYmskOL.js";import"./TextInput-DqAlllq3.js";import"./IconCross-qTsAaCLg.js";import"./Tree-BCJT0uuz.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-D7jn93Yi.js";import"./IconCaretDown-2ULPbKV-.js";import"./IconCaretDown16-DPkMkxHs.js";import"./IconTrashBin16-Cn-rAnRV.js";import"./IconTrashBin24-rcV-ZyH-.js";import"./useButton-CNY16gNn.js";import"./useClickOutside-B_5vnK3p.js";import"./EnablePortalWrapper-BPlcZ-uN.js";const bt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const ht=["Default","WithPortal"];export{e as Default,o as WithPortal,ht as __namedExportsOrder,bt as default};
