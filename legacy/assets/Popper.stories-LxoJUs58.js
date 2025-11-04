import{r as p,j as t}from"./iframe-BA0Mz7oG.js";import{a as b}from"./Box-6EgFzlg5.js";import{B as h}from"./Button-BMcKUNaS.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CUfVLjDz.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BhY5ATgP.js";import"./Divider-BQTpcCZ1.js";import"./Dropdown-m3PlXCHT.js";import"./useButton-C3UyT0Z5.js";import"./useFocusable-B19sJuLq.js";import"./useFocusRing-DV-myszv.js";import"./useEffectEvent-CUAIJOQt.js";import"./chain-BmiFarN7.js";import"./index-C8Y1Fo5J.js";import"./FocusScope-1wMxK_PV.js";import"./useOverlayTriggerState-Zz4T26iK.js";import"./useControlledState-DUTcD0La.js";import"./useMenuTrigger-DReJd5tq.js";import"./useLabels-CvZxNEa3.js";import"./useLocalizedStringFormatter-BXDW7lKW.js";import"./context-CFhd1GSa.js";import"./VisuallyHidden-BmYzMKFw.js";import"./helper-BEDA2E7r.js";import"./keyboard-CJWK3Pb7.js";import"./SelectionManager-CMBHO6YV.js";import"./useField-BBXdNT_C.js";import"./useFormValidationState-uGPj3SfU.js";import"./usePopper-BboI6ZtD.js";import"./index-_rDBBRbe.js";import"./MenuItem-DyVT4swA.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DFhJNzD7.js";import"./IconCheckMark-jgsk33Ac.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DVhJLBvl.js";import"./Trigger-WKBugyiB.js";import"./IconCaretDown-BIBe4WwZ.js";import"./IconCaretDown16-DJi1Y7nM.js";import"./IconCross-Dz3mCt_c.js";import"./IconExclamationMarkTriangle-ChaJ9IRd.js";import"./IconExclamationMarkTriangle24-nnnmpyhC.js";import"./IconTrashBin16-J_Xa8eUp.js";import"./IconTrashBin24-B1AFtuTy.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Jb0Q3zWN.js";import"./Portal-FaQGc_aH.js";import"./useMemoizedId-BOmFmYFD.js";import"./FormControl-BpVZp6SF.js";import"./InputLabel-CaL3IwWg.js";import"./TooltipIcon-D1mkVicS.js";import"./LegacyTooltip-3QXpUEwW.js";import"./useLink-88124U24.js";import"./IconExclamationMarkCircle24-CoHtCN_U.js";import"./IconQuestionMarkCircle-BR4Rojrk.js";import"./Switch-Dy7-sb6F.js";import"./TabItem-2OFAmaau.js";import"./TextInput-WvGvOj3y.js";import"./Tree-CybCrDUv.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BBPHLqZS.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
