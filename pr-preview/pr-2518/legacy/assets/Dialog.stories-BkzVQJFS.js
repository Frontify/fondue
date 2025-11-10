import{r as l,j as o}from"./iframe-vjbYvHXD.js";import{B as I}from"./Button-lhTfhg7d.js";import{D as b}from"./DialogBody-rQWIk067.js";import{D as x}from"./DialogFooter-CPpI_GfE.js";import{I as A}from"./IconIcon-CE2cQ8pQ.js";import{D as B}from"./Dialog-0IyZi8MV.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D9dL-qgt.js";import"./useButton-CxkdNakB.js";import"./useFocusable-ByREZ_n_.js";import"./useFocusRing-CsZ9CHXr.js";import"./useEffectEvent-CTQjz-1h.js";import"./chain-B-60xBaJ.js";import"./index-7nxr46c5.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Bwp3i62f.js";import"./borderStyle-D9jrV09G.js";import"./input-fcS-PJ4Z.js";import"./Divider-CuFPhQ6S.js";import"./Dropdown-BSAzKnZF.js";import"./FocusScope-CLzN_lI2.js";import"./useOverlayTriggerState-B81FpLIC.js";import"./useControlledState-COAt9VZQ.js";import"./useMenuTrigger-DPQNAKRw.js";import"./useLabels-Db1-Bo-V.js";import"./useLocalizedStringFormatter-BepfFFxN.js";import"./context-9Ze-MI-m.js";import"./VisuallyHidden-rr0pwMtP.js";import"./helper-BzVKhoc9.js";import"./keyboard-JWSOmIrU.js";import"./SelectionManager-DLk5Bhmx.js";import"./useField-Dii7Ap5y.js";import"./useFormValidationState-DhSBWnv0.js";import"./usePopper-BxbMqRB2.js";import"./index-D6FU8wL4.js";import"./MenuItem-BxlFqfFZ.js";import"./IconCaretRight-DCeo5KTY.js";import"./IconCheckMark-DefVy1w1.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DyUqzlpN.js";import"./Trigger-IeR8b6zt.js";import"./IconCaretDown-zm52kRBZ.js";import"./IconCaretDown16-ln6Oz95d.js";import"./IconCross-DSBvcEAU.js";import"./IconExclamationMarkTriangle-gKRpV5Gs.js";import"./IconExclamationMarkTriangle24-BHHbNpkJ.js";import"./IconTrashBin16-dfdTfdUx.js";import"./IconTrashBin24-BYrHxqvh.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-C6HwsMzv.js";import"./Portal-CgK8zL4W.js";import"./useMemoizedId-C05Z425a.js";import"./FormControl-DoQSNUge.js";import"./InputLabel-CoPfkvwk.js";import"./TooltipIcon-BqrO-IBv.js";import"./LegacyTooltip-CJWD8yyY.js";import"./useLink-CeyolHSB.js";import"./IconExclamationMarkCircle24-DqowYawI.js";import"./IconQuestionMarkCircle-DYdPob5o.js";import"./Switch-CyEhT5DE.js";import"./TabItem-K8h6fVvz.js";import"./TextInput-BjgdiGrp.js";import"./Tooltip-DIcCdMDS.js";import"./useClickOutside-5e2WfSL9.js";import"./Tree-C3-VaJJR.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Ciur6B89.js";import"./IconIcon16-Dlwz-4vh.js";import"./IconIcon24-DOAzCn2c.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
