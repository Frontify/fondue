import{r as l,j as o}from"./iframe-DFnutv5M.js";import{B as b}from"./Button-DvPoOfB7.js";import{D as x}from"./DialogBody-Dv0qt-3k.js";import{D as I}from"./DialogFooter-DQnM0ZEH.js";import{I as A}from"./IconJohanna-DzcnpWC6.js";import{D as B}from"./Dialog-BpYBidcC.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DI9Pv0v-.js";import"./useButton-B9ck-Vwc.js";import"./useFocusable-C-JPn9OE.js";import"./useFocusRing-BZNNB2Hj.js";import"./useEffectEvent-DBbK-aqN.js";import"./chain-Dsa_W8ml.js";import"./index-a1h4e75G.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CCVc1H_1.js";import"./borderStyle-D9jrV09G.js";import"./input-BZ4Yt3Vy.js";import"./Divider-BnEqrrOk.js";import"./Dropdown-DoUsbxMd.js";import"./FocusScope-CzNHlT6r.js";import"./useOverlayTriggerState-BU83XqOv.js";import"./useControlledState-CO8iWZC6.js";import"./useMenuTrigger-NR-AZ6fL.js";import"./useLabels-BgJwTBe8.js";import"./useLocalizedStringFormatter-CI2DTdCM.js";import"./context-CMCPGXhG.js";import"./VisuallyHidden-CP5cAKcA.js";import"./helper-CDma-XAN.js";import"./keyboard-B9Pv78ZV.js";import"./SelectionManager-CSpmgRXH.js";import"./useField-DIDYlmQE.js";import"./useFormValidationState-C58z87tk.js";import"./usePopper-mGKvFZOV.js";import"./index-BvzBMR0H.js";import"./MenuItem-CCE2SmwD.js";import"./IconCaretRight-Qf6FLOlU.js";import"./IconCheckMark-DIQLzXWs.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DdXCySpe.js";import"./Trigger-Bc1liQcc.js";import"./IconCaretDown-CntmYteF.js";import"./IconCaretDown16-DXJrcr77.js";import"./IconCross-DSLOUOUE.js";import"./IconExclamationMarkTriangle-Dk_iCro-.js";import"./IconExclamationMarkTriangle24-DXphiQNc.js";import"./IconTrashBin16-m420LrHr.js";import"./IconTrashBin24-DSRZEAzA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B4vmv_6a.js";import"./Portal-r1TzMWAQ.js";import"./useMemoizedId-BId1lVLh.js";import"./FormControl-3LdqEtgD.js";import"./InputLabel-B_1U839I.js";import"./TooltipIcon-BRLLXESC.js";import"./LegacyTooltip-gb8qWYaE.js";import"./useLink-B28rYbuM.js";import"./IconExclamationMarkCircle24-Uarnc71I.js";import"./IconQuestionMarkCircle-DXpZoFVo.js";import"./Switch-DVVv0LyY.js";import"./TabItem-BVGGwMV_.js";import"./TextInput-BmJc5mOX.js";import"./Tooltip-Dfn4QrZ1.js";import"./useClickOutside-Cy27KqaZ.js";import"./Tree-7KbZYas7.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-fKpJkOro.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
