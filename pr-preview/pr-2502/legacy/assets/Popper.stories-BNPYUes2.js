import{r as p,j as t}from"./iframe-CfLhI7P0.js";import{a as b}from"./Box-C_ryCKA4.js";import{B as h}from"./Button-BoqHsuHZ.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BcZ9yLZa.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BglkpoJb.js";import"./Divider-Ks3wbiQC.js";import"./Dropdown-CVUPTM-k.js";import"./useButton-CafHKOqV.js";import"./useFocusable-DqnO4tDK.js";import"./useFocusRing-c6u9Vcjk.js";import"./useEffectEvent-DgjNhOdj.js";import"./chain-C2bpwpa8.js";import"./index-CNTxu6fp.js";import"./FocusScope-Ci5ycIsU.js";import"./useOverlayTriggerState-CFYEaNmX.js";import"./useControlledState-CikZhwQf.js";import"./useMenuTrigger-Ddxx7kXJ.js";import"./useLabels-C5VNH8gT.js";import"./useLocalizedStringFormatter-BY0SNe9w.js";import"./context-CFy5Jnbr.js";import"./VisuallyHidden-BrtBoVFd.js";import"./helper-D-lWvwnP.js";import"./keyboard-BcVSFiEu.js";import"./SelectionManager-B5h8l_Gt.js";import"./useField-pWbNefD1.js";import"./useFormValidationState-Dii868hQ.js";import"./usePopper-BDJCEm0e.js";import"./index-BXHlWwjT.js";import"./MenuItem-CDWDwpry.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BbFToOJp.js";import"./IconCheckMark-Bvx1Okuv.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DTujLDLf.js";import"./Trigger-P2NWPnIL.js";import"./IconCaretDown-ip8hOLG9.js";import"./IconCaretDown16-0kUT5ueY.js";import"./IconCross-VvQFK0HB.js";import"./IconExclamationMarkTriangle-DumzWRNf.js";import"./IconExclamationMarkTriangle24-BQCI9tlF.js";import"./IconTrashBin16-Vihvm3Ba.js";import"./IconTrashBin24-Do203-AB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BAwlIUsk.js";import"./Portal-Bzui0qVf.js";import"./useMemoizedId-DO6EWKyA.js";import"./FormControl-2ECwXhan.js";import"./InputLabel-x_7jnmE7.js";import"./TooltipIcon-Dzp2Dow-.js";import"./LegacyTooltip-69ja691T.js";import"./useLink-tlq5fiSd.js";import"./IconExclamationMarkCircle24-BD4txlzy.js";import"./IconQuestionMarkCircle-CWL1qffP.js";import"./Switch-D28II4BQ.js";import"./TabItem-CchQBcbM.js";import"./TextInput-CSebAqb7.js";import"./Tree-6av9Ag9R.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-eWoCMSRP.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
