import{r as p,j as t}from"./iframe-BYgk9eGi.js";import{a as b}from"./Box-CHcpe9rj.js";import{B as h}from"./Button-BFRQ7uMU.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BymIuUo6.js";import"./preload-helper-C4wRLVzE.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CHp1aGuG.js";import"./Divider-t83pYnJu.js";import"./Dropdown-55K6xzNt.js";import"./useButton-aMrX7lQB.js";import"./useFocusable-DWkWAuuj.js";import"./useFocusRing-B9FX5t9d.js";import"./useEffectEvent-C0BQ6d8E.js";import"./chain-DewOEu23.js";import"./index-JL1iOob4.js";import"./FocusScope-CLV--g8F.js";import"./useOverlayTriggerState-B1KvkfS4.js";import"./useControlledState-WuYbSOBR.js";import"./useMenuTrigger-DtAliMr4.js";import"./useLabels-DNjgnGlH.js";import"./useLocalizedStringFormatter-D3YJL1Sl.js";import"./context-DhZg-eiB.js";import"./VisuallyHidden-Cxyhrmyz.js";import"./helper-DwPYLC8Q.js";import"./keyboard-DUIElv65.js";import"./SelectionManager-ihQjKTL6.js";import"./useField-tEdRTGkN.js";import"./useFormValidationState-CCcBhnXp.js";import"./usePopper-Bjy0ueTZ.js";import"./index-DF7w3mCS.js";import"./MenuItem-DsRkCZfU.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-ZPWSrGDF.js";import"./IconCheckMark-C86ecLPI.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DFHIC5me.js";import"./Trigger-CXI_k5eO.js";import"./IconCaretDown-DJft5W7d.js";import"./IconCaretDown16-DFWIPfbf.js";import"./IconCross-CHQ9kAFF.js";import"./IconExclamationMarkTriangle-BZIhdvAU.js";import"./IconExclamationMarkTriangle24-orZPE0b5.js";import"./IconTrashBin16-DKWtSmRV.js";import"./IconTrashBin24-C-V8KFup.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BnAgViow.js";import"./Portal-DSR4zoF2.js";import"./useMemoizedId-DTXcstyd.js";import"./FormControl-Rgqig6QS.js";import"./InputLabel-BzgpUWCY.js";import"./TooltipIcon-KrhHCJfq.js";import"./LegacyTooltip-DepAC3Bc.js";import"./useLink-YF0z-YX4.js";import"./IconExclamationMarkCircle24-vzChveiq.js";import"./IconQuestionMarkCircle-DNg9QlGt.js";import"./TabItem-Crjs_qi7.js";import"./TextInput-hOyDqsAD.js";import"./Tree-l_6RWbbv.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DqRgZ3e-.js";import"./dialog-D9O7a7Fm.js";const Et={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const _t=["Default","WithPortal"];export{o as Default,e as WithPortal,_t as __namedExportsOrder,Et as default};
