import{r as s,j as t}from"./iframe-BcVx5NPK.js";import{a as l}from"./Box-C3Uk66F7.js";import{B as d}from"./Button-RWJVCgmd.js";import{D as u}from"./DialogBody-k9rsYawK.js";import{D as g}from"./DialogFooter-CzVJ4iA2.js";import{D as f}from"./DialogHeader-SZJjJQsx.js";import{P as n}from"./Popover-D7NvFuqz.js";import{I as x}from"./IconIcon-l4ImsLMM.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-E75q4Srw.js";import"./Divider-DR7YAXWA.js";import"./FormControl-BDC5JdLb.js";import"./InputLabel-CUhYhSht.js";import"./TooltipIcon-BaO7ej8h.js";import"./LegacyTooltip-DyrhzydW.js";import"./useLink-oi60uFHG.js";import"./useFocusable-sOy4Nhxz.js";import"./useFocusRing-B3lGQQyY.js";import"./useEffectEvent-DXIGhCEt.js";import"./chain-CQw_duRO.js";import"./index-B7yv6Trq.js";import"./usePopper-Bl-ygjjc.js";import"./index-BM8Vr14O.js";import"./Portal-6qi5tGkP.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D8mxuONa.js";import"./IconCheckMark-2IBl3Pfz.js";import"./IconExclamationMarkCircle24-QcrGoLdb.js";import"./IconExclamationMarkTriangle-6jtpVZPg.js";import"./IconExclamationMarkTriangle24-PShe76FC.js";import"./IconQuestionMarkCircle-BPbpPbfN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CIxzqMKC.js";import"./Switch-DEZ4k8o7.js";import"./TabItem-mjMEiDoZ.js";import"./elements-BOYmskOL.js";import"./TextInput-Cp16C1LO.js";import"./IconCross-l8JGVZNG.js";import"./Tooltip-C2GHsrzr.js";import"./useClickOutside-tPfe4O2A.js";import"./EnablePortalWrapper-Cd2XASpE.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DkRcL4mr.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CrOcaT6T.js";import"./IconCaretDown-Bcj1UjOS.js";import"./IconCaretDown16-CymR5yEU.js";import"./IconTrashBin16-De3Vw11G.js";import"./IconTrashBin24-DsBjmQ36.js";import"./useButton-_aFHH79R.js";import"./Flex-CBFVotaz.js";import"./IconIcon16-BacrQyr9.js";import"./IconIcon24-BvzCLDev.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const It=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,It as __namedExportsOrder,jt as default};
