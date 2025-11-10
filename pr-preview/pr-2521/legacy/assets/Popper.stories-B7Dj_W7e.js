import{r as p,j as t}from"./iframe-BM7ef9cd.js";import{a as b}from"./Box-BDI0AoIe.js";import{B as h}from"./Button-D3BlpDGO.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BetQNmeG.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CM7GoLG0.js";import"./Divider-DLXoYDJG.js";import"./Dropdown-BX4meYN2.js";import"./useButton-BVtexVRf.js";import"./useFocusable-BE1kPMio.js";import"./useFocusRing-BEC2owvQ.js";import"./useEffectEvent-BC_1uHyR.js";import"./chain-alM-wSYL.js";import"./index-CqMzEB5i.js";import"./FocusScope-DL7-Bqqi.js";import"./useOverlayTriggerState-CZotgndy.js";import"./useControlledState-CHhpUkp0.js";import"./useMenuTrigger-BXCREVSp.js";import"./useLabels-Ds2PpTN7.js";import"./useLocalizedStringFormatter-69TNCH83.js";import"./context-1U3mNMRV.js";import"./VisuallyHidden-CDwv4QbC.js";import"./helper-jHS2d2qQ.js";import"./keyboard-my2f-9FG.js";import"./SelectionManager-GTUli88q.js";import"./useField-ByUvNGor.js";import"./useFormValidationState-DzXeuUB0.js";import"./usePopper-DnQbG6Dm.js";import"./index-DvD3x05a.js";import"./MenuItem-D8DU1p7f.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-B9n7WX4x.js";import"./IconCheckMark-CIHN93e5.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CAeqqZJ1.js";import"./Trigger-ByGBqbrp.js";import"./IconCaretDown-BxZaxq_6.js";import"./IconCaretDown16-DildURkb.js";import"./IconCross-DbmORowV.js";import"./IconExclamationMarkTriangle-CGKXM6PS.js";import"./IconExclamationMarkTriangle24-Dc_rwIH6.js";import"./IconTrashBin16-DY1V43zp.js";import"./IconTrashBin24-Ci6kQii_.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BrP4X50G.js";import"./Portal-Cc6MwqwZ.js";import"./useMemoizedId-B6KdJLbo.js";import"./FormControl-YhBUG1d9.js";import"./InputLabel-g6I3etEJ.js";import"./TooltipIcon-CpaG5WEB.js";import"./LegacyTooltip-DwWPrLpM.js";import"./useLink-Bc9Xufj0.js";import"./IconExclamationMarkCircle24-CmndOdXf.js";import"./IconQuestionMarkCircle-D_64i_0i.js";import"./Switch-kFbq1dH3.js";import"./TabItem-C-Spro5Q.js";import"./TextInput-BGEzNyCQ.js";import"./Tree-HpA7bznW.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DvjhYIr4.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
