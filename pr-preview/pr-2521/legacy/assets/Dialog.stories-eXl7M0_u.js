import{r as l,j as e}from"./iframe-P1v_SnFK.js";import{B as I}from"./Button-BG_Hn0L7.js";import{D as b}from"./DialogBody-DcJvN-u_.js";import{D as x}from"./DialogFooter-DIvEgnKJ.js";import{I as A}from"./IconIcon-DQYuoSzt.js";import{D as B}from"./Dialog-C5OoWHHg.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CxFeC-BG.js";import"./useButton-sSi8tGsu.js";import"./useFocusable-Oaa3FmhS.js";import"./useFocusRing-D6tHuPfV.js";import"./useEffectEvent-CY7x4YgT.js";import"./chain-DSn6-k2o.js";import"./index-CyZAw-XC.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-FJbAljN4.js";import"./borderStyle-D9jrV09G.js";import"./input-CleFSgR-.js";import"./FormControl-CNqeCRSl.js";import"./InputLabel-BpdOlKPJ.js";import"./TooltipIcon-CjhqN5FK.js";import"./LegacyTooltip-C2ZrKp-x.js";import"./useLink-CHgZ89N_.js";import"./usePopper-Bey6HvXb.js";import"./index-BfvRhwlw.js";import"./Portal-DTwkQtwd.js";import"./useMemoizedId-Czld2PBg.js";import"./IconCheckMark-Bq3lZo2f.js";import"./IconExclamationMarkCircle24-6BytVwYp.js";import"./IconExclamationMarkTriangle-DkRvbJ9B.js";import"./IconExclamationMarkTriangle24-4Yo4BnmA.js";import"./IconQuestionMarkCircle-CRmZ_6p5.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-WI2l-uz5.js";import"./Switch-DeumJrrj.js";import"./TabItem-DBF6u6VE.js";import"./elements-BOYmskOL.js";import"./TextInput-Do2D51uq.js";import"./IconCross-bxOvlb1Z.js";import"./Tooltip-B0zPGGv4.js";import"./useClickOutside-DmqDq2SB.js";import"./EnablePortalWrapper-Cy71hwAS.js";import"./Tree-B9uG2Mhx.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DkyOCaG5.js";import"./IconCaretDown-BwZxyWkn.js";import"./IconCaretDown16-Cw6qGK_r.js";import"./IconTrashBin16-DIc5wDFu.js";import"./IconTrashBin24-INXaQLaW.js";import"./Flex-D8MO4o3m.js";import"./IconIcon16-By3svZtY.js";import"./IconIcon24-DO4R2bUn.js";const ke={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Ce=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Ce as __namedExportsOrder,ke as default};
