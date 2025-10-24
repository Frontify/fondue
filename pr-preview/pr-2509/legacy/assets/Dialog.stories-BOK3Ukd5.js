import{r as l,j as o}from"./iframe-D7sy4xpx.js";import{B as b}from"./Button-DEB8PLLZ.js";import{D as x}from"./DialogBody-BBgUIDr9.js";import{D as I}from"./DialogFooter-DfIcyVh7.js";import{I as A}from"./IconJohanna-DKArDACk.js";import{D as B}from"./Dialog-aOoiT6LM.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D5qcpbyD.js";import"./useButton-BzdN_3XI.js";import"./useFocusable-b3_Iq_aJ.js";import"./useFocusRing-WiOBaN36.js";import"./useEffectEvent-DlN4b1VG.js";import"./chain-BymMFmeJ.js";import"./index-DwQQnJlT.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-S-zoCEGs.js";import"./borderStyle-D9jrV09G.js";import"./input-4t-GCPBE.js";import"./Divider-SPqxn73n.js";import"./Dropdown-Bu55er1w.js";import"./FocusScope-i-5CSdu1.js";import"./useOverlayTriggerState-BcGtZFB6.js";import"./useControlledState-DwGGjx3X.js";import"./useMenuTrigger-Dvlm422P.js";import"./useLabels-Blyommyn.js";import"./useLocalizedStringFormatter-DvaMBSMR.js";import"./context-B61iDk61.js";import"./VisuallyHidden-CeceVG54.js";import"./helper-ChSewBYb.js";import"./keyboard-BoxrP_Gl.js";import"./SelectionManager-vVt0pswu.js";import"./useField-B01EU0XD.js";import"./useFormValidationState-D9XgnKSN.js";import"./usePopper-CJvB9LLR.js";import"./index-3l7JjlNh.js";import"./MenuItem-CvdFQWLC.js";import"./IconCaretRight-grzHKMpF.js";import"./IconCheckMark-CIqMCS41.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BQ0evsM9.js";import"./Trigger-DJDqn6_h.js";import"./IconCaretDown-BcvnAaV6.js";import"./IconCaretDown16-C1emQBb_.js";import"./IconCross-drLq2WNq.js";import"./IconExclamationMarkTriangle-BfrYu7jT.js";import"./IconExclamationMarkTriangle24-CUOt1Yz_.js";import"./IconTrashBin16-CZgyFd-i.js";import"./IconTrashBin24-D7P9aEXw.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-fTgbhwPV.js";import"./Portal-B_6AOlsI.js";import"./useMemoizedId-CwwPF4gy.js";import"./FormControl-D5oAbp8P.js";import"./InputLabel-CYvYAlW9.js";import"./TooltipIcon-BGEDG3-W.js";import"./LegacyTooltip-cn45ntVE.js";import"./useLink-CL4VGZfG.js";import"./IconExclamationMarkCircle24-D5O0dO8v.js";import"./IconQuestionMarkCircle-C2ycqPAW.js";import"./Switch-DPWAfSEu.js";import"./TabItem-Chmjtcut.js";import"./TextInput-Bx10SaWy.js";import"./Tooltip-Bg8kSzf3.js";import"./useClickOutside-OCCiafFp.js";import"./Tree-CCvSBT-2.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-d7a7vw3v.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
