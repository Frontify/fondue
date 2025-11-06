import{r as n,j as t}from"./iframe-BdlO2EbJ.js";import{a as b}from"./Box-PNqRXq3f.js";import{B as h}from"./Button-DrCLLHbF.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Bnq_n-aZ.js";import"./preload-helper-C4wRLVzE.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BGrf8GP1.js";import"./Checkbox-CUrMU77A.js";import"./useFocusable-C9dO2yQb.js";import"./useFocusRing-CyFP-Ki5.js";import"./useEffectEvent-C4rtv_rM.js";import"./chain-Dr1u59fH.js";import"./index-D1owJmOw.js";import"./useFormValidationState-ClvA_9AG.js";import"./useControlledState-Cidb8_Ea.js";import"./InputLabel-qiUeEwIk.js";import"./TooltipIcon-CwSo9wJU.js";import"./LegacyTooltip-V-9pWW6E.js";import"./useLink-QJzHBGx-.js";import"./usePopper-DQ00lXwF.js";import"./index-CoFonh66.js";import"./Portal-DZ632Ubj.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CzqpaSN6.js";import"./IconCheckMark-BvJX2csI.js";import"./IconExclamationMarkCircle24-CM3yyMwo.js";import"./IconExclamationMarkTriangle-CPGFYlgY.js";import"./IconExclamationMarkTriangle24-DgKid-_h.js";import"./IconQuestionMarkCircle-hugfPsLI.js";import"./IconMinus-BkS0bI79.js";import"./Divider-DL-_Vp22.js";import"./Dropdown-BZpXZbjc.js";import"./useButton-CG8bxHRW.js";import"./FocusScope-VwSi9rcC.js";import"./useOverlayTriggerState-ByX_-AoL.js";import"./useMenuTrigger-CAJeYsYW.js";import"./useLabels-Y1KS1nPR.js";import"./useLocalizedStringFormatter-hIxkRCEu.js";import"./context-kBQTsdoA.js";import"./VisuallyHidden-D9YqXu5-.js";import"./helper-pFYePz-q.js";import"./keyboard-Dm1zpteP.js";import"./SelectionManager-CDq-OZdL.js";import"./useField-WZJ25ZCp.js";import"./MenuItem-2d57nVSl.js";import"./IconCaretRight-D16XPZiE.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D7T_AO83.js";import"./Trigger-DO0Xv1tR.js";import"./IconCaretDown-CPKMJ-tL.js";import"./IconCaretDown16-D6lzkurX.js";import"./IconCross-DGcLLMy8.js";import"./IconTrashBin16-CO3SH7GZ.js";import"./IconTrashBin24-Dz78mqQO.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DEoZMs_t.js";import"./FormControl-CP7C6AlW.js";import"./Switch-xVaig9Wk.js";import"./TabItem-khfS1F87.js";import"./TextInput-DSr8HXc2.js";import"./Tree-C8j84pWN.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-yq4SUIaF.js";import"./dialog-D9O7a7Fm.js";const kt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=n.useState(!1),p=n.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:p,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:p,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
