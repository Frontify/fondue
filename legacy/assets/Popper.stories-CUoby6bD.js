import{r as p,j as t}from"./iframe-Dkg06RjX.js";import{a as b}from"./Box-DJ_QB4qy.js";import{B as h}from"./Button-Ck3U3EnT.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-B4AmaOSr.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C9VEbcfm.js";import"./Checkbox-CDButxBc.js";import"./useFocusable-Dxaa7OPm.js";import"./useFocusRing-CEtI7pDJ.js";import"./useEffectEvent-KNqAjB1f.js";import"./chain-CgS8Uj0H.js";import"./index-CBpye4dH.js";import"./useFormValidationState-nmuzmEoy.js";import"./useControlledState-CPPx_1ny.js";import"./InputLabel-BEJ9owXS.js";import"./TooltipIcon-ZSWAEMEr.js";import"./LegacyTooltip-CNBxqgOu.js";import"./useLink-BiIAuQPL.js";import"./usePopper-BAL_8qLj.js";import"./index-CFlcmsyM.js";import"./Portal-D1nUMvyP.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BAlQ1vfb.js";import"./IconCheckMark-i1BAgGgA.js";import"./IconExclamationMarkCircle24-BJC0lc_m.js";import"./IconExclamationMarkTriangle-DXcgw6u2.js";import"./IconExclamationMarkTriangle24-Dn4iwSTT.js";import"./IconQuestionMarkCircle-Bb7y1LEg.js";import"./IconMinus-C-ho5-_Q.js";import"./Divider-BjOepDpQ.js";import"./FormControl-BkAQXhRL.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B-i1jWHW.js";import"./Switch-DcE0cref.js";import"./TabItem-Dz7rWhGx.js";import"./elements-BOYmskOL.js";import"./TextInput-jYI9A8oV.js";import"./IconCross-DiOEwTiI.js";import"./Tree-CV7W9H3_.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DW_2JkVx.js";import"./IconCaretDown-DOg4ihB9.js";import"./IconCaretDown16-ClPYJULt.js";import"./IconTrashBin16-DASFbRcE.js";import"./IconTrashBin24-omzGfmal.js";import"./useButton-DUilcnPW.js";import"./useClickOutside-B3jYYgtq.js";import"./EnablePortalWrapper-kTZGOFtg.js";import"./dialog-D9O7a7Fm.js";const xt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var s,i,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
