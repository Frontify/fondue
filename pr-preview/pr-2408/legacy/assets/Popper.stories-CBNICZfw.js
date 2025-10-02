import{j as t}from"./jsx-runtime-DF2Pcvd1.js";import{r as p}from"./index-B2-qRKKC.js";import{a as b}from"./Box-CiJnQuk2.js";import{c as h}from"./Button-CjHS5b55.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-zb4ozB6j.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-BtNTXUM4.js";import"./input-Ek6qhYVk.js";import"./Dropdown-fBi4kE1i.js";import"./useButton-BUDKKhDc.js";import"./useFocusable-BhTWlbU3.js";import"./useFocusRing-BMciCUIT.js";import"./useEffectEvent-BOE4tD14.js";import"./chain-z5L_5vtA.js";import"./index-CFX93qP1.js";import"./FocusScope-DT2GjNsa.js";import"./useOverlayTriggerState-BfOTLlRX.js";import"./useControlledState-CmdEzstM.js";import"./useMenuTrigger-Cnk5hR4X.js";import"./useLabels-BhN0CJHD.js";import"./useLocalizedStringFormatter-BbKkG-z0.js";import"./context-CzRDNd1J.js";import"./VisuallyHidden-CSXgoFxA.js";import"./helper-6IMk_DMN.js";import"./keyboard-APSnmnkX.js";import"./SelectionManager-CwM1DjHu.js";import"./useField-DylV0oUP.js";import"./useFormValidationState-4uoa2oRi.js";import"./usePopper-jmXS5rjc.js";import"./index-DlnOb27V.js";import"./MenuItem-DrSZ0BqJ.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DMA6RW71.js";import"./IconCheckMark-Db5JnUcj.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DyxURJrK.js";import"./Trigger-DTIt2Pgi.js";import"./IconCaretDown-CAp4CI-i.js";import"./IconCaretDown16-CINgO7jA.js";import"./IconCross-Bq7BKjxu.js";import"./IconExclamationMarkTriangle-BrhtYKnY.js";import"./IconExclamationMarkTriangle24-DvJpj6jb.js";import"./IconTrashBin16-DHeQSCR9.js";import"./IconTrashBin24-D7tnFyiH.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-C3Ay3AqL.js";import"./Portal-CuQPhhwF.js";import"./useMemoizedId-BB39KVn8.js";import"./FormControl-c6DumdNZ.js";import"./InputLabel-DNMKamdH.js";import"./TooltipIcon-DRyj0HgG.js";import"./LegacyTooltip-CW5KkIFs.js";import"./useLink-DeOHfGp7.js";import"./IconExclamationMarkCircle24-DMv0ETG3.js";import"./IconQuestionMarkCircle-DkhS77IB.js";import"./Switch-D2onKxMW.js";import"./TabItem-B3Gc2cXC.js";import"./TextInput-Dfdw9yY3.js";import"./Tree-DPGsNpw7.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-ChWTKoTa.js";import"./dialog-Dre1eVQK.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
