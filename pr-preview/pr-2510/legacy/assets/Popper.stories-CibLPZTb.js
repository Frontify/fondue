import{r as p,j as t}from"./iframe-CM-rC4pW.js";import{a as b}from"./Box-DqdYGOYd.js";import{B as h}from"./Button-CenNVBp8.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-s2Wcg1K3.js";import"./preload-helper-qBSLZfTS.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DeL375Sl.js";import"./Divider-DS3QNkAW.js";import"./FormControl-DNUPkDjx.js";import"./InputLabel-DXmhaygW.js";import"./TooltipIcon-Dc96l6Xh.js";import"./LegacyTooltip-ppPP8AMC.js";import"./useLink-DKND8L_-.js";import"./useFocusable-DxQGPu8E.js";import"./useFocusRing-65bRAxqP.js";import"./useEffectEvent-CiImHouW.js";import"./chain-5aqg5xgJ.js";import"./index-nGC6dqdw.js";import"./usePopper-C9oL71dO.js";import"./index-CW6wVUMq.js";import"./Portal-BZmq1DWy.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-do8RxhNb.js";import"./IconCheckMark-65Jmd977.js";import"./IconExclamationMarkCircle24-BL0yj-2z.js";import"./IconExclamationMarkTriangle-BGBvrNZu.js";import"./IconExclamationMarkTriangle24-CdnFfC2B.js";import"./IconQuestionMarkCircle-BdV_lOz6.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Drb61Rof.js";import"./Switch-GxhEavR1.js";import"./TabItem-_vqA6YBV.js";import"./elements-BOYmskOL.js";import"./TextInput-CEsrv-ON.js";import"./IconCross-n48ME2rd.js";import"./Tree-Iitc_LxH.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CRpr7kn-.js";import"./IconCaretDown-maSGby9p.js";import"./IconCaretDown16-BmJK5U7d.js";import"./IconTrashBin16-BqeWSU2Q.js";import"./IconTrashBin24-D801_wi5.js";import"./useButton-B0mM1imS.js";import"./useClickOutside-COgqo7bE.js";import"./EnablePortalWrapper-B39I2ECN.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
