import{r as l,j as e}from"./iframe-soc7eeRF.js";import{B as I}from"./Button-CimA_5h4.js";import{D as b}from"./DialogBody-QLmDILr0.js";import{D as x}from"./DialogFooter-DTlysciJ.js";import{I as A}from"./IconIcon-UnBWykWm.js";import{D as B}from"./Dialog-CSD-CVKs.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-OAyExbmo.js";import"./useButton-ChPdrCGo.js";import"./useFocusable-D74tmFum.js";import"./useFocusRing-CPG57cIB.js";import"./useEffectEvent-ECKUQGF_.js";import"./chain-CNqfjszP.js";import"./index-D9RNLCkm.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CdpqC20i.js";import"./borderStyle-D9jrV09G.js";import"./input-DSXlP7Mn.js";import"./Checkbox-BdtkPgCH.js";import"./useFormValidationState-CVuV3DO0.js";import"./useControlledState-eiQn8EjX.js";import"./InputLabel-CwMDVsPB.js";import"./TooltipIcon-DU5Rfwoh.js";import"./LegacyTooltip-CEYOzJay.js";import"./useLink-B1qS4TAf.js";import"./usePopper-Dpcm42jv.js";import"./index-E2yKpKq0.js";import"./Portal-BgIRH8iS.js";import"./useMemoizedId-DzThg7Zj.js";import"./IconCheckMark-pz-eNdCt.js";import"./IconExclamationMarkCircle24-CXdjwykF.js";import"./IconExclamationMarkTriangle-DWfhq3tK.js";import"./IconExclamationMarkTriangle24-BURBLQPR.js";import"./IconQuestionMarkCircle-C_gZVRGQ.js";import"./IconMinus-qopJAP1y.js";import"./Divider-D6gP2duN.js";import"./FormControl-DoDWSLWm.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-MFJ2GuR8.js";import"./Switch-DH40OcLG.js";import"./TabItem-jWEFaDbx.js";import"./elements-BOYmskOL.js";import"./TextInput-Bt-2m2kK.js";import"./IconCross-BFEpEYT5.js";import"./Tooltip-Oncdock3.js";import"./useClickOutside-Cajk1VzK.js";import"./EnablePortalWrapper-pMPqFqBW.js";import"./Tree-Cr7iaRvK.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BhadUkzB.js";import"./IconIcon16-F40_P8R6.js";import"./IconIcon24-BpsLmXM2.js";const ke={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Ce=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Ce as __namedExportsOrder,ke as default};
