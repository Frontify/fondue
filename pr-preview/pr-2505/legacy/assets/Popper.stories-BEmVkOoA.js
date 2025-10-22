import{r as p,j as t}from"./iframe-CArh3U2R.js";import{a as b}from"./Box-hq_c_9Ms.js";import{B as h}from"./Button-ChMCF2L2.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CnAhvCkF.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CjSqb4ET.js";import"./Divider-DKzzOKDP.js";import"./FormControl-DEHlUEia.js";import"./InputLabel-DD8443rL.js";import"./TooltipIcon-BZzSYTtM.js";import"./LegacyTooltip-KCzikuHf.js";import"./useLink-CLCUz5KQ.js";import"./useFocusable-BQQ-aorh.js";import"./useFocusRing-Dk1gKGXm.js";import"./useEffectEvent-YMJ2RRp9.js";import"./chain-XO24dopb.js";import"./index-NcOw1q2c.js";import"./usePopper-u01rWO-b.js";import"./index-qy9vPm5y.js";import"./Portal-BcBrSEu7.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DWWCqZzw.js";import"./IconCheckMark-fZKVZSXZ.js";import"./IconExclamationMarkCircle24-B8MY2-G8.js";import"./IconExclamationMarkTriangle-CpHRnvpz.js";import"./IconExclamationMarkTriangle24-CVz-ZF86.js";import"./IconQuestionMarkCircle-DibesPc_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B3caMxJh.js";import"./Switch-gCrpPFBl.js";import"./TabItem-DL2KRk5d.js";import"./elements-BOYmskOL.js";import"./TextInput-B5eKkgOy.js";import"./IconCross-Bn4Yb7Uk.js";import"./Tree-CKZ5ErBL.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B-R3TvPg.js";import"./IconCaretDown-COXRRCVT.js";import"./IconCaretDown16-BMJgRViX.js";import"./IconTrashBin16-tWHvn42_.js";import"./IconTrashBin24-C1q5nmsK.js";import"./useButton-D6AuNLTw.js";import"./useClickOutside-A3QcY4xE.js";import"./EnablePortalWrapper-FQwpj0I2.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
