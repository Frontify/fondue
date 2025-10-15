import{r as a,j as t}from"./iframe-sarzTi8L.js";import{a as l}from"./Box-CyBGUzcO.js";import{B as d}from"./Button-V9rFQHqA.js";import{D as u}from"./DialogBody-B-DTk8Jv.js";import{D as g}from"./DialogFooter-DQzB5waF.js";import{D as f}from"./DialogHeader-DG6UesqE.js";import{P as n}from"./Popover-LVIvcx_Q.js";import{I as x}from"./IconJohanna-DlYMMGV6.js";import"./preload-helper-D7hvLZ4Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D4wH6B5Q.js";import"./Checkbox-6y-EpNiA.js";import"./useFocusable-BZQrvG5Y.js";import"./useFocusRing-CJslZTVh.js";import"./useEffectEvent-DXJV4zsr.js";import"./chain-MnvsB7gO.js";import"./index-DJJW3p-i.js";import"./useFormValidationState-4Te4vK6C.js";import"./useControlledState-B6Tx6Nhk.js";import"./InputLabel-DuLcCPUV.js";import"./TooltipIcon-BjXJdlzR.js";import"./LegacyTooltip-C-HQV77A.js";import"./useLink-Y2z5Scob.js";import"./usePopper-Ck-CZu4g.js";import"./index-D2Z16GHo.js";import"./Portal-CFiQojYp.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C2H8E_mU.js";import"./IconCheckMark-B35tL5o7.js";import"./IconExclamationMarkCircle24-BJNv-ZIi.js";import"./IconExclamationMarkTriangle-D_Bn4azM.js";import"./IconExclamationMarkTriangle24-l8-Sm8AF.js";import"./IconQuestionMarkCircle-Shiv9VzZ.js";import"./IconMinus-DrINymAZ.js";import"./FormControl-B-YAd-L_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B6EIods_.js";import"./Switch-DabsP_E8.js";import"./TabItem-BlJOjUxn.js";import"./elements-BOYmskOL.js";import"./TextInput-CyegwwzZ.js";import"./IconCross-B83ZgxXS.js";import"./Tooltip-Dcr_vg-B.js";import"./useClickOutside-DN9tvAKQ.js";import"./EnablePortalWrapper-KCbmKcGa.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CPQWooIF.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DpjUExqf.js";import"./IconCaretDown-JRJFTHDc.js";import"./IconCaretDown16-Dr5y3NF-.js";import"./IconTrashBin16-B1LvMOjZ.js";import"./IconTrashBin24-yZhZCG6Y.js";import"./useButton-BfqVDKT2.js";import"./Flex-dQFVmFcQ.js";const wt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var s,p,m;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Box className="tw-w-[400px]">
                    <DialogHeader title="Title" padding="compact"></DialogHeader>
                    <DialogBody padding="compact">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae
                            quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod
                            ullam. Beatae deserunt eum quibusdam ratione.
                        </p>
                    </DialogBody>
                    <DialogFooter padding="compact" actionButtons={[{
          children: 'Confirm',
          onClick: () => setIsOpen(false)
        }]}></DialogFooter>
                </Box>
            </Popover>
        </div>;
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const Dt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Dt as __namedExportsOrder,wt as default};
