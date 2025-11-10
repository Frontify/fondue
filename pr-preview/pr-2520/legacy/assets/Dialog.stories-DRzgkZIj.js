import{r as l,j as o}from"./iframe-BIfcB0X2.js";import{B as I}from"./Button-91rj7uoX.js";import{D as b}from"./DialogBody-CQ96piVe.js";import{D as x}from"./DialogFooter-5yMWkoEH.js";import{I as A}from"./IconIcon-Br86oMen.js";import{D as B}from"./Dialog-D6ppjI-1.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-OAyExbmo.js";import"./useButton-CNkmC7oi.js";import"./useFocusable-C-Xc2xVU.js";import"./useFocusRing-DHqNp4Q2.js";import"./useEffectEvent-CMLs76Ad.js";import"./chain-CHiwi0M-.js";import"./index-7Pi3A3mt.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-elrIA08Y.js";import"./borderStyle-D9jrV09G.js";import"./input-DcJA_M-3.js";import"./Divider-CkgHySjX.js";import"./Dropdown-C1a2GcpH.js";import"./FocusScope-D7jXQngg.js";import"./useOverlayTriggerState-BhO5QHIL.js";import"./useControlledState-SEwrKaho.js";import"./useMenuTrigger-BD6skHKO.js";import"./useLabels-CMk8Wm_k.js";import"./useLocalizedStringFormatter-UOmZs1KX.js";import"./context-CHUpiE9N.js";import"./VisuallyHidden-CS9EO2FH.js";import"./helper-CBHI6ZXE.js";import"./keyboard-SS7VUtrh.js";import"./SelectionManager-BB2Ad0T1.js";import"./useField-B0yrenGR.js";import"./useFormValidationState-CEWVO4VP.js";import"./usePopper-BkMdSZz_.js";import"./index-CLa14mTA.js";import"./MenuItem-CFu7WrwK.js";import"./IconCaretRight-DQxktYqx.js";import"./IconCheckMark-oDrSz9RN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CGKGcPF-.js";import"./Trigger-CLH_zzC8.js";import"./IconCaretDown-ZGyRgcq_.js";import"./IconCaretDown16-CSzlluEg.js";import"./IconCross-Dd61QjlE.js";import"./IconExclamationMarkTriangle-BRPLl85B.js";import"./IconExclamationMarkTriangle24-CWq69Q4w.js";import"./IconTrashBin16-Cy88ODv0.js";import"./IconTrashBin24-DzKpy64m.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-MtFHkrDy.js";import"./Portal-DO3N8iZr.js";import"./useMemoizedId-xtDXxhrd.js";import"./FormControl-DEm4sFJ8.js";import"./InputLabel-DkmK5SvI.js";import"./TooltipIcon-CIj69YaR.js";import"./LegacyTooltip-DyWCUoLz.js";import"./useLink-DAFaRtwo.js";import"./IconExclamationMarkCircle24-De_lyuU4.js";import"./IconQuestionMarkCircle-24RFih0R.js";import"./Switch-CLXJPlE5.js";import"./TabItem-BYBKEXeI.js";import"./TextInput-o6gUNCmh.js";import"./Tooltip-C3lyOxpW.js";import"./useClickOutside-cvpeTtw3.js";import"./Tree-CmHyBzYA.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-mMx-6p2p.js";import"./IconIcon16-wm0nAQfe.js";import"./IconIcon24-DRqKBAxx.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
