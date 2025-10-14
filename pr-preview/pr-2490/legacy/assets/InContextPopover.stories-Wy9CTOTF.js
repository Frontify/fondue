import{r as a,j as t}from"./iframe-_CJuXu84.js";import{a as l}from"./Box-Btn5dmVU.js";import{B as d}from"./Button-B2N9PeXV.js";import{D as u}from"./DialogBody-BxRDLKBS.js";import{D as g}from"./DialogFooter-BjjDfdgz.js";import{D as f}from"./DialogHeader-BD4ULJrN.js";import{P as m}from"./Popover-Bpm8CEIG.js";import{I as x}from"./IconJohanna-BsRYV1uo.js";import"./preload-helper-ClJkntjM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DuHqVB_O.js";import"./Divider-DbMgtLdb.js";import"./FormControl-zWLLlcHY.js";import"./InputLabel-84cjDhyb.js";import"./TooltipIcon-BAlMvzYR.js";import"./LegacyTooltip-DlM5kaLF.js";import"./useLink-B9611AG5.js";import"./useFocusable-DH91yOpf.js";import"./useFocusRing-fCx02c8I.js";import"./useEffectEvent-DuN0fnSL.js";import"./chain-CQyqI67U.js";import"./index-CdDhSHAY.js";import"./usePopper-DIXRjTn1.js";import"./index-CUOUo0of.js";import"./Portal-DtA00T2z.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CnDE8Hpj.js";import"./IconCheckMark-Comm9FN-.js";import"./IconExclamationMarkCircle24-DzZStVMM.js";import"./IconExclamationMarkTriangle-L3kp_5MP.js";import"./IconExclamationMarkTriangle24-Bal_ANY7.js";import"./IconQuestionMarkCircle-B_fN6JdD.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B2ymvYHm.js";import"./Switch-DCta7Wdg.js";import"./TabItem-B2mMHkxH.js";import"./elements-BOYmskOL.js";import"./TextInput-BNCNYxRp.js";import"./IconCross-DkPhWRI6.js";import"./Tooltip-Dp7KCxV3.js";import"./useClickOutside-7CVsvZOS.js";import"./EnablePortalWrapper-Bgr-lnxn.js";import"./dialog-D9O7a7Fm.js";import"./Tree-B0WGJo-9.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BunVikec.js";import"./Flex-CW8L0_-v.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const gt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,gt as __namedExportsOrder,ut as default};
