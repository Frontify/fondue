import{r as p,j as t}from"./iframe-B2O1l8ks.js";import{a as b}from"./Box-Brsujuan.js";import{B as h}from"./Button-DjQcwXiI.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CIUtXq9Y.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-COX0EROc.js";import"./Divider-C95xZvJp.js";import"./FormControl-Hwu9IOSl.js";import"./InputLabel-DmUNLwe6.js";import"./TooltipIcon-DjogzR85.js";import"./LegacyTooltip-CoPDRg8Q.js";import"./useLink-yIk-67qk.js";import"./useFocusable-C8pyFffm.js";import"./useFocusRing-BEoPloIT.js";import"./useEffectEvent-Xwo7DV9O.js";import"./chain-D3CT5oan.js";import"./index-g6qngXyA.js";import"./usePopper-BS2q9LVY.js";import"./index-J5FlhQNV.js";import"./Portal-DxlPTCam.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CVzVZL2w.js";import"./IconCheckMark-Dh0UmVD7.js";import"./IconExclamationMarkCircle24-BRyvx9K_.js";import"./IconExclamationMarkTriangle-CdmIw3Si.js";import"./IconExclamationMarkTriangle24-BrwgDn_Y.js";import"./IconQuestionMarkCircle-pwURan37.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTSOVJnx.js";import"./Switch-CK66TCxd.js";import"./TabItem-l09098xX.js";import"./elements-BOYmskOL.js";import"./TextInput-CJHbc71V.js";import"./IconCross-Bxz_oRST.js";import"./Tree-DtYzLs8M.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BPhVc6Ll.js";import"./IconCaretDown-DkHT8ZmQ.js";import"./IconCaretDown16-DFnwRzQd.js";import"./IconTrashBin16-D9g3yNqg.js";import"./IconTrashBin24-sCuj89qM.js";import"./useButton-Bzz293T6.js";import"./useClickOutside-BnNPuVAM.js";import"./EnablePortalWrapper-BXp3LSEV.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
