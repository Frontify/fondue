import{r as l,j as o}from"./iframe-ZBzxbArn.js";import{B as I}from"./Button-BDszXWF0.js";import{D as b}from"./DialogBody-Bqi0vF0v.js";import{D as x}from"./DialogFooter-61LDevJ3.js";import{I as A}from"./IconIcon-DZ1beHTx.js";import{D as B}from"./Dialog-DiOMhzIH.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-MprHWY6w.js";import"./useButton-i2vqacWa.js";import"./useFocusable-CPEvtC5T.js";import"./useFocusRing-BHpblf3W.js";import"./useEffectEvent-47HRTxvC.js";import"./chain-DAcxjXHC.js";import"./index-DbMVle2u.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BPqSCkPF.js";import"./borderStyle-D9jrV09G.js";import"./input-BzYoFFy5.js";import"./Divider-D9FhI6gu.js";import"./Dropdown-D6nN_xEs.js";import"./FocusScope-C4btTEqJ.js";import"./useOverlayTriggerState-2YbKRCVD.js";import"./useControlledState-C_9hrWzg.js";import"./useMenuTrigger-C7dQt0oA.js";import"./useLabels-C7dgcpc6.js";import"./useLocalizedStringFormatter-Bknzc5NA.js";import"./context-BVdZCpgd.js";import"./VisuallyHidden-VDRSVgn1.js";import"./helper-CleliKad.js";import"./keyboard-BdQ3GXnL.js";import"./SelectionManager-CO89k0Lp.js";import"./useField-BjLftB08.js";import"./useFormValidationState-LLEBpEZb.js";import"./usePopper-BRbvfqPp.js";import"./index-9u2jQVh5.js";import"./MenuItem-BeGU14ZQ.js";import"./IconCaretRight-B0NvaRgO.js";import"./IconCheckMark-CBm-qzwJ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CZUeI1Yx.js";import"./Trigger-C1CC5bMu.js";import"./IconCaretDown-SrDnbT9o.js";import"./IconCaretDown16-DuU1x2NN.js";import"./IconCross-DBdrJD8S.js";import"./IconExclamationMarkTriangle-vqSG40-8.js";import"./IconExclamationMarkTriangle24-eemjMsXD.js";import"./IconTrashBin16-B73vZS1U.js";import"./IconTrashBin24-CEMMDIFd.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-z4dkC-j5.js";import"./Portal-C4FDx-2h.js";import"./useMemoizedId-Bd15RR4S.js";import"./FormControl-C7egNDZd.js";import"./InputLabel-DGt8GQku.js";import"./TooltipIcon-x4xHrbRJ.js";import"./LegacyTooltip-DSvGStx4.js";import"./useLink-Cp_DjxIu.js";import"./IconExclamationMarkCircle24--uZcXafv.js";import"./IconQuestionMarkCircle-qbD80NFS.js";import"./Switch-IjpeXAgT.js";import"./TabItem-BxymVC9K.js";import"./TextInput-DMUjBzmq.js";import"./Tooltip-B8A3rhwm.js";import"./useClickOutside-CLqSf55U.js";import"./Tree-Bz3mC0DX.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Baa8O_x_.js";import"./IconIcon16-DBeDrwzf.js";import"./IconIcon24-CF83sLeV.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
