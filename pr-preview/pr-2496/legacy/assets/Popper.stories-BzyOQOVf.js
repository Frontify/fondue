import{r as p,j as t}from"./iframe-rjkb47Fp.js";import{a as b}from"./Box-DYhUzZJR.js";import{B as h}from"./Button-AVN8O0_F.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DEu4NUU6.js";import"./preload-helper-D2dEV7R8.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dh2J-yCK.js";import"./Divider-CjPtXI1t.js";import"./FormControl-DGKo4TKy.js";import"./InputLabel-P7CfarTY.js";import"./TooltipIcon-kCbJtaWN.js";import"./LegacyTooltip-CszWRNMt.js";import"./useLink--9oj4v8o.js";import"./useFocusable-DAX24fuo.js";import"./useFocusRing-wlWNjJ12.js";import"./useEffectEvent-CF6wkYVV.js";import"./chain-CxKkHJDO.js";import"./index-BufBejhZ.js";import"./usePopper-Dy-yHI8h.js";import"./index-DnDhEa4w.js";import"./Portal-Dj-QjHoV.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C5bvbDNT.js";import"./IconCheckMark-F1NzuPlD.js";import"./IconExclamationMarkCircle24-DOWMJ5dO.js";import"./IconExclamationMarkTriangle-C7-fnofS.js";import"./IconExclamationMarkTriangle24-DiumWHpY.js";import"./IconQuestionMarkCircle-Cu7eD-Qh.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-PfJMskdO.js";import"./Switch-7bbyavxW.js";import"./TabItem-3uHg0cDn.js";import"./elements-BOYmskOL.js";import"./TextInput-BZOqEzah.js";import"./IconCross-CYPCKjcS.js";import"./Tree-CqWXZ_gE.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B4ED9CfD.js";import"./IconCaretDown-DdKs_AQ9.js";import"./IconCaretDown16-D7890YqJ.js";import"./IconTrashBin16-CLT1mPeB.js";import"./IconTrashBin24-B4_g47Wr.js";import"./useButton-ByUDcf3E.js";import"./useClickOutside-DQQPhuKw.js";import"./EnablePortalWrapper-BesxeDV-.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
