import{r as p,j as t}from"./iframe-CjtBbWFy.js";import{a as b}from"./Box-BNkz-oee.js";import{B as h}from"./Button-CnwsL3Ro.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BxbW-1EZ.js";import"./preload-helper-OKB6Z3Tn.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ba0Bf5HV.js";import"./Checkbox-BpSnOp8M.js";import"./useFocusable-B1riX0q_.js";import"./useFocusRing-DKH8TC1y.js";import"./useEffectEvent-Bvk3GHSi.js";import"./chain-CJ40OBqG.js";import"./index-D3QZuRsF.js";import"./useFormValidationState-B82DO5rQ.js";import"./useControlledState-DFUyN-u3.js";import"./InputLabel-1H4PKH4V.js";import"./TooltipIcon-CdgnbPJi.js";import"./LegacyTooltip-CECqrk99.js";import"./useLink-D81xicVU.js";import"./usePopper-DOYFNROV.js";import"./index-CW_2kq9w.js";import"./Portal-Ctlgj8Ml.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BEZTnksE.js";import"./IconCheckMark-D8JZM9L-.js";import"./IconExclamationMarkCircle24-BT7Ql3K_.js";import"./IconExclamationMarkTriangle-s_f3UMNv.js";import"./IconExclamationMarkTriangle24-BDYPAIuO.js";import"./IconQuestionMarkCircle-C1Ad-WKL.js";import"./IconMinus-CcF99uwO.js";import"./Divider-BdjnAWXd.js";import"./FormControl-Bq4xFB8E.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Cp7aQDJ_.js";import"./Switch-CBp_d0nm.js";import"./TabItem-BS9-1NTO.js";import"./elements-BOYmskOL.js";import"./TextInput-DT25f2Ql.js";import"./IconCross-RT0uymvJ.js";import"./Tree-C-XNFFHl.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DcmUr2NY.js";import"./IconCaretDown-PCmiz6X9.js";import"./IconCaretDown16-C7c3SGqO.js";import"./IconTrashBin16-DW8Ffu5a.js";import"./IconTrashBin24-CaWVM4gw.js";import"./useButton-D1ZYnjYr.js";import"./useClickOutside-CCoMfOuc.js";import"./EnablePortalWrapper-DV8bmMCs.js";import"./dialog-D9O7a7Fm.js";const xt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var s,i,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Pt=["Default","WithPortal"];export{o as Default,e as WithPortal,Pt as __namedExportsOrder,xt as default};
