import{r as p,j as t}from"./iframe-De5WdDij.js";import{a as b}from"./Box-Bs5EGgiC.js";import{B as h}from"./Button-09EX6ZTM.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DDutmWKf.js";import"./preload-helper-ClJkntjM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DF23E4C5.js";import"./Divider-B_5cdPy3.js";import"./Dropdown-ChyJAipO.js";import"./useButton-wWrMugoC.js";import"./useFocusable-BRaVtCgU.js";import"./useFocusRing-CDNuK9Yy.js";import"./useEffectEvent-Oo8ltylB.js";import"./chain-uDd9vtXp.js";import"./index-OktaPfof.js";import"./FocusScope-Fc_hKNYU.js";import"./useOverlayTriggerState-B9SrujZh.js";import"./useControlledState-Dc1RW1nq.js";import"./useMenuTrigger-CCLXEo6s.js";import"./useLabels-Buo-DWDy.js";import"./useLocalizedStringFormatter-CSBD8Wrw.js";import"./context-IzgTfYKF.js";import"./VisuallyHidden-a9fblbuF.js";import"./helper-BnolPM_n.js";import"./keyboard-Db0PXyBP.js";import"./SelectionManager-Cbaox9XQ.js";import"./useField-ClQqDpYA.js";import"./useFormValidationState-Dvh7J7d5.js";import"./usePopper-CPSdMAYJ.js";import"./index-BMpwRIf4.js";import"./MenuItem-CB3827LO.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CZbFa_6C.js";import"./IconCheckMark-Dwl8F3NX.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Gd4Agliv.js";import"./Trigger-D24NGVoU.js";import"./IconCaretDown-qTkkGzu1.js";import"./IconCaretDown16-B-zdzFN4.js";import"./IconCross-BPIha1Ld.js";import"./IconExclamationMarkTriangle-D7c6olcW.js";import"./IconExclamationMarkTriangle24-DIV8Z7-v.js";import"./IconTrashBin16-CJnKFFEA.js";import"./IconTrashBin24-Ok3Wr0xL.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CR6SPP09.js";import"./Portal-Gz9-g2Z0.js";import"./useMemoizedId-C_RAM1u5.js";import"./FormControl-BVqhXDip.js";import"./InputLabel-BIycgYsu.js";import"./TooltipIcon-CkQrSsNW.js";import"./LegacyTooltip-k6QBDt5j.js";import"./useLink-Dlv3Y4nM.js";import"./IconExclamationMarkCircle24-Y07_rCrq.js";import"./IconQuestionMarkCircle-CwIRfAjS.js";import"./Switch-DDaCN14y.js";import"./TabItem-CZyEI5Y9.js";import"./TextInput-D-oGAlNq.js";import"./Tree-CawA_3wD.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DTMqyjhj.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
