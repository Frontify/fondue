import{r as s,j as t}from"./iframe-BqQHxnDd.js";import{a as l}from"./Box-CMRxuKYI.js";import{B as d}from"./Button-DWsc2vdA.js";import{D as u}from"./DialogBody-D9XpHjAm.js";import{D as g}from"./DialogFooter-DvfNslbl.js";import{D as f}from"./DialogHeader-CZRI4hkH.js";import{P as m}from"./Popover-n9qddork.js";import{I as x}from"./IconIcon-BfGqYA3q.js";import"./preload-helper-B3RP-zrM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DYzjlsPw.js";import"./Divider-CT__RMy9.js";import"./FormControl-Lk1i6m-Z.js";import"./InputLabel-CzWQnPda.js";import"./TooltipIcon-Dadx3MDO.js";import"./LegacyTooltip-BS4owh4e.js";import"./useLink-Cykwcau2.js";import"./useFocusable-BY5EgtMj.js";import"./useFocusRing-B3DYOANT.js";import"./useEffectEvent-DIjOIMgn.js";import"./chain-8dJdl4Ia.js";import"./index-DId98sNP.js";import"./usePopper-Cdf_544z.js";import"./index-DiYa8SvX.js";import"./Portal-GP9guqaf.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BKZvTVU3.js";import"./IconCheckMark-gnOAOTGu.js";import"./IconExclamationMarkCircle24-Fp0gSAGm.js";import"./IconExclamationMarkTriangle-DRYbaBww.js";import"./IconExclamationMarkTriangle24-BFk3Bxlq.js";import"./IconQuestionMarkCircle-9xIeZgio.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BCYd-I0j.js";import"./Switch-Dhb_5KgN.js";import"./TabItem-COVABDjx.js";import"./elements-BOYmskOL.js";import"./TextInput-CRCf7Wwq.js";import"./IconCross-C4KjmdPO.js";import"./Tooltip-nXmfdmOX.js";import"./useClickOutside-CTwfTc9E.js";import"./EnablePortalWrapper-DfwDhaeV.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C1qnlzq3.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CxAhYbwu.js";import"./Flex-CO2q96At.js";import"./IconIcon16-BY9toeRn.js";import"./IconIcon24-CUTRx5l7.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
