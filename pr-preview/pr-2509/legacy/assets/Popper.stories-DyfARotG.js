import{r as p,j as t}from"./iframe-CTdaKj4d.js";import{a as b}from"./Box-DboJyZSQ.js";import{B as h}from"./Button-Bm_WcOm-.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CyAZuE7b.js";import"./preload-helper-D5qcpbyD.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ba-n1B2U.js";import"./Divider-BZSXkwNY.js";import"./Dropdown-BbPKlORf.js";import"./useButton-BoyR-gLm.js";import"./useFocusable-D5v5BXOS.js";import"./useFocusRing-qvQmERHy.js";import"./useEffectEvent-C0QjiGlT.js";import"./chain-C4zg1uY7.js";import"./index-BxZHv3Q3.js";import"./FocusScope-ChEvNH6k.js";import"./useOverlayTriggerState-DvdaRORr.js";import"./useControlledState-BdRnahj0.js";import"./useMenuTrigger-BGbq9tho.js";import"./useLabels-DJeEYSDO.js";import"./useLocalizedStringFormatter-DxXej0b0.js";import"./context-CBgqpM37.js";import"./VisuallyHidden-B0vggYPD.js";import"./helper-JqKjmzWS.js";import"./keyboard-BKG3APZl.js";import"./SelectionManager-CY7iX6yC.js";import"./useField-DACdsH3V.js";import"./useFormValidationState-Dcwylu08.js";import"./usePopper-COiRSxUA.js";import"./index-CpwT1ZzU.js";import"./MenuItem-Dq7ojpGP.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-tNfIFY6w.js";import"./IconCheckMark-BLO_YVDU.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DjvG9W6K.js";import"./Trigger-DjFT1fqu.js";import"./IconCaretDown-B2RHgjKn.js";import"./IconCaretDown16-j1AblOCd.js";import"./IconCross-Befib3GN.js";import"./IconExclamationMarkTriangle-FJXci0JT.js";import"./IconExclamationMarkTriangle24-Do1nSI1f.js";import"./IconTrashBin16-CdiktYZv.js";import"./IconTrashBin24-MMIBMUjF.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DePDkhO3.js";import"./Portal-I51V88Fn.js";import"./useMemoizedId-CCMoqEOy.js";import"./FormControl-Z3syqaE3.js";import"./InputLabel-BUE6hJiL.js";import"./TooltipIcon-uAUvErbA.js";import"./LegacyTooltip-CKi7Gu9g.js";import"./useLink-Bp2GiKfO.js";import"./IconExclamationMarkCircle24-BO32xN40.js";import"./IconQuestionMarkCircle-BqZGmMJ5.js";import"./Switch-Kl-DuV0i.js";import"./TabItem-BC_hjA78.js";import"./TextInput-Dtm7IYNA.js";import"./Tree-CcWwUQpW.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-mFCCHlJ7.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
