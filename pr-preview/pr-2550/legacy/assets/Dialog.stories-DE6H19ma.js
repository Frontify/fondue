import{r as l,j as o}from"./iframe-CfHul4zo.js";import{B as I}from"./Button-yVTYwQF-.js";import{D as b}from"./DialogBody-CJA0aClO.js";import{D as x}from"./DialogFooter-BRixvqm2.js";import{I as A}from"./IconIcon-CNXP-982.js";import{D as B}from"./Dialog-DN28qe2t.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DGVESE2Y.js";import"./useButton-Tz8k-_dn.js";import"./useFocusable-DMcslFXz.js";import"./useFocusRing-CMXhC2Tr.js";import"./useEffectEvent-BA6W-niS.js";import"./chain-D01RV-BB.js";import"./index-BQh5Qvqv.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DWc3RaMk.js";import"./borderStyle-D9jrV09G.js";import"./input-BQ3-k5yA.js";import"./Divider-Ct-tQ-h4.js";import"./Dropdown-drSynxKp.js";import"./FocusScope-BU1r3MNk.js";import"./useOverlayTriggerState-fu6QxPju.js";import"./useControlledState-DWLvV7Kk.js";import"./useMenuTrigger-piZx4JdZ.js";import"./useLabels-B2i90Hmc.js";import"./useLocalizedStringFormatter-D-tQgrhX.js";import"./context-CkQAkJT0.js";import"./VisuallyHidden-D-_1MwRP.js";import"./helper-DH7p5BiF.js";import"./keyboard-C3O1P05s.js";import"./SelectionManager-DRJQujp9.js";import"./useField-OuJImVmy.js";import"./useFormValidationState-CpREol_8.js";import"./usePopper-BhC1HryF.js";import"./index-nR_hwZH7.js";import"./MenuItem-D0wc4E1q.js";import"./IconCaretRight-DxGV9b_J.js";import"./IconCheckMark-hTuOn1t1.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DM3UByCT.js";import"./Trigger-BG67Y8TQ.js";import"./IconCaretDown-B2eZL06g.js";import"./IconCaretDown16-Cr2-qVY-.js";import"./IconCross-CZwEoPe9.js";import"./IconExclamationMarkTriangle-C-NbryAn.js";import"./IconExclamationMarkTriangle24-BC2X3acG.js";import"./IconTrashBin16-C3L3dvvP.js";import"./IconTrashBin24-C-K3RNTI.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cxu6-oTj.js";import"./Portal-MV_EP8tM.js";import"./useMemoizedId-mjLZu6N7.js";import"./FormControl-BJwGzdAi.js";import"./InputLabel-NupPFZ6B.js";import"./TooltipIcon-DRxhJRRV.js";import"./LegacyTooltip-CtVbOESt.js";import"./useLink-BnTw1_kr.js";import"./IconExclamationMarkCircle24-WVgUA76S.js";import"./IconQuestionMarkCircle-r1HcYP-T.js";import"./Switch-BeKBv92A.js";import"./TabItem-DIbC2qoD.js";import"./TextInput-D5t55ewG.js";import"./Tooltip-D6op7Snd.js";import"./useClickOutside-CwYTT1XC.js";import"./Tree-CsfF529C.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BwiP4Ryz.js";import"./IconIcon16-BBQMJ77C.js";import"./IconIcon24-XoN0PcZ_.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Po=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,Po as __namedExportsOrder,zo as default};
