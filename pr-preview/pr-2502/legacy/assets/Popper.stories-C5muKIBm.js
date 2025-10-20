import{r as s,j as e}from"./iframe-BZNqkfAJ.js";import{a as b}from"./Box-BPavLjub.js";import{B as h}from"./Button-DPdntTPA.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-C2wVThcL.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-71nhGtBl.js";import"./FormControl-Fm8ji9--.js";import"./InputLabel-VnXyqqtb.js";import"./TooltipIcon-B4fgfgXq.js";import"./LegacyTooltip-BMPA2y4M.js";import"./useLink-BV60aH2t.js";import"./useFocusable-Cbb67iIG.js";import"./useFocusRing-CQ3DSYMp.js";import"./useEffectEvent-rvbS5oZD.js";import"./chain-DYaMBwaU.js";import"./index-CwejX9uB.js";import"./usePopper-RQB8ULWN.js";import"./index-CfLIqIuw.js";import"./Portal-ClW_Qzmp.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DhdJoYsE.js";import"./IconCheckMark-DHJw-dqm.js";import"./IconExclamationMarkCircle24-C_PyDBL-.js";import"./IconExclamationMarkTriangle-BmGuHDO2.js";import"./IconExclamationMarkTriangle24-B3UsieTF.js";import"./IconQuestionMarkCircle-Rvx5Hlp1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DAKrD1ew.js";import"./Switch-B2TDQsp5.js";import"./TabItem-BgZOvlvz.js";import"./elements-BOYmskOL.js";import"./TextInput-DX08Yz5d.js";import"./IconCross-B1GSSqi0.js";import"./Tree-ad17tz2O.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-6CMglOI-.js";import"./useClickOutside-wbm9sBa4.js";import"./EnablePortalWrapper-mkrX-ke8.js";import"./dialog-D9O7a7Fm.js";const ce={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const le=["Default","WithPortal"];export{t as Default,o as WithPortal,le as __namedExportsOrder,ce as default};
