import{r as s,j as t}from"./iframe-fM7Rz_IH.js";import{a as l}from"./Box-9T55CxCZ.js";import{B as d}from"./Button-C-HesLNs.js";import{D as u}from"./DialogBody-Bjkb9FOO.js";import{D as g}from"./DialogFooter-BYZMUUva.js";import{D as f}from"./DialogHeader-bQ145vBX.js";import{P as n}from"./Popover-C5DQjM_i.js";import{I as x}from"./IconIcon-5mReaAj0.js";import"./preload-helper-r7mqpNn-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-OlyhZ4Ot.js";import"./Divider-Cey2ANbQ.js";import"./FormControl-Cr1hpC_m.js";import"./InputLabel-BNXUoyxB.js";import"./TooltipIcon-CKGMLqVo.js";import"./LegacyTooltip-Dba4Z-VI.js";import"./useLink-CZIaAhwd.js";import"./useFocusable-BnOXMtFf.js";import"./useFocusRing-D96vsHFl.js";import"./useEffectEvent-Dd15XCAb.js";import"./chain-6uoIjD58.js";import"./index-B2Xp44i3.js";import"./usePopper-CMM9W_Aw.js";import"./index-DsmMH1Qe.js";import"./Portal-7y-WN4RV.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D44gSj9_.js";import"./IconCheckMark-D0okpupZ.js";import"./IconExclamationMarkCircle24-CeaBDf6Z.js";import"./IconExclamationMarkTriangle-dTKdaA8A.js";import"./IconExclamationMarkTriangle24-BhnTYriZ.js";import"./IconQuestionMarkCircle-oN5ApYd_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-q8L7gn0a.js";import"./Switch-ClYNwfm9.js";import"./TabItem-qskUbBBO.js";import"./elements-BOYmskOL.js";import"./TextInput-YMeucMFi.js";import"./IconCross-cI4LqOlP.js";import"./Tooltip-BQCTamfd.js";import"./useClickOutside-D7zc52GW.js";import"./EnablePortalWrapper-DDg5D4xi.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D5eBpZdj.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-D9BtGDKJ.js";import"./IconCaretDown-CqemCPlr.js";import"./IconCaretDown16-C2ZoekrW.js";import"./IconTrashBin16-B5vK85cE.js";import"./IconTrashBin24-B4FK4PfT.js";import"./useButton-B0RvFuLn.js";import"./Flex-B2YXbixU.js";import"./IconIcon16-D_nIzqoW.js";import"./IconIcon24-VpH2cmoq.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
