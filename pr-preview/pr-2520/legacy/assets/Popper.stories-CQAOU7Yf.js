import{r as p,j as t}from"./iframe-COvncgO8.js";import{a as b}from"./Box-BwOPakxs.js";import{B as h}from"./Button-7pOf9H--.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-zYGI04Zs.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C92NR_zh.js";import"./DialogBody-DCc4Yg2g.js";import"./dialog-D9O7a7Fm.js";import"./Divider-B85E6BvU.js";import"./FormControl-Bcd_9nmE.js";import"./InputLabel-BPiuuLrA.js";import"./TooltipIcon-C6_vdaPT.js";import"./LegacyTooltip-BcTupzmJ.js";import"./useLink-DrjZu1ud.js";import"./useFocusable-BV7VyjKo.js";import"./useFocusRing-DHBJ7h9x.js";import"./useEffectEvent-RLoKViUZ.js";import"./chain-DvDQn_Hh.js";import"./index-D5tmHRvZ.js";import"./usePopper-C0vzrNCW.js";import"./index-D04KY_3R.js";import"./Portal-DOHoR6KG.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cems80lu.js";import"./IconCheckMark-L790ChEG.js";import"./IconExclamationMarkCircle24-Bg_mSOzO.js";import"./IconExclamationMarkTriangle-DqIxU97e.js";import"./IconExclamationMarkTriangle24-B0fnSC44.js";import"./IconQuestionMarkCircle-KoRPplup.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-nRIrLITl.js";import"./Switch-D-l-1H6w.js";import"./TabItem-iNPvDiQg.js";import"./elements-BOYmskOL.js";import"./TextInput-ypSq6TIC.js";import"./IconCross-cn5_I5If.js";import"./Tree-DjGuGY46.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DPgQ6UJZ.js";import"./IconCaretDown-BFIauR7G.js";import"./IconCaretDown16-B-Ffgwac.js";import"./IconTrashBin16-DN3hi3Xr.js";import"./IconTrashBin24-BhMFm0Uf.js";import"./useButton-ZzZ0x7gO.js";import"./useClickOutside-CtDVvtrj.js";import"./EnablePortalWrapper-plu6Olsn.js";const bt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
