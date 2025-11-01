import{r as s,j as e}from"./iframe-87vQE0G8.js";import{a as b}from"./Box-ECz8v9Ex.js";import{B as h}from"./Button-mrkxkHAJ.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-wJfNmnc-.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C4UkkDl1.js";import"./Divider-XWC33T1C.js";import"./FormControl-13wrbNAQ.js";import"./InputLabel-B9cVIxJ9.js";import"./TooltipIcon-UcJUXDWL.js";import"./LegacyTooltip--lHixilP.js";import"./useLink-DwC9KDJ-.js";import"./useFocusable-D5IUiL0q.js";import"./useFocusRing-YMxsAiq0.js";import"./useEffectEvent-CJcvK5ne.js";import"./chain-Cw4GZpOU.js";import"./index-DVCfecQC.js";import"./usePopper-CDDnR_Bd.js";import"./index-BPT-xlNM.js";import"./Portal-CNkWJhCS.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-1N2am3Y0.js";import"./IconCheckMark-_BQk6PBx.js";import"./IconExclamationMarkCircle24-CqxwnR-h.js";import"./IconExclamationMarkTriangle-C1fztYa9.js";import"./IconExclamationMarkTriangle24-BTPIBAv2.js";import"./IconQuestionMarkCircle-DCG9F14E.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BxwRdzx8.js";import"./Switch-CsAb3kz2.js";import"./TabItem-D7e03095.js";import"./elements-BOYmskOL.js";import"./TextInput-BcLe5O15.js";import"./IconCross-pAScAbBc.js";import"./Tree-Bb7X1EMA.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DgiAo-w-.js";import"./useClickOutside-vCdYX0ix.js";import"./EnablePortalWrapper-OWct0vFK.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
