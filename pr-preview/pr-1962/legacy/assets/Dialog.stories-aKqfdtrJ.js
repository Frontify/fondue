import{j as o}from"./jsx-runtime-Nms4Y4qS.js";import{r as l}from"./index-BwDkhjyp.js";import{B as b}from"./Button-CYWlMQhW.js";import{D as x}from"./DialogBody-Do0JJJbs.js";import{D as I}from"./DialogFooter-opCA-4IZ.js";import{I as A}from"./IconJohanna-bTcd8FnJ.js";import{D as B}from"./Dialog-CdVgJ6PK.js";import{M as r}from"./dialog-Dre1eVQK.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useButton-DofEV6SJ.js";import"./useFocusable-CAGu0lKI.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./chain-D5h1pgIF.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./Box-BkAx9_i9.js";import"./borderStyle-D9jrV09G.js";import"./input-DdXIpziX.js";import"./Divider-DCi-HcbY.js";import"./FormControl-D7P3KZv0.js";import"./InputLabel-Cb39M_3M.js";import"./TooltipIcon-DgUrnRFN.js";import"./LegacyTooltip-BoEBGEhI.js";import"./useLink-DorAuuFQ.js";import"./usePopper-ByXn8U-3.js";import"./index-BxibOwXx.js";import"./index-CfyPTyT-.js";import"./Portal-By7XnO0v.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./IconCheckMark-CLvJH1sB.js";import"./IconExclamationMarkCircle-Cob4vb5T.js";import"./IconExclamationMarkCircle24-DpwtNT9z.js";import"./IconExclamationMarkTriangle-CRTWkDyu.js";import"./IconExclamationMarkTriangle24-GqPjgFpk.js";import"./IconQuestionMarkCircle-C_agVHg1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CZrma5le.js";import"./SegmentedControls-D3WaRgzO.js";import"./useFormValidationState-Vs0Uifwm.js";import"./FocusScope-DYM0gkGr.js";import"./useField-BhCfq6jD.js";import"./useLabels-DH9bA-v0.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-YFPGrsWM.js";import"./useControlledState-C0C-dzuH.js";import"./motion-C48bHxkn.js";import"./Switch-DSYxQi4e.js";import"./TabItem-DYJEWVSF.js";import"./elements-BOYmskOL.js";import"./TextInput-BJ6WSDaF.js";import"./IconEyeOff-Dzh4tjis.js";import"./IconCross-Bt-I3opn.js";import"./Tooltip-DYRhLsHJ.js";import"./useClickOutside-CKV3CrvD.js";import"./EnablePortalWrapper-I0EzvwWK.js";import"./Tree-CVMTatqj.js";import"./immer-DBm1MMjE.js";import"./IconGrabHandle12-IS3l0vsO.js";import"./Trigger-BkAUJNF7.js";import"./IconCaretDown-Cxrx1sF_.js";import"./IconCaretDown16-BGp5IVAI.js";import"./IconTrashBin-Bl46mt1V.js";import"./IconTrashBin16-qlTE457i.js";import"./IconTrashBin24-CvdAkIgz.js";import"./Flex-CdV6uVrL.js";import"./IconArrowLeft-DePMuYaT.js";const Wo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const _o=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,_o as __namedExportsOrder,Wo as default};
