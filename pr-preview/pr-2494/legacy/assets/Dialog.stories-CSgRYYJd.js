import{r as l,j as e}from"./iframe-sarzTi8L.js";import{B as b}from"./Button-V9rFQHqA.js";import{D as x}from"./DialogBody-B-DTk8Jv.js";import{D as I}from"./DialogFooter-DQzB5waF.js";import{I as A}from"./IconJohanna-DlYMMGV6.js";import{D as B}from"./Dialog-sBvcZciI.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D7hvLZ4Y.js";import"./useButton-BfqVDKT2.js";import"./useFocusable-BZQrvG5Y.js";import"./useFocusRing-CJslZTVh.js";import"./useEffectEvent-DXJV4zsr.js";import"./chain-MnvsB7gO.js";import"./index-DJJW3p-i.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CyBGUzcO.js";import"./borderStyle-D9jrV09G.js";import"./input-D4wH6B5Q.js";import"./Checkbox-6y-EpNiA.js";import"./useFormValidationState-4Te4vK6C.js";import"./useControlledState-B6Tx6Nhk.js";import"./InputLabel-DuLcCPUV.js";import"./TooltipIcon-BjXJdlzR.js";import"./LegacyTooltip-C-HQV77A.js";import"./useLink-Y2z5Scob.js";import"./usePopper-Ck-CZu4g.js";import"./index-D2Z16GHo.js";import"./Portal-CFiQojYp.js";import"./useMemoizedId-C2H8E_mU.js";import"./IconCheckMark-B35tL5o7.js";import"./IconExclamationMarkCircle24-BJNv-ZIi.js";import"./IconExclamationMarkTriangle-D_Bn4azM.js";import"./IconExclamationMarkTriangle24-l8-Sm8AF.js";import"./IconQuestionMarkCircle-Shiv9VzZ.js";import"./IconMinus-DrINymAZ.js";import"./FormControl-B-YAd-L_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B6EIods_.js";import"./Switch-DabsP_E8.js";import"./TabItem-BlJOjUxn.js";import"./elements-BOYmskOL.js";import"./TextInput-CyegwwzZ.js";import"./IconCross-B83ZgxXS.js";import"./Tooltip-Dcr_vg-B.js";import"./useClickOutside-DN9tvAKQ.js";import"./EnablePortalWrapper-KCbmKcGa.js";import"./Tree-CPQWooIF.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DpjUExqf.js";import"./IconCaretDown-JRJFTHDc.js";import"./IconCaretDown16-Dr5y3NF-.js";import"./IconTrashBin16-B1LvMOjZ.js";import"./IconTrashBin24-yZhZCG6Y.js";import"./Flex-dQFVmFcQ.js";const Me={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const Re=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Re as __namedExportsOrder,Me as default};
