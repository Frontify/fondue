import{r as p,j as t}from"./iframe-B8HjM2bH.js";import{a as b}from"./Box-bVNTwxZW.js";import{B as h}from"./Button-Cxlg_Jlu.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DzWMZmIs.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Bv0LnrNd.js";import"./Divider-CScJkmxy.js";import"./FormControl-CdhDe2yr.js";import"./InputLabel-BY8Y4V_H.js";import"./TooltipIcon-BcHMbg4P.js";import"./LegacyTooltip-D1gEUfx1.js";import"./useLink-By4Pag_x.js";import"./useFocusable-CZmCl03Y.js";import"./useFocusRing-3Gw7Pb6L.js";import"./useEffectEvent-DldudAt0.js";import"./chain-DcfYi800.js";import"./index-DQu1qdiw.js";import"./usePopper-aUIx4INC.js";import"./index-e4lb8Yn9.js";import"./Portal-CydnS4Q0.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C7w6N4e1.js";import"./IconCheckMark-D2gcRUJK.js";import"./IconExclamationMarkCircle24-BZjJkaig.js";import"./IconExclamationMarkTriangle-0oh_v4Q_.js";import"./IconExclamationMarkTriangle24-Cug0QU8I.js";import"./IconQuestionMarkCircle-M_tmPE3y.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CsRn3Dui.js";import"./Switch-Dgyq-URC.js";import"./TabItem-_0QyVAb0.js";import"./elements-BOYmskOL.js";import"./TextInput-6wrBtR06.js";import"./IconCross-DNgwupST.js";import"./Tree-dBPfT1V8.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-qLWd3HsL.js";import"./IconCaretDown-jnmRmvBC.js";import"./IconCaretDown16-DooVhUZz.js";import"./IconTrashBin16-D23_ZH0V.js";import"./IconTrashBin24-DkqIbv5B.js";import"./useButton-B3xO9RgR.js";import"./useClickOutside-DEQ-8D9O.js";import"./EnablePortalWrapper-mRPgidZV.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
