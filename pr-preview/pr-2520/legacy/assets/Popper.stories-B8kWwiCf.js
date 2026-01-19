import{r as p,j as t}from"./iframe-DWv2_3F3.js";import{a as b}from"./Box-DZV4Rol0.js";import{B as h}from"./Button-3b6YjLG-.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DeBt6Am5.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DOHXhmdp.js";import"./Divider-CJHNe1Lx.js";import"./FormControl-DPSEspuo.js";import"./InputLabel-BpbBpTEJ.js";import"./TooltipIcon-BWW4VUwK.js";import"./LegacyTooltip-Bkj0Y90d.js";import"./useLink-xo2YEpBC.js";import"./useFocusable-qSwycdkT.js";import"./useFocusRing-C16v0dJv.js";import"./useEffectEvent-juQ_2xsn.js";import"./chain-DnIzMUek.js";import"./index-CLQYMQ4B.js";import"./usePopper-DLcHPtMx.js";import"./index-DHnyPWvB.js";import"./Portal-BV8sDH92.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BszDH4v2.js";import"./IconCheckMark-BP-kTSCX.js";import"./IconExclamationMarkCircle24-BFKPQHIe.js";import"./IconExclamationMarkTriangle-DLLktyep.js";import"./IconExclamationMarkTriangle24-N_dmScL6.js";import"./IconQuestionMarkCircle-liTEEGY2.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DXJsvyyy.js";import"./Switch-DPVCwgoR.js";import"./TabItem-DswxiGFz.js";import"./elements-BOYmskOL.js";import"./TextInput-BwolyqU0.js";import"./IconCross-CMrthrPn.js";import"./Tree-D-vkmlIL.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BEkDJK5J.js";import"./IconCaretDown-BseuEDR4.js";import"./IconCaretDown16-CmK_73p0.js";import"./IconTrashBin16-Dn2w5CcX.js";import"./IconTrashBin24-v2Dg-pXu.js";import"./useButton-C7s8up6S.js";import"./useClickOutside-DJjP4yWs.js";import"./EnablePortalWrapper-ZVyNR658.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
