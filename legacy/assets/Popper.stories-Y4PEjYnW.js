import{r as p,j as t}from"./iframe-BQiMkHw5.js";import{a as b}from"./Box-DetMvp8V.js";import{B as h}from"./Button-Bmrxg36I.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-IB7ez1El.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DINfxS63.js";import"./Checkbox-Dt22eygm.js";import"./useFocusable-CgS9ZZhd.js";import"./useFocusRing-BD4-S_g1.js";import"./useEffectEvent-CcicRBmQ.js";import"./chain-BIBRZ_SZ.js";import"./index-CnZnx3bY.js";import"./useFormValidationState-BzO4C-br.js";import"./useControlledState-DzPm4K8q.js";import"./InputLabel-CI_YTO0E.js";import"./TooltipIcon-CeEh8SWi.js";import"./LegacyTooltip-BTPYh-Ag.js";import"./useLink-DFD-nYUU.js";import"./usePopper-Cc6K-R7q.js";import"./index-CQBCO6mf.js";import"./Portal-C-kI49Kt.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-tQVpYmKZ.js";import"./IconCheckMark-BS1oKRJV.js";import"./IconExclamationMarkCircle24-CJ1G6dL5.js";import"./IconExclamationMarkTriangle-CoYzxOLH.js";import"./IconExclamationMarkTriangle24-20B1ME08.js";import"./IconQuestionMarkCircle-CTimdRgj.js";import"./IconMinus-CLKltAiw.js";import"./Divider-i3Nx4C_N.js";import"./FormControl-D1EHzNHy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-D5u200MM.js";import"./Switch-9WQaKYNl.js";import"./TabItem-CgWMMnEC.js";import"./elements-BOYmskOL.js";import"./TextInput-CR5drUal.js";import"./IconCross-Bgju1hVK.js";import"./Tree-Qzvf_nh7.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DV_vxb7X.js";import"./IconCaretDown-DOdhsPZo.js";import"./IconCaretDown16-aDP8LU-M.js";import"./IconTrashBin16-fC3Gnm9z.js";import"./IconTrashBin24-ByHOH091.js";import"./useButton-Ug7NB8nr.js";import"./useClickOutside-BvanHLsZ.js";import"./EnablePortalWrapper-CbtLSXEI.js";import"./dialog-D9O7a7Fm.js";const xt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var s,i,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Pt=["Default","WithPortal"];export{o as Default,e as WithPortal,Pt as __namedExportsOrder,xt as default};
