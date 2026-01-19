import{r as s,j as t}from"./iframe-CcylRKQH.js";import{a as l}from"./Box-DxL3Gz8V.js";import{B as d}from"./Button-Cmvo9KzN.js";import{D as u}from"./DialogBody-W7Kh4by9.js";import{D as g}from"./DialogFooter-IltkGnrj.js";import{D as f}from"./DialogHeader-CzxWSpdF.js";import{P as m}from"./Popover-DezoS1d1.js";import{I as x}from"./IconIcon-BTBpDujJ.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DxfRKPKD.js";import"./Divider-eIic01My.js";import"./FormControl-X60Y5i8w.js";import"./InputLabel-Dh7DAHfT.js";import"./TooltipIcon-Biikeypf.js";import"./LegacyTooltip-CiXFhR7c.js";import"./useLink-B32ezdH_.js";import"./useFocusable-DIfJM1zF.js";import"./useFocusRing-BGhUgRgi.js";import"./useEffectEvent-BcSr7ofR.js";import"./chain-xmUZKcgb.js";import"./index-CUPmB95o.js";import"./usePopper-C8rHmjmF.js";import"./index-6mGGifEw.js";import"./Portal-DfmkrqCg.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Clpl3lDs.js";import"./IconCheckMark-dBef9G0g.js";import"./IconExclamationMarkCircle24-4itJlXvH.js";import"./IconExclamationMarkTriangle-LqOdmrNf.js";import"./IconExclamationMarkTriangle24-B559YPiq.js";import"./IconQuestionMarkCircle-DHet8HVh.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B_VwBpTh.js";import"./Switch-CeO1SDPG.js";import"./TabItem-Dwbaolvo.js";import"./elements-BOYmskOL.js";import"./TextInput-D5rXxSJx.js";import"./IconCross-ucPYd45Y.js";import"./Tooltip-DHh07HSc.js";import"./useClickOutside-Cc4KLPFR.js";import"./EnablePortalWrapper-B_nin7Wv.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BmkA6ZgH.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-5-lYtHO3.js";import"./Flex-CD1lQqFQ.js";import"./IconIcon16-CZqT2oUD.js";import"./IconIcon24-Bwe6zh1D.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
