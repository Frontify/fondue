import{r as s,j as t}from"./iframe-BCQZSf3A.js";import{a as l}from"./Box-C4o2SKk2.js";import{B as d}from"./Button-CRNxqQju.js";import{D as u}from"./DialogBody-D5WKgWtF.js";import{D as g}from"./DialogFooter-DIvTCkG6.js";import{D as f}from"./DialogHeader-12fGQdbj.js";import{P as m}from"./Popover-DtCo28TA.js";import{I as x}from"./IconIcon-BbGdYS7U.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-_Sa8JPgI.js";import"./Divider-2kB4Z88B.js";import"./FormControl-B2bH-8fa.js";import"./InputLabel-CXHfuX56.js";import"./TooltipIcon-RzFAL5zB.js";import"./LegacyTooltip-AXELQjVT.js";import"./useLink-dOXKpaaX.js";import"./useFocusable-MnkiKqez.js";import"./useFocusRing-CxZ2gA4U.js";import"./useEffectEvent-DF0rGqiB.js";import"./chain-CtMe8Cix.js";import"./index-g3Oiu12H.js";import"./usePopper-9PL-6WDH.js";import"./index-CyW3IW-D.js";import"./Portal-BDVIkcnj.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DIPekT6R.js";import"./IconCheckMark-D_9YnfgG.js";import"./IconExclamationMarkCircle24-BS4-q12U.js";import"./IconExclamationMarkTriangle-CO63HDg_.js";import"./IconExclamationMarkTriangle24-C-0qP-zr.js";import"./IconQuestionMarkCircle-DLK5j62t.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BsC1v_xU.js";import"./Switch-CjHOSFCz.js";import"./TabItem-DqDXKpWp.js";import"./elements-BOYmskOL.js";import"./TextInput-Cjy5es5G.js";import"./IconCross-Dod61jaL.js";import"./Tooltip-CaAni49a.js";import"./useClickOutside-3IbGR9iO.js";import"./EnablePortalWrapper-Dx7kqzTV.js";import"./dialog-D9O7a7Fm.js";import"./Tree-7Tc3d1lA.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-Dz1ekfdT.js";import"./Flex-C1gGxxV0.js";import"./IconIcon16-DmZYxg6y.js";import"./IconIcon24-LKnQnMLq.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
