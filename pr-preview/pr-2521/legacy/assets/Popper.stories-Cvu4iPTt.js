import{r as p,j as t}from"./iframe-BCnoYE3v.js";import{a as b}from"./Box-CpZt1Cbh.js";import{B as h}from"./Button-KRRI2ROt.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-DAW2sPOn.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DVAx1I1O.js";import"./Checkbox-BJPmY04E.js";import"./useFocusable-BBZX1YeC.js";import"./useFocusRing-Bt6TIjh0.js";import"./useEffectEvent-Cl2TEo8j.js";import"./chain-RHkf15pv.js";import"./index-B1Ba_Hxv.js";import"./useFormValidationState-DeO7vRLY.js";import"./useControlledState-D-ye-mCq.js";import"./InputLabel-DZ0wBnnP.js";import"./TooltipIcon-BHPjB9_w.js";import"./LegacyTooltip-ywfbnU0Y.js";import"./useLink-AT_Qezkp.js";import"./usePopper-CSBCD_Iq.js";import"./index-DPhmVeXH.js";import"./Portal-BgzAls8n.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BkXgJuWW.js";import"./IconCheckMark-G4vdsaU_.js";import"./IconExclamationMarkCircle24-_8_MiX60.js";import"./IconExclamationMarkTriangle-CZrmTRcm.js";import"./IconExclamationMarkTriangle24-C26brak3.js";import"./IconQuestionMarkCircle-D1o3Q7kb.js";import"./IconMinus-EfteyY8R.js";import"./Divider-C5OnfpLt.js";import"./FormControl-yt0CRSo5.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DDJ9to7C.js";import"./Switch-BacF1OQD.js";import"./TabItem-DgZmaAfE.js";import"./elements-BOYmskOL.js";import"./TextInput-Cg55WOmg.js";import"./IconCross-DA4M5IUx.js";import"./Tree-fyDDg268.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-Dc4hn-aq.js";import"./useClickOutside-DzvhqzKg.js";import"./EnablePortalWrapper-Dbw9xd1X.js";import"./dialog-D9O7a7Fm.js";const ft={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const wt=["Default","WithPortal"];export{e as Default,o as WithPortal,wt as __namedExportsOrder,ft as default};
