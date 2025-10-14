import{r as l,j as o}from"./iframe-DQZoCshs.js";import{B as b}from"./Button-ytMoA_uz.js";import{D as x}from"./DialogBody-B6Iy1ycJ.js";import{D as I}from"./DialogFooter-CgTuWzG2.js";import{I as A}from"./IconJohanna-37GjpJRx.js";import{D as B}from"./Dialog-DrTudiGg.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-ClJkntjM.js";import"./useButton-CsNnQIPX.js";import"./useFocusable-BBQoLTeh.js";import"./useFocusRing-DzC-uLC_.js";import"./useEffectEvent-CGYJKY5S.js";import"./chain-BuRxycqd.js";import"./index-B8qXirP9.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BDl1uIVb.js";import"./borderStyle-D9jrV09G.js";import"./input-z8GwYBpE.js";import"./Checkbox-C4MvX6Ye.js";import"./useFormValidationState-DbKGDjYr.js";import"./useControlledState-CtyZ7QgW.js";import"./InputLabel-Dzdxn41b.js";import"./TooltipIcon-C7r6FNKp.js";import"./LegacyTooltip-CDAdmYGm.js";import"./useLink-LUVwUCH7.js";import"./usePopper-DszYhXja.js";import"./index-3IyLkK9K.js";import"./Portal-BKobMvb1.js";import"./useMemoizedId-D0yBRadr.js";import"./IconCheckMark-CjcfOY3h.js";import"./IconExclamationMarkCircle24-YH8jJSgF.js";import"./IconExclamationMarkTriangle-CBiEK6F-.js";import"./IconExclamationMarkTriangle24-DjctIpBj.js";import"./IconQuestionMarkCircle-DwleYyem.js";import"./IconMinus-CfoqbIj7.js";import"./Divider-D7lSDPcQ.js";import"./Dropdown-CqY_CMr7.js";import"./FocusScope-DH9wDV-9.js";import"./useOverlayTriggerState-C6YZ0OW1.js";import"./useMenuTrigger-OXhk5r7d.js";import"./useLabels-CxTsjsBe.js";import"./useLocalizedStringFormatter-IWxdoe4l.js";import"./context-CP3_KLJu.js";import"./VisuallyHidden-qmSAPGWI.js";import"./helper-DVQH8vyC.js";import"./keyboard-QJqQzFc3.js";import"./SelectionManager-DwoBoMb8.js";import"./useField-Bk-U2Zzd.js";import"./MenuItem-Dw3WqHed.js";import"./IconCaretRight-Ez1SMPuo.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BvV7T1zK.js";import"./Trigger-C9FqWfj_.js";import"./IconCaretDown-0NTUtVqi.js";import"./IconCaretDown16-jWrqagMd.js";import"./IconCross-BUNknNaW.js";import"./IconTrashBin16-D30EDo3n.js";import"./IconTrashBin24-C2S7T8fv.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B7pwOcwp.js";import"./FormControl-Nwry38Le.js";import"./Switch-BG7E8pTO.js";import"./TabItem-AjV6Ylio.js";import"./TextInput-BtZ3-Qgd.js";import"./Tooltip-ClLcCziU.js";import"./useClickOutside-BW83cRIA.js";import"./Tree-BdFovfk1.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BQSDo5dI.js";const wo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
