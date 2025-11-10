import{r as l,j as o}from"./iframe-C8H_7DY9.js";import{B as I}from"./Button-DVNUWGG3.js";import{D as b}from"./DialogBody-B3QbHjug.js";import{D as x}from"./DialogFooter-iBIG1TGN.js";import{I as A}from"./IconIcon-iGJQ7amK.js";import{D as B}from"./Dialog-ETqpVanV.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DXpIkoC8.js";import"./useButton-t9MXzejI.js";import"./useFocusable-8qbfmW5v.js";import"./useFocusRing-CJxA-gpa.js";import"./useEffectEvent-VMJO_dOH.js";import"./chain-BXb1kVuv.js";import"./index-DZCJL87_.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BO92NLkH.js";import"./borderStyle-D9jrV09G.js";import"./input-Czrebvap.js";import"./Divider-BpmF_J73.js";import"./Dropdown-DfNjV_ZV.js";import"./FocusScope-C1bX1n8D.js";import"./useOverlayTriggerState-DC6hQTLJ.js";import"./useControlledState-C2cdbZxy.js";import"./useMenuTrigger-BjcfuX5m.js";import"./useLabels-72emSVl1.js";import"./useLocalizedStringFormatter-cm118eAR.js";import"./context-BTMC7ivx.js";import"./VisuallyHidden-BoBFLgJk.js";import"./helper-CmB9xjw3.js";import"./keyboard-BenEYFGr.js";import"./SelectionManager-COazW9mI.js";import"./useField-DaD3Atg1.js";import"./useFormValidationState-DpfiB6vy.js";import"./usePopper-vtl3bzbL.js";import"./index-C3FFT934.js";import"./MenuItem-B0WXsgJ8.js";import"./IconCaretRight-DOUKjwPz.js";import"./IconCheckMark-B_lKELEt.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BdlCAikA.js";import"./Trigger-C--yUzlG.js";import"./IconCaretDown-CTppYQfl.js";import"./IconCaretDown16-B77Q68v1.js";import"./IconCross-CiHpCsD-.js";import"./IconExclamationMarkTriangle-CS0LP3d9.js";import"./IconExclamationMarkTriangle24-DG07jT0q.js";import"./IconTrashBin16-B9SVOy9U.js";import"./IconTrashBin24-v7uaG4hB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Civee1Xz.js";import"./Portal-CTZNYkGv.js";import"./useMemoizedId-DVcqOGKj.js";import"./FormControl-M1v2DF3z.js";import"./InputLabel-CBDugHuf.js";import"./TooltipIcon-Mqj9Z8ia.js";import"./LegacyTooltip-B_h0nf2a.js";import"./useLink-s7baPPKW.js";import"./IconExclamationMarkCircle24-Ca9Amb8y.js";import"./IconQuestionMarkCircle-BXeztdNR.js";import"./Switch-DNNxcjn1.js";import"./TabItem-CUf-Qhvj.js";import"./TextInput-Cqo3PLSF.js";import"./Tooltip-BP3Y9Y1a.js";import"./useClickOutside-C6oP5oUz.js";import"./Tree-DUasgvv9.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CcBjfhJJ.js";import"./IconIcon16-BVUNeovq.js";import"./IconIcon24-Bq4bkSOT.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
