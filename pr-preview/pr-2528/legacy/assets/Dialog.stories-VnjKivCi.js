import{r as l,j as e}from"./iframe-CDRstm0C.js";import{B as I}from"./Button-D_bQ7VR6.js";import{D as b}from"./DialogBody-CKf3dQRE.js";import{D as x}from"./DialogFooter-Bljt6oqK.js";import{I as A}from"./IconIcon-CdbYs8L3.js";import{D as B}from"./Dialog-C2KtA9eO.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C7xgB0v-.js";import"./useButton-0YDeVxAZ.js";import"./useFocusable-B15QcTZF.js";import"./useFocusRing-UE97zQCw.js";import"./useEffectEvent-DzdohreD.js";import"./chain-nZg9lPIx.js";import"./index-DjgXOIjb.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BgOrf3UO.js";import"./borderStyle-D9jrV09G.js";import"./input-DOmezKEq.js";import"./FormControl-BMOfwmhC.js";import"./InputLabel-Cs5CZTpg.js";import"./TooltipIcon-BwT6eVvl.js";import"./LegacyTooltip-DvSdpi8G.js";import"./useLink-8zG_vWba.js";import"./usePopper-DPsNEqxC.js";import"./index-F0GCa985.js";import"./Portal-C2RK98Mp.js";import"./useMemoizedId-lvykKVxc.js";import"./IconCheckMark-Br7aTwB8.js";import"./IconExclamationMarkCircle24-DaaHPybN.js";import"./IconExclamationMarkTriangle-DVll2-1a.js";import"./IconExclamationMarkTriangle24-YbouCJLf.js";import"./IconQuestionMarkCircle-2BNxGubK.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-SAaKEIFA.js";import"./Switch-_bNcJ9jc.js";import"./TabItem-DaCdgH_t.js";import"./elements-BOYmskOL.js";import"./TextInput-DQx74ckt.js";import"./IconCross-zQeoCE8b.js";import"./Tooltip-C0ivaCGJ.js";import"./useClickOutside-B_ETivn7.js";import"./EnablePortalWrapper-CfV2-txn.js";import"./Tree-DbKNVcoZ.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DG9gd2Uq.js";import"./IconCaretDown-_xIch-96.js";import"./IconCaretDown16-ttgvU4nX.js";import"./IconTrashBin16-TK6B-iwP.js";import"./IconTrashBin24-D8bBYc2Y.js";import"./Flex-DSR3Timc.js";import"./IconIcon16-DL3aASQL.js";import"./IconIcon24-IH8Oc-OY.js";const ke={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Ce=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Ce as __namedExportsOrder,ke as default};
