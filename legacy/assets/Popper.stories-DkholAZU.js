import{r as s,j as e}from"./iframe--Jwmn5D-.js";import{a as b}from"./Box-Et_4T-SY.js";import{B as h}from"./Button-C1Y_tYwc.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CNf4xB7a.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-oxA4BEID.js";import"./Divider-D2ZnFssU.js";import"./FormControl-C-LQRfxU.js";import"./InputLabel-B79pAkr5.js";import"./TooltipIcon-CRhFNSLa.js";import"./LegacyTooltip-ByQFAeaJ.js";import"./useLink-CohimIAD.js";import"./useFocusable-Cu085tWC.js";import"./useFocusRing-DwBzFpku.js";import"./useEffectEvent-Bym9W6jw.js";import"./chain-BPJgKXju.js";import"./index-OQaAeiiY.js";import"./usePopper-ByvW9noJ.js";import"./index--8-NLEZe.js";import"./Portal-CjvBd1X7.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BF4Nox5M.js";import"./IconCheckMark-CgkR-PYF.js";import"./IconExclamationMarkCircle24-BFh5bYkz.js";import"./IconExclamationMarkTriangle-k8ETbr_u.js";import"./IconExclamationMarkTriangle24-fvtOH1dG.js";import"./IconQuestionMarkCircle-BQ4XNqE1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-mzVZJmok.js";import"./Switch-BUIowyLA.js";import"./TabItem-BgzUtCyF.js";import"./elements-BOYmskOL.js";import"./TextInput-bTNnAIWW.js";import"./IconCross-BlzaGa9v.js";import"./Tree-C3YIS7GP.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DNEBB71r.js";import"./useClickOutside-BzEiWd5g.js";import"./EnablePortalWrapper-D4_K_OrF.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
