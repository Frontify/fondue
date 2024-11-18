import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as b}from"./index-BwDkhjyp.js";import{f as Ge,g as Me,b as Ue,h as Ye,i as Ke,j as Je}from"./fondue-icons332-CfapKW84.js";import{B as O}from"./Button-BD32N3dP.js";import{a as q}from"./Checkbox-D9XbQE54.js";import{h}from"./Dropdown-Q1sa1_ON.js";import{F}from"./Flex-DCHQJD5L.js";import{S as P}from"./Switch-BQLJOOsp.js";import{T as G}from"./TextInput-CpB5g_th.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./usePreventDropdownOverflow-DisCSAPV.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const Xe="_table_b85gb_4",Qe="_header_b85gb_36",Ze="_headerCell_b85gb_47",el="_sortButton_b85gb_73",ll="_body_b85gb_98",al="_rowCell_b85gb_101",rl="_row_b85gb_101",w={table:Xe,header:Qe,headerCell:Ze,sortButton:el,body:ll,rowCell:al,row:rl},Oe=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),nl=r=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(r),qe=r=>(r==null?void 0:r.querySelector(Oe))??null,sl=r=>Array.from(r.querySelectorAll(Oe)),M=(r,a)=>r.children[a],tl=(r,a)=>{const n=r.closest("tr");if(!n)return null;const s=Array.from(n.children).indexOf(r);switch(a){case"ArrowUp":{const t=n.previousElementSibling;return t?M(t,s):null}case"ArrowDown":{const t=n.nextElementSibling;return t?M(t,s):null}case"ArrowLeft":return r.previousElementSibling;case"ArrowRight":return r.nextElementSibling;case"Home":case"End":{const t=Array.from(n.querySelectorAll("td, th"));return t[a==="Home"?0:t.length-1]}}},Pe=(r,a)=>{const n=tl(r,a);return n?qe(n)?n:Pe(n,a):null},U=(r,a)=>{if(!nl(r.key))return;const n=Pe(a,r.key);if(!n)return;const s=qe(n);s&&(r.preventDefault(),s.focus())},ol=(r,a,n)=>{var d;const s=sl(a),t=s.indexOf(n);if(t===-1)return;const o=(t+(r.key==="ArrowLeft"?-1:1)+s.length)%s.length;r.preventDefault(),(d=s[o])==null||d.focus()},dl=r=>{const a=r.target,n=a.closest("td, th"),s=a.closest("table");if(s){if(n&&(r.key==="ArrowUp"||r.key==="ArrowDown")){U(r,n);return}if(r.ctrlKey&&n&&(r.key==="Home"||r.key==="End")){U(r,n);return}(r.key==="ArrowLeft"||r.key==="ArrowRight")&&ol(r,s,a)}},_=b.forwardRef(({caption:r,layout:a="fixed",fullWidth:n=!0,children:s,"aria-label":t,"aria-describedby":T,"aria-busy":o=!1},d)=>e.jsx("div",{ref:d,onKeyDown:dl,role:"grid",tabIndex:-1,children:e.jsxs("table",{className:w.table,"data-layout":a,"data-full-width":n,"aria-label":t,"aria-describedby":T,"aria-busy":o,children:[r&&e.jsx("caption",{children:r}),s]})}));_.displayName="Table.Root";const I=b.forwardRef(({sticky:r=!1,children:a,"aria-label":n,"aria-busy":s},t)=>e.jsx("thead",{ref:t,className:w.header,"data-sticky":r,"aria-label":n,"aria-busy":s,children:a}));I.displayName="Table.Header";const E=b.forwardRef(({sortDirection:r,width:a,align:n="left",truncate:s=!1,sortTranslations:t,noShrink:T=!1,onSortChange:o,children:d},c)=>{const m=b.useId(),x=b.useMemo(()=>{const C=typeof d=="string"?d:"";return r==="ascending"?((t==null?void 0:t.sortDescending)??"Sort by {column} descending").replace("{column}",C):((t==null?void 0:t.sortAscending)??"Sort by {column} ascending").replace("{column}",C)},[d,r,t]),W=()=>{if(!o)return;o(r===void 0||r==="descending"?"ascending":"descending")};return e.jsx("th",{ref:c,className:w.headerCell,style:{textAlign:n,width:a},"data-truncate":s,"data-no-shrink":T,scope:"col",children:o?e.jsxs("button",{id:m,onClick:W,className:w.sortButton,"aria-label":x,children:[d,r==="ascending"?e.jsx(Ge,{size:"12"}):r==="descending"?e.jsx(Me,{size:"12"}):null]}):d})});E.displayName="Table.HeaderCell";const $=b.forwardRef(({stickyFirstColumn:r,children:a,"aria-busy":n},s)=>e.jsx("tbody",{ref:s,className:w.body,"data-sticky-first-column":r,"aria-busy":n,children:a}));$.displayName="Table.Body";const V=b.forwardRef(({selected:r=!1,disabled:a=!1,href:n,onNavigate:s,onClick:t,children:T,"aria-label":o},d)=>{const c=(t!==void 0||s!==void 0)&&!a,m=!!(s&&n),x=()=>{a||(s?s(n):t&&t())},W=C=>{c&&(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),x())};return e.jsx("tr",{ref:d,className:w.row,"data-href":n,"data-selected":r,"data-interactive":c,"data-disabled":a,role:m?"link":c?"button":"row",tabIndex:c?0:void 0,"aria-selected":r,"aria-disabled":a,"aria-label":o,onClick:c?x:void 0,onKeyDown:c?W:void 0,children:T})});V.displayName="Table.Row";const z=b.forwardRef(({truncate:r,align:a="left",children:n,"aria-label":s},t)=>e.jsx("td",{ref:t,"data-truncate":r,className:w.rowCell,style:{textAlign:a},"aria-label":s,children:n}));z.displayName="Table.RowCell";const l={Root:_,Header:I,HeaderCell:E,Body:$,Row:V,RowCell:z};_.__docgenInfo={description:"",methods:[],displayName:"Table.Root",props:{layout:{defaultValue:{value:"'fixed'",computed:!1},required:!1},fullWidth:{defaultValue:{value:"true",computed:!1},required:!1},"aria-busy":{defaultValue:{value:"false",computed:!1},required:!1}}};I.__docgenInfo={description:"",methods:[],displayName:"Table.Header",props:{sticky:{defaultValue:{value:"false",computed:!1},required:!1}}};E.__docgenInfo={description:"",methods:[],displayName:"Table.HeaderCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1},noShrink:{defaultValue:{value:"false",computed:!1},required:!1}}};$.__docgenInfo={description:"",methods:[],displayName:"Table.Body"};V.__docgenInfo={description:"",methods:[],displayName:"Table.Row",props:{selected:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};z.__docgenInfo={description:"",methods:[],displayName:"Table.RowCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1}}};const El={component:_,subcomponents:{"Table.Header":I,"Table.HeaderCell":E,"Table.Body":$,"Table.Row":V,"Table.RowCell":z},tags:["autodocs"],parameters:{status:{type:"released"}},args:{},argTypes:{layout:{control:{type:"select",options:["auto","fixed"]},defaultValue:"auto"},fullWidth:{control:"boolean",defaultValue:!0},caption:{control:"text",defaultValue:""}}},i=[{id:1,firstName:"Chris",lastName:"Glasser",name:"Chris Glasser",age:32,role:"Senior Developer",email:"c.a.glasser@outlook.com",invited:"Rhonda Rhodes",lastSeen:"Oct 23, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:2,firstName:"David",lastName:"Elson",name:"David Elson",age:28,role:"Product Manager",email:"david29@gmail.com",invited:"Rodger Struck",lastSeen:"Oct 21, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:3,firstName:"Eddie",lastName:"Lake",name:"Eddie Lake",age:35,role:"UX Designer",email:"eddie_lake@gmail.com",invited:"Frances Swann",lastSeen:"Nov 11, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:4,firstName:"James",lastName:"Hall",name:"James Hall",age:41,role:"Technical Lead",email:"james_hall@gmail.com",invited:"Alex Buckmaster",lastSeen:"Nov 12, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:5,firstName:"Jerry",lastName:"Helfer",name:"Jerry Helfer",age:39,role:"Frontend Developer",email:"jerry73@aol.com",invited:"Bradley Lawlor",lastSeen:"Nov 1, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24}],u={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"80px",children:"Admin"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"}),e.jsx(l.HeaderCell,{width:"100px",children:"Analytics access"}),e.jsx(l.HeaderCell,{width:"100px",children:"Guidelines"}),e.jsx(l.HeaderCell,{width:"100px",children:"Libraries"}),e.jsx(l.HeaderCell,{width:"100px",children:"Projects"}),e.jsx(l.HeaderCell,{width:"100px",children:"Groups"}),e.jsx(l.HeaderCell,{width:"100px",children:"Targets"}),e.jsx(l.HeaderCell,{width:"80px",children:"Actions"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:e.jsx(P,{size:"small","aria-label":"Admin"})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:e.jsx(P,{size:"small","aria-label":"Analytics"})}),e.jsx(l.RowCell,{children:a.guidelines}),e.jsx(l.RowCell,{children:a.libraries}),e.jsx(l.RowCell,{children:a.projects}),e.jsx(l.RowCell,{children:a.groups}),e.jsx(l.RowCell,{children:a.targets}),e.jsx(l.RowCell,{children:e.jsxs(F,{gap:"0.25rem",children:[e.jsx(O,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Ue,{size:16})}),e.jsx(O,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Ye,{size:16})})]})})]},a.email))})]})},R={render:({...r})=>e.jsxs(l.Root,{...r,layout:"auto",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},p={render:({...r})=>e.jsxs(l.Root,{...r,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},g={render:({...r})=>e.jsxs(l.Root,{...r,fullWidth:!1,children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},j={render:({...r})=>{const[a,n]=b.useState(null),[s,t]=b.useState(),T=[...i].sort((o,d)=>{if(!a||!s)return 0;const c=o[a],m=d[a];return s==="ascending"?c>m?1:-1:c<m?1:-1});return e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortDirection:a==="name"?s:void 0,onSortChange:o=>{n("name"),t(o)},children:"Name"}),e.jsx(l.HeaderCell,{sortDirection:a==="invited"?s:void 0,onSortChange:o=>{n("invited"),t(o)},children:"Invited by"}),e.jsx(l.HeaderCell,{sortDirection:a==="lastSeen"?s:void 0,onSortChange:o=>{n("lastSeen"),t(o)},children:"Last seen"})]})}),e.jsx(l.Body,{children:T.map(o=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:o.name}),e.jsx("div",{className:"text-sm text-gray-500",children:o.email})]})})}),e.jsx(l.RowCell,{children:o.invited}),e.jsx(l.RowCell,{children:o.lastSeen})]},o.email))})]})}},H={render:({...r})=>e.jsx("div",{className:"h-96 overflow-auto border rounded-lg",children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"})]})}),e.jsx(l.Body,{children:[...i,...i,...i,...i,...i,...i].map((a,n)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},`${a.email}-${n}`))})]})})},f={render:({...r})=>e.jsx("div",{style:{width:"700px",overflow:"auto"},children:e.jsxs(l.Root,{...r,layout:"auto",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"}),e.jsx(l.HeaderCell,{children:"Analytics"}),e.jsx(l.HeaderCell,{children:"Guidelines"}),e.jsx(l.HeaderCell,{children:"Libraries"}),e.jsx(l.HeaderCell,{children:"Projects"}),e.jsx(l.HeaderCell,{children:"Groups"}),e.jsx(l.HeaderCell,{children:"Targets"})]})}),e.jsx(l.Body,{stickyFirstColumn:!0,children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:a.analytics}),e.jsx(l.RowCell,{children:a.guidelines}),e.jsx(l.RowCell,{children:a.libraries}),e.jsx(l.RowCell,{children:a.projects}),e.jsx(l.RowCell,{children:a.groups}),e.jsx(l.RowCell,{children:a.targets})]},a.email))})]})})},y={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},v={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{href:`/users/${a.email}`,onNavigate:n=>alert(`Navigating to ${n}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},S={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:i.map((a,n)=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),disabled:n%3===0,children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},A={render:({...r})=>e.jsxs(l.Root,{...r,caption:"User Management Dashboard",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:i.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},N={render:({...r})=>e.jsx("div",{style:{width:"200px"},children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{truncate:!0,children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{truncate:!0,children:"Last seen"})]})}),e.jsx(l.Body,{children:i.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{truncate:!0,children:a.name}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{truncate:!0,children:a.lastSeen})]},a.email))})]})})},L={render:({...r})=>{const[a,n]=b.useState(""),[s,t]=b.useState("all"),T=b.useMemo(()=>{let o=[...i];return a&&(o=o.filter(d=>d.firstName.toLowerCase().includes(a.toLowerCase())||d.lastName.toLowerCase().includes(a.toLowerCase()))),s!=="all"&&(o=o.filter(d=>s==="young"?d.age<30:d.age>=30)),o},[a,s]);return e.jsxs(F,{direction:"column",gap:"1rem",children:[e.jsxs(F,{gap:"1rem",children:[e.jsx(G,{placeholder:"Search...",value:a,onChange:o=>n(o.target.value),children:e.jsx(G.Slot,{children:e.jsx(Ke,{size:"16"})})}),e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsxs(O,{emphasis:"default",children:[e.jsx(Je,{size:"16"}),"Filter by age"]})}),e.jsxs(h.Content,{children:[e.jsx(h.Item,{onSelect:()=>t("all"),children:"All"}),e.jsx(h.Item,{onSelect:()=>t("young"),children:"Young"}),e.jsx(h.Item,{onSelect:()=>t("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"}),e.jsx(l.HeaderCell,{children:"Role"})]})}),e.jsx(l.Body,{children:T.map(o=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${o.firstName}`),children:[e.jsx(l.RowCell,{children:o.name}),e.jsx(l.RowCell,{children:o.age}),e.jsx(l.RowCell,{children:o.role})]},o.id))})]})]})}},B={render:({...r})=>{const[a,n]=b.useState(new Set),s=()=>{a.size===i.length?n(new Set):n(new Set(i.map(d=>d.id)))},t=(d,c)=>{d.stopPropagation();const m=new Set(a);m.has(c)?m.delete(c):m.add(c),n(m)},T=a.size===i.length,o=a.size>0&&a.size<i.length;return e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(q,{value:o?"indeterminate":T,onChange:s})}),e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"})]})}),e.jsx(l.Body,{children:i.map(d=>e.jsxs(l.Row,{selected:a.has(d.id),onClick:()=>console.log(`View details for ${d.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(q,{value:a.has(d.id),onChange:c=>t(c,d.id)})}),e.jsx(l.RowCell,{children:d.name}),e.jsx(l.RowCell,{children:d.age})]},d.id))})]})}},D={name:"Cell Alignment Options",render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s user`),children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(F,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.invited}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},k={render:({...r})=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"100px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"50%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.lastLogin}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})};var Y,K,J;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                    <Table.HeaderCell width="80px">Admin</Table.HeaderCell>
                    <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Initial login</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last login</Table.HeaderCell>
                    <Table.HeaderCell width="80px">2FA</Table.HeaderCell>
                    <Table.HeaderCell width="100px">Analytics access</Table.HeaderCell>
                    <Table.HeaderCell width="100px">Guidelines</Table.HeaderCell>
                    <Table.HeaderCell width="100px">Libraries</Table.HeaderCell>
                    <Table.HeaderCell width="100px">Projects</Table.HeaderCell>
                    <Table.HeaderCell width="100px">Groups</Table.HeaderCell>
                    <Table.HeaderCell width="100px">Targets</Table.HeaderCell>
                    <Table.HeaderCell width="80px">Actions</Table.HeaderCell>
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
                        <Table.RowCell>{user.guidelines}</Table.RowCell>
                        <Table.RowCell>{user.libraries}</Table.RowCell>
                        <Table.RowCell>{user.projects}</Table.RowCell>
                        <Table.RowCell>{user.groups}</Table.RowCell>
                        <Table.RowCell>{user.targets}</Table.RowCell>
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
}`,...(J=(K=u.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var X,Q,Z;R.parameters={...R.parameters,docs:{...(X=R.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} layout="auto">
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
}`,...(Z=(Q=R.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var ee,le,ae;p.parameters={...p.parameters,docs:{...(ee=p.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(ae=(le=p.parameters)==null?void 0:le.docs)==null?void 0:ae.source}}};var re,ne,se;g.parameters={...g.parameters,docs:{...(re=g.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(se=(ne=g.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var te,oe,de;j.parameters={...j.parameters,docs:{...(te=j.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(de=(oe=j.parameters)==null?void 0:oe.docs)==null?void 0:de.source}}};var ie,ce,be;H.parameters={...H.parameters,docs:{...(ie=H.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div className="h-96 overflow-auto border rounded-lg">
            <Table.Root {...args}>
                <Table.Header sticky>
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
        </div>
}`,...(be=(ce=H.parameters)==null?void 0:ce.docs)==null?void 0:be.source}}};var Te,me,Ce;f.parameters={...f.parameters,docs:{...(Te=f.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '700px',
    overflow: 'auto'
  }}>
            <Table.Root {...args} layout="auto">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Invited by</Table.HeaderCell>
                        <Table.HeaderCell>Last seen</Table.HeaderCell>
                        <Table.HeaderCell>Initial login</Table.HeaderCell>
                        <Table.HeaderCell>Last login</Table.HeaderCell>
                        <Table.HeaderCell>2FA</Table.HeaderCell>
                        <Table.HeaderCell>Analytics</Table.HeaderCell>
                        <Table.HeaderCell>Guidelines</Table.HeaderCell>
                        <Table.HeaderCell>Libraries</Table.HeaderCell>
                        <Table.HeaderCell>Projects</Table.HeaderCell>
                        <Table.HeaderCell>Groups</Table.HeaderCell>
                        <Table.HeaderCell>Targets</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body stickyFirstColumn>
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
                            <Table.RowCell>{user.analytics}</Table.RowCell>
                            <Table.RowCell>{user.guidelines}</Table.RowCell>
                            <Table.RowCell>{user.libraries}</Table.RowCell>
                            <Table.RowCell>{user.projects}</Table.RowCell>
                            <Table.RowCell>{user.groups}</Table.RowCell>
                            <Table.RowCell>{user.targets}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(Ce=(me=f.parameters)==null?void 0:me.docs)==null?void 0:Ce.source}}};var we,he,xe;y.parameters={...y.parameters,docs:{...(we=y.parameters)==null?void 0:we.docs,source:{originalSource:`{
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
}`,...(xe=(he=y.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var ue,Re,pe;v.parameters={...v.parameters,docs:{...(ue=v.parameters)==null?void 0:ue.docs,source:{originalSource:`{
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
}`,...(pe=(Re=v.parameters)==null?void 0:Re.docs)==null?void 0:pe.source}}};var ge,je,He;S.parameters={...S.parameters,docs:{...(ge=S.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(He=(je=S.parameters)==null?void 0:je.docs)==null?void 0:He.source}}};var fe,ye,ve;A.parameters={...A.parameters,docs:{...(fe=A.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(ve=(ye=A.parameters)==null?void 0:ye.docs)==null?void 0:ve.source}}};var Se,Ae,Ne;N.parameters={...N.parameters,docs:{...(Se=N.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '200px'
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
}`,...(Ne=(Ae=N.parameters)==null?void 0:Ae.docs)==null?void 0:Ne.source}}};var Le,Be,De;L.parameters={...L.parameters,docs:{...(Le=L.parameters)==null?void 0:Le.docs,source:{originalSource:`{
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
}`,...(De=(Be=L.parameters)==null?void 0:Be.docs)==null?void 0:De.source}}};var ke,Fe,_e;B.parameters={...B.parameters,docs:{...(ke=B.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(_e=(Fe=B.parameters)==null?void 0:Fe.docs)==null?void 0:_e.source}}};var Ie,Ee,$e;D.parameters={...D.parameters,docs:{...(Ie=D.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
                {TABLE_DATA.map(user => <Table.Row key={user.id} onClick={() => console.log(\`Clicked \${user.firstName}'s user\`)}>
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
}`,...($e=(Ee=D.parameters)==null?void 0:Ee.docs)==null?void 0:$e.source}}};var Ve,ze,We;k.parameters={...k.parameters,docs:{...(Ve=k.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '800px'
  }}>
            <Table.Root {...args}>
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
}`,...(We=(ze=k.parameters)==null?void 0:ze.docs)==null?void 0:We.source}}};const $l=["Basic","AutoLayout","FixedLayout","NonFullWidth","Sortable","StickyHeader","StickyFirstColumn","Interactive","WithLinks","Disabled","WithCaption","TruncatedContent","WithSearchAndFilters","WithSelection","CellAlignments","WidthControl"];export{R as AutoLayout,u as Basic,D as CellAlignments,S as Disabled,p as FixedLayout,y as Interactive,g as NonFullWidth,j as Sortable,f as StickyFirstColumn,H as StickyHeader,N as TruncatedContent,k as WidthControl,A as WithCaption,v as WithLinks,L as WithSearchAndFilters,B as WithSelection,$l as __namedExportsOrder,El as default};
