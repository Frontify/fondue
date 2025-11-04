import{r as p,j as t}from"./iframe-BdpEJ73u.js";import{a as b}from"./Box-B8xOPFrQ.js";import{B as h}from"./Button-CyrRRo22.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BeCtgi9G.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CiV_SEfN.js";import"./Divider-6_usVKa3.js";import"./FormControl-BFo-JPTy.js";import"./InputLabel-DebL1FVz.js";import"./TooltipIcon-DKBgdncx.js";import"./LegacyTooltip-ChszLcz-.js";import"./useLink-hiDguVaH.js";import"./useFocusable-dja3mNt3.js";import"./useFocusRing-BoREWGHn.js";import"./useEffectEvent-BtbNxUmw.js";import"./chain-CSPh-k5E.js";import"./index-CkqZHkB8.js";import"./usePopper-DodwAGz1.js";import"./index-DjmiaQRC.js";import"./Portal-DcQaeB9f.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CroDTlnv.js";import"./IconCheckMark-JGl78NQC.js";import"./IconExclamationMarkCircle24-oCV7DLvN.js";import"./IconExclamationMarkTriangle-BCFecG3K.js";import"./IconExclamationMarkTriangle24-DDeoj2zf.js";import"./IconQuestionMarkCircle-yKiZOJks.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-iQPwxUq0.js";import"./Switch-Cs2uWJoh.js";import"./TabItem-7kIsjaIc.js";import"./elements-BOYmskOL.js";import"./TextInput-wgiRUPvd.js";import"./IconCross-2s4J7Pvo.js";import"./Tree-CeZOBO5O.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-M8Uz0PUR.js";import"./IconCaretDown-DjMqE6GK.js";import"./IconCaretDown16-BPKmHEp2.js";import"./IconTrashBin16-D1isIcK9.js";import"./IconTrashBin24-CFqe0mJW.js";import"./useButton-CzTp58mm.js";import"./useClickOutside-yhAcwUeS.js";import"./EnablePortalWrapper-C1kCJOjn.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
