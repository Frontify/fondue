import{r as s,j as t}from"./iframe-Cu7WuWmt.js";import{a as l}from"./Box-FtsCQmyG.js";import{B as d}from"./Button-iqyAJLb9.js";import{D as u}from"./DialogBody-BzsjTOO1.js";import{D as g}from"./DialogFooter-C3mvGVhJ.js";import{D as f}from"./DialogHeader-DZv3v6GI.js";import{P as n}from"./Popover-muo5Zkqo.js";import{I as x}from"./IconIcon-BLEdCS9y.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C7JSNy5X.js";import"./Divider-DXUWumt0.js";import"./FormControl-GrN_fxmf.js";import"./InputLabel-BxT6vyyG.js";import"./TooltipIcon-CrevF7Ie.js";import"./LegacyTooltip-CP9ttZ3h.js";import"./useLink-DDzjwbY0.js";import"./useFocusable-Dx3aTy-6.js";import"./useFocusRing-By5YZPuN.js";import"./useEffectEvent-D61kxaXb.js";import"./chain-DzPdYz3A.js";import"./index-CWak45N9.js";import"./usePopper-CZ7pUJoz.js";import"./index-Cx3HzQ1K.js";import"./Portal-BQEszYo9.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-5bIc_pH3.js";import"./IconCheckMark-6i_Ww4Aa.js";import"./IconExclamationMarkCircle24-DPWEIETt.js";import"./IconExclamationMarkTriangle-stB7IQOj.js";import"./IconExclamationMarkTriangle24-Dh72OkiN.js";import"./IconQuestionMarkCircle-B7PdEY9c.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B5YFgW2W.js";import"./Switch-BpmVGn4w.js";import"./TabItem-Dwf1rnzq.js";import"./elements-BOYmskOL.js";import"./TextInput-C3a9epXA.js";import"./IconCross-DDYOrz4a.js";import"./Tooltip-FPjeIVTr.js";import"./useClickOutside-DeGB-ORf.js";import"./EnablePortalWrapper-DhbwTJ6L.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D7Q-z4L2.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BarhUeFG.js";import"./IconCaretDown-BEvA4OcA.js";import"./IconCaretDown16-BpQbqlUF.js";import"./IconTrashBin16-DOh5s1Me.js";import"./IconTrashBin24-ygXzWHBB.js";import"./useButton-DRD0Om0b.js";import"./Flex-CMT2aaCQ.js";import"./IconIcon16-B5cdSmdP.js";import"./IconIcon24-AUfcC-O1.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
