import{r as p,j as t}from"./iframe-EAnBKUwW.js";import{a as b}from"./Box-0XmEUewe.js";import{B as h}from"./Button-C4jHKFK9.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-mn7uGpA2.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DkaDrsIb.js";import"./Divider-gBEEXaWE.js";import"./Dropdown-B1Lt8Byy.js";import"./useButton-41t4cyxA.js";import"./useFocusable-DuI7dfbU.js";import"./useFocusRing-BeQFm_V6.js";import"./useEffectEvent-C1lqxX7E.js";import"./chain-EmpxMCW5.js";import"./index-Dr4nN6b0.js";import"./FocusScope-BJLWHjPu.js";import"./useOverlayTriggerState-B3smdlTO.js";import"./useControlledState-CN3IzYYN.js";import"./useMenuTrigger-DLcyDwsq.js";import"./useLabels-DEWZbhOx.js";import"./useLocalizedStringFormatter-C6X_Q_bB.js";import"./context-2GLmmQTX.js";import"./VisuallyHidden-CzVGMPQV.js";import"./helper-CdIpQeou.js";import"./keyboard-BZ6b5TUF.js";import"./SelectionManager-b5QLYy5C.js";import"./useField-DvYtj8qk.js";import"./useFormValidationState-Dre4cyXl.js";import"./usePopper-CPetpVYB.js";import"./index-qBGALtzT.js";import"./MenuItem-C6Fjlc4C.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DII2jJiv.js";import"./IconCheckMark-CnYP4iYd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D5gsxc0H.js";import"./Trigger-C6t7XVPV.js";import"./IconCaretDown-CEoAVXN2.js";import"./IconCaretDown16-DTXLKGRf.js";import"./IconCross-CQ3qrcPd.js";import"./IconExclamationMarkTriangle-CeH_KVhG.js";import"./IconExclamationMarkTriangle24-DKmb3WiR.js";import"./IconTrashBin16-C38eKVWH.js";import"./IconTrashBin24-hC-tYyNL.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-D4qhEscH.js";import"./Portal-BZCteqHW.js";import"./useMemoizedId-C0HR5vRU.js";import"./FormControl-DuADWXuI.js";import"./InputLabel-ChnK1EbS.js";import"./TooltipIcon-BQSnXH9l.js";import"./LegacyTooltip-BJW8lT4k.js";import"./useLink-BYCWLkC0.js";import"./IconExclamationMarkCircle24-B2fHNFvs.js";import"./IconQuestionMarkCircle-C1HsKCLB.js";import"./Switch-D3-ZBx8j.js";import"./TabItem-D5lxDox0.js";import"./TextInput-B06f0icZ.js";import"./Tree-BIAzcwgb.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BbI0dQrT.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
