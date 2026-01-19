import{r as l,j as e}from"./iframe-DWv2_3F3.js";import{B as I}from"./Button-3b6YjLG-.js";import{D as b}from"./DialogBody-BUUH1s__.js";import{D as x}from"./DialogFooter-D8DApMbJ.js";import{I as A}from"./IconIcon-2mVzQxe5.js";import{D as B}from"./Dialog-DaRabmbz.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-OAyExbmo.js";import"./useButton-C7s8up6S.js";import"./useFocusable-qSwycdkT.js";import"./useFocusRing-C16v0dJv.js";import"./useEffectEvent-juQ_2xsn.js";import"./chain-DnIzMUek.js";import"./index-CLQYMQ4B.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DZV4Rol0.js";import"./borderStyle-D9jrV09G.js";import"./input-DOHXhmdp.js";import"./Divider-CJHNe1Lx.js";import"./FormControl-DPSEspuo.js";import"./InputLabel-BpbBpTEJ.js";import"./TooltipIcon-BWW4VUwK.js";import"./LegacyTooltip-Bkj0Y90d.js";import"./useLink-xo2YEpBC.js";import"./usePopper-DLcHPtMx.js";import"./index-DHnyPWvB.js";import"./Portal-BV8sDH92.js";import"./useMemoizedId-BszDH4v2.js";import"./IconCheckMark-BP-kTSCX.js";import"./IconExclamationMarkCircle24-BFKPQHIe.js";import"./IconExclamationMarkTriangle-DLLktyep.js";import"./IconExclamationMarkTriangle24-N_dmScL6.js";import"./IconQuestionMarkCircle-liTEEGY2.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DXJsvyyy.js";import"./Switch-DPVCwgoR.js";import"./TabItem-DswxiGFz.js";import"./elements-BOYmskOL.js";import"./TextInput-BwolyqU0.js";import"./IconCross-CMrthrPn.js";import"./Tooltip-DeBt6Am5.js";import"./useClickOutside-DJjP4yWs.js";import"./EnablePortalWrapper-ZVyNR658.js";import"./Tree-D-vkmlIL.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BEkDJK5J.js";import"./IconCaretDown-BseuEDR4.js";import"./IconCaretDown16-CmK_73p0.js";import"./IconTrashBin16-Dn2w5CcX.js";import"./IconTrashBin24-v2Dg-pXu.js";import"./Flex-BENIsi-Q.js";import"./IconIcon16-Q05PI63p.js";import"./IconIcon24-Cxd-0MaE.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Me=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Me as __namedExportsOrder,Ce as default};
