import{j as a}from"./jsx-runtime-Nms4Y4qS.js";import{r as s}from"./index-BwDkhjyp.js";import{a as C}from"./focusStyle-CBFElZiz.js";import{m as d}from"./merge-DI-veSMP.js";import{I as K}from"./IconPen-DImMZ8p1.js";import{I as H}from"./IconSize-BcCrF_mi.js";import"./_commonjsHelpers-BosuxZz1.js";import"./IconPen16-DM2Osp_v.js";const N={getLabel:t=>{let r="";const i=n=>{s.Children.map(n,e=>{typeof e=="string"?r+=e:e!=null&&e.props&&i(e==null?void 0:e.props.children)})};return i(t),r},copyStyles:t=>({fontSize:window.getComputedStyle(t).getPropertyValue("font-size"),lineHeight:window.getComputedStyle(t).getPropertyValue("line-height"),letterSpacing:window.getComputedStyle(t).getPropertyValue("letter-spacing"),minWidth:window.getComputedStyle(t).getPropertyValue("width"),fontWeight:window.getComputedStyle(t).getPropertyValue("font-weight")})};var f=(t=>(t.INPUT="INPUT",t.LABEL="LABEL",t))(f||{});const u=({onEditableSave:t,onModeChange:r,onAdditionalValueSave:i,children:n,options:e,isOverflowing:x=!1,"data-test-id":G="editable-node-container"})=>{const g=N.getLabel(n),[v,I]=s.useState(g),[w,h]=s.useState("LABEL"),[T,J]=s.useState(),y=s.useRef(null),Q=l=>I(l.target.value),L=l=>{h("LABEL"),r&&r("LABEL"),e!=null&&e.additionalValues&&i&&i(e.additionalValues,l.target.value),t&&t(l.target.value)},E=l=>()=>{I(l),h("INPUT"),r&&r("INPUT")},X=l=>{l.key==="Enter"&&L(l)},Z=l=>L(l);s.useEffect(()=>h((e==null?void 0:e.mode)??"LABEL"),[e==null?void 0:e.mode]);const $=e!=null&&e.enableDoubleClick?{onDoubleClick:E(g),onKeyPress:l=>l.key==="Enter"&&E(g)()}:{onClick:E(g)};s.useEffect(()=>{var l;S.current&&J(N.copyStyles(S.current)),w==="INPUT"&&((l=y.current)==null||l.select())},[w,y,n]);const S=s.useRef(),ee=n&&s.cloneElement(n,{ref:S});return a.jsxs("div",{"data-test-id":G,className:d(["tw-relative tw-h-full",(e==null?void 0:e.removeBoxPadding)===!0?"":"tw-p-2"]),children:[w==="INPUT"?a.jsx("div",{className:d(["tw-flex tw-items-center",(e==null?void 0:e.isSlimInputField)===!0?"-tw-translate-x-[0.315rem] -tw-translate-y-[0.07rem]":"-tw-translate-x-[0.81rem] -tw-translate-y-[0.56rem]"]),children:a.jsxs("div",{"data-test-id":"editable-input",className:d(["tw-relative",x&&"tw-w-full tw-flex tw-items-center"]),children:[a.jsx("input",{ref:y,type:"text",className:d([(e==null?void 0:e.isSlimInputField)===!0?"focus-visible:tw-outline-none":C,"tw-absolute tw-w-full tw-text-text tw-border tw-rounded tw-bg-base tw-border-solid",(e==null?void 0:e.isSlimInputField)===!0?"tw-py-0 tw-px-1":"tw-px-3 tw-py-2"]),style:T,value:v,onChange:Q,onKeyDown:X,onBlur:Z}),a.jsx("span",{"aria-hidden":"true",className:d(["tw-rounded tw-px-4 tw-py-2 tw-bg-base tw-truncate",(e==null?void 0:e.isSlimInputField)===!0&&"tw-py-0 tw-px-2",x&&"tw-w-0"]),style:T,children:v})]})}):null,a.jsx("button",{style:{display:w==="INPUT"?"none":"flex"},className:d([x&&"tw-w-full","tw-h-full tw-items-center",C]),...$,"data-test-id":"node-link-name","aria-pressed":"false",children:ee})]})};u.displayName="FondueEditableText";u.__docgenInfo={description:`Component to switch between Label and Input state. Wraps the Children
with a Button, to allow for accessibility and copies styles to input field

Events:
- onEditableSave         // When changing from input to label state
- onModeChange           // Indicates which state is active
- onAdditionalValueSave  // Similar to editable Save with additional Values provided

Options properties:
- mode:                   enum EditableMode  // {INPUT = 'INPUT',LABEL = 'LABEL'}
- enableDoubleClick:      boolean            // should the input be triggered by a double click or single click
- isSlimInputField:       boolean            // removes y padding
- additionalValues?:      string             // additional Values like ID`,methods:[],displayName:"FondueEditableText",props:{children:{required:!1,tsType:{name:"ReactElement"},description:""},onAdditionalValueSave:{required:!1,tsType:{name:"signature",type:"function",raw:"(additionalValue: string, value: string) => void",signature:{arguments:[{type:{name:"string"},name:"additionalValue"},{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onEditableSave:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onModeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(editableState?: EditableMode) => void",signature:{arguments:[{type:{name:"EditableMode"},name:"editableState"}],return:{name:"void"}}},description:""},options:{required:!1,tsType:{name:"EditableOptionProps"},description:""},isOverflowing:{required:!1,tsType:{name:"boolean"},description:"@deprecated Temporary solution for text with ellipisis in Tree Component",defaultValue:{value:"false",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'editable-node-container'",computed:!1}}}};const oe={title:"Components/Editable Text",component:u,tags:["autodocs"],parameters:{actions:{argTypesRegex:"^on.*"}},argTypes:{children:{table:{disable:!0}},isOverflowing:{table:{disable:!0}},options:{table:{category:"Custom"}},onAdditionalValueSave:{table:{category:"Event"}},onEditableSave:{table:{category:"Event"}},onModeChange:{table:{category:"Event"}}}},M=t=>a.jsx(u,{...t,children:t.children}),Y=t=>{const[r,i]=s.useState("Im set from the outside");return a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(u,{...t,onEditableSave:n=>i(n),children:a.jsx("h1",{children:r})})," ",a.jsx(K,{size:H.Size24})]})},c=M.bind({});c.args={children:a.jsx("p",{children:"Change me"}),options:{}};const o=M.bind({});o.args={children:a.jsx("div",{className:"tw-flex tw-flex-row tw-items-center",children:a.jsx("h1",{className:"tw-text-text",children:"hey Styled"})}),options:{mode:f.LABEL,enableDoubleClick:!1,additionalValues:"Values only for the Event"}};o.storyName="Editable Text h1 styling";const m=()=>{const[t,r]=s.useState("Im set from the outside");return a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(u,{onEditableSave:i=>r(i),options:{additionalValues:"ID",enableDoubleClick:!0},children:a.jsx("h1",{className:"tw-text-xl",children:t})}),a.jsx(K,{size:H.Size24})]})},p=Y.bind({});p.args={options:{mode:f.INPUT}};const b=Y.bind({});b.args={options:{mode:f.INPUT,isSlimInputField:!0}};m.__docgenInfo={description:"",methods:[],displayName:"ControlledExample"};var P,V,j;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:"(args: EditableTextProps) => <EditableText {...args}>{args.children}</EditableText>",...(j=(V=c.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var z,B,D;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:"(args: EditableTextProps) => <EditableText {...args}>{args.children}</EditableText>",...(D=(B=o.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var k,U,A;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const [label, setLabel] = useState('Im set from the outside');
  return <div className="tw-flex tw-items-center">
            <EditableText onEditableSave={value => setLabel(value)} options={{
      additionalValues: 'ID',
      enableDoubleClick: true
    }}>
                <h1 className={'tw-text-xl'}>{label}</h1>
            </EditableText>
            <IconPen size={IconSize.Size24} />
        </div>;
}`,...(A=(U=m.parameters)==null?void 0:U.docs)==null?void 0:A.source}}};var F,_,R;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`(args: EditableTextProps) => {
  const [label, setLabel] = useState('Im set from the outside');
  return <div className="tw-flex tw-items-center">
            <EditableText {...args} onEditableSave={value => setLabel(value)}>
                <h1>{label}</h1>
            </EditableText>{' '}
            <IconPen size={IconSize.Size24} />
        </div>;
}`,...(R=(_=p.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var q,W,O;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`(args: EditableTextProps) => {
  const [label, setLabel] = useState('Im set from the outside');
  return <div className="tw-flex tw-items-center">
            <EditableText {...args} onEditableSave={value => setLabel(value)}>
                <h1>{label}</h1>
            </EditableText>{' '}
            <IconPen size={IconSize.Size24} />
        </div>;
}`,...(O=(W=b.parameters)==null?void 0:W.docs)==null?void 0:O.source}}};const ue=["EditableTextDefault","Default","ControlledExample","ControllelInitialInput","ControllelSlimInputField"];export{m as ControlledExample,p as ControllelInitialInput,b as ControllelSlimInputField,o as Default,c as EditableTextDefault,ue as __namedExportsOrder,oe as default};