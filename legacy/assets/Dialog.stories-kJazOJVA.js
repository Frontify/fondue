import{r as l,j as o}from"./iframe-e0U6nGdg.js";import{B as I}from"./Button-Ctisb_6d.js";import{D as b}from"./DialogBody-Dx17wxf9.js";import{D as x}from"./DialogFooter-B212lXOx.js";import{I as A}from"./IconIcon-DYkysxgB.js";import{D as B}from"./Dialog-Dj5ylXRR.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-Bcy8TYTN.js";import"./useFocusable-C6iyQpXI.js";import"./useFocusRing-DSof9HDA.js";import"./useEffectEvent-Dhi-9t88.js";import"./chain-DPcgUXMv.js";import"./index-D5FaRCKO.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CcTnB5oC.js";import"./borderStyle-D9jrV09G.js";import"./input-CdSZxFhx.js";import"./Checkbox-D4Z7gexS.js";import"./useFormValidationState-C2mn5rNF.js";import"./useControlledState-BpQJraUT.js";import"./InputLabel-CFiujHKp.js";import"./TooltipIcon-CNBwvO0d.js";import"./LegacyTooltip-DKPRkd1X.js";import"./useLink-CL9Z2HKk.js";import"./usePopper-Cpih_rft.js";import"./index-98LXcvpt.js";import"./Portal-VBGCNkL3.js";import"./useMemoizedId-CqqrNheS.js";import"./IconCheckMark-CfVKgjOK.js";import"./IconExclamationMarkCircle24-B6aWDheE.js";import"./IconExclamationMarkTriangle-U04woIfm.js";import"./IconExclamationMarkTriangle24-CAomuIhH.js";import"./IconQuestionMarkCircle-DyI4ZTBV.js";import"./IconMinus-EZG3KcaU.js";import"./Divider-CdfwzZMT.js";import"./Dropdown-lFxzrlsx.js";import"./FocusScope-BSeNmLNv.js";import"./useOverlayTriggerState-BQIEtMUz.js";import"./useMenuTrigger-CORkgcEy.js";import"./useLabels-Bh4FvyUH.js";import"./useLocalizedStringFormatter-CR04K9do.js";import"./context-CWMRxbca.js";import"./VisuallyHidden-CLSFgs5F.js";import"./helper-C2pKKaKh.js";import"./keyboard-CE97L4wN.js";import"./SelectionManager-BKU4lwyk.js";import"./useField-59HGCYzs.js";import"./MenuItem-B4scu5yA.js";import"./IconCaretRight-yWjutZzx.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Cs7quV73.js";import"./Trigger-Cxb9EGeR.js";import"./IconCaretDown-OtaJb8ue.js";import"./IconCaretDown16-LpGbVMin.js";import"./IconCross-ug7GD-W-.js";import"./IconTrashBin16-CWZYWSrk.js";import"./IconTrashBin24-CQrz4dri.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DoN8BKVL.js";import"./FormControl-BlwtdXQF.js";import"./Switch-CfCV9d5U.js";import"./TabItem-C65zp8VY.js";import"./TextInput-BnQ0OsaS.js";import"./Tooltip-DjWQa5nG.js";import"./useClickOutside-DuZ-KBg9.js";import"./Tree-Cnd7JCjb.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CLcAQBie.js";import"./IconIcon16--szuSDKW.js";import"./IconIcon24-yvVAivXL.js";const Go={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
