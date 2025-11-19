import{r as l,j as o}from"./iframe-mBD-AuCT.js";import{B as I}from"./Button-BhPspr2O.js";import{D as b}from"./DialogBody-D1ptLicA.js";import{D as x}from"./DialogFooter-B4S3dFZj.js";import{I as A}from"./IconIcon-BQilQbOa.js";import{D as B}from"./Dialog-CbxWWaBG.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D9dL-qgt.js";import"./useButton-D-Nbc6Na.js";import"./useFocusable-DXmFQ-Hx.js";import"./useFocusRing-DuRzJrJR.js";import"./useEffectEvent-pe2_FiFR.js";import"./chain-B6Y7B1-O.js";import"./index-Cyjkes1y.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BmI01P-O.js";import"./borderStyle-D9jrV09G.js";import"./input-BJtwRwWl.js";import"./Divider-CyNv4tUv.js";import"./Dropdown-Dq0Ms9-1.js";import"./FocusScope-DgjzWB0B.js";import"./useOverlayTriggerState-BctEXfHz.js";import"./useControlledState-B6GpZLHS.js";import"./useMenuTrigger-Mq8ScBc7.js";import"./useLabels-DRYwn0g6.js";import"./useLocalizedStringFormatter-D_i_jBZw.js";import"./context-Mh9QfmU1.js";import"./VisuallyHidden-D9_wafRX.js";import"./helper-BGLeyA6q.js";import"./keyboard-BA3Msqld.js";import"./SelectionManager-DjjzU2Tj.js";import"./useField-r5ZYFHZL.js";import"./useFormValidationState-B9L8KDiQ.js";import"./usePopper-aEWF7LpH.js";import"./index-ChPYWZnj.js";import"./MenuItem-BE2QCwDa.js";import"./IconCaretRight-xD5iAQ8R.js";import"./IconCheckMark-BSe8qHmE.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-gv9Ve-.js";import"./Trigger-uuT5TkZo.js";import"./IconCaretDown-BD4Dl5od.js";import"./IconCaretDown16-Dyqz2sdD.js";import"./IconCross-CQTF90o9.js";import"./IconExclamationMarkTriangle-DqpgRJRQ.js";import"./IconExclamationMarkTriangle24-CGGNSbqG.js";import"./IconTrashBin16-BVuGxt0P.js";import"./IconTrashBin24-CxLpERYY.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DkNopmNx.js";import"./Portal-_yzzHhGt.js";import"./useMemoizedId-DEI-3hVY.js";import"./FormControl-BkzR22vN.js";import"./InputLabel-BKReFpg8.js";import"./TooltipIcon--SsjAZ56.js";import"./LegacyTooltip-CQ9s119n.js";import"./useLink-CUJ7p1SF.js";import"./IconExclamationMarkCircle24-CbROWlL7.js";import"./IconQuestionMarkCircle-D5gNDsEa.js";import"./Switch-CZc7I_c8.js";import"./TabItem-Ct4qjJJe.js";import"./TextInput-D5geOiLQ.js";import"./Tooltip-CipzHdYy.js";import"./useClickOutside-CHNIQSRo.js";import"./Tree-3-D_6k8Z.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-D3XzNAVa.js";import"./IconIcon16-BwW-QYHf.js";import"./IconIcon24-DhYxU4i8.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
