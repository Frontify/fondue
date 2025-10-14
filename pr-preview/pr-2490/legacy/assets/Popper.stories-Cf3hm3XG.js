import{r as s,j as e}from"./iframe-_CJuXu84.js";import{a as b}from"./Box-Btn5dmVU.js";import{B as h}from"./Button-B2N9PeXV.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Dp7KCxV3.js";import"./preload-helper-ClJkntjM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DuHqVB_O.js";import"./Divider-DbMgtLdb.js";import"./FormControl-zWLLlcHY.js";import"./InputLabel-84cjDhyb.js";import"./TooltipIcon-BAlMvzYR.js";import"./LegacyTooltip-DlM5kaLF.js";import"./useLink-B9611AG5.js";import"./useFocusable-DH91yOpf.js";import"./useFocusRing-fCx02c8I.js";import"./useEffectEvent-DuN0fnSL.js";import"./chain-CQyqI67U.js";import"./index-CdDhSHAY.js";import"./usePopper-DIXRjTn1.js";import"./index-CUOUo0of.js";import"./Portal-DtA00T2z.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CnDE8Hpj.js";import"./IconCheckMark-Comm9FN-.js";import"./IconExclamationMarkCircle24-DzZStVMM.js";import"./IconExclamationMarkTriangle-L3kp_5MP.js";import"./IconExclamationMarkTriangle24-Bal_ANY7.js";import"./IconQuestionMarkCircle-B_fN6JdD.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B2ymvYHm.js";import"./Switch-DCta7Wdg.js";import"./TabItem-B2mMHkxH.js";import"./elements-BOYmskOL.js";import"./TextInput-BNCNYxRp.js";import"./IconCross-DkPhWRI6.js";import"./Tree-B0WGJo-9.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BunVikec.js";import"./useClickOutside-7CVsvZOS.js";import"./EnablePortalWrapper-Bgr-lnxn.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,l,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const me=["Default","WithPortal"];export{t as Default,o as WithPortal,me as __namedExportsOrder,le as default};
