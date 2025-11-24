import{r as c,j as t}from"./iframe-CI4Kawm5.js";import{a as k}from"./Box-Cx50b-Ce.js";import{B as i,b as n,a}from"./Button-CC2xgBz8.js";import{D as I}from"./DialogBody-Dda5lqvc.js";import{D as O}from"./DialogFooter-BznxTllo.js";import{D as E}from"./DialogHeader-CpZ4bJFX.js";import{D as b}from"./Divider-Cez8lt_3.js";import{D as T}from"./Dropdown-Dn5O6z8B.js";import{F as y}from"./Flex-CsBb-GJS.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-onIqOvse.js";import{I as d}from"./InlineDialog-DpNQWbRx.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-yOERg7rY.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DCT2qH2I.js";import"./Checkbox-DXLFTzy2.js";import"./useFocusable-DkBkn9iT.js";import"./useFocusRing-CyQhVCri.js";import"./useEffectEvent-Cfpi8PP8.js";import"./chain-D7U0_On1.js";import"./index-zpwVSNjA.js";import"./useFormValidationState-BhtDhUXV.js";import"./useControlledState-CUmOUvGM.js";import"./InputLabel-CKTuZCMG.js";import"./TooltipIcon-BbIRjZyI.js";import"./LegacyTooltip-Dou_-Yzh.js";import"./useLink--dmh_mM5.js";import"./usePopper-BppasZrv.js";import"./index-C-x7Nr5k.js";import"./Portal-Bx0n0vOk.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BhGmyCqr.js";import"./IconCheckMark-DZdXXIdU.js";import"./IconExclamationMarkCircle24-B1fijdn3.js";import"./IconExclamationMarkTriangle-tJv2AngU.js";import"./IconExclamationMarkTriangle24-BZgyqp3m.js";import"./IconQuestionMarkCircle-CKHNeUmL.js";import"./IconMinus-BWmFQkW3.js";import"./FormControl-CCavmj5m.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CsOnGPDG.js";import"./Switch-BoyC4ozW.js";import"./TabItem-CnOdriQC.js";import"./elements-BOYmskOL.js";import"./TextInput-Bfa7-qoa.js";import"./IconCross-76Znu6aF.js";import"./Tooltip-giYO8ALz.js";import"./useClickOutside-Bl5b8N1C.js";import"./EnablePortalWrapper-B_5uTan4.js";import"./Tree-DkbN3ZYU.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-0gYD7YN5.js";import"./FocusScope-ByQmgUGi.js";import"./useOverlayTriggerState-CuRGbzrC.js";import"./useMenuTrigger-Ba-vCypd.js";import"./useLabels-BLu2GpWY.js";import"./useLocalizedStringFormatter-DTcyR273.js";import"./context-DRsENONo.js";import"./VisuallyHidden-BzG3-guJ.js";import"./helper-UXVdJlZD.js";import"./keyboard-A2dbdaV9.js";import"./SelectionManager-CAIb_BjF.js";import"./useField-ChghdcoT.js";import"./MenuItem-orWixOA1.js";import"./IconCaretRight-D9SZftwL.js";import"./Trigger-BfL-KuA7.js";import"./IconCaretDown-DsTZ1evh.js";import"./IconCaretDown16-m2MF0MyA.js";import"./IconTrashBin16-DnrHMXn8.js";import"./IconTrashBin24-CdJsjX3v.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Flex justify="start">
            <Button onClick={action('onClick')} style={ButtonStyle.Default}>
                Button
            </Button>
            <Button onClick={action('onClick')} style={ButtonStyle.Danger}>
                Button
            </Button>
            <Button ref={triggerRef} emphasis={ButtonEmphasis.Default} icon={<IconDotsVertical16 />} onClick={() => setIsOpen(!isOpen)}>
                InlineDialog Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody>
                    <Box className="tw-p-4">
                        <TextExample />
                    </Box>
                </DialogBody>
            </InlineDialog>
            <Button onClick={action('onClick')} style={ButtonStyle.Loud}>
                Button
            </Button>
        </Flex>;
}`,...(h=(f=m.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var B,C,D;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div>
            <Flex justify="end">
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default}>
                    Button
                </Button>
                <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                    InlineDialog Trigger
                </Button>
                <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                    <DialogHeader title="Collaborator Settings" padding="compact" onClose={() => setIsOpen(false)} />
                    <DialogBody>
                        <div className="tw-p-2 tw-text-text">
                            <Dropdown enablePortal={false} onChange={id => console.log(id)} activeItemId={'1'} menuBlocks={[{
              id: 'block1',
              menuItems: [{
                id: '1',
                title: 'Item 1'
              }, {
                id: '2',
                title: 'Item 2'
              }, {
                id: '3',
                title: 'Item 3'
              }, {
                id: '4',
                title: 'Item 4'
              }, {
                id: '5',
                title: 'Item 5'
              }]
            }]} />
                            <p className="tw-flex tw-items-center tw-my-2">Label 2</p>

                            <TextExample />
                            <TextExample />
                        </div>
                    </DialogBody>
                    <DialogFooter actionButtons={[{
          children: 'Cancel',
          emphasis: ButtonEmphasis.Default,
          onClick: () => setIsOpen(false)
        }, {
          children: 'Confirm',
          onClick: () => setIsOpen(false)
        }]}></DialogFooter>
                </InlineDialog>
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Strong} style={ButtonStyle.Loud}>
                    Button
                </Button>
            </Flex>
            <Divider />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <Button emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default} onClick={action('onClick')}>
                Button
            </Button>
        </div>;
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const $t=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,$t as __namedExportsOrder,Zt as default};
