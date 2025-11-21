import{r as s,j as t}from"./iframe-CNo3YVsc.js";import{a as l}from"./Box-f1STZ4CQ.js";import{B as d}from"./Button-DSKbxRmM.js";import{D as u}from"./DialogBody-dGKKxNdZ.js";import{D as g}from"./DialogFooter-DQM66lAz.js";import{D as f}from"./DialogHeader-CaTOL7Lv.js";import{P as m}from"./Popover-CKeb5Sml.js";import{I as x}from"./IconIcon-x6ORBWig.js";import"./preload-helper-DlITqhEh.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BV_j-pI1.js";import"./Divider-D7HJMwAU.js";import"./FormControl-CLdbqLZP.js";import"./InputLabel-Bm8wfAd_.js";import"./TooltipIcon-8GkEdu5Q.js";import"./LegacyTooltip-BWEuyPxA.js";import"./useLink-DzaWF_eP.js";import"./useFocusable-Ck5I81y_.js";import"./useFocusRing-7JjcBI-b.js";import"./useEffectEvent-CPLHfrgJ.js";import"./chain-CWpWcDO5.js";import"./index-wYTbFd06.js";import"./usePopper-DbsfvSqQ.js";import"./index-DQIEpFFe.js";import"./Portal-Fr1NMp8K.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DeVr9eAN.js";import"./IconCheckMark-BWs2hIls.js";import"./IconExclamationMarkCircle24-BNab1dGr.js";import"./IconExclamationMarkTriangle-_reS8VEg.js";import"./IconExclamationMarkTriangle24-DDzLiGUb.js";import"./IconQuestionMarkCircle-BiqZeOgv.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B2bIEAkx.js";import"./Switch-BL4UP2ej.js";import"./TabItem-CD6D-kTu.js";import"./elements-BOYmskOL.js";import"./TextInput-w72dAVHt.js";import"./IconCross-CaAA8zRb.js";import"./Tooltip-CNRL6LGp.js";import"./useClickOutside-WVTxdjSb.js";import"./EnablePortalWrapper-B8hNlEtI.js";import"./dialog-D9O7a7Fm.js";import"./Tree-7Mn6VZHr.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-32Vpq5Z4.js";import"./Flex-B1REeLGM.js";import"./IconIcon16-BsvA_IT0.js";import"./IconIcon24-CFFNIylt.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const xt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,xt as __namedExportsOrder,ft as default};
