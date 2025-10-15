import{r as l,j as e}from"./iframe-0YDHrRt6.js";import{B as b}from"./Button-2G_0paTC.js";import{D as x}from"./DialogBody-BYZH2FwO.js";import{D as I}from"./DialogFooter-Cba8ZMGB.js";import{I as A}from"./IconJohanna-GcqBqxdH.js";import{D as B}from"./Dialog-sf5Obs3V.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-h55SgzPI.js";import"./useButton-BehVG7Qf.js";import"./useFocusable-D2xehFAO.js";import"./useFocusRing-D4vnbWSH.js";import"./useEffectEvent-B9VOC_Iw.js";import"./chain-BsYcESRq.js";import"./index-CFitZhhZ.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Dxsrqlvj.js";import"./borderStyle-D9jrV09G.js";import"./input-CAusm6h1.js";import"./Divider-uDIg1p3e.js";import"./FormControl-DONs9dV5.js";import"./InputLabel-BpxxMALc.js";import"./TooltipIcon-BzU7idz7.js";import"./LegacyTooltip-BWZ1XHjf.js";import"./useLink-CxfHgizR.js";import"./usePopper-CsQKkv4s.js";import"./index-DjyKXdH0.js";import"./Portal-Bx3snlZl.js";import"./useMemoizedId-BDmarxCk.js";import"./IconCheckMark-DbuNgHzm.js";import"./IconExclamationMarkCircle24-Dvdhmgm2.js";import"./IconExclamationMarkTriangle-B-LVrLFl.js";import"./IconExclamationMarkTriangle24-CfAmBqxS.js";import"./IconQuestionMarkCircle-BzWDTn-W.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BjRJPyXu.js";import"./Switch-Dgxm9PcJ.js";import"./TabItem-CDBnffFz.js";import"./elements-BOYmskOL.js";import"./TextInput-Bdj8YO8t.js";import"./IconCross-0SyrPz9-.js";import"./Tooltip-DmqQVPid.js";import"./useClickOutside-FnyOu7d3.js";import"./EnablePortalWrapper-BLsW0qxC.js";import"./Tree-Cl47lOuk.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Be9U765P.js";import"./IconCaretDown-D1jHnc0u.js";import"./IconCaretDown16-BDg74fiZ.js";import"./IconTrashBin16-DM8ocjtE.js";import"./IconTrashBin24-6X4hQTbO.js";import"./Flex-DUJwscQz.js";const Ae={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const ke=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,ke as __namedExportsOrder,Ae as default};
