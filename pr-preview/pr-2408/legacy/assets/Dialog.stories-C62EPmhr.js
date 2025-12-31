import{r as l,j as e}from"./iframe-BVCiIt_t.js";import{B as I}from"./Button-C23qQnfc.js";import{D as b}from"./DialogBody-CDTqcWYz.js";import{D as x}from"./DialogFooter-BNpejcfy.js";import{I as A}from"./IconIcon-t-uR3_JK.js";import{D as B}from"./Dialog-BO54Pp9Q.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DyHTrhc7.js";import"./useButton-BKkHFZe5.js";import"./useFocusable-C88n4aJ_.js";import"./useFocusRing-D74H9_qf.js";import"./useLayoutEffect-CwCMcuvP.js";import"./chain-tCQxUvER.js";import"./index-CccrmGpf.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-B8WP0Ll0.js";import"./borderStyle-D9jrV09G.js";import"./input-CaV8J06j.js";import"./LoadingCircle-Cs9YxQlv.js";import"./Switch-Cnh0WjU1.js";import"./InputLabel-BVMNaspY.js";import"./TooltipIcon-Lhfh0jX1.js";import"./LegacyTooltip-NJgv0_Qv.js";import"./useLink-CznZ_uny.js";import"./usePopper-BH-iCTlG.js";import"./index-CluciJqc.js";import"./Portal-DheNPhD-.js";import"./useMemoizedId-4XHrKXhm.js";import"./IconCheckMark-Cs3aici6.js";import"./IconExclamationMarkCircle24-CWUAsl74.js";import"./IconExclamationMarkTriangle-ruAcaiBi.js";import"./IconExclamationMarkTriangle24-BdTerdKL.js";import"./IconQuestionMarkCircle-xnzuMREY.js";import"./TabItem-QFEwn2kZ.js";import"./elements-BOYmskOL.js";import"./TextInput-dv1l60LF.js";import"./IconCross-DSKFWT9e.js";import"./validation-C9S5KgfE.js";import"./Tooltip-CqViX1me.js";import"./useClickOutside-CCnHaqrB.js";import"./EnablePortalWrapper-u8CpEIO3.js";import"./Tree-BIBRBKD6.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DP6aJ5z1.js";import"./IconCaretDown-QWbLgCl6.js";import"./IconCaretDown16-8cPQgRO0.js";import"./IconTrashBin16-Ck9Z5JMZ.js";import"./IconTrashBin24-CDDUjHMv.js";import"./Flex-wQZ1lO1w.js";import"./IconIcon16-DeiHQ1ET.js";import"./IconIcon24-DOdggOFv.js";const Ae={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const ke=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,ke as __namedExportsOrder,Ae as default};
