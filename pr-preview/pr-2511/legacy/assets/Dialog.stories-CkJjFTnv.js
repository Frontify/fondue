import{r as l,j as o}from"./iframe-AUIfQrP4.js";import{B as b}from"./Button-DlFiAFHP.js";import{D as x}from"./DialogBody-DXq3woV3.js";import{D as I}from"./DialogFooter-BGUyCLfk.js";import{I as A}from"./IconJohanna-BMI5SFXD.js";import{D as B}from"./Dialog-DqTw0Foz.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-sQDyWCwb.js";import"./useButton-D0wGE8qM.js";import"./useFocusable-CnizbhnP.js";import"./useFocusRing-BoSeZWz5.js";import"./useEffectEvent-Bcoupwh6.js";import"./chain-oFsE9aEj.js";import"./index-BEcmyHTP.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-lCOHognj.js";import"./borderStyle-D9jrV09G.js";import"./input-C06IVxfj.js";import"./Divider-DRPbvsLK.js";import"./Dropdown-C-r4J8l_.js";import"./FocusScope-Ch0sNNKQ.js";import"./useOverlayTriggerState-CuK4f_N_.js";import"./useControlledState-BAllyYje.js";import"./useMenuTrigger-B7Fpswne.js";import"./useLabels--84juFjK.js";import"./useLocalizedStringFormatter-gnsmCImp.js";import"./context-Cy3OkrWF.js";import"./VisuallyHidden-DuFlpOV3.js";import"./helper-5kMBwN-m.js";import"./keyboard-XYTEU8GG.js";import"./SelectionManager-D1hXYaW9.js";import"./useField-CFbP_W3z.js";import"./useFormValidationState-C43Yln6j.js";import"./usePopper-BdKXdpb8.js";import"./index-zrmajsre.js";import"./MenuItem-ChgvnhCc.js";import"./IconCaretRight-VlGptlRu.js";import"./IconCheckMark-B520aOQQ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CxtaYhTg.js";import"./Trigger-SlyTZoZ6.js";import"./IconCaretDown-Bj4WZxKG.js";import"./IconCaretDown16-DPOLoDZ8.js";import"./IconCross-qw3ZfYE1.js";import"./IconExclamationMarkTriangle-gBP2crPl.js";import"./IconExclamationMarkTriangle24-LaFkKa3a.js";import"./IconTrashBin16-B-qnlzDI.js";import"./IconTrashBin24-cBVJi1WR.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BKs_Z6VZ.js";import"./Portal-CCtPellx.js";import"./useMemoizedId-Df0mYjrE.js";import"./FormControl-84pwgQ7U.js";import"./InputLabel-BynWe2eY.js";import"./TooltipIcon-Dw_mQpTa.js";import"./LegacyTooltip-DttKv4lK.js";import"./useLink-BENDotdL.js";import"./IconExclamationMarkCircle24-CpDxWh5c.js";import"./IconQuestionMarkCircle-CHVAx3jv.js";import"./Switch-D0kayeZk.js";import"./TabItem-L0p1LsT0.js";import"./TextInput-BnZMKyuu.js";import"./Tooltip-BAyR836C.js";import"./useClickOutside-D7WUOaPV.js";import"./Tree-Re2vGutZ.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-RMTDUW45.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const No=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,No as __namedExportsOrder,_o as default};
