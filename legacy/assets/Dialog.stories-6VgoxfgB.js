import{r as l,j as o}from"./iframe-DkBc9txZ.js";import{B as I}from"./Button-CO2dRSe2.js";import{D as b}from"./DialogBody-BiDc-cx5.js";import{D as x}from"./DialogFooter-BVc2z30A.js";import{I as A}from"./IconIcon-CV2_x2Ph.js";import{D as B}from"./Dialog-eUMJ2Dvb.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-DpKAKOzx.js";import"./useFocusable-BkPz2jUo.js";import"./useFocusRing-DazNlEEP.js";import"./useEffectEvent-B9lMGAVd.js";import"./chain-Be7-UthQ.js";import"./index-DSZ_OKsr.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CmNyqXgd.js";import"./borderStyle-D9jrV09G.js";import"./input-w7lscfqM.js";import"./Checkbox-CuQYuj9-.js";import"./useFormValidationState-DTmP4RQz.js";import"./useControlledState-CWqFmmNz.js";import"./InputLabel-x-WELsow.js";import"./TooltipIcon-BtFtTPVp.js";import"./LegacyTooltip-CfKdtC00.js";import"./useLink-B7rNEif8.js";import"./usePopper-Cn4Ax5DO.js";import"./index-C24wWQAx.js";import"./Portal-DCpeslNE.js";import"./useMemoizedId-DjTqBnJN.js";import"./IconCheckMark-Dmyak26j.js";import"./IconExclamationMarkCircle24-CRkd1lO2.js";import"./IconExclamationMarkTriangle-BDu2EkUA.js";import"./IconExclamationMarkTriangle24-KxDFIeOs.js";import"./IconQuestionMarkCircle-vxY1VTd3.js";import"./IconMinus-CW5B4C6e.js";import"./Divider-BSNrebzZ.js";import"./Dropdown-Do1A28SM.js";import"./FocusScope-DFJXPtU-.js";import"./useOverlayTriggerState-CmTBHLo0.js";import"./useMenuTrigger-BN2mPx_D.js";import"./useLabels-IKbUOGnT.js";import"./useLocalizedStringFormatter-zYZl6qgC.js";import"./context-Bb45Js7W.js";import"./VisuallyHidden-Cc5ewCOX.js";import"./helper-BLtDcDe_.js";import"./keyboard-DyvKqn9z.js";import"./SelectionManager-CBBiz3LB.js";import"./useField-CSLWV9TO.js";import"./MenuItem-CDFlAASW.js";import"./IconCaretRight-rraPIaSH.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C5xsuSHO.js";import"./Trigger--YwYyZTv.js";import"./IconCaretDown-DpHCI3Yp.js";import"./IconCaretDown16-CkRNjSvj.js";import"./IconCross-hWz69XN8.js";import"./IconTrashBin16-44Dxj7Qi.js";import"./IconTrashBin24-BirpV8NM.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Bv8VBBeP.js";import"./FormControl-Dx4hg5c5.js";import"./Switch-BjfC3wlh.js";import"./TabItem-CPPHbQUq.js";import"./TextInput-DgpCjNGw.js";import"./Tooltip-BX2vtUCh.js";import"./useClickOutside-hjwC7AMP.js";import"./Tree-DvA5RdH9.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DOQgFyyQ.js";import"./IconIcon16-CJ1x6Fbr.js";import"./IconIcon24-C6paqj5F.js";const Go={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Jo=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,Jo as __namedExportsOrder,Go as default};
