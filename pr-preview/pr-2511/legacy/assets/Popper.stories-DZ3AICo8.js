import{r as s,j as e}from"./iframe-DXiSZ8yV.js";import{a as b}from"./Box-DS-NTYs3.js";import{B as h}from"./Button-B83Fd9Kf.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-D4j_uOvt.js";import"./preload-helper-sQDyWCwb.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DK4ogKn6.js";import"./Divider-BIIEQ_uE.js";import"./FormControl-BPU5fAHz.js";import"./InputLabel-wedjaRoM.js";import"./TooltipIcon-tgOmtchI.js";import"./LegacyTooltip-DPUy_y82.js";import"./useLink-ClF-7r8u.js";import"./useFocusable-B-dbdgUK.js";import"./useFocusRing-DPazzxim.js";import"./useEffectEvent-D6edtAvJ.js";import"./chain-SyvCQgpt.js";import"./index-BifYS_Oi.js";import"./usePopper-asRNL4yH.js";import"./index-E7EP7ZJ0.js";import"./Portal-BEW8NuBM.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DtF_1p7S.js";import"./IconCheckMark-C4Ixpvio.js";import"./IconExclamationMarkCircle24-DtWR07aI.js";import"./IconExclamationMarkTriangle-2dLN07dP.js";import"./IconExclamationMarkTriangle24-DFIDnNRt.js";import"./IconQuestionMarkCircle-BaktNA4F.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DJkV_I6E.js";import"./Switch-CiNXU6ah.js";import"./TabItem-R6nH2Cla.js";import"./elements-BOYmskOL.js";import"./TextInput-rkxNmb4V.js";import"./IconCross-DWiLLqFa.js";import"./Tree-Bp4xh4h6.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-xqXUAGE4.js";import"./useClickOutside-D-nmjqVd.js";import"./EnablePortalWrapper-TN-M6Or2.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const me=["Default","WithPortal"];export{t as Default,o as WithPortal,me as __namedExportsOrder,le as default};
