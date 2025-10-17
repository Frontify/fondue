import{r as c,j as t}from"./iframe-D_5TuNwx.js";import{a as k}from"./Box-BDyNV5gP.js";import{B as i,b as n,a}from"./Button-BjKHn-lP.js";import{D as I}from"./DialogBody-p2jbPXUW.js";import{D as O}from"./DialogFooter-BiTz67iJ.js";import{D as E}from"./DialogHeader-CeaeYwbC.js";import{D as b}from"./Divider-ei9MuWEW.js";import{D as T}from"./Dropdown-B7AxYWqP.js";import{F as y}from"./Flex-DxBz21DL.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-DfPEXDCs.js";import{I as d}from"./InlineDialog-hnoO2yAM.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cr0Z0-t3.js";import"./Checkbox-BCo6gkSf.js";import"./useFocusable-BzNiBfTe.js";import"./useFocusRing-B3KMbizV.js";import"./useEffectEvent-GoHBr7KM.js";import"./chain-CV2foVe6.js";import"./index-dO3rbIOf.js";import"./useFormValidationState-DY0p0iBe.js";import"./useControlledState-Sq5oX11m.js";import"./InputLabel-BIeISPQ6.js";import"./TooltipIcon-BgwyEQOM.js";import"./LegacyTooltip-BD5siulQ.js";import"./useLink-B-AN_u2l.js";import"./usePopper-DuQU1gy7.js";import"./index-DNWoq7AN.js";import"./Portal-BVeSg7mV.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CYiKP5GT.js";import"./IconCheckMark-hk6yku9m.js";import"./IconExclamationMarkCircle24-w9gKnvCo.js";import"./IconExclamationMarkTriangle-dqjw2tRY.js";import"./IconExclamationMarkTriangle24-BOj0eFqi.js";import"./IconQuestionMarkCircle-DaQpsxq0.js";import"./IconMinus-DwgkD6am.js";import"./FormControl-C0rPqxsR.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BqbImI04.js";import"./Switch-BaImXfie.js";import"./TabItem-0-4KzH_Y.js";import"./elements-BOYmskOL.js";import"./TextInput-TlmumXUy.js";import"./IconCross-BckwQdjd.js";import"./Tooltip-DBOvIGAy.js";import"./useClickOutside-B-M5EXJ-.js";import"./EnablePortalWrapper-koaqxQrZ.js";import"./Tree-BjEaHnef.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DcDZTOn2.js";import"./FocusScope-BSq_fjdC.js";import"./useOverlayTriggerState-DguovNuv.js";import"./useMenuTrigger-DxAqJle0.js";import"./useLabels-Aygkof98.js";import"./useLocalizedStringFormatter-Bh67eRqg.js";import"./context-Cl6QxAFA.js";import"./VisuallyHidden-C1dlTP_A.js";import"./helper-a1AM3cjG.js";import"./keyboard-BhxEkJXA.js";import"./SelectionManager-BEWxKx1d.js";import"./useField-DPq9TfXZ.js";import"./MenuItem-DLavnL_P.js";import"./IconCaretRight-C9ywhD4f.js";import"./Trigger-Dv_fKy-j.js";import"./IconCaretDown-CSPuPiJU.js";import"./IconCaretDown16-B0_VE3Tl.js";import"./IconTrashBin16-DD5bMYOn.js";import"./IconTrashBin24-BmlK7b1q.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
