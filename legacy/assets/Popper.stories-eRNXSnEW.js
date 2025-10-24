import{r as p,j as t}from"./iframe-Bsxk6cFR.js";import{a as b}from"./Box-CCkANUHJ.js";import{B as h}from"./Button-Bp7GppKu.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CREdPvYj.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dw_EdkPH.js";import"./Checkbox-BZwiv_WY.js";import"./useFocusable-BzHoFin2.js";import"./useFocusRing-stKtxXd4.js";import"./useEffectEvent-Bi8UaLd9.js";import"./chain-C8mx6lyL.js";import"./index-CaU0m7r7.js";import"./useFormValidationState-BLrnd7ld.js";import"./useControlledState-C7l0FGCg.js";import"./InputLabel-DFZphzdn.js";import"./TooltipIcon-imUCQ7xK.js";import"./LegacyTooltip-UFmzY47G.js";import"./useLink-BZBpEwDw.js";import"./usePopper-DrP5WGJT.js";import"./index-x6daeC6L.js";import"./Portal-Jhq17_f2.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-yiCK1tQN.js";import"./IconCheckMark-CF046Ot1.js";import"./IconExclamationMarkCircle24-DgeP_4Kk.js";import"./IconExclamationMarkTriangle-BHIGzko0.js";import"./IconExclamationMarkTriangle24-DxnwpWP-.js";import"./IconQuestionMarkCircle-Dbadrprg.js";import"./IconMinus-CgWE7n9K.js";import"./Divider-_FiKFIWq.js";import"./FormControl-D2B1jMMZ.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-COaoHo8J.js";import"./Switch-CpOkLbaK.js";import"./TabItem-B5j8Fpzo.js";import"./elements-BOYmskOL.js";import"./TextInput-BZxVMLa_.js";import"./IconCross-YZVLliuR.js";import"./Tree-BDR2fBSn.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-Dw7Jadw_.js";import"./useClickOutside-CCWwx1e_.js";import"./EnablePortalWrapper-B2Fripgl.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const wt=["Default","WithPortal"];export{e as Default,o as WithPortal,wt as __namedExportsOrder,ft as default};
