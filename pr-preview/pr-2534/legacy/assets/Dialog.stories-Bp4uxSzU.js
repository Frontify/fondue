import{r as l,j as o}from"./iframe-Dop3IDiS.js";import{B as I}from"./Button-DBFFngUD.js";import{D as b}from"./DialogBody-BQyTzLt4.js";import{D as x}from"./DialogFooter-B4ddaPin.js";import{I as A}from"./IconIcon-DUaB1bdt.js";import{D as B}from"./Dialog-D0WqYPXo.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CzFIvh1I.js";import"./useButton-BkX0UrSk.js";import"./useFocusable-ost1gxwP.js";import"./useFocusRing-u7jjRRvk.js";import"./useEffectEvent-C5lQF6xi.js";import"./chain-s-vxePMy.js";import"./index-DYLYfGFR.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-T4pmJ4KH.js";import"./borderStyle-D9jrV09G.js";import"./input-CgoVI71q.js";import"./Divider-B4MHY3rQ.js";import"./Dropdown-eZjtnnjy.js";import"./FocusScope-BH5f1-TV.js";import"./useOverlayTriggerState-D5AsxkAE.js";import"./useControlledState-uMLg98wm.js";import"./useMenuTrigger-BpW2lNjN.js";import"./useLabels-BgQM7QFU.js";import"./useLocalizedStringFormatter-xLeRq2LB.js";import"./context-DERHc0he.js";import"./VisuallyHidden-Cei7HWYu.js";import"./helper-JND9wNMV.js";import"./keyboard-DMTlnSnK.js";import"./SelectionManager-Cn74Dtdj.js";import"./useField-oqj2rvon.js";import"./useFormValidationState-Cin_oTyS.js";import"./usePopper-BD0mTu8l.js";import"./index-CXPmKk8W.js";import"./MenuItem-s-obpngf.js";import"./IconCaretRight-D2Rtr0KV.js";import"./IconCheckMark-Dhl-b2SF.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B3Zg05Fy.js";import"./Trigger-CA-Hq4qa.js";import"./IconCaretDown-Dvk9pgzM.js";import"./IconCaretDown16-3Y1aj8fs.js";import"./IconCross-Cz7N8XdK.js";import"./IconExclamationMarkTriangle-DZFMnctp.js";import"./IconExclamationMarkTriangle24-X1JrCahO.js";import"./IconTrashBin16-C164mae4.js";import"./IconTrashBin24-CnFwDSEk.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DLUUtCUV.js";import"./Portal-BhsN2SWV.js";import"./useMemoizedId-CK82Czxw.js";import"./FormControl-ATQXj-oa.js";import"./InputLabel-CPQH0GLI.js";import"./TooltipIcon-DzDbmsKM.js";import"./LegacyTooltip-D3fSEQnN.js";import"./useLink-CisGfgTX.js";import"./IconExclamationMarkCircle24-D-HK2Dcv.js";import"./IconQuestionMarkCircle-CQv2x_S2.js";import"./Switch-CneOamPf.js";import"./TabItem-DC0rUs02.js";import"./TextInput-DKt6IUeX.js";import"./Tooltip-Bm5tt8SV.js";import"./useClickOutside-BporPNZz.js";import"./Tree-BT1220bP.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-uawSvIGw.js";import"./IconIcon16-nbFgdsuz.js";import"./IconIcon24-Cxj7Z8Fv.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
