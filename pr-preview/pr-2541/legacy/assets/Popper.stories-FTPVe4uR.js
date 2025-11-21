import{r as s,j as t}from"./iframe-CNo3YVsc.js";import{a as b}from"./Box-f1STZ4CQ.js";import{B as h}from"./Button-DSKbxRmM.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CNRL6LGp.js";import"./preload-helper-DlITqhEh.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BV_j-pI1.js";import"./DialogBody-dGKKxNdZ.js";import"./dialog-D9O7a7Fm.js";import"./Divider-D7HJMwAU.js";import"./FormControl-CLdbqLZP.js";import"./InputLabel-Bm8wfAd_.js";import"./TooltipIcon-8GkEdu5Q.js";import"./LegacyTooltip-BWEuyPxA.js";import"./useLink-DzaWF_eP.js";import"./useFocusable-Ck5I81y_.js";import"./useFocusRing-7JjcBI-b.js";import"./useEffectEvent-CPLHfrgJ.js";import"./chain-CWpWcDO5.js";import"./index-wYTbFd06.js";import"./usePopper-DbsfvSqQ.js";import"./index-DQIEpFFe.js";import"./Portal-Fr1NMp8K.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DeVr9eAN.js";import"./IconCheckMark-BWs2hIls.js";import"./IconExclamationMarkCircle24-BNab1dGr.js";import"./IconExclamationMarkTriangle-_reS8VEg.js";import"./IconExclamationMarkTriangle24-DDzLiGUb.js";import"./IconQuestionMarkCircle-BiqZeOgv.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B2bIEAkx.js";import"./Switch-BL4UP2ej.js";import"./TabItem-CD6D-kTu.js";import"./elements-BOYmskOL.js";import"./TextInput-w72dAVHt.js";import"./IconCross-CaAA8zRb.js";import"./Tree-7Mn6VZHr.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-32Vpq5Z4.js";import"./useClickOutside-WVTxdjSb.js";import"./EnablePortalWrapper-B8hNlEtI.js";const mt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,l,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const dt=["Default","WithPortal"];export{e as Default,o as WithPortal,dt as __namedExportsOrder,mt as default};
