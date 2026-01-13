import{r as s,j as e}from"./iframe-CiwACjsc.js";import{a as l}from"./Box-Dp7Q6bhQ.js";import{B as d}from"./Button-CjIneEiB.js";import{D as u}from"./DialogBody-DDM7skyb.js";import{D as g}from"./DialogFooter-Dr1cMzMf.js";import{D as f}from"./DialogHeader-BkCa0jZn.js";import{P as m}from"./Popover-Cc_evGAi.js";import{I as x}from"./IconIcon-DJNVeTRC.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CqZp0YBX.js";import"./LoadingCircle-Ba4wKdIB.js";import"./TabItem-DHaJBlEw.js";import"./elements-BOYmskOL.js";import"./TextInput-DnVh3KN0.js";import"./useFocusRing-CZtrS9NI.js";import"./useEffectEvent-HHgJO59M.js";import"./IconCheckMark-BnRnhIos.js";import"./IconSize-BcCrF_mi.js";import"./IconCross-S71LHmur.js";import"./IconExclamationMarkTriangle-l6D6erCL.js";import"./IconExclamationMarkTriangle24-B-7f8jU_.js";import"./useMemoizedId-Q2Jad74z.js";import"./validation-C9S5KgfE.js";import"./LegacyTooltip-BD7-6yIc.js";import"./useLink-BjVU2b7g.js";import"./useFocusable-CdD2RH-C.js";import"./chain-DsjYALZ0.js";import"./index-DXMRjXjX.js";import"./usePopper-Bpxh3YGr.js";import"./index-C5iC6E4o.js";import"./Portal-BK4Sz22d.js";import"./IconExclamationMarkCircle24-CTQNwKTd.js";import"./Tooltip-UY50aFdL.js";import"./useClickOutside-BfZwb7Cd.js";import"./EnablePortalWrapper-CgFhD3Y5.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DiHLrcTa.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-D584SNKT.js";import"./Flex-B7edjUZX.js";import"./IconIcon16-jK1bb7ei.js";import"./IconIcon24-yyDq--Wn.js";const me={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(d,{icon:e.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),e.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:e.jsxs(l,{className:"tw-w-[400px]",children:[e.jsx(f,{title:"Title",padding:"compact"}),e.jsx(u,{padding:"compact",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),e.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},t=h.bind({});t.args={};var a,n,p;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(p=(n=t.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const ce=["WithHeaderAndFooter"];export{t as WithHeaderAndFooter,ce as __namedExportsOrder,me as default};
