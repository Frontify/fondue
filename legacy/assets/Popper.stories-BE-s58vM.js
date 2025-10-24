import{r as n,j as t}from"./iframe-e0U6nGdg.js";import{a as b}from"./Box-CcTnB5oC.js";import{B as h}from"./Button-Ctisb_6d.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DjWQa5nG.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CdSZxFhx.js";import"./Checkbox-D4Z7gexS.js";import"./useFocusable-C6iyQpXI.js";import"./useFocusRing-DSof9HDA.js";import"./useEffectEvent-Dhi-9t88.js";import"./chain-DPcgUXMv.js";import"./index-D5FaRCKO.js";import"./useFormValidationState-C2mn5rNF.js";import"./useControlledState-BpQJraUT.js";import"./InputLabel-CFiujHKp.js";import"./TooltipIcon-CNBwvO0d.js";import"./LegacyTooltip-DKPRkd1X.js";import"./useLink-CL9Z2HKk.js";import"./usePopper-Cpih_rft.js";import"./index-98LXcvpt.js";import"./Portal-VBGCNkL3.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CqqrNheS.js";import"./IconCheckMark-CfVKgjOK.js";import"./IconExclamationMarkCircle24-B6aWDheE.js";import"./IconExclamationMarkTriangle-U04woIfm.js";import"./IconExclamationMarkTriangle24-CAomuIhH.js";import"./IconQuestionMarkCircle-DyI4ZTBV.js";import"./IconMinus-EZG3KcaU.js";import"./Divider-CdfwzZMT.js";import"./Dropdown-lFxzrlsx.js";import"./useButton-Bcy8TYTN.js";import"./FocusScope-BSeNmLNv.js";import"./useOverlayTriggerState-BQIEtMUz.js";import"./useMenuTrigger-CORkgcEy.js";import"./useLabels-Bh4FvyUH.js";import"./useLocalizedStringFormatter-CR04K9do.js";import"./context-CWMRxbca.js";import"./VisuallyHidden-CLSFgs5F.js";import"./helper-C2pKKaKh.js";import"./keyboard-CE97L4wN.js";import"./SelectionManager-BKU4lwyk.js";import"./useField-59HGCYzs.js";import"./MenuItem-B4scu5yA.js";import"./IconCaretRight-yWjutZzx.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Cs7quV73.js";import"./Trigger-Cxb9EGeR.js";import"./IconCaretDown-OtaJb8ue.js";import"./IconCaretDown16-LpGbVMin.js";import"./IconCross-ug7GD-W-.js";import"./IconTrashBin16-CWZYWSrk.js";import"./IconTrashBin24-CQrz4dri.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DoN8BKVL.js";import"./FormControl-BlwtdXQF.js";import"./Switch-CfCV9d5U.js";import"./TabItem-C65zp8VY.js";import"./TextInput-BnQ0OsaS.js";import"./Tree-Cnd7JCjb.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DuZ-KBg9.js";import"./dialog-D9O7a7Fm.js";const kt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=n.useState(!1),p=n.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:p,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:p,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
