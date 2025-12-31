import{r as s,j as t}from"./iframe-P1v_SnFK.js";import{a as l}from"./Box-FJbAljN4.js";import{B as d}from"./Button-BG_Hn0L7.js";import{D as u}from"./DialogBody-DcJvN-u_.js";import{D as g}from"./DialogFooter-DIvEgnKJ.js";import{D as f}from"./DialogHeader-Bi28PiZv.js";import{P as n}from"./Popover-CvxqlBqg.js";import{I as x}from"./IconIcon-DQYuoSzt.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CleFSgR-.js";import"./FormControl-CNqeCRSl.js";import"./InputLabel-BpdOlKPJ.js";import"./TooltipIcon-CjhqN5FK.js";import"./LegacyTooltip-C2ZrKp-x.js";import"./useLink-CHgZ89N_.js";import"./useFocusable-Oaa3FmhS.js";import"./useFocusRing-D6tHuPfV.js";import"./useEffectEvent-CY7x4YgT.js";import"./chain-DSn6-k2o.js";import"./index-CyZAw-XC.js";import"./usePopper-Bey6HvXb.js";import"./index-BfvRhwlw.js";import"./Portal-DTwkQtwd.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Czld2PBg.js";import"./IconCheckMark-Bq3lZo2f.js";import"./IconExclamationMarkCircle24-6BytVwYp.js";import"./IconExclamationMarkTriangle-DkRvbJ9B.js";import"./IconExclamationMarkTriangle24-4Yo4BnmA.js";import"./IconQuestionMarkCircle-CRmZ_6p5.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-WI2l-uz5.js";import"./Switch-DeumJrrj.js";import"./TabItem-DBF6u6VE.js";import"./elements-BOYmskOL.js";import"./TextInput-Do2D51uq.js";import"./IconCross-bxOvlb1Z.js";import"./Tooltip-B0zPGGv4.js";import"./useClickOutside-DmqDq2SB.js";import"./EnablePortalWrapper-Cy71hwAS.js";import"./dialog-D9O7a7Fm.js";import"./Tree-B9uG2Mhx.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DkyOCaG5.js";import"./IconCaretDown-BwZxyWkn.js";import"./IconCaretDown16-Cw6qGK_r.js";import"./IconTrashBin16-DIc5wDFu.js";import"./IconTrashBin24-INXaQLaW.js";import"./useButton-sSi8tGsu.js";import"./Flex-D8MO4o3m.js";import"./IconIcon16-By3svZtY.js";import"./IconIcon24-DO4R2bUn.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const jt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,jt as __namedExportsOrder,Ct as default};
