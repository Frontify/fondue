import{r as p,j as t}from"./iframe-Btcqq7dy.js";import{a as b}from"./Box-DpGr1gAY.js";import{B as h}from"./Button-BJWDyIXg.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CbuuYnTN.js";import"./preload-helper-DuVWtNEG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-j6CHzBS2.js";import"./Divider-D8IsyLFN.js";import"./Dropdown-B9ewyHVx.js";import"./useButton-C-fjEikW.js";import"./useFocusable-B5oCXX1Q.js";import"./useFocusRing-CRTzIFTL.js";import"./useEffectEvent-OytRhKGv.js";import"./chain-0g0PQBn7.js";import"./index-Dg_J2bTk.js";import"./FocusScope-DiLtXHSf.js";import"./useOverlayTriggerState-B3emzcfU.js";import"./useControlledState-B6lTJX0Y.js";import"./useMenuTrigger-B58YUeRM.js";import"./useLabels-Cqto7ldn.js";import"./useLocalizedStringFormatter-DPAWjLIl.js";import"./context-AWO_E1Rs.js";import"./VisuallyHidden-ZU57im9S.js";import"./helper-B_D4xBgJ.js";import"./keyboard-CKNJrqZs.js";import"./SelectionManager-CsPlexP0.js";import"./useField-B_ILzA0j.js";import"./useFormValidationState-BuJhAC3m.js";import"./usePopper-r4kRogtv.js";import"./index-BSTB5kN_.js";import"./MenuItem-DZjawJox.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DkRmiAV1.js";import"./IconCheckMark-CbRYdrdl.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-ClK6hDzW.js";import"./Trigger-w8Q7QteU.js";import"./IconCaretDown-CMjs7Hwf.js";import"./IconCaretDown16-CYI6RP9H.js";import"./IconCross-G9Cp_5r0.js";import"./IconExclamationMarkTriangle-CMBfXy_7.js";import"./IconExclamationMarkTriangle24-CNFYIAsk.js";import"./IconTrashBin16-BqZ-EI5F.js";import"./IconTrashBin24-FWGMcxTm.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BmGLW7YV.js";import"./Portal-2wuCuHYB.js";import"./useMemoizedId-D4wuPA5x.js";import"./FormControl-wpYfjRpI.js";import"./InputLabel-CjpeikWg.js";import"./TooltipIcon-CKQb9OIh.js";import"./LegacyTooltip-B_706KVn.js";import"./useLink-CVYcev56.js";import"./IconExclamationMarkCircle24-Cstr3t-z.js";import"./IconQuestionMarkCircle-B5G7YBHp.js";import"./Switch-8QVx9HIV.js";import"./TabItem-DZEKG9rH.js";import"./TextInput-D7W__3Pe.js";import"./Tree-CDb-Fq9V.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-92K5fpau.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
