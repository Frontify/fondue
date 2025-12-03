import{r as p,j as t}from"./iframe-B6gvnC9G.js";import{a as b}from"./Box-D2ZqmUHl.js";import{B as h}from"./Button-U5VlevU2.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-lCQmm1Hl.js";import"./preload-helper-1L8wWKLL.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-g2tGremA.js";import"./Checkbox-D6vyio4z.js";import"./useFocusable-BFOTHm5b.js";import"./useFocusRing-lDQQmtVG.js";import"./useEffectEvent-Br9oWhz1.js";import"./chain-DkU4Parx.js";import"./index-Ca3jtKOM.js";import"./useFormValidationState-D8jGKcTw.js";import"./useControlledState-BGX5OVF3.js";import"./InputLabel-Piz3csh8.js";import"./TooltipIcon-u9szC1VU.js";import"./LegacyTooltip-CUQq3jNY.js";import"./useLink-DpQXp-4I.js";import"./usePopper-D6IpfkbE.js";import"./index-Bkk43B7y.js";import"./Portal-FN-7ZB7K.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CoFSyPjm.js";import"./IconCheckMark-CJRGY1pq.js";import"./IconExclamationMarkCircle24-dSHdz95B.js";import"./IconExclamationMarkTriangle-BIGUCjg0.js";import"./IconExclamationMarkTriangle24-BTWBP6oJ.js";import"./IconQuestionMarkCircle-Dl_P1dkt.js";import"./IconMinus-CFenzC2Z.js";import"./Divider-C1YILpIw.js";import"./FormControl-DYPrqQx1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CDo8ljLK.js";import"./Switch-BlEQeOTC.js";import"./TabItem-Db1inNG6.js";import"./elements-BOYmskOL.js";import"./TextInput-ByQEBCRv.js";import"./IconCross-v4Os9_kc.js";import"./Tree-q-pdklRr.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CN1tEa_w.js";import"./IconCaretDown-CPNCjoYn.js";import"./IconCaretDown16-DnxqvEec.js";import"./IconTrashBin16-Cy7a5y_v.js";import"./IconTrashBin24-Cvl42CmC.js";import"./useButton-Csf4pE_W.js";import"./useClickOutside--V2jy9Qc.js";import"./EnablePortalWrapper-C9__I8yL.js";import"./dialog-D9O7a7Fm.js";const xt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var s,i,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Pt=["Default","WithPortal"];export{o as Default,e as WithPortal,Pt as __namedExportsOrder,xt as default};
