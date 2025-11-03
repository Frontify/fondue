import{r as p,j as t}from"./iframe-BowQ0jGp.js";import{a as b}from"./Box-QK0CIj8u.js";import{B as h}from"./Button-CQGJo0QK.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BvyEFu8R.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DyKukZy3.js";import"./Divider-00pqZOjK.js";import"./FormControl-CflmXIz4.js";import"./InputLabel-DllKOG0h.js";import"./TooltipIcon-CU4pLt43.js";import"./LegacyTooltip-LzbcpUw0.js";import"./useLink-C5ddy1rS.js";import"./useFocusable-ChtcloIq.js";import"./useFocusRing-COxpplxr.js";import"./useEffectEvent-BRx6deDQ.js";import"./chain-DM-r0UYe.js";import"./index-CDvlvMGo.js";import"./usePopper-Bt4hz7Iy.js";import"./index-BCy-ay0x.js";import"./Portal-m3fdG8m8.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BX9aPyll.js";import"./IconCheckMark-D_qMZotA.js";import"./IconExclamationMarkCircle24-DYHkGOoQ.js";import"./IconExclamationMarkTriangle-CbweDmlD.js";import"./IconExclamationMarkTriangle24-BhIGoSmM.js";import"./IconQuestionMarkCircle-DEuMgKKd.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CQr4f1rm.js";import"./Switch-B6RpDB7x.js";import"./TabItem-CV0BDJs8.js";import"./elements-BOYmskOL.js";import"./TextInput-USKfn8MZ.js";import"./IconCross-Ba779HJ8.js";import"./Tree-xd6uRlkH.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-ByV3oOXU.js";import"./IconCaretDown-ClkUrooK.js";import"./IconCaretDown16-LO6U1dMl.js";import"./IconTrashBin16-CkmI3Ywn.js";import"./IconTrashBin24-BQoqNjfq.js";import"./useButton-CldgbS-1.js";import"./useClickOutside-DfZ0EkqO.js";import"./EnablePortalWrapper-BJ1exqVv.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
