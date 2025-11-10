import{r as l,j as o}from"./iframe-CfBLd35K.js";import{B as I}from"./Button-BMq1fE2z.js";import{D as b}from"./DialogBody-C4Zwdxq3.js";import{D as x}from"./DialogFooter-Oy9w8mHO.js";import{I as A}from"./IconIcon-w-cmo38_.js";import{D as B}from"./Dialog-BkT2qFQK.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-HWEtsWO-.js";import"./useFocusable-BcIBCRrh.js";import"./useFocusRing-HQOnF_Kw.js";import"./useEffectEvent-DtYDcY6c.js";import"./chain-pG_FVjze.js";import"./index-Bt8gmfke.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BW40DMyr.js";import"./borderStyle-D9jrV09G.js";import"./input-LRIhm9ZT.js";import"./Divider-CEFbS-0k.js";import"./Dropdown-msJI69H3.js";import"./FocusScope-NaJ6X-7k.js";import"./useOverlayTriggerState-6pXikwCB.js";import"./useControlledState-C9WHfCYO.js";import"./useMenuTrigger-zDXar3N1.js";import"./useLabels-DT9Bb-sB.js";import"./useLocalizedStringFormatter-BvdwTUs4.js";import"./context-CMvj-BfJ.js";import"./VisuallyHidden-CEBIOZFZ.js";import"./helper-DA_iJq6R.js";import"./keyboard-D8xRU-Ay.js";import"./SelectionManager-1koXhfc4.js";import"./useField-DVkUr7OL.js";import"./useFormValidationState-BETjbCr0.js";import"./usePopper-gF1CZnu9.js";import"./index-Deq_MCO1.js";import"./MenuItem-5mcUlOkg.js";import"./IconCaretRight-DMhBk2l8.js";import"./IconCheckMark-C_jUhamR.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DTHCP9Mo.js";import"./Trigger-CMbarR76.js";import"./IconCaretDown-BUciQsUp.js";import"./IconCaretDown16-bn1bAJM-.js";import"./IconCross-CVl0uK4o.js";import"./IconExclamationMarkTriangle-BoMnVsxx.js";import"./IconExclamationMarkTriangle24-kc206Dg0.js";import"./IconTrashBin16-D2jqe9uk.js";import"./IconTrashBin24-CffgCcCE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BEYQ1EgJ.js";import"./Portal-DJoc2mSv.js";import"./useMemoizedId-BANpn3Gk.js";import"./FormControl-Dc2R__I5.js";import"./InputLabel-DJehHiuq.js";import"./TooltipIcon-zj5xDHAE.js";import"./LegacyTooltip-D3XZnxSi.js";import"./useLink-Br-w_ucj.js";import"./IconExclamationMarkCircle24-B8H-ybyW.js";import"./IconQuestionMarkCircle-CtFKirTB.js";import"./Switch-BGmleg8v.js";import"./TabItem-Oa5L5Tkf.js";import"./TextInput-CnhhlBIJ.js";import"./Tooltip-DT6vH3pO.js";import"./useClickOutside-BUIhcMEJ.js";import"./Tree-jLSMCZKA.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CyBMyncv.js";import"./IconIcon16-Bz2n6xnY.js";import"./IconIcon24-B8j4oezz.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
