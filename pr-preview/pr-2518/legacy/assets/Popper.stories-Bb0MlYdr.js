import{r as p,j as t}from"./iframe-kngfDPEG.js";import{a as b}from"./Box-DQBVfBAE.js";import{B as h}from"./Button-BZtxkfxV.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-3YzWT-YS.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CPiS4doV.js";import"./Divider-Cf5zUgQ7.js";import"./FormControl-f1W06x8v.js";import"./InputLabel-C9ZYNPh0.js";import"./TooltipIcon-BZC71_IX.js";import"./LegacyTooltip-DNDlbxhI.js";import"./useLink-C3GGxv9L.js";import"./useFocusable-n6OioW4O.js";import"./useFocusRing-BjExWO2j.js";import"./useEffectEvent-CJqTmzZl.js";import"./chain-in-mWhUb.js";import"./index-CHehbGeL.js";import"./usePopper-7HdWWgYn.js";import"./index-If30J-cP.js";import"./Portal-BvFDYbjI.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BogoyU0M.js";import"./IconCheckMark-2NbQy_z9.js";import"./IconExclamationMarkCircle24-BhqLal-a.js";import"./IconExclamationMarkTriangle-B10BBBW0.js";import"./IconExclamationMarkTriangle24-Dg0GvT5L.js";import"./IconQuestionMarkCircle-BGeWBI9D.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DXguGuwB.js";import"./Switch-DP1G2y7J.js";import"./TabItem-CFf9baU2.js";import"./elements-BOYmskOL.js";import"./TextInput-BxdH_gud.js";import"./IconCross-BYlHLI4K.js";import"./Tree-D_ybzPGr.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-gkmMSaT6.js";import"./IconCaretDown-DHNgrrol.js";import"./IconCaretDown16-Bil06QTJ.js";import"./IconTrashBin16-CXSxtIUR.js";import"./IconTrashBin24-SuLulnGg.js";import"./useButton-cNbp-jhI.js";import"./useClickOutside-B5w92qwH.js";import"./EnablePortalWrapper-D6GzFVoL.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
