import{r as p,j as t}from"./iframe-Db2lMgIJ.js";import{a as b}from"./Box-QKpCgCWO.js";import{B as h}from"./Button-DrV-oxb6.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-VGceQO3J.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dxp6Hmi5.js";import"./FormControl-CzH52flP.js";import"./InputLabel-BuiyOa5e.js";import"./TooltipIcon-B2QKXg6s.js";import"./LegacyTooltip-9uaOguTu.js";import"./useLink-DRnxTn0l.js";import"./useFocusable-CTEFGZiK.js";import"./useFocusRing-B9RuWWoE.js";import"./useEffectEvent-B6yt_MbU.js";import"./chain-DNotTnBs.js";import"./index-DJB9gcJu.js";import"./usePopper-aywqiBd9.js";import"./index-eahnjmcY.js";import"./Portal-D_ZcylIA.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-B4gdAHT4.js";import"./IconCheckMark-DjEX-BrJ.js";import"./IconExclamationMarkCircle24-BOaIUvhj.js";import"./IconExclamationMarkTriangle-BVyt7aNf.js";import"./IconExclamationMarkTriangle24-BLFlkBha.js";import"./IconQuestionMarkCircle-DXfc1EwE.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BNtw18aK.js";import"./Switch-DpzcFjU4.js";import"./TabItem-Bgtxl6CT.js";import"./elements-BOYmskOL.js";import"./TextInput-JaqVfONk.js";import"./IconCross-CzRefrvN.js";import"./Tree-Bw4XPOUo.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-ng2O4uuE.js";import"./IconCaretDown-zENP2QKX.js";import"./IconCaretDown16-giTZ49XX.js";import"./IconTrashBin16-DqIm0Q2w.js";import"./IconTrashBin24-G7BNemIR.js";import"./useButton-CLCKE_lb.js";import"./useClickOutside-CXT4Q1eP.js";import"./EnablePortalWrapper-DKPHOS0M.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const wt=["Default","WithPortal"];export{e as Default,o as WithPortal,wt as __namedExportsOrder,ft as default};
