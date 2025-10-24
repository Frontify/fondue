import{r as p,j as t}from"./iframe-Syg1N3Dt.js";import{a as b}from"./Box-CaWE6VsJ.js";import{B as h}from"./Button-BFs_n6MT.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-JU-TLIRP.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BrLvrPMg.js";import"./Divider-CzVOQ1Js.js";import"./Dropdown-FbW3XryH.js";import"./useButton-3D8uMnpX.js";import"./useFocusable-DzcY2h-6.js";import"./useFocusRing-CNnJjRGa.js";import"./useEffectEvent-_xfm6Ewt.js";import"./chain-_zCgTghY.js";import"./index-zygbjzbv.js";import"./FocusScope-BnipxogD.js";import"./useOverlayTriggerState-B9wdWD5W.js";import"./useControlledState-DY5nY8Wt.js";import"./useMenuTrigger-nOoY-5UA.js";import"./useLabels-B3d7_WnD.js";import"./useLocalizedStringFormatter-Dm55UTSr.js";import"./context-BwIwx3bW.js";import"./VisuallyHidden-b3B-snrg.js";import"./helper-kDDgvgzp.js";import"./keyboard-qlZGpQI7.js";import"./SelectionManager-CvY-fpmx.js";import"./useField-DLq7O62T.js";import"./useFormValidationState-D0MtgxJw.js";import"./usePopper-B30N6m7R.js";import"./index-DCKuEH0C.js";import"./MenuItem-vWr4hvv2.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BYNbkOLO.js";import"./IconCheckMark-DYOFifCV.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Bk8CKUnf.js";import"./Trigger-8K1Z5TCZ.js";import"./IconCaretDown-BM9A8thm.js";import"./IconCaretDown16-CJ0CPWki.js";import"./IconCross-BYLKbJOe.js";import"./IconExclamationMarkTriangle-DJ78vW8L.js";import"./IconExclamationMarkTriangle24-B2npFYMD.js";import"./IconTrashBin16-B-os8M5m.js";import"./IconTrashBin24-B7qkH7Me.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BPSk3zeA.js";import"./Portal-Bs2LRsId.js";import"./useMemoizedId-C9g_fFO8.js";import"./FormControl-hBMNzJT5.js";import"./InputLabel-BiMasARO.js";import"./TooltipIcon-DfPc9HBh.js";import"./LegacyTooltip-BEqX41nh.js";import"./useLink-wNWEYCfF.js";import"./IconExclamationMarkCircle24-Dn7AMifS.js";import"./IconQuestionMarkCircle-CuSuBHcI.js";import"./Switch-cBzas6OX.js";import"./TabItem-D-04gcC8.js";import"./TextInput-C_NhoOs1.js";import"./Tree-C_Tw8-89.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-ChN67Rl1.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
