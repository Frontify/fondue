import{r as p,j as t}from"./iframe-CVRB9xG5.js";import{a as b}from"./Box-DJoc6VJd.js";import{B as h}from"./Button-DRuLCDDt.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Q8dstYik.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DIG8XJhi.js";import"./Divider-COlvtABj.js";import"./Dropdown-BZ-q_Yo7.js";import"./useButton-BKijJ8Ox.js";import"./useFocusable-K9LUaTpT.js";import"./useFocusRing-CIR8l5qb.js";import"./useEffectEvent-D4McFjJW.js";import"./chain-CmopQXAK.js";import"./index-C6YV3ckd.js";import"./FocusScope-tItaIZX5.js";import"./useOverlayTriggerState-GQW_x-1C.js";import"./useControlledState-Bj_ZyrJ6.js";import"./useMenuTrigger-DXxV6CNV.js";import"./useLabels-SLuP_5C7.js";import"./useLocalizedStringFormatter-CXhFz9Uz.js";import"./context-DA4el76b.js";import"./VisuallyHidden-BFQqEv8e.js";import"./helper-DhtKJs8K.js";import"./keyboard-BKGhVC1E.js";import"./SelectionManager-C7n6sNA4.js";import"./useField-DQHpHPfW.js";import"./useFormValidationState-Cf_zmRn5.js";import"./usePopper-BPdQg_1a.js";import"./index-Dm3ZYyOZ.js";import"./MenuItem-nXi4WjEb.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-zxwIR15_.js";import"./IconCheckMark-D8jA0-uN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D2yuAP7u.js";import"./Trigger-CsKuBAxO.js";import"./IconCaretDown-Dk5eGzJF.js";import"./IconCaretDown16-D-_xQ8kJ.js";import"./IconCross-DXx1uM3O.js";import"./IconExclamationMarkTriangle-CDVeuzB2.js";import"./IconExclamationMarkTriangle24-CzJn6JJ4.js";import"./IconTrashBin16-BDkWhi4I.js";import"./IconTrashBin24-BLra6c_I.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CVWQx04t.js";import"./Portal-C9aGMHWR.js";import"./useMemoizedId-DZ_GWwWH.js";import"./FormControl-CQTEks-w.js";import"./InputLabel-DYgwFPIk.js";import"./TooltipIcon-CSS_ITO5.js";import"./LegacyTooltip-bqc1XdDN.js";import"./useLink-Bi6OJ7FT.js";import"./IconExclamationMarkCircle24-DEAcLkxP.js";import"./IconQuestionMarkCircle-pq_7Xd4U.js";import"./Switch-qFvrWM4M.js";import"./TabItem-D5Bmdvm6.js";import"./TextInput-D688XE6y.js";import"./Tree-BhxCNV8P.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-CH4jqpXL.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
