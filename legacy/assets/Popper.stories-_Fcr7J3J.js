import{r as p,j as t}from"./iframe-C5kgyqgm.js";import{a as b}from"./Box-1a6ixdwV.js";import{B as h}from"./Button-BDbLV5Rr.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CTIHCn7L.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cq3eqICY.js";import"./Checkbox-BIDcMQG6.js";import"./useFocusable-Ceb7Je-e.js";import"./useFocusRing-cjJ4V1tO.js";import"./useEffectEvent-BBQGPd_M.js";import"./chain-CCiNAOP-.js";import"./index-2KbGipOq.js";import"./useFormValidationState-OtNK8O4n.js";import"./useControlledState-C5Nbv06b.js";import"./InputLabel-Dk1dNGCp.js";import"./TooltipIcon-DnNJk431.js";import"./LegacyTooltip-kdidwXGR.js";import"./useLink-y0X30T0O.js";import"./usePopper-CuiR7VCC.js";import"./index-Cp1gGYWC.js";import"./Portal-GwTjoSVN.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DS2WT1er.js";import"./IconCheckMark-DzG8aki9.js";import"./IconExclamationMarkCircle24-Wq4nzIzR.js";import"./IconExclamationMarkTriangle-D4zOyiMZ.js";import"./IconExclamationMarkTriangle24-BmoIfTD5.js";import"./IconQuestionMarkCircle-Bm1-LFoH.js";import"./IconMinus-CWQAyzXk.js";import"./Divider-DyB_gL0k.js";import"./FormControl-B_A1qvx2.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BWjfZ81p.js";import"./Switch-CXVar6Mo.js";import"./TabItem-DpygmHk_.js";import"./elements-BOYmskOL.js";import"./TextInput-CVlLNH_J.js";import"./IconCross-xebiYYLi.js";import"./Tree-CBwj0P3O.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-bdege3iH.js";import"./useClickOutside-B4v_gZoL.js";import"./EnablePortalWrapper-B3Tmz2tf.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
