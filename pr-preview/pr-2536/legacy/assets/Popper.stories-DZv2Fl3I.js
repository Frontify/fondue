import{r as p,j as t}from"./iframe-IPoq-zMV.js";import{a as b}from"./Box-RN8TvVkR.js";import{B as h}from"./Button-Mum_B5-6.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Ch0JSD50.js";import"./preload-helper-CTxuOSTo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BqguaTeR.js";import"./Divider-Bivo3lpm.js";import"./FormControl-qESiwCJz.js";import"./InputLabel-BzxqF8Ol.js";import"./TooltipIcon-BFVvOwwO.js";import"./LegacyTooltip-CN9F89CS.js";import"./useLink-DojGKHY9.js";import"./useFocusable-CbgYFhRR.js";import"./useFocusRing-C0-tGYTB.js";import"./useEffectEvent-ChfQPq2b.js";import"./chain-CsqahItZ.js";import"./index-DNIGD9BW.js";import"./usePopper-BWfLn5bL.js";import"./index-DexOFgAg.js";import"./Portal-rUqAI-7S.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BV8eur7_.js";import"./IconCheckMark-DtfXOLPy.js";import"./IconExclamationMarkCircle24-C0Qj6h9c.js";import"./IconExclamationMarkTriangle-CJLSg2Dq.js";import"./IconExclamationMarkTriangle24-CsRwIySD.js";import"./IconQuestionMarkCircle-VDVPgREv.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DrBVcZWp.js";import"./Switch-3Rux1RWK.js";import"./TabItem-rxMYQwo3.js";import"./elements-BOYmskOL.js";import"./TextInput-Dwkikkiq.js";import"./IconCross-CTBX3sAW.js";import"./Tree-n_Nz8-z8.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BVFMtr5h.js";import"./IconCaretDown-DIalihrO.js";import"./IconCaretDown16-CntekHao.js";import"./IconTrashBin16-CuhuliP4.js";import"./IconTrashBin24-DWMBDYZm.js";import"./useButton-Chg-g04_.js";import"./useClickOutside-DQtoJQq8.js";import"./EnablePortalWrapper-D6PzXFmT.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
