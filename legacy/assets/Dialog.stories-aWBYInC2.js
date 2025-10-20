import{r as l,j as o}from"./iframe-rp4tXvK6.js";import{B as b}from"./Button-K5oMp-8A.js";import{D as x}from"./DialogBody-_tZt2ntx.js";import{D as I}from"./DialogFooter-C0tUgm8x.js";import{I as A}from"./IconJohanna-DvP2DKcr.js";import{D as B}from"./Dialog-bMJMjixa.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-Br0F6n1W.js";import"./useFocusable-BXSsLKfC.js";import"./useFocusRing-CWvOmuKZ.js";import"./useEffectEvent-B0iZo-5j.js";import"./chain-4_YXu52x.js";import"./index-BiHInXmF.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-2dTAdpb8.js";import"./borderStyle-D9jrV09G.js";import"./input-BhBf-420.js";import"./Divider-BqYvBMoL.js";import"./Dropdown-CxVEn7Ee.js";import"./FocusScope-DS4FnLeH.js";import"./useOverlayTriggerState-BEZ2lrWP.js";import"./useControlledState-CX_cH9Ot.js";import"./useMenuTrigger-AUhvJe9v.js";import"./useLabels-CK5UeFmu.js";import"./useLocalizedStringFormatter-CJs-_R01.js";import"./context-Bt6ZMdHa.js";import"./VisuallyHidden-wRfshC6s.js";import"./helper-DAqcxCSd.js";import"./keyboard-Dl2NWKmf.js";import"./SelectionManager-BL4wQlQg.js";import"./useField-CvqfyaBW.js";import"./useFormValidationState-BWKkO5l0.js";import"./usePopper-D4FJxQQU.js";import"./index-BYPbgCc9.js";import"./MenuItem-DrfZk6bm.js";import"./IconCaretRight-C06zx3vP.js";import"./IconCheckMark-BGU497N_.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-jwtl8KLB.js";import"./Trigger-B0mWSjy0.js";import"./IconCaretDown-2pKBTVXl.js";import"./IconCaretDown16-0TQW92SM.js";import"./IconCross-BdcwsUq9.js";import"./IconExclamationMarkTriangle-DiSrNeKR.js";import"./IconExclamationMarkTriangle24-wUfSIYbA.js";import"./IconTrashBin16-7vreT6af.js";import"./IconTrashBin24-DBiRwG0M.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DCsum9UA.js";import"./Portal-C6lyvz6z.js";import"./useMemoizedId-Crrjl7nt.js";import"./FormControl-DJASPagM.js";import"./InputLabel-CFfHIgFB.js";import"./TooltipIcon-BQzsb3pk.js";import"./LegacyTooltip-DSvPmMNC.js";import"./useLink-B7X21rmN.js";import"./IconExclamationMarkCircle24-XfyTkQV4.js";import"./IconQuestionMarkCircle-xJoVN4sY.js";import"./Switch-CCAjHMbz.js";import"./TabItem-lQw6FqM2.js";import"./TextInput-CrXCZLZg.js";import"./Tooltip-BofyqpBt.js";import"./useClickOutside-XwQX8AXH.js";import"./Tree-DUNDCnFz.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BU3ndr-r.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
