import{r as p,j as t}from"./iframe-mBD-AuCT.js";import{a as b}from"./Box-BmI01P-O.js";import{B as h}from"./Button-BhPspr2O.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CipzHdYy.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BJtwRwWl.js";import"./Divider-CyNv4tUv.js";import"./Dropdown-Dq0Ms9-1.js";import"./useButton-D-Nbc6Na.js";import"./useFocusable-DXmFQ-Hx.js";import"./useFocusRing-DuRzJrJR.js";import"./useEffectEvent-pe2_FiFR.js";import"./chain-B6Y7B1-O.js";import"./index-Cyjkes1y.js";import"./FocusScope-DgjzWB0B.js";import"./useOverlayTriggerState-BctEXfHz.js";import"./useControlledState-B6GpZLHS.js";import"./useMenuTrigger-Mq8ScBc7.js";import"./useLabels-DRYwn0g6.js";import"./useLocalizedStringFormatter-D_i_jBZw.js";import"./context-Mh9QfmU1.js";import"./VisuallyHidden-D9_wafRX.js";import"./helper-BGLeyA6q.js";import"./keyboard-BA3Msqld.js";import"./SelectionManager-DjjzU2Tj.js";import"./useField-r5ZYFHZL.js";import"./useFormValidationState-B9L8KDiQ.js";import"./usePopper-aEWF7LpH.js";import"./index-ChPYWZnj.js";import"./MenuItem-BE2QCwDa.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-xD5iAQ8R.js";import"./IconCheckMark-BSe8qHmE.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-gv9Ve-.js";import"./Trigger-uuT5TkZo.js";import"./IconCaretDown-BD4Dl5od.js";import"./IconCaretDown16-Dyqz2sdD.js";import"./IconCross-CQTF90o9.js";import"./IconExclamationMarkTriangle-DqpgRJRQ.js";import"./IconExclamationMarkTriangle24-CGGNSbqG.js";import"./IconTrashBin16-BVuGxt0P.js";import"./IconTrashBin24-CxLpERYY.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DkNopmNx.js";import"./Portal-_yzzHhGt.js";import"./useMemoizedId-DEI-3hVY.js";import"./FormControl-BkzR22vN.js";import"./InputLabel-BKReFpg8.js";import"./TooltipIcon--SsjAZ56.js";import"./LegacyTooltip-CQ9s119n.js";import"./useLink-CUJ7p1SF.js";import"./IconExclamationMarkCircle24-CbROWlL7.js";import"./IconQuestionMarkCircle-D5gNDsEa.js";import"./Switch-CZc7I_c8.js";import"./TabItem-Ct4qjJJe.js";import"./TextInput-D5geOiLQ.js";import"./Tree-3-D_6k8Z.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-CHNIQSRo.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
