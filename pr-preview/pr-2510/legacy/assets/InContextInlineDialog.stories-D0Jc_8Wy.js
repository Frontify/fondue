import{r as c,j as t}from"./iframe-n26UMXeS.js";import{a as k}from"./Box-CdWvo43I.js";import{B as i,b as n,a}from"./Button-RK0fJt2c.js";import{D as I}from"./DialogBody-B8pccZr1.js";import{D as O}from"./DialogFooter-D69lB1dK.js";import{D as E}from"./DialogHeader-B66gzQNw.js";import{D as b}from"./Divider-Ckbmz0M0.js";import{D as T}from"./Dropdown-C_BrfEr1.js";import{F as y}from"./Flex-sPhSZ21_.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-DH3u4wni.js";import{I as d}from"./InlineDialog-dIYzdco-.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-qBSLZfTS.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D40wT2pM.js";import"./Checkbox-DgsPUbUS.js";import"./useFocusable-CWl1t0Px.js";import"./useFocusRing-Dvm4_RjC.js";import"./useEffectEvent-BKR4RLzl.js";import"./chain-DHo8oKbw.js";import"./index-B6EMusBQ.js";import"./useFormValidationState-UAnenpkk.js";import"./useControlledState-Du5HGgPR.js";import"./InputLabel-BS6vm496.js";import"./TooltipIcon-7gRO3xpH.js";import"./LegacyTooltip-B-tp1j-L.js";import"./useLink-DHkrUdNL.js";import"./usePopper-8GJMFvmR.js";import"./index-Ciia9_eN.js";import"./Portal-DP4PWg_F.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DnQ55Zbt.js";import"./IconCheckMark-C9N2YhL0.js";import"./IconExclamationMarkCircle24-C0dnCopv.js";import"./IconExclamationMarkTriangle-kgpzAyyM.js";import"./IconExclamationMarkTriangle24-BN0lOkUr.js";import"./IconQuestionMarkCircle-kllRKVHJ.js";import"./IconMinus-rsdKZ6mT.js";import"./FormControl-NisUf2Hi.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DvvoBJ3B.js";import"./Switch-5ZwYZc90.js";import"./TabItem-D3g2R93v.js";import"./elements-BOYmskOL.js";import"./TextInput-DBepdhBg.js";import"./IconCross-ORFPx4BQ.js";import"./Tooltip-Ca2P6eKM.js";import"./useClickOutside-CjWbNyju.js";import"./EnablePortalWrapper-PUTSjtV1.js";import"./Tree-CivgNCAA.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-gFYOqrhj.js";import"./FocusScope-C8Zpguh7.js";import"./useOverlayTriggerState-1nRvvjHV.js";import"./useMenuTrigger-C5MWsixQ.js";import"./useLabels-CgjEQM3v.js";import"./useLocalizedStringFormatter-DSxe_DtD.js";import"./context-B86w2jMQ.js";import"./VisuallyHidden-D2sE3s5e.js";import"./helper-BXkLw819.js";import"./keyboard-rkNmKttm.js";import"./SelectionManager-DJu1uagb.js";import"./useField-0_eqc5fb.js";import"./MenuItem-CBqSMKaJ.js";import"./IconCaretRight-mt3-aM0r.js";import"./Trigger-V8qnOHf7.js";import"./IconCaretDown-DzJI7I0k.js";import"./IconCaretDown16-Caxt19fQ.js";import"./IconTrashBin16-BPI3V-e4.js";import"./IconTrashBin24-D-7w7tG2.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
