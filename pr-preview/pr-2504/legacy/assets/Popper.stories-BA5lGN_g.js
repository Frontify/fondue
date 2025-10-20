import{r as p,j as t}from"./iframe-O_XuH54Q.js";import{a as b}from"./Box-p9n4chOp.js";import{B as h}from"./Button-B58Ioqyx.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Ck3jaqE5.js";import"./preload-helper-OKB6Z3Tn.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-hHIqtYHh.js";import"./Divider-yYtBfNCG.js";import"./Dropdown-CisXlk34.js";import"./useButton-C8BySKAQ.js";import"./useFocusable-C0fuhW15.js";import"./useFocusRing-Bqot2-Rk.js";import"./useEffectEvent-DACClfwZ.js";import"./chain-C6q0R5T-.js";import"./index-BVb_rcK3.js";import"./FocusScope-3do7GGAS.js";import"./useOverlayTriggerState-kzEfGejS.js";import"./useControlledState-B6qV4UF7.js";import"./useMenuTrigger-BkxjOV5I.js";import"./useLabels-vi5D6r2t.js";import"./useLocalizedStringFormatter-Xd96at2a.js";import"./context-CYxI3e2S.js";import"./VisuallyHidden-TL1dlXLg.js";import"./helper-B92HrXNX.js";import"./keyboard-Bkql7voq.js";import"./SelectionManager-BnFpMhKG.js";import"./useField-B-7APjb3.js";import"./useFormValidationState-C1mqDRzs.js";import"./usePopper-CVWvsVB1.js";import"./index-BLmxJglX.js";import"./MenuItem-BvAIyVQb.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-7Y9Pbj0u.js";import"./IconCheckMark-BeCL8EEQ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B4E3yWjH.js";import"./Trigger-Bdyc308T.js";import"./IconCaretDown-CeAN14oY.js";import"./IconCaretDown16-CXHhXr84.js";import"./IconCross-iTiFWRH5.js";import"./IconExclamationMarkTriangle-B1eeTH9v.js";import"./IconExclamationMarkTriangle24-ClNbD2R3.js";import"./IconTrashBin16-BE79xRak.js";import"./IconTrashBin24-BjrrNMTQ.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CNQxf1Z5.js";import"./Portal-C3Khk6dG.js";import"./useMemoizedId-BWUvvHPY.js";import"./FormControl-BzAndHoF.js";import"./InputLabel-J904gGNu.js";import"./TooltipIcon-BBkgYmHu.js";import"./LegacyTooltip-DF0yijww.js";import"./useLink-DIfoGhG2.js";import"./IconExclamationMarkCircle24-BJXQgdBn.js";import"./IconQuestionMarkCircle-D3VJ3tCq.js";import"./Switch-CZzOpnJT.js";import"./TabItem-DGj8BxC4.js";import"./TextInput-D-u9u7p0.js";import"./Tree-DTx26U4T.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BlXnLcs9.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
