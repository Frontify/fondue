import{r as p,j as t}from"./iframe--2rw_cjg.js";import{a as b}from"./Box-BNed2a7_.js";import{B as h}from"./Button-CDpAvR_7.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DrzuiCuP.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-kN8mL74g.js";import"./Divider-BwIY4yEp.js";import"./FormControl-xc9FX5RU.js";import"./InputLabel-Dv4is4pL.js";import"./TooltipIcon-B9wO7yC3.js";import"./LegacyTooltip-B4lgEf8F.js";import"./useLink-B735unP_.js";import"./useFocusable-AxjEqYd6.js";import"./useFocusRing-BsE3KrSK.js";import"./useEffectEvent-7SpFmDeR.js";import"./chain-C2bf6kwx.js";import"./index-DQ-tYZ13.js";import"./usePopper-CqJZcUvQ.js";import"./index-BCqD7aw8.js";import"./Portal-Bog-ilIj.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D0AyLdJ9.js";import"./IconCheckMark-BkiS9-rb.js";import"./IconExclamationMarkCircle24-Bh5vOeGE.js";import"./IconExclamationMarkTriangle-CzbtRrPB.js";import"./IconExclamationMarkTriangle24-95cBFDWm.js";import"./IconQuestionMarkCircle-CyFLsY7r.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-uT_yoQL1.js";import"./Switch-RanT_BOm.js";import"./TabItem-B1_GOEpj.js";import"./elements-BOYmskOL.js";import"./TextInput-iYevrUQR.js";import"./IconCross-B8uxEUE8.js";import"./Tree-Dws7TtQz.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BqI9Ucl1.js";import"./IconCaretDown-C5uKGKgw.js";import"./IconCaretDown16-D3D4HTlj.js";import"./IconTrashBin16-BlgDT1jV.js";import"./IconTrashBin24-DeRmc9qk.js";import"./useButton-BR4gTdNq.js";import"./useClickOutside-PaU60lA8.js";import"./EnablePortalWrapper--WRtXlIr.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
