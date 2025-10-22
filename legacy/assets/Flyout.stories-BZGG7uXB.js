import{j as e,r as l}from"./iframe--2rw_cjg.js";import{b as r}from"./chain-C2bf6kwx.js";import{a as D,c as fe}from"./Badge-B6bN1s0e.js";import{B as T,a as f,b as g}from"./Button-CDpAvR_7.js";import{D as ge}from"./DatePicker-uxrm6-Qi.js";import{D as he}from"./Divider-BwIY4yEp.js";import{D as be}from"./Dropdown-DtVZRx1B.js";import{F as S}from"./FormControl-xc9FX5RU.js";import{L as we}from"./LegacyTextarea-eLLB4mrU.js";import{S as xe}from"./SegmentedControls-C4iARABC.js";import{T as Ce}from"./TextInput-iYevrUQR.js";import{a as B}from"./TooltipIcon-B9wO7yC3.js";import{I as ce}from"./IconDotsVertical-CUrhmj7x.js";import{I as N}from"./LegacyTooltip-B4lgEf8F.js";import{I as h}from"./IconIcon-riXWhwPO.js";import{a as Oe}from"./focusStyle-Ch_WJ4aJ.js";import{m as ye}from"./merge-DI-veSMP.js";import{a as v,F as c,b as pe,c as je,d as Ie}from"./Flyout-D-m2YgNU.js";import"./preload-helper-C1FmrZbK.js";import"./useEffectEvent-7SpFmDeR.js";import"./IconCross-B8uxEUE8.js";import"./IconSize-BcCrF_mi.js";import"./colors-cqDZVL9s.js";import"./useButton-BR4gTdNq.js";import"./useFocusable-AxjEqYd6.js";import"./useFocusRing-BsE3KrSK.js";import"./index-DQ-tYZ13.js";import"./floating-ui.dom-BeV4s8NL.js";import"./IconCaretRight-CjJOrGWt.js";import"./validation-C9S5KgfE.js";import"./IconCaretDown-C5uKGKgw.js";import"./IconCaretDown16-D3D4HTlj.js";import"./IconCaretUp-BTWMSEc6.js";import"./FocusScope-B6lgz3yj.js";import"./useOverlayTriggerState-BsH2Kftu.js";import"./useControlledState-zKuWR2Qz.js";import"./useMenuTrigger-Coa4GpHM.js";import"./useLabels-DJ9q4a3M.js";import"./useLocalizedStringFormatter-BFAsQve6.js";import"./context-ddobrZ0u.js";import"./VisuallyHidden-DUr7ThBi.js";import"./helper-CDHCISTK.js";import"./keyboard-BlzZ7KRq.js";import"./SelectionManager-DBE0gQ_v.js";import"./useField-C3-Q__DF.js";import"./useFormValidationState-B-tZ4Eq5.js";import"./usePopper-CqJZcUvQ.js";import"./index-BCqD7aw8.js";import"./MenuItem-BrtW96Sm.js";import"./IconCheckMark-BkiS9-rb.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-uT_yoQL1.js";import"./Trigger-BqI9Ucl1.js";import"./IconExclamationMarkTriangle-CzbtRrPB.js";import"./IconExclamationMarkTriangle24-95cBFDWm.js";import"./IconTrashBin16-BlgDT1jV.js";import"./IconTrashBin24-DeRmc9qk.js";import"./EnablePortalWrapper--WRtXlIr.js";import"./Portal-Bog-ilIj.js";import"./useMemoizedId-D0AyLdJ9.js";import"./InputLabel-Dv4is4pL.js";import"./react-textarea-autosize.browser.esm-Bz_z1l1K.js";import"./proxy-Bcbj-oDF.js";import"./IconQuestionMarkCircle-CyFLsY7r.js";import"./IconDotsVertical16-DBa_Q17p.js";import"./useLink-B735unP_.js";import"./IconExclamationMarkCircle24-Bh5vOeGE.js";import"./IconIcon16-CUYzzmMn.js";import"./IconIcon24-C7GO3v6L.js";import"./getVerticalPositioning-Bdpvu71J.js";import"./useDialog-zRuGmv2s.js";import"./FieldsetHeader-2t869vkM.js";import"./Switch-RanT_BOm.js";import"./IconMinus-Cc0nclpN.js";import"./IconMinus16-Dcfwvqv_.js";import"./IconPlus-DalXjrH1.js";import"./IconPlus16-CUee3yC9.js";const{action:k}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Deprecated/Flyout",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},argTypes:{onCancel:{action:"onCancel",table:{disable:!0}},onOpenChange:{action:"onOpenChange",table:{disable:!0}},placement:{options:Object.values(v),control:{type:"select"},defaultValue:v.BottomLeft},offset:{control:{type:"number"},defaultValue:5}},args:{trigger:e.jsx("span",{className:"tw-flex tw-h-full tw-items-center tw-p-1 tw-rounded tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70",children:e.jsx(ce,{})})}},O=(t=!1,o=!1)=>s=>{const[n,i]=l.useState("a"),[I,me]=l.useState(""),[ue,F]=l.useState(!1);return e.jsxs("div",{className:"dark:tw-text-white",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:["Some text",e.jsxs(c,{...s,isOpen:ue,onOpenChange:r(s.onOpenChange,F),onCancel:r(s.onCancel,()=>F(!1)),onConfirm:s.onConfirm&&r(s.onConfirm,F),children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-y-8 tw-p-8",children:[e.jsx(S,{label:{children:"Input Label",htmlFor:"input-id",tooltip:{content:"Input tooltip"}},extra:"Extra Text",children:e.jsx(Ce,{value:I,onChange:me,focusOnMount:o})}),e.jsx(he,{color:Ie,height:je}),e.jsx(S,{label:{children:"SegmentedControls Label",htmlFor:"segmented-controls-id"},children:e.jsx(xe,{activeItemId:n,onChange:i,items:[{id:"a",value:"abc"},{id:"b",value:"def"},{id:"c",value:"ghi"}]})})]}),e.jsx("div",{className:"tw-p-8",children:e.jsx(S,{label:{children:"LegacyTextarea Label",htmlFor:"textarea-id"},children:e.jsx(we,{placeholder:"This is a placeholder"})})})]})]}),e.jsx("div",{children:"Deserunt voluptate deserunt laborum dolor excepteur. Reprehenderit amet cillum ad ut. Magna labore consequat enim tempor amet in qui. In esse proident officia aliquip ea in in nulla aliqua in laborum anim ipsum est."}),t&&Array.from(Array(15).keys()).map(de=>e.jsx("div",{children:"Deserunt voluptate deserunt laborum dolor excepteur. Reprehenderit amet cillum ad ut. Magna labore consequat enim tempor amet in qui. In esse proident officia aliquip ea in in nulla aliqua in laborum anim ipsum est."},`content${de}`))]})},y=O(!1,!1).bind({}),p=O(!1,!1).bind({});p.argTypes={onConfirm:{action:"onConfirm"}};p.args={title:"Header title",decorator:e.jsx(h,{}),onConfirm:k("onConfirm")};const b=O(!1,!1).bind({});b.args={title:"Header title",decorator:e.jsx(h,{}),badges:[{style:D.Positive,children:"Badge 1"},{status:fe.Danger,children:"Badge 2"},{style:D.Danger,icon:e.jsx(h,{}),children:"Badge 3"}]};const Fe=t=>{const[o,a]=l.useState(!1),[s,n]=l.useState();return e.jsx(c,{...t,trigger:({"aria-label":i},I)=>e.jsx(T,{style:g.Default,emphasis:f.Strong,onClick:()=>a(!o),ref:I,"aria-label":i,children:"Button"}),isOpen:o,onOpenChange:r(t.onOpenChange,a),onCancel:r(t.onCancel,()=>a(!1)),children:e.jsxs("div",{className:"tw-p-4",children:[e.jsxs("p",{className:"tw-flex tw-items-center tw-my-2",children:["Label 1",e.jsx("span",{className:"tw-ml-2",children:e.jsx(B,{tooltip:{content:"Lorem ipsum dolor sit amet."},triggerIcon:e.jsx(N,{})})})]}),e.jsx(be,{onChange:i=>console.log(i),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),e.jsxs("p",{className:"tw-flex tw-items-center tw-my-2",children:["Label 2",e.jsx("span",{className:"tw-ml-2",children:e.jsx(B,{tooltip:{content:"Lorem ipsum dolor sit amet."},triggerIcon:e.jsx(N,{})})})]}),e.jsx(ge,{value:s,onChange:n})]})})},m=Fe.bind({});m.args={title:"Header title",decorator:e.jsx(h,{})};m.argTypes={trigger:{table:{disable:!0}},decorator:{table:{disable:!0}}};const Se=t=>{const[o,a]=l.useState(!1);return e.jsxs("div",{className:"dark:tw-text-white",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:["Some text",e.jsx(c,{...t,isOpen:o,onOpenChange:s=>a(s),fixedFooter:e.jsx(pe,{buttons:[{style:g.Default,emphasis:f.Default,children:"Cancel",onClick:r(k("onCancel"),()=>a(!1))},{style:g.Default,emphasis:f.Strong,children:"Add",onClick:r(k("onConfirm"),()=>a(!1))}]}),children:e.jsx("p",{className:"tw-text-center tw-py-8",children:"Your flyout content with custom footer buttons!"})})]}),e.jsx("div",{children:"Deserunt voluptate deserunt laborum dolor excepteur. Reprehenderit amet cillum ad ut. Magna labore consequat enim tempor amet in qui. In esse proident officia aliquip ea in in nulla aliqua in laborum anim ipsum est."})]})},u=Se.bind({});u.args={title:"Header title",decorator:e.jsx(h,{}),trigger:e.jsx("span",{className:"tw-flex tw-h-full tw-items-center tw-p-1 tw-rounded tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70",children:e.jsx(ce,{})}),legacyFooter:!1};u.argTypes={trigger:{table:{disable:!0}},decorator:{table:{disable:!0}}};const ve=t=>{const[o,a]=l.useState(!1);return e.jsx(c,{...t,trigger:({"aria-label":s},n)=>e.jsx(T,{style:g.Default,emphasis:f.Strong,onClick:()=>a(!o),ref:n,"aria-label":s,children:"Click me"}),isOpen:o,onOpenChange:r(t.onOpenChange,a),onCancel:r(t.onCancel,()=>a(!1)),children:e.jsx("p",{className:"tw-text-center tw-py-8",children:"Flyout Content"})})},w=ve.bind({});w.args={legacyFooter:!1,fixedHeader:e.jsx("div",{className:"tw-py-5 tw-px-8 tw-bg-white dark:tw-bg-black-95 tw-border-b tw-border-b-black-10",children:"Custom Header"}),fixedFooter:e.jsx(pe,{buttons:[{style:g.Default,emphasis:f.Strong,children:"A button"}]})};const ke=t=>{const[o,a]=l.useState(!1);return e.jsx(c,{...t,trigger:(s,n,i)=>e.jsx("div",{...s,ref:n,className:ye(["tw-border tw-rounded tw-w-[200px] tw-p-2 tw-text-s tw-text-center tw-h-[60px] tw-outline-none tw-items-center tw-flex tw-justify-center",i.isFocusVisible&&Oe,i.isPressed&&"tw-bg-black-10"]),children:i.isPressed?"I'm Pressed!":" Accessible custom trigger"}),isOpen:o,onOpenChange:r(t.onOpenChange,a),onCancel:r(t.onCancel,()=>a(!1)),children:e.jsx("p",{className:"tw-text-center tw-py-8",children:"Fun with Flyouts and Buttons!"})})},d=ke.bind({});d.args={title:"Header title",decorator:e.jsx(h,{})};d.argTypes={trigger:{table:{disable:!0}},decorator:{table:{disable:!0}}};const x=O(!1,!1).bind({});x.args={contentMinHeight:200};const Te=t=>{const[o,a]=l.useState(!1);return e.jsx(c,{...t,trigger:({"aria-label":s},n)=>e.jsx("div",{className:"tw-flex tw-justify-center tw-items-center tw-w-full tw-h-screen",children:e.jsx(T,{style:g.Default,emphasis:f.Strong,onClick:()=>a(!o),ref:n,"aria-label":s,children:"Click me"})}),isOpen:o,onOpenChange:r(t.onOpenChange,a),onCancel:r(t.onCancel,()=>a(!1)),children:e.jsx("p",{className:"tw-text-center tw-py-8",children:"Flyout Content"})})},C=Te.bind({});C.args={placement:v.Top,offset:20};const j=O(!0,!0).bind({});var L,W,E;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:"FlyoutTemplate(false, false).bind({})",...(E=(W=y.parameters)==null?void 0:W.docs)==null?void 0:E.source}}};var H,M,A;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:"FlyoutTemplate(false, false).bind({})",...(A=(M=p.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};var q,R,_;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:"FlyoutTemplate(false, false).bind({})",...(_=(R=b.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var P,V,Y;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <Flyout {...args} trigger={({
    'aria-label': ariaLabel
  }, ref) => <Button style={ButtonStyle.Default} emphasis={ButtonEmphasis.Strong} onClick={() => setOpen(!open)} ref={ref as MutableRefObject<HTMLButtonElement>} aria-label={ariaLabel}>
                    Button
                </Button>} isOpen={open} onOpenChange={chain(args.onOpenChange, setOpen)} onCancel={chain(args.onCancel, () => setOpen(false))}>
            <div className="tw-p-4">
                <p className="tw-flex tw-items-center tw-my-2">
                    Label 1
                    <span className="tw-ml-2">
                        <TooltipIcon tooltip={{
            content: 'Lorem ipsum dolor sit amet.'
          }} triggerIcon={<IconExclamationMarkCircle />} />
                    </span>
                </p>
                <Dropdown onChange={id => console.log(id)} activeItemId={'1'} menuBlocks={[{
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
                <p className="tw-flex tw-items-center tw-my-2">
                    Label 2
                    <span className="tw-ml-2">
                        <TooltipIcon tooltip={{
            content: 'Lorem ipsum dolor sit amet.'
          }} triggerIcon={<IconExclamationMarkCircle />} />
                    </span>
                </p>
                <DatePicker value={selectedDate as Date} onChange={setSelectedDate} />
            </div>
        </Flyout>;
}`,...(Y=(V=m.parameters)==null?void 0:V.docs)==null?void 0:Y.source}}};var U,$,G;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  return <div className="dark:tw-text-white">
            <div className="tw-flex tw-items-center">
                Some text
                <Flyout {...args} isOpen={open} onOpenChange={isOpen => setOpen(isOpen)} fixedFooter={<FlyoutFooter buttons={[{
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Default,
        children: 'Cancel',
        onClick: chain(action('onCancel'), () => setOpen(false))
      }, {
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Strong,
        children: 'Add',
        onClick: chain(action('onConfirm'), () => setOpen(false))
      }]} />}>
                    <p className="tw-text-center tw-py-8">Your flyout content with custom footer buttons!</p>
                </Flyout>
            </div>
            <div>
                Deserunt voluptate deserunt laborum dolor excepteur. Reprehenderit amet cillum ad ut. Magna labore
                consequat enim tempor amet in qui. In esse proident officia aliquip ea in in nulla aliqua in laborum
                anim ipsum est.
            </div>
        </div>;
}`,...(G=($=u.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var K,z,J;w.parameters={...w.parameters,docs:{...(K=w.parameters)==null?void 0:K.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  return <Flyout {...args} trigger={({
    'aria-label': ariaLabel
  }, ref) => <Button style={ButtonStyle.Default} emphasis={ButtonEmphasis.Strong} onClick={() => setIsOpen(!isOpen)} ref={ref as MutableRefObject<HTMLButtonElement>} aria-label={ariaLabel}>
                    Click me
                </Button>} isOpen={isOpen} onOpenChange={chain(args.onOpenChange, setIsOpen)} onCancel={chain(args.onCancel, () => setIsOpen(false))}>
            <p className="tw-text-center tw-py-8">Flyout Content</p>
        </Flyout>;
}`,...(J=(z=w.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};var Q,X,Z;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  return <Flyout {...args} trigger={(props, ref, state) => <div {...props} ref={ref as MutableRefObject<HTMLDivElement>} className={merge(['tw-border tw-rounded tw-w-[200px] tw-p-2 tw-text-s tw-text-center tw-h-[60px] tw-outline-none tw-items-center tw-flex tw-justify-center', state.isFocusVisible && FOCUS_STYLE, state.isPressed && 'tw-bg-black-10'])}>
                    {state.isPressed ? "I'm Pressed!" : ' Accessible custom trigger'}
                </div>} isOpen={open} onOpenChange={chain(args.onOpenChange, setOpen)} onCancel={chain(args.onCancel, () => setOpen(false))}>
            <p className="tw-text-center tw-py-8">Fun with Flyouts and Buttons!</p>
        </Flyout>;
}`,...(Z=(X=d.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,ae;x.parameters={...x.parameters,docs:{...(ee=x.parameters)==null?void 0:ee.docs,source:{originalSource:"FlyoutTemplate(false, false).bind({})",...(ae=(te=x.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var se,oe,re;C.parameters={...C.parameters,docs:{...(se=C.parameters)==null?void 0:se.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  return <Flyout {...args} trigger={({
    'aria-label': ariaLabel
  }, ref) => <div className="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-screen">
                    <Button style={ButtonStyle.Default} emphasis={ButtonEmphasis.Strong} onClick={() => setIsOpen(!isOpen)} ref={ref as MutableRefObject<HTMLButtonElement>} aria-label={ariaLabel}>
                        Click me
                    </Button>
                </div>} isOpen={isOpen} onOpenChange={chain(args.onOpenChange, setIsOpen)} onCancel={chain(args.onCancel, () => setIsOpen(false))}>
            <p className="tw-text-center tw-py-8">Flyout Content</p>
        </Flyout>;
}`,...(re=(oe=C.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var ne,ie,le;j.parameters={...j.parameters,docs:{...(ne=j.parameters)==null?void 0:ne.docs,source:{originalSource:"FlyoutTemplate(true, true).bind({})",...(le=(ie=j.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};const ea=["WithoutHeader","WithOnclick","WithBadges","WithButtonTrigger","WithCustomFooter","WithCustomFooterAndHeader","WithRenderFunctionTrigger","WithContentMinHeight","WithPlacementAndOffset","WithTextInputAutofocusAndPageScrolling"];export{b as WithBadges,m as WithButtonTrigger,x as WithContentMinHeight,u as WithCustomFooter,w as WithCustomFooterAndHeader,p as WithOnclick,C as WithPlacementAndOffset,d as WithRenderFunctionTrigger,j as WithTextInputAutofocusAndPageScrolling,y as WithoutHeader,ea as __namedExportsOrder,Zt as default};
