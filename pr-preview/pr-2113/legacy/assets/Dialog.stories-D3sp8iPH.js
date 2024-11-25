import{j as o}from"./jsx-runtime-Nms4Y4qS.js";import{r as l}from"./index-BwDkhjyp.js";import{B as b}from"./Button-BBdFcQ_2.js";import{D as x}from"./DialogBody-BGcfsRcP.js";import{D as I}from"./DialogFooter-B4rjCCWi.js";import{I as A}from"./IconJohanna-CrQWJB5v.js";import{D as B}from"./Dialog-CnYZwt9Z.js";import{M as r}from"./dialog-Dre1eVQK.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useButton-B0CVDvll.js";import"./useFocusable-ClqOF1PM.js";import"./useFocusRing-Vzyl7-Lk.js";import"./SSRProvider-CYXx33DY.js";import"./chain-CSFqNvhK.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./Box-DUobCvly.js";import"./borderStyle-D9jrV09G.js";import"./input-IqyEthB7.js";import"./Divider-DCi-HcbY.js";import"./FormControl-DbVvWZHc.js";import"./InputLabel-DuXda3bY.js";import"./TooltipIcon-CI6qleYl.js";import"./LegacyTooltip-NmtBsAB1.js";import"./useLink-BrkukSAv.js";import"./usePopper-C28Vz6Qz.js";import"./index-CS4BWtGh.js";import"./index-CfyPTyT-.js";import"./Portal-BBACcjoK.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./IconCheckMark-ByVuQE55.js";import"./IconExclamationMarkCircle-DIK3qNWl.js";import"./IconExclamationMarkCircle24-Vs83y98-.js";import"./IconExclamationMarkTriangle-DvvXw1YP.js";import"./IconExclamationMarkTriangle24-NdDZZD89.js";import"./IconQuestionMarkCircle-DpV6l-09.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CZrma5le.js";import"./SegmentedControls-BSWtFswn.js";import"./useFormValidationState-Bo5Bz1o-.js";import"./FocusScope-CryrrNNO.js";import"./useField-CqwgNQmU.js";import"./useLabels-Bp6d37Qr.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-BDm5AEDr.js";import"./useControlledState-C0C-dzuH.js";import"./motion-C48bHxkn.js";import"./Switch-DDE7l5VE.js";import"./TabItem-DYJEWVSF.js";import"./elements-BOYmskOL.js";import"./TextInput-3-VhK_fn.js";import"./IconEyeOff-BAmb6qT8.js";import"./IconCross-CxP4FPDR.js";import"./Tooltip-BlJs8OXG.js";import"./useClickOutside-CKV3CrvD.js";import"./EnablePortalWrapper-B_d3Ldct.js";import"./Tree-BmY49tx_.js";import"./immer-DBm1MMjE.js";import"./IconGrabHandle12-OyP2wwdJ.js";import"./Trigger-gz8WCINE.js";import"./IconCaretDown-BFa2RsTm.js";import"./IconCaretDown16-mzuMIk3a.js";import"./IconTrashBin-BqqROPt7.js";import"./IconTrashBin16-g_sB0yBJ.js";import"./IconTrashBin24-DyoUj1kc.js";import"./Flex-8mjM_2n0.js";import"./IconArrowLeft-CK1u11Y9.js";const Wo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const _o=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,_o as __namedExportsOrder,Wo as default};
