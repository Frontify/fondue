import{r as p,j as t}from"./iframe-Byq4RgVa.js";import{a as b}from"./Box-Cw0zQjzG.js";import{B as h}from"./Button-BIzAMqFG.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Dv9NXgiv.js";import"./preload-helper-DXpIkoC8.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BGtg1dMb.js";import"./Checkbox-B-n8zZ-S.js";import"./useFocusable-CEz2cnMa.js";import"./useFocusRing-1VzCYPXM.js";import"./useEffectEvent-CQqcouob.js";import"./chain-NL_CYzOj.js";import"./index-CTq3ycsr.js";import"./useFormValidationState-Dv2uWviW.js";import"./useControlledState-BlIu1hRZ.js";import"./InputLabel-CrIA_ZUr.js";import"./TooltipIcon-CqfIsxQ1.js";import"./LegacyTooltip-BPixO4E9.js";import"./useLink-CB5zyTe8.js";import"./usePopper-UMr1qiz5.js";import"./index-DZVnwIzI.js";import"./Portal-Cs3GVWse.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DwOUk7Ve.js";import"./IconCheckMark-BTbz00I9.js";import"./IconExclamationMarkCircle24-ffcPYjGw.js";import"./IconExclamationMarkTriangle-D_-jLFh-.js";import"./IconExclamationMarkTriangle24-D32Lmmh1.js";import"./IconQuestionMarkCircle-BUN0gvmv.js";import"./IconMinus-DHtgKNf5.js";import"./Divider-DE8fBejH.js";import"./FormControl-Giah9BCH.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C279Nnsi.js";import"./Switch-ns2yYJAp.js";import"./TabItem-BG0dI_Ab.js";import"./elements-BOYmskOL.js";import"./TextInput-ChxiREjX.js";import"./IconCross-D0b98GpB.js";import"./Tree-NI69QXvD.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CTv9pbma.js";import"./useClickOutside-CXetdB8E.js";import"./EnablePortalWrapper-DXU3Bq8F.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const wt=["Default","WithPortal"];export{e as Default,o as WithPortal,wt as __namedExportsOrder,ft as default};
