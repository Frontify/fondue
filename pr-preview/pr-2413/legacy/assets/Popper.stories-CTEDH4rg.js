import{r as s,j as e}from"./iframe-R47jGcU2.js";import{a as b}from"./Box-DC5CvamZ.js";import{B as h}from"./Button-BLwN7tEv.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CeNr3ylK.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CFRi4VmV.js";import"./Divider-D1MiRRnp.js";import"./FormControl-EVHd6z1O.js";import"./InputLabel-No5zkAWB.js";import"./TooltipIcon-Dh1Mu_SJ.js";import"./LegacyTooltip-D5m2KIjK.js";import"./useLink-DwKnTFug.js";import"./useFocusable-BlwuGGmT.js";import"./useFocusRing-C4oNNCkT.js";import"./useEffectEvent-N1ux8_qW.js";import"./chain-dbTaULHG.js";import"./index-BhkG3d51.js";import"./usePopper-BoiCpFqY.js";import"./index-BIy2nVn3.js";import"./Portal-BulOCuvv.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cc1-oElI.js";import"./IconCheckMark-CUgV-iic.js";import"./IconExclamationMarkCircle24-C-iUDFUH.js";import"./IconExclamationMarkTriangle-C3N81EP8.js";import"./IconExclamationMarkTriangle24-AZXAhn85.js";import"./IconQuestionMarkCircle-M3kAC-72.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B_J1OCy_.js";import"./Switch-B3LyVazJ.js";import"./TabItem-DdZkicNp.js";import"./elements-BOYmskOL.js";import"./TextInput-DIg1KeSv.js";import"./IconCross-SOlFE8Hj.js";import"./Tree-b868nuVK.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-i9ItSUh1.js";import"./useClickOutside-CalGrMZE.js";import"./EnablePortalWrapper-BBDLq95U.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
