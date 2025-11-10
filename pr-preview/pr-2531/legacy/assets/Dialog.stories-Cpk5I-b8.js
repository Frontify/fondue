import{r as l,j as o}from"./iframe-ahMwwdsf.js";import{B as I}from"./Button-w0YMQI20.js";import{D as b}from"./DialogBody-B2GvHwT1.js";import{D as x}from"./DialogFooter-DHRM7dUo.js";import{I as A}from"./IconIcon-BnybImGF.js";import{D as B}from"./Dialog-D3TvPc65.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-DLhm0yas.js";import"./useFocusable-Ch_wBML2.js";import"./useFocusRing-DaQclxv6.js";import"./useEffectEvent-Bed0HKrm.js";import"./chain-C53qR8mF.js";import"./index-B6RK_iYZ.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C8LnBuXA.js";import"./borderStyle-D9jrV09G.js";import"./input--7aMGOFq.js";import"./Divider-DpgHFPV1.js";import"./Dropdown-svNldc3Q.js";import"./FocusScope-Bzv2WeXp.js";import"./useOverlayTriggerState-Bu5TuFq8.js";import"./useControlledState-DNYTr6ro.js";import"./useMenuTrigger-B0mf0h1D.js";import"./useLabels-Dts9_kB5.js";import"./useLocalizedStringFormatter-B3uWwqsq.js";import"./context-Cwx5vL9r.js";import"./VisuallyHidden-DUEyq-Cs.js";import"./helper-DY0o5nBN.js";import"./keyboard-CXAxgyJA.js";import"./SelectionManager-Cf_3T95Q.js";import"./useField-B-F_ybfn.js";import"./useFormValidationState-9z_gHNgo.js";import"./usePopper-CDxDTjFc.js";import"./index-CVrNqSrl.js";import"./MenuItem-BeGq7gvA.js";import"./IconCaretRight-YmhPr-ED.js";import"./IconCheckMark-CJeheIoj.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CpxXuuZu.js";import"./Trigger-Bg-sKnk_.js";import"./IconCaretDown-BWkY7x9m.js";import"./IconCaretDown16-BCuUFWC8.js";import"./IconCross-DtgV0uoe.js";import"./IconExclamationMarkTriangle-BZvUO_9Q.js";import"./IconExclamationMarkTriangle24-CrA51qy3.js";import"./IconTrashBin16-BvirWvL2.js";import"./IconTrashBin24-Dyp1RBtU.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BwU3w8We.js";import"./Portal-DKS8nUwW.js";import"./useMemoizedId-CZOTONQe.js";import"./FormControl-Cz8QE23N.js";import"./InputLabel-RKPNgSoW.js";import"./TooltipIcon-9SG9vwuW.js";import"./LegacyTooltip-8C24OgCi.js";import"./useLink-BQDoW3mf.js";import"./IconExclamationMarkCircle24-BSoLODou.js";import"./IconQuestionMarkCircle-DwcKSdMS.js";import"./Switch-wdnbPpFm.js";import"./TabItem-D5LwT7_5.js";import"./TextInput-Dz32-b9A.js";import"./Tooltip-BU8jlWYN.js";import"./useClickOutside-J1ExsWnc.js";import"./Tree-DHmt4Idc.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DRJ62vin.js";import"./IconIcon16-Bv3E9ZmX.js";import"./IconIcon24-CRCY95mk.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
