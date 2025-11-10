import{r as n,j as t}from"./iframe-Bx9GVrJZ.js";import{a as b}from"./Box-CMjufgGn.js";import{B as h}from"./Button-Da3Gx_ir.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CDtgP5s8.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CIGcvm77.js";import"./Checkbox-sW9wnNG2.js";import"./useFocusable-Dn-i4bwA.js";import"./useFocusRing-C_gjdnsv.js";import"./useEffectEvent-B5LtIWRy.js";import"./chain-C8kX9J9x.js";import"./index-C-gYs3Hr.js";import"./useFormValidationState-lVOleaOT.js";import"./useControlledState-BucMWiPd.js";import"./InputLabel-Oiy5y5vo.js";import"./TooltipIcon-_olP1H5z.js";import"./LegacyTooltip-CFgqf3d2.js";import"./useLink-A_GFgEa6.js";import"./usePopper-BsRWJAOy.js";import"./index-B_AR-7Zm.js";import"./Portal-C-f1HJei.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-GZQJvteq.js";import"./IconCheckMark-DAJ8cKO8.js";import"./IconExclamationMarkCircle24-CG5Ngt4w.js";import"./IconExclamationMarkTriangle-BaN9k6Ci.js";import"./IconExclamationMarkTriangle24-DsN51Y9L.js";import"./IconQuestionMarkCircle-wL1ZuTv1.js";import"./IconMinus-QL3DQ7_H.js";import"./DialogBody-D_hU0Nj0.js";import"./dialog-D9O7a7Fm.js";import"./Divider-DkiqWb8u.js";import"./Dropdown-uCdqZBwA.js";import"./useButton-1VD-WXX-.js";import"./FocusScope-BWhix_t8.js";import"./useOverlayTriggerState-CNPfYaKC.js";import"./useMenuTrigger-Dq-KTEQX.js";import"./useLabels-CxNtTZQy.js";import"./useLocalizedStringFormatter-B0X-g_J7.js";import"./context-CVGDgHuw.js";import"./VisuallyHidden-BuG4UE6u.js";import"./helper-DImH7bvT.js";import"./keyboard-BDlz2Gq6.js";import"./SelectionManager-Cqcjm5ME.js";import"./useField-CX812b-c.js";import"./MenuItem-DhmRC9QT.js";import"./IconCaretRight-D1M-LicO.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BUBQ-nVM.js";import"./Trigger-CNpMaSFH.js";import"./IconCaretDown-ojAjKLdu.js";import"./IconCaretDown16-CZX7ke6L.js";import"./IconCross-yaftdHV6.js";import"./IconTrashBin16-BjKSA6mw.js";import"./IconTrashBin24-B_YShVa4.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DGsp_PpL.js";import"./FormControl-BXkKBcHn.js";import"./Switch-DZKRmo2d.js";import"./TabItem-CP7LJa8L.js";import"./TextInput-CEItFKq9.js";import"./Tree-DIr1AUUe.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BSKSo8Jy.js";const At={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=n.useState(!1),p=n.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:p,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:p,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Dt=["Default","WithPortal"];export{o as Default,e as WithPortal,Dt as __namedExportsOrder,At as default};
