import{r as p,j as t}from"./iframe-CCw9I7Bu.js";import{a as b}from"./Box-CmiEbl-q.js";import{B as h}from"./Button-DCrtMV-f.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BgZpwKBc.js";import"./preload-helper-264tqYC2.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ce3bWD3w.js";import"./Divider-Bzb98vsz.js";import"./FormControl-AszKrOhn.js";import"./InputLabel-RIUzsHS1.js";import"./TooltipIcon-CQoHGHh4.js";import"./LegacyTooltip-EP6kgRuB.js";import"./useLink-otdWWK7D.js";import"./useFocusable-DtleDefI.js";import"./useFocusRing-CRu4vqVV.js";import"./useEffectEvent-Ck9HMdMD.js";import"./chain-8k56sdoK.js";import"./index-CPmhc4Xn.js";import"./usePopper-D5gYnfxh.js";import"./index-DASe7JJU.js";import"./Portal-DQ9hcTUw.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DLxNPgoQ.js";import"./IconCheckMark-9CNIruEE.js";import"./IconExclamationMarkCircle24-DqkCmx6y.js";import"./IconExclamationMarkTriangle-sbrhWL-D.js";import"./IconExclamationMarkTriangle24-9lE6ubOu.js";import"./IconQuestionMarkCircle-CYKV5inN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C-4-p9pl.js";import"./Switch-OfBdwERx.js";import"./TabItem-aycfG7Sv.js";import"./elements-BOYmskOL.js";import"./TextInput-CPCrtAaB.js";import"./IconCross-DQV7Z95N.js";import"./Tree-CO5WdhY1.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BCt-O3sJ.js";import"./IconCaretDown-C1vuk0WO.js";import"./IconCaretDown16-CMCzgPBz.js";import"./IconTrashBin16-W99sZLY1.js";import"./IconTrashBin24-DmKPPE09.js";import"./useButton-CTSBvX_x.js";import"./useClickOutside-Bk_bMd-K.js";import"./EnablePortalWrapper-C5GDd9fT.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
