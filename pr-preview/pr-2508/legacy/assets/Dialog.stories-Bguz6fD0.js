import{r as l,j as o}from"./iframe-G9JT5kV6.js";import{B as b}from"./Button-Bab7Gocy.js";import{D as x}from"./DialogBody-DLPbsoos.js";import{D as I}from"./DialogFooter-Dt_4_q07.js";import{I as A}from"./IconJohanna-C4neRtvt.js";import{D as B}from"./Dialog-BfJLa8hh.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-BT-T7auE.js";import"./useButton-DRJTCrJS.js";import"./useFocusable-_OrUWNR5.js";import"./useFocusRing-nqJc486L.js";import"./useEffectEvent-BtkyKS4G.js";import"./chain-Dq4AkA76.js";import"./index-ixDem6kg.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BXjR2_Z3.js";import"./borderStyle-D9jrV09G.js";import"./input-CyIEBhYg.js";import"./Divider-BphgxLdT.js";import"./Dropdown-DKBYnEUG.js";import"./FocusScope-BQmzPqxS.js";import"./useOverlayTriggerState-CMU_LIfs.js";import"./useControlledState-Cj5gkz49.js";import"./useMenuTrigger-BlRHj5bV.js";import"./useLabels-KuIW6JFx.js";import"./useLocalizedStringFormatter-M66PnT3E.js";import"./context-D-Ee0elB.js";import"./VisuallyHidden-e-4RAJYE.js";import"./helper-C4FDoqim.js";import"./keyboard-BKMGdIrx.js";import"./SelectionManager-BxHqVy6b.js";import"./useField-B7g4wq1Y.js";import"./useFormValidationState-CYiU8C3p.js";import"./usePopper-CO8wOoTT.js";import"./index-BIhVL1ld.js";import"./MenuItem-DdrQgOb6.js";import"./IconCaretRight-1JdDjgKO.js";import"./IconCheckMark-BSYvEIzf.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BnxRTcOc.js";import"./Trigger-B8TaoXJF.js";import"./IconCaretDown-CrHZrdXv.js";import"./IconCaretDown16-DcFtQQYB.js";import"./IconCross-Bqxox6ZH.js";import"./IconExclamationMarkTriangle-DVD-it4x.js";import"./IconExclamationMarkTriangle24-DCgtctLG.js";import"./IconTrashBin16-C34r7-hb.js";import"./IconTrashBin24-D6DR5WcG.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-u-oEUjA8.js";import"./Portal-BaI4ybdx.js";import"./useMemoizedId-TQZvyQJc.js";import"./FormControl-Cp0g-HlA.js";import"./InputLabel-TK4YHNFL.js";import"./TooltipIcon-D4kwX34e.js";import"./LegacyTooltip-Dp6OP9ku.js";import"./useLink-CXoGfmc2.js";import"./IconExclamationMarkCircle24-Yrdvbpyd.js";import"./IconQuestionMarkCircle-COwcdCLG.js";import"./Switch-DK-d02t4.js";import"./TabItem-BJhUeMKX.js";import"./TextInput-CZsf1API.js";import"./Tooltip-CTni-LrV.js";import"./useClickOutside-Riqja6k4.js";import"./Tree-CEaSpKgj.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CFQIkk-S.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
