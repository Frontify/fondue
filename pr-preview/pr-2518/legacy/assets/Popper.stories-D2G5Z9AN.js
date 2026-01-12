import{r as p,j as t}from"./iframe-D_BOSi7z.js";import{a as b}from"./Box-BEOERL60.js";import{B as h}from"./Button-C4MmvNvx.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BW6m7Y-x.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D8gYQp8j.js";import"./DialogBody-9rO_vFOY.js";import"./dialog-D9O7a7Fm.js";import"./Divider-B8ud-vsx.js";import"./Dropdown-Br8fivGJ.js";import"./useButton-DYuGFIG_.js";import"./useFocusable-PX_TjPkN.js";import"./useFocusRing-3FNqU6ul.js";import"./useEffectEvent-CC_qXDJd.js";import"./chain-BCugQ9l9.js";import"./index-D-wBK1Ng.js";import"./FocusScope-uWXJwkLD.js";import"./useOverlayTriggerState-BjgsoR16.js";import"./useControlledState-edCwLap7.js";import"./useMenuTrigger-kwJADy-_.js";import"./useLabels-5DLMGvEt.js";import"./useLocalizedStringFormatter-Dl3iXdBr.js";import"./context-OJGXQKbu.js";import"./VisuallyHidden-BRbrFR-P.js";import"./helper-Bp7JDzWt.js";import"./keyboard-BOx3Eis0.js";import"./SelectionManager-DzBiEzjS.js";import"./useField-CL0EjCjO.js";import"./useFormValidationState-CKHn6c8R.js";import"./usePopper-CWJKvBxE.js";import"./index-C8RUnOp5.js";import"./MenuItem-r3ehSA8w.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CfLspMN-.js";import"./IconCheckMark-DdBrvFtV.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CyHsgIab.js";import"./Trigger-DA871_2-.js";import"./IconCaretDown-36ngw1UT.js";import"./IconCaretDown16-Co6QTjBw.js";import"./IconCross-ByijIFm9.js";import"./IconExclamationMarkTriangle-xQH9byf_.js";import"./IconExclamationMarkTriangle24-BJ7X_RsB.js";import"./IconTrashBin16-q9e-rIJ9.js";import"./IconTrashBin24-CFl-qnHA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cg-A3hzO.js";import"./Portal-CoV8HD0d.js";import"./useMemoizedId-C_W2q-Ms.js";import"./FormControl-Dtgtea_0.js";import"./InputLabel-CtdBwKXa.js";import"./TooltipIcon-C4hpdbpH.js";import"./LegacyTooltip-wq0qLjqe.js";import"./useLink-JLbnaYkl.js";import"./IconExclamationMarkCircle24-BuQiGPe5.js";import"./IconQuestionMarkCircle-BhtGQ5mm.js";import"./Switch-CQ93vPgz.js";import"./TabItem-l5qSmNdO.js";import"./TextInput-ywF1gWpG.js";import"./Tree-CKJD2kKA.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DWNA6lpA.js";const Ht={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
