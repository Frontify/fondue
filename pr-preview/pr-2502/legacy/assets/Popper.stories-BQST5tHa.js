import{r as p,j as t}from"./iframe-Dwin3FxO.js";import{a as b}from"./Box-5evlgCsF.js";import{B as h}from"./Button-CKXsKGD5.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DwJLBt2z.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DhnSYn5V.js";import"./Divider-CnWbkUKS.js";import"./Dropdown-BLAewou2.js";import"./useButton-BsJegSmH.js";import"./useFocusable-Bp8A_yXF.js";import"./useFocusRing-swznnzXG.js";import"./useEffectEvent-wdw4_BRC.js";import"./chain-E9lX77Gb.js";import"./index-DwYNVFcV.js";import"./FocusScope-COYiORyc.js";import"./useOverlayTriggerState-j0_YX7gm.js";import"./useControlledState-DKB5d8dN.js";import"./useMenuTrigger-CD-zpV_a.js";import"./useLabels-CVQ6RD4-.js";import"./useLocalizedStringFormatter-BAPTT49-.js";import"./context-DhWXtlDh.js";import"./VisuallyHidden-cIiiicO7.js";import"./helper-U6xaHnL7.js";import"./keyboard-DPiKC0x7.js";import"./SelectionManager-CBp81lVo.js";import"./useField-CpSRl-SE.js";import"./useFormValidationState-O_fivc1L.js";import"./usePopper-CbLYfQYR.js";import"./index-34xpJy1M.js";import"./MenuItem-DIpMfICd.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CT3w72s4.js";import"./IconCheckMark-CXLrFdWg.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DQ0PFIKz.js";import"./Trigger-DmtSg97z.js";import"./IconCaretDown-c7zt4LK7.js";import"./IconCaretDown16-DAiMAZVx.js";import"./IconCross-FdRJPnO5.js";import"./IconExclamationMarkTriangle-CNcDSymw.js";import"./IconExclamationMarkTriangle24-CFbJhFlF.js";import"./IconTrashBin16-BaS-aF7j.js";import"./IconTrashBin24-BjzpaZgm.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CLgVQhB2.js";import"./Portal-D5DnNNiN.js";import"./useMemoizedId-FdiXK2xp.js";import"./FormControl-CEdaMpG2.js";import"./InputLabel-D8rWOiLZ.js";import"./TooltipIcon-CnJNzBIg.js";import"./LegacyTooltip-fg58BgYe.js";import"./useLink-CHtPM4PO.js";import"./IconExclamationMarkCircle24-u83y5adM.js";import"./IconQuestionMarkCircle-2K-v2_hs.js";import"./Switch-CfJBzjml.js";import"./TabItem-Bsqu01ha.js";import"./TextInput-BwMR_4UK.js";import"./Tree-DBkTkPOc.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DykVKKPP.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
