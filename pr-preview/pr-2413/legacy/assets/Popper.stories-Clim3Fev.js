import{r as p,j as t}from"./iframe-Dtd24MxH.js";import{a as b}from"./Box-BojVmlVK.js";import{B as h}from"./Button-BmA2c-Ez.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-B6xBH96n.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CHxH5ccZ.js";import"./Dropdown-DlM-B9Sh.js";import"./useButton-Bd4xaui-.js";import"./useFocusable-BMUoJisz.js";import"./useFocusRing-CL2h4CZj.js";import"./useEffectEvent-DviX6QEk.js";import"./chain-IU3pdxS0.js";import"./index-rfpevG3F.js";import"./FocusScope-DMsSqXBe.js";import"./useOverlayTriggerState-CRWG4qdj.js";import"./useControlledState-c0Ko6UWb.js";import"./useMenuTrigger-Ba7VO8A8.js";import"./useLabels-CuMlQRR9.js";import"./useLocalizedStringFormatter-DwQuFwip.js";import"./context-389Zq0wA.js";import"./VisuallyHidden-CYR0IsLz.js";import"./helper-CdZciewc.js";import"./keyboard-CJhA8ta1.js";import"./SelectionManager-BdGAmMai.js";import"./useField-Ry6uqgzn.js";import"./useFormValidationState-BxRoQvn-.js";import"./usePopper-DabaB_ap.js";import"./index-C7HzEFMc.js";import"./MenuItem-77x5yKXI.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-3linth-Y.js";import"./IconCheckMark-C7ywmL8h.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Jreppdbq.js";import"./Trigger-5E1_yXNr.js";import"./IconCaretDown--7xAo5sy.js";import"./IconCaretDown16-BDaxg1xa.js";import"./IconCross-Dt54EG0U.js";import"./IconExclamationMarkTriangle-BxritIK-.js";import"./IconExclamationMarkTriangle24-D5inHBjm.js";import"./IconTrashBin16-DeOyP_ds.js";import"./IconTrashBin24-bX9idqUZ.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Doy2CqR6.js";import"./Portal-y5hFKhRU.js";import"./useMemoizedId-BHL4PMrn.js";import"./FormControl-xL0h1wQs.js";import"./InputLabel-B2u6dO4K.js";import"./TooltipIcon-Dpg-viXv.js";import"./LegacyTooltip-RevLrkgj.js";import"./useLink-DXPeYuPX.js";import"./IconExclamationMarkCircle24-rywGLGWv.js";import"./IconQuestionMarkCircle-_l4CM1fs.js";import"./Switch-CaINkcUE.js";import"./TabItem-DY7SdcUI.js";import"./TextInput-BbF7tWPV.js";import"./Tree-D2-ze09V.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BnODS62_.js";import"./dialog-D9O7a7Fm.js";const Et={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const _t=["Default","WithPortal"];export{o as Default,e as WithPortal,_t as __namedExportsOrder,Et as default};
