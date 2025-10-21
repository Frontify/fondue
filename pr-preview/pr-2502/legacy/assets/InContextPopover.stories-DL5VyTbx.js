import{r as p,j as t}from"./iframe-CfLhI7P0.js";import{a as l}from"./Box-C_ryCKA4.js";import{B as d}from"./Button-BoqHsuHZ.js";import{D as u}from"./DialogBody-DBiixJTQ.js";import{D as g}from"./DialogFooter-C6zY9OLq.js";import{D as f}from"./DialogHeader-CZAVPYED.js";import{P as n}from"./Popover-PDH05BQd.js";import{I as x}from"./IconJohanna-BRQtt3J1.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BglkpoJb.js";import"./Divider-Ks3wbiQC.js";import"./Dropdown-CVUPTM-k.js";import"./useButton-CafHKOqV.js";import"./useFocusable-DqnO4tDK.js";import"./useFocusRing-c6u9Vcjk.js";import"./useEffectEvent-DgjNhOdj.js";import"./chain-C2bpwpa8.js";import"./index-CNTxu6fp.js";import"./FocusScope-Ci5ycIsU.js";import"./useOverlayTriggerState-CFYEaNmX.js";import"./useControlledState-CikZhwQf.js";import"./useMenuTrigger-Ddxx7kXJ.js";import"./useLabels-C5VNH8gT.js";import"./useLocalizedStringFormatter-BY0SNe9w.js";import"./context-CFy5Jnbr.js";import"./VisuallyHidden-BrtBoVFd.js";import"./helper-D-lWvwnP.js";import"./keyboard-BcVSFiEu.js";import"./SelectionManager-B5h8l_Gt.js";import"./useField-pWbNefD1.js";import"./useFormValidationState-Dii868hQ.js";import"./usePopper-BDJCEm0e.js";import"./index-BXHlWwjT.js";import"./MenuItem-CDWDwpry.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BbFToOJp.js";import"./IconCheckMark-Bvx1Okuv.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DTujLDLf.js";import"./Trigger-P2NWPnIL.js";import"./IconCaretDown-ip8hOLG9.js";import"./IconCaretDown16-0kUT5ueY.js";import"./IconCross-VvQFK0HB.js";import"./IconExclamationMarkTriangle-DumzWRNf.js";import"./IconExclamationMarkTriangle24-BQCI9tlF.js";import"./IconTrashBin16-Vihvm3Ba.js";import"./IconTrashBin24-Do203-AB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BAwlIUsk.js";import"./Portal-Bzui0qVf.js";import"./useMemoizedId-DO6EWKyA.js";import"./FormControl-2ECwXhan.js";import"./InputLabel-x_7jnmE7.js";import"./TooltipIcon-Dzp2Dow-.js";import"./LegacyTooltip-69ja691T.js";import"./useLink-tlq5fiSd.js";import"./IconExclamationMarkCircle24-BD4txlzy.js";import"./IconQuestionMarkCircle-CWL1qffP.js";import"./Switch-D28II4BQ.js";import"./TabItem-CchQBcbM.js";import"./TextInput-CSebAqb7.js";import"./Tooltip-BcZ9yLZa.js";import"./useClickOutside-eWoCMSRP.js";import"./dialog-D9O7a7Fm.js";import"./Tree-6av9Ag9R.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-bLMZZ02K.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const kt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,kt as __namedExportsOrder,Ft as default};
