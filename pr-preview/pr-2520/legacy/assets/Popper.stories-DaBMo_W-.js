import{r as p,j as t}from"./iframe-BIfcB0X2.js";import{a as b}from"./Box-elrIA08Y.js";import{B as h}from"./Button-91rj7uoX.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-C3lyOxpW.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DcJA_M-3.js";import"./DialogBody-CQ96piVe.js";import"./dialog-D9O7a7Fm.js";import"./Divider-CkgHySjX.js";import"./Dropdown-C1a2GcpH.js";import"./useButton-CNkmC7oi.js";import"./useFocusable-C-Xc2xVU.js";import"./useFocusRing-DHqNp4Q2.js";import"./useEffectEvent-CMLs76Ad.js";import"./chain-CHiwi0M-.js";import"./index-7Pi3A3mt.js";import"./FocusScope-D7jXQngg.js";import"./useOverlayTriggerState-BhO5QHIL.js";import"./useControlledState-SEwrKaho.js";import"./useMenuTrigger-BD6skHKO.js";import"./useLabels-CMk8Wm_k.js";import"./useLocalizedStringFormatter-UOmZs1KX.js";import"./context-CHUpiE9N.js";import"./VisuallyHidden-CS9EO2FH.js";import"./helper-CBHI6ZXE.js";import"./keyboard-SS7VUtrh.js";import"./SelectionManager-BB2Ad0T1.js";import"./useField-B0yrenGR.js";import"./useFormValidationState-CEWVO4VP.js";import"./usePopper-BkMdSZz_.js";import"./index-CLa14mTA.js";import"./MenuItem-CFu7WrwK.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DQxktYqx.js";import"./IconCheckMark-oDrSz9RN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CGKGcPF-.js";import"./Trigger-CLH_zzC8.js";import"./IconCaretDown-ZGyRgcq_.js";import"./IconCaretDown16-CSzlluEg.js";import"./IconCross-Dd61QjlE.js";import"./IconExclamationMarkTriangle-BRPLl85B.js";import"./IconExclamationMarkTriangle24-CWq69Q4w.js";import"./IconTrashBin16-Cy88ODv0.js";import"./IconTrashBin24-DzKpy64m.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-MtFHkrDy.js";import"./Portal-DO3N8iZr.js";import"./useMemoizedId-xtDXxhrd.js";import"./FormControl-DEm4sFJ8.js";import"./InputLabel-DkmK5SvI.js";import"./TooltipIcon-CIj69YaR.js";import"./LegacyTooltip-DyWCUoLz.js";import"./useLink-DAFaRtwo.js";import"./IconExclamationMarkCircle24-De_lyuU4.js";import"./IconQuestionMarkCircle-24RFih0R.js";import"./Switch-CLXJPlE5.js";import"./TabItem-BYBKEXeI.js";import"./TextInput-o6gUNCmh.js";import"./Tree-CmHyBzYA.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-cvpeTtw3.js";const Ht={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
