import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{$ as v,a as T}from"./useDialog-D9RrpKTI.js";import{$ as S}from"./useOverlayTriggerState-CiJgB9B9.js";import{a as O}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{r as P}from"./index-BwDkhjyp.js";import{e as k,b as m,c as u}from"./Button-2a8yg1iB.js";import{F as I,b as V,a as z}from"./FormControl-DOcmnppy.js";import{S as H}from"./ScrollWrapper-D6IKkMLY.js";import{T as N}from"./TextInput-BcH7nD9x.js";import{I as $}from"./IconCap-DzxQVFUF.js";import{I as w}from"./IconIcon-CDmwB2Qj.js";import{I as E}from"./IconMusicNote-BVMMnB9h.js";import{P as g,a as c}from"./FrontifyPattern-BK1XFNTz.js";import{g as F}from"./useMemoizedId-EtHZ7Sxa.js";import{D as W}from"./Divider-C61FZ2pw.js";import{a as d,b as p,M as n,c as h}from"./Modal-CufdbVVA.js";import"./index-CS4BWtGh.js";import"./_commonjsHelpers-BosuxZz1.js";import"./SSRProvider-CYXx33DY.js";import"./chain-CSFqNvhK.js";import"./useFocusable-ClqOF1PM.js";import"./useFocusRing-Vzyl7-Lk.js";import"./FocusScope-CryrrNNO.js";import"./useControlledState-C0C-dzuH.js";import"./v4-CQkTLCs1.js";import"./useButton-B0CVDvll.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./InputLabel-CEoY-eW-.js";import"./TooltipIcon-FKMBcYJt.js";import"./LegacyTooltip-BI7N2mWT.js";import"./useLink-BrkukSAv.js";import"./usePopper-DDlDeltW.js";import"./index-CfyPTyT-.js";import"./Portal-BBACcjoK.js";import"./IconCheckMark-ByVuQE55.js";import"./IconExclamationMarkCircle-DIK3qNWl.js";import"./IconExclamationMarkCircle24-Vs83y98-.js";import"./IconExclamationMarkTriangle-DvvXw1YP.js";import"./IconExclamationMarkTriangle24-NdDZZD89.js";import"./IconQuestionMarkCircle-DpV6l-09.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CZrma5le.js";import"./IconEyeOff-BAmb6qT8.js";import"./IconCross-CxP4FPDR.js";import"./IconIcon16-DWj0uaJO.js";import"./IconIcon24-B3RK_NZS.js";import"./isScrollable-Bts8_1NI.js";import"./index-hyK68Dd8.js";import"./motion-C48bHxkn.js";const Wt={title:"Deprecated/Modal",component:n,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},argTypes:{pattern:{table:{category:"Visual"},name:"Pattern",options:["None",...Object.values(c)],mapping:{None:null,...Object.values(c)},defaultValue:c.DigitalAssets,control:{type:"select"}},foregroundColor:{table:{category:"Visual"},name:"Theme",options:["None",...Object.values(g)],mapping:{None:null,...Object.values(c)},defaultValue:g.Black,control:{type:"select"}},width:{table:{category:"Layout"},name:"Width",options:[p.Default,p.Small,p.Large],control:{type:"select"}},title:{table:{category:"Header"},name:"Title",defaultValue:"Awesome modal",control:{type:"text"}},leadText:{table:{category:"Header"},name:"Lead Text",defaultValue:"The Home for Brand Management",control:{type:"text"}},decorator:{table:{category:"Header"},name:"Decorator",options:["None","Icons","Academy","Audio"],mapping:{None:null,Icons:t.jsx(w,{},"iconIcon"),Academy:t.jsx($,{},"iconAcademy"),Audio:t.jsx(E,{},"iconAudio")},defaultValue:"Icons",control:{type:"select"}},variant:{table:{category:"Header"},name:"Variant",options:["None",...Object.values(d)],mapping:{None:null,...Object.values(d)},defaultValue:d.Default,control:{type:"select"}},compact:{table:{category:"Layout"},name:"Compact",defaultValue:!1,control:{type:"boolean"}},horizontalPadding:{table:{category:"Layout"},name:"Body Horizontal Padding",defaultValue:!0,control:{type:"boolean"}},children:{table:{disable:!0}}},decorators:[o=>t.jsx(v,{children:t.jsx(T,{children:t.jsx(o,{})})})]},e=()=>t.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),A=()=>{const[o,a]=P.useState("");return t.jsx(I,{style:z.Primary,direction:V.Vertical,label:{children:"Input Label",required:!1,htmlFor:F(),tooltip:{content:"Tooltip Text"}},children:t.jsx(N,{value:o,onChange:a})})},r=o=>{const a=S({});return t.jsxs(t.Fragment,{children:[t.jsx(k,{onClick:()=>a.open(),children:"Open Modal"}),t.jsxs(n,{visual:{pattern:o.pattern,foregroundColor:o.foregroundColor},width:o.width,onClose:a.close,isOpen:a.isOpen,isDismissable:!0,compact:o.compact,children:[t.jsx(n.Header,{title:o.title,leadText:o.leadText,decorator:o.decorator,variant:o.variant}),t.jsx(n.Body,{direction:H.Vertical,horizontalPadding:o.horizontalPadding,children:o.children}),t.jsx(n.Footer,{buttons:[{children:"Cancel",onClick:()=>{a.close()},style:u.Default,emphasis:m.Default},{children:"Confirm",onClick:()=>{O("click"),a.close()},style:u.Default,emphasis:m.Strong}]})]})]})},s=r.bind({});s.args={...r.args,children:t.jsxs("div",{children:[t.jsx(e,{}),t.jsx(e,{}),t.jsx("div",{className:"tw-my-4",children:t.jsx(A,{})}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{})]})};const i=r.bind({});i.args={...r.args,children:t.jsx(e,{})};const l=r.bind({}),L=()=>t.jsxs("div",{children:[t.jsxs("div",{className:`${h.default.horizontal}`,children:[t.jsx(e,{}),t.jsx(e,{})]}),t.jsx(W,{}),t.jsxs("div",{className:`${h.default.horizontal}`,children:[t.jsx(e,{}),t.jsx(e,{})]})]});l.args={...r.args,horizontalPadding:!1,pattern:void 0,children:t.jsx(L,{})};var f,x,y;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const state = useOverlayTriggerState({});
  return <>
            <Button onClick={() => state.open()}>Open Modal</Button>
            <Modal visual={{
      pattern: args.pattern,
      foregroundColor: args.foregroundColor
    }} width={args.width} onClose={state.close} isOpen={state.isOpen} isDismissable compact={args.compact}>
                <Modal.Header title={args.title} leadText={args.leadText} decorator={args.decorator} variant={args.variant} />
                <Modal.Body direction={ScrollWrapperDirection.Vertical} horizontalPadding={args.horizontalPadding}>
                    {args.children}
                </Modal.Body>
                <Modal.Footer buttons={[{
        children: 'Cancel',
        onClick: () => {
          state.close();
        },
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Default
      }, {
        children: 'Confirm',
        onClick: () => {
          action('click');
          state.close();
        },
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Strong
      }]} />
            </Modal>
        </>;
}`,...(y=(x=s.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var j,b,C;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`args => {
  const state = useOverlayTriggerState({});
  return <>
            <Button onClick={() => state.open()}>Open Modal</Button>
            <Modal visual={{
      pattern: args.pattern,
      foregroundColor: args.foregroundColor
    }} width={args.width} onClose={state.close} isOpen={state.isOpen} isDismissable compact={args.compact}>
                <Modal.Header title={args.title} leadText={args.leadText} decorator={args.decorator} variant={args.variant} />
                <Modal.Body direction={ScrollWrapperDirection.Vertical} horizontalPadding={args.horizontalPadding}>
                    {args.children}
                </Modal.Body>
                <Modal.Footer buttons={[{
        children: 'Cancel',
        onClick: () => {
          state.close();
        },
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Default
      }, {
        children: 'Confirm',
        onClick: () => {
          action('click');
          state.close();
        },
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Strong
      }]} />
            </Modal>
        </>;
}`,...(C=(b=i.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var D,B,M;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const state = useOverlayTriggerState({});
  return <>
            <Button onClick={() => state.open()}>Open Modal</Button>
            <Modal visual={{
      pattern: args.pattern,
      foregroundColor: args.foregroundColor
    }} width={args.width} onClose={state.close} isOpen={state.isOpen} isDismissable compact={args.compact}>
                <Modal.Header title={args.title} leadText={args.leadText} decorator={args.decorator} variant={args.variant} />
                <Modal.Body direction={ScrollWrapperDirection.Vertical} horizontalPadding={args.horizontalPadding}>
                    {args.children}
                </Modal.Body>
                <Modal.Footer buttons={[{
        children: 'Cancel',
        onClick: () => {
          state.close();
        },
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Default
      }, {
        children: 'Confirm',
        onClick: () => {
          action('click');
          state.close();
        },
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Strong
      }]} />
            </Modal>
        </>;
}`,...(M=(B=l.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};const At=["Default","WithLimitedText","BodyWithoutHorizontalPadding"];export{l as BodyWithoutHorizontalPadding,s as Default,i as WithLimitedText,At as __namedExportsOrder,Wt as default};
