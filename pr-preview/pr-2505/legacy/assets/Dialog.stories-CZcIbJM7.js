import{r as l,j as e}from"./iframe-C2ar3Utf.js";import{B as b}from"./Button-DsLyXgPb.js";import{D as x}from"./DialogBody-t875PlcR.js";import{D as I}from"./DialogFooter-CN0U5mk5.js";import{I as A}from"./IconJohanna-Eq4XiOhf.js";import{D as B}from"./Dialog-C9U7n0Xf.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DpV-BRze.js";import"./useButton-DzmDR489.js";import"./useFocusable-B1lF6NHK.js";import"./useFocusRing-ckjGDaB9.js";import"./useEffectEvent-HUb76GIf.js";import"./chain-B8CRNRIy.js";import"./index-60xSEIfD.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-VWJ-v-24.js";import"./borderStyle-D9jrV09G.js";import"./input-D7aUtB79.js";import"./Divider-C7Hb8dmo.js";import"./FormControl-mzx8vPaY.js";import"./InputLabel-BPPPgPsK.js";import"./TooltipIcon-CCFeAwAU.js";import"./LegacyTooltip-BQLH6NNZ.js";import"./useLink-30c0The6.js";import"./usePopper-CEndrzxl.js";import"./index-DrND0Ud_.js";import"./Portal-vcMJoXCl.js";import"./useMemoizedId-DysWXBo7.js";import"./IconCheckMark-DT6ELjh0.js";import"./IconExclamationMarkCircle24-C5-ZFPp4.js";import"./IconExclamationMarkTriangle-DUVfJ7Ey.js";import"./IconExclamationMarkTriangle24-DdJA7dHC.js";import"./IconQuestionMarkCircle-Dmvn_Cz2.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DBAs6Vfq.js";import"./Switch-BFMtvzGB.js";import"./TabItem-BbaK2t1b.js";import"./elements-BOYmskOL.js";import"./TextInput-4DApBXSu.js";import"./IconCross-BJLzEk4o.js";import"./Tooltip-mJNIvbyO.js";import"./useClickOutside-C56zEwiR.js";import"./EnablePortalWrapper-D2WWcRo-.js";import"./Tree-DHvKrt7v.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-D-XxAhYv.js";import"./IconCaretDown-cvqhZz-x.js";import"./IconCaretDown16-GiF-mGuT.js";import"./IconTrashBin16-C1hGhQPA.js";import"./IconTrashBin24-T3d59XsQ.js";import"./Flex-BAYA73IJ.js";const Ae={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const ke=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,ke as __namedExportsOrder,Ae as default};
