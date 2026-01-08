import{r as p,j as t}from"./iframe-B1NH0d8E.js";import{a as b}from"./Box-C-xSTCCc.js";import{B as h}from"./Button-CjOUnz39.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CULISYh2.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DG65ErTG.js";import"./DialogBody-CYckLbUx.js";import"./dialog-D9O7a7Fm.js";import"./Divider-Bvi631jR.js";import"./Dropdown-CRsrFL1r.js";import"./useButton-CXaNqm_z.js";import"./useFocusable-DP6unWF8.js";import"./useFocusRing-rvuW17v-.js";import"./useEffectEvent-Cuuo5Go7.js";import"./chain-CDNEhT9V.js";import"./index-NnVgL01k.js";import"./FocusScope-CSl_sW_4.js";import"./useOverlayTriggerState-EK37ykhd.js";import"./useControlledState-VV8iETpF.js";import"./useMenuTrigger-CLvR65IU.js";import"./useLabels-D6M7Y-Ad.js";import"./useLocalizedStringFormatter-B_wUy5H5.js";import"./context-DkQ0DKut.js";import"./VisuallyHidden-Dc2v8xjK.js";import"./helper-BAqNwAfB.js";import"./keyboard-Cfnwcw1j.js";import"./SelectionManager-CGSidPqj.js";import"./useField-Ck-FbqVi.js";import"./useFormValidationState-BS6Czv8J.js";import"./usePopper-jtv-PNE8.js";import"./index-C7tiHcAr.js";import"./MenuItem-B5L2unfa.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-D43a9Ky7.js";import"./IconCheckMark-Az9s2S0p.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DgTICg-p.js";import"./Trigger-0BTyAmbE.js";import"./IconCaretDown-BKOjvZBQ.js";import"./IconCaretDown16-CgcPEXOJ.js";import"./IconCross-CS9vqEH5.js";import"./IconExclamationMarkTriangle-BR7mnz4z.js";import"./IconExclamationMarkTriangle24-DoKVx44R.js";import"./IconTrashBin16-DLhMgjk_.js";import"./IconTrashBin24-OmLsHuw5.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BaBU1IWY.js";import"./Portal-CySXwQ73.js";import"./useMemoizedId-B10bANt6.js";import"./FormControl-DKa4d7cu.js";import"./InputLabel-DK0GeTMZ.js";import"./TooltipIcon-CaQbfCOt.js";import"./LegacyTooltip-DWKf2bEz.js";import"./useLink-DGFVcWby.js";import"./IconExclamationMarkCircle24-Bbl11HkU.js";import"./IconQuestionMarkCircle-DdcULYxs.js";import"./Switch-Zpluh7dE.js";import"./TabItem-CZOwDr0W.js";import"./TextInput-CwXX9Bla.js";import"./Tree-BpEz_X_Z.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-CqVgQgGM.js";const Ht={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
