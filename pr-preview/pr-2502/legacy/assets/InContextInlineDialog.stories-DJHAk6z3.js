import{r as c,j as t}from"./iframe-CLWR3nUG.js";import{a as k}from"./Box-DwNuBeM8.js";import{B as i,b as n,a}from"./Button-BXJ3LDeK.js";import{D as I}from"./DialogBody-C6oKKznT.js";import{D as O}from"./DialogFooter-7NCxnim2.js";import{D as E}from"./DialogHeader-Cp56xm8i.js";import{D as b}from"./Divider-_9r1eMvR.js";import{D as T}from"./Dropdown-CgJKgsG5.js";import{F as y}from"./Flex-DvFAWHP-.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-CxFQVOm5.js";import{I as d}from"./InlineDialog-Bjik62nR.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-cej4Nzn4.js";import"./Checkbox-C_BnGEqa.js";import"./useFocusable-DqLL_9nB.js";import"./useFocusRing-BSAt-4Vk.js";import"./useEffectEvent-CAs0gB5n.js";import"./chain-BXOE_HCM.js";import"./index-B_9kxJ6p.js";import"./useFormValidationState-DsxgvnBE.js";import"./useControlledState-Bgj_pg2k.js";import"./InputLabel-Cqx25nUO.js";import"./TooltipIcon-4N5NOwNP.js";import"./LegacyTooltip-BxpYtXmg.js";import"./useLink-PH1jH_sQ.js";import"./usePopper-BaDtouo_.js";import"./index-D3ZbXnsu.js";import"./Portal-BdiWRCVg.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-nabCRXrC.js";import"./IconCheckMark-Dpv-CvL4.js";import"./IconExclamationMarkCircle24-ClOhu_Ri.js";import"./IconExclamationMarkTriangle-znDU4MK2.js";import"./IconExclamationMarkTriangle24-zD4-cjbh.js";import"./IconQuestionMarkCircle-C0WF9A0R.js";import"./IconMinus-VNqTPRc-.js";import"./FormControl-DLFZlT_c.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTZpP-I5.js";import"./Switch-DpryGfG2.js";import"./TabItem-Buh8QC_x.js";import"./elements-BOYmskOL.js";import"./TextInput-G_lGNFDI.js";import"./IconCross-XzksfC__.js";import"./Tooltip-DiNOHaH5.js";import"./useClickOutside-CwgrC7Jz.js";import"./EnablePortalWrapper-D2eOtS_g.js";import"./Tree-CBjgRRIE.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton--zqKr1UY.js";import"./FocusScope-BqKd6BB4.js";import"./useOverlayTriggerState-DtfrjgdL.js";import"./useMenuTrigger-CQA0Zlhk.js";import"./useLabels-B9PzIB3R.js";import"./useLocalizedStringFormatter-DltMrR-Y.js";import"./context-v0LEZ9V1.js";import"./VisuallyHidden-C8aD6iZq.js";import"./helper-BVjiVm4-.js";import"./keyboard-DiUzdOAm.js";import"./SelectionManager-DYagDv8k.js";import"./useField-kYwedNDJ.js";import"./MenuItem-BLMEyQkG.js";import"./IconCaretRight-D_vXqUpq.js";import"./Trigger-DN5iHf_G.js";import"./IconCaretDown-KLV270_U.js";import"./IconCaretDown16-b6UFvhxi.js";import"./IconTrashBin16-DR4mHbxD.js";import"./IconTrashBin24-Cml_YhRO.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
