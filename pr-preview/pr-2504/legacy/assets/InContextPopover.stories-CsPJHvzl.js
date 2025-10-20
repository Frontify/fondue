import{r as a,j as t}from"./iframe-CjtBbWFy.js";import{a as l}from"./Box-BNkz-oee.js";import{B as d}from"./Button-CnwsL3Ro.js";import{D as u}from"./DialogBody-DROvf7qL.js";import{D as g}from"./DialogFooter-CzZ0x6-D.js";import{D as f}from"./DialogHeader-85pfGI4P.js";import{P as n}from"./Popover-Dz-JONrh.js";import{I as x}from"./IconJohanna-BbIuCp3o.js";import"./preload-helper-OKB6Z3Tn.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ba0Bf5HV.js";import"./Checkbox-BpSnOp8M.js";import"./useFocusable-B1riX0q_.js";import"./useFocusRing-DKH8TC1y.js";import"./useEffectEvent-Bvk3GHSi.js";import"./chain-CJ40OBqG.js";import"./index-D3QZuRsF.js";import"./useFormValidationState-B82DO5rQ.js";import"./useControlledState-DFUyN-u3.js";import"./InputLabel-1H4PKH4V.js";import"./TooltipIcon-CdgnbPJi.js";import"./LegacyTooltip-CECqrk99.js";import"./useLink-D81xicVU.js";import"./usePopper-DOYFNROV.js";import"./index-CW_2kq9w.js";import"./Portal-Ctlgj8Ml.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BEZTnksE.js";import"./IconCheckMark-D8JZM9L-.js";import"./IconExclamationMarkCircle24-BT7Ql3K_.js";import"./IconExclamationMarkTriangle-s_f3UMNv.js";import"./IconExclamationMarkTriangle24-BDYPAIuO.js";import"./IconQuestionMarkCircle-C1Ad-WKL.js";import"./IconMinus-CcF99uwO.js";import"./Divider-BdjnAWXd.js";import"./FormControl-Bq4xFB8E.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Cp7aQDJ_.js";import"./Switch-CBp_d0nm.js";import"./TabItem-BS9-1NTO.js";import"./elements-BOYmskOL.js";import"./TextInput-DT25f2Ql.js";import"./IconCross-RT0uymvJ.js";import"./Tooltip-BxbW-1EZ.js";import"./useClickOutside-CCoMfOuc.js";import"./EnablePortalWrapper-DV8bmMCs.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C-XNFFHl.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DcmUr2NY.js";import"./IconCaretDown-PCmiz6X9.js";import"./IconCaretDown16-C7c3SGqO.js";import"./IconTrashBin16-DW8Ffu5a.js";import"./IconTrashBin24-CaWVM4gw.js";import"./useButton-D1ZYnjYr.js";import"./Flex-B8UnjY4w.js";const Dt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var s,p,m;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const vt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,vt as __namedExportsOrder,Dt as default};
