import{r as n,j as t}from"./iframe-hiR8UZb1.js";import{a as b}from"./Box-BXfZ-YTJ.js";import{B as h}from"./Button-CsgAQ1Ze.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-D2dj-_xH.js";import"./preload-helper-C9_mj7KT.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C-_DQcQy.js";import"./Checkbox-BpCInNI_.js";import"./useFocusable-BCILdq-A.js";import"./useFocusRing-BR2BAc58.js";import"./useEffectEvent-C-IKAOB5.js";import"./chain-DuoQPSqe.js";import"./index-C0843eWw.js";import"./useFormValidationState-CBzLcmFd.js";import"./useControlledState-VHtsEoGt.js";import"./InputLabel-DVTWnutn.js";import"./TooltipIcon-BdKeis3H.js";import"./LegacyTooltip-DA6F3nhF.js";import"./useLink-OqhAq_XY.js";import"./usePopper-iYfCN7OJ.js";import"./index-Bfg3rXQ9.js";import"./Portal-BE88c7bW.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C8g_De_i.js";import"./IconCheckMark-CPcP6jGi.js";import"./IconExclamationMarkCircle24-CYrEKXzW.js";import"./IconExclamationMarkTriangle-BRLHFmEi.js";import"./IconExclamationMarkTriangle24-C2uA4N2L.js";import"./IconQuestionMarkCircle-DzFus8Aq.js";import"./IconMinus-C_ROGjyB.js";import"./Divider-CVM_OPs0.js";import"./Dropdown-D4YKxmIO.js";import"./useButton-BuTqCltI.js";import"./FocusScope-CLLubA4N.js";import"./useOverlayTriggerState-YZeHQFTN.js";import"./useMenuTrigger-60eNA7wG.js";import"./useLabels-I_WHPtX6.js";import"./useLocalizedStringFormatter-DJNAmz5G.js";import"./context-CZdOiBHj.js";import"./VisuallyHidden-D2FwfA67.js";import"./helper-CuUa8o3V.js";import"./keyboard-DbttWqR4.js";import"./SelectionManager-ewl4jbqQ.js";import"./useField-kpg-rK26.js";import"./MenuItem-exd6RWSR.js";import"./IconCaretRight-BkW49fVC.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BgTdFwYN.js";import"./Trigger-CRLRbSZf.js";import"./IconCaretDown-BNiERKAd.js";import"./IconCaretDown16-DQy0Wzy6.js";import"./IconCross-WBrqmq48.js";import"./IconTrashBin16-DHV2XC9n.js";import"./IconTrashBin24-D75gAwdl.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cbz1aY1U.js";import"./FormControl-Cu-skwPp.js";import"./Switch-DTzFT674.js";import"./TabItem-BGtxtLir.js";import"./TextInput-C5gXopDg.js";import"./Tree-ChVxWgYn.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DJvglM5I.js";import"./dialog-D9O7a7Fm.js";const kt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=n.useState(!1),p=n.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:p,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:p,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const At=["Default","WithPortal"];export{o as Default,e as WithPortal,At as __namedExportsOrder,kt as default};
