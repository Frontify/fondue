import{r as p,j as t}from"./iframe-DkUKKt5y.js";import{a as b}from"./Box-Dv17W1WR.js";import{B as h}from"./Button-6JaeM8mU.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Cmm_S9wY.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B9TSbNud.js";import"./Checkbox-DRqnjHKW.js";import"./useFocusable-BnodLyil.js";import"./useFocusRing-BLxiuku7.js";import"./useEffectEvent-Cx-ijvAI.js";import"./chain-CndHG7ua.js";import"./index-5vGpRYJt.js";import"./useFormValidationState-fGaqfeUN.js";import"./useControlledState-LG7onZMS.js";import"./InputLabel-blbM3kcV.js";import"./TooltipIcon-C5OnEtaA.js";import"./LegacyTooltip-D55BXxvs.js";import"./useLink-BIFW9FB1.js";import"./usePopper-D77eUAEW.js";import"./index-CBYJFN7O.js";import"./Portal-BXb_EYja.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D1DXyTps.js";import"./IconCheckMark-B0sjDw5i.js";import"./IconExclamationMarkCircle24-WOKR46An.js";import"./IconExclamationMarkTriangle-DOOWrk9t.js";import"./IconExclamationMarkTriangle24-DcTApZBc.js";import"./IconQuestionMarkCircle-BcldpYoL.js";import"./IconMinus-DDQicYL5.js";import"./Divider-qyYjCJ9L.js";import"./FormControl-BpOPhv4H.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C8tJhyot.js";import"./Switch-CFJ0_dDx.js";import"./TabItem-VZJHOXhL.js";import"./elements-BOYmskOL.js";import"./TextInput-MWeaHY13.js";import"./IconCross-C8gM1v-C.js";import"./Tree-Bzlxa0iG.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BAXULSxE.js";import"./IconCaretDown-CkHr4F8u.js";import"./IconCaretDown16-BXjV2vc4.js";import"./IconTrashBin16-BSLG_W8z.js";import"./IconTrashBin24-Ck4Mk32o.js";import"./useButton-CG_fcLKk.js";import"./useClickOutside-COZiIny8.js";import"./EnablePortalWrapper-4q6q-LSO.js";import"./dialog-D9O7a7Fm.js";const xt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var s,i,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Pt=["Default","WithPortal"];export{o as Default,e as WithPortal,Pt as __namedExportsOrder,xt as default};
