import{r as s,j as e}from"./iframe-D8xo9kug.js";import{a as b}from"./Box-BeQl21Uv.js";import{B as h}from"./Button-DjUKMDOM.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-GclyU6d5.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cz0WbC7m.js";import"./Divider-CSbaV9Df.js";import"./FormControl-HLpZgzUF.js";import"./InputLabel-fb4CBA0F.js";import"./TooltipIcon-g94IaeY_.js";import"./LegacyTooltip-BrXDdK2S.js";import"./useLink-DbWGVasb.js";import"./useFocusable-4HP_1Xp6.js";import"./useFocusRing-BBKYXqgF.js";import"./useEffectEvent-DniDe82Q.js";import"./chain-gMjwdO5v.js";import"./index-DvoGZsga.js";import"./usePopper-KaX3TyZC.js";import"./index-Kv823D6x.js";import"./Portal-CEYQjVEL.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-1JbHptUx.js";import"./IconCheckMark-CcnwlQ-L.js";import"./IconExclamationMarkCircle24-Cn7si1up.js";import"./IconExclamationMarkTriangle-BnUxUtLO.js";import"./IconExclamationMarkTriangle24-BGAISWVO.js";import"./IconQuestionMarkCircle-ar_aKFri.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-fsqei28v.js";import"./Switch-DmRFDcf7.js";import"./TabItem-D1SYE3YU.js";import"./elements-BOYmskOL.js";import"./TextInput-ASng9Ua_.js";import"./IconCross-BJO1uqAa.js";import"./Tree-CGbcLumr.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-C_xVpF6H.js";import"./useClickOutside-CYSmTXNO.js";import"./EnablePortalWrapper-DL-EEqoP.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
