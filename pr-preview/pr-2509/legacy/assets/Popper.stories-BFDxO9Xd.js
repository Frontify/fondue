import{r as s,j as e}from"./iframe-CJlMYO80.js";import{a as b}from"./Box-DIcrVcBE.js";import{B as h}from"./Button-D6R4ZlBR.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Dni0pXgC.js";import"./preload-helper-D5qcpbyD.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C5zVzKm_.js";import"./Divider-ClUzdkwN.js";import"./FormControl-gMoYzkb2.js";import"./InputLabel-ID6ydJAd.js";import"./TooltipIcon-CBNoZlW9.js";import"./LegacyTooltip-Cx-bObkX.js";import"./useLink-Dm_1DGUw.js";import"./useFocusable-Da6ZanHY.js";import"./useFocusRing-Bsvhr9s0.js";import"./useEffectEvent-CvTwE8Xm.js";import"./chain-C-znv-QV.js";import"./index-Dga2Wd8a.js";import"./usePopper-DuhTdrxj.js";import"./index-BfzQNO5H.js";import"./Portal-Bk3sxlWw.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CFLyj4-_.js";import"./IconCheckMark-Pw1LRiGI.js";import"./IconExclamationMarkCircle24-BRHwesp6.js";import"./IconExclamationMarkTriangle-Ds0JLIWc.js";import"./IconExclamationMarkTriangle24-cWkM6964.js";import"./IconQuestionMarkCircle-BicQdYl1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-RqqqUQxG.js";import"./Switch-O47mxw0z.js";import"./TabItem-DjTu6M2f.js";import"./elements-BOYmskOL.js";import"./TextInput-CFJnHCWz.js";import"./IconCross-DvaqP0gf.js";import"./Tree-C8cRInY9.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-D35Bb6ec.js";import"./useClickOutside-BfCTNUvs.js";import"./EnablePortalWrapper-DClsg5oD.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,l,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const me=["Default","WithPortal"];export{t as Default,o as WithPortal,me as __namedExportsOrder,le as default};
