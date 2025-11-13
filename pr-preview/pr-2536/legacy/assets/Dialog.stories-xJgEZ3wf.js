import{r as l,j as e}from"./iframe-IPoq-zMV.js";import{B as I}from"./Button-Mum_B5-6.js";import{D as b}from"./DialogBody-TzszWOJj.js";import{D as x}from"./DialogFooter-4o9q4-7S.js";import{I as A}from"./IconIcon-DHZ_k9Vi.js";import{D as B}from"./Dialog-o5c1PQwZ.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CTxuOSTo.js";import"./useButton-Chg-g04_.js";import"./useFocusable-CbgYFhRR.js";import"./useFocusRing-C0-tGYTB.js";import"./useEffectEvent-ChfQPq2b.js";import"./chain-CsqahItZ.js";import"./index-DNIGD9BW.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-RN8TvVkR.js";import"./borderStyle-D9jrV09G.js";import"./input-BqguaTeR.js";import"./Divider-Bivo3lpm.js";import"./FormControl-qESiwCJz.js";import"./InputLabel-BzxqF8Ol.js";import"./TooltipIcon-BFVvOwwO.js";import"./LegacyTooltip-CN9F89CS.js";import"./useLink-DojGKHY9.js";import"./usePopper-BWfLn5bL.js";import"./index-DexOFgAg.js";import"./Portal-rUqAI-7S.js";import"./useMemoizedId-BV8eur7_.js";import"./IconCheckMark-DtfXOLPy.js";import"./IconExclamationMarkCircle24-C0Qj6h9c.js";import"./IconExclamationMarkTriangle-CJLSg2Dq.js";import"./IconExclamationMarkTriangle24-CsRwIySD.js";import"./IconQuestionMarkCircle-VDVPgREv.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DrBVcZWp.js";import"./Switch-3Rux1RWK.js";import"./TabItem-rxMYQwo3.js";import"./elements-BOYmskOL.js";import"./TextInput-Dwkikkiq.js";import"./IconCross-CTBX3sAW.js";import"./Tooltip-Ch0JSD50.js";import"./useClickOutside-DQtoJQq8.js";import"./EnablePortalWrapper-D6PzXFmT.js";import"./Tree-n_Nz8-z8.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BVFMtr5h.js";import"./IconCaretDown-DIalihrO.js";import"./IconCaretDown16-CntekHao.js";import"./IconTrashBin16-CuhuliP4.js";import"./IconTrashBin24-DWMBDYZm.js";import"./Flex-CYyUr1bf.js";import"./IconIcon16-CJxNVrN9.js";import"./IconIcon24-zBn9pGaV.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
