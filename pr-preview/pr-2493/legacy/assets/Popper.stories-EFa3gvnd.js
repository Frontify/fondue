import{r as p,j as t}from"./iframe-CKSe3Fqe.js";import{a as b}from"./Box-DEPf0Ngh.js";import{B as h}from"./Button-BbgN8YT0.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CdUOKI5_.js";import"./preload-helper-h55SgzPI.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input--uFCJWpf.js";import"./Divider-Bv6Jm9W8.js";import"./Dropdown-RYEb7gr6.js";import"./useButton-DgyyYZg2.js";import"./useFocusable-DQCP7yek.js";import"./useFocusRing-BQoRK99m.js";import"./useEffectEvent-CiRKx17B.js";import"./chain-Dd3df6pO.js";import"./index-BPMpVAZo.js";import"./FocusScope-g4nBy1T5.js";import"./useOverlayTriggerState-BXRdEGhS.js";import"./useControlledState-DdOe7TCg.js";import"./useMenuTrigger-BBANgVXr.js";import"./useLabels-n-CMa9-N.js";import"./useLocalizedStringFormatter-BfOcmrtd.js";import"./context-DS6XwCl4.js";import"./VisuallyHidden-C-0myvF4.js";import"./helper-DhyHdWO2.js";import"./keyboard-fgHsnZ5J.js";import"./SelectionManager-3hucHCSe.js";import"./useField-BHFNPV93.js";import"./useFormValidationState-Tubgfymy.js";import"./usePopper-AUSlNj6G.js";import"./index-DAN2AmUJ.js";import"./MenuItem-BL5l2ryH.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BTLUY8GD.js";import"./IconCheckMark-DAilidFq.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CtM1sAez.js";import"./Trigger-CdwHkVGq.js";import"./IconCaretDown-CYM-4S_c.js";import"./IconCaretDown16-Cq0_e1LD.js";import"./IconCross-BMzgP3k8.js";import"./IconExclamationMarkTriangle-DkY8FJQ1.js";import"./IconExclamationMarkTriangle24-DqG8_uUA.js";import"./IconTrashBin16-BwyJnQhs.js";import"./IconTrashBin24-Cg69eDvd.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DBduxGiL.js";import"./Portal-D2beUhEQ.js";import"./useMemoizedId-CzKriQUz.js";import"./FormControl-XCmk-78w.js";import"./InputLabel-3X3wCC3G.js";import"./TooltipIcon-LYoTL7qa.js";import"./LegacyTooltip-DDj7Pmgz.js";import"./useLink-NIXYB2di.js";import"./IconExclamationMarkCircle24-BW3Bxg0w.js";import"./IconQuestionMarkCircle-C8cYJKKB.js";import"./Switch-C2N6EkkU.js";import"./TabItem-Cv_3JCop.js";import"./TextInput-Dz8QchSO.js";import"./Tree-BrjqE8_n.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-Q_ZO0Q94.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Ht=["Default","WithPortal"];export{o as Default,e as WithPortal,Ht as __namedExportsOrder,_t as default};
