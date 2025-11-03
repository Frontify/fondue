import{r as l,j as o}from"./iframe-DXv6_zxw.js";import{B as I}from"./Button-DB7dFfFM.js";import{D as b}from"./DialogBody-BpBSwj_T.js";import{D as x}from"./DialogFooter-vU1Ey0Lw.js";import{I as A}from"./IconIcon-DMRRS0M3.js";import{D as B}from"./Dialog-CbjQi2vv.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DuVWtNEG.js";import"./useButton-BWcd71sq.js";import"./useFocusable-C6g0tqIP.js";import"./useFocusRing-BDH3dCmG.js";import"./useEffectEvent-Cb0J6-Z5.js";import"./chain-Cep8FPJT.js";import"./index-D5d5qoat.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-hQidnB8s.js";import"./borderStyle-D9jrV09G.js";import"./input-E2C5Vnav.js";import"./Dropdown-CN2QCvAy.js";import"./FocusScope-DF8eB_8k.js";import"./useOverlayTriggerState-BF9Ejr7z.js";import"./useControlledState-DDv6-Uf2.js";import"./useMenuTrigger-CSV6ff0t.js";import"./useLabels-C9c88eWi.js";import"./useLocalizedStringFormatter-C9M-JYBw.js";import"./context-dXxHuuPL.js";import"./VisuallyHidden-NB3jxiiY.js";import"./helper-CDVeeeSq.js";import"./keyboard-cPqzm9YB.js";import"./SelectionManager-CiO-adce.js";import"./useField-vps60C3F.js";import"./useFormValidationState-Dg9NlgVh.js";import"./usePopper-DoCz1CAH.js";import"./index-DTurQfMI.js";import"./MenuItem-Caq1dhQs.js";import"./IconCaretRight-B-1fyYMe.js";import"./IconCheckMark-DMtvZSaL.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CtBuO66S.js";import"./Trigger-DJZQqjTl.js";import"./IconCaretDown-COFec5dc.js";import"./IconCaretDown16-K8LLN_zE.js";import"./IconCross-ChoN4EKq.js";import"./IconExclamationMarkTriangle-3n2PXe_1.js";import"./IconExclamationMarkTriangle24-BbOn-BSr.js";import"./IconTrashBin16-DydGqa1B.js";import"./IconTrashBin24-DuDeaqYC.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CUHPqDOI.js";import"./Portal-Cq_WqqFl.js";import"./useMemoizedId-BtQw0SRa.js";import"./FormControl-5qp0V7R7.js";import"./InputLabel-BqHeIl9A.js";import"./TooltipIcon-B5Y25Mx8.js";import"./LegacyTooltip-Bkscll9N.js";import"./useLink-XVzpit63.js";import"./IconExclamationMarkCircle24-McNHjZdr.js";import"./IconQuestionMarkCircle-B6JXS_eg.js";import"./Switch-D9Cyv3s_.js";import"./TabItem-CKM5VRvc.js";import"./TextInput-DvIqlsWQ.js";import"./Tooltip-CrVDz4tQ.js";import"./useClickOutside-Dz50VxsE.js";import"./Tree-D-E_zzFb.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-gxqJk_7I.js";import"./IconIcon16-DocUnJGW.js";import"./IconIcon24-DrSsBoZm.js";const wo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const zo=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,zo as __namedExportsOrder,wo as default};
