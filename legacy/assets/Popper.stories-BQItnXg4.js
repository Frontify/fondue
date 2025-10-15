import{r as s,j as e}from"./iframe-3oRiCOMA.js";import{a as b}from"./Box-Wa1UQ0kp.js";import{B as h}from"./Button-tdRQVd-X.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BmPQFROf.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D35Y1tmr.js";import"./Divider-Cnt1kd6B.js";import"./FormControl-D5ROYw35.js";import"./InputLabel-3kkok3gm.js";import"./TooltipIcon-omkkg6r0.js";import"./LegacyTooltip-EwG9IAuw.js";import"./useLink-CbszE7S7.js";import"./useFocusable-Bi7WFdCU.js";import"./useFocusRing-B4Z8FlBA.js";import"./useEffectEvent-1oya5x99.js";import"./chain-CYmkXS4K.js";import"./index-De9cKHpm.js";import"./usePopper-BXvVajWh.js";import"./index-BUsYKrk-.js";import"./Portal-4490uK6y.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CEssXdIF.js";import"./IconCheckMark-B5_KFKnC.js";import"./IconExclamationMarkCircle24-DWw8SKlA.js";import"./IconExclamationMarkTriangle-V3TN4WUG.js";import"./IconExclamationMarkTriangle24-DlSHM1ML.js";import"./IconQuestionMarkCircle-BboJpMia.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-sfA4f1QE.js";import"./Switch-lhnOq77z.js";import"./TabItem-1GwxOQva.js";import"./elements-BOYmskOL.js";import"./TextInput-ryaHYkqR.js";import"./IconCross-xF-pgupn.js";import"./Tree-D1HDb2zV.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-C27_pHVF.js";import"./useClickOutside-BGEBPv8D.js";import"./EnablePortalWrapper-BG-bQ8ru.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
