import{r as p,j as t}from"./iframe-DeWR3bCY.js";import{a as b}from"./Box-C24z_FHg.js";import{B as h}from"./Button-BLweziEU.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DYBnp2KT.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CW1mzVUI.js";import"./Divider-CelkCIk-.js";import"./FormControl-MukbM0aI.js";import"./InputLabel-h8LqjAy_.js";import"./TooltipIcon-BYyV3rYt.js";import"./LegacyTooltip-D44E3v73.js";import"./useLink-BOrznN4e.js";import"./useFocusable-B__8DITY.js";import"./useFocusRing-DDmCmTBg.js";import"./useEffectEvent-ZViW6iRT.js";import"./chain-CphVvTE2.js";import"./index-DJft0qVE.js";import"./usePopper-CE9IDH84.js";import"./index-BpjCltCh.js";import"./Portal-zj59SWKM.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Dn8dI9Es.js";import"./IconCheckMark-CXzdR80S.js";import"./IconExclamationMarkCircle24-i1KiRCfY.js";import"./IconExclamationMarkTriangle-B_pFvKyE.js";import"./IconExclamationMarkTriangle24-W3C7A4ds.js";import"./IconQuestionMarkCircle-ClsWoaJ8.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-D_DR5JcS.js";import"./Switch-C09w1jFf.js";import"./TabItem-BmwuxtVx.js";import"./elements-BOYmskOL.js";import"./TextInput-OgjAFddC.js";import"./IconCross-DzJAACQt.js";import"./Tree-B2KJq71l.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CN_JTlBu.js";import"./IconCaretDown-D5f-fXwU.js";import"./IconCaretDown16-O9eJ0HMS.js";import"./IconTrashBin16-Hx2dZQ9J.js";import"./IconTrashBin24-hE8LGw7s.js";import"./useButton-BZC89rr_.js";import"./useClickOutside-8mz09EUm.js";import"./EnablePortalWrapper-BnKNRUvW.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
