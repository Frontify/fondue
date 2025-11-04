import{r as l,j as o}from"./iframe-BA0Mz7oG.js";import{B as I}from"./Button-BMcKUNaS.js";import{D as b}from"./DialogBody-DPSxQ9xC.js";import{D as x}from"./DialogFooter-BRTqIAtT.js";import{I as A}from"./IconIcon-DQXc9H61.js";import{D as B}from"./Dialog-CtQL-b0B.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-C3UyT0Z5.js";import"./useFocusable-B19sJuLq.js";import"./useFocusRing-DV-myszv.js";import"./useEffectEvent-CUAIJOQt.js";import"./chain-BmiFarN7.js";import"./index-C8Y1Fo5J.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-6EgFzlg5.js";import"./borderStyle-D9jrV09G.js";import"./input-BhY5ATgP.js";import"./Divider-BQTpcCZ1.js";import"./Dropdown-m3PlXCHT.js";import"./FocusScope-1wMxK_PV.js";import"./useOverlayTriggerState-Zz4T26iK.js";import"./useControlledState-DUTcD0La.js";import"./useMenuTrigger-DReJd5tq.js";import"./useLabels-CvZxNEa3.js";import"./useLocalizedStringFormatter-BXDW7lKW.js";import"./context-CFhd1GSa.js";import"./VisuallyHidden-BmYzMKFw.js";import"./helper-BEDA2E7r.js";import"./keyboard-CJWK3Pb7.js";import"./SelectionManager-CMBHO6YV.js";import"./useField-BBXdNT_C.js";import"./useFormValidationState-uGPj3SfU.js";import"./usePopper-BboI6ZtD.js";import"./index-_rDBBRbe.js";import"./MenuItem-DyVT4swA.js";import"./IconCaretRight-DFhJNzD7.js";import"./IconCheckMark-jgsk33Ac.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DVhJLBvl.js";import"./Trigger-WKBugyiB.js";import"./IconCaretDown-BIBe4WwZ.js";import"./IconCaretDown16-DJi1Y7nM.js";import"./IconCross-Dz3mCt_c.js";import"./IconExclamationMarkTriangle-ChaJ9IRd.js";import"./IconExclamationMarkTriangle24-nnnmpyhC.js";import"./IconTrashBin16-J_Xa8eUp.js";import"./IconTrashBin24-B1AFtuTy.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Jb0Q3zWN.js";import"./Portal-FaQGc_aH.js";import"./useMemoizedId-BOmFmYFD.js";import"./FormControl-BpVZp6SF.js";import"./InputLabel-CaL3IwWg.js";import"./TooltipIcon-D1mkVicS.js";import"./LegacyTooltip-3QXpUEwW.js";import"./useLink-88124U24.js";import"./IconExclamationMarkCircle24-CoHtCN_U.js";import"./IconQuestionMarkCircle-BR4Rojrk.js";import"./Switch-Dy7-sb6F.js";import"./TabItem-2OFAmaau.js";import"./TextInput-WvGvOj3y.js";import"./Tooltip-CUfVLjDz.js";import"./useClickOutside-BBPHLqZS.js";import"./Tree-CybCrDUv.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DZ86GbIF.js";import"./IconIcon16-BktjyK3h.js";import"./IconIcon24-FvvEoF7z.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
