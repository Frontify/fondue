import{r as l,j as e}from"./iframe-LEv1GSvY.js";import{B as I}from"./Button-DUwtZbrH.js";import{D as b}from"./DialogBody-CkD4RstN.js";import{D as x}from"./DialogFooter-Dxco5bgG.js";import{I as A}from"./IconIcon-QWYlbl83.js";import{D as B}from"./Dialog-6ydLkhe0.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DlITqhEh.js";import"./useButton-Cr6sqSYQ.js";import"./useFocusable-stfJeIpU.js";import"./useFocusRing-CmQWnBCR.js";import"./useEffectEvent-g570qV22.js";import"./chain-BYYKUROJ.js";import"./index-w8RZ3Xa7.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CBJfGyR5.js";import"./borderStyle-D9jrV09G.js";import"./input-B4VXuL7P.js";import"./Checkbox-BGN2gp-7.js";import"./useFormValidationState-OkvhBaTv.js";import"./useControlledState-B2DC-eKR.js";import"./InputLabel-DxuW7zDn.js";import"./TooltipIcon-CV8X81_I.js";import"./LegacyTooltip-o5Kd4SF7.js";import"./useLink-saIWG3I9.js";import"./usePopper-C2pndz_I.js";import"./index-CgWYneLo.js";import"./Portal-Bl2R-8KJ.js";import"./useMemoizedId-YPBy6EbL.js";import"./IconCheckMark-DuN6dQH8.js";import"./IconExclamationMarkCircle24-jUU22MCT.js";import"./IconExclamationMarkTriangle-BcYnUjX4.js";import"./IconExclamationMarkTriangle24-DU65-zzt.js";import"./IconQuestionMarkCircle-BRsB91tC.js";import"./IconMinus-BOXaew8y.js";import"./FormControl-CNZZySl_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BwNxSYA8.js";import"./Switch-RSq4JAMI.js";import"./TabItem-DHWxiMih.js";import"./elements-BOYmskOL.js";import"./TextInput-CW45iaTr.js";import"./IconCross-DVGcdwIR.js";import"./Tooltip-C5O3PABQ.js";import"./useClickOutside-C4Y6OvTA.js";import"./EnablePortalWrapper-DvmytOZ7.js";import"./Tree-BtUxV5Iu.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B6ThISim.js";import"./IconCaretDown-Bq-EReh4.js";import"./IconCaretDown16-DcQxwk-i.js";import"./IconTrashBin16-xy03U9Qa.js";import"./IconTrashBin24-Dx0UE5Kn.js";import"./Flex-BqwQk2wH.js";import"./IconIcon16-H1gL3hnN.js";import"./IconIcon24-BmDnYPhf.js";const qe={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const ve=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,ve as __namedExportsOrder,qe as default};
