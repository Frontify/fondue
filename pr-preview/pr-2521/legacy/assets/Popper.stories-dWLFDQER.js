import{r as p,j as t}from"./iframe-CKvh_O0D.js";import{a as b}from"./Box-Bfory6cf.js";import{B as h}from"./Button-C2B9rqLH.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BjN0odZj.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CViJ3JP4.js";import"./Divider-mufvFv86.js";import"./FormControl-CmMNdVj4.js";import"./InputLabel-gaO2QM9P.js";import"./TooltipIcon-D9wLxXID.js";import"./LegacyTooltip-aEVj6mIy.js";import"./useLink-D_nDgrmH.js";import"./useFocusable-C0mdWk7R.js";import"./useFocusRing-CBTQVLy0.js";import"./useEffectEvent-CbVxX_XK.js";import"./chain-CcI5vAr_.js";import"./index-DHSVcppD.js";import"./usePopper-Dz_SvH7g.js";import"./index-BJoPCn4P.js";import"./Portal-ez0oPfI-.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C453b7r0.js";import"./IconCheckMark-DMsQ3-wK.js";import"./IconExclamationMarkCircle24-gDVV5B14.js";import"./IconExclamationMarkTriangle-Dd_dKphU.js";import"./IconExclamationMarkTriangle24-n2eJ-XD1.js";import"./IconQuestionMarkCircle-CF79Z1QF.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DiILCuZN.js";import"./Switch-2JBly8xe.js";import"./TabItem-5XegVS-b.js";import"./elements-BOYmskOL.js";import"./TextInput-BhbBs923.js";import"./IconCross-DrDCoobM.js";import"./Tree-CbQ4TP0E.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-LGbyUbV3.js";import"./IconCaretDown-Cr3wBnJm.js";import"./IconCaretDown16-CfoA2FQZ.js";import"./IconTrashBin16-pZ31K1mo.js";import"./IconTrashBin24-BDdD3j9U.js";import"./useButton-Bbg4ad6K.js";import"./useClickOutside-DlLHr1kC.js";import"./EnablePortalWrapper-XJKT6JWc.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
