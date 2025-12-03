import{r as p,j as t}from"./iframe-Daozt3iQ.js";import{a as b}from"./Box-xGIeYbF0.js";import{B as h}from"./Button-Bd7LWYaJ.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-D8rhxf09.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D8x9f3pr.js";import"./Divider-Bsg79Mxz.js";import"./FormControl-DWwqpw-d.js";import"./InputLabel-CVDMD-Tn.js";import"./TooltipIcon-DYcAVd3n.js";import"./LegacyTooltip-ChAPEshh.js";import"./useLink-Dy-sCuG2.js";import"./useFocusable-DL4Y5ggQ.js";import"./useFocusRing-CGU-cSgr.js";import"./useEffectEvent-12J7pWwB.js";import"./chain-CsCbg1Z2.js";import"./index-BfIvuXwT.js";import"./usePopper-vdmvH7Th.js";import"./index-OWryF59X.js";import"./Portal-DTK6lLVZ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Dk7Aese3.js";import"./IconCheckMark-Clmozq0X.js";import"./IconExclamationMarkCircle24-BwRpG_-o.js";import"./IconExclamationMarkTriangle-Dk5-PKfw.js";import"./IconExclamationMarkTriangle24-C02DR5Po.js";import"./IconQuestionMarkCircle-BAV0QCbN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DDuBjsDb.js";import"./Switch-BvmLFAiE.js";import"./TabItem-Cfcnd0Sr.js";import"./elements-BOYmskOL.js";import"./TextInput-C78iyWbb.js";import"./IconCross-CTbg5X3_.js";import"./Tree-CgXzFTP6.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B2W7P8Z-.js";import"./IconCaretDown-JmDsgtmL.js";import"./IconCaretDown16-HYLk9eai.js";import"./IconTrashBin16-ZQBoDWZj.js";import"./IconTrashBin24-Du6CqYoX.js";import"./useButton-ObNU-Eop.js";import"./useClickOutside-ZxkCjlDe.js";import"./EnablePortalWrapper-B8rj-dCL.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const bt=["Default","WithPortal"];export{e as Default,o as WithPortal,bt as __namedExportsOrder,wt as default};
