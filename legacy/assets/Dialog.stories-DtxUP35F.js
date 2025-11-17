import{r as l,j as o}from"./iframe-BP2CU-yP.js";import{B as I}from"./Button-C-3Fa5Ls.js";import{D as b}from"./DialogBody-_qCFDSeV.js";import{D as x}from"./DialogFooter-BK1PViyK.js";import{I as A}from"./IconIcon-CdHmM92a.js";import{D as B}from"./Dialog-B1UJ4TFX.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-aYYMNIxJ.js";import"./useFocusable-C5q4NZDS.js";import"./useFocusRing-BnboNt0j.js";import"./useEffectEvent-CGuTipkA.js";import"./chain-BiXvkzln.js";import"./index-BoRfSx69.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Bx5CnSCJ.js";import"./borderStyle-D9jrV09G.js";import"./input-9GwPWngM.js";import"./Divider-B3SmHgDa.js";import"./Dropdown-gYzsCQLW.js";import"./FocusScope-BetiZtbM.js";import"./useOverlayTriggerState-u4FxR0RE.js";import"./useControlledState-DPXhSBgu.js";import"./useMenuTrigger-ByCru9Le.js";import"./useLabels-bw4KyvQk.js";import"./useLocalizedStringFormatter-Bedmu0Pg.js";import"./context-YRYeag35.js";import"./VisuallyHidden-Butslc9_.js";import"./helper-D4MzQWk9.js";import"./keyboard-BMlXCcse.js";import"./SelectionManager-CbmN7u3I.js";import"./useField-Di0nDpYX.js";import"./useFormValidationState-DhiC4loc.js";import"./usePopper-BLQqXuyD.js";import"./index-Cge92rrD.js";import"./MenuItem-DhLMTqse.js";import"./IconCaretRight-DGX_KZOu.js";import"./IconCheckMark-B_3zbcIN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-FgiKMPQ3.js";import"./Trigger-DtjfxI7P.js";import"./IconCaretDown-BNVzBaFD.js";import"./IconCaretDown16-B3ctgNCO.js";import"./IconCross-cMp8LwNs.js";import"./IconExclamationMarkTriangle-CVr7CKTF.js";import"./IconExclamationMarkTriangle24-B0qCF7zC.js";import"./IconTrashBin16-CaF7wq5n.js";import"./IconTrashBin24-D3L5wCAo.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BGgbsw9K.js";import"./Portal-tSMg1HjP.js";import"./useMemoizedId-DtVVAJB2.js";import"./FormControl-BKtuxNIa.js";import"./InputLabel-BiKWvlC6.js";import"./TooltipIcon-MAdJASIs.js";import"./LegacyTooltip-hCfehiCo.js";import"./useLink-05sd-Mp9.js";import"./IconExclamationMarkCircle24-Y9Ak_ctV.js";import"./IconQuestionMarkCircle-v2eSKpOk.js";import"./Switch-ToBiHmVz.js";import"./TabItem-Df3HGQzI.js";import"./TextInput-wkuu5ZKt.js";import"./Tooltip-BWNlMJfu.js";import"./useClickOutside-C79_q4GG.js";import"./Tree-BjALeDwV.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-0YbZ4O5a.js";import"./IconIcon16-COOgjphp.js";import"./IconIcon24-E2COea6K.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
