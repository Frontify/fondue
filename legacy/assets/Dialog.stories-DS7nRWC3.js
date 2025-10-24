import{r as l,j as o}from"./iframe-xk1vLOp0.js";import{B as b}from"./Button-BDfk1GAp.js";import{D as x}from"./DialogBody-E_gVVTTf.js";import{D as I}from"./DialogFooter-4WGPY_an.js";import{I as A}from"./IconJohanna-BgjyQkVb.js";import{D as B}from"./Dialog-J77onax-.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-DVBleBPx.js";import"./useFocusable-DMpt9YP_.js";import"./useFocusRing-Cd2XRZg0.js";import"./useEffectEvent-BjDNl9OE.js";import"./chain-Ct5H3mE4.js";import"./index-CfHX2Wg2.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-mEuDaPks.js";import"./borderStyle-D9jrV09G.js";import"./input-DQi93OXc.js";import"./Checkbox-BDHm3nmY.js";import"./useFormValidationState-C4HEZm9c.js";import"./useControlledState-sFywO5I-.js";import"./InputLabel-CKCtkZJu.js";import"./TooltipIcon-CjhCXMFE.js";import"./LegacyTooltip-DFmu5-8O.js";import"./useLink-BuoFStRX.js";import"./usePopper-Ja3ynHP-.js";import"./index-v42I2N6P.js";import"./Portal-CcS2aujD.js";import"./useMemoizedId-DNCYjqen.js";import"./IconCheckMark-CZRtbEQD.js";import"./IconExclamationMarkCircle24-D7sTGgkk.js";import"./IconExclamationMarkTriangle-D1Rp3cke.js";import"./IconExclamationMarkTriangle24-Dcd-X1K7.js";import"./IconQuestionMarkCircle-BvBztHwq.js";import"./IconMinus-CyK0suNY.js";import"./Divider-c1srpwsu.js";import"./Dropdown-D4CKN3Yl.js";import"./FocusScope-EbRQ0Guv.js";import"./useOverlayTriggerState-D-Z8dNYM.js";import"./useMenuTrigger-DHZu3ZPY.js";import"./useLabels-lxgQttMN.js";import"./useLocalizedStringFormatter-i_SGUCjN.js";import"./context-BZ0Ub6M7.js";import"./VisuallyHidden-CR78Mz5T.js";import"./helper-Cai0qWzg.js";import"./keyboard-yMV5D90t.js";import"./SelectionManager-BOLg2PNO.js";import"./useField-Bu-QY__9.js";import"./MenuItem-fUS3Gbeo.js";import"./IconCaretRight-BbznFg1A.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BJF6o0jm.js";import"./Trigger-BJxh1iXv.js";import"./IconCaretDown-x05uh9Bd.js";import"./IconCaretDown16-Dah412Df.js";import"./IconCross-_hgb6uSI.js";import"./IconTrashBin16-BRdjN3Qb.js";import"./IconTrashBin24-CFcOsdbb.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DxmYvQ98.js";import"./FormControl-pa0Ro9Q8.js";import"./Switch-CeWE716z.js";import"./TabItem-D54vmuw7.js";import"./TextInput-Bof6OvPM.js";import"./Tooltip-D0_Z4MgN.js";import"./useClickOutside-WTAjM1BO.js";import"./Tree-eLoCCjyC.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-B3F-pczw.js";const wo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const zo=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,zo as __namedExportsOrder,wo as default};
