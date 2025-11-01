import{r as p,j as t}from"./iframe-BIHtZq1U.js";import{a as b}from"./Box-hobupWpc.js";import{B as h}from"./Button-mGP0pMyC.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-D5sADaPC.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dg-p3nwO.js";import"./Divider-cLTm9Yw5.js";import"./Dropdown-B4ISVlBN.js";import"./useButton-DWxqWwpW.js";import"./useFocusable-CCZ_IdsK.js";import"./useFocusRing-Da_21BgF.js";import"./useEffectEvent-B6YEwqBF.js";import"./chain-BJcYIR2n.js";import"./index-BaBp4jCW.js";import"./FocusScope-D3WjdVoV.js";import"./useOverlayTriggerState-BkNFCR_E.js";import"./useControlledState-Ch5mM6EN.js";import"./useMenuTrigger-eQ_6GCii.js";import"./useLabels-CsVTyMz0.js";import"./useLocalizedStringFormatter-DFpdFw8u.js";import"./context-Bs0yD0C5.js";import"./VisuallyHidden-BVpZREPf.js";import"./helper-KKu_vcbg.js";import"./keyboard-BvwPagi2.js";import"./SelectionManager-C4BYkeTT.js";import"./useField-C-jP7PP4.js";import"./useFormValidationState-DX0Jxj92.js";import"./usePopper-CDDU-Abt.js";import"./index-AB-0uad5.js";import"./MenuItem-CGosstT4.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-ktveUp1R.js";import"./IconCheckMark-ByDDCOdk.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BPnjjCMJ.js";import"./Trigger-Btbv4h_W.js";import"./IconCaretDown-nRwc6BJm.js";import"./IconCaretDown16-BBlgb7KY.js";import"./IconCross-uSSJtr0W.js";import"./IconExclamationMarkTriangle-Eu8lIART.js";import"./IconExclamationMarkTriangle24-DWved3Uv.js";import"./IconTrashBin16-kc1AA4xY.js";import"./IconTrashBin24-DmxFkRQV.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B0IMxAw1.js";import"./Portal-XQEcDBQ_.js";import"./useMemoizedId-8iqIoAJZ.js";import"./FormControl-CQNf1I9W.js";import"./InputLabel-OzfXMBfp.js";import"./TooltipIcon-t51GQRdv.js";import"./LegacyTooltip-CyQP51yp.js";import"./useLink-BGmSUlDQ.js";import"./IconExclamationMarkCircle24-Dr5MpX5j.js";import"./IconQuestionMarkCircle-CBsONxKB.js";import"./Switch-D9Ul3eWT.js";import"./TabItem-BsMi3ALW.js";import"./TextInput-LNvw8Zy7.js";import"./Tree-BNN95NQH.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-C7K7SNSM.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
