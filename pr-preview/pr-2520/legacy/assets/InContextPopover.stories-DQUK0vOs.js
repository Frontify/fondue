import{r as s,j as t}from"./iframe-CBJ5ztsK.js";import{a as l}from"./Box-Bh6ThcZy.js";import{B as d}from"./Button-BMTyX_e_.js";import{D as u}from"./DialogBody-D5fiYfts.js";import{D as g}from"./DialogFooter-CvMdkvh0.js";import{D as f}from"./DialogHeader-BhqP8o0s.js";import{P as m}from"./Popover-CzrSo2YB.js";import{I as x}from"./IconIcon-BHNaSsMI.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-lgY3GPO7.js";import"./Divider-Cui6-_Ra.js";import"./FormControl-Dpx8v9Cj.js";import"./InputLabel-0rM_MR5L.js";import"./TooltipIcon-B-212LzA.js";import"./LegacyTooltip-DKPmvhNJ.js";import"./useLink-CaI450mV.js";import"./useFocusable-BE4sOyXz.js";import"./useFocusRing-Dg89quMv.js";import"./useEffectEvent-C4VuJr28.js";import"./chain-DXUZSHB9.js";import"./index-h9EfoaBT.js";import"./usePopper-CeyjVoTo.js";import"./index-BzAcjsfZ.js";import"./Portal-CbxahJni.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-eDPyWVeE.js";import"./IconCheckMark-oRXDFbLd.js";import"./IconExclamationMarkCircle24-DmEPzD4-.js";import"./IconExclamationMarkTriangle-kA2194-Q.js";import"./IconExclamationMarkTriangle24-BzI6aw6q.js";import"./IconQuestionMarkCircle-CxVfGSkI.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B3SOFN0a.js";import"./Switch-ChjaNf4D.js";import"./TabItem-JN1ovhQ1.js";import"./elements-BOYmskOL.js";import"./TextInput-Bwhpksv8.js";import"./IconCross-BY91ufHW.js";import"./Tooltip-2Ot3RY3u.js";import"./useClickOutside-IL8Io-4l.js";import"./EnablePortalWrapper-C7H8sdu5.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CPQXBoTT.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-D5eeVTHe.js";import"./Flex-KMxYPCin.js";import"./IconIcon16-B3v_nVnc.js";import"./IconIcon24-BBtw_nYB.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
