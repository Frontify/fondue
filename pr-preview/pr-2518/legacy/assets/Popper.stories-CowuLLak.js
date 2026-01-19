import{r as p,j as t}from"./iframe-B-q0oBkh.js";import{a as b}from"./Box-B6ajFjst.js";import{B as h}from"./Button-CUXzs74B.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BT28b76C.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DgPHAQnb.js";import"./Divider-BtOd8K_b.js";import"./Dropdown-BnI_HdVs.js";import"./useButton-BxNNoRoc.js";import"./useFocusable-BSpUZ_4G.js";import"./useFocusRing-5Z9WpVa3.js";import"./useEffectEvent-BzoPRF65.js";import"./chain-DMsQz2xd.js";import"./index-Dq2UqDDK.js";import"./FocusScope-N6yYRQs6.js";import"./useOverlayTriggerState-Cj-slszd.js";import"./useControlledState-oDvNyEHo.js";import"./useMenuTrigger-DJ9wrAQH.js";import"./useLabels-SPzgNaaN.js";import"./useLocalizedStringFormatter-CvzFr93-.js";import"./context-Cyo6w6Hx.js";import"./VisuallyHidden-DyaYdif_.js";import"./helper-BteyX24t.js";import"./keyboard-DEe2GdBR.js";import"./SelectionManager-w8TbAxAj.js";import"./useField-C7G_IfVM.js";import"./useFormValidationState-Drc9lQjx.js";import"./usePopper-B8sjEdfE.js";import"./index-DQ2RiE9g.js";import"./MenuItem-BMhUsSxl.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BctmRMa6.js";import"./IconCheckMark-DciqofqL.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DYERqMAJ.js";import"./Trigger-CRpyFe7s.js";import"./IconCaretDown-FBs0m0xB.js";import"./IconCaretDown16-bCd7KRJs.js";import"./IconCross-BiMLgWR5.js";import"./IconExclamationMarkTriangle-HKCYNKsD.js";import"./IconExclamationMarkTriangle24-B5pptuGe.js";import"./IconTrashBin16-Ben3ypPa.js";import"./IconTrashBin24-DxVvTmi_.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-aXafSB7H.js";import"./Portal-Cv8KVjcJ.js";import"./useMemoizedId-CFv7aZ-I.js";import"./FormControl-EVd0GMXM.js";import"./InputLabel-Ds6m3OQf.js";import"./TooltipIcon-znRkNOWf.js";import"./LegacyTooltip-GsuFHRhK.js";import"./useLink-Bqpar8Vm.js";import"./IconExclamationMarkCircle24-C4zkAZtx.js";import"./IconQuestionMarkCircle-B2xB2obw.js";import"./Switch-qImyrjyA.js";import"./TabItem-B_l3Iv6U.js";import"./TextInput-N29rlDxa.js";import"./Tree-IOl0-CIB.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-B3144WjB.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
