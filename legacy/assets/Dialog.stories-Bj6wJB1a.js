import{r as l,j as e}from"./iframe-hrVkOCwH.js";import{B as I}from"./Button-W5JU2GYF.js";import{D as b}from"./DialogBody-DSM1Gazo.js";import{D as x}from"./DialogFooter-CMI1TMPq.js";import{I as A}from"./IconIcon-DxXGmVAM.js";import{D as B}from"./Dialog-C-M2skDf.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-DZD6mn4U.js";import"./useFocusable-B4p0MNCv.js";import"./useFocusRing-1BNT7VFY.js";import"./useEffectEvent-r0uIPgQg.js";import"./chain--XmeI2qo.js";import"./index-B71KNn4Z.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BWuKVa5u.js";import"./borderStyle-D9jrV09G.js";import"./input-HM8QN-Dx.js";import"./Checkbox-BPm9Jugo.js";import"./useFormValidationState-BwX-GImz.js";import"./useControlledState-71UIMywV.js";import"./InputLabel-DavHylX_.js";import"./TooltipIcon-Cr95l-NA.js";import"./LegacyTooltip-DHrljL_9.js";import"./useLink-DOG0Yu1Y.js";import"./usePopper-J_p-icdG.js";import"./index-CGZABk5_.js";import"./Portal-DTFr9_A2.js";import"./useMemoizedId-sOEvST2M.js";import"./IconCheckMark-B-YCLBcL.js";import"./IconExclamationMarkCircle24-481k8n6W.js";import"./IconExclamationMarkTriangle-CBe5H8Hw.js";import"./IconExclamationMarkTriangle24-jdOtgNlK.js";import"./IconQuestionMarkCircle-DYtN5BBW.js";import"./IconMinus-D4AubFA7.js";import"./Divider-CFprP-7p.js";import"./FormControl-DVxoqDTe.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B35Oo3EB.js";import"./Switch-imIT-kcW.js";import"./TabItem-aB0k9Fro.js";import"./elements-BOYmskOL.js";import"./TextInput-DmxJRx96.js";import"./IconCross-CC8OVy8K.js";import"./Tooltip-3_-Yc6si.js";import"./useClickOutside-D66VdyW1.js";import"./EnablePortalWrapper-CGVUP28H.js";import"./Tree-7T50P4iA.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Bgg3h0fg.js";import"./IconCaretDown-COnPOjBQ.js";import"./IconCaretDown16-CwmIioRV.js";import"./IconTrashBin16-BhYglj6k.js";import"./IconTrashBin24-DlsKPU2P.js";import"./Flex-CGTQfS8c.js";import"./IconIcon16-C1S1YwmL.js";import"./IconIcon24-K0lJwgHk.js";const ve={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const je=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,je as __namedExportsOrder,ve as default};
