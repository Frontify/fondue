import{r as p,j as t}from"./iframe-BqgOTfwa.js";import{a as b}from"./Box-BDWMTTN4.js";import{B as h}from"./Button-BE7kNGjk.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-C17Dgr0A.js";import"./preload-helper-r7mqpNn-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CRNl3O04.js";import"./Checkbox-Bn_tbAZe.js";import"./useFocusable-D_4hoYqL.js";import"./useFocusRing-BweZAzx4.js";import"./useEffectEvent-B4X5HiKo.js";import"./chain-HAlYixg1.js";import"./index-CgrGmFqi.js";import"./useFormValidationState-GvX1cGDD.js";import"./useControlledState-BmMT9pIN.js";import"./InputLabel-CCR5wAUJ.js";import"./TooltipIcon-BCy_DpZQ.js";import"./LegacyTooltip-DGO3TtJt.js";import"./useLink-BejGtILL.js";import"./usePopper-DiPlZxVo.js";import"./index-BejIcTrN.js";import"./Portal-7bvFvlVR.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DSuw5pzl.js";import"./IconCheckMark-SXJwau5u.js";import"./IconExclamationMarkCircle24-C3Etd_Ph.js";import"./IconExclamationMarkTriangle-B4aOvOZA.js";import"./IconExclamationMarkTriangle24-C4r90FB-.js";import"./IconQuestionMarkCircle-BwHtgLG2.js";import"./IconMinus-DZ7Ym5FW.js";import"./Divider-ou8Ao54H.js";import"./FormControl-Cv6gSYRT.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CHfWx2NW.js";import"./Switch-Ctc9Ldob.js";import"./TabItem-CDoIZtFM.js";import"./elements-BOYmskOL.js";import"./TextInput-D2KMctZF.js";import"./IconCross-LmDg0cVc.js";import"./Tree-B03gbqXm.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BpBUB3rp.js";import"./useClickOutside-CKB_0vJi.js";import"./EnablePortalWrapper-DgaBvMrd.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
