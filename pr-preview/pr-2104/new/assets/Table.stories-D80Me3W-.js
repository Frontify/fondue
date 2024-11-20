import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as m}from"./index-BwDkhjyp.js";import{h as Qe,i as Ze,b as el,j as ll,k as al,m as rl}from"./fondue-icons332-C7WrRe_-.js";import{B as M}from"./Button-BD32N3dP.js";import{a as U}from"./Checkbox-C2jMhLCy.js";import{h}from"./Dropdown-CmvlTJcK.js";import{F as _}from"./Flex-DCHQJD5L.js";import{S as Y}from"./Switch-BQLJOOsp.js";import{T as P}from"./TextInput-CCiUui03.js";import{s as nl}from"./usePreventDropdownOverflow-DisCSAPV.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const Pe=(r,a)=>{m.useEffect(()=>{nl(r,a)},[r])},Ke=r=>{m.useEffect(()=>{if(!r.current)return;const a=r.current,n=new ResizeObserver(()=>{const t=a.scrollWidth>a.clientWidth;a.title=t&&a.textContent||""});return n.observe(a),()=>n.disconnect()},[r])},sl="_table_9icpb_4",tl="_headerCell_9icpb_17",ol="_rowCell_9icpb_18",il="_sortButton_9icpb_62",dl="_body_9icpb_87",cl="_row_9icpb_18",C={table:sl,headerCell:tl,rowCell:ol,sortButton:il,body:dl,row:cl},Je=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),bl=r=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(r),Ge=r=>(r==null?void 0:r.querySelector(Je))??null,ml=r=>Array.from(r.querySelectorAll(Je)),K=(r,a)=>r.children[a],Tl=(r,a)=>{const n=r.closest("tr");if(!n)return null;const t=Array.from(n.children).indexOf(r);switch(a){case"ArrowUp":{const o=n.previousElementSibling;return o?K(o,t):null}case"ArrowDown":{const o=n.nextElementSibling;return o?K(o,t):null}case"ArrowLeft":return r.previousElementSibling;case"ArrowRight":return r.nextElementSibling;case"Home":case"End":{const o=Array.from(n.querySelectorAll("td, th"));return o[a==="Home"?0:o.length-1]}}},Xe=(r,a)=>{const n=Tl(r,a);return n?Ge(n)?n:Xe(n,a):null},J=(r,a)=>{if(!bl(r.key))return;const n=Xe(a,r.key);if(!n)return;const t=Ge(n);t&&(r.preventDefault(),t.focus())},Cl=(r,a,n)=>{var i;const t=ml(a),o=t.indexOf(n);if(o===-1)return;const s=(o+(r.key==="ArrowLeft"?-1:1)+t.length)%t.length;r.preventDefault(),(i=t[s])==null||i.focus()},wl=r=>{const a=r.target,n=a.closest("td, th"),t=a.closest("table");if(t){if(n&&(r.key==="ArrowUp"||r.key==="ArrowDown")){J(r,n);return}if(r.ctrlKey&&n&&(r.key==="Home"||r.key==="End")){J(r,n);return}(r.key==="ArrowLeft"||r.key==="ArrowRight")&&Cl(r,t,a)}},I=m.forwardRef(({layout:r="auto",fullWidth:a=!0,sticky:n,caption:t,children:o,"aria-label":b,"aria-describedby":s},i)=>e.jsx("div",{onKeyDown:wl,role:"grid",tabIndex:-1,children:e.jsxs("table",{ref:i,className:C.table,"data-layout":r,"data-sticky":n,"data-full-width":a,"aria-label":b,"aria-describedby":s,children:[t&&e.jsx("caption",{children:t}),o]})}));I.displayName="Table.Root";const E=m.forwardRef(({children:r,"aria-label":a,"aria-busy":n},t)=>e.jsx("thead",{ref:t,className:C.header,"aria-label":a,"aria-busy":n,children:r}));E.displayName="Table.Header";const V=m.forwardRef(({noShrink:r=!1,truncate:a=!1,align:n="left",scope:t="col",sortTranslations:o,sortDirection:b,colSpan:s,width:i,onSortChange:T,children:c},O)=>{const w=m.useRef(null);Pe(w,O),Ke(w);const q=m.useMemo(()=>typeof c=="string"?b==="ascending"?(o==null?void 0:o.sortDescending)??`Sort by ${c} descending`:(o==null?void 0:o.sortAscending)??`Sort by ${c} ascending`:b==="ascending"?"Sort descending":"Sort ascending",[c,b,o]),x=()=>{if(!T)return;T(b===void 0||b==="descending"?"ascending":"descending")};return e.jsx("th",{ref:w,style:{width:i},className:C.headerCell,scope:t,colSpan:s,"data-align":n,"data-truncate":a,"data-no-shrink":r,children:T?e.jsxs("button",{className:C.sortButton,"aria-label":q,onClick:x,children:[c,b==="ascending"?e.jsx(Qe,{size:"12"}):b==="descending"?e.jsx(Ze,{size:"12"}):null]}):c})});V.displayName="Table.HeaderCell";const $=m.forwardRef(({children:r,"aria-busy":a},n)=>e.jsx("tbody",{ref:n,className:C.body,"aria-busy":a,children:r}));$.displayName="Table.Body";const W=m.forwardRef(({disabled:r=!1,selected:a=!1,href:n,onClick:t,onNavigate:o,children:b,"aria-label":s,"data-test-id":i},T)=>{const c=(t!==void 0||o!==void 0)&&!r,O=!!(o&&n),w=()=>{r||(o?o(n):t&&t(a))},q=x=>{c&&(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),w())};return e.jsx("tr",{ref:T,className:C.row,tabIndex:c?0:void 0,role:O?"link":c?"button":"row","data-disabled":r,"data-interactive":c,"data-href":n,"data-selected":a,"aria-disabled":r,"aria-label":s,"aria-selected":a,onClick:c?w:void 0,onKeyDown:c?q:void 0,"data-test-id":i,children:b})});W.displayName="Table.Row";const z=m.forwardRef(({colSpan:r,truncate:a,align:n="left",children:t,"aria-label":o},b)=>{const s=m.useRef(null);return Pe(s,b),Ke(s),e.jsx("td",{ref:s,className:C.rowCell,colSpan:r,"data-align":n,"data-truncate":a,"aria-label":o,children:t})});z.displayName="Table.RowCell";const l={Root:I,Header:E,HeaderCell:V,Body:$,Row:W,RowCell:z};I.__docgenInfo={description:"",methods:[],displayName:"Table.Root",props:{layout:{defaultValue:{value:"'auto'",computed:!1},required:!1},fullWidth:{defaultValue:{value:"true",computed:!1},required:!1}}};E.__docgenInfo={description:"",methods:[],displayName:"Table.Header"};V.__docgenInfo={description:"",methods:[],displayName:"Table.HeaderCell",props:{noShrink:{defaultValue:{value:"false",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1},align:{defaultValue:{value:"'left'",computed:!1},required:!1},scope:{defaultValue:{value:"'col'",computed:!1},required:!1}}};$.__docgenInfo={description:"",methods:[],displayName:"Table.Body"};W.__docgenInfo={description:"",methods:[],displayName:"Table.Row",props:{disabled:{defaultValue:{value:"false",computed:!1},required:!1},selected:{defaultValue:{value:"false",computed:!1},required:!1}}};z.__docgenInfo={description:"",methods:[],displayName:"Table.RowCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1}}};const Ul={component:I,subcomponents:{"Table.Header":E,"Table.HeaderCell":V,"Table.Body":$,"Table.Row":W,"Table.RowCell":z},tags:["autodocs"],parameters:{status:{type:"released"}},args:{},argTypes:{layout:{control:{type:"select",options:["auto","fixed"]},defaultValue:"auto"},fullWidth:{control:"boolean",defaultValue:!0},caption:{control:"text",defaultValue:""}}},d=[{id:1,firstName:"Chris",lastName:"Glasser",name:"Chris Glasser",age:32,role:"Senior Developer",email:"c.a.glasser@outlook.com",invited:"Rhonda Rhodes",lastSeen:"Oct 23, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:2,firstName:"David",lastName:"Elson",name:"David Elson",age:28,role:"Product Manager",email:"david29@gmail.com",invited:"Rodger Struck",lastSeen:"Oct 21, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:3,firstName:"Eddie",lastName:"Lake",name:"Eddie Lake",age:35,role:"UX Designer",email:"eddie_lake@gmail.com",invited:"Frances Swann",lastSeen:"Nov 11, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:4,firstName:"James",lastName:"Hall",name:"James Hall",age:41,role:"Technical Lead",email:"james_hall@gmail.com",invited:"Alex Buckmaster",lastSeen:"Nov 12, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:5,firstName:"Jerry",lastName:"Helfer",name:"Jerry Helfer",age:39,role:"Frontend Developer",email:"jerry73@aol.com",invited:"Bradley Lawlor",lastSeen:"Nov 1, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0}],u={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Admin"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"}),e.jsx(l.HeaderCell,{children:"Analytics access"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:e.jsx(Y,{size:"small","aria-label":"Admin"})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:e.jsx(Y,{size:"small","aria-label":"Analytics"})}),e.jsx(l.RowCell,{children:e.jsxs(_,{gap:"0.25rem",children:[e.jsx(M,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(el,{size:16})}),e.jsx(M,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(ll,{size:16})})]})})]},a.email))})]})},R={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},p={render:({...r})=>e.jsxs(l.Root,{...r,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},g={render:({...r})=>e.jsxs(l.Root,{...r,fullWidth:!1,children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},j={render:({...r})=>{const[a,n]=m.useState(null),[t,o]=m.useState(),b=[...d].sort((s,i)=>{if(!a||!t)return 0;const T=s[a],c=i[a];return t==="ascending"?T>c?1:-1:T<c?1:-1});return e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortDirection:a==="name"?t:void 0,onSortChange:s=>{n("name"),o(s)},children:"Name"}),e.jsx(l.HeaderCell,{sortDirection:a==="invited"?t:void 0,onSortChange:s=>{n("invited"),o(s)},children:"Invited by"}),e.jsx(l.HeaderCell,{sortDirection:a==="lastSeen"?t:void 0,onSortChange:s=>{n("lastSeen"),o(s)},children:"Last seen"})]})}),e.jsx(l.Body,{children:b.map(s=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:s.name}),e.jsx("div",{className:"text-sm text-gray-500",children:s.email})]})})}),e.jsx(l.RowCell,{children:s.invited}),e.jsx(l.RowCell,{children:s.lastSeen})]},s.email))})]})}},H={render:({...r})=>e.jsxs(l.Root,{...r,sticky:"head",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"})]})}),e.jsx(l.Body,{children:[...d,...d,...d,...d,...d,...d].map((a,n)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},`${a.email}-${n}`))})]})},f={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...r})=>e.jsxs(l.Root,{...r,sticky:"col",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},a.email))})]})},y={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...r})=>e.jsxs(l.Root,{...r,sticky:"both",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"})]})}),e.jsx(l.Body,{children:[...d,...d,...d].map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},a.email))})]})},v={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},S={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{href:`/users/${a.email}`,onNavigate:n=>alert(`Navigating to ${n}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},A={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:d.map((a,n)=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),disabled:n%3===0,children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},N={render:({...r})=>e.jsxs(l.Root,{...r,caption:"User Management Dashboard",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:d.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},L={render:({...r})=>e.jsx("div",{style:{width:"500px"},children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{truncate:!0,children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{truncate:!0,children:"Last seen"})]})}),e.jsx(l.Body,{children:d.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{truncate:!0,children:a.name}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{truncate:!0,children:a.lastSeen})]},a.email))})]})})},B={render:({...r})=>{const[a,n]=m.useState(""),[t,o]=m.useState("all"),b=m.useMemo(()=>{let s=[...d];return a&&(s=s.filter(i=>i.firstName.toLowerCase().includes(a.toLowerCase())||i.lastName.toLowerCase().includes(a.toLowerCase()))),t!=="all"&&(s=s.filter(i=>t==="young"?i.age<30:i.age>=30)),s},[a,t]);return e.jsxs(_,{direction:"column",gap:"1rem",children:[e.jsxs(_,{gap:"1rem",children:[e.jsx(P,{placeholder:"Search...",value:a,onChange:s=>n(s.target.value),children:e.jsx(P.Slot,{children:e.jsx(al,{size:"16"})})}),e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsxs(M,{emphasis:"default",children:[e.jsx(rl,{size:"16"}),"Filter by age"]})}),e.jsxs(h.Content,{children:[e.jsx(h.Item,{onSelect:()=>o("all"),children:"All"}),e.jsx(h.Item,{onSelect:()=>o("young"),children:"Young"}),e.jsx(h.Item,{onSelect:()=>o("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"}),e.jsx(l.HeaderCell,{children:"Role"})]})}),e.jsx(l.Body,{children:b.map(s=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${s.firstName}`),children:[e.jsx(l.RowCell,{children:s.name}),e.jsx(l.RowCell,{children:s.age}),e.jsx(l.RowCell,{children:s.role})]},s.id))})]})]})}},D={render:({...r})=>{const[a,n]=m.useState(new Set),t=()=>{a.size===d.length?n(new Set):n(new Set(d.map(i=>i.id)))},o=(i,T)=>{i.stopPropagation();const c=new Set(a);c.has(T)?c.delete(T):c.add(T),n(c)},b=a.size===d.length,s=a.size>0&&a.size<d.length;return e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(U,{value:s?"indeterminate":b,onChange:t})}),e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"})]})}),e.jsx(l.Body,{children:d.map(i=>e.jsxs(l.Row,{selected:a.has(i.id),onClick:()=>console.log(`View details for ${i.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(U,{value:a.has(i.id),onChange:T=>o(T,i.id)})}),e.jsx(l.RowCell,{children:i.name}),e.jsx(l.RowCell,{children:i.age})]},i.id))})]})}},k={name:"Cell Alignment Options",render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(_,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.invited}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},F={render:({...r})=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{...r,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"100px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"50%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.lastLogin}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})};var G,X,Q;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Admin</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                    <Table.HeaderCell>Analytics access</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>
                            <Switch size="small" aria-label="Admin" />
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                        <Table.RowCell>
                            <Switch size="small" aria-label="Analytics" />
                        </Table.RowCell>

                        <Table.RowCell>
                            <Flex gap="0.25rem">
                                <Button size="small" aspect="square" emphasis="weak">
                                    <IconPen size={16} />
                                </Button>
                                <Button variant="danger" size="small" aspect="square" emphasis="weak">
                                    <IconTrashBin size={16} />
                                </Button>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Q=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Q.source}}};var Z,ee,le;R.parameters={...R.parameters,docs:{...(Z=R.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(le=(ee=R.parameters)==null?void 0:ee.docs)==null?void 0:le.source}}};var ae,re,ne;p.parameters={...p.parameters,docs:{...(ae=p.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} layout="fixed">
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(ne=(re=p.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var se,te,oe;g.parameters={...g.parameters,docs:{...(se=g.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} fullWidth={false}>
            <Table.Header>
                <tr>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(oe=(te=g.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var ie,de,ce;j.parameters={...j.parameters,docs:{...(ie=j.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>();
    const sortedUsers = [...TABLE_DATA].sort((a, b) => {
      if (!sortField || !sortDirection) {
        return 0;
      }
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      if (sortDirection === 'ascending') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell sortDirection={sortField === 'name' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('name');
            setSortDirection(direction);
          }}>
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell sortDirection={sortField === 'invited' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('invited');
            setSortDirection(direction);
          }}>
                            Invited by
                        </Table.HeaderCell>
                        <Table.HeaderCell sortDirection={sortField === 'lastSeen' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('lastSeen');
            setSortDirection(direction);
          }}>
                            Last seen
                        </Table.HeaderCell>
                        {/* Other columns without sorting */}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortedUsers.map(user => <Table.Row key={user.email}>
                            <Table.RowCell>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(ce=(de=j.parameters)==null?void 0:de.docs)==null?void 0:ce.source}}};var be,me,Te;H.parameters={...H.parameters,docs:{...(be=H.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} sticky="head">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                    <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Initial login</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last login</Table.HeaderCell>
                    <Table.HeaderCell width="80px">2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => <Table.Row key={\`\${user.email}-\${index}\`}>
                            <Table.RowCell>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            <Table.RowCell>{user.initialLogin}</Table.RowCell>
                            <Table.RowCell>{user.lastLogin}</Table.RowCell>
                            <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                        </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Te=(me=H.parameters)==null?void 0:me.docs)==null?void 0:Te.source}}};var Ce,we,he;f.parameters={...f.parameters,docs:{...(Ce=f.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '600px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => <Table.Root {...args} sticky="col">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(he=(we=f.parameters)==null?void 0:we.docs)==null?void 0:he.source}}};var xe,ue,Re;y.parameters={...y.parameters,docs:{...(xe=y.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '600px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => <Table.Root {...args} sticky="both">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Re=(ue=y.parameters)==null?void 0:ue.docs)==null?void 0:Re.source}}};var pe,ge,je;v.parameters={...v.parameters,docs:{...(pe=v.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email} onClick={() => alert(\`Clicked on \${user.name}\`)}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(je=(ge=v.parameters)==null?void 0:ge.docs)==null?void 0:je.source}}};var He,fe,ye;S.parameters={...S.parameters,docs:{...(He=S.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email} href={\`/users/\${user.email}\`} onNavigate={href => alert(\`Navigating to \${href}\`)}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(ye=(fe=S.parameters)==null?void 0:fe.docs)==null?void 0:ye.source}}};var ve,Se,Ae;A.parameters={...A.parameters,docs:{...(ve=A.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user, index) => <Table.Row key={user.email} onClick={() => alert(\`Clicked on \${user.name}\`)} disabled={index % 3 === 0}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Ae=(Se=A.parameters)==null?void 0:Se.docs)==null?void 0:Ae.source}}};var Ne,Le,Be;N.parameters={...N.parameters,docs:{...(Ne=N.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} caption="User Management Dashboard">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.slice(0, 5).map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Be=(Le=N.parameters)==null?void 0:Le.docs)==null?void 0:Be.source}}};var De,ke,Fe;L.parameters={...L.parameters,docs:{...(De=L.parameters)==null?void 0:De.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '500px'
  }}>
            <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell truncate>Name</Table.HeaderCell>
                        <Table.HeaderCell>Invited by</Table.HeaderCell>
                        <Table.HeaderCell truncate>Last seen</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.slice(0, 5).map(user => <Table.Row key={user.email}>
                            <Table.RowCell truncate>{user.name}</Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell truncate>{user.lastSeen}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(Fe=(ke=L.parameters)==null?void 0:ke.docs)==null?void 0:Fe.source}}};var _e,Ie,Ee;B.parameters={...B.parameters,docs:{...(_e=B.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');
    const filteredAndSortedData = useMemo(() => {
      let result = [...TABLE_DATA];
      if (searchTerm) {
        result = result.filter(user => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (ageFilter !== 'all') {
        result = result.filter(user => ageFilter === 'young' ? user.age < 30 : user.age >= 30);
      }
      return result;
    }, [searchTerm, ageFilter]);
    return <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                    <TextInput placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}>
                        <TextInput.Slot>
                            <IconMagnifier size="16" />
                        </TextInput.Slot>
                    </TextInput>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Button emphasis="default">
                                <IconFunnel size="16" />
                                Filter by age
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => setAgeFilter('all')}>All</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('young')}>Young</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('old')}>Old</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Flex>

                <Table.Root {...args}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredAndSortedData.map(user => <Table.Row key={user.id} onClick={() => console.log(\`View details for \${user.firstName}\`)}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.age}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </Flex>;
  }
}`,...(Ee=(Ie=B.parameters)==null?void 0:Ie.docs)==null?void 0:Ee.source}}};var Ve,$e,We;D.parameters={...D.parameters,docs:{...(Ve=D.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const handleSelectAll = () => {
      if (selectedRows.size === TABLE_DATA.length) {
        setSelectedRows(new Set());
      } else {
        setSelectedRows(new Set(TABLE_DATA.map(user => user.id)));
      }
    };
    const handleSelectRow = (event: FormEvent<HTMLButtonElement>, id: number) => {
      event.stopPropagation();
      const newSelection = new Set(selectedRows);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      setSelectedRows(newSelection);
    };
    const isAllSelected = selectedRows.size === TABLE_DATA.length;
    const isPartiallySelected = selectedRows.size > 0 && selectedRows.size < TABLE_DATA.length;
    return <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Checkbox value={isPartiallySelected ? 'indeterminate' : isAllSelected} onChange={handleSelectAll} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(user => <Table.Row key={user.id} selected={selectedRows.has(user.id)} onClick={() => console.log(\`View details for \${user.firstName}\`)}>
                            <Table.RowCell>
                                <Checkbox value={selectedRows.has(user.id)} onChange={event => handleSelectRow(event, user.id)} />
                            </Table.RowCell>
                            <Table.RowCell>{user.name}</Table.RowCell>
                            <Table.RowCell>{user.age}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(We=($e=D.parameters)==null?void 0:$e.docs)==null?void 0:We.source}}};var ze,Oe,qe;k.parameters={...k.parameters,docs:{...(ze=k.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  name: 'Cell Alignment Options',
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell align="left">Left Header</Table.HeaderCell>
                    <Table.HeaderCell align="center">Centered Header</Table.HeaderCell>
                    <Table.HeaderCell align="right">Right Header</Table.HeaderCell>
                    <Table.HeaderCell align="left">Mixed Alignment</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell align="left">{user.firstName}</Table.RowCell>
                        <Table.RowCell align="center">{user.role}</Table.RowCell>
                        <Table.RowCell align="right">{user.age}</Table.RowCell>
                        <Table.RowCell>
                            <Flex justify="space-between" align="center">
                                <span>{user.invited}</span>
                                <span>{user.lastLogin}</span>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(qe=(Oe=k.parameters)==null?void 0:Oe.docs)==null?void 0:qe.source}}};var Me,Ue,Ye;F.parameters={...F.parameters,docs:{...(Me=F.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '800px'
  }}>
            <Table.Root {...args} layout="fixed">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="100px">Fixed Width & No Shrink</Table.HeaderCell>
                        <Table.HeaderCell width="100px" truncate>
                            Truncated Very Long Header Title That Should Be Cut Off
                        </Table.HeaderCell>
                        <Table.HeaderCell width="50%">Percentage Width</Table.HeaderCell>
                        <Table.HeaderCell>Auto Width</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(user => <Table.Row key={user.id}>
                            <Table.RowCell>Fixed Width Content</Table.RowCell>
                            <Table.RowCell truncate>
                                {\`\${user.firstName} \${user.lastName} - \${user.role} - \${user.lastLogin}\`}
                            </Table.RowCell>
                            <Table.RowCell>Normal Cell</Table.RowCell>
                            <Table.RowCell>Auto Width Content</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(Ye=(Ue=F.parameters)==null?void 0:Ue.docs)==null?void 0:Ye.source}}};const Yl=["Basic","AutoLayout","FixedLayout","NonFullWidth","Sortable","StickyHead","StickyFirstColumn","StickyHeadAndCol","Interactive","WithLinks","Disabled","WithCaption","TruncatedContent","WithSearchAndFilters","WithSelection","CellAlignments","WidthControl"];export{R as AutoLayout,u as Basic,k as CellAlignments,A as Disabled,p as FixedLayout,v as Interactive,g as NonFullWidth,j as Sortable,f as StickyFirstColumn,H as StickyHead,y as StickyHeadAndCol,L as TruncatedContent,F as WidthControl,N as WithCaption,S as WithLinks,B as WithSearchAndFilters,D as WithSelection,Yl as __namedExportsOrder,Ul as default};
