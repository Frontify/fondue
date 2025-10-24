import{r as p,j as t}from"./iframe-BUwuV1Yf.js";import{a as b}from"./Box-6cBA0_3i.js";import{B as h}from"./Button-B1NN_lii.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DPOChrIp.js";import"./preload-helper-D5qcpbyD.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D2F_PKsX.js";import"./Divider-DPzk32Sl.js";import"./FormControl-D-1j_mY6.js";import"./InputLabel-DALiNwSO.js";import"./TooltipIcon-DyuJgYqN.js";import"./LegacyTooltip-D4QAG0oL.js";import"./useLink-D1XjKdgA.js";import"./useFocusable-CuB4bBD4.js";import"./useFocusRing-nkcyuVCu.js";import"./useEffectEvent-C8ZkU_FO.js";import"./chain-Dr8tyQvf.js";import"./index-DegWOD3f.js";import"./usePopper-z-jt1pka.js";import"./index-CkYX0QpS.js";import"./Portal-CAM_NOt5.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-B9nxXXF7.js";import"./IconCheckMark-B2wISUKN.js";import"./IconExclamationMarkCircle24-BFFkaWMT.js";import"./IconExclamationMarkTriangle-Y0VcjXdq.js";import"./IconExclamationMarkTriangle24-BUDlRL3H.js";import"./IconQuestionMarkCircle-XjewWxwc.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-paK7r67e.js";import"./Switch-D05wI1x6.js";import"./TabItem-C4ZkRY4r.js";import"./elements-BOYmskOL.js";import"./TextInput-Rap6JbAf.js";import"./IconCross-D2tJJHQF.js";import"./Tree-De_gGTcz.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CB9W3fi7.js";import"./IconCaretDown-BzmTZ2Y3.js";import"./IconCaretDown16-BqORmrlh.js";import"./IconTrashBin16-BoYFRjak.js";import"./IconTrashBin24-vaa6XK1C.js";import"./useButton-C805vYYB.js";import"./useClickOutside-CNVIeSzM.js";import"./EnablePortalWrapper-CsonBS2r.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const bt=["Default","WithPortal"];export{e as Default,o as WithPortal,bt as __namedExportsOrder,wt as default};
