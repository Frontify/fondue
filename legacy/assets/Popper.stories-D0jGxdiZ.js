import{r as n,j as t}from"./iframe-loALxrwA.js";import{a as b}from"./Box-Vv0xqBGm.js";import{B as h}from"./Button-xxPrQzX3.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-L0Un9H0w.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CpAKlech.js";import"./Checkbox-DHrS9Tqv.js";import"./useFocusable-gZZJckaE.js";import"./useFocusRing-KMhl1UJS.js";import"./useEffectEvent-4xwT3IDe.js";import"./chain-DPfOkws3.js";import"./index-Dxja0Wkm.js";import"./useFormValidationState-Be-B2n0Z.js";import"./useControlledState-DLXBMBYE.js";import"./InputLabel-CtseXcks.js";import"./TooltipIcon-CMqqw_pw.js";import"./LegacyTooltip-Cor5DXUh.js";import"./useLink-C5uGPnj2.js";import"./usePopper-c8iwtMtM.js";import"./index-D5EgzJqU.js";import"./Portal-BOzxa9wa.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Dz0xJZ2i.js";import"./IconCheckMark-B_q4DDrQ.js";import"./IconExclamationMarkCircle24-EhlvbpVM.js";import"./IconExclamationMarkTriangle-B8PE083H.js";import"./IconExclamationMarkTriangle24-qoBG5I0z.js";import"./IconQuestionMarkCircle-Car0cXyI.js";import"./IconMinus-OykVdnIk.js";import"./DialogBody-YPshOcvZ.js";import"./dialog-D9O7a7Fm.js";import"./Divider-DLnR9heJ.js";import"./Dropdown-CaaOnjf9.js";import"./useButton-CIYJdvKD.js";import"./FocusScope-G2sE9zlO.js";import"./useOverlayTriggerState-am9Ln9_3.js";import"./useMenuTrigger-Chk3MCxN.js";import"./useLabels-bdaQqbJL.js";import"./useLocalizedStringFormatter-BJknxX9O.js";import"./context-BO2wI_GH.js";import"./VisuallyHidden-BnxHhjaw.js";import"./helper-PKiWzScp.js";import"./keyboard-BryKsZUz.js";import"./SelectionManager-BoAOKyeU.js";import"./useField-DibquiUW.js";import"./MenuItem-CmE5NgSO.js";import"./IconCaretRight-Dhoo0xjN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B9uL4gHk.js";import"./Trigger-2VLOT0SV.js";import"./IconCaretDown-CAMMwaLk.js";import"./IconCaretDown16-C9Kzqhea.js";import"./IconCross-CrFfhLsy.js";import"./IconTrashBin16-B3StqCVf.js";import"./IconTrashBin24-BoRbGsWA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BXnrvz9y.js";import"./FormControl-CrObdnG3.js";import"./Switch-DsaiqYEb.js";import"./TabItem-DKfp7mkL.js";import"./TextInput-BjAQOjJb.js";import"./Tree-B5AxJst3.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-B8frtDHS.js";const At={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=n.useState(!1),p=n.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:p,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:p,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
