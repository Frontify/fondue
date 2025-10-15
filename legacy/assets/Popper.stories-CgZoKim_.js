import{r as s,j as e}from"./iframe-DTy7hSDB.js";import{a as b}from"./Box-B8CaeEYe.js";import{B as h}from"./Button-u3Szlpwi.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DpHHfC_y.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B6wq3pRW.js";import"./Divider-D6qgLBCM.js";import"./FormControl-Ce6rGZlg.js";import"./InputLabel-B_ubJQB3.js";import"./TooltipIcon-CizTpoEE.js";import"./LegacyTooltip-BDG39uOT.js";import"./useLink-D1XzLJMC.js";import"./useFocusable-DDn7q-OS.js";import"./useFocusRing-BF_hD86R.js";import"./useEffectEvent-DWzMvHEb.js";import"./chain-Dz97J3RG.js";import"./index-BmPKOmbc.js";import"./usePopper-CiVsTA5i.js";import"./index-CVY-dQCv.js";import"./Portal-DWemPOBz.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Du4L_hMj.js";import"./IconCheckMark-Dg23ywij.js";import"./IconExclamationMarkCircle24-D9HRm0iS.js";import"./IconExclamationMarkTriangle-YIBYFaAr.js";import"./IconExclamationMarkTriangle24-DTwuytdQ.js";import"./IconQuestionMarkCircle-adEHOKLh.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Ou7o56up.js";import"./Switch-Dt4o7jmn.js";import"./TabItem-D2ZNavNs.js";import"./elements-BOYmskOL.js";import"./TextInput-CHRYntRv.js";import"./IconCross-bYE-tDxm.js";import"./Tree-X4dp1bQ5.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CPiAOWt4.js";import"./useClickOutside-CjHzvR4j.js";import"./EnablePortalWrapper-AD12x3kU.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
