import{r as s,j as t}from"./iframe-Che98FUe.js";import{a as l}from"./Box-Cyx5RVDd.js";import{B as d}from"./Button-CX7CQL5a.js";import{D as u}from"./DialogBody-BCI3kQi0.js";import{D as g}from"./DialogFooter-BQ00rOzr.js";import{D as f}from"./DialogHeader-Du7Mmm4Z.js";import{P as m}from"./Popover-zVORdtsF.js";import{I as x}from"./IconIcon-TSggML9x.js";import"./preload-helper-C4wRLVzE.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-xAj0MEUS.js";import"./Divider-FaJ881oB.js";import"./FormControl-CQY9nKx_.js";import"./InputLabel-BufYhgtb.js";import"./TooltipIcon-e8kL-j65.js";import"./LegacyTooltip-BTVVOQ0w.js";import"./useLink-ClcV0H9S.js";import"./useFocusable-CBM6mnTT.js";import"./useFocusRing-D0KpoR3D.js";import"./useEffectEvent-D8b27xVP.js";import"./chain-CoRUFD0R.js";import"./index-IZeI0urS.js";import"./usePopper-BeqWXd5G.js";import"./index-DtGdBXbS.js";import"./Portal-BckaESKW.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D7wmRXjw.js";import"./IconCheckMark-Zg_N7ZBM.js";import"./IconExclamationMarkCircle24-DhFV4y2S.js";import"./IconExclamationMarkTriangle-C42ffrQg.js";import"./IconExclamationMarkTriangle24-DXvMWJJb.js";import"./IconQuestionMarkCircle-C53be1uH.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Btnp_mRI.js";import"./Switch-C6G9sI06.js";import"./TabItem-B5z6kI7d.js";import"./elements-BOYmskOL.js";import"./TextInput-DesJJAk7.js";import"./IconCross-DUL5sW7o.js";import"./Tooltip-D-igP7X0.js";import"./useClickOutside-BNNzJneE.js";import"./EnablePortalWrapper-kmm11RF-.js";import"./dialog-D9O7a7Fm.js";import"./Tree-X1Im5iyw.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-B2KH-0yg.js";import"./Flex-CAY42WID.js";import"./IconIcon16-Iu1kq3Tn.js";import"./IconIcon24-C2zSAw_c.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
