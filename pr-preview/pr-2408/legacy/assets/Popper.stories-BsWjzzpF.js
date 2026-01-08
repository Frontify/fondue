import{r as n,j as t}from"./iframe-BTc0KMXu.js";import{a as b}from"./Box-DCpDn0fb.js";import{B as h}from"./Button-4v4SY4EE.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CarU3Bj3.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D2GxCp2g.js";import"./Checkbox-CFXFhtyK.js";import"./useFocusable-BVaAWhEn.js";import"./useFocusRing-Eh4zIRvV.js";import"./useLayoutEffect-Bhzdz1pW.js";import"./chain-_H33-WwR.js";import"./index-BCmaXsFD.js";import"./useFormValidationState-C8mLtM0B.js";import"./useControlledState-yMhDR9az.js";import"./InputLabel-R2OQSMdq.js";import"./TooltipIcon-C_bcpkU6.js";import"./LegacyTooltip-0-B2Yxn7.js";import"./useLink-BF3wb2Hj.js";import"./usePopper-B_jEVmaR.js";import"./index-CrCKdNAz.js";import"./Portal-Dz4APVce.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C1ZtptnH.js";import"./IconCheckMark-CP9wktNS.js";import"./IconExclamationMarkCircle24-BCcu29DI.js";import"./IconExclamationMarkTriangle--6YVzded.js";import"./IconExclamationMarkTriangle24-DEGneVxR.js";import"./IconQuestionMarkCircle-BJhajIiR.js";import"./IconMinus-lFm3XErM.js";import"./Divider-C8c4gguy.js";import"./Dropdown-DIRAFP45.js";import"./useButton-Byswzb6B.js";import"./FocusScope-Hd9memky.js";import"./useOverlayTriggerState-D6_wqmHJ.js";import"./useMenuTrigger-CiIT_dfL.js";import"./useLabels-702ZkEtX.js";import"./useLocalizedStringFormatter-Dv9VvTFf.js";import"./context-D3baERfd.js";import"./VisuallyHidden-CgDuI4Wj.js";import"./helper-U7aLmhzN.js";import"./keyboard-BJYrNJXw.js";import"./SelectionManager-Cv8KeFy1.js";import"./useField-CKfh6VT1.js";import"./MenuItem-TWTNz5L6.js";import"./IconCaretRight-oI_MBEQP.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DNgo8LFv.js";import"./Trigger-B84DjInz.js";import"./IconCaretDown-CbkGi4X7.js";import"./IconCaretDown16-f1XXOg7-.js";import"./IconCross-DyMKw9aw.js";import"./IconTrashBin16-BDBRvQHf.js";import"./IconTrashBin24-B019_xFM.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cxj4rGm4.js";import"./FormControl-D5_MeXnd.js";import"./Switch-BU4fLFX4.js";import"./TabItem-DympXqX9.js";import"./TextInput-6Iwkf2b4.js";import"./Tree-Ch8oFjlR.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DpkMaEyb.js";import"./dialog-D9O7a7Fm.js";const kt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=n.useState(!1),p=n.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:p,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:p,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
