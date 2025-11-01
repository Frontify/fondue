import{r as l,j as o}from"./iframe-B0eONuky.js";import{B as I}from"./Button-BlGIO2tE.js";import{D as b}from"./DialogBody-BxtrDcqk.js";import{D as x}from"./DialogFooter-DiNJOedn.js";import{I as A}from"./IconIcon-D3PJDy2i.js";import{D as B}from"./Dialog-B-McRFAW.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-MprHWY6w.js";import"./useButton-5FbdIYcR.js";import"./useFocusable-bBkjSLpf.js";import"./useFocusRing-DE6ZkWyf.js";import"./useEffectEvent-2_Uk2eyz.js";import"./chain-V8glzwK0.js";import"./index-DVbrmjAE.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Bx-HGFN9.js";import"./borderStyle-D9jrV09G.js";import"./input-CH-sbZx6.js";import"./Divider-Ctv_3Wyq.js";import"./Dropdown-BfzPlYYt.js";import"./FocusScope-CyQyhzxw.js";import"./useOverlayTriggerState-lO9KGur7.js";import"./useControlledState-BVDDe9gl.js";import"./useMenuTrigger-DoHZFNAI.js";import"./useLabels-DLn4iTZj.js";import"./useLocalizedStringFormatter-D45KdaND.js";import"./context-BiMFL_PP.js";import"./VisuallyHidden-CpTHZVNZ.js";import"./helper-4xrQ1och.js";import"./keyboard-DpUZzzD5.js";import"./SelectionManager-DZOcDTAx.js";import"./useField-D1_sbYus.js";import"./useFormValidationState-CiR8hia_.js";import"./usePopper-CSmw89St.js";import"./index-Cq0fKC_P.js";import"./MenuItem-DOiZqrOT.js";import"./IconCaretRight-CVZt_dym.js";import"./IconCheckMark-Do5BaNJh.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CuP6zKKO.js";import"./Trigger-BkTp6a6g.js";import"./IconCaretDown-DGfG4Bhv.js";import"./IconCaretDown16-K9H94xLN.js";import"./IconCross-DKzK2egq.js";import"./IconExclamationMarkTriangle-E9iCfFGJ.js";import"./IconExclamationMarkTriangle24-BgvkgKew.js";import"./IconTrashBin16-B3PCevQV.js";import"./IconTrashBin24-j-bA0P1z.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CWbGt64c.js";import"./Portal-D_InDcfX.js";import"./useMemoizedId-B3YhzS_A.js";import"./FormControl-BHe39TIa.js";import"./InputLabel-ZriXx0s-.js";import"./TooltipIcon-iXKlKXAf.js";import"./LegacyTooltip-B7q53XOK.js";import"./useLink-B03_KRRE.js";import"./IconExclamationMarkCircle24-DhRVyq7-.js";import"./IconQuestionMarkCircle-R6W4K534.js";import"./Switch-OeDDwXU2.js";import"./TabItem-76GLqhix.js";import"./TextInput-Gv7lpT9-.js";import"./Tooltip-Dwst5rQ3.js";import"./useClickOutside-BBDKVLV6.js";import"./Tree-D-Zdn97c.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-B2ibypED.js";import"./IconIcon16-Ba_Pu6iK.js";import"./IconIcon24-BaZ0imhr.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
