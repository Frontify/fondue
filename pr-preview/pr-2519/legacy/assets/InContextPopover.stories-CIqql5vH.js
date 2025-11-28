import{r as s,j as t}from"./iframe-Ng_GWW1n.js";import{a as l}from"./Box-C2AAiLRg.js";import{B as d}from"./Button-DTnAJnJD.js";import{D as u}from"./DialogBody-CWMSK4ia.js";import{D as g}from"./DialogFooter-CLJjh1va.js";import{D as f}from"./DialogHeader-L6SybCe3.js";import{P as m}from"./Popover-Ci8d1jm_.js";import{I as x}from"./IconIcon-WppbKtIU.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CMtuz_oX.js";import"./Divider-DnHImugK.js";import"./FormControl-C1uigTas.js";import"./InputLabel-8bD9O_qh.js";import"./TooltipIcon-CNSgQRo7.js";import"./LegacyTooltip-D6E4E5LN.js";import"./useLink-DyG-X6Mh.js";import"./useFocusable-ukr0GfSS.js";import"./useFocusRing-DW1gfD-f.js";import"./useEffectEvent-D_3aKM3f.js";import"./chain-CFpcU0Bc.js";import"./index-BWy1gd5z.js";import"./usePopper-ZqHfhPUT.js";import"./index-CQojNdc7.js";import"./Portal-DKQJFHxR.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-76AoiODA.js";import"./IconCheckMark-BWLVd7ff.js";import"./IconExclamationMarkCircle24-D0fOYVRR.js";import"./IconExclamationMarkTriangle-DLzZIkKJ.js";import"./IconExclamationMarkTriangle24-Dukgs8V3.js";import"./IconQuestionMarkCircle-B25uHDGN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DoE3fbTl.js";import"./Switch-DlNN-b77.js";import"./TabItem-DgdG8pku.js";import"./elements-BOYmskOL.js";import"./TextInput-BRzonyv2.js";import"./IconCross-CT7zuVHP.js";import"./Tooltip-BDiP1-AM.js";import"./useClickOutside-CZbtNKDE.js";import"./EnablePortalWrapper-DgbBhakT.js";import"./dialog-D9O7a7Fm.js";import"./Tree-KUPNwcnx.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BnRdYpLk.js";import"./Flex-CdtIbowj.js";import"./IconIcon16-B238eyaY.js";import"./IconIcon24-CpjM-9I8.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
