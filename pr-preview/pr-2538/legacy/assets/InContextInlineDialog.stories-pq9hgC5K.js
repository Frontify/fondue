import{r as c,j as t}from"./iframe-z7mE2Wk_.js";import{a as k}from"./Box-JEXyJSu8.js";import{B as i,b as n,a}from"./Button-nqKSQe0n.js";import{D as I}from"./DialogBody-BD4KMmLT.js";import{D as O}from"./DialogFooter-BZo5Gn1L.js";import{D as E}from"./DialogHeader-B1APGUSe.js";import{D as b}from"./Divider-BTvRs36V.js";import{D as T}from"./Dropdown-CdJjuw2R.js";import{F as y}from"./Flex-oaKFE7By.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-D6rNGIky.js";import{I as d}from"./InlineDialog-qmDRBApt.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B3RP-zrM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BAgdxmuY.js";import"./Checkbox-DH9o4iuo.js";import"./useFocusable-CaNXLyLQ.js";import"./useFocusRing-TSBrnVkt.js";import"./useEffectEvent-Cy9gGdjO.js";import"./chain-C9UJi1qp.js";import"./index-DiQlz7gC.js";import"./useFormValidationState-w5JfW8iw.js";import"./useControlledState-CXveQydd.js";import"./InputLabel-B34_xZ8L.js";import"./TooltipIcon-C4CPZgz5.js";import"./LegacyTooltip-BATB0pek.js";import"./useLink-DNHzOnAf.js";import"./usePopper-CDC_Gl3n.js";import"./index-C-oZNt1w.js";import"./Portal-DwhL2L_d.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DVY2tdmo.js";import"./IconCheckMark-ComK8mHi.js";import"./IconExclamationMarkCircle24-BjQv_f7p.js";import"./IconExclamationMarkTriangle-DlKNdBTi.js";import"./IconExclamationMarkTriangle24-Dw8gX6Sm.js";import"./IconQuestionMarkCircle-DtUT4oXr.js";import"./IconMinus-BzGXdu_h.js";import"./FormControl-By6vHcJx.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Dd8ddVox.js";import"./Switch-DHjdejSs.js";import"./TabItem-Cba-h8s6.js";import"./elements-BOYmskOL.js";import"./TextInput-DhxGzDyZ.js";import"./IconCross-ZEasPdrE.js";import"./Tooltip-CVsxlovO.js";import"./useClickOutside-Rl9D5ZyQ.js";import"./EnablePortalWrapper-V6D5L0ak.js";import"./Tree-BGJTm5QH.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-B9610hLg.js";import"./FocusScope-CMSxS2gT.js";import"./useOverlayTriggerState-B_zSWOrL.js";import"./useMenuTrigger-DwdZz8a9.js";import"./useLabels-5KuHBKIS.js";import"./useLocalizedStringFormatter-TbKQTTXh.js";import"./context-B4rMjY8Y.js";import"./VisuallyHidden-ehHaadZd.js";import"./helper-tqBW-mz3.js";import"./keyboard-DhG6qHQ1.js";import"./SelectionManager-CvECFxph.js";import"./useField-yXYAb3oc.js";import"./MenuItem-BBcl_KZo.js";import"./IconCaretRight-D8LUJ-Vf.js";import"./Trigger-BvdHEbPQ.js";import"./IconCaretDown-DH0qbgod.js";import"./IconCaretDown16-qS1WJJdE.js";import"./IconTrashBin16-DOL0tRhW.js";import"./IconTrashBin24-C7-2ns0G.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
