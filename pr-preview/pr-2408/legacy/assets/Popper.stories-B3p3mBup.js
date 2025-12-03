import{r as p,j as t}from"./iframe-BAs66q-y.js";import{a as b}from"./Box-Czuxq3f_.js";import{B as h}from"./Button-DiFEGYOd.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-PuWPc4b0.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Df4HuyWW.js";import"./Divider-BHk6ADaB.js";import"./Dropdown-CyVeFiwv.js";import"./useButton-CYVFW046.js";import"./useFocusable-sCR6hlmP.js";import"./useFocusRing-DtTNLt6b.js";import"./useEffectEvent-DUywcjoj.js";import"./chain-DnRJsLVr.js";import"./index-Bh1fiD1s.js";import"./FocusScope-D9HFzMt2.js";import"./useOverlayTriggerState-D6F0qxv5.js";import"./useControlledState-DJ95kXMR.js";import"./useMenuTrigger-DjMW7zZh.js";import"./useLabels-Dg7dxfz3.js";import"./useLocalizedStringFormatter-CwIUowm7.js";import"./context-BqDYnsXe.js";import"./VisuallyHidden-BsEKTHRO.js";import"./helper-BgMr6a0O.js";import"./keyboard-PIaYjKXa.js";import"./SelectionManager-B__P9tjp.js";import"./useField-CzlnO5I0.js";import"./useFormValidationState-C3ThlA5x.js";import"./usePopper-DnwQV-I2.js";import"./index-DAF0bHRr.js";import"./MenuItem-CvekQis2.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-B83ypG7N.js";import"./IconCheckMark-ClJoYzcd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-stetqMeh.js";import"./Trigger-BmWuE7Ap.js";import"./IconCaretDown-BgNMmECk.js";import"./IconCaretDown16-C3ruKkfy.js";import"./IconCross-DQtaiSeo.js";import"./IconExclamationMarkTriangle-CUgf1hN4.js";import"./IconExclamationMarkTriangle24-fIc-6H-A.js";import"./IconTrashBin16-OauIEEpQ.js";import"./IconTrashBin24-CQB4zbX2.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Bz-0KfR0.js";import"./Portal-CZvTnhKZ.js";import"./useMemoizedId-4MNB7gNb.js";import"./FormControl-8DuxOAbG.js";import"./InputLabel-D4el736C.js";import"./TooltipIcon-BgDhRiQe.js";import"./LegacyTooltip-B4izmg71.js";import"./useLink-dheUg-NM.js";import"./IconExclamationMarkCircle24-DerCV26r.js";import"./IconQuestionMarkCircle-CjKqKFR0.js";import"./Switch-DEUU4lT2.js";import"./TabItem-C-Hm3P-3.js";import"./TextInput-BL5oiPXa.js";import"./Tree-uW6T6fR6.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-C7qyTSbO.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
