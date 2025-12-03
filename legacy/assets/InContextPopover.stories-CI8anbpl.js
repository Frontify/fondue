import{r as s,j as t}from"./iframe-CbGYZ4d2.js";import{a as l}from"./Box-QKYjBALX.js";import{B as d}from"./Button-CqXSq8B3.js";import{D as u}from"./DialogBody-DXLBK4dr.js";import{D as g}from"./DialogFooter-Dq-OLpO9.js";import{D as f}from"./DialogHeader-CEvG1xF7.js";import{P as m}from"./Popover-BRp-tksn.js";import{I as x}from"./IconIcon-DJE70Syv.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-gI44225F.js";import"./Divider-tx3C6hoD.js";import"./FormControl-Dn8cCnlG.js";import"./InputLabel-DJsZR9-z.js";import"./TooltipIcon-C8oDJz_7.js";import"./LegacyTooltip-CqusjEKw.js";import"./useLink-BfvUuMQH.js";import"./useFocusable-kLaZholP.js";import"./useFocusRing-DGmeO2rt.js";import"./useEffectEvent-DAfYCsqI.js";import"./chain-BzzeQIdr.js";import"./index-CZqoh8c1.js";import"./usePopper-BzVjy6a_.js";import"./index-D2eKQUPk.js";import"./Portal-DJoFKlsy.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-B6LXK-YA.js";import"./IconCheckMark-C1QsHy_I.js";import"./IconExclamationMarkCircle24-iYc07DtD.js";import"./IconExclamationMarkTriangle-CUe1kozD.js";import"./IconExclamationMarkTriangle24-Bvc9T5sY.js";import"./IconQuestionMarkCircle-CdAQT8B4.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Cwedndk8.js";import"./Switch-Cyy-nlb2.js";import"./TabItem-Dqp3LWzM.js";import"./elements-BOYmskOL.js";import"./TextInput-B6YkG45Y.js";import"./IconCross-BdofMOPw.js";import"./Tooltip-Denlgojj.js";import"./useClickOutside-oSG1cT17.js";import"./EnablePortalWrapper-CbCDcKJ6.js";import"./dialog-D9O7a7Fm.js";import"./useButton-Dayt-QbG.js";import"./Flex-DI0LOrqI.js";import"./IconIcon16-BXnFLXh_.js";import"./IconIcon24-CrViZbNt.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,n,p;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
