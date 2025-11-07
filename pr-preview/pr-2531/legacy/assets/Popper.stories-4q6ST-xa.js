import{r as p,j as t}from"./iframe-BoDZ-62Y.js";import{a as b}from"./Box-dpqcsXit.js";import{B as h}from"./Button-XdttJYYW.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Bmh9kEw6.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DM6-sKQT.js";import"./Divider-CDbGDUMW.js";import"./Dropdown-C89E-ui-.js";import"./useButton-BOiM2RrI.js";import"./useFocusable-IrRukKaY.js";import"./useFocusRing-C82xZb5f.js";import"./useEffectEvent-CL3fZGDF.js";import"./chain-CtJGAl97.js";import"./index-DniVUvLY.js";import"./FocusScope-BJM6DygL.js";import"./useOverlayTriggerState--76nwOyg.js";import"./useControlledState-D4E8YFD2.js";import"./useMenuTrigger-DfanVkFJ.js";import"./useLabels-Bn-zGoDP.js";import"./useLocalizedStringFormatter-BzyNpVuE.js";import"./context-BI_iBaQx.js";import"./VisuallyHidden-wNCK1ErZ.js";import"./helper-CVvlIGp8.js";import"./keyboard-DpnoosrG.js";import"./SelectionManager-CDCBW3Mu.js";import"./useField-BdBRqYcV.js";import"./useFormValidationState-BUePSdx-.js";import"./usePopper-fX-V3a5j.js";import"./index-Dy7Jj2P1.js";import"./MenuItem-BdhJiMlc.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-D2TbKBqd.js";import"./IconCheckMark-Bhtr2HMb.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Dcgk16SJ.js";import"./Trigger-DeSIG4eM.js";import"./IconCaretDown-tlfhZzfs.js";import"./IconCaretDown16-Dfz3_L5B.js";import"./IconCross-CFotdVXc.js";import"./IconExclamationMarkTriangle-BjTSrBRl.js";import"./IconExclamationMarkTriangle24-C8IyBX4S.js";import"./IconTrashBin16-Cx4-ceNO.js";import"./IconTrashBin24-gvulk-5K.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B-SFKPCM.js";import"./Portal-Cd-p_RwN.js";import"./useMemoizedId-DSzFtEMc.js";import"./FormControl-DkAU8isK.js";import"./InputLabel-RHUqZBiI.js";import"./TooltipIcon-BCLIHycj.js";import"./LegacyTooltip-DnSpI6bL.js";import"./useLink-ntWqaK50.js";import"./IconExclamationMarkCircle24-DwluY09Y.js";import"./IconQuestionMarkCircle-DGkGHnN8.js";import"./Switch-C8qfsnGD.js";import"./TabItem-BNybx-7f.js";import"./TextInput-C4npCLQz.js";import"./Tree-C1AwpO8S.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BnjlGsM0.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
