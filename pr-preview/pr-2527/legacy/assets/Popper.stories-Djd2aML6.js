import{r as p,j as t}from"./iframe-fM7Rz_IH.js";import{a as b}from"./Box-9T55CxCZ.js";import{B as h}from"./Button-C-HesLNs.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BQCTamfd.js";import"./preload-helper-r7mqpNn-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-OlyhZ4Ot.js";import"./Divider-Cey2ANbQ.js";import"./FormControl-Cr1hpC_m.js";import"./InputLabel-BNXUoyxB.js";import"./TooltipIcon-CKGMLqVo.js";import"./LegacyTooltip-Dba4Z-VI.js";import"./useLink-CZIaAhwd.js";import"./useFocusable-BnOXMtFf.js";import"./useFocusRing-D96vsHFl.js";import"./useEffectEvent-Dd15XCAb.js";import"./chain-6uoIjD58.js";import"./index-B2Xp44i3.js";import"./usePopper-CMM9W_Aw.js";import"./index-DsmMH1Qe.js";import"./Portal-7y-WN4RV.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D44gSj9_.js";import"./IconCheckMark-D0okpupZ.js";import"./IconExclamationMarkCircle24-CeaBDf6Z.js";import"./IconExclamationMarkTriangle-dTKdaA8A.js";import"./IconExclamationMarkTriangle24-BhnTYriZ.js";import"./IconQuestionMarkCircle-oN5ApYd_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-q8L7gn0a.js";import"./Switch-ClYNwfm9.js";import"./TabItem-qskUbBBO.js";import"./elements-BOYmskOL.js";import"./TextInput-YMeucMFi.js";import"./IconCross-cI4LqOlP.js";import"./Tree-D5eBpZdj.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-D9BtGDKJ.js";import"./IconCaretDown-CqemCPlr.js";import"./IconCaretDown16-C2ZoekrW.js";import"./IconTrashBin16-B5vK85cE.js";import"./IconTrashBin24-B4FK4PfT.js";import"./useButton-B0RvFuLn.js";import"./useClickOutside-D7zc52GW.js";import"./EnablePortalWrapper-DDg5D4xi.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
