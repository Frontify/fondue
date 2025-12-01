import{r as p,j as t}from"./iframe-CfHul4zo.js";import{a as b}from"./Box-DWc3RaMk.js";import{B as h}from"./Button-yVTYwQF-.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-D6op7Snd.js";import"./preload-helper-DGVESE2Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BQ3-k5yA.js";import"./Divider-Ct-tQ-h4.js";import"./Dropdown-drSynxKp.js";import"./useButton-Tz8k-_dn.js";import"./useFocusable-DMcslFXz.js";import"./useFocusRing-CMXhC2Tr.js";import"./useEffectEvent-BA6W-niS.js";import"./chain-D01RV-BB.js";import"./index-BQh5Qvqv.js";import"./FocusScope-BU1r3MNk.js";import"./useOverlayTriggerState-fu6QxPju.js";import"./useControlledState-DWLvV7Kk.js";import"./useMenuTrigger-piZx4JdZ.js";import"./useLabels-B2i90Hmc.js";import"./useLocalizedStringFormatter-D-tQgrhX.js";import"./context-CkQAkJT0.js";import"./VisuallyHidden-D-_1MwRP.js";import"./helper-DH7p5BiF.js";import"./keyboard-C3O1P05s.js";import"./SelectionManager-DRJQujp9.js";import"./useField-OuJImVmy.js";import"./useFormValidationState-CpREol_8.js";import"./usePopper-BhC1HryF.js";import"./index-nR_hwZH7.js";import"./MenuItem-D0wc4E1q.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DxGV9b_J.js";import"./IconCheckMark-hTuOn1t1.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DM3UByCT.js";import"./Trigger-BG67Y8TQ.js";import"./IconCaretDown-B2eZL06g.js";import"./IconCaretDown16-Cr2-qVY-.js";import"./IconCross-CZwEoPe9.js";import"./IconExclamationMarkTriangle-C-NbryAn.js";import"./IconExclamationMarkTriangle24-BC2X3acG.js";import"./IconTrashBin16-C3L3dvvP.js";import"./IconTrashBin24-C-K3RNTI.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cxu6-oTj.js";import"./Portal-MV_EP8tM.js";import"./useMemoizedId-mjLZu6N7.js";import"./FormControl-BJwGzdAi.js";import"./InputLabel-NupPFZ6B.js";import"./TooltipIcon-DRxhJRRV.js";import"./LegacyTooltip-CtVbOESt.js";import"./useLink-BnTw1_kr.js";import"./IconExclamationMarkCircle24-WVgUA76S.js";import"./IconQuestionMarkCircle-r1HcYP-T.js";import"./Switch-BeKBv92A.js";import"./TabItem-DIbC2qoD.js";import"./TextInput-D5t55ewG.js";import"./Tree-CsfF529C.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-CwYTT1XC.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
