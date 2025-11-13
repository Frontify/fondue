import{r as p,j as t}from"./iframe-D5jKmvFy.js";import{a as b}from"./Box-B-f6EHAA.js";import{B as h}from"./Button-DwCG1rzi.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CdBxvI3A.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cuuz4wSk.js";import"./Divider-Bvj5EVjz.js";import"./Dropdown-DZN4seAd.js";import"./useButton-BSs9oz24.js";import"./useFocusable-BgFDsCFo.js";import"./useFocusRing-CF_DgWy2.js";import"./useEffectEvent-COAqNv_C.js";import"./chain-VjPdPKMz.js";import"./index-DwAO_Mfr.js";import"./FocusScope-IhAlz2x1.js";import"./useOverlayTriggerState-LoBAR65Z.js";import"./useControlledState-CYZEwJbA.js";import"./useMenuTrigger-CRlHAnCk.js";import"./useLabels-DQCmoryD.js";import"./useLocalizedStringFormatter-BPxuIa14.js";import"./context-C5iXvv9h.js";import"./VisuallyHidden-B4JthJSH.js";import"./helper-DdJ95vwf.js";import"./keyboard-Csc3fxLT.js";import"./SelectionManager-gdH0maxf.js";import"./useField-DVkZvzOP.js";import"./useFormValidationState-ELDSdfTc.js";import"./usePopper-CXMbn7uu.js";import"./index-IIBlqUBL.js";import"./MenuItem-Brj3YH5_.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-C-HjVwgN.js";import"./IconCheckMark-QrCV5fbd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-XxlqpNA4.js";import"./Trigger-CtdnUMm-.js";import"./IconCaretDown-sbJtFOOJ.js";import"./IconCaretDown16-DuiE5sVg.js";import"./IconCross-djj-Oyd4.js";import"./IconExclamationMarkTriangle-D8faLJTj.js";import"./IconExclamationMarkTriangle24-DA1-FB5D.js";import"./IconTrashBin16-B0HMjzoh.js";import"./IconTrashBin24-BVh-BotE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Czs5h7OA.js";import"./Portal-DWmcDSHy.js";import"./useMemoizedId-DeWUksGg.js";import"./FormControl-BAvj2x9i.js";import"./InputLabel-BSPFWPaA.js";import"./TooltipIcon-D3wuiUby.js";import"./LegacyTooltip-BhAlSmqQ.js";import"./useLink-xpLz3Lhk.js";import"./IconExclamationMarkCircle24-CStJ-czY.js";import"./IconQuestionMarkCircle-CIYpTH4-.js";import"./Switch-D3rvabZF.js";import"./TabItem-CdVFMx15.js";import"./TextInput-BlmxafZW.js";import"./Tree-q0L28dFW.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-C8l2PBjA.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
