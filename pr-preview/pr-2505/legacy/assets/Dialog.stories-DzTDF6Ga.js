import{r as l,j as o}from"./iframe-O6Xb67gi.js";import{B as b}from"./Button-fwlsdqhf.js";import{D as x}from"./DialogBody-BPYdeEy2.js";import{D as I}from"./DialogFooter-CtJjVeuI.js";import{I as A}from"./IconJohanna-Ba-KF0gm.js";import{D as B}from"./Dialog-BpqdryZi.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DpV-BRze.js";import"./useButton-D5BwoBXI.js";import"./useFocusable-CIKgwDH6.js";import"./useFocusRing-CHeGnMQA.js";import"./useEffectEvent-DTA_MKoh.js";import"./chain-CQUeJXJW.js";import"./index-CQ6zbiUp.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BHmfZPGu.js";import"./borderStyle-D9jrV09G.js";import"./input-C1Wd_Pe4.js";import"./Divider-OLZKORyi.js";import"./Dropdown-DkJ1LQLr.js";import"./FocusScope--mUmRhU_.js";import"./useOverlayTriggerState-C-z83KL3.js";import"./useControlledState-Bqg_pIq_.js";import"./useMenuTrigger-BdgnVO0V.js";import"./useLabels-BSIpPAgP.js";import"./useLocalizedStringFormatter-Cz4luPbj.js";import"./context-ByKPL08u.js";import"./VisuallyHidden-B2p5YlCX.js";import"./helper-DUvrElbv.js";import"./keyboard-B1J9S0AG.js";import"./SelectionManager-bbMc2UWc.js";import"./useField-CsabfYa2.js";import"./useFormValidationState-DWOowmKC.js";import"./usePopper-DUNlXtjr.js";import"./index-B9jSwJHi.js";import"./MenuItem-DBzSyDfl.js";import"./IconCaretRight-C-Bl03aw.js";import"./IconCheckMark-CKGB0Mef.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BypHdLvW.js";import"./Trigger-DPZTu-hN.js";import"./IconCaretDown-CbXQpFjn.js";import"./IconCaretDown16-spw0sC6J.js";import"./IconCross-BxWaSX4m.js";import"./IconExclamationMarkTriangle-C1H0ir6P.js";import"./IconExclamationMarkTriangle24-DYPgUd-A.js";import"./IconTrashBin16-DBuvi8VI.js";import"./IconTrashBin24-1mHVIMfW.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-D4p2tHkH.js";import"./Portal-D436pgRI.js";import"./useMemoizedId-DoJPVw-z.js";import"./FormControl-By4HoBU2.js";import"./InputLabel-Bhp6BFGH.js";import"./TooltipIcon-COw8BRsT.js";import"./LegacyTooltip-Bv0XhaDP.js";import"./useLink-BbG6K7ZD.js";import"./IconExclamationMarkCircle24-1lif7gA0.js";import"./IconQuestionMarkCircle-BIFVHJje.js";import"./Switch-OtYNeozi.js";import"./TabItem-B01iiyD0.js";import"./TextInput-CfBurs0_.js";import"./Tooltip-BsVrbu4u.js";import"./useClickOutside--9sKWVao.js";import"./Tree-BAe8On3F.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Br6p_LRl.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
