import{r as s,j as e}from"./iframe-CcylRKQH.js";import{a as b}from"./Box-DxL3Gz8V.js";import{B as h}from"./Button-Cmvo9KzN.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DHh07HSc.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DxfRKPKD.js";import"./Divider-eIic01My.js";import"./FormControl-X60Y5i8w.js";import"./InputLabel-Dh7DAHfT.js";import"./TooltipIcon-Biikeypf.js";import"./LegacyTooltip-CiXFhR7c.js";import"./useLink-B32ezdH_.js";import"./useFocusable-DIfJM1zF.js";import"./useFocusRing-BGhUgRgi.js";import"./useEffectEvent-BcSr7ofR.js";import"./chain-xmUZKcgb.js";import"./index-CUPmB95o.js";import"./usePopper-C8rHmjmF.js";import"./index-6mGGifEw.js";import"./Portal-DfmkrqCg.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Clpl3lDs.js";import"./IconCheckMark-dBef9G0g.js";import"./IconExclamationMarkCircle24-4itJlXvH.js";import"./IconExclamationMarkTriangle-LqOdmrNf.js";import"./IconExclamationMarkTriangle24-B559YPiq.js";import"./IconQuestionMarkCircle-DHet8HVh.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B_VwBpTh.js";import"./Switch-CeO1SDPG.js";import"./TabItem-Dwbaolvo.js";import"./elements-BOYmskOL.js";import"./TextInput-D5rXxSJx.js";import"./IconCross-ucPYd45Y.js";import"./Tree-BmkA6ZgH.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-5-lYtHO3.js";import"./useClickOutside-Cc4KLPFR.js";import"./EnablePortalWrapper-B_nin7Wv.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
