import{r as l,j as o}from"./iframe-r6J4ePyW.js";import{B as I}from"./Button-B1yAmkes.js";import{D as b}from"./DialogBody-DynW4GVE.js";import{D as x}from"./DialogFooter-BZEmuS53.js";import{I as A}from"./IconIcon-CJHR9eFk.js";import{D as B}from"./Dialog-C5x41Q94.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-OAyExbmo.js";import"./useButton-B1zHGReO.js";import"./useFocusable-DCJrmwZe.js";import"./useFocusRing-CxZt1wZ_.js";import"./useEffectEvent-BKHWtOuK.js";import"./chain-DWwlhufM.js";import"./index-DanPgCzI.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Bl-FmnYQ.js";import"./borderStyle-D9jrV09G.js";import"./input-DeNj_XFe.js";import"./Divider-BkI3pdWZ.js";import"./Dropdown-BDyipOjR.js";import"./FocusScope-0mMA6Wdy.js";import"./useOverlayTriggerState-CkLymXkQ.js";import"./useControlledState-D9rO8aDp.js";import"./useMenuTrigger-DKdAqa2m.js";import"./useLabels-TKPvOifT.js";import"./useLocalizedStringFormatter-VxTtgFts.js";import"./context-C9814rFJ.js";import"./VisuallyHidden-Cl-7enWq.js";import"./helper-CLSoKP_a.js";import"./keyboard-COdlhFeM.js";import"./SelectionManager-2PtmdLez.js";import"./useField-EqXWDY-0.js";import"./useFormValidationState-Bgh-X1l9.js";import"./usePopper-oL3B2z11.js";import"./index-ArdyNbxO.js";import"./MenuItem-BGnHswsU.js";import"./IconCaretRight-YrwioAi6.js";import"./IconCheckMark-yRS16sIs.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BneBwhpl.js";import"./Trigger-CC_tcFMw.js";import"./IconCaretDown-C-fPzg7E.js";import"./IconCaretDown16-B5FxHLj0.js";import"./IconCross-DWPjQDuq.js";import"./IconExclamationMarkTriangle-CtnaEOu6.js";import"./IconExclamationMarkTriangle24-ktM439Z_.js";import"./IconTrashBin16-DCfYG6TI.js";import"./IconTrashBin24-BO36GBxN.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BwP_sxyp.js";import"./Portal-MZ_7L158.js";import"./useMemoizedId-B7Oc4OmJ.js";import"./FormControl-ByUUpRZ0.js";import"./InputLabel-DV9eTz9u.js";import"./TooltipIcon-KPPSDsV-.js";import"./LegacyTooltip-b55Gn0bP.js";import"./useLink-DQCZr1gq.js";import"./IconExclamationMarkCircle24-Cpf4UxZa.js";import"./IconQuestionMarkCircle-DxJ2lW_A.js";import"./Switch-CmcbY307.js";import"./TabItem-Bxfpf6zV.js";import"./TextInput-BqIyJtSt.js";import"./Tooltip-C4hf8uVA.js";import"./useClickOutside-BIYYl7xv.js";import"./Tree-Dy5asAZ1.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DEmysH2d.js";import"./IconIcon16-B1v-vDDR.js";import"./IconIcon24-Vghd6_GC.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
