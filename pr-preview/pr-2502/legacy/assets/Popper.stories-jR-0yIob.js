import{r as p,j as t}from"./iframe--69LojlF.js";import{a as b}from"./Box-r_iljYD6.js";import{B as h}from"./Button-BNRsGQyj.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-B_2MoySF.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-m_tBsYkP.js";import"./Divider-Ij0JN1sJ.js";import"./FormControl-BTxzdWhi.js";import"./InputLabel-Bt3ZVaBo.js";import"./TooltipIcon-sdBuJY27.js";import"./LegacyTooltip-B2Ak6Huk.js";import"./useLink-BrmAS8yT.js";import"./useFocusable-BodNpPM4.js";import"./useFocusRing-BH1SQdFi.js";import"./useEffectEvent-DhWl9svH.js";import"./chain-CmGVabf0.js";import"./index-BsfhZMXK.js";import"./usePopper-DDX-rhNz.js";import"./index-unlT50y8.js";import"./Portal-Dj_TS6yD.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CMk70fRe.js";import"./IconCheckMark-AKEbsYWf.js";import"./IconExclamationMarkCircle24-B4WeW3eA.js";import"./IconExclamationMarkTriangle-Cgr4K_Ru.js";import"./IconExclamationMarkTriangle24-Cw9OcO3M.js";import"./IconQuestionMarkCircle-D1Mug30L.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DaUVWZ6h.js";import"./Switch-Brr_J-wl.js";import"./TabItem-C3ntqTsS.js";import"./elements-BOYmskOL.js";import"./TextInput-DmT2ThMS.js";import"./IconCross-DR7deBTI.js";import"./Tree-0ZQT-WEL.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DnHqOUmj.js";import"./IconCaretDown-BBGinBo0.js";import"./IconCaretDown16-ehKqRY46.js";import"./IconTrashBin16-BeHdGc_h.js";import"./IconTrashBin24-C-dh1hWZ.js";import"./useButton-DhE5g_3c.js";import"./useClickOutside-YMrCLNQr.js";import"./EnablePortalWrapper-QZQePgoE.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
