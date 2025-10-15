import{r as p,j as t}from"./iframe-0YDHrRt6.js";import{a as b}from"./Box-Dxsrqlvj.js";import{B as h}from"./Button-2G_0paTC.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DmqQVPid.js";import"./preload-helper-h55SgzPI.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CAusm6h1.js";import"./Divider-uDIg1p3e.js";import"./FormControl-DONs9dV5.js";import"./InputLabel-BpxxMALc.js";import"./TooltipIcon-BzU7idz7.js";import"./LegacyTooltip-BWZ1XHjf.js";import"./useLink-CxfHgizR.js";import"./useFocusable-D2xehFAO.js";import"./useFocusRing-D4vnbWSH.js";import"./useEffectEvent-B9VOC_Iw.js";import"./chain-BsYcESRq.js";import"./index-CFitZhhZ.js";import"./usePopper-CsQKkv4s.js";import"./index-DjyKXdH0.js";import"./Portal-Bx3snlZl.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BDmarxCk.js";import"./IconCheckMark-DbuNgHzm.js";import"./IconExclamationMarkCircle24-Dvdhmgm2.js";import"./IconExclamationMarkTriangle-B-LVrLFl.js";import"./IconExclamationMarkTriangle24-CfAmBqxS.js";import"./IconQuestionMarkCircle-BzWDTn-W.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BjRJPyXu.js";import"./Switch-Dgxm9PcJ.js";import"./TabItem-CDBnffFz.js";import"./elements-BOYmskOL.js";import"./TextInput-Bdj8YO8t.js";import"./IconCross-0SyrPz9-.js";import"./Tree-Cl47lOuk.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Be9U765P.js";import"./IconCaretDown-D1jHnc0u.js";import"./IconCaretDown16-BDg74fiZ.js";import"./IconTrashBin16-DM8ocjtE.js";import"./IconTrashBin24-6X4hQTbO.js";import"./useButton-BehVG7Qf.js";import"./useClickOutside-FnyOu7d3.js";import"./EnablePortalWrapper-BLsW0qxC.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
