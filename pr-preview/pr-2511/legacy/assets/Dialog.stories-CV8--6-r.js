import{r as l,j as o}from"./iframe-DWfSlb0i.js";import{B as I}from"./Button-DfZJCDFK.js";import{D as b}from"./DialogBody-BQqzXCEu.js";import{D as x}from"./DialogFooter-kBXbVCPE.js";import{I as A}from"./IconIcon-CQsZulAl.js";import{D as B}from"./Dialog-BhP1WexG.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-sQDyWCwb.js";import"./useButton-kVvP6TUN.js";import"./useFocusable-DOCSmQza.js";import"./useFocusRing-DXr4GaW4.js";import"./useEffectEvent-CI6MWEdz.js";import"./chain-BD6ckHh_.js";import"./index-RS2pu7zh.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-B8vdQMYS.js";import"./borderStyle-D9jrV09G.js";import"./input-DJgw3DOR.js";import"./Checkbox-3AnZEutj.js";import"./useFormValidationState-A3yoOfI8.js";import"./useControlledState-DnAESSBa.js";import"./InputLabel-vAeK8DpM.js";import"./TooltipIcon-loeESxcb.js";import"./LegacyTooltip-8KnSS8qw.js";import"./useLink-DD_m4zw3.js";import"./usePopper-DE0FsvRn.js";import"./index-C2E5ku4L.js";import"./Portal--5uNvX5p.js";import"./useMemoizedId-D3p_iY0w.js";import"./IconCheckMark-CWf5DU7H.js";import"./IconExclamationMarkCircle24-CzamvZqc.js";import"./IconExclamationMarkTriangle-BTKn1CzC.js";import"./IconExclamationMarkTriangle24-BF-tkgi1.js";import"./IconQuestionMarkCircle-BhvUbj5E.js";import"./IconMinus-DuFXUXkh.js";import"./Divider-DnBABlP5.js";import"./Dropdown-BHsiTQV7.js";import"./FocusScope-BTNrxNkp.js";import"./useOverlayTriggerState-DWWP11B4.js";import"./useMenuTrigger-Du4Opddv.js";import"./useLabels-CvtAt0UP.js";import"./useLocalizedStringFormatter-C7DvXs9K.js";import"./context-hKhapaoN.js";import"./VisuallyHidden-DZNryNZ3.js";import"./helper-vBDadUUD.js";import"./keyboard-CWtqk4ZZ.js";import"./SelectionManager-zjrIR6Hq.js";import"./useField-Bh5nUEEB.js";import"./MenuItem-CVfzkKbS.js";import"./IconCaretRight-B8cJ3Bt3.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C5zj3N-A.js";import"./Trigger-BpYCVTVr.js";import"./IconCaretDown-CS4fl5qd.js";import"./IconCaretDown16-DXYTdGKY.js";import"./IconCross-BkSH3053.js";import"./IconTrashBin16-C5mIjvXn.js";import"./IconTrashBin24-B9qsB300.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-T0srCoF2.js";import"./FormControl-ny2reeax.js";import"./Switch-D2be-V_f.js";import"./TabItem-C-vbuzzy.js";import"./TextInput-_VQAd_TX.js";import"./Tooltip-jPx8IgnA.js";import"./useClickOutside-C0rCeFHZ.js";import"./Tree-ClX99oC1.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Dto_u-N_.js";import"./IconIcon16-CxY4vcIz.js";import"./IconIcon24-CwAEmp0G.js";const Go={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconIcon />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
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
            <Button icon={<IconIcon />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
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
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var D,y,h;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconIcon />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Jo=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,Jo as __namedExportsOrder,Go as default};
