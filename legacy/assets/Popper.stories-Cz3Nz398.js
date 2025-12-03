import{r as p,j as t}from"./iframe-CPVXeDTJ.js";import{a as b}from"./Box-CRe9VAG5.js";import{B as h}from"./Button-DcvZ1DZ0.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DpuhuC-M.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-5Qr1kmcq.js";import"./Divider-CuNYdysP.js";import"./FormControl-C_o05XeK.js";import"./InputLabel-DWHhHPOs.js";import"./TooltipIcon-CXQeRWDh.js";import"./LegacyTooltip-BU4dCUVV.js";import"./useLink-CXlKXDhg.js";import"./useFocusable-wuqHFRru.js";import"./useFocusRing-D193FtFi.js";import"./useEffectEvent-CSmJharH.js";import"./chain-GAT8LxO8.js";import"./index-BDGYgm0p.js";import"./usePopper-DOqAeV49.js";import"./index-Ymu7xFIT.js";import"./Portal-B44rDUW3.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CohZOODg.js";import"./IconCheckMark-BM1Nx-81.js";import"./IconExclamationMarkCircle24-D7s9QYvy.js";import"./IconExclamationMarkTriangle-UZ-zXXAT.js";import"./IconExclamationMarkTriangle24-BBWvN_rT.js";import"./IconQuestionMarkCircle-eH6dV0Lo.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BrEgRMi_.js";import"./Switch-CwQRvBgj.js";import"./TabItem-DV3wlJoW.js";import"./elements-BOYmskOL.js";import"./TextInput-B1MRhG65.js";import"./IconCross-zRrar9C3.js";import"./Tree-F8IHkW6W.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger--iYref-1.js";import"./IconCaretDown-Ce40xpyy.js";import"./IconCaretDown16-CA92RyIj.js";import"./IconTrashBin16-p0_Z_tzM.js";import"./IconTrashBin24-BASiy9Cc.js";import"./useButton-C3Gymf-D.js";import"./useClickOutside-nuWxa3yt.js";import"./EnablePortalWrapper-DvER4Fo2.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
