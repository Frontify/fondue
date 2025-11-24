import{r as p,j as t}from"./iframe-CI4Kawm5.js";import{a as b}from"./Box-Cx50b-Ce.js";import{B as h}from"./Button-CC2xgBz8.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-giYO8ALz.js";import"./preload-helper-yOERg7rY.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DCT2qH2I.js";import"./Checkbox-DXLFTzy2.js";import"./useFocusable-DkBkn9iT.js";import"./useFocusRing-CyQhVCri.js";import"./useEffectEvent-Cfpi8PP8.js";import"./chain-D7U0_On1.js";import"./index-zpwVSNjA.js";import"./useFormValidationState-BhtDhUXV.js";import"./useControlledState-CUmOUvGM.js";import"./InputLabel-CKTuZCMG.js";import"./TooltipIcon-BbIRjZyI.js";import"./LegacyTooltip-Dou_-Yzh.js";import"./useLink--dmh_mM5.js";import"./usePopper-BppasZrv.js";import"./index-C-x7Nr5k.js";import"./Portal-Bx0n0vOk.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BhGmyCqr.js";import"./IconCheckMark-DZdXXIdU.js";import"./IconExclamationMarkCircle24-B1fijdn3.js";import"./IconExclamationMarkTriangle-tJv2AngU.js";import"./IconExclamationMarkTriangle24-BZgyqp3m.js";import"./IconQuestionMarkCircle-CKHNeUmL.js";import"./IconMinus-BWmFQkW3.js";import"./Divider-Cez8lt_3.js";import"./FormControl-CCavmj5m.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CsOnGPDG.js";import"./Switch-BoyC4ozW.js";import"./TabItem-CnOdriQC.js";import"./elements-BOYmskOL.js";import"./TextInput-Bfa7-qoa.js";import"./IconCross-76Znu6aF.js";import"./Tree-DkbN3ZYU.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-0gYD7YN5.js";import"./useClickOutside-Bl5b8N1C.js";import"./EnablePortalWrapper-B_5uTan4.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
