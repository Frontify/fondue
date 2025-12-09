import{r as p,j as t}from"./iframe-DFc2imB-.js";import{a as b}from"./Box-Dd9GlYDk.js";import{B as h}from"./Button-g2quZO2d.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-C6vmTJVO.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CyGRG5jR.js";import"./Divider-Bg-xcAi5.js";import"./FormControl-sYlaWQNH.js";import"./InputLabel-Dd39__5S.js";import"./TooltipIcon-DbV1_Tvp.js";import"./LegacyTooltip-BDvNvRjx.js";import"./useLink-5MLEhbgn.js";import"./useFocusable-DlUYsHvp.js";import"./useFocusRing-CmgQp483.js";import"./useEffectEvent-Dxdtj8T7.js";import"./chain-C5FS3PJJ.js";import"./index-D-B6EC3j.js";import"./usePopper-0wPWSdt6.js";import"./index-BOFl1R0b.js";import"./Portal-DGF67CzQ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DsFXR7AU.js";import"./IconCheckMark-BHFp-usV.js";import"./IconExclamationMarkCircle24-DMdBV0gH.js";import"./IconExclamationMarkTriangle-qVF5EOfJ.js";import"./IconExclamationMarkTriangle24-1PLxekLQ.js";import"./IconQuestionMarkCircle-DZCKWrTp.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTIN7Jfc.js";import"./Switch-dNob1Rjk.js";import"./TabItem-BFJPyz6m.js";import"./elements-BOYmskOL.js";import"./TextInput-CjCTWfrx.js";import"./IconCross-BWVlwyGb.js";import"./Tree-D1HFVKmr.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BLbKe9pf.js";import"./IconCaretDown-vTPsccpO.js";import"./IconCaretDown16-C1HVvLUj.js";import"./IconTrashBin16-8K3QGeIn.js";import"./IconTrashBin24-CUFBmwQa.js";import"./useButton-DpLox9tK.js";import"./useClickOutside-XBnvbXF2.js";import"./EnablePortalWrapper-qioJtyLy.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
