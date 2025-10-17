import{r as p,j as t}from"./iframe-D2yG1z8G.js";import{a as b}from"./Box-cMH4V9vz.js";import{B as h}from"./Button-DyZJdRzC.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-PeIXMsPF.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ds3xxMY8.js";import"./Divider-8HP3TTIU.js";import"./FormControl-BQlH37kN.js";import"./InputLabel-CNCsiG3z.js";import"./TooltipIcon-esB0x96Z.js";import"./LegacyTooltip-Bza-CyWY.js";import"./useLink-B4iVauNq.js";import"./useFocusable-CG5e2_ae.js";import"./useFocusRing-CUPlW5s2.js";import"./useEffectEvent-BWMeWV83.js";import"./chain-DIy-ezxT.js";import"./index-DOTWLTGL.js";import"./usePopper-B1ucurC2.js";import"./index-BRHXjPQc.js";import"./Portal-CUyHPEXT.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Nwa-rf0T.js";import"./IconCheckMark-DEoILCsa.js";import"./IconExclamationMarkCircle24-D4bTeovh.js";import"./IconExclamationMarkTriangle-LCwcPvTX.js";import"./IconExclamationMarkTriangle24-DmNRqQJY.js";import"./IconQuestionMarkCircle-D93ThXMY.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-AiTfB69Q.js";import"./Switch-6QMjr_-q.js";import"./TabItem-NmAy5Dtx.js";import"./elements-BOYmskOL.js";import"./TextInput-DSHnXubY.js";import"./IconCross-BPtP3osG.js";import"./Tree-C5tDh8AG.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B9HV8M2g.js";import"./IconCaretDown-DAlyAeDs.js";import"./IconCaretDown16-LfI1PUaG.js";import"./IconTrashBin16-0ahnzJRY.js";import"./IconTrashBin24-CaSAfRi-.js";import"./useButton-BoO6ZY0i.js";import"./useClickOutside-D4LI5oid.js";import"./EnablePortalWrapper-BhbHE_zt.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
