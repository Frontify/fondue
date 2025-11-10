import{r as l,j as o}from"./iframe-BM7ef9cd.js";import{B as I}from"./Button-D3BlpDGO.js";import{D as b}from"./DialogBody-DMu3teAI.js";import{D as x}from"./DialogFooter-B8USxwv6.js";import{I as A}from"./IconIcon-DgFGBsZD.js";import{D as B}from"./Dialog-sZmEFKzq.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CxFeC-BG.js";import"./useButton-BVtexVRf.js";import"./useFocusable-BE1kPMio.js";import"./useFocusRing-BEC2owvQ.js";import"./useEffectEvent-BC_1uHyR.js";import"./chain-alM-wSYL.js";import"./index-CqMzEB5i.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BDI0AoIe.js";import"./borderStyle-D9jrV09G.js";import"./input-CM7GoLG0.js";import"./Divider-DLXoYDJG.js";import"./Dropdown-BX4meYN2.js";import"./FocusScope-DL7-Bqqi.js";import"./useOverlayTriggerState-CZotgndy.js";import"./useControlledState-CHhpUkp0.js";import"./useMenuTrigger-BXCREVSp.js";import"./useLabels-Ds2PpTN7.js";import"./useLocalizedStringFormatter-69TNCH83.js";import"./context-1U3mNMRV.js";import"./VisuallyHidden-CDwv4QbC.js";import"./helper-jHS2d2qQ.js";import"./keyboard-my2f-9FG.js";import"./SelectionManager-GTUli88q.js";import"./useField-ByUvNGor.js";import"./useFormValidationState-DzXeuUB0.js";import"./usePopper-DnQbG6Dm.js";import"./index-DvD3x05a.js";import"./MenuItem-D8DU1p7f.js";import"./IconCaretRight-B9n7WX4x.js";import"./IconCheckMark-CIHN93e5.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CAeqqZJ1.js";import"./Trigger-ByGBqbrp.js";import"./IconCaretDown-BxZaxq_6.js";import"./IconCaretDown16-DildURkb.js";import"./IconCross-DbmORowV.js";import"./IconExclamationMarkTriangle-CGKXM6PS.js";import"./IconExclamationMarkTriangle24-Dc_rwIH6.js";import"./IconTrashBin16-DY1V43zp.js";import"./IconTrashBin24-Ci6kQii_.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BrP4X50G.js";import"./Portal-Cc6MwqwZ.js";import"./useMemoizedId-B6KdJLbo.js";import"./FormControl-YhBUG1d9.js";import"./InputLabel-g6I3etEJ.js";import"./TooltipIcon-CpaG5WEB.js";import"./LegacyTooltip-DwWPrLpM.js";import"./useLink-Bc9Xufj0.js";import"./IconExclamationMarkCircle24-CmndOdXf.js";import"./IconQuestionMarkCircle-D_64i_0i.js";import"./Switch-kFbq1dH3.js";import"./TabItem-C-Spro5Q.js";import"./TextInput-BGEzNyCQ.js";import"./Tooltip-BetQNmeG.js";import"./useClickOutside-DvjhYIr4.js";import"./Tree-HpA7bznW.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BRXNycHN.js";import"./IconIcon16-DO7iMaHA.js";import"./IconIcon24-BQKcgnTu.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
