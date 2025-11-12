import{r as s,j as t}from"./iframe-0VoCCvKQ.js";import{a as l}from"./Box-C3CPGAWj.js";import{B as d}from"./Button-_I0pyUtf.js";import{D as u}from"./DialogBody-BQ3rE37G.js";import{D as g}from"./DialogFooter-_Iju70Sh.js";import{D as f}from"./DialogHeader-CZifA-o4.js";import{P as n}from"./Popover-D-cDR8I8.js";import{I as x}from"./IconIcon-COGBrWY5.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cn5dIzAi.js";import"./Divider-Bkort0to.js";import"./FormControl-DTJtLJ3I.js";import"./InputLabel-D-dYkOUU.js";import"./TooltipIcon-BqRz7wxw.js";import"./LegacyTooltip-DsCZbgEK.js";import"./useLink-BKN1ye4f.js";import"./useFocusable-BCe4IQTp.js";import"./useFocusRing-BwU7aKs1.js";import"./useEffectEvent-BHlnOQgH.js";import"./chain-OdKjUm2f.js";import"./index-Bgj71gTm.js";import"./usePopper-DD_o-Erv.js";import"./index-BpkhDvZR.js";import"./Portal-BUQ-jWX1.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CDuHpq3f.js";import"./IconCheckMark-CkwzVArU.js";import"./IconExclamationMarkCircle24-PCG54VBR.js";import"./IconExclamationMarkTriangle-C5ppu3zD.js";import"./IconExclamationMarkTriangle24-CwxIDAa1.js";import"./IconQuestionMarkCircle-BFRN5wh-.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CUUgsLEh.js";import"./Switch-DXHHRCmz.js";import"./TabItem-ClsKH_u9.js";import"./elements-BOYmskOL.js";import"./TextInput-BrmcdJT1.js";import"./IconCross-C4F8ia0X.js";import"./Tooltip-CVOw9Kzc.js";import"./useClickOutside-CIwQYdWe.js";import"./EnablePortalWrapper-CJrl3TYk.js";import"./dialog-D9O7a7Fm.js";import"./Tree-2aUbMr9P.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DHqwjt4u.js";import"./IconCaretDown-Dz1LMzT8.js";import"./IconCaretDown16-BDdqNkBz.js";import"./IconTrashBin16-D8J8LqCP.js";import"./IconTrashBin24-Cruny8WG.js";import"./useButton---q5tw8Z.js";import"./Flex-CfLzPj-l.js";import"./IconIcon16-UD1lNdTz.js";import"./IconIcon24-BxjJ7b1r.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
