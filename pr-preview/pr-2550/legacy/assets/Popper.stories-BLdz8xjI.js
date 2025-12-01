import{r as s,j as e}from"./iframe-BxkmZ_qS.js";import{a as b}from"./Box-CBIfPAh5.js";import{B as h}from"./Button-B7-zHvnj.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BfikMBee.js";import"./preload-helper-DGVESE2Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DxWp8C5T.js";import"./Divider-BeD3hYt7.js";import"./FormControl-BVGE11Hg.js";import"./InputLabel-Cy2480Uz.js";import"./TooltipIcon-hzSmRwpv.js";import"./LegacyTooltip-NfvcJwD5.js";import"./useLink-C7JKiGPY.js";import"./useFocusable-CMqYS_wN.js";import"./useFocusRing-3sDfkXlZ.js";import"./useEffectEvent-DC2V05mW.js";import"./chain-CVnaEK-u.js";import"./index-BHLQBrUq.js";import"./usePopper-CfpTIbUB.js";import"./index-B1O1MNq5.js";import"./Portal-C5SODFR_.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BMYZCDTz.js";import"./IconCheckMark-D276Qa_c.js";import"./IconExclamationMarkCircle24-hm6ZOfLp.js";import"./IconExclamationMarkTriangle-C2mrgeE6.js";import"./IconExclamationMarkTriangle24-D7QSRMTV.js";import"./IconQuestionMarkCircle-C_4XNBvy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BXjrMe8D.js";import"./Switch-BGnM1Fs9.js";import"./TabItem-RUpz2903.js";import"./elements-BOYmskOL.js";import"./TextInput-LXs-tQDI.js";import"./IconCross-Du4TXULc.js";import"./Tree-Cv8I9p-L.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DTKD_JJt.js";import"./useClickOutside-C5ztWzxe.js";import"./EnablePortalWrapper-DTqQDG5a.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,l,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const me=["Default","WithPortal"];export{t as Default,o as WithPortal,me as __namedExportsOrder,le as default};
