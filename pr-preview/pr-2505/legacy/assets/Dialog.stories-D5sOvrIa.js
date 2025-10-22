import{r as l,j as o}from"./iframe-DvE_Cfbx.js";import{B as b}from"./Button-D4w0aNJF.js";import{D as x}from"./DialogBody-e7l6N9bm.js";import{D as I}from"./DialogFooter-DTyhCwEE.js";import{I as A}from"./IconJohanna-CaX0CZFj.js";import{D as B}from"./Dialog-B2JeAH2L.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DpV-BRze.js";import"./useButton-Cnlh5iFm.js";import"./useFocusable-YbUi6w36.js";import"./useFocusRing-DzW8Z_47.js";import"./useEffectEvent-BtTn6BuB.js";import"./chain-EXX0zfKx.js";import"./index-C1x3BvL1.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Dp80e-XP.js";import"./borderStyle-D9jrV09G.js";import"./input-BbtE7GOK.js";import"./Divider-BWXyH0fd.js";import"./Dropdown-BcR6SuzD.js";import"./FocusScope-CICA33ZM.js";import"./useOverlayTriggerState-VX9MWZa-.js";import"./useControlledState-B4RRmpoX.js";import"./useMenuTrigger-B0K6261F.js";import"./useLabels-B4qGKxij.js";import"./useLocalizedStringFormatter-uH6M_LlD.js";import"./context-CjYtJ2Dh.js";import"./VisuallyHidden-CH37k1zR.js";import"./helper-hQLxgAVw.js";import"./keyboard-Do92NHuN.js";import"./SelectionManager-DmiDq3y6.js";import"./useField-D1PK1BbW.js";import"./useFormValidationState-DTcHrzlU.js";import"./usePopper-0GpztLz0.js";import"./index-CgHmLPyd.js";import"./MenuItem-DjyGJryO.js";import"./IconCaretRight-DG2OLDac.js";import"./IconCheckMark-BnWU-4-4.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B7EbVwIE.js";import"./Trigger-WSkRExH6.js";import"./IconCaretDown-BLKtQPMT.js";import"./IconCaretDown16-tjMVBqmZ.js";import"./IconCross-ILvZHpzK.js";import"./IconExclamationMarkTriangle-CtL4mprZ.js";import"./IconExclamationMarkTriangle24-BeKRmNeI.js";import"./IconTrashBin16-Ye7gwNbF.js";import"./IconTrashBin24-D62Bq0Kp.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-VFf8OAPW.js";import"./Portal-DXJII2sF.js";import"./useMemoizedId-DamS-zza.js";import"./FormControl-DQTGT8Qd.js";import"./InputLabel-CPiknDaM.js";import"./TooltipIcon-BgeNhtJq.js";import"./LegacyTooltip-HylOrONJ.js";import"./useLink-DFHjCfB3.js";import"./IconExclamationMarkCircle24-DG3gLjOd.js";import"./IconQuestionMarkCircle-DyvTHndi.js";import"./Switch-D0uhFjX4.js";import"./TabItem-lY2wl6EQ.js";import"./TextInput-JeIEGuUe.js";import"./Tooltip-CI2uwgUy.js";import"./useClickOutside-BRVMQ9di.js";import"./Tree-CNHT-QdV.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-MyyQk_sl.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const No=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,No as __namedExportsOrder,_o as default};
