import{r as l,j as e}from"./iframe-C_X0LXbg.js";import{B as I}from"./Button-B754AGQe.js";import{D as b}from"./DialogBody-DVUSWRRm.js";import{D as x}from"./DialogFooter-DEqg-ScX.js";import{I as A}from"./IconIcon-ChhkPF50.js";import{D as B}from"./Dialog-SFPWgkME.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CxFeC-BG.js";import"./useButton-DeuSuATS.js";import"./useFocusable-P2cNa7fe.js";import"./useFocusRing-B-vCA7C1.js";import"./useEffectEvent-C56Z2Ejq.js";import"./chain-CAXrBEkW.js";import"./index-BaX3WfTo.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-B_S8Ft3n.js";import"./borderStyle-D9jrV09G.js";import"./input-t0kgNqw6.js";import"./Divider-BxFiowZD.js";import"./FormControl-ByW68mW_.js";import"./InputLabel-1yMw0qct.js";import"./TooltipIcon-bb09_uCV.js";import"./LegacyTooltip-aT3hUqb3.js";import"./useLink-DktwXh-5.js";import"./usePopper-BKJV8bok.js";import"./index-TSPbpfDB.js";import"./Portal-D7PHIvhz.js";import"./useMemoizedId-FH4PEaL_.js";import"./IconCheckMark-BnM0QKU_.js";import"./IconExclamationMarkCircle24-DaeyL940.js";import"./IconExclamationMarkTriangle-DLo9WXRn.js";import"./IconExclamationMarkTriangle24-DOz5qtx1.js";import"./IconQuestionMarkCircle-DiDI1qTj.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTyihbQY.js";import"./Switch-BZcGK09Q.js";import"./TabItem-I_soBAN8.js";import"./elements-BOYmskOL.js";import"./TextInput-BM0na_zO.js";import"./IconCross-CWs_FIyp.js";import"./Tooltip-qZyF5ts2.js";import"./useClickOutside-GZ1jhqSx.js";import"./EnablePortalWrapper-COewq2TS.js";import"./Tree-CBueg_AQ.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DERfro1Z.js";import"./IconCaretDown-EYx4PbZj.js";import"./IconCaretDown16-CLwxTr_H.js";import"./IconTrashBin16-DNwZ9xB_.js";import"./IconTrashBin24-YMd-jiRQ.js";import"./Flex-CMWiq_-K.js";import"./IconIcon16-B9Mu62ke.js";import"./IconIcon24-B9c6HUrH.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
