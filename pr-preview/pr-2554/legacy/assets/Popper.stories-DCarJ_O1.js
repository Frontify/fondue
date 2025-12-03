import{r as p,j as t}from"./iframe-C7JOSz35.js";import{a as b}from"./Box-ClDUo7hq.js";import{B as h}from"./Button-CP8ZJhZu.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BcrqjYrR.js";import"./preload-helper-1L8wWKLL.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Etqtp1pP.js";import"./Divider-VnrqbJet.js";import"./Dropdown-Cd4BCPzM.js";import"./useButton-CgUc2oI0.js";import"./useFocusable-Dwt4J9wN.js";import"./useFocusRing-K7RGIjkv.js";import"./useEffectEvent-BKOTEyw3.js";import"./chain-Hhaz5iun.js";import"./index-BIm_f9L2.js";import"./FocusScope-e9N67m-1.js";import"./useOverlayTriggerState-D9S1TF3G.js";import"./useControlledState-Dm6dsicG.js";import"./useMenuTrigger-CWxHef3f.js";import"./useLabels-DNxyzFSf.js";import"./useLocalizedStringFormatter-G41whQA5.js";import"./context-BRO6MuBG.js";import"./VisuallyHidden-ZhLtFnJ1.js";import"./helper-BS8ZS_-V.js";import"./keyboard-Bjf4lIPo.js";import"./SelectionManager-B4jpUwKf.js";import"./useField-DnXidplQ.js";import"./useFormValidationState-BObGN0xN.js";import"./usePopper-C7dET8l6.js";import"./index-DdDF_rEU.js";import"./MenuItem-uY8r57uf.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BK3hTeUD.js";import"./IconCheckMark-DcX0E_d_.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CEf8j1r3.js";import"./Trigger-BUVOjXfY.js";import"./IconCaretDown-1ItWNo4o.js";import"./IconCaretDown16-DHXciLtK.js";import"./IconCross-Lrr-nknY.js";import"./IconExclamationMarkTriangle-YzrmnrTp.js";import"./IconExclamationMarkTriangle24-BQgDJRgV.js";import"./IconTrashBin16-ALv36KUi.js";import"./IconTrashBin24-BOAt-_fa.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BfvMlMf5.js";import"./Portal-BBaw5-ag.js";import"./useMemoizedId-J2vchGxH.js";import"./FormControl-QVbL00q_.js";import"./InputLabel-Qg5VNGmD.js";import"./TooltipIcon-a0nnUUPG.js";import"./LegacyTooltip-DXLyha72.js";import"./useLink-BHEqG8hr.js";import"./IconExclamationMarkCircle24-BuUIJ3it.js";import"./IconQuestionMarkCircle-D1fGw7N0.js";import"./Switch-Bf3FzBYG.js";import"./TabItem-0_s6xpXk.js";import"./TextInput-4jL9UWTk.js";import"./Tree-B-q5Lc_A.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BwVLQGPR.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
