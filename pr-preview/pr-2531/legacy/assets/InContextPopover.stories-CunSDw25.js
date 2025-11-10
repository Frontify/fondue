import{r as s,j as t}from"./iframe-B8HjM2bH.js";import{a as l}from"./Box-bVNTwxZW.js";import{B as d}from"./Button-Cxlg_Jlu.js";import{D as u}from"./DialogBody-DkjzXw6O.js";import{D as g}from"./DialogFooter-B3UkxZmU.js";import{D as f}from"./DialogHeader-D4uxTZZo.js";import{P as n}from"./Popover-B-ViZGv7.js";import{I as x}from"./IconIcon-C75v_BL9.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Bv0LnrNd.js";import"./Divider-CScJkmxy.js";import"./FormControl-CdhDe2yr.js";import"./InputLabel-BY8Y4V_H.js";import"./TooltipIcon-BcHMbg4P.js";import"./LegacyTooltip-D1gEUfx1.js";import"./useLink-By4Pag_x.js";import"./useFocusable-CZmCl03Y.js";import"./useFocusRing-3Gw7Pb6L.js";import"./useEffectEvent-DldudAt0.js";import"./chain-DcfYi800.js";import"./index-DQu1qdiw.js";import"./usePopper-aUIx4INC.js";import"./index-e4lb8Yn9.js";import"./Portal-CydnS4Q0.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C7w6N4e1.js";import"./IconCheckMark-D2gcRUJK.js";import"./IconExclamationMarkCircle24-BZjJkaig.js";import"./IconExclamationMarkTriangle-0oh_v4Q_.js";import"./IconExclamationMarkTriangle24-Cug0QU8I.js";import"./IconQuestionMarkCircle-M_tmPE3y.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CsRn3Dui.js";import"./Switch-Dgyq-URC.js";import"./TabItem-_0QyVAb0.js";import"./elements-BOYmskOL.js";import"./TextInput-6wrBtR06.js";import"./IconCross-DNgwupST.js";import"./Tooltip-DzWMZmIs.js";import"./useClickOutside-DEQ-8D9O.js";import"./EnablePortalWrapper-mRPgidZV.js";import"./dialog-D9O7a7Fm.js";import"./Tree-dBPfT1V8.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-qLWd3HsL.js";import"./IconCaretDown-jnmRmvBC.js";import"./IconCaretDown16-DooVhUZz.js";import"./IconTrashBin16-D23_ZH0V.js";import"./IconTrashBin24-DkqIbv5B.js";import"./useButton-B3xO9RgR.js";import"./Flex-Djn0ZkXj.js";import"./IconIcon16-D-eksitz.js";import"./IconIcon24-jFG1Wa73.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
