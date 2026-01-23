import{r as p,j as t}from"./iframe-DH_Vpvc8.js";import{a as b}from"./Box-lmRurSI5.js";import{B as h}from"./Button-CRfrGFua.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DOykOIXa.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-fMLuskIO.js";import"./Checkbox-BKDFmUYg.js";import"./useFocusable-BfaIOJFi.js";import"./useFocusRing-CBL7_Hgl.js";import"./useEffectEvent-ClEuPD_7.js";import"./chain-BXWUlVD-.js";import"./index-BEyY7rkE.js";import"./useFormValidationState-BLSqlG-U.js";import"./useControlledState-BcEV7UZo.js";import"./InputLabel-DD2Ppz5-.js";import"./TooltipIcon-BUevwMOK.js";import"./LegacyTooltip-CJ8JehmO.js";import"./useLink-CfQmoYLi.js";import"./usePopper-7nuAm56J.js";import"./index-DswGKGRV.js";import"./Portal-DfJTwWgR.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-h7ZSLYPU.js";import"./IconCheckMark-CBAEpExY.js";import"./IconExclamationMarkCircle24-D3Uxl3xP.js";import"./IconExclamationMarkTriangle-C4yhxZCE.js";import"./IconExclamationMarkTriangle24-CfZExJL9.js";import"./IconQuestionMarkCircle-5nNliWG4.js";import"./IconMinus-0cOeQ8LJ.js";import"./Divider-Du5UKnrr.js";import"./FormControl-B2FtJwKU.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CfdqrWn5.js";import"./Switch-C8jSVRUG.js";import"./TabItem-B7u6UvQ-.js";import"./elements-BOYmskOL.js";import"./TextInput-Be_uW0xW.js";import"./IconCross-Clz4DbLP.js";import"./Tree-p5r-5Ig9.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Bu4woFqc.js";import"./IconCaretDown-Bt6Qf-uZ.js";import"./IconCaretDown16-CxMSiV6T.js";import"./IconTrashBin16-BMY5sjUw.js";import"./IconTrashBin24-BwZ2YLrM.js";import"./useButton-DwlojS2s.js";import"./useClickOutside-BmDR2us8.js";import"./EnablePortalWrapper-BdDHCmiv.js";import"./dialog-D9O7a7Fm.js";const xt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var s,i,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Pt=["Default","WithPortal"];export{o as Default,e as WithPortal,Pt as __namedExportsOrder,xt as default};
