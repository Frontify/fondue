import{r as p,j as t}from"./iframe-vjbYvHXD.js";import{a as b}from"./Box-Bwp3i62f.js";import{B as h}from"./Button-lhTfhg7d.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DIcCdMDS.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-fcS-PJ4Z.js";import"./Divider-CuFPhQ6S.js";import"./Dropdown-BSAzKnZF.js";import"./useButton-CxkdNakB.js";import"./useFocusable-ByREZ_n_.js";import"./useFocusRing-CsZ9CHXr.js";import"./useEffectEvent-CTQjz-1h.js";import"./chain-B-60xBaJ.js";import"./index-7nxr46c5.js";import"./FocusScope-CLzN_lI2.js";import"./useOverlayTriggerState-B81FpLIC.js";import"./useControlledState-COAt9VZQ.js";import"./useMenuTrigger-DPQNAKRw.js";import"./useLabels-Db1-Bo-V.js";import"./useLocalizedStringFormatter-BepfFFxN.js";import"./context-9Ze-MI-m.js";import"./VisuallyHidden-rr0pwMtP.js";import"./helper-BzVKhoc9.js";import"./keyboard-JWSOmIrU.js";import"./SelectionManager-DLk5Bhmx.js";import"./useField-Dii7Ap5y.js";import"./useFormValidationState-DhSBWnv0.js";import"./usePopper-BxbMqRB2.js";import"./index-D6FU8wL4.js";import"./MenuItem-BxlFqfFZ.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DCeo5KTY.js";import"./IconCheckMark-DefVy1w1.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DyUqzlpN.js";import"./Trigger-IeR8b6zt.js";import"./IconCaretDown-zm52kRBZ.js";import"./IconCaretDown16-ln6Oz95d.js";import"./IconCross-DSBvcEAU.js";import"./IconExclamationMarkTriangle-gKRpV5Gs.js";import"./IconExclamationMarkTriangle24-BHHbNpkJ.js";import"./IconTrashBin16-dfdTfdUx.js";import"./IconTrashBin24-BYrHxqvh.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-C6HwsMzv.js";import"./Portal-CgK8zL4W.js";import"./useMemoizedId-C05Z425a.js";import"./FormControl-DoQSNUge.js";import"./InputLabel-CoPfkvwk.js";import"./TooltipIcon-BqrO-IBv.js";import"./LegacyTooltip-CJWD8yyY.js";import"./useLink-CeyolHSB.js";import"./IconExclamationMarkCircle24-DqowYawI.js";import"./IconQuestionMarkCircle-DYdPob5o.js";import"./Switch-CyEhT5DE.js";import"./TabItem-K8h6fVvz.js";import"./TextInput-BjgdiGrp.js";import"./Tree-C3-VaJJR.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-5e2WfSL9.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Ht=["Default","WithPortal"];export{o as Default,e as WithPortal,Ht as __namedExportsOrder,_t as default};
