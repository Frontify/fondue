import{r as d,j as t}from"./iframe-C8DzMLUq.js";import{B as se}from"./Box-BzHm9Qew.js";import{a as l,G as Ve,b as Ce,c as Ie,F as Ee,I as Se}from"./FormField-DidIxL2E.js";import{I as Fe}from"./IconEyeOff16-DZO4G_ih.js";import{v as ze,V as s}from"./validation-DnizjOrp.js";import{$ as Ae}from"./useFocusRing-LHU1DvFv.js";import{i as Ne}from"./react-textarea-autosize.browser.esm-D007buvN.js";import{u as je}from"./IconExclamationMarkTriangle16-DYL1vm4H.js";import{F as ke}from"./focusStyle-6rwBDk7H.js";import{m as D}from"./merge-DI-veSMP.js";import{u as De}from"./Portal-CeNdC_jj.js";import"./preload-helper-2PZZeCBp.js";import"./VisuallyHidden-DHtW4ipl.js";import"./usePopper-By-AN0jW.js";import"./chain-BVpqQuFu.js";import"./useEffectEvent-Bkl_7GSf.js";import"./index-Cp0TrwZb.js";import"./index-DBTAEPx8.js";import"./useClickOutside-C8ynXhWr.js";import"./EnablePortalWrapper-CGSiwH-6.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D3bfw-qG.js";import"./IconCross16-BqmLRKDO.js";import"./IconSize-BcCrF_mi.js";function oe(c){return t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:16,height:16,className:"tw-flex tw-items-center tw-justify-center tw-fill-current",name:"IconNook16","aria-hidden":"true",...c,children:t.jsx("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.776 10.458a.5.5 0 0 1 .222.416v.877L8.5 8.791v-6.3l.765.479a.5.5 0 0 1 .235.424V4.75a1.5 1.5 0 0 0 .771 1.311l1.221.678a.5.5 0 0 1 .258.437v1.126c0 .502.25.97.667 1.249zM7.499 8.79 2 11.751v-.877a.5.5 0 0 1 .223-.416l1.359-.906a1.5 1.5 0 0 0 .668-1.249V7.177a.5.5 0 0 1 .257-.437l1.22-.678A1.5 1.5 0 0 0 6.5 4.751V3.394a.5.5 0 0 1 .235-.424l.765-.478zm-4.957 3.805 5.457-2.938 5.457 2.938-.99.55a.5.5 0 0 1-.466.01l-1.105-.553a1.5 1.5 0 0 0-1.28-.03l-1.413.629a.5.5 0 0 1-.406 0l-1.412-.628a1.5 1.5 0 0 0-1.28.029l-1.106.553a.5.5 0 0 1-.467-.01zm12.456-1.721a1.5 1.5 0 0 0-.668-1.248l-1.359-.907a.5.5 0 0 1-.223-.416V7.177a1.5 1.5 0 0 0-.771-1.31l-1.221-.68a.5.5 0 0 1-.257-.436V3.394a1.5 1.5 0 0 0-.705-1.272l-1.53-.956L8 1l-.265.166-1.53.956A1.5 1.5 0 0 0 5.5 3.394V4.75a.5.5 0 0 1-.257.437l-1.22.678a1.5 1.5 0 0 0-.772 1.311v1.126a.5.5 0 0 1-.223.416l-1.359.907A1.5 1.5 0 0 0 1 10.874v2.008l.257.143 1.789.994a1.5 1.5 0 0 0 1.4.03l1.105-.553a.5.5 0 0 1 .427-.01l1.412.628a1.5 1.5 0 0 0 1.218 0l1.413-.627a.5.5 0 0 1 .426.01l1.106.552a1.5 1.5 0 0 0 1.4-.03l1.788-.994.257-.143z",clipRule:"evenodd"})})}const Be=d.memo(oe);oe.__docgenInfo={description:"@deprecated Use icons from `@frontify/fondue/icons` instead.",methods:[],displayName:"IconNook16",props:{size:{required:!1,tsType:{name:"IconSize"},description:""},filled:{required:!1,tsType:{name:"boolean"},description:""}}};const C=({autocomplete:c,autosize:a=!1,clearable:u=!1,decorator:o,defaultValue:E,disabled:p=!1,extraActions:i=void 0,focusOnMount:y=!1,hugWidth:S,id:F,minRows:z,maxRows:le,placeholder:ie,readOnly:A,resizable:de=!1,required:ce,selectable:me=!1,status:m=s.Default,value:v,onBlur:pe,onChange:N,onEnterPressed:B,onKeyDown:j,onFocus:M,"data-test-id":h="fondue-textarea",...fe})=>{const ye=a?Ne:"textarea",r=De(null),k=p||A,{isFocusVisible:ve,focusProps:he}=Ae({isTextInput:!0,within:!0}),q=()=>{if(r.current){const{value:e}=r.current;N==null||N(e)}},be=e=>{var n;B&&e.key==="Enter"?B((n=r.current)==null?void 0:n.value):j==null||j(e)},ge=()=>{r.current&&(r.current.value="",q())};d.useEffect(()=>{if(y){const e=setTimeout(()=>{var n;(n=r.current)==null||n.focus()},0);return()=>clearTimeout(e)}},[y,r]),d.useEffect(()=>{var n;const e=v!==((n=r.current)==null?void 0:n.value);r.current&&v&&!e&&(r.current.value=v)},[v,r]);const xe={minRows:z,maxRows:le},we=()=>{let e=1;const n=i?i.length:0;switch(!0){case(n>0&&u&&m!==s.Default):return e=n+4.5,`${e}rem`;case(n>0&&(u||m!==s.Default)):return e=n+3,`${e}rem`;case n>0:return e+=n*1.5,`${e}rem`;case(u&&m!==s.Default):return"3.5rem";case(m!==s.Default||u):return"2.5rem";default:return e}},Te=()=>!k&&de?"tw-resize-y":"tw-resize-none";return t.jsxs("div",{className:"tw-relative",children:[o?t.jsx("div",{className:D(["tw-absolute tw-top-[0.7rem] tw-left-[0.7rem] tw-z-10",p?l.disabled:"",A?l.readOnly:""]),"data-test-id":`${h}-decorator`,children:o}):null,t.jsx("span",{...he,children:t.jsx(ye,{...a?xe:{rows:z},autoComplete:c?"on":"off",disabled:p,id:je(F),readOnly:A,ref:r,required:ce,defaultValue:E,value:v,placeholder:ie,onBlur:pe,onChange:q,onClick:()=>{var e;return(e=r.current)==null?void 0:e.focus()},onFocus:e=>{me&&e.target.select(),M&&M(e)},onKeyDown:be,"data-test-id":h,className:D([S?"":l.width,z?"":l.height,l.disabled,l.readOnly,l.element,l.base,l.focus,l.hover,ve&&ke,m!==s.Default&&ze[m],o?"tw-pl-[2rem]":"",Te()]),style:{paddingRight:we()},...fe})}),t.jsxs("span",{className:D(["tw-absolute tw-top-[0.5rem] tw-right-[0rem] tw-flex tw-items-center tw-justify-between tw-w-auto",a?"tw-pr-2":"tw-pr-5"]),children:[t.jsx(Ce,{clearable:u,disabled:k,callbacks:{clearable:ge},dataTestId:h}),i?t.jsx(Ie,{actions:i,disabled:k,dataTestId:h}):null,m?Ve(m,h):null]})]})};C.displayName="FondueTextarea";C.__docgenInfo={description:"@deprecated Please use updated Textarea component from `@frontify/fondue/components` instead.",methods:[],displayName:"FondueTextarea",props:{autosize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},focusOnMount:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},resizable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selectable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},defaultValue:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onEnterPressed:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onKeyDown:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: KeyboardEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"KeyboardEvent",elements:[{name:"HTMLTextAreaElement"}],raw:"KeyboardEvent<HTMLTextAreaElement>"},name:"event"}],return:{name:"void"}}},description:""},clearable:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},extraActions:{defaultValue:{value:"undefined",computed:!0},required:!1},status:{defaultValue:{value:"Validation.Default",computed:!0},required:!1},"data-test-id":{defaultValue:{value:"'fondue-textarea'",computed:!1},required:!1}}};const ue=[{icon:t.jsx(Fe,{}),title:"Save to Clipboard",callback:()=>{alert("Mock Copied to Clipboard")}},{icon:t.jsx(Se,{}),title:"Help Desk",callback:()=>alert("Here to Help")}],ot={title:"Legacy Components/Textarea",component:C,tags:["autodocs"],argTypes:{autosize:{type:"boolean",description:"If `true`, component rendered is a auto sizing Textarea",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},autocomplete:{type:"boolean",description:"If `true`, Textarea will have `autoComplete` functionality",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},clearable:{type:"boolean",description:"Render `clear` button to clear input on click",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},decorator:{description:"A `ReactElement` that will be rendered at the start of the `Textarea`",table:{type:{summary:"ReactElement | undefined"},defaultValue:{summary:void 0}}},defaultValue:{type:"string",description:"Initial value",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},value:{type:"string",description:"Value set by parent",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},disabled:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},extraActions:{description:"Collection of extra actions the input can preform",table:{type:{summary:"ExtraAction[] | undefined"},defaultValue:{summary:void 0}}},focusOnMount:{type:"boolean",description:"If `true`, Textarea will be focused on mount",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},minRows:{type:"number",description:"If `autosize` is false, this is used as `rows` property for default textarea",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},maxRows:{type:"number",defaultValue:void 0,description:"If `autosize` is false, this property is ignored",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},placeholder:{type:"string",description:"Placeholder text",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},readOnly:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},resizable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},selectable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},status:{control:{type:"select"},options:Object.values(s),defaultValue:s.Default,description:"The current `Validation` status of the input and will trigger the corresponding `icon` to be appended to the `Textarea`",table:{type:{summary:"Validation | undefined"},defaultValue:{summary:"Validation.Default"}}},onChange:{action:"onChange",type:"function",description:"Callback function to return current value on the `Textarea`",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onEnterPressed:{action:"onEnterPressed",description:"Callback function to return current value on the `Textarea` when `enter` key id pressed",type:"function",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onKeyDown:{action:"onKeyDown",description:"Callback function that is called on every `keydown` event",type:"function",table:{type:{summary:"((event: KeyboardEvent<HTMLTextAreaElement>) => void) | undefined"},defaultValue:{summary:void 0}}},onBlur:{action:"onBlur",description:"Callback function that is called when `Textarea` is unfocused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}},onFocus:{action:"onFocus",description:"Callback function that is called when `Textarea` is focused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}}},args:{autosize:!1,autocomplete:!1,clearable:!1,disabled:!1,focusOnMount:!1,readOnly:!1,resizable:!1,selectable:!1,status:s.Default},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Textarea component](/docs/current_components-textarea--documentation) instead."}}}},f=c=>{const{value:a}=c,[u,o]=d.useState(a??void 0);return d.useEffect(()=>{a&&o(a)},[a,o]),t.jsx(se,{className:"tw-w-4/5 tw-ml-auto tw-mr-auto",children:t.jsx(C,{...c,onChange:o,value:u})})},I=f.bind({}),b=f.bind({});b.args={autosize:!0,decorator:t.jsx(Be,{})};const g=f.bind({});g.args={defaultValue:"I am some initialized texts to start the input."};const x=f.bind({});x.args={extraActions:ue,placeholder:"Enter some long form text here",clearable:!0};const w=f.bind({});w.args={extraActions:ue,placeholder:"Enter some long form text here",clearable:!0,autosize:!0};const T=f.bind({});T.args={focusOnMount:!0};const V=c=>{const[a,u]=d.useState(void 0),[o,E]=d.useState(void 0),p=160,i=o?o.length:0,y=d.useCallback(()=>{i===0?u(void 0):i>p?u(s.Error):(!a||a===s.Error)&&u(s.Success)},[i,a]),S=F=>{E(F)};return d.useEffect(()=>{y()},[o,y]),t.jsx(se,{className:"tw-w-4/5 tw-ml-auto tw-mr-auto",children:t.jsx(Ee,{label:{text:"Label from the FormField",secondaryLabel:`${i}/${p}`},error:a===s.Error,errorText:`Text can not be more than ${p} long.`,helperText:"Please enter a short description of your favorite Fondue component",children:t.jsx(C,{...c,onChange:S,value:o,status:a,autosize:!0})})})};V.__docgenInfo={description:"",methods:[],displayName:"WithFormFieldCombination"};var O,$,L;I.parameters={...I.parameters,docs:{...(O=I.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(L=($=I.parameters)==null?void 0:$.docs)==null?void 0:L.source}}};var W,R,_;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(_=(R=b.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var H,P,K;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(K=(P=g.parameters)==null?void 0:P.docs)==null?void 0:K.source}}};var G,U,Q;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(Q=(U=x.parameters)==null?void 0:U.docs)==null?void 0:Q.source}}};var Y,J,X;w.parameters={...w.parameters,docs:{...(Y=w.parameters)==null?void 0:Y.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(X=(J=w.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var Z,ee,te;T.parameters={...T.parameters,docs:{...(Z=T.parameters)==null?void 0:Z.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(te=(ee=T.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,ne,re;V.parameters={...V.parameters,docs:{...(ae=V.parameters)==null?void 0:ae.docs,source:{originalSource:`args => {
  const [currentStatus, setCurrentStatus] = useState<Validation | undefined>(undefined);
  const [input, setInput] = useState<string | undefined>(undefined);
  const maxChars = 160;
  const currentChars = input ? input.length : 0;
  const handleValidation = useCallback(() => {
    if (currentChars === 0) {
      setCurrentStatus(undefined);
    } else if (currentChars > maxChars) {
      setCurrentStatus(Validation.Error);
    } else if (!currentStatus || currentStatus === Validation.Error) {
      setCurrentStatus(Validation.Success);
    }
  }, [currentChars, currentStatus]);
  const handleOnChange = (value?: string) => {
    setInput(value);
  };
  useEffect(() => {
    handleValidation();
  }, [input, handleValidation]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <FormField label={{
      text: 'Label from the FormField',
      secondaryLabel: \`\${currentChars}/\${maxChars}\`
    }} error={currentStatus === Validation.Error} errorText={\`Text can not be more than \${maxChars} long.\`} helperText="Please enter a short description of your favorite Fondue component">
                <Textarea {...args} onChange={handleOnChange} value={input} status={currentStatus} autosize />
            </FormField>
        </Box>;
}`,...(re=(ne=V.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};const ut=["Default","WithDecoratorAndAutosize","WithDefaultText","WithExtraActions","WithExtraActionsAndAutosize","WithFocusOnMount","WithFormFieldCombination"];export{I as Default,b as WithDecoratorAndAutosize,g as WithDefaultText,x as WithExtraActions,w as WithExtraActionsAndAutosize,T as WithFocusOnMount,V as WithFormFieldCombination,ut as __namedExportsOrder,ot as default};
