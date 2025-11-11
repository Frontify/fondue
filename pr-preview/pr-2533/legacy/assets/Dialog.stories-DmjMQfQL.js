import{r as l,j as e}from"./iframe-CqMYqlgR.js";import{B as I}from"./Button-CYHT2AMY.js";import{D as b}from"./DialogBody-BrhfKFM5.js";import{D as x}from"./DialogFooter-B4yexa2X.js";import{I as A}from"./IconIcon-gNljK24O.js";import{D as B}from"./Dialog-HEAkzmRQ.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-BrHt6s3f.js";import"./useButton-vGfdsb0j.js";import"./useFocusable-BZgzPKtn.js";import"./useFocusRing-CLIn77jc.js";import"./useEffectEvent-D05mPwwN.js";import"./chain-B9Eo87tn.js";import"./index-Cy9q-1wD.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Dbyzt1Zk.js";import"./borderStyle-D9jrV09G.js";import"./input-EhKZN_1O.js";import"./Divider-Z6m92kut.js";import"./FormControl-DylzNNc3.js";import"./InputLabel-CS1iO4pu.js";import"./TooltipIcon-Z0eJr2D6.js";import"./LegacyTooltip-Co0qD5RC.js";import"./useLink-D7Pri6Nz.js";import"./usePopper-BK18999i.js";import"./index-Bjym0GCp.js";import"./Portal-BsHqlhbb.js";import"./useMemoizedId-DAyKmQUl.js";import"./IconCheckMark-BAMG8MDz.js";import"./IconExclamationMarkCircle24-ChMlYYeR.js";import"./IconExclamationMarkTriangle-3XRG4Ouh.js";import"./IconExclamationMarkTriangle24-DSIS2BTO.js";import"./IconQuestionMarkCircle-BxAoOfIQ.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DxO-53u-.js";import"./Switch-BVW5p_vz.js";import"./TabItem-Dey0TnTM.js";import"./elements-BOYmskOL.js";import"./TextInput-B2n_17-q.js";import"./IconCross-Csh70OY3.js";import"./Tooltip-CZgfioZM.js";import"./useClickOutside-DLthHa0m.js";import"./EnablePortalWrapper-D8D0Lbv4.js";import"./Tree-CxepOoim.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BqpM5goS.js";import"./IconCaretDown-CJIKu6X8.js";import"./IconCaretDown16-hlAzjhEC.js";import"./IconTrashBin16-DbBfC4Gf.js";import"./IconTrashBin24-Dqge_01c.js";import"./Flex-rl2nqSsW.js";import"./IconIcon16-BR33IxhP.js";import"./IconIcon24-CMuTYtJx.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
