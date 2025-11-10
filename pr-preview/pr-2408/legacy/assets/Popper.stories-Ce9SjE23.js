import{r as p,j as t}from"./iframe-BYByppjA.js";import{a as b}from"./Box-CpWSRXPq.js";import{B as h}from"./Button-w-4T45cJ.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CpSqVSMX.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DCKI2hXM.js";import"./Divider-BQt0MZd2.js";import"./FormControl-C4_d0t2A.js";import"./InputLabel-_c3nWSSE.js";import"./TooltipIcon-BNrqRANO.js";import"./LegacyTooltip-DPlDs3Bg.js";import"./useLink-Dgto1joU.js";import"./useFocusable-BzCPMRzm.js";import"./useFocusRing-DJ3Txbg8.js";import"./useEffectEvent-DYOD1mFo.js";import"./chain-BRjlEOf0.js";import"./index-BvXv4Kpv.js";import"./usePopper-BjMBxjrj.js";import"./index-BloTn-Pt.js";import"./Portal-BdCRmzA4.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-iS5UWw9V.js";import"./IconCheckMark-DTAVvTol.js";import"./IconExclamationMarkCircle24-D_uJ6XBQ.js";import"./IconExclamationMarkTriangle-DKHG93a_.js";import"./IconExclamationMarkTriangle24-CeFjqNf5.js";import"./IconQuestionMarkCircle-CWDsgLYP.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DoOSAgJQ.js";import"./Switch-C9Kuu0Vg.js";import"./TabItem-C5qIyEHY.js";import"./elements-BOYmskOL.js";import"./TextInput-BeY6dKVb.js";import"./IconCross-4Gqhnlgf.js";import"./Tree-BlTmC7Ez.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-uO8VVVTq.js";import"./IconCaretDown-BcsA1pbK.js";import"./IconCaretDown16-BbjYTRIB.js";import"./IconTrashBin16-Cnls3zl1.js";import"./IconTrashBin24-BoXg_kBS.js";import"./useButton-BB9tuRtI.js";import"./useClickOutside-xR95UeCJ.js";import"./EnablePortalWrapper-C6aDJWM9.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
