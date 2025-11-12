import{r as s,j as e}from"./iframe-DFjLVhbc.js";import{a as b}from"./Box-CpuKb_TY.js";import{B as h}from"./Button-XPgNJcu_.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CEen6IZc.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ds6ipySY.js";import"./Divider-Bea9uO5x.js";import"./FormControl-BoBhULsz.js";import"./InputLabel-BDWyhbvK.js";import"./TooltipIcon-DTnfUr_M.js";import"./LegacyTooltip-D7yTMei4.js";import"./useLink-Cj49D8lr.js";import"./useFocusable-BrJEXGTh.js";import"./useFocusRing-Dpj3h8BM.js";import"./useEffectEvent-Byy-55H1.js";import"./chain-COto9jE3.js";import"./index-D-7FLlQT.js";import"./usePopper-DH9GtlFm.js";import"./index-BPkFHB1-.js";import"./Portal-DLwQmRYf.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DJOVjcIP.js";import"./IconCheckMark-CSMVTQE3.js";import"./IconExclamationMarkCircle24-CwIO_fii.js";import"./IconExclamationMarkTriangle-BpenX5rI.js";import"./IconExclamationMarkTriangle24-D7R2hUNj.js";import"./IconQuestionMarkCircle-B2h9uWzx.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CLUE5Hbx.js";import"./Switch-CLu4a2nk.js";import"./TabItem-DHCjxNWQ.js";import"./elements-BOYmskOL.js";import"./TextInput-C3rHRFW3.js";import"./IconCross-CnsGMava.js";import"./Tree-Dm__3i5r.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-D4BWKnIt.js";import"./useClickOutside-Ckm3YLJn.js";import"./EnablePortalWrapper-D2ZUqfE9.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const me=["Default","WithPortal"];export{t as Default,o as WithPortal,me as __namedExportsOrder,le as default};
