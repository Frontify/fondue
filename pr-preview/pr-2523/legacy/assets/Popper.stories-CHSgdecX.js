import{r as p,j as t}from"./iframe-DXv6_zxw.js";import{a as b}from"./Box-hQidnB8s.js";import{B as h}from"./Button-DB7dFfFM.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CrVDz4tQ.js";import"./preload-helper-DuVWtNEG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-E2C5Vnav.js";import"./DialogBody-BpBSwj_T.js";import"./dialog-D9O7a7Fm.js";import"./Dropdown-CN2QCvAy.js";import"./useButton-BWcd71sq.js";import"./useFocusable-C6g0tqIP.js";import"./useFocusRing-BDH3dCmG.js";import"./useEffectEvent-Cb0J6-Z5.js";import"./chain-Cep8FPJT.js";import"./index-D5d5qoat.js";import"./FocusScope-DF8eB_8k.js";import"./useOverlayTriggerState-BF9Ejr7z.js";import"./useControlledState-DDv6-Uf2.js";import"./useMenuTrigger-CSV6ff0t.js";import"./useLabels-C9c88eWi.js";import"./useLocalizedStringFormatter-C9M-JYBw.js";import"./context-dXxHuuPL.js";import"./VisuallyHidden-NB3jxiiY.js";import"./helper-CDVeeeSq.js";import"./keyboard-cPqzm9YB.js";import"./SelectionManager-CiO-adce.js";import"./useField-vps60C3F.js";import"./useFormValidationState-Dg9NlgVh.js";import"./usePopper-DoCz1CAH.js";import"./index-DTurQfMI.js";import"./MenuItem-Caq1dhQs.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-B-1fyYMe.js";import"./IconCheckMark-DMtvZSaL.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CtBuO66S.js";import"./Trigger-DJZQqjTl.js";import"./IconCaretDown-COFec5dc.js";import"./IconCaretDown16-K8LLN_zE.js";import"./IconCross-ChoN4EKq.js";import"./IconExclamationMarkTriangle-3n2PXe_1.js";import"./IconExclamationMarkTriangle24-BbOn-BSr.js";import"./IconTrashBin16-DydGqa1B.js";import"./IconTrashBin24-DuDeaqYC.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CUHPqDOI.js";import"./Portal-Cq_WqqFl.js";import"./useMemoizedId-BtQw0SRa.js";import"./FormControl-5qp0V7R7.js";import"./InputLabel-BqHeIl9A.js";import"./TooltipIcon-B5Y25Mx8.js";import"./LegacyTooltip-Bkscll9N.js";import"./useLink-XVzpit63.js";import"./IconExclamationMarkCircle24-McNHjZdr.js";import"./IconQuestionMarkCircle-B6JXS_eg.js";import"./Switch-D9Cyv3s_.js";import"./TabItem-CKM5VRvc.js";import"./TextInput-DvIqlsWQ.js";import"./Tree-D-E_zzFb.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-Dz50VxsE.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
