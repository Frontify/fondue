import{r as s,j as t}from"./iframe-BqiVQ53-.js";import{a as l}from"./Box-BY8v2xxj.js";import{B as d}from"./Button-BQgahJ8N.js";import{D as u}from"./DialogBody-BzcDtvva.js";import{D as g}from"./DialogFooter-DEtoY4hm.js";import{D as f}from"./DialogHeader-CPejyrg9.js";import{P as m}from"./Popover-BSkaNwCW.js";import{I as x}from"./IconIcon-B-_B7BLx.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BSEZaRt8.js";import"./Divider-niQqtRCD.js";import"./FormControl-Rl_GR5Mx.js";import"./InputLabel-DCsWug17.js";import"./TooltipIcon-s9Pcs6k-.js";import"./LegacyTooltip-Br8W475S.js";import"./useLink-ijAzX-v5.js";import"./useFocusable-CjMs4P-7.js";import"./useFocusRing-LKtnXM_j.js";import"./useEffectEvent-BLkuP_5N.js";import"./chain-B2ksfpf1.js";import"./index-CzDw9oYw.js";import"./usePopper-B4cRgscr.js";import"./index-Cc6Bsyye.js";import"./Portal-CcQpv_Yq.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DgWHtiJ5.js";import"./IconCheckMark-B2tvJ33E.js";import"./IconExclamationMarkCircle24-dcKCgA-g.js";import"./IconExclamationMarkTriangle-Y8jyJGXF.js";import"./IconExclamationMarkTriangle24-B_jd2lF1.js";import"./IconQuestionMarkCircle-B7SQMKuO.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CE9f9Dfn.js";import"./Switch-RXQxcuZI.js";import"./TabItem-jfTWO_Zh.js";import"./elements-BOYmskOL.js";import"./TextInput-cnEUMGp6.js";import"./IconCross-DDd2ziBH.js";import"./Tooltip-Xd9G48o0.js";import"./useClickOutside-5tSAYI1T.js";import"./EnablePortalWrapper-C_JZRkfm.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C5N5W9ME.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-Cj03urxD.js";import"./Flex-2-rNY6PC.js";import"./IconIcon16-BDoNNZy3.js";import"./IconIcon24-BCCZvMUw.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
