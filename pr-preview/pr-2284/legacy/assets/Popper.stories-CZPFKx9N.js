import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as p}from"./index-ClcD9ViR.js";import{a as b}from"./Box-1yY-nWFK.js";import{c as h}from"./Button-CacleqQO.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-C85C2MGF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./input-BTnzuMtk.js";import"./Divider-BRU6Vhb1.js";import"./Dropdown-DNd1p4TV.js";import"./useButton-CmN_Qqm3.js";import"./useFocusable-NpJIjJzn.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./FocusScope-BbG7qqtO.js";import"./useOverlayTriggerState-Do1lhetf.js";import"./useControlledState-CbyHarIm.js";import"./useMenuTrigger-WEg3SWYq.js";import"./useLabels-B-KZ60t7.js";import"./useLocalizedStringFormatter-DuHRzRSj.js";import"./context-dZDq9eSh.js";import"./VisuallyHidden-BJ4JcGHV.js";import"./helper-kX8HYG1i.js";import"./isScrollable-BSEN4xi5.js";import"./SelectionManager-C5uJtM9S.js";import"./useField-DK1vwUqC.js";import"./useFormValidationState-CY2oi0R5.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./MenuItem-CSK1Q0qS.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CAeLeSzU.js";import"./IconCheckMark-DDrIoLdu.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-N4gckcbl.js";import"./Trigger-DPfUCRqP.js";import"./IconCaretDown-BLgqrlDL.js";import"./IconCaretDown16-Df8Xsbqc.js";import"./IconCross-BVasaH61.js";import"./IconExclamationMarkTriangle-DOh84ahI.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./IconTrashBin16-DOiZQ5Am.js";import"./IconTrashBin24-10Yg3nt7.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-DHpdIRHB.js";import"./Portal-B3A1C5qZ.js";import"./useMemoizedId-DU5NJZZj.js";import"./FormControl--ehuic3I.js";import"./InputLabel-CAP8jsDr.js";import"./TooltipIcon-C9vG9kLd.js";import"./LegacyTooltip-CmyMM9dF.js";import"./useLink-DLd-zCvm.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./IconQuestionMarkCircle-7EPrDyIp.js";import"./Switch-KWek4gAp.js";import"./TabItem-7zIDIg2o.js";import"./TextInput-BACchVig.js";import"./Tree-zO-e1FBW.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BcVMXM8r.js";import"./dialog-Dre1eVQK.js";const Ht={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
