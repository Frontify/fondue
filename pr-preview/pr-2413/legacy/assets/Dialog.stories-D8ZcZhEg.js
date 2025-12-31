import{r as l,j as o}from"./iframe-Cf1DtGp4.js";import{B as I}from"./Button-DV8NYrEc.js";import{D as b}from"./DialogBody-PlHuQpC_.js";import{D as x}from"./DialogFooter-CRuUeNJJ.js";import{I as A}from"./IconIcon-CnnF20VY.js";import{D as B}from"./Dialog-DCd1uM1i.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DI9Pv0v-.js";import"./useButton-BPFx4qvf.js";import"./useFocusable-DqhDsK7J.js";import"./useFocusRing-BM1gWsMD.js";import"./useEffectEvent-C8pfAA-B.js";import"./chain-Cgz6AhiD.js";import"./index-Dxcoy0oM.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CLi9Sorx.js";import"./borderStyle-D9jrV09G.js";import"./input-Di4mRFwf.js";import"./Checkbox-BdqBmlc8.js";import"./useFormValidationState-CbcGlbmg.js";import"./useControlledState-CIBuNwJe.js";import"./InputLabel-CVMQzfx-.js";import"./TooltipIcon-B7NaMUo0.js";import"./LegacyTooltip-HGoAP1-a.js";import"./useLink-Dub5qxjk.js";import"./usePopper-BeHgl84Q.js";import"./index-DfwwFwWl.js";import"./Portal-D2sKroGt.js";import"./useMemoizedId-eqCvB2Ok.js";import"./IconCheckMark-DLBNQ2dt.js";import"./IconExclamationMarkCircle24-DPnvSQ1_.js";import"./IconExclamationMarkTriangle-BdAg9mdc.js";import"./IconExclamationMarkTriangle24-D8-80Zmo.js";import"./IconQuestionMarkCircle-j554Ijqs.js";import"./IconMinus-CMAY-Wk-.js";import"./Dropdown-CkllTkU8.js";import"./FocusScope-Dx-PhQkB.js";import"./useOverlayTriggerState-CcAg6wzo.js";import"./useMenuTrigger-DXv8pO8H.js";import"./useLabels-DDGlcAiH.js";import"./useLocalizedStringFormatter-Cju5TQfy.js";import"./context-B0UoGtkJ.js";import"./VisuallyHidden-lEg9ayc4.js";import"./helper-C4HMwjvL.js";import"./keyboard-CrzQKbg4.js";import"./SelectionManager-s542UXoo.js";import"./useField-C2ixWOTC.js";import"./MenuItem-CAnjtucz.js";import"./IconCaretRight-BMYIQSG4.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-8z19RM.js";import"./Trigger-CESC6Aw7.js";import"./IconCaretDown-DHVY6Xwy.js";import"./IconCaretDown16-BJT_Hl8U.js";import"./IconCross-BQIDiVoD.js";import"./IconTrashBin16-CvKHnkSD.js";import"./IconTrashBin24-B3oBTNTM.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BZ0oLoB5.js";import"./FormControl-CDVvLYHE.js";import"./Switch-DMGgAkT_.js";import"./TabItem-hU4OjUZo.js";import"./TextInput-BrfMEstF.js";import"./Tooltip-BPrJUiIR.js";import"./useClickOutside-DqmtRtRR.js";import"./Tree-DZT6B-ry.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BasdWyMU.js";import"./IconIcon16-Dm7hjjKm.js";import"./IconIcon24-B5WZ-Ru_.js";const Po={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Go=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,Go as __namedExportsOrder,Po as default};
