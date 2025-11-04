import{r as l,j as e}from"./iframe-Beui0H1c.js";import{B as I}from"./Button-DnZtnktA.js";import{D as b}from"./DialogBody-D8aaM_bg.js";import{D as x}from"./DialogFooter-DKv3y65V.js";import{I as A}from"./IconIcon-D8VucdiJ.js";import{D as B}from"./Dialog-DtSPVT-r.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D9dL-qgt.js";import"./useButton-HURAn407.js";import"./useFocusable-DdspXHcE.js";import"./useFocusRing-BIDMvR_3.js";import"./useEffectEvent-Bp9vJCdB.js";import"./chain-JmzeWE3B.js";import"./index-BUsDxj03.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-uuBYmGRN.js";import"./borderStyle-D9jrV09G.js";import"./input-CYW3MOm3.js";import"./Divider-YnMq-R2j.js";import"./FormControl-DN7M8VTy.js";import"./InputLabel-BqDw17Qg.js";import"./TooltipIcon-_5Y6PKzH.js";import"./LegacyTooltip-0NWrsVVI.js";import"./useLink-B4o722xV.js";import"./usePopper-DtTS-UJd.js";import"./index-D2IfjKmw.js";import"./Portal-BEzQ9XOj.js";import"./useMemoizedId-CYnPCNT7.js";import"./IconCheckMark-BvwNxobl.js";import"./IconExclamationMarkCircle24-CLVAKX75.js";import"./IconExclamationMarkTriangle-B0G0H6ib.js";import"./IconExclamationMarkTriangle24-BI4Jmley.js";import"./IconQuestionMarkCircle-TF2jjIXx.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Dzw_nEZs.js";import"./Switch-Cuw25dgW.js";import"./TabItem-Fa3-4SBg.js";import"./elements-BOYmskOL.js";import"./TextInput-BW5xzcvJ.js";import"./IconCross-BmVZ4B-G.js";import"./Tooltip-BId0SaHy.js";import"./useClickOutside-pUlnx7N8.js";import"./EnablePortalWrapper-CWKYfC51.js";import"./Tree-xyCe6zFy.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BjdWHd67.js";import"./IconCaretDown-oHjAg5Ab.js";import"./IconCaretDown16-eEXgEFP7.js";import"./IconTrashBin16-Z1gzhZlr.js";import"./IconTrashBin24-DQZaocrI.js";import"./Flex-zPVnd-Pw.js";import"./IconIcon16-DXvrCXuh.js";import"./IconIcon24-C94cF4ca.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
