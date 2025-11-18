import{r as p,j as t}from"./iframe-DdaLCHUc.js";import{a as b}from"./Box-BFCedUo5.js";import{B as h}from"./Button-LQA4uMwY.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-9hW2Bipn.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BTvObkQJ.js";import"./Divider-DZ9Cfqen.js";import"./FormControl-CHRTTuNI.js";import"./InputLabel-I-Kx411H.js";import"./TooltipIcon-BBJxAxVm.js";import"./LegacyTooltip-CWWhuk7B.js";import"./useLink-BhUBEIbu.js";import"./useFocusable-BPi_GpYy.js";import"./useFocusRing-BESbWJEl.js";import"./useEffectEvent-DnDWDQ4U.js";import"./chain-Co2ZCjzx.js";import"./index-Dhfdg7c1.js";import"./usePopper-CAX7HgVD.js";import"./index-f274srjI.js";import"./Portal-CatAU8tQ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-EL9RDzas.js";import"./IconCheckMark-B6cjw87y.js";import"./IconExclamationMarkCircle24-IdAoixjq.js";import"./IconExclamationMarkTriangle-CUyNWLG-.js";import"./IconExclamationMarkTriangle24-CJPJDCYb.js";import"./IconQuestionMarkCircle-Cjl-gH89.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BrQtTbTR.js";import"./Switch-C0M_j64v.js";import"./TabItem-DTNaj8IU.js";import"./elements-BOYmskOL.js";import"./TextInput-CFNM7wtv.js";import"./IconCross-BpQu1AjW.js";import"./Tree-B6hM_JfH.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BAK9aW7H.js";import"./IconCaretDown-Se4sU9sK.js";import"./IconCaretDown16--0HwDEW5.js";import"./IconTrashBin16-Ch1evd52.js";import"./IconTrashBin24-B9NG3wmX.js";import"./useButton-oy6tav4j.js";import"./useClickOutside-Cf3DqbZp.js";import"./EnablePortalWrapper-C2XFGCCp.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
