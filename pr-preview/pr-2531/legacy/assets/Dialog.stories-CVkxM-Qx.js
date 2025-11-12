import{r as l,j as o}from"./iframe-Ca9WJIBK.js";import{B as I}from"./Button-CnOLOGK7.js";import{D as b}from"./DialogBody-Cn-5q-Kk.js";import{D as x}from"./DialogFooter-FNOeiotz.js";import{I as A}from"./IconIcon-DctGtOsl.js";import{D as B}from"./Dialog-B80SK4in.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-DGBDNgU7.js";import"./useFocusable-C1WoQs-T.js";import"./useFocusRing-BwzAH-2K.js";import"./useEffectEvent-TJiFP2g3.js";import"./chain-DCPzrEZQ.js";import"./index-AbzjxHSH.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Dta85FAJ.js";import"./borderStyle-D9jrV09G.js";import"./input-B1Xmeo9G.js";import"./Divider-D1tYVdE9.js";import"./Dropdown-CkCoivmc.js";import"./FocusScope-DoucVTHl.js";import"./useOverlayTriggerState-BV7PYFwU.js";import"./useControlledState-C-yCLtZN.js";import"./useMenuTrigger-Dx5nPd21.js";import"./useLabels-BBWLrE9G.js";import"./useLocalizedStringFormatter-DZZ7LkGX.js";import"./context-kYclt6ZX.js";import"./VisuallyHidden-b7OoCiMy.js";import"./helper-CAD_TrKY.js";import"./keyboard-DwOn7Ntm.js";import"./SelectionManager-BIr7me4z.js";import"./useField-BYBys9YO.js";import"./useFormValidationState-BQNefewE.js";import"./usePopper-C-NlHTyQ.js";import"./index-CLqlsjva.js";import"./MenuItem-BgaffJtb.js";import"./IconCaretRight-DZKZlpE5.js";import"./IconCheckMark-B1Dc5Kb6.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C-qJOuWM.js";import"./Trigger-CYFVkHmt.js";import"./IconCaretDown-D3MkWkTR.js";import"./IconCaretDown16-BIMtKl3v.js";import"./IconCross-uBKIpJqx.js";import"./IconExclamationMarkTriangle-BCskP2qp.js";import"./IconExclamationMarkTriangle24-De1sJXh2.js";import"./IconTrashBin16-DV1rZlFw.js";import"./IconTrashBin24-D9wzOXUb.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CNW_gR7-.js";import"./Portal-DbhhpfdV.js";import"./useMemoizedId-BdBpCiYz.js";import"./FormControl-CLGX9lEQ.js";import"./InputLabel-CTPaTyPc.js";import"./TooltipIcon-PcHhlBO6.js";import"./LegacyTooltip-ChRLGsLt.js";import"./useLink-CZOSwZKD.js";import"./IconExclamationMarkCircle24-pgWUzkh2.js";import"./IconQuestionMarkCircle-DJaiFUzl.js";import"./Switch-eh5BQsSO.js";import"./TabItem-C6Tvfmip.js";import"./TextInput-CSthRERT.js";import"./Tooltip-Cs9uAo5f.js";import"./useClickOutside-CVpI9hLY.js";import"./Tree-Bt4aPzUc.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BavOXq8K.js";import"./IconIcon16-C6rippnO.js";import"./IconIcon24-CH8fXaOj.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
