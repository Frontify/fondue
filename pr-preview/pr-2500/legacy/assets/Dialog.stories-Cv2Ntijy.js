import{r as l,j as o}from"./iframe-UQ-0H_EQ.js";import{B as b}from"./Button-P7BIUmCy.js";import{D as x}from"./DialogBody-CrPXBWc0.js";import{D as I}from"./DialogFooter-tkgG0Jmn.js";import{I as A}from"./IconJohanna-OqDs-YyA.js";import{D as B}from"./Dialog-Cx5L2TM8.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C9_mj7KT.js";import"./useButton-CaQcq_VD.js";import"./useFocusable-K9NgQBjW.js";import"./useFocusRing-CPN3fKV8.js";import"./useEffectEvent-vUcOvX74.js";import"./chain-CzUm7sbH.js";import"./index-fcY41WQ9.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CNjMlNbx.js";import"./borderStyle-D9jrV09G.js";import"./input-rjWhWRsb.js";import"./Checkbox-nL6xvEed.js";import"./useFormValidationState-DH0bBYMX.js";import"./useControlledState-DyP2h4uz.js";import"./InputLabel-DIZCK32L.js";import"./TooltipIcon-pQqblyws.js";import"./LegacyTooltip-D2XRdfzl.js";import"./useLink--dr1hXBz.js";import"./usePopper-DpGtHs7K.js";import"./index-DUo0YOzp.js";import"./Portal-B8xjT20O.js";import"./useMemoizedId-cIDGoJqf.js";import"./IconCheckMark-Lic7jvaJ.js";import"./IconExclamationMarkCircle24-CmLZRoRK.js";import"./IconExclamationMarkTriangle-K7neV5TM.js";import"./IconExclamationMarkTriangle24-C_rjSlB6.js";import"./IconQuestionMarkCircle-C4YmLybr.js";import"./IconMinus-D365w0eX.js";import"./Divider-hg_osFaL.js";import"./Dropdown-Re5gK8tf.js";import"./FocusScope-CX_7qKJM.js";import"./useOverlayTriggerState-BWlP_pY7.js";import"./useMenuTrigger-uiH_EoDe.js";import"./useLabels-pIsm5jB9.js";import"./useLocalizedStringFormatter-Bd-jBhYh.js";import"./context-CcN6Mgd4.js";import"./VisuallyHidden-DujC8zG5.js";import"./helper-B9WpLzaj.js";import"./keyboard-CapSEwjy.js";import"./SelectionManager-pXRWXaqJ.js";import"./useField-D2h8_JGA.js";import"./MenuItem-BzYX1UN3.js";import"./IconCaretRight-Vm4bcQet.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-KbYNzLEL.js";import"./Trigger-mo0TyR9Q.js";import"./IconCaretDown-k67zgOvt.js";import"./IconCaretDown16-Rltc1H2Q.js";import"./IconCross-DTn1rkKH.js";import"./IconTrashBin16-By8fAgtB.js";import"./IconTrashBin24-BfKejfxE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-ChMpwNSj.js";import"./FormControl-DT1Gnbwv.js";import"./Switch-BMBUHncz.js";import"./TabItem-B7YOxnuV.js";import"./TextInput-BXUiVRYX.js";import"./Tooltip-0iCC_CjO.js";import"./useClickOutside-Cje_y0nI.js";import"./Tree-CAsS334m.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-C__vMByt.js";const wo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Close',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Close',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var D,h,y;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Close',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const zo=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,zo as __namedExportsOrder,wo as default};
