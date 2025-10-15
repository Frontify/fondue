import{r as l,j as o}from"./iframe-loALxrwA.js";import{B as b}from"./Button-xxPrQzX3.js";import{D as x}from"./DialogBody-YPshOcvZ.js";import{D as I}from"./DialogFooter-Cp-Lopvu.js";import{I as A}from"./IconJohanna-Bo2W3CBu.js";import{D as B}from"./Dialog-CVv8jBgT.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-CIYJdvKD.js";import"./useFocusable-gZZJckaE.js";import"./useFocusRing-KMhl1UJS.js";import"./useEffectEvent-4xwT3IDe.js";import"./chain-DPfOkws3.js";import"./index-Dxja0Wkm.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Vv0xqBGm.js";import"./borderStyle-D9jrV09G.js";import"./input-CpAKlech.js";import"./Checkbox-DHrS9Tqv.js";import"./useFormValidationState-Be-B2n0Z.js";import"./useControlledState-DLXBMBYE.js";import"./InputLabel-CtseXcks.js";import"./TooltipIcon-CMqqw_pw.js";import"./LegacyTooltip-Cor5DXUh.js";import"./useLink-C5uGPnj2.js";import"./usePopper-c8iwtMtM.js";import"./index-D5EgzJqU.js";import"./Portal-BOzxa9wa.js";import"./useMemoizedId-Dz0xJZ2i.js";import"./IconCheckMark-B_q4DDrQ.js";import"./IconExclamationMarkCircle24-EhlvbpVM.js";import"./IconExclamationMarkTriangle-B8PE083H.js";import"./IconExclamationMarkTriangle24-qoBG5I0z.js";import"./IconQuestionMarkCircle-Car0cXyI.js";import"./IconMinus-OykVdnIk.js";import"./Divider-DLnR9heJ.js";import"./Dropdown-CaaOnjf9.js";import"./FocusScope-G2sE9zlO.js";import"./useOverlayTriggerState-am9Ln9_3.js";import"./useMenuTrigger-Chk3MCxN.js";import"./useLabels-bdaQqbJL.js";import"./useLocalizedStringFormatter-BJknxX9O.js";import"./context-BO2wI_GH.js";import"./VisuallyHidden-BnxHhjaw.js";import"./helper-PKiWzScp.js";import"./keyboard-BryKsZUz.js";import"./SelectionManager-BoAOKyeU.js";import"./useField-DibquiUW.js";import"./MenuItem-CmE5NgSO.js";import"./IconCaretRight-Dhoo0xjN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B9uL4gHk.js";import"./Trigger-2VLOT0SV.js";import"./IconCaretDown-CAMMwaLk.js";import"./IconCaretDown16-C9Kzqhea.js";import"./IconCross-CrFfhLsy.js";import"./IconTrashBin16-B3StqCVf.js";import"./IconTrashBin24-BoRbGsWA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BXnrvz9y.js";import"./FormControl-CrObdnG3.js";import"./Switch-DsaiqYEb.js";import"./TabItem-DKfp7mkL.js";import"./TextInput-BjAQOjJb.js";import"./Tooltip-L0Un9H0w.js";import"./useClickOutside-B8frtDHS.js";import"./Tree-B5AxJst3.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DSld8tuv.js";const wo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const zo=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,zo as __namedExportsOrder,wo as default};
