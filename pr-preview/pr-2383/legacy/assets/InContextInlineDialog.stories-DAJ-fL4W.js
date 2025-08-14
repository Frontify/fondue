import{j as t}from"./jsx-runtime-BYYWji4R.js";import{a as n}from"./index-B-lxVbXh.js";import{r as c}from"./index-ClcD9ViR.js";import{a as k}from"./Box-CTXtPZyF.js";import{c as i,b as s,a}from"./Button-BkcxChke.js";import{D as I}from"./DialogBody-CKaSimJT.js";import{D as E}from"./DialogFooter-YJPA4bwV.js";import{D as O}from"./DialogHeader-ZYEhVL16.js";import{D as b}from"./Divider-Drwt0P6l.js";import{c as T}from"./Dropdown-4n3OkMqG.js";import{F as y}from"./Flex-YQGN0ZLq.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-DQBdBlx4.js";import{I as d}from"./InlineDialog-7uyYizYF.js";import{M as x}from"./dialog-Dre1eVQK.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-BtNTXUM4.js";import"./input-DGrQoOuq.js";import"./FormControl-BkRGxkdF.js";import"./InputLabel-BBoeJyMH.js";import"./TooltipIcon-CBNLwOmC.js";import"./LegacyTooltip-DwGdpKnT.js";import"./useLink-DLd-zCvm.js";import"./useFocusable-NpJIjJzn.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./Portal-B3A1C5qZ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DU5NJZZj.js";import"./IconCheckMark-DDrIoLdu.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./IconExclamationMarkTriangle-DOh84ahI.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./IconQuestionMarkCircle-7EPrDyIp.js";import"./validation-CJXPAjNB.js";import"./LoadingCircle-N4gckcbl.js";import"./Switch-Cd2vSyfE.js";import"./TabItem-7zIDIg2o.js";import"./elements-BOYmskOL.js";import"./TextInput-DxGfxErH.js";import"./IconCross-BVasaH61.js";import"./Tooltip-PS__CsyB.js";import"./useClickOutside-BcVMXM8r.js";import"./EnablePortalWrapper-DHpdIRHB.js";import"./Tree-zO-e1FBW.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CmN_Qqm3.js";import"./FocusScope-BbG7qqtO.js";import"./useOverlayTriggerState-Do1lhetf.js";import"./useControlledState-CbyHarIm.js";import"./useMenuTrigger-WEg3SWYq.js";import"./useLabels-B-KZ60t7.js";import"./useLocalizedStringFormatter-DuHRzRSj.js";import"./context-dZDq9eSh.js";import"./VisuallyHidden-BJ4JcGHV.js";import"./helper-kX8HYG1i.js";import"./isScrollable-BSEN4xi5.js";import"./SelectionManager-C5uJtM9S.js";import"./useField-DK1vwUqC.js";import"./useFormValidationState-CY2oi0R5.js";import"./MenuItem-DLnzVIUf.js";import"./IconCaretRight-CAeLeSzU.js";import"./Trigger-DtS_F8DS.js";import"./IconCaretDown-BLgqrlDL.js";import"./IconCaretDown16-Df8Xsbqc.js";import"./IconTrashBin16-DOiZQ5Am.js";import"./IconTrashBin24-10Yg3nt7.js";const $t={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:n("onClick"),style:s.Default,children:"Button"}),t.jsx(i,{onClick:n("onClick"),style:s.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:n("onClick"),style:s.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:n("onClick"),emphasis:a.Default,style:s.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(O,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(E,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:n("onClick"),emphasis:a.Strong,style:s.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:s.Default,onClick:n("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const te=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,te as __namedExportsOrder,$t as default};
