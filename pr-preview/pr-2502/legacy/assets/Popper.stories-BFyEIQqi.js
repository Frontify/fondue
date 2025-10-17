import{r as p,j as t}from"./iframe-MoBs3oke.js";import{a as b}from"./Box-BBpNHmR5.js";import{B as h}from"./Button-CHSQ5G04.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-B25CwDsd.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Vnz1g2HA.js";import"./DialogBody-B9R5tIxS.js";import"./dialog-D9O7a7Fm.js";import"./Divider-BiSgeS5Z.js";import"./Dropdown-BZzjCJXd.js";import"./useButton-C5tY8d-2.js";import"./useFocusable-CXK0fL0G.js";import"./useFocusRing-2zpbRi_h.js";import"./useEffectEvent-B10gOIRQ.js";import"./chain-bxVqvEcS.js";import"./index-XNeqmIYg.js";import"./FocusScope-AHMkJDTf.js";import"./useOverlayTriggerState-CBCaqV4y.js";import"./useControlledState-BMEIdEBn.js";import"./useMenuTrigger-Cfg04eQV.js";import"./useLabels-DVbtlKZe.js";import"./useLocalizedStringFormatter-CkHgGyi4.js";import"./context-DuKYVhKu.js";import"./VisuallyHidden-DQNXk2fv.js";import"./helper-BqzIPBnA.js";import"./keyboard-Bh-3d-67.js";import"./SelectionManager-BeylGFv3.js";import"./useField-URXo4TDX.js";import"./useFormValidationState-iA7Vh-Q-.js";import"./usePopper-BG1lwv8D.js";import"./index-DaGbxSuI.js";import"./MenuItem-DHR5LbTg.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BNCvjaUk.js";import"./IconCheckMark-Dq94ZI-W.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CeR8qJR0.js";import"./Trigger-CtQV1a50.js";import"./IconCaretDown-KuloZ5wo.js";import"./IconCaretDown16-Bd0YWETo.js";import"./IconCross-Drpj3pyS.js";import"./IconExclamationMarkTriangle-Q8ertc4w.js";import"./IconExclamationMarkTriangle24-B9dRqTTK.js";import"./IconTrashBin16-DW5TDvsW.js";import"./IconTrashBin24-M6xuWU20.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-qB3CI-P9.js";import"./Portal-DqGP2ziF.js";import"./useMemoizedId-IOJoatZ5.js";import"./FormControl-CesNQFPy.js";import"./InputLabel-CXvfWDQS.js";import"./TooltipIcon-Dt5djrIf.js";import"./LegacyTooltip--XkvheMY.js";import"./useLink-BCZ4_2_m.js";import"./IconExclamationMarkCircle24-sI7DpcuD.js";import"./IconQuestionMarkCircle-Bm_G3GHX.js";import"./Switch-B69oNbL0.js";import"./TabItem-BL2HOdhs.js";import"./TextInput-Yo756f2e.js";import"./Tree-C4Hqtk5X.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-XWlSsuBV.js";const Ht={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
