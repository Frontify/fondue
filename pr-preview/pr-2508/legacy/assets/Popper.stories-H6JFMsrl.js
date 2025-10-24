import{r as p,j as t}from"./iframe-G9JT5kV6.js";import{a as b}from"./Box-BXjR2_Z3.js";import{B as h}from"./Button-Bab7Gocy.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CTni-LrV.js";import"./preload-helper-BT-T7auE.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CyIEBhYg.js";import"./Divider-BphgxLdT.js";import"./Dropdown-DKBYnEUG.js";import"./useButton-DRJTCrJS.js";import"./useFocusable-_OrUWNR5.js";import"./useFocusRing-nqJc486L.js";import"./useEffectEvent-BtkyKS4G.js";import"./chain-Dq4AkA76.js";import"./index-ixDem6kg.js";import"./FocusScope-BQmzPqxS.js";import"./useOverlayTriggerState-CMU_LIfs.js";import"./useControlledState-Cj5gkz49.js";import"./useMenuTrigger-BlRHj5bV.js";import"./useLabels-KuIW6JFx.js";import"./useLocalizedStringFormatter-M66PnT3E.js";import"./context-D-Ee0elB.js";import"./VisuallyHidden-e-4RAJYE.js";import"./helper-C4FDoqim.js";import"./keyboard-BKMGdIrx.js";import"./SelectionManager-BxHqVy6b.js";import"./useField-B7g4wq1Y.js";import"./useFormValidationState-CYiU8C3p.js";import"./usePopper-CO8wOoTT.js";import"./index-BIhVL1ld.js";import"./MenuItem-DdrQgOb6.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-1JdDjgKO.js";import"./IconCheckMark-BSYvEIzf.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BnxRTcOc.js";import"./Trigger-B8TaoXJF.js";import"./IconCaretDown-CrHZrdXv.js";import"./IconCaretDown16-DcFtQQYB.js";import"./IconCross-Bqxox6ZH.js";import"./IconExclamationMarkTriangle-DVD-it4x.js";import"./IconExclamationMarkTriangle24-DCgtctLG.js";import"./IconTrashBin16-C34r7-hb.js";import"./IconTrashBin24-D6DR5WcG.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-u-oEUjA8.js";import"./Portal-BaI4ybdx.js";import"./useMemoizedId-TQZvyQJc.js";import"./FormControl-Cp0g-HlA.js";import"./InputLabel-TK4YHNFL.js";import"./TooltipIcon-D4kwX34e.js";import"./LegacyTooltip-Dp6OP9ku.js";import"./useLink-CXoGfmc2.js";import"./IconExclamationMarkCircle24-Yrdvbpyd.js";import"./IconQuestionMarkCircle-COwcdCLG.js";import"./Switch-DK-d02t4.js";import"./TabItem-BJhUeMKX.js";import"./TextInput-CZsf1API.js";import"./Tree-CEaSpKgj.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-Riqja6k4.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
