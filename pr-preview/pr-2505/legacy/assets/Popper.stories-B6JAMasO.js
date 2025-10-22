import{r as p,j as t}from"./iframe-O6Xb67gi.js";import{a as b}from"./Box-BHmfZPGu.js";import{B as h}from"./Button-fwlsdqhf.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BsVrbu4u.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C1Wd_Pe4.js";import"./Divider-OLZKORyi.js";import"./Dropdown-DkJ1LQLr.js";import"./useButton-D5BwoBXI.js";import"./useFocusable-CIKgwDH6.js";import"./useFocusRing-CHeGnMQA.js";import"./useEffectEvent-DTA_MKoh.js";import"./chain-CQUeJXJW.js";import"./index-CQ6zbiUp.js";import"./FocusScope--mUmRhU_.js";import"./useOverlayTriggerState-C-z83KL3.js";import"./useControlledState-Bqg_pIq_.js";import"./useMenuTrigger-BdgnVO0V.js";import"./useLabels-BSIpPAgP.js";import"./useLocalizedStringFormatter-Cz4luPbj.js";import"./context-ByKPL08u.js";import"./VisuallyHidden-B2p5YlCX.js";import"./helper-DUvrElbv.js";import"./keyboard-B1J9S0AG.js";import"./SelectionManager-bbMc2UWc.js";import"./useField-CsabfYa2.js";import"./useFormValidationState-DWOowmKC.js";import"./usePopper-DUNlXtjr.js";import"./index-B9jSwJHi.js";import"./MenuItem-DBzSyDfl.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-C-Bl03aw.js";import"./IconCheckMark-CKGB0Mef.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BypHdLvW.js";import"./Trigger-DPZTu-hN.js";import"./IconCaretDown-CbXQpFjn.js";import"./IconCaretDown16-spw0sC6J.js";import"./IconCross-BxWaSX4m.js";import"./IconExclamationMarkTriangle-C1H0ir6P.js";import"./IconExclamationMarkTriangle24-DYPgUd-A.js";import"./IconTrashBin16-DBuvi8VI.js";import"./IconTrashBin24-1mHVIMfW.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-D4p2tHkH.js";import"./Portal-D436pgRI.js";import"./useMemoizedId-DoJPVw-z.js";import"./FormControl-By4HoBU2.js";import"./InputLabel-Bhp6BFGH.js";import"./TooltipIcon-COw8BRsT.js";import"./LegacyTooltip-Bv0XhaDP.js";import"./useLink-BbG6K7ZD.js";import"./IconExclamationMarkCircle24-1lif7gA0.js";import"./IconQuestionMarkCircle-BIFVHJje.js";import"./Switch-OtYNeozi.js";import"./TabItem-B01iiyD0.js";import"./TextInput-CfBurs0_.js";import"./Tree-BAe8On3F.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside--9sKWVao.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
