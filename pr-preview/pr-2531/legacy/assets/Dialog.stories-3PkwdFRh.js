import{r as l,j as o}from"./iframe-B5CPGWPV.js";import{B as I}from"./Button-D9e2ti0d.js";import{D as b}from"./DialogBody-jxTvKrbr.js";import{D as x}from"./DialogFooter-DfjxSfxN.js";import{I as A}from"./IconIcon-BA6Fmiqg.js";import{D as B}from"./Dialog-xmHPkVj-.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-Ci7kylBN.js";import"./useFocusable-CuG_iUuX.js";import"./useFocusRing-BOq44Q-m.js";import"./useEffectEvent-kj_h4LSq.js";import"./chain-DAzikNNz.js";import"./index-Db4W4yDE.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CQAU9N4z.js";import"./borderStyle-D9jrV09G.js";import"./input-cq8f4pEG.js";import"./Divider-nZeqTEwz.js";import"./Dropdown-DiOy8JCl.js";import"./FocusScope-rI0yNBIy.js";import"./useOverlayTriggerState-CEKKvGLL.js";import"./useControlledState-CFbRCBAY.js";import"./useMenuTrigger-mcc-gx96.js";import"./useLabels-C5ytOvhJ.js";import"./useLocalizedStringFormatter-CYCob2hJ.js";import"./context-BN_JJ6zS.js";import"./VisuallyHidden-C5e-jIao.js";import"./helper-C7N_jdHD.js";import"./keyboard-By140AL5.js";import"./SelectionManager-BVFt38kS.js";import"./useField-iDswpurd.js";import"./useFormValidationState-CNTCwyf2.js";import"./usePopper-DlxsfNzH.js";import"./index-kPdPfUUG.js";import"./MenuItem-N5vG-vp8.js";import"./IconCaretRight-B_cPjHKU.js";import"./IconCheckMark-BjpJQgeF.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-5aGkx1.js";import"./Trigger-whnxlm3W.js";import"./IconCaretDown-DDnEckGI.js";import"./IconCaretDown16-DwG1LP-s.js";import"./IconCross-a0tvDMLS.js";import"./IconExclamationMarkTriangle--za27hm8.js";import"./IconExclamationMarkTriangle24-BPBU2M1F.js";import"./IconTrashBin16-Bftj6ugn.js";import"./IconTrashBin24-uINMAR_a.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DYKNKpOU.js";import"./Portal-B5vFmI2x.js";import"./useMemoizedId-DWAnoWyi.js";import"./FormControl-DAxuNMHE.js";import"./InputLabel-hKtnQhwW.js";import"./TooltipIcon-CIvg4Gbm.js";import"./LegacyTooltip-BmxFSbs9.js";import"./useLink-CLnF-Dfj.js";import"./IconExclamationMarkCircle24-BeTFDUAL.js";import"./IconQuestionMarkCircle-80bszdCz.js";import"./Switch-DgCW3xLv.js";import"./TabItem-DS5zdxt9.js";import"./TextInput-COvL5FkF.js";import"./Tooltip-DjjyqhJy.js";import"./useClickOutside-BhD2j9dG.js";import"./Tree-Ur0I-Lwp.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-4GgV4P_6.js";import"./IconIcon16-optUTJU9.js";import"./IconIcon24-BGMX8Pec.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
