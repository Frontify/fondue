import{r as l,j as e}from"./iframe-z7mE2Wk_.js";import{B as I}from"./Button-nqKSQe0n.js";import{D as b}from"./DialogBody-BD4KMmLT.js";import{D as x}from"./DialogFooter-BZo5Gn1L.js";import{I as A}from"./IconIcon-PmhneWnw.js";import{D as B}from"./Dialog-D-2EhBwf.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B3RP-zrM.js";import"./useButton-B9610hLg.js";import"./useFocusable-CaNXLyLQ.js";import"./useFocusRing-TSBrnVkt.js";import"./useEffectEvent-Cy9gGdjO.js";import"./chain-C9UJi1qp.js";import"./index-DiQlz7gC.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-JEXyJSu8.js";import"./borderStyle-D9jrV09G.js";import"./input-BAgdxmuY.js";import"./Checkbox-DH9o4iuo.js";import"./useFormValidationState-w5JfW8iw.js";import"./useControlledState-CXveQydd.js";import"./InputLabel-B34_xZ8L.js";import"./TooltipIcon-C4CPZgz5.js";import"./LegacyTooltip-BATB0pek.js";import"./useLink-DNHzOnAf.js";import"./usePopper-CDC_Gl3n.js";import"./index-C-oZNt1w.js";import"./Portal-DwhL2L_d.js";import"./useMemoizedId-DVY2tdmo.js";import"./IconCheckMark-ComK8mHi.js";import"./IconExclamationMarkCircle24-BjQv_f7p.js";import"./IconExclamationMarkTriangle-DlKNdBTi.js";import"./IconExclamationMarkTriangle24-Dw8gX6Sm.js";import"./IconQuestionMarkCircle-DtUT4oXr.js";import"./IconMinus-BzGXdu_h.js";import"./Divider-BTvRs36V.js";import"./FormControl-By6vHcJx.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Dd8ddVox.js";import"./Switch-DHjdejSs.js";import"./TabItem-Cba-h8s6.js";import"./elements-BOYmskOL.js";import"./TextInput-DhxGzDyZ.js";import"./IconCross-ZEasPdrE.js";import"./Tooltip-CVsxlovO.js";import"./useClickOutside-Rl9D5ZyQ.js";import"./EnablePortalWrapper-V6D5L0ak.js";import"./Tree-BGJTm5QH.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-oaKFE7By.js";import"./IconIcon16-TQwPlyR4.js";import"./IconIcon24-CVoc58WA.js";const ke={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
