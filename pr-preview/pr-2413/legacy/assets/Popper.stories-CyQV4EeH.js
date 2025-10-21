import{r as p,j as t}from"./iframe-DFnutv5M.js";import{a as b}from"./Box-CCVc1H_1.js";import{B as h}from"./Button-DvPoOfB7.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Dfn4QrZ1.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BZ4Yt3Vy.js";import"./DialogBody-Dv0qt-3k.js";import"./dialog-D9O7a7Fm.js";import"./Divider-BnEqrrOk.js";import"./Dropdown-DoUsbxMd.js";import"./useButton-B9ck-Vwc.js";import"./useFocusable-C-JPn9OE.js";import"./useFocusRing-BZNNB2Hj.js";import"./useEffectEvent-DBbK-aqN.js";import"./chain-Dsa_W8ml.js";import"./index-a1h4e75G.js";import"./FocusScope-CzNHlT6r.js";import"./useOverlayTriggerState-BU83XqOv.js";import"./useControlledState-CO8iWZC6.js";import"./useMenuTrigger-NR-AZ6fL.js";import"./useLabels-BgJwTBe8.js";import"./useLocalizedStringFormatter-CI2DTdCM.js";import"./context-CMCPGXhG.js";import"./VisuallyHidden-CP5cAKcA.js";import"./helper-CDma-XAN.js";import"./keyboard-B9Pv78ZV.js";import"./SelectionManager-CSpmgRXH.js";import"./useField-DIDYlmQE.js";import"./useFormValidationState-C58z87tk.js";import"./usePopper-mGKvFZOV.js";import"./index-BvzBMR0H.js";import"./MenuItem-CCE2SmwD.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-Qf6FLOlU.js";import"./IconCheckMark-DIQLzXWs.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DdXCySpe.js";import"./Trigger-Bc1liQcc.js";import"./IconCaretDown-CntmYteF.js";import"./IconCaretDown16-DXJrcr77.js";import"./IconCross-DSLOUOUE.js";import"./IconExclamationMarkTriangle-Dk_iCro-.js";import"./IconExclamationMarkTriangle24-DXphiQNc.js";import"./IconTrashBin16-m420LrHr.js";import"./IconTrashBin24-DSRZEAzA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B4vmv_6a.js";import"./Portal-r1TzMWAQ.js";import"./useMemoizedId-BId1lVLh.js";import"./FormControl-3LdqEtgD.js";import"./InputLabel-B_1U839I.js";import"./TooltipIcon-BRLLXESC.js";import"./LegacyTooltip-gb8qWYaE.js";import"./useLink-B28rYbuM.js";import"./IconExclamationMarkCircle24-Uarnc71I.js";import"./IconQuestionMarkCircle-DXpZoFVo.js";import"./Switch-DVVv0LyY.js";import"./TabItem-BVGGwMV_.js";import"./TextInput-BmJc5mOX.js";import"./Tree-7KbZYas7.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-Cy27KqaZ.js";const Ht={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const kt=["Default","WithPortal"];export{o as Default,e as WithPortal,kt as __namedExportsOrder,Ht as default};
