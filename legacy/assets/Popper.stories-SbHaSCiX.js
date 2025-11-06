import{r as p,j as t}from"./iframe-SquABeg9.js";import{a as b}from"./Box-DUDHtOFb.js";import{B as h}from"./Button-bhuDGfA_.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-B0voCar7.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-IHYNAO0Y.js";import"./Divider-BZjJAXxX.js";import"./Dropdown-loYZguqP.js";import"./useButton-CIEkMiEW.js";import"./useFocusable-DSYH9RGK.js";import"./useFocusRing-BNK5FnXw.js";import"./useEffectEvent-I7gaBWEc.js";import"./chain-DWdr7d2C.js";import"./index-B6kSvp4Y.js";import"./FocusScope-BNpOWlK1.js";import"./useOverlayTriggerState-TQABtVAH.js";import"./useControlledState-CKOYWGYS.js";import"./useMenuTrigger-DnkaOMKE.js";import"./useLabels-C2pOqwIg.js";import"./useLocalizedStringFormatter-9I6FMkHq.js";import"./context-DonO3nJ8.js";import"./VisuallyHidden-B0vXfdTD.js";import"./helper-CeKBxdXa.js";import"./keyboard-DlKDWBwh.js";import"./SelectionManager-CyzKPpQE.js";import"./useField-IHSvhna4.js";import"./useFormValidationState-DSSo4usY.js";import"./usePopper-D1AGYINs.js";import"./index-DDB6fytH.js";import"./MenuItem-BwhCH_fz.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BUVD6u9U.js";import"./IconCheckMark-66M7SP9V.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DJUiJZHt.js";import"./Trigger-CeaegHCh.js";import"./IconCaretDown-0LGKf1hU.js";import"./IconCaretDown16-i3yW0a_h.js";import"./IconCross-Cti5Whzf.js";import"./IconExclamationMarkTriangle-CsYvi7vh.js";import"./IconExclamationMarkTriangle24-B0l4j4Hn.js";import"./IconTrashBin16-D4ch4T_K.js";import"./IconTrashBin24-DvkTTty9.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DB6ILfFA.js";import"./Portal-jeo8LuUZ.js";import"./useMemoizedId-ClOqGxXF.js";import"./FormControl-CHlMP_eN.js";import"./InputLabel-f3Z9IsXu.js";import"./TooltipIcon-BeNX6opp.js";import"./LegacyTooltip-kSW3trmM.js";import"./useLink-BZ12yVmf.js";import"./IconExclamationMarkCircle24-DFTnLpMP.js";import"./IconQuestionMarkCircle-BlPUz1KK.js";import"./Switch-BlNXVOTN.js";import"./TabItem-DRZ9YnlT.js";import"./TextInput-D54uz858.js";import"./Tree-CIOoVjhp.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-C9lEFXjz.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
