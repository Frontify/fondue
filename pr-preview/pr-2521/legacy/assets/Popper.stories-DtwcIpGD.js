import{r as p,j as t}from"./iframe-VY73Ap13.js";import{a as b}from"./Box-CLLqKugf.js";import{B as h}from"./Button-DELFvd4r.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BX0UDRlx.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-NhFKuIuf.js";import"./Divider-BcAAUxfh.js";import"./FormControl-jg1nLEKB.js";import"./InputLabel-BPpbNn23.js";import"./TooltipIcon-CQs5rkSB.js";import"./LegacyTooltip-XNI--7kK.js";import"./useLink-D6w5pNvA.js";import"./useFocusable-DGcHobBC.js";import"./useFocusRing-FYXzC7oH.js";import"./useEffectEvent-B9Wa_Khk.js";import"./chain-BpCjk0xr.js";import"./index-D4GOJQ2j.js";import"./usePopper-D6_OusyC.js";import"./index-DftGEHB6.js";import"./Portal-CdDr4tzA.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BDfUaXHh.js";import"./IconCheckMark-81szwvvv.js";import"./IconExclamationMarkCircle24-BlMDUN5A.js";import"./IconExclamationMarkTriangle-DhUkGljA.js";import"./IconExclamationMarkTriangle24-B9YH9o9Q.js";import"./IconQuestionMarkCircle-De1xUr8F.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BF7iQc4k.js";import"./Switch-Gi54ffVI.js";import"./TabItem-BRHV03C5.js";import"./elements-BOYmskOL.js";import"./TextInput-DkYLuvbX.js";import"./IconCross-UphrbeRF.js";import"./Tree-CT3mRs9P.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-t59T1mpS.js";import"./IconCaretDown-B-lBqeTo.js";import"./IconCaretDown16-BdTk2Dp5.js";import"./IconTrashBin16-ShLh3Fnh.js";import"./IconTrashBin24-IJdl3A2U.js";import"./useButton-CpPLXiL6.js";import"./useClickOutside-DGbKMmNc.js";import"./EnablePortalWrapper-Cd9JJ5gy.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
