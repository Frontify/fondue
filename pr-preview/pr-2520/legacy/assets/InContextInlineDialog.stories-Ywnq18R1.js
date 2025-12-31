import{r as c,j as t}from"./iframe-DOM37agV.js";import{a as k}from"./Box-B0ELCmFz.js";import{B as i,b as n,a}from"./Button-DiGpwDcf.js";import{D as I}from"./DialogBody-Dg_mxHpV.js";import{D as O}from"./DialogFooter-OaRrRu_S.js";import{D as E}from"./DialogHeader-Cgz92CMp.js";import{D as b}from"./Divider-CrV3oQlK.js";import{D as T}from"./Dropdown-CljzFXY_.js";import{F as y}from"./Flex-C_7lCH-m.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-BZYLJhn-.js";import{I as d}from"./InlineDialog-DS7SJcYQ.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Nz92x7gc.js";import"./FormControl-DKsN1Rfq.js";import"./InputLabel-D7wxk9x2.js";import"./TooltipIcon-BvUbNbiu.js";import"./LegacyTooltip-CdOA6H3p.js";import"./useLink-BBb1g4_o.js";import"./useFocusable-IutlfFAf.js";import"./useFocusRing-Y0kliFz7.js";import"./useEffectEvent-D8BbqtYc.js";import"./chain-OtGBq9pX.js";import"./index-hK0Kzaf0.js";import"./usePopper-BpZSDAoM.js";import"./index-KpBi3IuA.js";import"./Portal-D4YMrFe-.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DF5ffgkO.js";import"./IconCheckMark-Cm9Tsc5r.js";import"./IconExclamationMarkCircle24-DHhJuj7N.js";import"./IconExclamationMarkTriangle-fkj1ZUwM.js";import"./IconExclamationMarkTriangle24-NQBm-Sna.js";import"./IconQuestionMarkCircle-DlHNnYiG.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CFtaE7te.js";import"./Switch-hOj7OoDh.js";import"./TabItem-DjhzX8wu.js";import"./elements-BOYmskOL.js";import"./TextInput-BrRaOg_s.js";import"./IconCross-LucYcRSr.js";import"./Tooltip-EOh5NcyS.js";import"./useClickOutside-Bpo0gZ8k.js";import"./EnablePortalWrapper-Dty1AGJe.js";import"./Tree-Bvp5EjwB.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CVuvhfes.js";import"./FocusScope-Dv51Yx5z.js";import"./useOverlayTriggerState-D9dwohzk.js";import"./useControlledState-DAWdmCYC.js";import"./useMenuTrigger-BhlThXlM.js";import"./useLabels-d_7o89q6.js";import"./useLocalizedStringFormatter-Bmtq3WRl.js";import"./context-BnHpA1R-.js";import"./VisuallyHidden-Dlw57cBx.js";import"./helper-DO_K2AEe.js";import"./keyboard-BirPUi8y.js";import"./SelectionManager-B3_Dpg4l.js";import"./useField-BlxM0Klk.js";import"./useFormValidationState-CGMhCioq.js";import"./MenuItem-DTWN8qOE.js";import"./IconCaretRight-oRSOBSQ6.js";import"./Trigger-CWwZMo_B.js";import"./IconCaretDown-z-FK_2Ik.js";import"./IconCaretDown16-CJ4m8GXn.js";import"./IconTrashBin16-Dg3kfRAs.js";import"./IconTrashBin24-CjrjP8GM.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
