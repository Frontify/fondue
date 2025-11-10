import{r as l,j as o}from"./iframe-DkeuAZGN.js";import{B as I}from"./Button-Cyg2loOs.js";import{D as b}from"./DialogBody-BhrQ69MU.js";import{D as x}from"./DialogFooter-BKAbJNKj.js";import{I as A}from"./IconIcon-C84NygL6.js";import{D as B}from"./Dialog-Dm6gFCve.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-DMxfMeHO.js";import"./useFocusable-BFcWdvIz.js";import"./useFocusRing-DV1ndlYm.js";import"./useEffectEvent-p_mtkbDO.js";import"./chain-CAdXsIYK.js";import"./index-DGl5uXCK.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CKSPIqz1.js";import"./borderStyle-D9jrV09G.js";import"./input-x2DM1voP.js";import"./Divider-BOKamc1v.js";import"./Dropdown-Dz6KAcG4.js";import"./FocusScope-CWLvvfZj.js";import"./useOverlayTriggerState-DfyYWZfM.js";import"./useControlledState-BMnYmkPp.js";import"./useMenuTrigger-CSYe2A-2.js";import"./useLabels-a9mHBJ4N.js";import"./useLocalizedStringFormatter-DZ9hskvU.js";import"./context-CwvE4v2V.js";import"./VisuallyHidden-B2MJ5_a1.js";import"./helper-CaAYgyFI.js";import"./keyboard-Cy4ODuoA.js";import"./SelectionManager-DzET1wUq.js";import"./useField-BLvA30x0.js";import"./useFormValidationState-Bfsywdbb.js";import"./usePopper-DJ8Ra6pa.js";import"./index-QN_6ztFs.js";import"./MenuItem-cnoEN4N-.js";import"./IconCaretRight-DbFwzl53.js";import"./IconCheckMark-BiPkWBUo.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DcHgqeRw.js";import"./Trigger-g-PSolXT.js";import"./IconCaretDown-DYgzH1Dj.js";import"./IconCaretDown16-z4g6R74Y.js";import"./IconCross-BAyIl8km.js";import"./IconExclamationMarkTriangle-BJT3VxjX.js";import"./IconExclamationMarkTriangle24-WjiVeEOa.js";import"./IconTrashBin16-BbxXYwm0.js";import"./IconTrashBin24-De7vrx_E.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-9dEMfA_M.js";import"./Portal-BMGHkKMU.js";import"./useMemoizedId-nou-DeIg.js";import"./FormControl-Cr4pEOLe.js";import"./InputLabel-g3xE7uYS.js";import"./TooltipIcon-CTQIKmsd.js";import"./LegacyTooltip-DhsEbG6A.js";import"./useLink-D_dJZrWN.js";import"./IconExclamationMarkCircle24-Dc8IlBFK.js";import"./IconQuestionMarkCircle-BTA8lui4.js";import"./Switch-C_UZItiR.js";import"./TabItem-nV4RBMGC.js";import"./TextInput-DJpfvaHj.js";import"./Tooltip-BWUoNyF1.js";import"./useClickOutside-DnmkQ4-b.js";import"./Tree-DhyCmg2e.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BJIK7lEu.js";import"./IconIcon16-CKwU6JAs.js";import"./IconIcon24-v1gbUfbP.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
