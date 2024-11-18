import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as m}from"./index-BwDkhjyp.js";import{f as Me,g as Ge,b as Ke,h as Ue,i as Je,j as Ye}from"./fondue-icons332-CfapKW84.js";import{B as I}from"./Button-BD32N3dP.js";import{a as P}from"./Checkbox-D9XbQE54.js";import{h}from"./Dropdown-Q1sa1_ON.js";import{F}from"./Flex-DCHQJD5L.js";import{S as q}from"./Switch-BQLJOOsp.js";import{T as M}from"./TextInput-CpB5g_th.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./usePreventDropdownOverflow-DisCSAPV.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const Qe="_table_b85gb_4",Xe="_header_b85gb_36",Ze="_headerCell_b85gb_47",el="_sortButton_b85gb_73",ll="_body_b85gb_98",al="_rowCell_b85gb_101",rl="_row_b85gb_101",C={table:Qe,header:Xe,headerCell:Ze,sortButton:el,body:ll,rowCell:al,row:rl},Ve=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),nl=a=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(a),Pe=a=>(a==null?void 0:a.querySelector(Ve))??null,sl=a=>Array.from(a.querySelectorAll(Ve)),G=(a,r)=>a.children[r],il=(a,r)=>{const n=a.closest("tr");if(!n)return null;const s=Array.from(n.children).indexOf(a);switch(r){case"ArrowUp":{const t=n.previousElementSibling;return t?G(t,s):null}case"ArrowDown":{const t=n.nextElementSibling;return t?G(t,s):null}case"ArrowLeft":return a.previousElementSibling;case"ArrowRight":return a.nextElementSibling;case"Home":case"End":{const t=Array.from(n.querySelectorAll("td, th"));return t[r==="Home"?0:t.length-1]}}},qe=(a,r)=>{const n=il(a,r);return n?Pe(n)?n:qe(n,r):null},K=(a,r)=>{if(!nl(a.key))return;const n=qe(r,a.key);if(!n)return;const s=Pe(n);s&&(a.preventDefault(),s.focus())},tl=(a,r,n)=>{var c;const s=sl(r),t=s.indexOf(n);if(t===-1)return;const o=(t+(a.key==="ArrowLeft"?-1:1)+s.length)%s.length;a.preventDefault(),(c=s[o])==null||c.focus()},ol=a=>{const r=a.target,n=r.closest("td, th"),s=r.closest("table");if(s){if(n&&(a.key==="ArrowUp"||a.key==="ArrowDown")){K(a,n);return}if(a.ctrlKey&&n&&(a.key==="Home"||a.key==="End")){K(a,n);return}(a.key==="ArrowLeft"||a.key==="ArrowRight")&&tl(a,s,r)}},E=m.forwardRef(({caption:a,layout:r="fixed",fullWidth:n=!0,children:s,"aria-label":t,"aria-describedby":i,"aria-busy":o=!1},c)=>e.jsx("div",{ref:c,onKeyDown:ol,role:"grid",tabIndex:-1,children:e.jsxs("table",{className:C.table,"data-layout":r,"data-full-width":n,"aria-label":t,"aria-describedby":i,"aria-busy":o,children:[a&&e.jsx("caption",{children:a}),s]})}));E.displayName="Table.Root";const O=m.forwardRef(({sticky:a=!1,children:r,"aria-label":n,"aria-busy":s},t)=>e.jsx("thead",{ref:t,className:C.header,"data-sticky":a,"aria-label":n,"aria-busy":s,children:r}));O.displayName="Table.Header";const $=m.forwardRef(({sortDirection:a,width:r,align:n="left",truncate:s=!1,sortTranslations:t,noShrink:i=!1,onSortChange:o,children:c},b)=>{const D=m.useId(),w=m.useMemo(()=>{const T=typeof c=="string"?c:"";return a==="ascending"?((t==null?void 0:t.sortDescending)??"Sort by {column} descending").replace("{column}",T):((t==null?void 0:t.sortAscending)??"Sort by {column} ascending").replace("{column}",T)},[c,a,t]),_=()=>{if(!o)return;o(a===void 0||a==="descending"?"ascending":"descending")};return e.jsx("th",{ref:b,className:C.headerCell,style:{textAlign:n,width:r},"data-truncate":s,"data-no-shrink":i,scope:"col",children:o?e.jsxs("button",{id:D,onClick:_,className:C.sortButton,"aria-label":w,children:[c,a==="ascending"?e.jsx(Me,{size:"12"}):a==="descending"?e.jsx(Ge,{size:"12"}):null]}):c})});$.displayName="Table.HeaderCell";const z=m.forwardRef(({stickyFirstColumn:a,children:r,"aria-busy":n},s)=>e.jsx("tbody",{ref:s,className:C.body,"data-sticky-first-column":a,"aria-busy":n,children:r}));z.displayName="Table.Body";const W=m.forwardRef(({selected:a=!1,disabled:r=!1,href:n,onNavigate:s,onClick:t,children:i,"aria-label":o},c)=>{const b=(t!==void 0||s!==void 0)&&!r,D=!!(s&&n),w=()=>{r||(s?s(n):t&&t())},_=T=>{b&&(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),w())};return e.jsx("tr",{ref:c,className:C.row,"data-href":n,"data-selected":a,"data-interactive":b,"data-disabled":r,role:D?"link":b?"button":"row",tabIndex:b?0:void 0,"aria-selected":a,"aria-disabled":r,"aria-label":o,onClick:b?w:void 0,onKeyDown:b?_:void 0,children:i})});W.displayName="Table.Row";const V=m.forwardRef(({truncate:a,align:r="left",children:n,"aria-label":s},t)=>e.jsx("td",{ref:t,"data-truncate":a,className:C.rowCell,style:{textAlign:r},"aria-label":s,children:n}));V.displayName="Table.RowCell";const l={Root:E,Header:O,HeaderCell:$,Body:z,Row:W,RowCell:V};E.__docgenInfo={description:"",methods:[],displayName:"Table.Root",props:{layout:{defaultValue:{value:"'fixed'",computed:!1},required:!1},fullWidth:{defaultValue:{value:"true",computed:!1},required:!1},"aria-busy":{defaultValue:{value:"false",computed:!1},required:!1}}};O.__docgenInfo={description:"",methods:[],displayName:"Table.Header",props:{sticky:{defaultValue:{value:"false",computed:!1},required:!1}}};$.__docgenInfo={description:"",methods:[],displayName:"Table.HeaderCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1},noShrink:{defaultValue:{value:"false",computed:!1},required:!1}}};z.__docgenInfo={description:"",methods:[],displayName:"Table.Body"};W.__docgenInfo={description:"",methods:[],displayName:"Table.Row",props:{selected:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};V.__docgenInfo={description:"",methods:[],displayName:"Table.RowCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1}}};const El={component:l},d=[{id:1,firstName:"Chris",lastName:"Glasser",name:"Chris Glasser",age:32,role:"Senior Developer",email:"c.a.glasser@outlook.com",invited:"Rhonda Rhodes",lastSeen:"Oct 23, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:2,firstName:"David",lastName:"Elson",name:"David Elson",age:28,role:"Product Manager",email:"david29@gmail.com",invited:"Rodger Struck",lastSeen:"Oct 21, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:3,firstName:"Eddie",lastName:"Lake",name:"Eddie Lake",age:35,role:"UX Designer",email:"eddie_lake@gmail.com",invited:"Frances Swann",lastSeen:"Nov 11, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:4,firstName:"James",lastName:"Hall",name:"James Hall",age:41,role:"Technical Lead",email:"james_hall@gmail.com",invited:"Alex Buckmaster",lastSeen:"Nov 12, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:5,firstName:"Jerry",lastName:"Helfer",name:"Jerry Helfer",age:39,role:"Frontend Developer",email:"jerry73@aol.com",invited:"Bradley Lawlor",lastSeen:"Nov 1, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:6,firstName:"Judith",lastName:"Rodriguez",name:"Judith Rodriguez",age:33,role:"Product Designer",email:"judith403@gmail.com",invited:"John Dukes",lastSeen:"Oct 30, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:7,firstName:"Kathy",lastName:"Pacheco",name:"Kathy Pacheco",age:36,role:"Backend Developer",email:"k_pacheco@gmail.com",invited:"James Hall",lastSeen:"Nov 7, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:8,firstName:"Kimberly",lastName:"Mastrangelo",name:"Kimberly Mastrangelo",age:29,role:"QA Engineer",email:"k.r.mastrangelo@outlook.com",invited:"Corina McCoy",lastSeen:"Oct 29, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:9,firstName:"Mary",lastName:"Freund",name:"Mary Freund",age:44,role:"System Architect",email:"m.k.freund@aol.com",invited:"Autumn Phillips",lastSeen:"Oct 31, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:10,firstName:"Patricia",lastName:"Sanders",name:"Patricia Sanders",age:31,role:"DevOps Engineer",email:"patricia95@outlook.com",invited:"Patricia Sanders",lastSeen:"Oct 28, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:11,firstName:"Ricky",lastName:"Smith",name:"Ricky Smith",age:37,role:"Data Engineer",email:"r.m.smith@gmail.com",invited:"Iva Ryan",lastSeen:"Oct 20, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:12,firstName:"Stephanie",lastName:"Sharkey",name:"Stephanie Sharkey",age:34,role:"Full Stack Developer",email:"s.t.sharkey@outlook.com",invited:"Kenneth Allen",lastSeen:"Oct 26, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24}],u={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"80px",children:"Admin"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"}),e.jsx(l.HeaderCell,{width:"100px",children:"Analytics access"}),e.jsx(l.HeaderCell,{width:"100px",children:"Guidelines"}),e.jsx(l.HeaderCell,{width:"100px",children:"Libraries"}),e.jsx(l.HeaderCell,{width:"100px",children:"Projects"}),e.jsx(l.HeaderCell,{width:"100px",children:"Groups"}),e.jsx(l.HeaderCell,{width:"100px",children:"Targets"}),e.jsx(l.HeaderCell,{width:"80px",children:"Actions"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:e.jsx(q,{size:"small","aria-label":"Admin"})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:e.jsx(q,{size:"small","aria-label":"Analytics"})}),e.jsx(l.RowCell,{children:a.guidelines}),e.jsx(l.RowCell,{children:a.libraries}),e.jsx(l.RowCell,{children:a.projects}),e.jsx(l.RowCell,{children:a.groups}),e.jsx(l.RowCell,{children:a.targets}),e.jsx(l.RowCell,{children:e.jsxs(F,{gap:"0.25rem",children:[e.jsx(I,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Ke,{size:16})}),e.jsx(I,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Ue,{size:16})})]})})]},a.email))})]})},x={render:()=>e.jsxs(l.Root,{layout:"auto",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},R={render:()=>e.jsxs(l.Root,{layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},p={render:()=>e.jsxs(l.Root,{fullWidth:!1,children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},g={render:()=>{const[a,r]=m.useState(null),[n,s]=m.useState(),t=[...d].sort((i,o)=>{if(!a||!n)return 0;const c=i[a],b=o[a];return n==="ascending"?c>b?1:-1:c<b?1:-1});return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortDirection:a==="name"?n:void 0,onSortChange:i=>{r("name"),s(i)},children:"Name"}),e.jsx(l.HeaderCell,{sortDirection:a==="invited"?n:void 0,onSortChange:i=>{r("invited"),s(i)},children:"Invited by"}),e.jsx(l.HeaderCell,{sortDirection:a==="lastSeen"?n:void 0,onSortChange:i=>{r("lastSeen"),s(i)},children:"Last seen"})]})}),e.jsx(l.Body,{children:t.map(i=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:i.name}),e.jsx("div",{className:"text-sm text-gray-500",children:i.email})]})})}),e.jsx(l.RowCell,{children:i.invited}),e.jsx(l.RowCell,{children:i.lastSeen})]},i.email))})]})}},j={render:()=>e.jsx("div",{className:"h-96 overflow-auto border rounded-lg",children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"})]})}),e.jsx(l.Body,{children:[...d,...d,...d].map((a,r)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},`${a.email}-${r}`))})]})})},H={render:()=>e.jsx("div",{style:{width:"700px",overflow:"auto"},children:e.jsxs(l.Root,{layout:"auto",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"}),e.jsx(l.HeaderCell,{children:"Analytics"}),e.jsx(l.HeaderCell,{children:"Guidelines"}),e.jsx(l.HeaderCell,{children:"Libraries"}),e.jsx(l.HeaderCell,{children:"Projects"}),e.jsx(l.HeaderCell,{children:"Groups"}),e.jsx(l.HeaderCell,{children:"Targets"})]})}),e.jsx(l.Body,{stickyFirstColumn:!0,children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:a.analytics}),e.jsx(l.RowCell,{children:a.guidelines}),e.jsx(l.RowCell,{children:a.libraries}),e.jsx(l.RowCell,{children:a.projects}),e.jsx(l.RowCell,{children:a.groups}),e.jsx(l.RowCell,{children:a.targets})]},a.email))})]})})},y={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},f={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{href:`/users/${a.email}`,onNavigate:r=>alert(`Navigating to ${r}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},S={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:d.map((a,r)=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),disabled:r%3===0,children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},v={render:()=>e.jsxs(l.Root,{caption:"User Management Dashboard",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:d.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},N={render:()=>e.jsx("div",{style:{width:"200px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{truncate:!0,children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{truncate:!0,children:"Last seen"})]})}),e.jsx(l.Body,{children:d.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{truncate:!0,children:a.name}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{truncate:!0,children:a.lastSeen})]},a.email))})]})})},A={render:()=>{const[a,r]=m.useState(""),[n,s]=m.useState("all"),t=m.useMemo(()=>{let i=[...d];return a&&(i=i.filter(o=>o.firstName.toLowerCase().includes(a.toLowerCase())||o.lastName.toLowerCase().includes(a.toLowerCase()))),n!=="all"&&(i=i.filter(o=>n==="young"?o.age<30:o.age>=30)),i},[a,n]);return e.jsxs(F,{direction:"column",gap:"1rem",children:[e.jsxs(F,{gap:"1rem",children:[e.jsx(M,{placeholder:"Search...",value:a,onChange:i=>r(i.target.value),children:e.jsx(M.Slot,{children:e.jsx(Je,{size:"16"})})}),e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsxs(I,{emphasis:"default",children:[e.jsx(Ye,{size:"16"}),"Filter by age"]})}),e.jsxs(h.Content,{children:[e.jsx(h.Item,{onSelect:()=>s("all"),children:"All"}),e.jsx(h.Item,{onSelect:()=>s("young"),children:"Young"}),e.jsx(h.Item,{onSelect:()=>s("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"}),e.jsx(l.HeaderCell,{children:"Role"})]})}),e.jsx(l.Body,{children:t.map(i=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${i.firstName}`),children:[e.jsx(l.RowCell,{children:i.name}),e.jsx(l.RowCell,{children:i.age}),e.jsx(l.RowCell,{children:i.role})]},i.id))})]})]})}},L={render:()=>{const[a,r]=m.useState(new Set),n=()=>{a.size===d.length?r(new Set):r(new Set(d.map(o=>o.id)))},s=(o,c)=>{o.stopPropagation();const b=new Set(a);b.has(c)?b.delete(c):b.add(c),r(b)},t=a.size===d.length,i=a.size>0&&a.size<d.length;return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(P,{value:i?"indeterminate":t,onChange:n})}),e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"})]})}),e.jsx(l.Body,{children:d.map(o=>e.jsxs(l.Row,{selected:a.has(o.id),onClick:()=>console.log(`View details for ${o.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(P,{value:a.has(o.id),onChange:c=>s(c,o.id)})}),e.jsx(l.RowCell,{children:o.name}),e.jsx(l.RowCell,{children:o.age})]},o.id))})]})}},B={name:"Cell Alignment Options",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s user`),children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(F,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.invited}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},k={render:()=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"100px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"50%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:d.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.lastLogin}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})};var U,J,Y;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(Y=(J=u.parameters)==null?void 0:J.docs)==null?void 0:Y.source}}};var Q,X,Z;x.parameters={...x.parameters,docs:{...(Q=x.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <Table.Root layout="auto">
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
}`,...(Z=(X=x.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,le,ae;R.parameters={...R.parameters,docs:{...(ee=R.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <Table.Root layout="fixed">
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
}`,...(ae=(le=R.parameters)==null?void 0:le.docs)==null?void 0:ae.source}}};var re,ne,se;p.parameters={...p.parameters,docs:{...(re=p.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <Table.Root fullWidth={false}>
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
}`,...(se=(ne=p.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var ie,te,oe;g.parameters={...g.parameters,docs:{...(ie=g.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(oe=(te=g.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var de,ce,be;j.parameters={...j.parameters,docs:{...(de=j.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(be=(ce=j.parameters)==null?void 0:ce.docs)==null?void 0:be.source}}};var me,Te,Ce;H.parameters={...H.parameters,docs:{...(me=H.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
}`,...(Ce=(Te=H.parameters)==null?void 0:Te.docs)==null?void 0:Ce.source}}};var he,we,ue;y.parameters={...y.parameters,docs:{...(he=y.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => <Table.Root>
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
}`,...(ue=(we=y.parameters)==null?void 0:we.docs)==null?void 0:ue.source}}};var xe,Re,pe;f.parameters={...f.parameters,docs:{...(xe=f.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  render: () => <Table.Root>
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
}`,...(pe=(Re=f.parameters)==null?void 0:Re.docs)==null?void 0:pe.source}}};var ge,je,He;S.parameters={...S.parameters,docs:{...(ge=S.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: () => <Table.Root>
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
}`,...(He=(je=S.parameters)==null?void 0:je.docs)==null?void 0:He.source}}};var ye,fe,Se;v.parameters={...v.parameters,docs:{...(ye=v.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: () => <Table.Root caption="User Management Dashboard">
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
}`,...(Se=(fe=v.parameters)==null?void 0:fe.docs)==null?void 0:Se.source}}};var ve,Ne,Ae;N.parameters={...N.parameters,docs:{...(ve=N.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(Ae=(Ne=N.parameters)==null?void 0:Ne.docs)==null?void 0:Ae.source}}};var Le,Be,ke;A.parameters={...A.parameters,docs:{...(Le=A.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  render: () => {
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
}`,...(ke=(Be=A.parameters)==null?void 0:Be.docs)==null?void 0:ke.source}}};var Fe,De,_e;L.parameters={...L.parameters,docs:{...(Fe=L.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
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
}`,...(_e=(De=L.parameters)==null?void 0:De.docs)==null?void 0:_e.source}}};var Ie,Ee,Oe;B.parameters={...B.parameters,docs:{...(Ie=B.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
}`,...(Oe=(Ee=B.parameters)==null?void 0:Ee.docs)==null?void 0:Oe.source}}};var $e,ze,We;k.parameters={...k.parameters,docs:{...($e=k.parameters)==null?void 0:$e.docs,source:{originalSource:`{
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
}`,...(We=(ze=k.parameters)==null?void 0:ze.docs)==null?void 0:We.source}}};const Ol=["Basic","AutoLayout","FixedLayout","NonFullWidth","Sortable","StickyHeader","StickyFirstColumn","Interactive","WithLinks","Disabled","WithCaption","TruncatedContent","WithSearchAndFilters","WithSelection","CellAlignments","WidthControl"];export{x as AutoLayout,u as Basic,B as CellAlignments,S as Disabled,R as FixedLayout,y as Interactive,p as NonFullWidth,g as Sortable,H as StickyFirstColumn,j as StickyHeader,N as TruncatedContent,k as WidthControl,v as WithCaption,f as WithLinks,A as WithSearchAndFilters,L as WithSelection,Ol as __namedExportsOrder,El as default};
