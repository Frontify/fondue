import{r as y,j as t}from"./iframe-BdpEJ73u.js";import{I as l}from"./IconIcon-DninGn3h.js";import{I as Ie}from"./IconSize-BcCrF_mi.js";import{V as P}from"./validation-C9S5KgfE.js";import{a as T,T as he}from"./TextInput-wgiRUPvd.js";import{F as ve}from"./FormField-DH22TTgT.js";import"./preload-helper-MprHWY6w.js";import"./IconIcon16-BoznwXcv.js";import"./IconIcon24-m8JrQ1p_.js";import"./useFocusRing-BoREWGHn.js";import"./useEffectEvent-BtbNxUmw.js";import"./LoadingCircle-iQPwxUq0.js";import"./merge-DI-veSMP.js";import"./IconCheckMark-JGl78NQC.js";import"./IconCross-2s4J7Pvo.js";import"./IconExclamationMarkTriangle-BCFecG3K.js";import"./IconExclamationMarkTriangle24-DDeoj2zf.js";import"./useMemoizedId-CroDTlnv.js";import"./focusStyle-Ch_WJ4aJ.js";import"./LegacyTooltip-ChszLcz-.js";import"./useLink-hiDguVaH.js";import"./useFocusable-dja3mNt3.js";import"./chain-CSPh-k5E.js";import"./index-CkqZHkB8.js";import"./usePopper-DodwAGz1.js";import"./index-DjmiaQRC.js";import"./Button-CyrRRo22.js";import"./useButton-CzTp58mm.js";import"./Portal-DcQaeB9f.js";import"./IconExclamationMarkCircle24-oCV7DLvN.js";import"./VisuallyHidden-BSXfnwic.js";import"./Tooltip-BeCtgi9G.js";import"./useClickOutside-yhAcwUeS.js";import"./EnablePortalWrapper-C1kCJOjn.js";import"./elements-BOYmskOL.js";import"./dialog-D9O7a7Fm.js";import"./input-CiV_SEfN.js";import"./Divider-6_usVKa3.js";import"./FormControl-BFo-JPTy.js";import"./InputLabel-DebL1FVz.js";import"./TooltipIcon-DKBgdncx.js";import"./IconQuestionMarkCircle-yKiZOJks.js";import"./Switch-Cs2uWJoh.js";import"./TabItem-7kIsjaIc.js";import"./Tree-CeZOBO5O.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-M8Uz0PUR.js";import"./IconCaretDown-DjMqE6GK.js";import"./IconCaretDown16-BPKmHEp2.js";import"./IconTrashBin16-D1isIcK9.js";import"./IconTrashBin24-CFqe0mJW.js";const{action:F}=__STORYBOOK_MODULE_ACTIONS__,ht={title:"Components/Text Input",component:he,tags:["autodocs"],args:{clearable:!1,disabled:!1,required:!1,autocomplete:!1,readonly:!1,dotted:!1,type:T.Text,validation:P.Default,spellcheck:!0,copyable:!1},argTypes:{validation:{options:Object.values(P),control:{type:"select"}},spellcheck:{options:[void 0,!0,!1],control:{type:"select"}},placeholder:{type:"string"},maxLength:{type:"number"},disabled:{control:{type:"boolean"},defaultValue:!1},readonly:{control:{type:"boolean"},defaultValue:!1},value:{table:{disable:!0}},obfuscated:{table:{disable:!0}},type:{table:{disable:!0}},decorator:{table:{disable:!0}},onInput:{table:{disable:!0},action:"onInput"},onBlur:{table:{disable:!0},action:"onBlur"},onClear:{table:{disable:!0},action:"onClear"},onFocus:{table:{disable:!0},action:"onFocus"}},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new TextInput component](/docs/current_components-text-input--documentation) instead."}}}},e=h=>{const[Fe,S]=y.useState("");return y.useEffect(()=>S(`${h.value??""}`),[h.value]),t.jsx(ve,{disabled:h.disabled,label:{text:"sample"},hiddenLabel:!0,children:t.jsx(he,{...h,value:Fe,onChange:S})})},i=e.bind({});i.argTypes={value:{table:{disable:!1},type:"string"}};const p=e.bind({});p.args={value:"Value text"};const u=e.bind({});u.args={placeholder:"Placeholder text"};const d=e.bind({});d.args={value:"Value text",decorator:t.jsx(l,{size:Ie.Size16})};const c=e.bind({});c.args={maxLength:10};const m=e.bind({});m.args={value:"This a disabled input",disabled:!0};const g=e.bind({});g.args={decorator:"X",placeholder:"Placeholder text"};const v={obfuscated:{control:{type:"boolean"},table:{disable:!1}}},f={type:T.Password,value:"Secret"},a=e.bind({});a.argTypes=v;a.args={...f};const r=e.bind({});r.argTypes=v;r.args={...f,decorator:t.jsx(l,{size:Ie.Size16})};const s=e.bind({});s.argTypes=v;s.args={...f,decorator:"P"};const n=e.bind({});n.argTypes=v;n.args={...f,obfuscated:!1};const o=e.bind({});o.argTypes={value:{table:{disable:!1},type:"number"}};o.args={type:T.Number};const b=e.bind({});b.args={value:"Value text",selectable:!0};const x=e.bind({});x.args={value:"Value text",extraActions:[{title:"Extra action A",onClick:F("extraActionA"),icon:t.jsx(l,{})},{title:"Extra action B",onClick:F("extraActionB"),icon:t.jsx(l,{})}]};const I=e.bind({});I.args={value:"Value text",extraActions:[{title:"First extra action",onClick:F("extraAction1"),icon:t.jsx(l,{}),tooltip:{content:"First extra action tooltip content",withArrow:!0}},{title:"Second extra action",onClick:F("extraAction2"),icon:t.jsx(l,{}),tooltip:{content:"Second extra action tooltip content",withArrow:!0}}]};var C,E,L;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(L=(E=i.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var W,A,w;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(w=(A=p.parameters)==null?void 0:A.docs)==null?void 0:w.source}}};var $,D,j;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(j=(D=u.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var V,_,O;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(O=(_=d.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var k,z,B;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(B=(z=c.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var N,M,R;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(R=(M=m.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var q,K,U;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(U=(K=g.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var X,Y,G;a.parameters={...a.parameters,docs:{...(X=a.parameters)==null?void 0:X.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(G=(Y=a.parameters)==null?void 0:Y.docs)==null?void 0:G.source}}};var H,J,Q;r.parameters={...r.parameters,docs:{...(H=r.parameters)==null?void 0:H.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(Q=(J=r.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Z,ee,te;s.parameters={...s.parameters,docs:{...(Z=s.parameters)==null?void 0:Z.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(te=(ee=s.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,re,se;n.parameters={...n.parameters,docs:{...(ae=n.parameters)==null?void 0:ae.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(se=(re=n.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ne,oe,le;o.parameters={...o.parameters,docs:{...(ne=o.parameters)==null?void 0:ne.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(le=(oe=o.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ie,pe,ue;b.parameters={...b.parameters,docs:{...(ie=b.parameters)==null?void 0:ie.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(ue=(pe=b.parameters)==null?void 0:pe.docs)==null?void 0:ue.source}}};var de,ce,me;x.parameters={...x.parameters,docs:{...(de=x.parameters)==null?void 0:de.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(me=(ce=x.parameters)==null?void 0:ce.docs)==null?void 0:me.source}}};var ge,be,xe;I.parameters={...I.parameters,docs:{...(ge=I.parameters)==null?void 0:ge.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(xe=(be=I.parameters)==null?void 0:be.docs)==null?void 0:xe.source}}};const Ft=["Text","Prefilled","WithPlaceholder","WithIconDecorator","WithMaxLength","Disabled","WithCharacterDecorator","Password","PasswordWithIconDecorator","PasswordWithCharacterDecorator","PasswordVisible","TypeNumber","SelectableInput","WithExtraActions","WithExtraActionWithTooltip"];export{m as Disabled,a as Password,n as PasswordVisible,s as PasswordWithCharacterDecorator,r as PasswordWithIconDecorator,p as Prefilled,b as SelectableInput,i as Text,o as TypeNumber,g as WithCharacterDecorator,I as WithExtraActionWithTooltip,x as WithExtraActions,d as WithIconDecorator,c as WithMaxLength,u as WithPlaceholder,Ft as __namedExportsOrder,ht as default};
