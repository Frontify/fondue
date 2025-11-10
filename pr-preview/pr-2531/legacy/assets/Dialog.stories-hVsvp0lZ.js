import{r as l,j as o}from"./iframe-Bx9GVrJZ.js";import{B as I}from"./Button-Da3Gx_ir.js";import{D as b}from"./DialogBody-D_hU0Nj0.js";import{D as x}from"./DialogFooter-CBaQVBvJ.js";import{I as A}from"./IconIcon-Ct5V9yPm.js";import{D as B}from"./Dialog-BJ0MGSIS.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-1VD-WXX-.js";import"./useFocusable-Dn-i4bwA.js";import"./useFocusRing-C_gjdnsv.js";import"./useEffectEvent-B5LtIWRy.js";import"./chain-C8kX9J9x.js";import"./index-C-gYs3Hr.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CMjufgGn.js";import"./borderStyle-D9jrV09G.js";import"./input-CIGcvm77.js";import"./Checkbox-sW9wnNG2.js";import"./useFormValidationState-lVOleaOT.js";import"./useControlledState-BucMWiPd.js";import"./InputLabel-Oiy5y5vo.js";import"./TooltipIcon-_olP1H5z.js";import"./LegacyTooltip-CFgqf3d2.js";import"./useLink-A_GFgEa6.js";import"./usePopper-BsRWJAOy.js";import"./index-B_AR-7Zm.js";import"./Portal-C-f1HJei.js";import"./useMemoizedId-GZQJvteq.js";import"./IconCheckMark-DAJ8cKO8.js";import"./IconExclamationMarkCircle24-CG5Ngt4w.js";import"./IconExclamationMarkTriangle-BaN9k6Ci.js";import"./IconExclamationMarkTriangle24-DsN51Y9L.js";import"./IconQuestionMarkCircle-wL1ZuTv1.js";import"./IconMinus-QL3DQ7_H.js";import"./Divider-DkiqWb8u.js";import"./Dropdown-uCdqZBwA.js";import"./FocusScope-BWhix_t8.js";import"./useOverlayTriggerState-CNPfYaKC.js";import"./useMenuTrigger-Dq-KTEQX.js";import"./useLabels-CxNtTZQy.js";import"./useLocalizedStringFormatter-B0X-g_J7.js";import"./context-CVGDgHuw.js";import"./VisuallyHidden-BuG4UE6u.js";import"./helper-DImH7bvT.js";import"./keyboard-BDlz2Gq6.js";import"./SelectionManager-Cqcjm5ME.js";import"./useField-CX812b-c.js";import"./MenuItem-DhmRC9QT.js";import"./IconCaretRight-D1M-LicO.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BUBQ-nVM.js";import"./Trigger-CNpMaSFH.js";import"./IconCaretDown-ojAjKLdu.js";import"./IconCaretDown16-CZX7ke6L.js";import"./IconCross-yaftdHV6.js";import"./IconTrashBin16-BjKSA6mw.js";import"./IconTrashBin24-B_YShVa4.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DGsp_PpL.js";import"./FormControl-BXkKBcHn.js";import"./Switch-DZKRmo2d.js";import"./TabItem-CP7LJa8L.js";import"./TextInput-CEItFKq9.js";import"./Tooltip-CDtgP5s8.js";import"./useClickOutside-BSKSo8Jy.js";import"./Tree-DIr1AUUe.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-D2lYMPxP.js";import"./IconIcon16-K2Crls6R.js";import"./IconIcon24-DPxzJY9P.js";const Go={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
