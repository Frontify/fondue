import{r as s,j as e}from"./iframe-DOM37agV.js";import{a as b}from"./Box-B0ELCmFz.js";import{B as h}from"./Button-DiGpwDcf.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-EOh5NcyS.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Nz92x7gc.js";import"./Divider-CrV3oQlK.js";import"./FormControl-DKsN1Rfq.js";import"./InputLabel-D7wxk9x2.js";import"./TooltipIcon-BvUbNbiu.js";import"./LegacyTooltip-CdOA6H3p.js";import"./useLink-BBb1g4_o.js";import"./useFocusable-IutlfFAf.js";import"./useFocusRing-Y0kliFz7.js";import"./useEffectEvent-D8BbqtYc.js";import"./chain-OtGBq9pX.js";import"./index-hK0Kzaf0.js";import"./usePopper-BpZSDAoM.js";import"./index-KpBi3IuA.js";import"./Portal-D4YMrFe-.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DF5ffgkO.js";import"./IconCheckMark-Cm9Tsc5r.js";import"./IconExclamationMarkCircle24-DHhJuj7N.js";import"./IconExclamationMarkTriangle-fkj1ZUwM.js";import"./IconExclamationMarkTriangle24-NQBm-Sna.js";import"./IconQuestionMarkCircle-DlHNnYiG.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CFtaE7te.js";import"./Switch-hOj7OoDh.js";import"./TabItem-DjhzX8wu.js";import"./elements-BOYmskOL.js";import"./TextInput-BrRaOg_s.js";import"./IconCross-LucYcRSr.js";import"./Tree-Bvp5EjwB.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CVuvhfes.js";import"./useClickOutside-Bpo0gZ8k.js";import"./EnablePortalWrapper-Dty1AGJe.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
