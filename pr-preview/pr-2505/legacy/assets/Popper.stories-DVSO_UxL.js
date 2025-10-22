import{r as s,j as e}from"./iframe-CeUxCpPC.js";import{a as b}from"./Box-xuFDPGMY.js";import{B as h}from"./Button-CxGZHxoX.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DUXyvgpR.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CXv7Ls6T.js";import"./Divider-D5z2d8OX.js";import"./FormControl-tA730R-E.js";import"./InputLabel-DDXnEbj6.js";import"./TooltipIcon-BVplYrUn.js";import"./LegacyTooltip-kTodRFC3.js";import"./useLink-BX6Sa-AY.js";import"./useFocusable-vGbM0ZuL.js";import"./useFocusRing-CJ0jx8fE.js";import"./useEffectEvent-BYfJK1FS.js";import"./chain-BtVLX8K0.js";import"./index--jDPQ2CC.js";import"./usePopper-DYgMtgk8.js";import"./index-D4Uana3l.js";import"./Portal-Bb68Jec6.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cb0ErC6G.js";import"./IconCheckMark-3Dk1pvPo.js";import"./IconExclamationMarkCircle24-D7mWRICj.js";import"./IconExclamationMarkTriangle-DU2vNAlo.js";import"./IconExclamationMarkTriangle24-Ce52pyNp.js";import"./IconQuestionMarkCircle-CDNb_VnN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DmHbHNit.js";import"./Switch-OwfbnXcX.js";import"./TabItem-Cnfs7aY-.js";import"./elements-BOYmskOL.js";import"./TextInput-x089nf5b.js";import"./IconCross-DftM46H0.js";import"./Tree-BhfeJdcG.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DfIAN4RH.js";import"./useClickOutside-BP9UeQtb.js";import"./EnablePortalWrapper-BDJVfwgV.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
