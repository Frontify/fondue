import{r as l,j as o}from"./iframe-B1NH0d8E.js";import{B as I}from"./Button-CjOUnz39.js";import{D as b}from"./DialogBody-CYckLbUx.js";import{D as x}from"./DialogFooter-BS09aUrT.js";import{I as A}from"./IconIcon-DLdYtT1Q.js";import{D as B}from"./Dialog-DfXFZ-dX.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CxFeC-BG.js";import"./useButton-CXaNqm_z.js";import"./useFocusable-DP6unWF8.js";import"./useFocusRing-rvuW17v-.js";import"./useEffectEvent-Cuuo5Go7.js";import"./chain-CDNEhT9V.js";import"./index-NnVgL01k.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C-xSTCCc.js";import"./borderStyle-D9jrV09G.js";import"./input-DG65ErTG.js";import"./Divider-Bvi631jR.js";import"./Dropdown-CRsrFL1r.js";import"./FocusScope-CSl_sW_4.js";import"./useOverlayTriggerState-EK37ykhd.js";import"./useControlledState-VV8iETpF.js";import"./useMenuTrigger-CLvR65IU.js";import"./useLabels-D6M7Y-Ad.js";import"./useLocalizedStringFormatter-B_wUy5H5.js";import"./context-DkQ0DKut.js";import"./VisuallyHidden-Dc2v8xjK.js";import"./helper-BAqNwAfB.js";import"./keyboard-Cfnwcw1j.js";import"./SelectionManager-CGSidPqj.js";import"./useField-Ck-FbqVi.js";import"./useFormValidationState-BS6Czv8J.js";import"./usePopper-jtv-PNE8.js";import"./index-C7tiHcAr.js";import"./MenuItem-B5L2unfa.js";import"./IconCaretRight-D43a9Ky7.js";import"./IconCheckMark-Az9s2S0p.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DgTICg-p.js";import"./Trigger-0BTyAmbE.js";import"./IconCaretDown-BKOjvZBQ.js";import"./IconCaretDown16-CgcPEXOJ.js";import"./IconCross-CS9vqEH5.js";import"./IconExclamationMarkTriangle-BR7mnz4z.js";import"./IconExclamationMarkTriangle24-DoKVx44R.js";import"./IconTrashBin16-DLhMgjk_.js";import"./IconTrashBin24-OmLsHuw5.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BaBU1IWY.js";import"./Portal-CySXwQ73.js";import"./useMemoizedId-B10bANt6.js";import"./FormControl-DKa4d7cu.js";import"./InputLabel-DK0GeTMZ.js";import"./TooltipIcon-CaQbfCOt.js";import"./LegacyTooltip-DWKf2bEz.js";import"./useLink-DGFVcWby.js";import"./IconExclamationMarkCircle24-Bbl11HkU.js";import"./IconQuestionMarkCircle-DdcULYxs.js";import"./Switch-Zpluh7dE.js";import"./TabItem-CZOwDr0W.js";import"./TextInput-CwXX9Bla.js";import"./Tooltip-CULISYh2.js";import"./useClickOutside-CqVgQgGM.js";import"./Tree-BpEz_X_Z.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CNEtKSUH.js";import"./IconIcon16-C17HQfvi.js";import"./IconIcon24-C0nl7tvE.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
