import{r as l,j as e}from"./iframe-BdpEJ73u.js";import{B as I}from"./Button-CyrRRo22.js";import{D as b}from"./DialogBody-CT3j9-ey.js";import{D as x}from"./DialogFooter-8_O_QIdl.js";import{I as A}from"./IconIcon-DninGn3h.js";import{D as B}from"./Dialog-CS7dEddo.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-MprHWY6w.js";import"./useButton-CzTp58mm.js";import"./useFocusable-dja3mNt3.js";import"./useFocusRing-BoREWGHn.js";import"./useEffectEvent-BtbNxUmw.js";import"./chain-CSPh-k5E.js";import"./index-CkqZHkB8.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-B8xOPFrQ.js";import"./borderStyle-D9jrV09G.js";import"./input-CiV_SEfN.js";import"./Divider-6_usVKa3.js";import"./FormControl-BFo-JPTy.js";import"./InputLabel-DebL1FVz.js";import"./TooltipIcon-DKBgdncx.js";import"./LegacyTooltip-ChszLcz-.js";import"./useLink-hiDguVaH.js";import"./usePopper-DodwAGz1.js";import"./index-DjmiaQRC.js";import"./Portal-DcQaeB9f.js";import"./useMemoizedId-CroDTlnv.js";import"./IconCheckMark-JGl78NQC.js";import"./IconExclamationMarkCircle24-oCV7DLvN.js";import"./IconExclamationMarkTriangle-BCFecG3K.js";import"./IconExclamationMarkTriangle24-DDeoj2zf.js";import"./IconQuestionMarkCircle-yKiZOJks.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-iQPwxUq0.js";import"./Switch-Cs2uWJoh.js";import"./TabItem-7kIsjaIc.js";import"./elements-BOYmskOL.js";import"./TextInput-wgiRUPvd.js";import"./IconCross-2s4J7Pvo.js";import"./Tooltip-BeCtgi9G.js";import"./useClickOutside-yhAcwUeS.js";import"./EnablePortalWrapper-C1kCJOjn.js";import"./Tree-CeZOBO5O.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-M8Uz0PUR.js";import"./IconCaretDown-DjMqE6GK.js";import"./IconCaretDown16-BPKmHEp2.js";import"./IconTrashBin16-D1isIcK9.js";import"./IconTrashBin24-CFqe0mJW.js";import"./Flex-_yPhTSLz.js";import"./IconIcon16-BoznwXcv.js";import"./IconIcon24-m8JrQ1p_.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
