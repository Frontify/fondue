import{r as p,j as t}from"./iframe-CDRstm0C.js";import{a as b}from"./Box-BgOrf3UO.js";import{B as h}from"./Button-D_bQ7VR6.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-C0ivaCGJ.js";import"./preload-helper-C7xgB0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DOmezKEq.js";import"./FormControl-BMOfwmhC.js";import"./InputLabel-Cs5CZTpg.js";import"./TooltipIcon-BwT6eVvl.js";import"./LegacyTooltip-DvSdpi8G.js";import"./useLink-8zG_vWba.js";import"./useFocusable-B15QcTZF.js";import"./useFocusRing-UE97zQCw.js";import"./useEffectEvent-DzdohreD.js";import"./chain-nZg9lPIx.js";import"./index-DjgXOIjb.js";import"./usePopper-DPsNEqxC.js";import"./index-F0GCa985.js";import"./Portal-C2RK98Mp.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-lvykKVxc.js";import"./IconCheckMark-Br7aTwB8.js";import"./IconExclamationMarkCircle24-DaaHPybN.js";import"./IconExclamationMarkTriangle-DVll2-1a.js";import"./IconExclamationMarkTriangle24-YbouCJLf.js";import"./IconQuestionMarkCircle-2BNxGubK.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-SAaKEIFA.js";import"./Switch-_bNcJ9jc.js";import"./TabItem-DaCdgH_t.js";import"./elements-BOYmskOL.js";import"./TextInput-DQx74ckt.js";import"./IconCross-zQeoCE8b.js";import"./Tree-DbKNVcoZ.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DG9gd2Uq.js";import"./IconCaretDown-_xIch-96.js";import"./IconCaretDown16-ttgvU4nX.js";import"./IconTrashBin16-TK6B-iwP.js";import"./IconTrashBin24-D8bBYc2Y.js";import"./useButton-0YDeVxAZ.js";import"./useClickOutside-B_ETivn7.js";import"./EnablePortalWrapper-CfV2-txn.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const wt=["Default","WithPortal"];export{e as Default,o as WithPortal,wt as __namedExportsOrder,ft as default};
