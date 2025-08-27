import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as c}from"./index-B2-qRKKC.js";import{b as K,B as U,a as _}from"./Badge-DCrYCtEj.js";import{c as g}from"./Button-BhpRDDwF.js";import{F as z}from"./FormControl-zCS9f8-Z.js";import{D as m,s as b,I as V,a as q}from"./DatePicker-CCJsnVly.js";import{V as G}from"./validation-CJXPAjNB.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./IconCross-DWAMoEGy.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-BtNTXUM4.js";import"./merge-DI-veSMP.js";import"./colors-cqDZVL9s.js";import"./useButton-CoG0sslk.js";import"./useFocusable-CKeIV6w5.js";import"./useFocusRing-DYm6KDop.js";import"./useEffectEvent-BOE4tD14.js";import"./chain-z5L_5vtA.js";import"./index-CFX93qP1.js";import"./InputLabel-b0eYxraM.js";import"./TooltipIcon-m4kEMbWe.js";import"./LegacyTooltip-DIy9iZdG.js";import"./useLink-isS_9sO9.js";import"./usePopper-jmXS5rjc.js";import"./index-DlnOb27V.js";import"./Portal-CuQPhhwF.js";import"./useMemoizedId-BB39KVn8.js";import"./IconCheckMark-Db5JnUcj.js";import"./IconExclamationMarkCircle24-DMv0ETG3.js";import"./IconExclamationMarkTriangle-BrhtYKnY.js";import"./IconExclamationMarkTriangle24-DvJpj6jb.js";import"./IconQuestionMarkCircle-DkhS77IB.js";import"./floating-ui.dom-BeV4s8NL.js";import"./IconCaretRight-DMA6RW71.js";import"./TextInput-zlbBzSP9.js";import"./LoadingCircle-DyxURJrK.js";import"./IconCaretDown-CAp4CI-i.js";import"./IconCaretDown16-CINgO7jA.js";import"./IconCaretUp-UZkBSE-H.js";const We={title:"Components/DatePicker",component:m,tags:["autodocs"],args:{dateFormat:"MMM dd, yyyy"},argTypes:{validation:{options:Object.values(G),control:{type:"select"}}}},h=a=>{const[s,t]=c.useState();return e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:s,onChange:n=>t(n)})},J=a=>{const[s,t]=c.useState();return e.jsx("div",{className:"tw-flex tw-flex-col",children:e.jsx("div",{className:"tw-flex tw-flex-row tw-justify-between",children:e.jsx("div",{className:"tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3",children:e.jsx(z,{children:e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:s,onChange:n=>t(n)})})})})})},o=h.bind({});o.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};o.storyName="Date Picker";const l=h.bind({});l.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,customHeader:e.jsxs("div",{className:"tw-flex tw-gap-2 tw-grow",children:[e.jsx(g,{hugWidth:!1,children:"30d"}),e.jsx(g,{hugWidth:!1,children:"90d"}),e.jsx(g,{hugWidth:!1,children:"365d"})]})};l.storyName="Date Picker with custom header";const d=h.bind({});d.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,minDate:b(new Date,5),maxDate:q(new Date,5)};const i=J.bind({});i.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};const f={day:"numeric",month:"short",year:"numeric"},L=()=>{const[a,s]=c.useState(b(new Date,40)),[t,n]=c.useState(new Date),M=r=>{if(!r)return;const[D,A]=r;s(D),n(A)},w=c.useRef(null);return e.jsx(m,{value:t,startDate:a,endDate:t,onChange:M,onOpen:()=>{var r;(r=w.current)==null||r.setPreSelection(new Date)},onClose:()=>console.log("close"),onBlur:()=>console.log("blur"),minDate:b(new Date,40),maxDate:new Date,variant:"range",ref:w,onKeyDown:r=>{var D;r.code==="Tab"&&r.shiftKey&&((D=w.current)==null||D.setOpen(!1))},preventOpenOnFocus:!0,customTrigger:e.jsxs("button",{type:"button",className:"tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2",children:[e.jsx(V,{}),"Date:",e.jsxs(K,{style:_.Progress,emphasis:U.Strong,size:"small",children:[new Intl.DateTimeFormat("en-US",f).format(a||new Date)," -"," ",new Intl.DateTimeFormat("en-US",f).format(t||new Date)]})]}),hasPopperArrow:!1,children:a&&t&&e.jsxs("div",{children:[e.jsx("div",{className:"tw-border-t tw-w-full tw-border-solid tw-border-line"}),e.jsx("div",{className:"tw-p-2",children:e.jsx("button",{type:"button",className:`tw-bg-button-background tw-border-button-border tw-w-full
                                   hover:tw-bg-button-background-hover tw-rounded
                                   active:tw-bg-button-background-pressed tw-px-4 tw-h-9 tw-text-body-medium`,children:"Reset"})})]})})},p=L.bind({}),Q=a=>{const[s,t]=c.useState();return e.jsx("div",{className:"tw-w-[500px]",children:e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:s,onChange:n=>t(n)})})},u=Q.bind({});u.args={inline:!0};var v,x,S;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(S=(x=o.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var P,y,C;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(C=(y=l.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var k,j,N;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(N=(j=d.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var O,R,F;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`(args: DatePickerProps) => {
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
}`,...(F=(R=i.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};var T,B,I;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
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
}`,...(I=(B=p.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var W,E,H;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <div className="tw-w-[500px]">
            <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />
        </div>;
}`,...(H=(E=u.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};const Ee=["Default","DatePickerWithCustomHeader","DatePickerWithMinAndMaxDates","InsideFormControlAndOverSegmentedControls","DateRange","Inline"];export{l as DatePickerWithCustomHeader,d as DatePickerWithMinAndMaxDates,p as DateRange,o as Default,u as Inline,i as InsideFormControlAndOverSegmentedControls,Ee as __namedExportsOrder,We as default};
