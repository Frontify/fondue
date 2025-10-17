import{r as a,j as t}from"./iframe-DJQVXWuk.js";import{a as l}from"./Box-CkSrkq1t.js";import{B as d}from"./Button-DaJoTYCM.js";import{D as u}from"./DialogBody-lgjwWrzi.js";import{D as g}from"./DialogFooter-Br20KCDH.js";import{D as f}from"./DialogHeader-CEpp5C7E.js";import{P as m}from"./Popover-xW2b51Vq.js";import{I as x}from"./IconJohanna-DbEOyZsd.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BvHGeAD4.js";import"./Divider-CBrDXosR.js";import"./FormControl-DqiBYpWh.js";import"./InputLabel-DNwObbHV.js";import"./TooltipIcon-_3mDsfcU.js";import"./LegacyTooltip-CI_85XWu.js";import"./useLink-DhFpKQ7O.js";import"./useFocusable-HyH9poRw.js";import"./useFocusRing-B5WpslQk.js";import"./useEffectEvent-DPgJ8EX7.js";import"./chain-W_U60bM9.js";import"./index-B2RX_hrL.js";import"./usePopper-paJJrhsR.js";import"./index-BSg9Skdd.js";import"./Portal-AkiJwaiB.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CKHqpYJw.js";import"./IconCheckMark-BPxhNfny.js";import"./IconExclamationMarkCircle24-Di_MM5VM.js";import"./IconExclamationMarkTriangle-B6To_ZLd.js";import"./IconExclamationMarkTriangle24-BvE6NzrV.js";import"./IconQuestionMarkCircle-C5u241rw.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BFeqv4SI.js";import"./Switch-DoBvxJxV.js";import"./TabItem-CSpaF9nU.js";import"./elements-BOYmskOL.js";import"./TextInput-yaL-l7Au.js";import"./IconCross-BbJecq2Z.js";import"./Tooltip-DBIhbQgC.js";import"./useClickOutside-BBprzJwT.js";import"./EnablePortalWrapper-BEmKeOQL.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BlvDWZ8W.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DN6pmR4_.js";import"./Flex-DyAMO-W6.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
