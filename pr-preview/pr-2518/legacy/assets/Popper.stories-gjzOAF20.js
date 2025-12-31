import{r as s,j as e}from"./iframe-fyGLPEYM.js";import{a as b}from"./Box-CLX-pImO.js";import{B as h}from"./Button-cVJBJqzI.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Bl4bjOy6.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Bcv275Kl.js";import"./Divider-CUG5X0NG.js";import"./FormControl-DfYHdAvy.js";import"./InputLabel-CMSMoU7u.js";import"./TooltipIcon-DojCEOrM.js";import"./LegacyTooltip-adcI7jgp.js";import"./useLink-Bts17Baq.js";import"./useFocusable-CKsTcjuM.js";import"./useFocusRing-S7LgmWKU.js";import"./useEffectEvent-C4w1I5nw.js";import"./chain-DUvsbXUL.js";import"./index-rU3a83jg.js";import"./usePopper-CdXWRaSH.js";import"./index-C1SclwXe.js";import"./Portal-BFyePCGh.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BHlk_IDS.js";import"./IconCheckMark-BVHtCiaM.js";import"./IconExclamationMarkCircle24-CV7jvQVR.js";import"./IconExclamationMarkTriangle-B3hEA56l.js";import"./IconExclamationMarkTriangle24-C0iMsZEC.js";import"./IconQuestionMarkCircle-e2jbGF9X.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle--yaP7k9p.js";import"./Switch-C30WT3Qx.js";import"./TabItem-B8eVqrP3.js";import"./elements-BOYmskOL.js";import"./TextInput-BgILU15o.js";import"./IconCross-Ig2qIE-C.js";import"./useButton-BxjTpxd6.js";import"./useClickOutside-CXLXbWqI.js";import"./EnablePortalWrapper-BFYUrxbk.js";import"./dialog-D9O7a7Fm.js";const ie={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,l,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const ce=["Default","WithPortal"];export{t as Default,o as WithPortal,ce as __namedExportsOrder,ie as default};
