import{r as n,j as t}from"./iframe-UQ-0H_EQ.js";import{a as b}from"./Box-CNjMlNbx.js";import{B as h}from"./Button-P7BIUmCy.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-0iCC_CjO.js";import"./preload-helper-C9_mj7KT.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-rjWhWRsb.js";import"./Checkbox-nL6xvEed.js";import"./useFocusable-K9NgQBjW.js";import"./useFocusRing-CPN3fKV8.js";import"./useEffectEvent-vUcOvX74.js";import"./chain-CzUm7sbH.js";import"./index-fcY41WQ9.js";import"./useFormValidationState-DH0bBYMX.js";import"./useControlledState-DyP2h4uz.js";import"./InputLabel-DIZCK32L.js";import"./TooltipIcon-pQqblyws.js";import"./LegacyTooltip-D2XRdfzl.js";import"./useLink--dr1hXBz.js";import"./usePopper-DpGtHs7K.js";import"./index-DUo0YOzp.js";import"./Portal-B8xjT20O.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-cIDGoJqf.js";import"./IconCheckMark-Lic7jvaJ.js";import"./IconExclamationMarkCircle24-CmLZRoRK.js";import"./IconExclamationMarkTriangle-K7neV5TM.js";import"./IconExclamationMarkTriangle24-C_rjSlB6.js";import"./IconQuestionMarkCircle-C4YmLybr.js";import"./IconMinus-D365w0eX.js";import"./Divider-hg_osFaL.js";import"./Dropdown-Re5gK8tf.js";import"./useButton-CaQcq_VD.js";import"./FocusScope-CX_7qKJM.js";import"./useOverlayTriggerState-BWlP_pY7.js";import"./useMenuTrigger-uiH_EoDe.js";import"./useLabels-pIsm5jB9.js";import"./useLocalizedStringFormatter-Bd-jBhYh.js";import"./context-CcN6Mgd4.js";import"./VisuallyHidden-DujC8zG5.js";import"./helper-B9WpLzaj.js";import"./keyboard-CapSEwjy.js";import"./SelectionManager-pXRWXaqJ.js";import"./useField-D2h8_JGA.js";import"./MenuItem-BzYX1UN3.js";import"./IconCaretRight-Vm4bcQet.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-KbYNzLEL.js";import"./Trigger-mo0TyR9Q.js";import"./IconCaretDown-k67zgOvt.js";import"./IconCaretDown16-Rltc1H2Q.js";import"./IconCross-DTn1rkKH.js";import"./IconTrashBin16-By8fAgtB.js";import"./IconTrashBin24-BfKejfxE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-ChMpwNSj.js";import"./FormControl-DT1Gnbwv.js";import"./Switch-BMBUHncz.js";import"./TabItem-B7YOxnuV.js";import"./TextInput-BXUiVRYX.js";import"./Tree-CAsS334m.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-Cje_y0nI.js";import"./dialog-D9O7a7Fm.js";const kt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=n.useState(!1),p=n.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:p,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:p,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
