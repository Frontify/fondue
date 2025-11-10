import{r as l,j as e}from"./iframe-BYByppjA.js";import{B as I}from"./Button-w-4T45cJ.js";import{D as b}from"./DialogBody-BEsGN2b8.js";import{D as x}from"./DialogFooter-Fect6xgt.js";import{I as A}from"./IconIcon-CYme7f2M.js";import{D as B}from"./Dialog-CUi9o3bf.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DyHTrhc7.js";import"./useButton-BB9tuRtI.js";import"./useFocusable-BzCPMRzm.js";import"./useFocusRing-DJ3Txbg8.js";import"./useEffectEvent-DYOD1mFo.js";import"./chain-BRjlEOf0.js";import"./index-BvXv4Kpv.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CpWSRXPq.js";import"./borderStyle-D9jrV09G.js";import"./input-DCKI2hXM.js";import"./Divider-BQt0MZd2.js";import"./FormControl-C4_d0t2A.js";import"./InputLabel-_c3nWSSE.js";import"./TooltipIcon-BNrqRANO.js";import"./LegacyTooltip-DPlDs3Bg.js";import"./useLink-Dgto1joU.js";import"./usePopper-BjMBxjrj.js";import"./index-BloTn-Pt.js";import"./Portal-BdCRmzA4.js";import"./useMemoizedId-iS5UWw9V.js";import"./IconCheckMark-DTAVvTol.js";import"./IconExclamationMarkCircle24-D_uJ6XBQ.js";import"./IconExclamationMarkTriangle-DKHG93a_.js";import"./IconExclamationMarkTriangle24-CeFjqNf5.js";import"./IconQuestionMarkCircle-CWDsgLYP.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DoOSAgJQ.js";import"./Switch-C9Kuu0Vg.js";import"./TabItem-C5qIyEHY.js";import"./elements-BOYmskOL.js";import"./TextInput-BeY6dKVb.js";import"./IconCross-4Gqhnlgf.js";import"./Tooltip-CpSqVSMX.js";import"./useClickOutside-xR95UeCJ.js";import"./EnablePortalWrapper-C6aDJWM9.js";import"./Tree-BlTmC7Ez.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-uO8VVVTq.js";import"./IconCaretDown-BcsA1pbK.js";import"./IconCaretDown16-BbjYTRIB.js";import"./IconTrashBin16-Cnls3zl1.js";import"./IconTrashBin24-BoXg_kBS.js";import"./Flex-BKZIbO_E.js";import"./IconIcon16-C85prtTt.js";import"./IconIcon24-CtxJoCsy.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
