import{r as l,j as o}from"./iframe-BoDZ-62Y.js";import{B as I}from"./Button-XdttJYYW.js";import{D as b}from"./DialogBody-SibwY-Nm.js";import{D as x}from"./DialogFooter-wWZf1O32.js";import{I as A}from"./IconIcon-aNRBFDMG.js";import{D as B}from"./Dialog-B4Ju_oHE.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-BOiM2RrI.js";import"./useFocusable-IrRukKaY.js";import"./useFocusRing-C82xZb5f.js";import"./useEffectEvent-CL3fZGDF.js";import"./chain-CtJGAl97.js";import"./index-DniVUvLY.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-dpqcsXit.js";import"./borderStyle-D9jrV09G.js";import"./input-DM6-sKQT.js";import"./Divider-CDbGDUMW.js";import"./Dropdown-C89E-ui-.js";import"./FocusScope-BJM6DygL.js";import"./useOverlayTriggerState--76nwOyg.js";import"./useControlledState-D4E8YFD2.js";import"./useMenuTrigger-DfanVkFJ.js";import"./useLabels-Bn-zGoDP.js";import"./useLocalizedStringFormatter-BzyNpVuE.js";import"./context-BI_iBaQx.js";import"./VisuallyHidden-wNCK1ErZ.js";import"./helper-CVvlIGp8.js";import"./keyboard-DpnoosrG.js";import"./SelectionManager-CDCBW3Mu.js";import"./useField-BdBRqYcV.js";import"./useFormValidationState-BUePSdx-.js";import"./usePopper-fX-V3a5j.js";import"./index-Dy7Jj2P1.js";import"./MenuItem-BdhJiMlc.js";import"./IconCaretRight-D2TbKBqd.js";import"./IconCheckMark-Bhtr2HMb.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Dcgk16SJ.js";import"./Trigger-DeSIG4eM.js";import"./IconCaretDown-tlfhZzfs.js";import"./IconCaretDown16-Dfz3_L5B.js";import"./IconCross-CFotdVXc.js";import"./IconExclamationMarkTriangle-BjTSrBRl.js";import"./IconExclamationMarkTriangle24-C8IyBX4S.js";import"./IconTrashBin16-Cx4-ceNO.js";import"./IconTrashBin24-gvulk-5K.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B-SFKPCM.js";import"./Portal-Cd-p_RwN.js";import"./useMemoizedId-DSzFtEMc.js";import"./FormControl-DkAU8isK.js";import"./InputLabel-RHUqZBiI.js";import"./TooltipIcon-BCLIHycj.js";import"./LegacyTooltip-DnSpI6bL.js";import"./useLink-ntWqaK50.js";import"./IconExclamationMarkCircle24-DwluY09Y.js";import"./IconQuestionMarkCircle-DGkGHnN8.js";import"./Switch-C8qfsnGD.js";import"./TabItem-BNybx-7f.js";import"./TextInput-C4npCLQz.js";import"./Tooltip-Bmh9kEw6.js";import"./useClickOutside-BnjlGsM0.js";import"./Tree-C1AwpO8S.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CUQ-etYG.js";import"./IconIcon16-DA4M9EdO.js";import"./IconIcon24-DRZ3ZEpR.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
