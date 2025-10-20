import{r as c,j as t}from"./iframe-BsrH74wW.js";import{a as k}from"./Box-BoU9j_-M.js";import{B as i,b as n,a}from"./Button-Ca7IJx5d.js";import{D as I}from"./DialogBody-ZzDA7jur.js";import{D as O}from"./DialogFooter-CpoKS4gX.js";import{D as E}from"./DialogHeader-BQqtkZhF.js";import{D as b}from"./Divider-B6nomwzb.js";import{D as T}from"./Dropdown-vrNjwJ4t.js";import{F as y}from"./Flex-BOwXRHQD.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-DjYW8HvK.js";import{I as d}from"./InlineDialog-DLsjaOsz.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CMubI7vX.js";import"./FormControl-DCqfzu6M.js";import"./InputLabel-BeG_0hG4.js";import"./TooltipIcon-a-cgVA81.js";import"./LegacyTooltip-w6VRqQyz.js";import"./useLink-N5D_jC9v.js";import"./useFocusable-D4UOYfqs.js";import"./useFocusRing-hWS3vXVU.js";import"./useEffectEvent-BNtJsWpB.js";import"./chain-F-BtQllU.js";import"./index-BuHowFQm.js";import"./usePopper-D4H62yBu.js";import"./index-BVx1uj1e.js";import"./Portal-BJaQAvNu.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-JCqlWWiP.js";import"./IconCheckMark-BonruZ95.js";import"./IconExclamationMarkCircle24-onFYI8CK.js";import"./IconExclamationMarkTriangle-Bu22p--y.js";import"./IconExclamationMarkTriangle24-D4qPWYL4.js";import"./IconQuestionMarkCircle-DvRcLFtP.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-s8Rinl8F.js";import"./Switch-CAzpIv7f.js";import"./TabItem-C5L6J1Pg.js";import"./elements-BOYmskOL.js";import"./TextInput-B5tiVWeN.js";import"./IconCross-BWIuzEwt.js";import"./Tooltip-BHVUW8DF.js";import"./useClickOutside-BoYLtvpE.js";import"./EnablePortalWrapper-IRN-cTF_.js";import"./Tree-BK8uNI6q.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-PikOkiBX.js";import"./FocusScope-D-MiZ49_.js";import"./useOverlayTriggerState-CQObmmI1.js";import"./useControlledState-B5iqGSbV.js";import"./useMenuTrigger-DHg7FuWy.js";import"./useLabels-DykprWij.js";import"./useLocalizedStringFormatter-BnBHXZ2i.js";import"./context-WDB9iL2j.js";import"./VisuallyHidden-DoRJ1ABU.js";import"./helper-BASIhnZe.js";import"./keyboard-DY2UNgnm.js";import"./SelectionManager-dybXC34z.js";import"./useField-Dzkf9Z-B.js";import"./useFormValidationState-XqvpKhv-.js";import"./MenuItem-Dw6fhHFt.js";import"./IconCaretRight-C5TlupxE.js";import"./Trigger-DYPmnBhX.js";import"./IconCaretDown-ClCIJDke.js";import"./IconCaretDown16-V3Dju6dr.js";import"./IconTrashBin16-DlVR9DwO.js";import"./IconTrashBin24-Clf_HqQZ.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const Xt=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,Xt as __namedExportsOrder,Qt as default};
