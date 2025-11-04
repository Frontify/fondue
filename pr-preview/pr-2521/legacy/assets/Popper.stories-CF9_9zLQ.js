import{r as p,j as t}from"./iframe-CL4XzcfN.js";import{a as b}from"./Box-CPkZ0Foc.js";import{B as h}from"./Button-B2WhYWSE.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-4WfNLUKb.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cak8rQy8.js";import"./Divider-eJQCJdBZ.js";import"./FormControl-D-90hYhQ.js";import"./InputLabel-B7sQ-f05.js";import"./TooltipIcon-E7z4sWyP.js";import"./LegacyTooltip-BN5iCPhr.js";import"./useLink-C2YfOpA_.js";import"./useFocusable-CY-GtsB5.js";import"./useFocusRing-9VMAwhrL.js";import"./useEffectEvent-B5uQLMLN.js";import"./chain-BCKv6zua.js";import"./index-DCNIDGPM.js";import"./usePopper-ZhCn5hnC.js";import"./index-BrEYTrmJ.js";import"./Portal-D3tzxN0W.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-fmdEObL2.js";import"./IconCheckMark-BOsC3Xif.js";import"./IconExclamationMarkCircle24-D01_0b62.js";import"./IconExclamationMarkTriangle-CPT_x5S0.js";import"./IconExclamationMarkTriangle24-DrZXW3E9.js";import"./IconQuestionMarkCircle-Dk2S2WTJ.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CrBeja9n.js";import"./Switch-08S77oE1.js";import"./TabItem-CfP1DOBO.js";import"./elements-BOYmskOL.js";import"./TextInput-BLLvDYtY.js";import"./IconCross-BqlufAS4.js";import"./Tree-DbU3jWxL.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-vt9YbX4T.js";import"./IconCaretDown-BZMebnUj.js";import"./IconCaretDown16-BBp6Oz2P.js";import"./IconTrashBin16-f8MytoxN.js";import"./IconTrashBin24-BNSYBA-x.js";import"./useButton-COiAR59-.js";import"./useClickOutside-Q0mrUBRo.js";import"./EnablePortalWrapper-pOou7TEd.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
