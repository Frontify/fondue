import{r as l,j as o}from"./iframe-H4EIHqlx.js";import{B as b}from"./Button-CXaEniIA.js";import{D as x}from"./DialogBody-DhEbP-Iq.js";import{D as I}from"./DialogFooter-DZirG7P0.js";import{I as A}from"./IconJohanna-B30UxU1C.js";import{D as B}from"./Dialog-CE_YSbuq.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-mGVAuZHj.js";import"./useFocusable-DTCa4SqE.js";import"./useFocusRing-BgUd5BR7.js";import"./useEffectEvent-C_IQxYhx.js";import"./chain-DQvBJnse.js";import"./index-DlrjtBmU.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CeL6hrg8.js";import"./borderStyle-D9jrV09G.js";import"./input-DFiASiDy.js";import"./Divider-zfqb8AiO.js";import"./Dropdown-D9la7LTr.js";import"./FocusScope-qW6Sf1bq.js";import"./useOverlayTriggerState-D-nAPxky.js";import"./useControlledState-BwCEOs4d.js";import"./useMenuTrigger-2a9WK_4Y.js";import"./useLabels-FTiAqVtv.js";import"./useLocalizedStringFormatter-A6H_epb7.js";import"./context-pc1t5AW0.js";import"./VisuallyHidden-BxoBsTUN.js";import"./helper-BLUOy31a.js";import"./keyboard-Bgy3IRLV.js";import"./SelectionManager-CzbgPH4w.js";import"./useField-CEvqkjOx.js";import"./useFormValidationState-CMOyU9tG.js";import"./usePopper-BDBm9nqb.js";import"./index-DsgG594b.js";import"./MenuItem-Dabj5Jcl.js";import"./IconCaretRight-DSSd_h10.js";import"./IconCheckMark-CHxLPHD4.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-cqNAwJed.js";import"./Trigger-EEtgFzPe.js";import"./IconCaretDown-D2PohoYe.js";import"./IconCaretDown16-CI4FxQbC.js";import"./IconCross-CxjY-Hqb.js";import"./IconExclamationMarkTriangle-K99hKmWz.js";import"./IconExclamationMarkTriangle24-ChMo0sGD.js";import"./IconTrashBin16-DnTUTGRm.js";import"./IconTrashBin24-cmiN-QmN.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DYlU6loR.js";import"./Portal-CW7VmUKg.js";import"./useMemoizedId-UwiqPoY6.js";import"./FormControl-Cc6HWobq.js";import"./InputLabel-Dn-dwoK-.js";import"./TooltipIcon-BIasiFqw.js";import"./LegacyTooltip-CjQ6vgqx.js";import"./useLink-d86eSztZ.js";import"./IconExclamationMarkCircle24-CzbbaGxH.js";import"./IconQuestionMarkCircle-DGOXOD6s.js";import"./Switch-CVeASn2J.js";import"./TabItem-D2N0FtOf.js";import"./TextInput-D6FRwz5L.js";import"./Tooltip-m5iD4_xo.js";import"./useClickOutside-BTiX37Ac.js";import"./Tree-CwejBv94.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-ChMiINvK.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const No=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,No as __namedExportsOrder,_o as default};
