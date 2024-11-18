import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as b}from"./index-BwDkhjyp.js";import{f as Oe,g as $e,b as Ve,h as We,i as ze}from"./fondue-icons332-B3qUYkKY.js";import{B as I}from"./Button-BD32N3dP.js";import{a as z}from"./Checkbox-DaHCOki8.js";import{h as w}from"./Dropdown-Cqkh-O2Z.js";import{F as B}from"./Flex-DCHQJD5L.js";import{S as P}from"./Switch-BQLJOOsp.js";import{T as q}from"./TextInput-BJ3peK85.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./usePreventDropdownOverflow-DisCSAPV.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const Pe="_table_1mve8_4",qe="_header_1mve8_37",Me="_headerCell_1mve8_48",Ge="_sortButton_1mve8_74",Ke="_body_1mve8_99",Ue="_rowCell_1mve8_102",Je="_row_1mve8_102",h={table:Pe,header:qe,headerCell:Me,sortButton:Ge,body:Ke,rowCell:Ue,row:Je},Ie=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),Ye=a=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(a),_e=a=>(a==null?void 0:a.querySelector(Ie))??null,Qe=a=>Array.from(a.querySelectorAll(Ie)),M=(a,r)=>a.children[r],Xe=(a,r)=>{const n=a.closest("tr");if(!n)return null;const i=Array.from(n.children).indexOf(a);switch(r){case"ArrowUp":{const s=n.previousElementSibling;return s?M(s,i):null}case"ArrowDown":{const s=n.nextElementSibling;return s?M(s,i):null}case"ArrowLeft":return a.previousElementSibling;case"ArrowRight":return a.nextElementSibling;case"Home":case"End":{const s=Array.from(n.querySelectorAll("td, th"));return s[r==="Home"?0:s.length-1]}}},Ee=(a,r)=>{const n=Xe(a,r);return n?_e(n)?n:Ee(n,r):null},G=(a,r)=>{if(!Ye(a.key))return;const n=Ee(r,a.key);if(!n)return;const i=_e(n);i&&(a.preventDefault(),i.focus())},Ze=(a,r,n)=>{var c;const i=Qe(r),s=i.indexOf(n);if(s===-1)return;const d=(s+(a.key==="ArrowLeft"?-1:1)+i.length)%i.length;a.preventDefault(),(c=i[d])==null||c.focus()},el=a=>{const r=a.target,n=r.closest("td, th"),i=r.closest("table");if(i){if(n&&(a.key==="ArrowUp"||a.key==="ArrowDown")){G(a,n);return}if(a.ctrlKey&&n&&(a.key==="Home"||a.key==="End")){G(a,n);return}(a.key==="ArrowLeft"||a.key==="ArrowRight")&&Ze(a,i,r)}},_=b.forwardRef(({caption:a,layout:r="fixed",fullWidth:n=!0,children:i,"aria-label":s,"aria-describedby":t,"aria-busy":d=!1},c)=>e.jsx("div",{ref:c,onKeyDown:el,role:"grid",tabIndex:-1,children:e.jsxs("table",{className:h.table,"data-layout":r,"data-full-width":n,"aria-label":s,"aria-describedby":t,"aria-busy":d,children:[a&&e.jsx("caption",{children:a}),i]})}));_.displayName="Table.Root";const E=b.forwardRef(({children:a,sticky:r=!1,"aria-label":n,"aria-busy":i},s)=>e.jsx("thead",{ref:s,className:h.header,"data-sticky":r,"aria-label":n,"aria-busy":i,children:a}));E.displayName="Table.Header";const O=b.forwardRef(({sortDirection:a,width:r,align:n="left",truncate:i=!1,sortTranslations:s,noShrink:t=!1,scope:d="col",onSortChange:c,children:o},k)=>{const T=b.useId(),F=b.useMemo(()=>{const D=typeof o=="string"?o:"";return a==="ascending"?((s==null?void 0:s.sortDescending)??"Sort by {column} descending").replace("{column}",D):((s==null?void 0:s.sortAscending)??"Sort by {column} ascending").replace("{column}",D)},[o,a,s]),C=()=>{if(!c)return;c(a===void 0||a==="descending"?"ascending":"descending")};return e.jsx("th",{ref:k,className:h.headerCell,style:{textAlign:n,width:r},"data-truncate":i,"data-no-shrink":t,role:"columnheader",scope:d,children:c?e.jsxs("button",{id:T,onClick:C,className:h.sortButton,"aria-label":F,children:[o,a==="ascending"?e.jsx(Oe,{size:"12"}):a==="descending"?e.jsx($e,{size:"12"}):null]}):o})});O.displayName="Table.HeaderCell";const $=b.forwardRef(({stickyFirstColumn:a,"aria-busy":r,children:n},i)=>e.jsx("tbody",{ref:i,className:h.body,"data-sticky-first-column":a,"aria-busy":r,children:n}));$.displayName="Table.Body";const V=b.forwardRef(({selected:a=!1,disabled:r=!1,href:n,onNavigate:i,onClick:s,children:t,"aria-label":d},c)=>{const o=(s!==void 0||i!==void 0)&&!r,k=!!(i&&n),T=()=>{r||(i?i():s&&s())},F=C=>{o&&(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),T())};return e.jsx("tr",{ref:c,className:h.row,"data-href":n,"data-selected":a,"data-interactive":o,"data-disabled":r,role:k?"link":o?"button":"row",tabIndex:o?0:void 0,"aria-selected":a,"aria-disabled":r,"aria-label":d,onClick:o?T:void 0,onKeyDown:o?F:void 0,children:t})});V.displayName="Table.Row";const W=b.forwardRef(({truncate:a,width:r,align:n="left","aria-label":i,children:s},t)=>e.jsx("td",{ref:t,"data-truncate":a,className:h.rowCell,style:{textAlign:n,width:r},"aria-label":i,children:s}));W.displayName="Table.RowCell";const l={Root:_,Header:E,HeaderCell:O,Body:$,Row:V,RowCell:W};_.__docgenInfo={description:"",methods:[],displayName:"Table.Root",props:{layout:{defaultValue:{value:"'fixed'",computed:!1},required:!1},fullWidth:{defaultValue:{value:"true",computed:!1},required:!1},"aria-busy":{defaultValue:{value:"false",computed:!1},required:!1}}};E.__docgenInfo={description:"",methods:[],displayName:"Table.Header",props:{sticky:{defaultValue:{value:"false",computed:!1},required:!1}}};O.__docgenInfo={description:"",methods:[],displayName:"Table.HeaderCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1},noShrink:{defaultValue:{value:"false",computed:!1},required:!1},scope:{defaultValue:{value:"'col'",computed:!1},required:!1}}};$.__docgenInfo={description:"",methods:[],displayName:"Table.Body"};V.__docgenInfo={description:"",methods:[],displayName:"Table.Row",props:{selected:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};W.__docgenInfo={description:"",methods:[],displayName:"Table.RowCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1}}};const Al={component:l},m=[{id:1,firstName:"Chris",lastName:"Glasser",name:"Chris Glasser",age:32,role:"Senior Developer",email:"c.a.glasser@outlook.com",invited:"Rhonda Rhodes",lastSeen:"Oct 23, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:2,firstName:"David",lastName:"Elson",name:"David Elson",age:28,role:"Product Manager",email:"david29@gmail.com",invited:"Rodger Struck",lastSeen:"Oct 21, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:3,firstName:"Eddie",lastName:"Lake",name:"Eddie Lake",age:35,role:"UX Designer",email:"eddie_lake@gmail.com",invited:"Frances Swann",lastSeen:"Nov 11, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:4,firstName:"James",lastName:"Hall",name:"James Hall",age:41,role:"Technical Lead",email:"james_hall@gmail.com",invited:"Alex Buckmaster",lastSeen:"Nov 12, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:5,firstName:"Jerry",lastName:"Helfer",name:"Jerry Helfer",age:39,role:"Frontend Developer",email:"jerry73@aol.com",invited:"Bradley Lawlor",lastSeen:"Nov 1, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:6,firstName:"Judith",lastName:"Rodriguez",name:"Judith Rodriguez",age:33,role:"Product Designer",email:"judith403@gmail.com",invited:"John Dukes",lastSeen:"Oct 30, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:7,firstName:"Kathy",lastName:"Pacheco",name:"Kathy Pacheco",age:36,role:"Backend Developer",email:"k_pacheco@gmail.com",invited:"James Hall",lastSeen:"Nov 7, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:8,firstName:"Kimberly",lastName:"Mastrangelo",name:"Kimberly Mastrangelo",age:29,role:"QA Engineer",email:"k.r.mastrangelo@outlook.com",invited:"Corina McCoy",lastSeen:"Oct 29, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:9,firstName:"Mary",lastName:"Freund",name:"Mary Freund",age:44,role:"System Architect",email:"m.k.freund@aol.com",invited:"Autumn Phillips",lastSeen:"Oct 31, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:10,firstName:"Patricia",lastName:"Sanders",name:"Patricia Sanders",age:31,role:"DevOps Engineer",email:"patricia95@outlook.com",invited:"Patricia Sanders",lastSeen:"Oct 28, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:11,firstName:"Ricky",lastName:"Smith",name:"Ricky Smith",age:37,role:"Data Engineer",email:"r.m.smith@gmail.com",invited:"Iva Ryan",lastSeen:"Oct 20, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:12,firstName:"Stephanie",lastName:"Sharkey",name:"Stephanie Sharkey",age:34,role:"Full Stack Developer",email:"s.t.sharkey@outlook.com",invited:"Kenneth Allen",lastSeen:"Oct 26, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24}],x={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"80px",children:"Admin"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"}),e.jsx(l.HeaderCell,{width:"100px",children:"Analytics access"}),e.jsx(l.HeaderCell,{width:"100px",children:"Guidelines"}),e.jsx(l.HeaderCell,{width:"100px",children:"Libraries"}),e.jsx(l.HeaderCell,{width:"100px",children:"Projects"}),e.jsx(l.HeaderCell,{width:"100px",children:"Groups"}),e.jsx(l.HeaderCell,{width:"100px",children:"Targets"}),e.jsx(l.HeaderCell,{width:"80px",children:"Actions"})]})}),e.jsx(l.Body,{children:m.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:e.jsx(P,{"aria-label":"Admin"})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsxs(l.RowCell,{children:[" ",e.jsx(P,{"aria-label":"Analytics"})]}),e.jsx(l.RowCell,{children:a.guidelines}),e.jsx(l.RowCell,{children:a.libraries}),e.jsx(l.RowCell,{children:a.projects}),e.jsx(l.RowCell,{children:a.groups}),e.jsx(l.RowCell,{children:a.targets}),e.jsx(l.RowCell,{children:e.jsxs(B,{gap:"0.25rem",children:[e.jsx(I,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Ve,{size:16})}),e.jsx(I,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(We,{size:16})})]})})]},a.email))})]})},u={render:()=>{const[a,r]=b.useState(null),[n,i]=b.useState(),s=[...m].sort((t,d)=>{if(!a||!n)return 0;const c=t[a],o=d[a];return n==="ascending"?c>o?1:-1:c<o?1:-1});return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",sortDirection:a==="name"?n:void 0,onSortChange:t=>{r("name"),i(t)},children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",sortDirection:a==="invited"?n:void 0,onSortChange:t=>{r("invited"),i(t)},children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",sortDirection:a==="lastSeen"?n:void 0,onSortChange:t=>{r("lastSeen"),i(t)},children:"Last seen"})]})}),e.jsx(l.Body,{children:s.map(t=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:t.name}),e.jsx("div",{className:"text-sm text-gray-500",children:t.email})]})})}),e.jsx(l.RowCell,{children:t.invited}),e.jsx(l.RowCell,{children:t.lastSeen})]},t.email))})]})}},p={render:()=>e.jsx("div",{className:"h-96 overflow-auto border rounded-lg",children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"})]})}),e.jsx(l.Body,{children:[...m,...m,...m].map((a,r)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},`${a.email}-${r}`))})]})})},R={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:m.map(a=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},g={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:m.map(a=>e.jsxs(l.Row,{href:`/users/${a.email}`,onNavigate:()=>alert(`Navigating to ${a.email}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},j={render:()=>e.jsx("div",{style:{width:"700px",overflow:"auto"},children:e.jsxs(l.Root,{layout:"auto",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"}),e.jsx(l.HeaderCell,{children:"Analytics"}),e.jsx(l.HeaderCell,{children:"Guidelines"}),e.jsx(l.HeaderCell,{children:"Libraries"}),e.jsx(l.HeaderCell,{children:"Projects"}),e.jsx(l.HeaderCell,{children:"Groups"}),e.jsx(l.HeaderCell,{children:"Targets"})]})}),e.jsx(l.Body,{stickyFirstColumn:!0,children:m.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:a.analytics}),e.jsx(l.RowCell,{children:a.guidelines}),e.jsx(l.RowCell,{children:a.libraries}),e.jsx(l.RowCell,{children:a.projects}),e.jsx(l.RowCell,{children:a.groups}),e.jsx(l.RowCell,{children:a.targets})]},a.email))})]})})},H={render:()=>e.jsxs(l.Root,{loading:!0,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:Array.from({length:5}).map((a,r)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-gray-200 animate-pulse"}),e.jsxs("div",{children:[e.jsx("div",{className:"w-32 h-4 bg-gray-200 rounded animate-pulse"}),e.jsx("div",{className:"w-48 h-3 mt-1 bg-gray-200 rounded animate-pulse"})]})]})}),e.jsx(l.RowCell,{children:e.jsx("div",{className:"w-24 h-4 bg-gray-200 rounded animate-pulse"})}),e.jsx(l.RowCell,{children:e.jsx("div",{className:"w-20 h-4 bg-gray-200 rounded animate-pulse"})})]},r))})]})},v={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:m.map((a,r)=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),disabled:r%3===0,children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},y={render:()=>e.jsxs(l.Root,{caption:"User Management Dashboard",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:m.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},f={render:()=>e.jsx("div",{style:{width:"200px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{truncate:!0,children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{truncate:!0,children:"Last seen"})]})}),e.jsx(l.Body,{children:m.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{truncate:!0,children:a.name}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{truncate:!0,children:a.lastSeen})]},a.email))})]})})},S={render:()=>{const[a,r]=b.useState(""),[n,i]=b.useState("all"),s=b.useMemo(()=>{let t=[...m];return a&&(t=t.filter(d=>d.firstName.toLowerCase().includes(a.toLowerCase())||d.lastName.toLowerCase().includes(a.toLowerCase()))),n!=="all"&&(t=t.filter(d=>n==="young"?d.age<30:d.age>=30)),t},[a,n]);return e.jsxs(B,{direction:"column",gap:"1rem",children:[e.jsxs(B,{gap:"1rem",children:[e.jsx(q,{placeholder:"Search...",value:a,onChange:t=>r(t.target.value),children:e.jsx(q.Slot,{children:e.jsx(ze,{})})}),e.jsxs(w.Root,{children:[e.jsx(w.Trigger,{children:e.jsx(I,{children:"Filter by age"})}),e.jsxs(w.Content,{children:[e.jsx(w.Item,{onSelect:()=>i("all"),children:"All"}),e.jsx(w.Item,{onSelect:()=>i("young"),children:"Young"}),e.jsx(w.Item,{onSelect:()=>i("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"}),e.jsx(l.HeaderCell,{children:"Role"})]})}),e.jsx(l.Body,{children:s.map(t=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${t.firstName}`),children:[e.jsx(l.RowCell,{children:t.name}),e.jsx(l.RowCell,{children:t.age}),e.jsx(l.RowCell,{children:t.role})]},t.id))})]})]})}},N={render:()=>{const[a,r]=b.useState(new Set),n=()=>{a.size===m.length?r(new Set):r(new Set(m.map(d=>d.id)))},i=(d,c)=>{d.stopPropagation();const o=new Set(a);o.has(c)?o.delete(c):o.add(c),r(o)},s=a.size===m.length,t=a.size>0&&a.size<m.length;return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(z,{value:t?"indeterminate":s,onChange:n})}),e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"})]})}),e.jsx(l.Body,{children:m.map(d=>e.jsxs(l.Row,{selected:a.has(d.id),onClick:()=>console.log(`View details for ${d.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(z,{value:a.has(d.id),onChange:c=>i(c,d.id)})}),e.jsx(l.RowCell,{children:d.name}),e.jsx(l.RowCell,{children:d.age})]},d.id))})]})}},A={name:"Cell Alignment Options",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:m.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s user`),children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(B,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.invited}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},L={render:()=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"100px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"50%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:m.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{width:"50px",children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,width:"100px",children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.lastLogin}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})};var K,U,J;x.parameters={...x.parameters,docs:{...(K=x.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <Table.Root>
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
                            <Switch aria-label="Admin" />
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                        <Table.RowCell>
                            {' '}
                            <Switch aria-label="Analytics" />
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
}`,...(J=(U=x.parameters)==null?void 0:U.docs)==null?void 0:J.source}}};var Y,Q,X;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => {
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
    return <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="250px" sortDirection={sortField === 'name' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('name');
            setSortDirection(direction);
          }}>
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell width="150px" sortDirection={sortField === 'invited' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('invited');
            setSortDirection(direction);
          }}>
                            Invited by
                        </Table.HeaderCell>
                        <Table.HeaderCell width="120px" sortDirection={sortField === 'lastSeen' ? sortDirection : undefined} onSortChange={direction => {
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
}`,...(X=(Q=u.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,le;p.parameters={...p.parameters,docs:{...(Z=p.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <div className="h-96 overflow-auto border rounded-lg">
            <Table.Root>
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
                    {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => <Table.Row key={\`\${user.email}-\${index}\`}>
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
}`,...(le=(ee=p.parameters)==null?void 0:ee.docs)==null?void 0:le.source}}};var ae,re,ne;R.parameters={...R.parameters,docs:{...(ae=R.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                    <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
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
}`,...(ne=(re=R.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var ie,te,se;g.parameters={...g.parameters,docs:{...(ie=g.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                    <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email} href={\`/users/\${user.email}\`} onNavigate={() => alert(\`Navigating to \${user.email}\`)}>
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
}`,...(se=(te=g.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var de,oe,ce;j.parameters={...j.parameters,docs:{...(de=j.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '700px',
    overflow: 'auto'
  }}>
            <Table.Root layout="auto">
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
}`,...(ce=(oe=j.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};var me,be,he;H.parameters={...H.parameters,docs:{...(me=H.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => <Table.Root loading>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                    <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {Array.from({
        length: 5
      }).map((_, index) => <Table.Row key={index}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                                <div>
                                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="w-48 h-3 mt-1 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>
                            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                        </Table.RowCell>
                        <Table.RowCell>
                            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(he=(be=H.parameters)==null?void 0:be.docs)==null?void 0:he.source}}};var we,Ce,Te;v.parameters={...v.parameters,docs:{...(we=v.parameters)==null?void 0:we.docs,source:{originalSource:`{
  render: () => <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                    <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
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
}`,...(Te=(Ce=v.parameters)==null?void 0:Ce.docs)==null?void 0:Te.source}}};var xe,ue,pe;y.parameters={...y.parameters,docs:{...(xe=y.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  render: () => <Table.Root caption="User Management Dashboard">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                    <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
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
}`,...(pe=(ue=y.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var Re,ge,je;f.parameters={...f.parameters,docs:{...(Re=f.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '200px'
  }}>
            <Table.Root>
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
}`,...(je=(ge=f.parameters)==null?void 0:ge.docs)==null?void 0:je.source}}};var He,ve,ye;S.parameters={...S.parameters,docs:{...(He=S.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');
    const filteredAndSortedData = useMemo(() => {
      let result = [...TABLE_DATA];

      // Apply search filter
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
                            <IconMagnifier />
                        </TextInput.Slot>
                    </TextInput>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Button>Filter by age</Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => setAgeFilter('all')}>All</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('young')}>Young</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('old')}>Old</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Flex>

                <Table.Root>
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
}`,...(ye=(ve=S.parameters)==null?void 0:ve.docs)==null?void 0:ye.source}}};var fe,Se,Ne;N.parameters={...N.parameters,docs:{...(fe=N.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => {
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
    return <Table.Root>
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
}`,...(Ne=(Se=N.parameters)==null?void 0:Se.docs)==null?void 0:Ne.source}}};var Ae,Le,Be;A.parameters={...A.parameters,docs:{...(Ae=A.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  name: 'Cell Alignment Options',
  render: () => <Table.Root>
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
}`,...(Be=(Le=A.parameters)==null?void 0:Le.docs)==null?void 0:Be.source}}};var ke,Fe,De;L.parameters={...L.parameters,docs:{...(ke=L.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '800px'
  }}>
            <Table.Root>
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
                            <Table.RowCell width="50px">Fixed Width Content</Table.RowCell>
                            <Table.RowCell truncate width="100px">
                                {\`\${user.firstName} \${user.lastName} - \${user.role} - \${user.lastLogin}\`}
                            </Table.RowCell>
                            <Table.RowCell>Normal Cell</Table.RowCell>
                            <Table.RowCell>Auto Width Content</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(De=(Fe=L.parameters)==null?void 0:Fe.docs)==null?void 0:De.source}}};const Ll=["Basic","Sortable","StickyHeader","Interactive","WithLinks","StickyFirstColumn","LoadingState","Disabled","WithCaption","TruncatedContent","WithSearchAndFilters","WithSelection","CellAlignments","WidthControl"];export{x as Basic,A as CellAlignments,v as Disabled,R as Interactive,H as LoadingState,u as Sortable,j as StickyFirstColumn,p as StickyHeader,f as TruncatedContent,L as WidthControl,y as WithCaption,g as WithLinks,S as WithSearchAndFilters,N as WithSelection,Ll as __namedExportsOrder,Al as default};
