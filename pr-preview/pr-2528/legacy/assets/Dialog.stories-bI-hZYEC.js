import{r as l,j as o}from"./iframe-B6Fsh8wO.js";import{B as I}from"./Button-CTeWu5QI.js";import{D as b}from"./DialogBody-sd0Hzl4i.js";import{D as x}from"./DialogFooter-BFAaz8La.js";import{I as A}from"./IconIcon-X4VK5Uiq.js";import{D as B}from"./Dialog-DsRTIkvd.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C7xgB0v-.js";import"./useButton-C_YFdV8A.js";import"./useFocusable-CeOvDitS.js";import"./useFocusRing-Bdrp9XdB.js";import"./useEffectEvent-Dl59sVm-.js";import"./chain-C6B0p970.js";import"./index-CoZ5L15w.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DZIHhLpx.js";import"./borderStyle-D9jrV09G.js";import"./input-SgIqKYa5.js";import"./Divider-Bnk8qrLs.js";import"./Dropdown-BEGPwQIj.js";import"./FocusScope-ClH7KjZa.js";import"./useOverlayTriggerState-1mg1A1KF.js";import"./useControlledState-CJn3VMU_.js";import"./useMenuTrigger-BYllBfWO.js";import"./useLabels-zcWK2wri.js";import"./useLocalizedStringFormatter-CQaq9hql.js";import"./context-CsJ_YUC1.js";import"./VisuallyHidden-DG9XBPVM.js";import"./helper-BJlGUtn-.js";import"./keyboard-Cw3s1FpC.js";import"./SelectionManager-Bua5579K.js";import"./useField-CSBdA6n2.js";import"./useFormValidationState-cJc_Go-N.js";import"./usePopper-B0nz0Esg.js";import"./index-Bx1oau7k.js";import"./MenuItem-CradgR82.js";import"./IconCaretRight-DpO6Gkbq.js";import"./IconCheckMark-DssBFA02.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BbWdkKq5.js";import"./Trigger-CFa4fkib.js";import"./IconCaretDown-B5NftqOx.js";import"./IconCaretDown16-a2jOArLI.js";import"./IconCross-CoWtkC50.js";import"./IconExclamationMarkTriangle-C2uJYOwY.js";import"./IconExclamationMarkTriangle24-DDo1kmbH.js";import"./IconTrashBin16-BvngYm6R.js";import"./IconTrashBin24-Coai0v3x.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BvIBe2v_.js";import"./Portal-ig7PMOYe.js";import"./useMemoizedId-DHoNY-YT.js";import"./FormControl-CZcnzlmK.js";import"./InputLabel-C3itSB6h.js";import"./TooltipIcon-BseKfH2P.js";import"./LegacyTooltip-DclvBP1X.js";import"./useLink-Dk33Rpfs.js";import"./IconExclamationMarkCircle24-xFA6TqE-.js";import"./IconQuestionMarkCircle-sp7lPGqD.js";import"./Switch-DUWVxLi-.js";import"./TabItem-1rwAvsm2.js";import"./TextInput-B_U6EtAR.js";import"./Tooltip-DWGrBfIB.js";import"./useClickOutside-BAGN5dDk.js";import"./Tree-Cyx_z67h.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BUlXl2Xn.js";import"./IconIcon16-C5UnHEsZ.js";import"./IconIcon24-CCm8Wx90.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
