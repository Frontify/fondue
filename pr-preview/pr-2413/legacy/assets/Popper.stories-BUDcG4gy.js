import{r as p,j as t}from"./iframe-Cf1DtGp4.js";import{a as b}from"./Box-CLi9Sorx.js";import{B as h}from"./Button-DV8NYrEc.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BPrJUiIR.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Di4mRFwf.js";import"./Checkbox-BdqBmlc8.js";import"./useFocusable-DqhDsK7J.js";import"./useFocusRing-BM1gWsMD.js";import"./useEffectEvent-C8pfAA-B.js";import"./chain-Cgz6AhiD.js";import"./index-Dxcoy0oM.js";import"./useFormValidationState-CbcGlbmg.js";import"./useControlledState-CIBuNwJe.js";import"./InputLabel-CVMQzfx-.js";import"./TooltipIcon-B7NaMUo0.js";import"./LegacyTooltip-HGoAP1-a.js";import"./useLink-Dub5qxjk.js";import"./usePopper-BeHgl84Q.js";import"./index-DfwwFwWl.js";import"./Portal-D2sKroGt.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-eqCvB2Ok.js";import"./IconCheckMark-DLBNQ2dt.js";import"./IconExclamationMarkCircle24-DPnvSQ1_.js";import"./IconExclamationMarkTriangle-BdAg9mdc.js";import"./IconExclamationMarkTriangle24-D8-80Zmo.js";import"./IconQuestionMarkCircle-j554Ijqs.js";import"./IconMinus-CMAY-Wk-.js";import"./Dropdown-CkllTkU8.js";import"./useButton-BPFx4qvf.js";import"./FocusScope-Dx-PhQkB.js";import"./useOverlayTriggerState-CcAg6wzo.js";import"./useMenuTrigger-DXv8pO8H.js";import"./useLabels-DDGlcAiH.js";import"./useLocalizedStringFormatter-Cju5TQfy.js";import"./context-B0UoGtkJ.js";import"./VisuallyHidden-lEg9ayc4.js";import"./helper-C4HMwjvL.js";import"./keyboard-CrzQKbg4.js";import"./SelectionManager-s542UXoo.js";import"./useField-C2ixWOTC.js";import"./MenuItem-CAnjtucz.js";import"./IconCaretRight-BMYIQSG4.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-8z19RM.js";import"./Trigger-CESC6Aw7.js";import"./IconCaretDown-DHVY6Xwy.js";import"./IconCaretDown16-BJT_Hl8U.js";import"./IconCross-BQIDiVoD.js";import"./IconTrashBin16-CvKHnkSD.js";import"./IconTrashBin24-B3oBTNTM.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BZ0oLoB5.js";import"./FormControl-CDVvLYHE.js";import"./Switch-DMGgAkT_.js";import"./TabItem-hU4OjUZo.js";import"./TextInput-BrfMEstF.js";import"./Tree-DZT6B-ry.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DqmtRtRR.js";import"./dialog-D9O7a7Fm.js";const Ht={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const kt=["Default","WithPortal"];export{o as Default,e as WithPortal,kt as __namedExportsOrder,Ht as default};
