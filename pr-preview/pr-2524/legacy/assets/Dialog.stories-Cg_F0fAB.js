import{r as l,j as o}from"./iframe-DHJNyQxo.js";import{B as I}from"./Button-Bz5l9fFw.js";import{D as b}from"./DialogBody-B4X60cKO.js";import{D as x}from"./DialogFooter-BZ9Ove5l.js";import{I as A}from"./IconIcon-BNQ-ve5p.js";import{D as B}from"./Dialog-DVDAGNkT.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B3whO8fc.js";import"./useButton-DwubD-XP.js";import"./useFocusable-D5HdRnEL.js";import"./useFocusRing-DhzU2rzG.js";import"./useEffectEvent-DYQItPuc.js";import"./chain-B5RY7uR0.js";import"./index-BxGX3BcV.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C_iYJlA_.js";import"./borderStyle-D9jrV09G.js";import"./input-D_k0C73b.js";import"./Divider-BXeSGeKm.js";import"./Dropdown-d5_LYKcZ.js";import"./FocusScope-DX9B5RKj.js";import"./useOverlayTriggerState-BEkkRvA4.js";import"./useControlledState-DUIHJl1j.js";import"./useMenuTrigger-CjE0IAFF.js";import"./useLabels-CfNjFPp8.js";import"./useLocalizedStringFormatter-D1oZF1Ci.js";import"./context-BlFbVras.js";import"./VisuallyHidden-JaYy16_u.js";import"./helper-DQGEWuSf.js";import"./keyboard-C3lyFOtL.js";import"./SelectionManager-Br4fKZAs.js";import"./useField-54V9F_KU.js";import"./useFormValidationState-j_DXGcLe.js";import"./usePopper-CVebcDly.js";import"./index-BO7U6kLL.js";import"./MenuItem-BNKaaE7-.js";import"./IconCaretRight-C3fT22HC.js";import"./IconCheckMark-C0I6DwCb.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DlwenYNP.js";import"./Trigger-DvjgR99v.js";import"./IconCaretDown-Dn1fGRBq.js";import"./IconCaretDown16-Bt3L5TZm.js";import"./IconCross-CeLFj-Tn.js";import"./IconExclamationMarkTriangle-D-qwnL_a.js";import"./IconExclamationMarkTriangle24-Bcm1eOQj.js";import"./IconTrashBin16-BgOvfRku.js";import"./IconTrashBin24-Ba6vzsX_.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DIZ4PN6h.js";import"./Portal-BBTX_6xk.js";import"./useMemoizedId-BjgiKJF8.js";import"./FormControl-D_wxmtI1.js";import"./InputLabel-BC2n9p1e.js";import"./TooltipIcon-sv_lbCi_.js";import"./LegacyTooltip-2VrwoOLQ.js";import"./useLink-C3wnjwwv.js";import"./IconExclamationMarkCircle24-GljXm9kR.js";import"./IconQuestionMarkCircle-C1-1BR4o.js";import"./Switch-fnjkMqwf.js";import"./TabItem-Czu4RU1S.js";import"./TextInput-DVwsuleh.js";import"./Tooltip-o6mjVQnL.js";import"./useClickOutside-CvOBOSKF.js";import"./Tree-D0c1EG9_.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-COgZPegj.js";import"./IconIcon16-1P5WiTce.js";import"./IconIcon24-BS-upCXW.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
