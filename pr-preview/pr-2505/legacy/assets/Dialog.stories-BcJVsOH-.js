import{r as l,j as e}from"./iframe-CArh3U2R.js";import{B as b}from"./Button-ChMCF2L2.js";import{D as x}from"./DialogBody-CH4V0kTU.js";import{D as I}from"./DialogFooter-De-CN6zO.js";import{I as A}from"./IconJohanna-GdLeg_Va.js";import{D as B}from"./Dialog-B9BqbqOJ.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DpV-BRze.js";import"./useButton-D6AuNLTw.js";import"./useFocusable-BQQ-aorh.js";import"./useFocusRing-Dk1gKGXm.js";import"./useEffectEvent-YMJ2RRp9.js";import"./chain-XO24dopb.js";import"./index-NcOw1q2c.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-hq_c_9Ms.js";import"./borderStyle-D9jrV09G.js";import"./input-CjSqb4ET.js";import"./Divider-DKzzOKDP.js";import"./FormControl-DEHlUEia.js";import"./InputLabel-DD8443rL.js";import"./TooltipIcon-BZzSYTtM.js";import"./LegacyTooltip-KCzikuHf.js";import"./useLink-CLCUz5KQ.js";import"./usePopper-u01rWO-b.js";import"./index-qy9vPm5y.js";import"./Portal-BcBrSEu7.js";import"./useMemoizedId-DWWCqZzw.js";import"./IconCheckMark-fZKVZSXZ.js";import"./IconExclamationMarkCircle24-B8MY2-G8.js";import"./IconExclamationMarkTriangle-CpHRnvpz.js";import"./IconExclamationMarkTriangle24-CVz-ZF86.js";import"./IconQuestionMarkCircle-DibesPc_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B3caMxJh.js";import"./Switch-gCrpPFBl.js";import"./TabItem-DL2KRk5d.js";import"./elements-BOYmskOL.js";import"./TextInput-B5eKkgOy.js";import"./IconCross-Bn4Yb7Uk.js";import"./Tooltip-CnAhvCkF.js";import"./useClickOutside-A3QcY4xE.js";import"./EnablePortalWrapper-FQwpj0I2.js";import"./Tree-CKZ5ErBL.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B-R3TvPg.js";import"./IconCaretDown-COXRRCVT.js";import"./IconCaretDown16-BMJgRViX.js";import"./IconTrashBin16-tWHvn42_.js";import"./IconTrashBin24-C1q5nmsK.js";import"./Flex-Dt7uVEU-.js";const Ae={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
