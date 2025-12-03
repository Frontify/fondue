import{r as l,j as e}from"./iframe-Dp4fbuuy.js";import{B as I}from"./Button-hpaYI8nC.js";import{D as b}from"./DialogBody-yizKFTlh.js";import{D as x}from"./DialogFooter-BLpc_Ac3.js";import{I as A}from"./IconIcon-BzqqFVzk.js";import{D as B}from"./Dialog-BYPSflCr.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DyHTrhc7.js";import"./useButton-uXbj8Tmo.js";import"./useFocusable-CeGMk2ep.js";import"./useFocusRing-BExXxzqs.js";import"./useEffectEvent-CfvH5P65.js";import"./chain-CGUvIyZV.js";import"./index-lmvN-6Hm.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Bian4BQv.js";import"./borderStyle-D9jrV09G.js";import"./input-B24_lVBN.js";import"./Divider-BGUO-27U.js";import"./FormControl-BXaPXzvE.js";import"./InputLabel-DPYz3LQq.js";import"./TooltipIcon-HG7TB1cj.js";import"./LegacyTooltip-yJhGCXdN.js";import"./useLink-DIITzRJO.js";import"./usePopper-Cbxvd94B.js";import"./index-ByEqKqlR.js";import"./Portal-k2uf4qJr.js";import"./useMemoizedId-BUNTmYDx.js";import"./IconCheckMark-BYsPbMZM.js";import"./IconExclamationMarkCircle24-X1Y3J7QY.js";import"./IconExclamationMarkTriangle-MgLAzRKW.js";import"./IconExclamationMarkTriangle24-Xr7VtV80.js";import"./IconQuestionMarkCircle-aiPeRZ32.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DxhuergG.js";import"./Switch-lk3PdK-P.js";import"./TabItem-s7t3VmKE.js";import"./elements-BOYmskOL.js";import"./TextInput-B7uBBf5A.js";import"./IconCross-5hMYBooT.js";import"./Tooltip-DFKSW5ek.js";import"./useClickOutside-BiRZMhl9.js";import"./EnablePortalWrapper-CgTetPBk.js";import"./Tree-ppcdhT5y.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BpMBtIi6.js";import"./IconCaretDown-CoFnmUrM.js";import"./IconCaretDown16-DKk_tbP0.js";import"./IconTrashBin16-p1WSYv39.js";import"./IconTrashBin24-B2OaCDTK.js";import"./Flex-C6CaKb3W.js";import"./IconIcon16-DlEusypu.js";import"./IconIcon24-d19ZLBCz.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Me=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Me as __namedExportsOrder,Ce as default};
