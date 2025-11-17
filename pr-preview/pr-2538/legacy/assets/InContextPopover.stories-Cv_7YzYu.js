import{r as s,j as t}from"./iframe-B6wMFBmr.js";import{a as l}from"./Box-N8_xKnJ-.js";import{B as d}from"./Button-BAqzJ5Pv.js";import{D as u}from"./DialogBody-UUOVycv-.js";import{D as g}from"./DialogFooter-BC0qWLMe.js";import{D as f}from"./DialogHeader-DES0vuQH.js";import{P as m}from"./Popover-dEH6ICg0.js";import{I as x}from"./IconIcon-DhP849Wp.js";import"./preload-helper-B3RP-zrM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-evml2QDQ.js";import"./Divider-BkQnAn1F.js";import"./FormControl-BerGKFeK.js";import"./InputLabel-QH3KoYmW.js";import"./TooltipIcon-W-6H6r9U.js";import"./LegacyTooltip-BCilkNdt.js";import"./useLink-DkTIgE5u.js";import"./useFocusable-k5y2-4wJ.js";import"./useFocusRing-CGF_IT6k.js";import"./useEffectEvent-CikN4lv1.js";import"./chain-DULsJ5c3.js";import"./index-BEaJUMGy.js";import"./usePopper-0MaFEurT.js";import"./index-8VFt0Zma.js";import"./Portal-nAgA0YlW.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DnKqk2fp.js";import"./IconCheckMark-DBwBkYZ5.js";import"./IconExclamationMarkCircle24-DoWZywMv.js";import"./IconExclamationMarkTriangle-BYVM_8KN.js";import"./IconExclamationMarkTriangle24-CQVhFF9W.js";import"./IconQuestionMarkCircle-I-XoRTAy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CGnUCcrv.js";import"./Switch-BLVO3_NP.js";import"./TabItem-rWyOgEJ4.js";import"./elements-BOYmskOL.js";import"./TextInput-tcJ9GSxD.js";import"./IconCross-YTa4RDxM.js";import"./Tooltip-BEmzkewf.js";import"./useClickOutside-D09WEkaY.js";import"./EnablePortalWrapper-BhSC5jqe.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C2Vrhmv9.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DD58yLyN.js";import"./Flex-CWJsoUik.js";import"./IconIcon16-6KWVaRRG.js";import"./IconIcon24-Dk6NLM01.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
