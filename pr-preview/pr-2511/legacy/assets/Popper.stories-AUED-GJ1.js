import{r as p,j as t}from"./iframe-Dsejfqf3.js";import{a as b}from"./Box-Cord8vlN.js";import{B as h}from"./Button-D3yCbMCu.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-1AYg5Joy.js";import"./preload-helper-sQDyWCwb.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input--aYGB3iM.js";import"./Divider-CSA0glUk.js";import"./FormControl-B73r47xs.js";import"./InputLabel-DoHx15Zm.js";import"./TooltipIcon-_Xzg-Fhc.js";import"./LegacyTooltip-BJIfuung.js";import"./useLink-CdtBTF-A.js";import"./useFocusable-kZrDkqc7.js";import"./useFocusRing-DWqOtJ-L.js";import"./useEffectEvent-C7jBvXkh.js";import"./chain-BFmjOoFO.js";import"./index-BbLRgUGO.js";import"./usePopper-DjOQrLf2.js";import"./index-MQ_sJc9e.js";import"./Portal-CXUvUdjm.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DeujXZR8.js";import"./IconCheckMark-C6DMESJP.js";import"./IconExclamationMarkCircle24-R5PjI8Kl.js";import"./IconExclamationMarkTriangle-ClnlLp-c.js";import"./IconExclamationMarkTriangle24-CZYrQjwB.js";import"./IconQuestionMarkCircle-BAuAtzUg.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-j6DPyhiU.js";import"./Switch-CQpRUTqU.js";import"./TabItem-D9LFcEE2.js";import"./elements-BOYmskOL.js";import"./TextInput-lWB17Ld3.js";import"./IconCross-DFUwyl11.js";import"./Tree-CHXkJzp-.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CmZ21mE1.js";import"./IconCaretDown--QkG6ADy.js";import"./IconCaretDown16-DqiiGdgJ.js";import"./IconTrashBin16-BkNVPgcX.js";import"./IconTrashBin24-Bj6htdPw.js";import"./useButton-DrDu0hN4.js";import"./useClickOutside-TtSMHBKs.js";import"./EnablePortalWrapper-DjCaNXWL.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
