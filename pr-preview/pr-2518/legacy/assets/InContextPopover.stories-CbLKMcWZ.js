import{r as s,j as t}from"./iframe-fyGLPEYM.js";import{a as l}from"./Box-CLX-pImO.js";import{B as d}from"./Button-cVJBJqzI.js";import{D as u}from"./DialogBody-Bvw7zbor.js";import{D as g}from"./DialogFooter-BYPrbXYQ.js";import{D as f}from"./DialogHeader-B_E2FcBJ.js";import{P as m}from"./Popover-CaiFpYf_.js";import{I as x}from"./IconIcon-BAlpnQcX.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Bcv275Kl.js";import"./Divider-CUG5X0NG.js";import"./FormControl-DfYHdAvy.js";import"./InputLabel-CMSMoU7u.js";import"./TooltipIcon-DojCEOrM.js";import"./LegacyTooltip-adcI7jgp.js";import"./useLink-Bts17Baq.js";import"./useFocusable-CKsTcjuM.js";import"./useFocusRing-S7LgmWKU.js";import"./useEffectEvent-C4w1I5nw.js";import"./chain-DUvsbXUL.js";import"./index-rU3a83jg.js";import"./usePopper-CdXWRaSH.js";import"./index-C1SclwXe.js";import"./Portal-BFyePCGh.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BHlk_IDS.js";import"./IconCheckMark-BVHtCiaM.js";import"./IconExclamationMarkCircle24-CV7jvQVR.js";import"./IconExclamationMarkTriangle-B3hEA56l.js";import"./IconExclamationMarkTriangle24-C0iMsZEC.js";import"./IconQuestionMarkCircle-e2jbGF9X.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle--yaP7k9p.js";import"./Switch-C30WT3Qx.js";import"./TabItem-B8eVqrP3.js";import"./elements-BOYmskOL.js";import"./TextInput-BgILU15o.js";import"./IconCross-Ig2qIE-C.js";import"./Tooltip-Bl4bjOy6.js";import"./useClickOutside-CXLXbWqI.js";import"./EnablePortalWrapper-BFYUrxbk.js";import"./dialog-D9O7a7Fm.js";import"./useButton-BxjTpxd6.js";import"./Flex-AACo28_K.js";import"./IconIcon16-C3lrh8p8.js";import"./IconIcon24-8SVtYSCw.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,n,p;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const gt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,gt as __namedExportsOrder,ut as default};
