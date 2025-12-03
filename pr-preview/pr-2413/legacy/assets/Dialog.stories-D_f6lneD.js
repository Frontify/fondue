import{r as l,j as o}from"./iframe-C5FCeANG.js";import{B as I}from"./Button-pSl7YIn6.js";import{D as b}from"./DialogBody-CgLazonz.js";import{D as x}from"./DialogFooter-ruBTm7w1.js";import{I as A}from"./IconIcon-B6vCTcIt.js";import{D as B}from"./Dialog-BE8pz6hS.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DI9Pv0v-.js";import"./useButton-ZILAtz4G.js";import"./useFocusable-CY4uEMcZ.js";import"./useFocusRing-CSVVjKoO.js";import"./useEffectEvent-Cco2ff7h.js";import"./chain-B9u4QWXy.js";import"./index-DTL76Uzm.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CejzEdD9.js";import"./borderStyle-D9jrV09G.js";import"./input-DyKck07G.js";import"./Divider-B3vPtGWV.js";import"./Dropdown-68H7QW5t.js";import"./FocusScope-DUJW4sW9.js";import"./useOverlayTriggerState-CmB7Q7xQ.js";import"./useControlledState-DUJj6fF8.js";import"./useMenuTrigger-B76dE1tY.js";import"./useLabels-C6587Rwv.js";import"./useLocalizedStringFormatter-C6JeEUeQ.js";import"./context-CFHaOxRb.js";import"./VisuallyHidden-DNomqPth.js";import"./helper-Btg6kSDv.js";import"./keyboard-h-whvZ9l.js";import"./SelectionManager-Cypv6ImN.js";import"./useField-CrD9-LIh.js";import"./useFormValidationState-D7UwuQXV.js";import"./usePopper-TsKshzhZ.js";import"./index-DO8gX9nn.js";import"./MenuItem-B7s3STBs.js";import"./IconCaretRight-BxEtnF3E.js";import"./IconCheckMark-DgmsN_BS.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DNEFvbJq.js";import"./Trigger-CAWL6COj.js";import"./IconCaretDown-Bo3-wsXi.js";import"./IconCaretDown16-B3Wb7dsU.js";import"./IconCross-PAKP7vlq.js";import"./IconExclamationMarkTriangle-BEtRbrcZ.js";import"./IconExclamationMarkTriangle24-DrttrznJ.js";import"./IconTrashBin16-BBy7j7q_.js";import"./IconTrashBin24-CeM0tTNB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CG8Vi9yo.js";import"./Portal-DYc2VTWX.js";import"./useMemoizedId-BZYsMqio.js";import"./FormControl-D6-pg3ec.js";import"./InputLabel-CFmjz5AS.js";import"./TooltipIcon-PUl9w845.js";import"./LegacyTooltip-BknZ-Vak.js";import"./useLink-BxRMFuuh.js";import"./IconExclamationMarkCircle24-DKp6IBYY.js";import"./IconQuestionMarkCircle-C8O1sgV_.js";import"./Switch-CAYbyrAA.js";import"./TabItem-CQdW0_QP.js";import"./TextInput-BNgbcGER.js";import"./Tooltip-CVpq9eSP.js";import"./useClickOutside-Cpgd9MVc.js";import"./Tree-DWqfVsyk.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Vyon2QEr.js";import"./IconIcon16-DfCtLuTw.js";import"./IconIcon24-E0LUn5Kt.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
