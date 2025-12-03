import{r as s,j as t}from"./iframe-Bc-0m40g.js";import{a as l}from"./Box-BC7f7yDg.js";import{B as d}from"./Button-0Lc8yrOz.js";import{D as u}from"./DialogBody-Dld9aPJm.js";import{D as g}from"./DialogFooter-BHdr1vWf.js";import{D as f}from"./DialogHeader-D4somWHj.js";import{P as n}from"./Popover-C2cY8r8T.js";import{I as x}from"./IconIcon-DhvHcbgC.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B3VZ7Rq7.js";import"./Divider-C8NNHF9m.js";import"./FormControl-yndCSK4f.js";import"./InputLabel-DqA6cmfW.js";import"./TooltipIcon-ByM_dO20.js";import"./LegacyTooltip-Cr6rxS0g.js";import"./useLink-C81JbUT1.js";import"./useFocusable-DKEjpfV8.js";import"./useFocusRing-mXNrc4Vo.js";import"./useEffectEvent-CRNIM4-p.js";import"./chain-ktRrW4jm.js";import"./index-DG7sG-fA.js";import"./usePopper-DheOg4-1.js";import"./index-DrE0jYhD.js";import"./Portal-CRH4LxLX.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CocKipVj.js";import"./IconCheckMark-kpeWHNNt.js";import"./IconExclamationMarkCircle24-CBgKnXpx.js";import"./IconExclamationMarkTriangle-C8obBTCZ.js";import"./IconExclamationMarkTriangle24-CHQeZCaQ.js";import"./IconQuestionMarkCircle-CspliPOa.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B67CcELu.js";import"./Switch-DZKwesw6.js";import"./TabItem-uAN6v55f.js";import"./elements-BOYmskOL.js";import"./TextInput-C8zS8WB7.js";import"./IconCross-DAh3-6yo.js";import"./Tooltip-D65DgYPV.js";import"./useClickOutside-Dj6mOh2i.js";import"./EnablePortalWrapper-D9n8VH5a.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D2CWTejl.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B_jNvcmv.js";import"./IconCaretDown-CaxFsv5M.js";import"./IconCaretDown16-DzyXh8nV.js";import"./IconTrashBin16-DR3D71pr.js";import"./IconTrashBin24-DzVxuYG2.js";import"./useButton-Daacn22Z.js";import"./Flex-CnVCvXWw.js";import"./IconIcon16-LjUHwAuI.js";import"./IconIcon24-K9dZptf_.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
