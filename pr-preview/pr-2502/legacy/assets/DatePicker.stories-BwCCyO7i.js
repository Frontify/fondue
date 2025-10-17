import{r as c,j as e}from"./iframe-DZsoqIQH.js";import{b as z,B as q,a as G}from"./Badge-Cc5Ol640.js";import{B as h}from"./Button-DjeFZAKL.js";import{F as J}from"./FormControl-jeH6ufrc.js";import{D,s as f,I as L,a as Q}from"./DatePicker-exMruW3T.js";import{V as X}from"./validation-C9S5KgfE.js";import"./preload-helper-B933Jwna.js";import"./IconCross-DPfWkxZJ.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./colors-cqDZVL9s.js";import"./useButton-BxuZFr2v.js";import"./useFocusable-w9vBw5vf.js";import"./useFocusRing-DbKjnAj0.js";import"./useEffectEvent-D8w6sK6J.js";import"./chain-VSjaRpoC.js";import"./index-B1yy6L_0.js";import"./InputLabel-CkXbkHdM.js";import"./TooltipIcon-CjIWgR0R.js";import"./LegacyTooltip-ClEwPHV5.js";import"./useLink-xEXBuUvC.js";import"./usePopper-BgKvnTxb.js";import"./index-Bz3rgcYf.js";import"./Portal-CN1TagRk.js";import"./useMemoizedId-Bl8d1xLN.js";import"./IconCheckMark-BHBJzH8F.js";import"./IconExclamationMarkCircle24-DDwDRcD9.js";import"./IconExclamationMarkTriangle-BqNXwrRl.js";import"./IconExclamationMarkTriangle24-C0GN7WvG.js";import"./IconQuestionMarkCircle-CkUpDNDy.js";import"./floating-ui.dom-BeV4s8NL.js";import"./IconCaretRight-yQdL4g0O.js";import"./TextInput-BsRYT8lu.js";import"./LoadingCircle-fy3UZfJY.js";import"./IconCaretDown-DmwJmvvT.js";import"./IconCaretDown16-Dvjt7Ada.js";import"./IconCaretUp-DBXwaRnk.js";const Ee={title:"Components/DatePicker",component:D,tags:["autodocs"],args:{dateFormat:"MMM dd, yyyy"},argTypes:{validation:{options:Object.values(X),control:{type:"select"}},isClearable:{defaultValue:!1,control:{type:"boolean"}},shouldCloseOnSelect:{defaultValue:!1,control:{type:"boolean"}},hasPopperArrow:{defaultValue:!0,control:{type:"boolean"}},preventOpenOnFocus:{defaultValue:!1,control:{type:"boolean"}},inline:{defaultValue:!1,control:{type:"boolean"}},fixedHeight:{defaultValue:!0,control:{type:"boolean"}},hugWidth:{defaultValue:!0,control:{type:"boolean"}}}},g=a=>{const[s,t]=c.useState();return e.jsx(D,{...a,variant:"single",startDate:null,endDate:null,value:s,onChange:n=>t(n)})},Y=a=>{const[s,t]=c.useState();return e.jsx("div",{className:"tw-flex tw-flex-col",children:e.jsx("div",{className:"tw-flex tw-flex-row tw-justify-between",children:e.jsx("div",{className:"tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3",children:e.jsx(J,{children:e.jsx(D,{...a,variant:"single",startDate:null,endDate:null,value:s,onChange:n=>t(n)})})})})})},o=g.bind({});o.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};o.storyName="Date Picker";const l=g.bind({});l.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,customHeader:e.jsxs("div",{className:"tw-flex tw-gap-2 tw-grow",children:[e.jsx(h,{hugWidth:!1,children:"30d"}),e.jsx(h,{hugWidth:!1,children:"90d"}),e.jsx(h,{hugWidth:!1,children:"365d"})]})};l.storyName="Date Picker with custom header";const i=g.bind({});i.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,minDate:f(new Date,5),maxDate:Q(new Date,5)};const u=Y.bind({});u.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};const v={day:"numeric",month:"short",year:"numeric"},Z=()=>{const[a,s]=c.useState(f(new Date,40)),[t,n]=c.useState(new Date),U=r=>{if(!r)return;const[p,_]=r;s(p),n(_)},b=c.useRef(null);return e.jsx(D,{value:t,startDate:a,endDate:t,onChange:U,onOpen:()=>{var r;(r=b.current)==null||r.setPreSelection(new Date)},onClose:()=>console.log("close"),onBlur:()=>console.log("blur"),minDate:f(new Date,40),maxDate:new Date,variant:"range",ref:b,onKeyDown:r=>{var p;r.code==="Tab"&&r.shiftKey&&((p=b.current)==null||p.setOpen(!1))},preventOpenOnFocus:!0,customTrigger:e.jsxs("button",{type:"button",className:"tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2",children:[e.jsx(L,{}),"Date:",e.jsxs(z,{style:G.Progress,emphasis:q.Strong,size:"small",children:[new Intl.DateTimeFormat("en-US",v).format(a||new Date)," -"," ",new Intl.DateTimeFormat("en-US",v).format(t||new Date)]})]}),hasPopperArrow:!1,children:a&&t&&e.jsxs("div",{children:[e.jsx("div",{className:"tw-border-t tw-w-full tw-border-solid tw-border-line"}),e.jsx("div",{className:"tw-p-2",children:e.jsx("button",{type:"button",className:`tw-bg-button-background tw-border-button-border tw-w-full
                                   hover:tw-bg-button-background-hover tw-rounded
                                   active:tw-bg-button-background-pressed tw-px-4 tw-h-9 tw-text-body-medium`,children:"Reset"})})]})})},w=Z.bind({}),$=a=>{const[s,t]=c.useState();return e.jsx("div",{className:"tw-w-[500px]",children:e.jsx(D,{...a,variant:"single",startDate:null,endDate:null,value:s,onChange:n=>t(n)})})},m=$.bind({});m.args={inline:!0};const d=g.bind({});d.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,hugWidth:!1};d.storyName="Full Width";var S,x,y;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(y=(x=o.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var P,C,k;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(k=(C=l.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var j,O,N;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(N=(O=i.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var F,R,W;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <div className="tw-flex tw-flex-col">
            <div className="tw-flex tw-flex-row tw-justify-between">
                <div className="tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3">
                    <FormControl>
                        <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />
                    </FormControl>
                </div>
            </div>
        </div>;
}`,...(W=(R=u.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var B,T,I;w.parameters={...w.parameters,docs:{...(B=w.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 40));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const onChange = (dates: [Date | null, Date | null] | null) => {
    if (!dates) {
      return;
    }
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const datePickerRef = useRef<ReactDatePickerRef>(null);
  return <DatePicker value={endDate} startDate={startDate} endDate={endDate} onChange={onChange} onOpen={() => {
    (datePickerRef.current as any)?.setPreSelection(new Date());
  }} onClose={() => console.log('close')} onBlur={() => console.log('blur')} minDate={subDays(new Date(), 40)} maxDate={new Date()} variant="range" ref={datePickerRef} onKeyDown={e => {
    if (e.code === 'Tab' && e.shiftKey) {
      datePickerRef.current?.setOpen(false);
    }
  }} preventOpenOnFocus customTrigger={<button type="button" className="tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2">
                    <IconCalendar16 />
                    Date:
                    <Badge style={BadgeStyle.Progress} emphasis={BadgeEmphasis.Strong} size="small">
                        {new Intl.DateTimeFormat('en-US', formatOptions).format(startDate || new Date())} -{' '}
                        {new Intl.DateTimeFormat('en-US', formatOptions).format(endDate || new Date())}
                    </Badge>
                </button>} hasPopperArrow={false}>
            {startDate && endDate && <div>
                    <div className="tw-border-t tw-w-full tw-border-solid tw-border-line" />
                    <div className="tw-p-2">
                        <button type="button" className="tw-bg-button-background tw-border-button-border tw-w-full
                                   hover:tw-bg-button-background-hover tw-rounded
                                   active:tw-bg-button-background-pressed tw-px-4 tw-h-9 tw-text-body-medium">
                            Reset
                        </button>
                    </div>
                </div>}
        </DatePicker>;
}`,...(I=(T=w.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var H,V,E;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <div className="tw-w-[500px]">
            <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />
        </div>;
}`,...(E=(V=m.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var A,M,K;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(K=(M=d.parameters)==null?void 0:M.docs)==null?void 0:K.source}}};const Ae=["Default","DatePickerWithCustomHeader","DatePickerWithMinAndMaxDates","InsideFormControlAndOverSegmentedControls","DateRange","Inline","FullWidth"];export{l as DatePickerWithCustomHeader,i as DatePickerWithMinAndMaxDates,w as DateRange,o as Default,d as FullWidth,m as Inline,u as InsideFormControlAndOverSegmentedControls,Ae as __namedExportsOrder,Ee as default};
