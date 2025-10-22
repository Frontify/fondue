import{r as p,j as t}from"./iframe-DvE_Cfbx.js";import{a as b}from"./Box-Dp80e-XP.js";import{B as h}from"./Button-D4w0aNJF.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CI2uwgUy.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BbtE7GOK.js";import"./Divider-BWXyH0fd.js";import"./Dropdown-BcR6SuzD.js";import"./useButton-Cnlh5iFm.js";import"./useFocusable-YbUi6w36.js";import"./useFocusRing-DzW8Z_47.js";import"./useEffectEvent-BtTn6BuB.js";import"./chain-EXX0zfKx.js";import"./index-C1x3BvL1.js";import"./FocusScope-CICA33ZM.js";import"./useOverlayTriggerState-VX9MWZa-.js";import"./useControlledState-B4RRmpoX.js";import"./useMenuTrigger-B0K6261F.js";import"./useLabels-B4qGKxij.js";import"./useLocalizedStringFormatter-uH6M_LlD.js";import"./context-CjYtJ2Dh.js";import"./VisuallyHidden-CH37k1zR.js";import"./helper-hQLxgAVw.js";import"./keyboard-Do92NHuN.js";import"./SelectionManager-DmiDq3y6.js";import"./useField-D1PK1BbW.js";import"./useFormValidationState-DTcHrzlU.js";import"./usePopper-0GpztLz0.js";import"./index-CgHmLPyd.js";import"./MenuItem-DjyGJryO.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DG2OLDac.js";import"./IconCheckMark-BnWU-4-4.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B7EbVwIE.js";import"./Trigger-WSkRExH6.js";import"./IconCaretDown-BLKtQPMT.js";import"./IconCaretDown16-tjMVBqmZ.js";import"./IconCross-ILvZHpzK.js";import"./IconExclamationMarkTriangle-CtL4mprZ.js";import"./IconExclamationMarkTriangle24-BeKRmNeI.js";import"./IconTrashBin16-Ye7gwNbF.js";import"./IconTrashBin24-D62Bq0Kp.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-VFf8OAPW.js";import"./Portal-DXJII2sF.js";import"./useMemoizedId-DamS-zza.js";import"./FormControl-DQTGT8Qd.js";import"./InputLabel-CPiknDaM.js";import"./TooltipIcon-BgeNhtJq.js";import"./LegacyTooltip-HylOrONJ.js";import"./useLink-DFHjCfB3.js";import"./IconExclamationMarkCircle24-DG3gLjOd.js";import"./IconQuestionMarkCircle-DyvTHndi.js";import"./Switch-D0uhFjX4.js";import"./TabItem-lY2wl6EQ.js";import"./TextInput-JeIEGuUe.js";import"./Tree-CNHT-QdV.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BRVMQ9di.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Ht=["Default","WithPortal"];export{o as Default,e as WithPortal,Ht as __namedExportsOrder,_t as default};
