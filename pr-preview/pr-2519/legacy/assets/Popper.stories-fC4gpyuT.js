import{r as p,j as t}from"./iframe-DNYqvrxY.js";import{a as b}from"./Box-0VJkUxml.js";import{B as h}from"./Button-BQoAZ5jH.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BN9TOj8b.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D_zMi6m8.js";import"./Checkbox-CXW6lAAx.js";import"./useFocusable-DBLtVD04.js";import"./useFocusRing-inbe820I.js";import"./useEffectEvent-CqN8Xrle.js";import"./chain-rs3ruS8C.js";import"./index-Bz5Vwsqb.js";import"./useFormValidationState-C24859Ua.js";import"./useControlledState-BRYIGsaT.js";import"./InputLabel-8jf6vFiR.js";import"./TooltipIcon-CznUc7eq.js";import"./LegacyTooltip-wX-IP1mX.js";import"./useLink-C7zrBBAu.js";import"./usePopper-CbHMkx37.js";import"./index-TZyNZ7K3.js";import"./Portal-DstCpxkq.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cu-zzjsD.js";import"./IconCheckMark-D4hbZDn0.js";import"./IconExclamationMarkCircle24-CPMHklPN.js";import"./IconExclamationMarkTriangle-Ctk9IIB1.js";import"./IconExclamationMarkTriangle24-S70vgnAQ.js";import"./IconQuestionMarkCircle-BF5yWsBY.js";import"./IconMinus-D1zhuFKR.js";import"./Divider-BDmH5yTu.js";import"./FormControl-D4mHbKxO.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BHuiThN5.js";import"./Switch-bVu7ZsXz.js";import"./TabItem-DcBBPJkU.js";import"./elements-BOYmskOL.js";import"./TextInput-C_-B3EDu.js";import"./IconCross-BPkFsv-s.js";import"./Tree-DsaVjoSD.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CW7BOuLr.js";import"./useClickOutside-COpRyopr.js";import"./EnablePortalWrapper-Djvws7ud.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
