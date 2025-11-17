import{r as s,j as e}from"./iframe-B6wMFBmr.js";import{a as b}from"./Box-N8_xKnJ-.js";import{B as h}from"./Button-BAqzJ5Pv.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BEmzkewf.js";import"./preload-helper-B3RP-zrM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-evml2QDQ.js";import"./Divider-BkQnAn1F.js";import"./FormControl-BerGKFeK.js";import"./InputLabel-QH3KoYmW.js";import"./TooltipIcon-W-6H6r9U.js";import"./LegacyTooltip-BCilkNdt.js";import"./useLink-DkTIgE5u.js";import"./useFocusable-k5y2-4wJ.js";import"./useFocusRing-CGF_IT6k.js";import"./useEffectEvent-CikN4lv1.js";import"./chain-DULsJ5c3.js";import"./index-BEaJUMGy.js";import"./usePopper-0MaFEurT.js";import"./index-8VFt0Zma.js";import"./Portal-nAgA0YlW.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DnKqk2fp.js";import"./IconCheckMark-DBwBkYZ5.js";import"./IconExclamationMarkCircle24-DoWZywMv.js";import"./IconExclamationMarkTriangle-BYVM_8KN.js";import"./IconExclamationMarkTriangle24-CQVhFF9W.js";import"./IconQuestionMarkCircle-I-XoRTAy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CGnUCcrv.js";import"./Switch-BLVO3_NP.js";import"./TabItem-rWyOgEJ4.js";import"./elements-BOYmskOL.js";import"./TextInput-tcJ9GSxD.js";import"./IconCross-YTa4RDxM.js";import"./Tree-C2Vrhmv9.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DD58yLyN.js";import"./useClickOutside-D09WEkaY.js";import"./EnablePortalWrapper-BhSC5jqe.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
