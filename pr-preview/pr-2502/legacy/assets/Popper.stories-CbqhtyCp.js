import{r as p,j as t}from"./iframe-BGj-8Xma.js";import{a as b}from"./Box-rFpTOAWV.js";import{B as h}from"./Button-2EBAcOH_.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-xyMgGgtK.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-6fJOqJc6.js";import"./Checkbox-BT7HOUQJ.js";import"./useFocusable-CknK0IHp.js";import"./useFocusRing-BlnI74c6.js";import"./useEffectEvent-BlEEx4Xd.js";import"./chain-DZoKwBUY.js";import"./index-oNtiiR1K.js";import"./useFormValidationState-CPkBu0Ip.js";import"./useControlledState-CA2ybZHV.js";import"./InputLabel-DaO4kGGP.js";import"./TooltipIcon-C3ABrqlZ.js";import"./LegacyTooltip-D-bnhDRE.js";import"./useLink-By44ZSEz.js";import"./usePopper-DX_Dz00k.js";import"./index-DWLevnU7.js";import"./Portal-9RvB8Aeb.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-HkVr2jVB.js";import"./IconCheckMark-BK0eBuyp.js";import"./IconExclamationMarkCircle24-CmLDFqXY.js";import"./IconExclamationMarkTriangle-9V-82lwc.js";import"./IconExclamationMarkTriangle24-Bicc5sn3.js";import"./IconQuestionMarkCircle-BnLlupnH.js";import"./IconMinus-DmbVwJ6A.js";import"./Divider-BKN-_n9g.js";import"./FormControl-CEC5cEV9.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DWqC4m4-.js";import"./Switch-9jQk0BCQ.js";import"./TabItem-wrPqGICp.js";import"./elements-BOYmskOL.js";import"./TextInput-BWVdQNSI.js";import"./IconCross-CsEYSGLl.js";import"./Tree-D8KeUrWE.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DphR1AkN.js";import"./useClickOutside-BhSGy6O3.js";import"./EnablePortalWrapper-BITyhYfm.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
