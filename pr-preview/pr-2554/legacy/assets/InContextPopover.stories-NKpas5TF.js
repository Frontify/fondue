import{r as s,j as t}from"./iframe-B6gvnC9G.js";import{a as l}from"./Box-D2ZqmUHl.js";import{B as d}from"./Button-U5VlevU2.js";import{D as u}from"./DialogBody-BAYo8gl7.js";import{D as g}from"./DialogFooter-Ciogpbp5.js";import{D as f}from"./DialogHeader-C5FhMImW.js";import{P as n}from"./Popover-8I_o9lZx.js";import{I as x}from"./IconIcon-xo_-0px2.js";import"./preload-helper-1L8wWKLL.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-g2tGremA.js";import"./Checkbox-D6vyio4z.js";import"./useFocusable-BFOTHm5b.js";import"./useFocusRing-lDQQmtVG.js";import"./useEffectEvent-Br9oWhz1.js";import"./chain-DkU4Parx.js";import"./index-Ca3jtKOM.js";import"./useFormValidationState-D8jGKcTw.js";import"./useControlledState-BGX5OVF3.js";import"./InputLabel-Piz3csh8.js";import"./TooltipIcon-u9szC1VU.js";import"./LegacyTooltip-CUQq3jNY.js";import"./useLink-DpQXp-4I.js";import"./usePopper-D6IpfkbE.js";import"./index-Bkk43B7y.js";import"./Portal-FN-7ZB7K.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CoFSyPjm.js";import"./IconCheckMark-CJRGY1pq.js";import"./IconExclamationMarkCircle24-dSHdz95B.js";import"./IconExclamationMarkTriangle-BIGUCjg0.js";import"./IconExclamationMarkTriangle24-BTWBP6oJ.js";import"./IconQuestionMarkCircle-Dl_P1dkt.js";import"./IconMinus-CFenzC2Z.js";import"./Divider-C1YILpIw.js";import"./FormControl-DYPrqQx1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CDo8ljLK.js";import"./Switch-BlEQeOTC.js";import"./TabItem-Db1inNG6.js";import"./elements-BOYmskOL.js";import"./TextInput-ByQEBCRv.js";import"./IconCross-v4Os9_kc.js";import"./Tooltip-lCQmm1Hl.js";import"./useClickOutside--V2jy9Qc.js";import"./EnablePortalWrapper-C9__I8yL.js";import"./dialog-D9O7a7Fm.js";import"./Tree-q-pdklRr.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CN1tEa_w.js";import"./IconCaretDown-CPNCjoYn.js";import"./IconCaretDown16-DnxqvEec.js";import"./IconTrashBin16-Cy7a5y_v.js";import"./IconTrashBin24-Cvl42CmC.js";import"./useButton-Csf4pE_W.js";import"./Flex-DLbMXdlT.js";import"./IconIcon16-o3EkPJXe.js";import"./IconIcon24-DCDjMDzQ.js";const vt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var p,a,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(m=(a=o.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const qt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,qt as __namedExportsOrder,vt as default};
