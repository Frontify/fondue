import{r as s,j as e}from"./iframe-CbGYZ4d2.js";import{a as b}from"./Box-QKYjBALX.js";import{B as h}from"./Button-CqXSq8B3.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Denlgojj.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-gI44225F.js";import"./Divider-tx3C6hoD.js";import"./FormControl-Dn8cCnlG.js";import"./InputLabel-DJsZR9-z.js";import"./TooltipIcon-C8oDJz_7.js";import"./LegacyTooltip-CqusjEKw.js";import"./useLink-BfvUuMQH.js";import"./useFocusable-kLaZholP.js";import"./useFocusRing-DGmeO2rt.js";import"./useEffectEvent-DAfYCsqI.js";import"./chain-BzzeQIdr.js";import"./index-CZqoh8c1.js";import"./usePopper-BzVjy6a_.js";import"./index-D2eKQUPk.js";import"./Portal-DJoFKlsy.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-B6LXK-YA.js";import"./IconCheckMark-C1QsHy_I.js";import"./IconExclamationMarkCircle24-iYc07DtD.js";import"./IconExclamationMarkTriangle-CUe1kozD.js";import"./IconExclamationMarkTriangle24-Bvc9T5sY.js";import"./IconQuestionMarkCircle-CdAQT8B4.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Cwedndk8.js";import"./Switch-Cyy-nlb2.js";import"./TabItem-Dqp3LWzM.js";import"./elements-BOYmskOL.js";import"./TextInput-B6YkG45Y.js";import"./IconCross-BdofMOPw.js";import"./useButton-Dayt-QbG.js";import"./useClickOutside-oSG1cT17.js";import"./EnablePortalWrapper-CbCDcKJ6.js";import"./dialog-D9O7a7Fm.js";const ie={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const ce=["Default","WithPortal"];export{t as Default,o as WithPortal,ce as __namedExportsOrder,ie as default};
