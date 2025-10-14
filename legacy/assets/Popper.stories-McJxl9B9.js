import{r as p,j as t}from"./iframe-CVCmaElJ.js";import{a as b}from"./Box-1KNm9_7-.js";import{B as h}from"./Button-D2G-tVxk.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BAOEF23d.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-EDqkhmu2.js";import"./DialogBody-C5CwM75Q.js";import"./dialog-D9O7a7Fm.js";import"./Divider-DZTBS89c.js";import"./FormControl-BP6CXnCj.js";import"./InputLabel-CIqbqboC.js";import"./TooltipIcon-C2KZ48Gy.js";import"./LegacyTooltip-Dltc1CIc.js";import"./useLink-cZXDHnU-.js";import"./useFocusable-DA3044bw.js";import"./useFocusRing-C1bjenSz.js";import"./useEffectEvent-RCnZCbUp.js";import"./chain-gSz1IcKJ.js";import"./index-BiG_-6RV.js";import"./usePopper-B4KYEDCk.js";import"./index-B1SWNDVV.js";import"./Portal-BUS0CIYb.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BtpWxv9J.js";import"./IconCheckMark-DgOstlMS.js";import"./IconExclamationMarkCircle24-CoeDw1Gy.js";import"./IconExclamationMarkTriangle-D8xz_Yug.js";import"./IconExclamationMarkTriangle24-IE-yhapB.js";import"./IconQuestionMarkCircle-DAYxoVwf.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-96tXEc6f.js";import"./Switch-DPafk-U6.js";import"./TabItem-BEOe0GtO.js";import"./elements-BOYmskOL.js";import"./TextInput-KEne5gzk.js";import"./IconCross-BWqNvNJF.js";import"./Tree-CK5eIv4s.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-97P2ttO1.js";import"./IconCaretDown-4tsvkKKc.js";import"./IconCaretDown16-Bj3rEbGN.js";import"./IconTrashBin16-PaR349_N.js";import"./IconTrashBin24-BC31upy2.js";import"./useButton-DBnkCyXV.js";import"./useClickOutside-DBV__WvH.js";import"./EnablePortalWrapper-BAs49kRP.js";const bt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const ht=["Default","WithPortal"];export{e as Default,o as WithPortal,ht as __namedExportsOrder,bt as default};
