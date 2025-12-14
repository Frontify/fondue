import{r as p,j as t}from"./iframe-ggc05qp5.js";import{a as b}from"./Box-BpSuB_gv.js";import{B as h}from"./Button-CCY2toq0.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Cb2lYsA2.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-MEkF5shV.js";import"./DialogBody-BZzJ_mys.js";import"./dialog-D9O7a7Fm.js";import"./Divider-CoERhSuw.js";import"./Dropdown-CIxnL_ee.js";import"./useButton-ChNz3TLR.js";import"./useFocusable-NG717gvg.js";import"./useFocusRing-ClbPovyK.js";import"./useEffectEvent-TMNpvARu.js";import"./chain-dhKHu04B.js";import"./index-IV9VHTlK.js";import"./FocusScope-D9wOCa0s.js";import"./useOverlayTriggerState-BJ1qhrKO.js";import"./useControlledState-ykz0Rnfd.js";import"./useMenuTrigger-DpVn8X_E.js";import"./useLabels-BJDRUN-n.js";import"./useLocalizedStringFormatter-CKti8yL1.js";import"./context-BJnIPN4y.js";import"./VisuallyHidden-CLxKSwTK.js";import"./helper-BAjx2dyn.js";import"./keyboard-BeorW_Hq.js";import"./SelectionManager-BgHaICas.js";import"./useField-w-TvaOu_.js";import"./useFormValidationState-HmZu6JVu.js";import"./usePopper-BlHz01pa.js";import"./index-Bn025ITx.js";import"./MenuItem-BbNksaEj.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DEkBsEC9.js";import"./IconCheckMark-B5O2hbzH.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DezT8zwL.js";import"./Trigger-x6X4PO3H.js";import"./IconCaretDown-BnU7RbiA.js";import"./IconCaretDown16-CtPRSIn5.js";import"./IconCross-CUTgcpeg.js";import"./IconExclamationMarkTriangle-bsquF2_C.js";import"./IconExclamationMarkTriangle24-Db5_YIYF.js";import"./IconTrashBin16--VXJ7hVf.js";import"./IconTrashBin24-CpCFRkQE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Bs-6SVfL.js";import"./Portal-Bc7Myuvb.js";import"./useMemoizedId-Bc83Oy8u.js";import"./FormControl-XMXivdja.js";import"./InputLabel-BbwthhXI.js";import"./TooltipIcon-DvQt9lcI.js";import"./LegacyTooltip-DXwI5ThW.js";import"./useLink-BzKQhfIP.js";import"./IconExclamationMarkCircle24-BOb3PsaO.js";import"./IconQuestionMarkCircle-CmkyKBhr.js";import"./Switch-CB9EEJT-.js";import"./TabItem-DAOe0Mbq.js";import"./TextInput-4ALtVpG0.js";import"./Tree-BOR5MZeE.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-5Nput7Ah.js";const Ht={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
