import{r as p,j as t}from"./iframe-c512yrIH.js";import{a as b}from"./Box-Bg-lACQJ.js";import{B as h}from"./Button-CQ2twKwQ.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DJYsqGzv.js";import"./preload-helper-DuVWtNEG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DAbnrn4s.js";import"./Checkbox-VGd323Ci.js";import"./useFocusable-CF9RzjNn.js";import"./useFocusRing-pRW46DX8.js";import"./useEffectEvent-DKu7Utjh.js";import"./chain-CfHjZEmK.js";import"./index-BPiDMcMS.js";import"./useFormValidationState-yuQ204mm.js";import"./useControlledState-C0RSaY3j.js";import"./InputLabel-B86WLvjV.js";import"./TooltipIcon-BTYBy4eU.js";import"./LegacyTooltip-nkYMLArH.js";import"./useLink-qwOmUS1x.js";import"./usePopper-DqfTW_q9.js";import"./index-0bzfsZuo.js";import"./Portal-aqbXDSbc.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CQNzOXzl.js";import"./IconCheckMark-Dsh2IxuG.js";import"./IconExclamationMarkCircle24-BpjzptM1.js";import"./IconExclamationMarkTriangle-D0OAcy7G.js";import"./IconExclamationMarkTriangle24-D_roIFdK.js";import"./IconQuestionMarkCircle-seQQRrmY.js";import"./IconMinus-gxLnqE3X.js";import"./Divider-DlUNLzPc.js";import"./FormControl-C_BMoidY.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BUQQWMLi.js";import"./Switch-DCarcGco.js";import"./TabItem-Bg44aVa7.js";import"./elements-BOYmskOL.js";import"./TextInput-D9V2hlzg.js";import"./IconCross-XkaW0Zf_.js";import"./Tree-pvsOByw0.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-LRcnMm3f.js";import"./IconCaretDown-sOW78wV8.js";import"./IconCaretDown16-B0YkCtOb.js";import"./IconTrashBin16-ophRe3jP.js";import"./IconTrashBin24-zXSq5zF0.js";import"./useButton-B443xHOa.js";import"./useClickOutside-n9EKo7xD.js";import"./EnablePortalWrapper-BeV-lT_S.js";import"./dialog-D9O7a7Fm.js";const xt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var s,i,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Pt=["Default","WithPortal"];export{o as Default,e as WithPortal,Pt as __namedExportsOrder,xt as default};
