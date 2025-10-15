import{r as a,j as t}from"./iframe-C5kgyqgm.js";import{a as l}from"./Box-1a6ixdwV.js";import{B as d}from"./Button-BDbLV5Rr.js";import{D as u}from"./DialogBody-TOaIZ8Uj.js";import{D as g}from"./DialogFooter-BdMyd1qJ.js";import{D as f}from"./DialogHeader-B-WAduU6.js";import{P as m}from"./Popover-DpCPYcNW.js";import{I as x}from"./IconJohanna-BZfmAG9R.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cq3eqICY.js";import"./Checkbox-BIDcMQG6.js";import"./useFocusable-Ceb7Je-e.js";import"./useFocusRing-cjJ4V1tO.js";import"./useEffectEvent-BBQGPd_M.js";import"./chain-CCiNAOP-.js";import"./index-2KbGipOq.js";import"./useFormValidationState-OtNK8O4n.js";import"./useControlledState-C5Nbv06b.js";import"./InputLabel-Dk1dNGCp.js";import"./TooltipIcon-DnNJk431.js";import"./LegacyTooltip-kdidwXGR.js";import"./useLink-y0X30T0O.js";import"./usePopper-CuiR7VCC.js";import"./index-Cp1gGYWC.js";import"./Portal-GwTjoSVN.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DS2WT1er.js";import"./IconCheckMark-DzG8aki9.js";import"./IconExclamationMarkCircle24-Wq4nzIzR.js";import"./IconExclamationMarkTriangle-D4zOyiMZ.js";import"./IconExclamationMarkTriangle24-BmoIfTD5.js";import"./IconQuestionMarkCircle-Bm1-LFoH.js";import"./IconMinus-CWQAyzXk.js";import"./Divider-DyB_gL0k.js";import"./FormControl-B_A1qvx2.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BWjfZ81p.js";import"./Switch-CXVar6Mo.js";import"./TabItem-DpygmHk_.js";import"./elements-BOYmskOL.js";import"./TextInput-CVlLNH_J.js";import"./IconCross-xebiYYLi.js";import"./Tooltip-CTIHCn7L.js";import"./useClickOutside-B4v_gZoL.js";import"./EnablePortalWrapper-B3Tmz2tf.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CBwj0P3O.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-bdege3iH.js";import"./Flex-p9EEaRjo.js";const ht={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const Bt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,Bt as __namedExportsOrder,ht as default};
