import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as c}from"./index-ClcD9ViR.js";import{B as se}from"./Box-DAnyNXqQ.js";import{F as Ce,I as Ve,a as Te}from"./FormField-BNaIy6uC.js";import{I as Ee}from"./IconClipboard16-CPE6JlPb.js";import{a as Ie,V as r}from"./validation-CJXPAjNB.js";import{$ as Se}from"./useFocusRing-DlZ7W1lC.js";import{i as Fe}from"./react-textarea-autosize.browser.esm-C6BrUbjJ.js";import{u as Ae}from"./useMemoizedId-BicaxHcO.js";import{F as ze}from"./focusStyle-BtNTXUM4.js";import{I as l,G as je,a as ke,b as De}from"./input-D7vN_aA3.js";import{m as B}from"./merge-DI-veSMP.js";import{u as Be}from"./Button-DyWS8jND.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./VisuallyHidden-DKeI02Ih.js";import"./useFocusable-tbSHi6HF.js";import"./chain-DIgLrs-2.js";import"./useEffectEvent-sx_rQw4H.js";import"./index-Cho7bklK.js";import"./useClickOutside-BcVMXM8r.js";import"./Overlay-BbFuegQB.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./EnablePortalWrapper-DHpdIRHB.js";import"./Portal-B3A1C5qZ.js";import"./elements-BOYmskOL.js";import"./generateRandomId-Dxm0_E-2.js";import"./LoadingCircle-DNdkLylS.js";import"./IconCheckMark16-BSi_kkf1.js";import"./IconCross16-BshCNAKj.js";import"./IconExclamationMarkTriangle16-DGaIrm4W.js";import"./IconEyeOff16-C861zzFg.js";import"./useButton-4BonjH6T.js";import"./IconSize-BcCrF_mi.js";const T=({autocomplete:p,autosize:a=!1,clearable:o=!1,decorator:s,defaultValue:I,disabled:m=!1,extraActions:i=void 0,focusOnMount:y=!1,hugWidth:S,id:F,minRows:A,maxRows:oe,placeholder:le,readOnly:z,resizable:ie=!1,required:de,selectable:ce=!1,status:d=r.Default,value:v,onBlur:me,onChange:j,onEnterPressed:N,onKeyDown:k,onFocus:O,"data-test-id":b="fondue-textarea",...pe})=>{const fe=a?Fe:"textarea",n=Be(null),D=m||z,{isFocusVisible:ye,focusProps:ve}=Se({isTextInput:!0,within:!0}),M=()=>{if(n.current){const{value:e}=n.current;j==null||j(e)}},be=e=>{var u;N&&e.key==="Enter"?N((u=n.current)==null?void 0:u.value):k==null||k(e)},ge=()=>{n.current&&(n.current.value="",M())};c.useEffect(()=>{var e;y&&((e=n.current)==null||e.focus())},[y,n]),c.useEffect(()=>{var u;const e=v!==((u=n.current)==null?void 0:u.value);n.current&&v&&!e&&(n.current.value=v)},[v,n]);const he={minRows:A,maxRows:oe},xe=()=>{let e=1;const u=i?i.length:0;switch(!0){case(u>0&&o&&d!==r.Default):return e=u+4.5,`${e}rem`;case(u>0&&(o||d!==r.Default)):return e=u+3,`${e}rem`;case u>0:return e+=u*1.5,`${e}rem`;case(o&&d!==r.Default):return"3.5rem";case(d!==r.Default||o):return"2.5rem";default:return e}},we=()=>!D&&ie?"tw-resize-y":"tw-resize-none";return t.jsxs("div",{className:"tw-relative",children:[s?t.jsx("div",{className:B(["tw-absolute tw-top-[0.7rem] tw-left-[0.7rem] tw-z-10",m?l.disabled:"",z?l.readOnly:""]),"data-test-id":`${b}-decorator`,children:s}):null,t.jsx("span",{...ve,children:t.jsx(fe,{...a?he:{rows:A},autoComplete:p?"on":"off",disabled:m,id:Ae(F),readOnly:z,ref:n,required:de,defaultValue:I,value:v,placeholder:le,onBlur:me,onChange:M,onClick:()=>{var e;return(e=n.current)==null?void 0:e.focus()},onFocus:e=>{ce&&e.target.select(),O&&O(e)},onKeyDown:be,"data-test-id":b,className:B([S?"":l.width,A?"":l.height,l.disabled,l.readOnly,l.element,l.base,l.focus,l.hover,ye&&ze,d!==r.Default&&Ie[d],s?"tw-pl-[2rem]":"",we()]),style:{paddingRight:xe()},...pe})}),t.jsxs("span",{className:B(["tw-absolute tw-top-[0.5rem] tw-right-[0rem] tw-flex tw-items-center tw-justify-between tw-w-auto",a?"tw-pr-2":"tw-pr-5"]),children:[t.jsx(ke,{clearable:o,disabled:D,callbacks:{clearable:ge},dataTestId:b}),i?t.jsx(De,{actions:i,disabled:D,dataTestId:b}):null,d?je(d,b):null]})]})};T.displayName="FondueTextarea";T.__docgenInfo={description:"",methods:[],displayName:"FondueTextarea",props:{autosize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},focusOnMount:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},resizable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selectable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},defaultValue:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onEnterPressed:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onKeyDown:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: KeyboardEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"KeyboardEvent",elements:[{name:"HTMLTextAreaElement"}],raw:"KeyboardEvent<HTMLTextAreaElement>"},name:"event"}],return:{name:"void"}}},description:""},clearable:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},extraActions:{defaultValue:{value:"undefined",computed:!0},required:!1},status:{defaultValue:{value:"Validation.Default",computed:!0},required:!1},"data-test-id":{defaultValue:{value:"'fondue-textarea'",computed:!1},required:!1}}};const ue=[{icon:t.jsx(Ee,{}),title:"Save to Clipboard",callback:()=>{alert("Mock Copied to Clipboard")}},{icon:t.jsx(Te,{}),title:"Help Desk",callback:()=>alert("Here to Help")}],yt={title:"Legacy Components/Textarea",component:T,tags:["autodocs"],argTypes:{autosize:{type:"boolean",description:"If `true`, component rendered is a auto sizing Textarea",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},autocomplete:{type:"boolean",description:"If `true`, Textarea will have `autoComplete` functionality",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},clearable:{type:"boolean",description:"Render `clear` button to clear input on click",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},decorator:{description:"A `ReactElement` that will be rendered at the start of the `Textarea`",table:{type:{summary:"ReactElement | undefined"},defaultValue:{summary:void 0}}},defaultValue:{type:"string",description:"Initial value",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},value:{type:"string",description:"Value set by parent",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},disabled:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},extraActions:{description:"Collection of extra actions the input can preform",table:{type:{summary:"ExtraAction[] | undefined"},defaultValue:{summary:void 0}}},focusOnMount:{type:"boolean",description:"If `true`, Textarea will be focused on mount",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},minRows:{type:"number",description:"If `autosize` is false, this is used as `rows` property for default textarea",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},maxRows:{type:"number",defaultValue:void 0,description:"If `autosize` is false, this property is ignored",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},placeholder:{type:"string",description:"Placeholder text",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},readOnly:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},resizable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},selectable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},status:{control:{type:"select"},options:Object.values(r),defaultValue:r.Default,description:"The current `Validation` status of the input and will trigger the corresponding `icon` to be appended to the `Textarea`",table:{type:{summary:"Validation | undefined"},defaultValue:{summary:"Validation.Default"}}},onChange:{action:"onChange",type:"function",description:"Callback function to return current value on the `Textarea`",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onEnterPressed:{action:"onEnterPressed",description:"Callback function to return current value on the `Textarea` when `enter` key id pressed",type:"function",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onKeyDown:{action:"onKeyDown",description:"Callback function that is called on every `keydown` event",type:"function",table:{type:{summary:"((event: KeyboardEvent<HTMLTextAreaElement>) => void) | undefined"},defaultValue:{summary:void 0}}},onBlur:{action:"onBlur",description:"Callback function that is called when `Textarea` is unfocused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}},onFocus:{action:"onFocus",description:"Callback function that is called when `Textarea` is focused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}}},args:{autosize:!1,autocomplete:!1,clearable:!1,disabled:!1,focusOnMount:!1,readOnly:!1,resizable:!1,selectable:!1,status:r.Default}},f=p=>{const{value:a}=p,[o,s]=c.useState(a??void 0);return c.useEffect(()=>{a&&s(a)},[a,s]),t.jsx(se,{className:"tw-w-[80%] tw-ml-auto tw-mr-auto",children:t.jsx(T,{...p,onChange:s,value:o})})},E=f.bind({}),g=f.bind({});g.args={autosize:!0,decorator:t.jsx(Ve,{})};const h=f.bind({});h.args={defaultValue:"I am some initialized texts to start the input."};const x=f.bind({});x.args={extraActions:ue,placeholder:"Enter some long form text here",clearable:!0};const w=f.bind({});w.args={extraActions:ue,placeholder:"Enter some long form text here",clearable:!0,autosize:!0};const C=f.bind({});C.args={focusOnMount:!0};const V=p=>{const[a,o]=c.useState(void 0),[s,I]=c.useState(void 0),m=160,i=s?s.length:0,y=c.useCallback(()=>{i===0?o(void 0):i>m?o(r.Error):(!a||a===r.Error)&&o(r.Success)},[i,a]),S=F=>{I(F)};return c.useEffect(()=>{y()},[s,y]),t.jsx(se,{className:"tw-w-[80%] tw-ml-auto tw-mr-auto",children:t.jsx(Ce,{label:{text:"Label from the FormField",secondaryLabel:`${i}/${m}`},error:a===r.Error,errorText:`Text can not be more than ${m} long.`,helperText:"Please enter a short description of your favorite Fondue component",children:t.jsx(T,{...p,onChange:S,value:s,status:a,autosize:!0})})})};V.__docgenInfo={description:"",methods:[],displayName:"WithFormFieldCombination"};var q,$,W;E.parameters={...E.parameters,docs:{...(q=E.parameters)==null?void 0:q.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(W=($=E.parameters)==null?void 0:$.docs)==null?void 0:W.source}}};var L,R,H;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(H=(R=g.parameters)==null?void 0:R.docs)==null?void 0:H.source}}};var P,_,K;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(K=(_=h.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};var G,Q,U;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(U=(Q=x.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var Y,J,X;w.parameters={...w.parameters,docs:{...(Y=w.parameters)==null?void 0:Y.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(X=(J=w.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var Z,ee,te;C.parameters={...C.parameters,docs:{...(Z=C.parameters)==null?void 0:Z.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(te=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,ne,re;V.parameters={...V.parameters,docs:{...(ae=V.parameters)==null?void 0:ae.docs,source:{originalSource:`args => {
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
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <FormField label={{
      text: 'Label from the FormField',
      secondaryLabel: \`\${currentChars}/\${maxChars}\`
    }} error={currentStatus === Validation.Error} errorText={\`Text can not be more than \${maxChars} long.\`} helperText="Please enter a short description of your favorite Fondue component">
                <Textarea {...args} onChange={handleOnChange} value={input} status={currentStatus} autosize />
            </FormField>
        </Box>;
}`,...(re=(ne=V.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};const vt=["Default","WithDecoratorAndAutosize","WithDefaultText","WithExtraActions","WithExtraActionsAndAutosize","WithFocusOnMount","WithFormFieldCombination"];export{E as Default,g as WithDecoratorAndAutosize,h as WithDefaultText,x as WithExtraActions,w as WithExtraActionsAndAutosize,C as WithFocusOnMount,V as WithFormFieldCombination,vt as __namedExportsOrder,yt as default};
