import{j as e}from"./jsx-runtime-DH9XN8A8.js";import{r as c}from"./index-v7USjxUg.js";import{B as K,a as U,b as _}from"./Badge-BnAKN3ul.js";import{c as g}from"./Button-BfBJpGQT.js";import{F as z}from"./FormControl-DeLflFlr.js";import{D as m,s as h,a as V,I as q}from"./DatePicker-CpAIknRu.js";import{V as G}from"./validation-CJXPAjNB.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./IconCross-LL1GOU_p.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./colors-cqDZVL9s.js";import"./useButton-B6orroTH.js";import"./useFocusable-BRFkliNn.js";import"./useFocusRing-CP9UJNUw.js";import"./useEffectEvent-BaECT7_f.js";import"./chain-C8AhrK0W.js";import"./InputLabel-CAkTbk9Q.js";import"./TooltipIcon-DWdr_hgc.js";import"./LegacyTooltip-BReeJmjq.js";import"./useLink-C2PgwcjG.js";import"./usePopper-BO8FF5JQ.js";import"./index-voQlCD4e.js";import"./index-DlnOb27V.js";import"./Portal-BMcVKwlx.js";import"./useMemoizedId-Cl5PI4eu.js";import"./IconCheckMark-CMS57PRn.js";import"./IconExclamationMarkCircle24-CS86ZjBV.js";import"./IconExclamationMarkTriangle-CTTfs2nR.js";import"./IconExclamationMarkTriangle24-ZUoV6XtQ.js";import"./IconQuestionMarkCircle-DT_LrHkX.js";import"./floating-ui.react-dom-BxmKaMZw.js";import"./IconCaretRight-bL6MdAvD.js";import"./TextInput-DncHZpfW.js";import"./LoadingCircle-BSQayp2F.js";import"./IconCaretDown-BxzyP7sS.js";import"./IconCaretDown16-DV8CvCws.js";import"./IconCaretUp-Uk6-a0cF.js";const We={title:"Components/DatePicker",component:m,tags:["autodocs"],args:{dateFormat:"MMM dd, yyyy"},argTypes:{validation:{options:Object.values(G),control:{type:"select"}}}},b=a=>{const[s,t]=c.useState();return e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:s,onChange:n=>t(n)})},J=a=>{const[s,t]=c.useState();return e.jsx("div",{className:"tw-flex tw-flex-col",children:e.jsx("div",{className:"tw-flex tw-flex-row tw-justify-between",children:e.jsx("div",{className:"tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3",children:e.jsx(z,{children:e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:s,onChange:n=>t(n)})})})})})},o=b.bind({});o.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};o.storyName="Date Picker";const l=b.bind({});l.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,customHeader:e.jsxs("div",{className:"tw-flex tw-gap-2 tw-grow",children:[e.jsx(g,{hugWidth:!1,children:"30d"}),e.jsx(g,{hugWidth:!1,children:"90d"}),e.jsx(g,{hugWidth:!1,children:"365d"})]})};l.storyName="Date Picker with custom header";const d=b.bind({});d.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,minDate:h(new Date,5),maxDate:V(new Date,5)};const i=J.bind({});i.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};const f={day:"numeric",month:"short",year:"numeric"},L=()=>{const[a,s]=c.useState(h(new Date,40)),[t,n]=c.useState(new Date),M=r=>{if(!r)return;const[D,A]=r;s(D),n(A)},w=c.useRef(null);return e.jsx(m,{value:t,startDate:a,endDate:t,onChange:M,onOpen:()=>{var r;(r=w.current)==null||r.setPreSelection(new Date)},onClose:()=>console.log("close"),onBlur:()=>console.log("blur"),minDate:h(new Date,40),maxDate:new Date,variant:"range",ref:w,onKeyDown:r=>{var D;r.code==="Tab"&&r.shiftKey&&((D=w.current)==null||D.setOpen(!1))},preventOpenOnFocus:!0,customTrigger:e.jsxs("button",{className:"tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2",children:[e.jsx(q,{}),"Date:",e.jsxs(K,{style:U.Progress,emphasis:_.Strong,size:"small",children:[new Intl.DateTimeFormat("en-US",f).format(a||new Date)," -"," ",new Intl.DateTimeFormat("en-US",f).format(t||new Date)]})]}),hasPopperArrow:!1,children:a&&t&&e.jsxs("div",{children:[e.jsx("div",{className:"tw-border-t tw-w-full tw-border-solid tw-border-line"}),e.jsx("div",{className:"tw-p-2",children:e.jsx("button",{className:`tw-bg-button-background tw-border-button-border tw-w-full
                                   hover:tw-bg-button-background-hover tw-rounded
                                   active:tw-bg-button-background-pressed tw-px-4 tw-h-9 tw-text-body-medium`,children:"Reset"})})]})})},p=L.bind({}),Q=a=>{const[s,t]=c.useState();return e.jsx("div",{className:"tw-w-[500px]",children:e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:s,onChange:n=>t(n)})})},u=Q.bind({});u.args={inline:!0};var v,x,S;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(S=(x=o.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var P,C,k;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(k=(C=l.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var y,j,N;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`(args: DatePickerProps) => {
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
  }} preventOpenOnFocus customTrigger={<button className="tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2">
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
                        <button className="tw-bg-button-background tw-border-button-border tw-w-full
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
