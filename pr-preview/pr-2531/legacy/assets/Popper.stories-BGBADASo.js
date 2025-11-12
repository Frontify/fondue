import{r as p,j as t}from"./iframe-Ca9WJIBK.js";import{a as b}from"./Box-Dta85FAJ.js";import{B as h}from"./Button-CnOLOGK7.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Cs9uAo5f.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B1Xmeo9G.js";import"./Divider-D1tYVdE9.js";import"./Dropdown-CkCoivmc.js";import"./useButton-DGBDNgU7.js";import"./useFocusable-C1WoQs-T.js";import"./useFocusRing-BwzAH-2K.js";import"./useEffectEvent-TJiFP2g3.js";import"./chain-DCPzrEZQ.js";import"./index-AbzjxHSH.js";import"./FocusScope-DoucVTHl.js";import"./useOverlayTriggerState-BV7PYFwU.js";import"./useControlledState-C-yCLtZN.js";import"./useMenuTrigger-Dx5nPd21.js";import"./useLabels-BBWLrE9G.js";import"./useLocalizedStringFormatter-DZZ7LkGX.js";import"./context-kYclt6ZX.js";import"./VisuallyHidden-b7OoCiMy.js";import"./helper-CAD_TrKY.js";import"./keyboard-DwOn7Ntm.js";import"./SelectionManager-BIr7me4z.js";import"./useField-BYBys9YO.js";import"./useFormValidationState-BQNefewE.js";import"./usePopper-C-NlHTyQ.js";import"./index-CLqlsjva.js";import"./MenuItem-BgaffJtb.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DZKZlpE5.js";import"./IconCheckMark-B1Dc5Kb6.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C-qJOuWM.js";import"./Trigger-CYFVkHmt.js";import"./IconCaretDown-D3MkWkTR.js";import"./IconCaretDown16-BIMtKl3v.js";import"./IconCross-uBKIpJqx.js";import"./IconExclamationMarkTriangle-BCskP2qp.js";import"./IconExclamationMarkTriangle24-De1sJXh2.js";import"./IconTrashBin16-DV1rZlFw.js";import"./IconTrashBin24-D9wzOXUb.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CNW_gR7-.js";import"./Portal-DbhhpfdV.js";import"./useMemoizedId-BdBpCiYz.js";import"./FormControl-CLGX9lEQ.js";import"./InputLabel-CTPaTyPc.js";import"./TooltipIcon-PcHhlBO6.js";import"./LegacyTooltip-ChRLGsLt.js";import"./useLink-CZOSwZKD.js";import"./IconExclamationMarkCircle24-pgWUzkh2.js";import"./IconQuestionMarkCircle-DJaiFUzl.js";import"./Switch-eh5BQsSO.js";import"./TabItem-C6Tvfmip.js";import"./TextInput-CSthRERT.js";import"./Tree-Bt4aPzUc.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-CVpI9hLY.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
