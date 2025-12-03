import{r as l,j as o}from"./iframe-DeHAHo2O.js";import{B as I}from"./Button-XeATRVB6.js";import{D as b}from"./DialogBody-DL8vE1oH.js";import{D as x}from"./DialogFooter-DBlywyB7.js";import{I as A}from"./IconIcon-BLbkrLUw.js";import{D as B}from"./Dialog-CyOKvgIZ.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-1L8wWKLL.js";import"./useButton-DMcNng1z.js";import"./useFocusable-Cx6UClPu.js";import"./useFocusRing-mB5qeJ04.js";import"./useEffectEvent-z6oLVS9-.js";import"./chain-BUVmghN3.js";import"./index-r0OKhC8Q.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CYxxidOu.js";import"./borderStyle-D9jrV09G.js";import"./input-DbTBvo6h.js";import"./Divider-AunlJTwo.js";import"./Dropdown-CPWczZou.js";import"./FocusScope-BdlMD4Yu.js";import"./useOverlayTriggerState-CvsjBNiZ.js";import"./useControlledState-Br1r4vIG.js";import"./useMenuTrigger-B6jxNwcP.js";import"./useLabels-BkYzxx14.js";import"./useLocalizedStringFormatter-BRbC8G8c.js";import"./context-hGU2fCsi.js";import"./VisuallyHidden-B7YsmtVf.js";import"./helper-Cf03TuNF.js";import"./keyboard-Dn8uKP3f.js";import"./SelectionManager-DH1yA4vK.js";import"./useField-CvLglrIT.js";import"./useFormValidationState-QO7fvPwD.js";import"./usePopper-dhPiNd2g.js";import"./index-DHbYGvEM.js";import"./MenuItem-Bmc9YqKf.js";import"./IconCaretRight-BATNqyD1.js";import"./IconCheckMark-HBwhNn3e.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C72EU5gX.js";import"./Trigger-DyuqwTZt.js";import"./IconCaretDown-B5WDuPoQ.js";import"./IconCaretDown16-Rghdt45D.js";import"./IconCross-nsGTd93L.js";import"./IconExclamationMarkTriangle-CuplyEgY.js";import"./IconExclamationMarkTriangle24-kfeUPeJ-.js";import"./IconTrashBin16-UcKIhf9C.js";import"./IconTrashBin24-BsnN7OSn.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DUTWRUSV.js";import"./Portal-8lp-5d0y.js";import"./useMemoizedId-B7oc4VDX.js";import"./FormControl-hi5Ik-iU.js";import"./InputLabel-CV2tUH8t.js";import"./TooltipIcon-VUEuyZak.js";import"./LegacyTooltip-6IXUBNNu.js";import"./useLink-CnAHkscR.js";import"./IconExclamationMarkCircle24-C37jI8Jz.js";import"./IconQuestionMarkCircle-Cdp-yedE.js";import"./Switch-BZRO7Ing.js";import"./TabItem-DKyhZ-ff.js";import"./TextInput-BVn6BAjb.js";import"./Tooltip-0UlcUHze.js";import"./useClickOutside-CKkB_vX5.js";import"./Tree-D_8Bk90C.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DOm7EKbr.js";import"./IconIcon16-CcHE2ZLm.js";import"./IconIcon24-BLfDtBMf.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
