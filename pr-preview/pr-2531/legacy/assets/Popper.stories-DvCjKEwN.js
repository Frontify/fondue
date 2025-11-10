import{r as p,j as t}from"./iframe-B5CPGWPV.js";import{a as b}from"./Box-CQAU9N4z.js";import{B as h}from"./Button-D9e2ti0d.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DjjyqhJy.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-cq8f4pEG.js";import"./DialogBody-jxTvKrbr.js";import"./dialog-D9O7a7Fm.js";import"./Divider-nZeqTEwz.js";import"./Dropdown-DiOy8JCl.js";import"./useButton-Ci7kylBN.js";import"./useFocusable-CuG_iUuX.js";import"./useFocusRing-BOq44Q-m.js";import"./useEffectEvent-kj_h4LSq.js";import"./chain-DAzikNNz.js";import"./index-Db4W4yDE.js";import"./FocusScope-rI0yNBIy.js";import"./useOverlayTriggerState-CEKKvGLL.js";import"./useControlledState-CFbRCBAY.js";import"./useMenuTrigger-mcc-gx96.js";import"./useLabels-C5ytOvhJ.js";import"./useLocalizedStringFormatter-CYCob2hJ.js";import"./context-BN_JJ6zS.js";import"./VisuallyHidden-C5e-jIao.js";import"./helper-C7N_jdHD.js";import"./keyboard-By140AL5.js";import"./SelectionManager-BVFt38kS.js";import"./useField-iDswpurd.js";import"./useFormValidationState-CNTCwyf2.js";import"./usePopper-DlxsfNzH.js";import"./index-kPdPfUUG.js";import"./MenuItem-N5vG-vp8.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-B_cPjHKU.js";import"./IconCheckMark-BjpJQgeF.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-5aGkx1.js";import"./Trigger-whnxlm3W.js";import"./IconCaretDown-DDnEckGI.js";import"./IconCaretDown16-DwG1LP-s.js";import"./IconCross-a0tvDMLS.js";import"./IconExclamationMarkTriangle--za27hm8.js";import"./IconExclamationMarkTriangle24-BPBU2M1F.js";import"./IconTrashBin16-Bftj6ugn.js";import"./IconTrashBin24-uINMAR_a.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DYKNKpOU.js";import"./Portal-B5vFmI2x.js";import"./useMemoizedId-DWAnoWyi.js";import"./FormControl-DAxuNMHE.js";import"./InputLabel-hKtnQhwW.js";import"./TooltipIcon-CIvg4Gbm.js";import"./LegacyTooltip-BmxFSbs9.js";import"./useLink-CLnF-Dfj.js";import"./IconExclamationMarkCircle24-BeTFDUAL.js";import"./IconQuestionMarkCircle-80bszdCz.js";import"./Switch-DgCW3xLv.js";import"./TabItem-DS5zdxt9.js";import"./TextInput-COvL5FkF.js";import"./Tree-Ur0I-Lwp.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BhD2j9dG.js";const Ht={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
