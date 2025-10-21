import{r as l,j as o}from"./iframe-CfLhI7P0.js";import{B as b}from"./Button-BoqHsuHZ.js";import{D as x}from"./DialogBody-DBiixJTQ.js";import{D as I}from"./DialogFooter-C6zY9OLq.js";import{I as A}from"./IconJohanna-BRQtt3J1.js";import{D as B}from"./Dialog-BSwoJKKe.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B933Jwna.js";import"./useButton-CafHKOqV.js";import"./useFocusable-DqnO4tDK.js";import"./useFocusRing-c6u9Vcjk.js";import"./useEffectEvent-DgjNhOdj.js";import"./chain-C2bpwpa8.js";import"./index-CNTxu6fp.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C_ryCKA4.js";import"./borderStyle-D9jrV09G.js";import"./input-BglkpoJb.js";import"./Divider-Ks3wbiQC.js";import"./Dropdown-CVUPTM-k.js";import"./FocusScope-Ci5ycIsU.js";import"./useOverlayTriggerState-CFYEaNmX.js";import"./useControlledState-CikZhwQf.js";import"./useMenuTrigger-Ddxx7kXJ.js";import"./useLabels-C5VNH8gT.js";import"./useLocalizedStringFormatter-BY0SNe9w.js";import"./context-CFy5Jnbr.js";import"./VisuallyHidden-BrtBoVFd.js";import"./helper-D-lWvwnP.js";import"./keyboard-BcVSFiEu.js";import"./SelectionManager-B5h8l_Gt.js";import"./useField-pWbNefD1.js";import"./useFormValidationState-Dii868hQ.js";import"./usePopper-BDJCEm0e.js";import"./index-BXHlWwjT.js";import"./MenuItem-CDWDwpry.js";import"./IconCaretRight-BbFToOJp.js";import"./IconCheckMark-Bvx1Okuv.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DTujLDLf.js";import"./Trigger-P2NWPnIL.js";import"./IconCaretDown-ip8hOLG9.js";import"./IconCaretDown16-0kUT5ueY.js";import"./IconCross-VvQFK0HB.js";import"./IconExclamationMarkTriangle-DumzWRNf.js";import"./IconExclamationMarkTriangle24-BQCI9tlF.js";import"./IconTrashBin16-Vihvm3Ba.js";import"./IconTrashBin24-Do203-AB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BAwlIUsk.js";import"./Portal-Bzui0qVf.js";import"./useMemoizedId-DO6EWKyA.js";import"./FormControl-2ECwXhan.js";import"./InputLabel-x_7jnmE7.js";import"./TooltipIcon-Dzp2Dow-.js";import"./LegacyTooltip-69ja691T.js";import"./useLink-tlq5fiSd.js";import"./IconExclamationMarkCircle24-BD4txlzy.js";import"./IconQuestionMarkCircle-CWL1qffP.js";import"./Switch-D28II4BQ.js";import"./TabItem-CchQBcbM.js";import"./TextInput-CSebAqb7.js";import"./Tooltip-BcZ9yLZa.js";import"./useClickOutside-eWoCMSRP.js";import"./Tree-6av9Ag9R.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-bLMZZ02K.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
