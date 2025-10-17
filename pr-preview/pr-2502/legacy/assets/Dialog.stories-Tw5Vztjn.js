import{r as l,j as e}from"./iframe-CLWR3nUG.js";import{B as b}from"./Button-BXJ3LDeK.js";import{D as x}from"./DialogBody-C6oKKznT.js";import{D as I}from"./DialogFooter-7NCxnim2.js";import{I as A}from"./IconJohanna-166uepjK.js";import{D as B}from"./Dialog-BsnlwgRp.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B933Jwna.js";import"./useButton--zqKr1UY.js";import"./useFocusable-DqLL_9nB.js";import"./useFocusRing-BSAt-4Vk.js";import"./useEffectEvent-CAs0gB5n.js";import"./chain-BXOE_HCM.js";import"./index-B_9kxJ6p.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DwNuBeM8.js";import"./borderStyle-D9jrV09G.js";import"./input-cej4Nzn4.js";import"./Checkbox-C_BnGEqa.js";import"./useFormValidationState-DsxgvnBE.js";import"./useControlledState-Bgj_pg2k.js";import"./InputLabel-Cqx25nUO.js";import"./TooltipIcon-4N5NOwNP.js";import"./LegacyTooltip-BxpYtXmg.js";import"./useLink-PH1jH_sQ.js";import"./usePopper-BaDtouo_.js";import"./index-D3ZbXnsu.js";import"./Portal-BdiWRCVg.js";import"./useMemoizedId-nabCRXrC.js";import"./IconCheckMark-Dpv-CvL4.js";import"./IconExclamationMarkCircle24-ClOhu_Ri.js";import"./IconExclamationMarkTriangle-znDU4MK2.js";import"./IconExclamationMarkTriangle24-zD4-cjbh.js";import"./IconQuestionMarkCircle-C0WF9A0R.js";import"./IconMinus-VNqTPRc-.js";import"./Divider-_9r1eMvR.js";import"./FormControl-DLFZlT_c.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTZpP-I5.js";import"./Switch-DpryGfG2.js";import"./TabItem-Buh8QC_x.js";import"./elements-BOYmskOL.js";import"./TextInput-G_lGNFDI.js";import"./IconCross-XzksfC__.js";import"./Tooltip-DiNOHaH5.js";import"./useClickOutside-CwgrC7Jz.js";import"./EnablePortalWrapper-D2eOtS_g.js";import"./Tree-CBjgRRIE.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DvFAWHP-.js";const Ie={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const Ae=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Ae as __namedExportsOrder,Ie as default};
