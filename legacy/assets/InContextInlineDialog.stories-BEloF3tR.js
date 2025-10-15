import{r as c,j as t}from"./iframe-C5kgyqgm.js";import{a as k}from"./Box-1a6ixdwV.js";import{B as i,b as n,a}from"./Button-BDbLV5Rr.js";import{D as I}from"./DialogBody-TOaIZ8Uj.js";import{D as O}from"./DialogFooter-BdMyd1qJ.js";import{D as E}from"./DialogHeader-B-WAduU6.js";import{D as b}from"./Divider-DyB_gL0k.js";import{D as T}from"./Dropdown-B__-g4fN.js";import{F as y}from"./Flex-p9EEaRjo.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-EGUK8GSb.js";import{I as d}from"./InlineDialog-CAgtl2MN.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cq3eqICY.js";import"./Checkbox-BIDcMQG6.js";import"./useFocusable-Ceb7Je-e.js";import"./useFocusRing-cjJ4V1tO.js";import"./useEffectEvent-BBQGPd_M.js";import"./chain-CCiNAOP-.js";import"./index-2KbGipOq.js";import"./useFormValidationState-OtNK8O4n.js";import"./useControlledState-C5Nbv06b.js";import"./InputLabel-Dk1dNGCp.js";import"./TooltipIcon-DnNJk431.js";import"./LegacyTooltip-kdidwXGR.js";import"./useLink-y0X30T0O.js";import"./usePopper-CuiR7VCC.js";import"./index-Cp1gGYWC.js";import"./Portal-GwTjoSVN.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DS2WT1er.js";import"./IconCheckMark-DzG8aki9.js";import"./IconExclamationMarkCircle24-Wq4nzIzR.js";import"./IconExclamationMarkTriangle-D4zOyiMZ.js";import"./IconExclamationMarkTriangle24-BmoIfTD5.js";import"./IconQuestionMarkCircle-Bm1-LFoH.js";import"./IconMinus-CWQAyzXk.js";import"./FormControl-B_A1qvx2.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BWjfZ81p.js";import"./Switch-CXVar6Mo.js";import"./TabItem-DpygmHk_.js";import"./elements-BOYmskOL.js";import"./TextInput-CVlLNH_J.js";import"./IconCross-xebiYYLi.js";import"./Tooltip-CTIHCn7L.js";import"./useClickOutside-B4v_gZoL.js";import"./EnablePortalWrapper-B3Tmz2tf.js";import"./Tree-CBwj0P3O.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-bdege3iH.js";import"./FocusScope-DnifsCpw.js";import"./useOverlayTriggerState-Dmay-ah8.js";import"./useMenuTrigger-PURgbD3W.js";import"./useLabels-Sy5siVuq.js";import"./useLocalizedStringFormatter-CIIgPZaI.js";import"./context-9PFUuPAk.js";import"./VisuallyHidden-D6kPaE7a.js";import"./helper-CzTXBeFX.js";import"./keyboard-pcGdmA1Z.js";import"./SelectionManager-BCeyc9LH.js";import"./useField-gTKTBKVP.js";import"./MenuItem-CWNpCQHO.js";import"./IconCaretRight-BflXjcvW.js";import"./Trigger-BTuhCEvg.js";import"./IconCaretDown-C2TwSLCo.js";import"./IconCaretDown16-D07jPf-n.js";import"./IconTrashBin16-C8nFu7dx.js";import"./IconTrashBin24-_A_I7ULc.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
