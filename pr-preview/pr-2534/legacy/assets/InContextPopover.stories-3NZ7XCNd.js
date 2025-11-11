import{r as p,j as t}from"./iframe-Dop3IDiS.js";import{a as l}from"./Box-T4pmJ4KH.js";import{B as d}from"./Button-DBFFngUD.js";import{D as u}from"./DialogBody-BQyTzLt4.js";import{D as g}from"./DialogFooter-B4ddaPin.js";import{D as f}from"./DialogHeader-Bu3Qol5p.js";import{P as n}from"./Popover-BBFGq0e5.js";import{I as x}from"./IconIcon-DUaB1bdt.js";import"./preload-helper-CzFIvh1I.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CgoVI71q.js";import"./Divider-B4MHY3rQ.js";import"./Dropdown-eZjtnnjy.js";import"./useButton-BkX0UrSk.js";import"./useFocusable-ost1gxwP.js";import"./useFocusRing-u7jjRRvk.js";import"./useEffectEvent-C5lQF6xi.js";import"./chain-s-vxePMy.js";import"./index-DYLYfGFR.js";import"./FocusScope-BH5f1-TV.js";import"./useOverlayTriggerState-D5AsxkAE.js";import"./useControlledState-uMLg98wm.js";import"./useMenuTrigger-BpW2lNjN.js";import"./useLabels-BgQM7QFU.js";import"./useLocalizedStringFormatter-xLeRq2LB.js";import"./context-DERHc0he.js";import"./VisuallyHidden-Cei7HWYu.js";import"./helper-JND9wNMV.js";import"./keyboard-DMTlnSnK.js";import"./SelectionManager-Cn74Dtdj.js";import"./useField-oqj2rvon.js";import"./useFormValidationState-Cin_oTyS.js";import"./usePopper-BD0mTu8l.js";import"./index-CXPmKk8W.js";import"./MenuItem-s-obpngf.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-D2Rtr0KV.js";import"./IconCheckMark-Dhl-b2SF.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B3Zg05Fy.js";import"./Trigger-CA-Hq4qa.js";import"./IconCaretDown-Dvk9pgzM.js";import"./IconCaretDown16-3Y1aj8fs.js";import"./IconCross-Cz7N8XdK.js";import"./IconExclamationMarkTriangle-DZFMnctp.js";import"./IconExclamationMarkTriangle24-X1JrCahO.js";import"./IconTrashBin16-C164mae4.js";import"./IconTrashBin24-CnFwDSEk.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DLUUtCUV.js";import"./Portal-BhsN2SWV.js";import"./useMemoizedId-CK82Czxw.js";import"./FormControl-ATQXj-oa.js";import"./InputLabel-CPQH0GLI.js";import"./TooltipIcon-DzDbmsKM.js";import"./LegacyTooltip-D3fSEQnN.js";import"./useLink-CisGfgTX.js";import"./IconExclamationMarkCircle24-D-HK2Dcv.js";import"./IconQuestionMarkCircle-CQv2x_S2.js";import"./Switch-CneOamPf.js";import"./TabItem-DC0rUs02.js";import"./TextInput-DKt6IUeX.js";import"./Tooltip-Bm5tt8SV.js";import"./useClickOutside-BporPNZz.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BT1220bP.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-uawSvIGw.js";import"./IconIcon16-nbFgdsuz.js";import"./IconIcon24-Cxj7Z8Fv.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Lt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Lt as __namedExportsOrder,Nt as default};
