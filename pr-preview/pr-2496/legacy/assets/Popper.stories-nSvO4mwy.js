import{r as n,j as t}from"./iframe-DI3FmvMg.js";import{a as b}from"./Box-BzvOCXyp.js";import{B as h}from"./Button-81HPhAZq.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-D8RjORwC.js";import"./preload-helper-D2dEV7R8.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CCyWXpuB.js";import"./Checkbox-D44al-eW.js";import"./useFocusable-CDu369YP.js";import"./useFocusRing-DYIZffxr.js";import"./useEffectEvent-BH88ISlG.js";import"./chain-BslaglIs.js";import"./index-BM8UhHH_.js";import"./useFormValidationState-Cld0AnK4.js";import"./useControlledState-BiOOwxHx.js";import"./InputLabel-Cg4r-In2.js";import"./TooltipIcon-xRvsiuV-.js";import"./LegacyTooltip-_ICJCfzv.js";import"./useLink-UjFHOFNi.js";import"./usePopper--KY0_hMj.js";import"./index-CXZaHicV.js";import"./Portal-BFDMwOGS.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CkMIAu3W.js";import"./IconCheckMark-B7kLsSyY.js";import"./IconExclamationMarkCircle24-D4tF03zx.js";import"./IconExclamationMarkTriangle-DIy9MoLo.js";import"./IconExclamationMarkTriangle24-CEjgCUBS.js";import"./IconQuestionMarkCircle-DSdNDavw.js";import"./IconMinus-BVHXyRcm.js";import"./DialogBody-RgxVECr_.js";import"./dialog-D9O7a7Fm.js";import"./Dropdown-Dvj_d9Nt.js";import"./useButton-BbxjUP_K.js";import"./FocusScope-C1m5l3e0.js";import"./useOverlayTriggerState-DODiVQDU.js";import"./useMenuTrigger-ffLGp00v.js";import"./useLabels-BxWS0UcL.js";import"./useLocalizedStringFormatter--MnVfld8.js";import"./context-BqltTJBl.js";import"./VisuallyHidden-DIGLDGTy.js";import"./helper-Dmt6oJnd.js";import"./keyboard-DKrOuDO8.js";import"./SelectionManager-C4qB5YQ6.js";import"./useField-CXlZh9cC.js";import"./MenuItem-B3oQ8NBJ.js";import"./IconCaretRight-Cnjf463B.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-mnpTZaSB.js";import"./Trigger-DxWASr5H.js";import"./IconCaretDown-D8Q90axM.js";import"./IconCaretDown16-DnKeo0fq.js";import"./IconCross-zXwZw5XO.js";import"./IconTrashBin16-k6iK24Cb.js";import"./IconTrashBin24-CT3rUXQo.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CJRjb42v.js";import"./FormControl-5EUEioxo.js";import"./Switch-zWc6Snnf.js";import"./TabItem-CImVNYIL.js";import"./TextInput-CbSujYQZ.js";import"./Tree-4JOtMfCe.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-B67-0z1Q.js";const kt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=n.useState(!1),p=n.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:p,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:p,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
