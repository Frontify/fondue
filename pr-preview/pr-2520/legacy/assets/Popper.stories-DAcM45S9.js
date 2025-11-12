import{r as p,j as t}from"./iframe-0VoCCvKQ.js";import{a as b}from"./Box-C3CPGAWj.js";import{B as h}from"./Button-_I0pyUtf.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CVOw9Kzc.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cn5dIzAi.js";import"./DialogBody-BQ3rE37G.js";import"./dialog-D9O7a7Fm.js";import"./Divider-Bkort0to.js";import"./FormControl-DTJtLJ3I.js";import"./InputLabel-D-dYkOUU.js";import"./TooltipIcon-BqRz7wxw.js";import"./LegacyTooltip-DsCZbgEK.js";import"./useLink-BKN1ye4f.js";import"./useFocusable-BCe4IQTp.js";import"./useFocusRing-BwU7aKs1.js";import"./useEffectEvent-BHlnOQgH.js";import"./chain-OdKjUm2f.js";import"./index-Bgj71gTm.js";import"./usePopper-DD_o-Erv.js";import"./index-BpkhDvZR.js";import"./Portal-BUQ-jWX1.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CDuHpq3f.js";import"./IconCheckMark-CkwzVArU.js";import"./IconExclamationMarkCircle24-PCG54VBR.js";import"./IconExclamationMarkTriangle-C5ppu3zD.js";import"./IconExclamationMarkTriangle24-CwxIDAa1.js";import"./IconQuestionMarkCircle-BFRN5wh-.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CUUgsLEh.js";import"./Switch-DXHHRCmz.js";import"./TabItem-ClsKH_u9.js";import"./elements-BOYmskOL.js";import"./TextInput-BrmcdJT1.js";import"./IconCross-C4F8ia0X.js";import"./Tree-2aUbMr9P.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DHqwjt4u.js";import"./IconCaretDown-Dz1LMzT8.js";import"./IconCaretDown16-BDdqNkBz.js";import"./IconTrashBin16-D8J8LqCP.js";import"./IconTrashBin24-Cruny8WG.js";import"./useButton---q5tw8Z.js";import"./useClickOutside-CIwQYdWe.js";import"./EnablePortalWrapper-CJrl3TYk.js";const bt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const ht=["Default","WithPortal"];export{e as Default,o as WithPortal,ht as __namedExportsOrder,bt as default};
