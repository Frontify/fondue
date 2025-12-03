import{r as p,j as t}from"./iframe-DeHAHo2O.js";import{a as b}from"./Box-CYxxidOu.js";import{B as h}from"./Button-XeATRVB6.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-0UlcUHze.js";import"./preload-helper-1L8wWKLL.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DbTBvo6h.js";import"./Divider-AunlJTwo.js";import"./Dropdown-CPWczZou.js";import"./useButton-DMcNng1z.js";import"./useFocusable-Cx6UClPu.js";import"./useFocusRing-mB5qeJ04.js";import"./useEffectEvent-z6oLVS9-.js";import"./chain-BUVmghN3.js";import"./index-r0OKhC8Q.js";import"./FocusScope-BdlMD4Yu.js";import"./useOverlayTriggerState-CvsjBNiZ.js";import"./useControlledState-Br1r4vIG.js";import"./useMenuTrigger-B6jxNwcP.js";import"./useLabels-BkYzxx14.js";import"./useLocalizedStringFormatter-BRbC8G8c.js";import"./context-hGU2fCsi.js";import"./VisuallyHidden-B7YsmtVf.js";import"./helper-Cf03TuNF.js";import"./keyboard-Dn8uKP3f.js";import"./SelectionManager-DH1yA4vK.js";import"./useField-CvLglrIT.js";import"./useFormValidationState-QO7fvPwD.js";import"./usePopper-dhPiNd2g.js";import"./index-DHbYGvEM.js";import"./MenuItem-Bmc9YqKf.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BATNqyD1.js";import"./IconCheckMark-HBwhNn3e.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C72EU5gX.js";import"./Trigger-DyuqwTZt.js";import"./IconCaretDown-B5WDuPoQ.js";import"./IconCaretDown16-Rghdt45D.js";import"./IconCross-nsGTd93L.js";import"./IconExclamationMarkTriangle-CuplyEgY.js";import"./IconExclamationMarkTriangle24-kfeUPeJ-.js";import"./IconTrashBin16-UcKIhf9C.js";import"./IconTrashBin24-BsnN7OSn.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DUTWRUSV.js";import"./Portal-8lp-5d0y.js";import"./useMemoizedId-B7oc4VDX.js";import"./FormControl-hi5Ik-iU.js";import"./InputLabel-CV2tUH8t.js";import"./TooltipIcon-VUEuyZak.js";import"./LegacyTooltip-6IXUBNNu.js";import"./useLink-CnAHkscR.js";import"./IconExclamationMarkCircle24-C37jI8Jz.js";import"./IconQuestionMarkCircle-Cdp-yedE.js";import"./Switch-BZRO7Ing.js";import"./TabItem-DKyhZ-ff.js";import"./TextInput-BVn6BAjb.js";import"./Tree-D_8Bk90C.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-CKkB_vX5.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
