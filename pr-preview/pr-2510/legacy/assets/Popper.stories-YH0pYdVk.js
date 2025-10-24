import{r as n,j as t}from"./iframe-n26UMXeS.js";import{a as b}from"./Box-CdWvo43I.js";import{B as h}from"./Button-RK0fJt2c.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Ca2P6eKM.js";import"./preload-helper-qBSLZfTS.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D40wT2pM.js";import"./Checkbox-DgsPUbUS.js";import"./useFocusable-CWl1t0Px.js";import"./useFocusRing-Dvm4_RjC.js";import"./useEffectEvent-BKR4RLzl.js";import"./chain-DHo8oKbw.js";import"./index-B6EMusBQ.js";import"./useFormValidationState-UAnenpkk.js";import"./useControlledState-Du5HGgPR.js";import"./InputLabel-BS6vm496.js";import"./TooltipIcon-7gRO3xpH.js";import"./LegacyTooltip-B-tp1j-L.js";import"./useLink-DHkrUdNL.js";import"./usePopper-8GJMFvmR.js";import"./index-Ciia9_eN.js";import"./Portal-DP4PWg_F.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DnQ55Zbt.js";import"./IconCheckMark-C9N2YhL0.js";import"./IconExclamationMarkCircle24-C0dnCopv.js";import"./IconExclamationMarkTriangle-kgpzAyyM.js";import"./IconExclamationMarkTriangle24-BN0lOkUr.js";import"./IconQuestionMarkCircle-kllRKVHJ.js";import"./IconMinus-rsdKZ6mT.js";import"./Divider-Ckbmz0M0.js";import"./Dropdown-C_BrfEr1.js";import"./useButton-gFYOqrhj.js";import"./FocusScope-C8Zpguh7.js";import"./useOverlayTriggerState-1nRvvjHV.js";import"./useMenuTrigger-C5MWsixQ.js";import"./useLabels-CgjEQM3v.js";import"./useLocalizedStringFormatter-DSxe_DtD.js";import"./context-B86w2jMQ.js";import"./VisuallyHidden-D2sE3s5e.js";import"./helper-BXkLw819.js";import"./keyboard-rkNmKttm.js";import"./SelectionManager-DJu1uagb.js";import"./useField-0_eqc5fb.js";import"./MenuItem-CBqSMKaJ.js";import"./IconCaretRight-mt3-aM0r.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DvvoBJ3B.js";import"./Trigger-V8qnOHf7.js";import"./IconCaretDown-DzJI7I0k.js";import"./IconCaretDown16-Caxt19fQ.js";import"./IconCross-ORFPx4BQ.js";import"./IconTrashBin16-BPI3V-e4.js";import"./IconTrashBin24-D-7w7tG2.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-PUTSjtV1.js";import"./FormControl-NisUf2Hi.js";import"./Switch-5ZwYZc90.js";import"./TabItem-D3g2R93v.js";import"./TextInput-DBepdhBg.js";import"./Tree-CivgNCAA.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-CjWbNyju.js";import"./dialog-D9O7a7Fm.js";const kt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=n.useState(!1),p=n.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:p,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:p,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const At=["Default","WithPortal"];export{o as Default,e as WithPortal,At as __namedExportsOrder,kt as default};
