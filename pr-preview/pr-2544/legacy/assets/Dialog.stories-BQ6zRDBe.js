import{r as l,j as e}from"./iframe-CI4Kawm5.js";import{B as I}from"./Button-CC2xgBz8.js";import{D as b}from"./DialogBody-Dda5lqvc.js";import{D as x}from"./DialogFooter-BznxTllo.js";import{I as A}from"./IconIcon-ARHVfxoT.js";import{D as B}from"./Dialog-DwNmG34a.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-yOERg7rY.js";import"./useButton-0gYD7YN5.js";import"./useFocusable-DkBkn9iT.js";import"./useFocusRing-CyQhVCri.js";import"./useEffectEvent-Cfpi8PP8.js";import"./chain-D7U0_On1.js";import"./index-zpwVSNjA.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Cx50b-Ce.js";import"./borderStyle-D9jrV09G.js";import"./input-DCT2qH2I.js";import"./Checkbox-DXLFTzy2.js";import"./useFormValidationState-BhtDhUXV.js";import"./useControlledState-CUmOUvGM.js";import"./InputLabel-CKTuZCMG.js";import"./TooltipIcon-BbIRjZyI.js";import"./LegacyTooltip-Dou_-Yzh.js";import"./useLink--dmh_mM5.js";import"./usePopper-BppasZrv.js";import"./index-C-x7Nr5k.js";import"./Portal-Bx0n0vOk.js";import"./useMemoizedId-BhGmyCqr.js";import"./IconCheckMark-DZdXXIdU.js";import"./IconExclamationMarkCircle24-B1fijdn3.js";import"./IconExclamationMarkTriangle-tJv2AngU.js";import"./IconExclamationMarkTriangle24-BZgyqp3m.js";import"./IconQuestionMarkCircle-CKHNeUmL.js";import"./IconMinus-BWmFQkW3.js";import"./Divider-Cez8lt_3.js";import"./FormControl-CCavmj5m.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CsOnGPDG.js";import"./Switch-BoyC4ozW.js";import"./TabItem-CnOdriQC.js";import"./elements-BOYmskOL.js";import"./TextInput-Bfa7-qoa.js";import"./IconCross-76Znu6aF.js";import"./Tooltip-giYO8ALz.js";import"./useClickOutside-Bl5b8N1C.js";import"./EnablePortalWrapper-B_5uTan4.js";import"./Tree-DkbN3ZYU.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CsBb-GJS.js";import"./IconIcon16-D-it6Xou.js";import"./IconIcon24-CPklV-p0.js";const ke={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
