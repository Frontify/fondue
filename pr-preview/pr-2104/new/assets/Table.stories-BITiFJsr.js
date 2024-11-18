import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as m}from"./index-BwDkhjyp.js";import{f as Ye,g as Qe,b as Xe,h as Ze,i as el}from"./fondue-icons332-B3qUYkKY.js";import{B as O}from"./Button-BD32N3dP.js";import{a as M}from"./Checkbox-DaHCOki8.js";import{h as w}from"./Dropdown-Cqkh-O2Z.js";import{F as D}from"./Flex-DCHQJD5L.js";import{S as G}from"./Switch-BQLJOOsp.js";import{T as K}from"./TextInput-BJ3peK85.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./usePreventDropdownOverflow-DisCSAPV.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const ll="_table_h5mi0_4",al="_header_h5mi0_36",rl="_headerCell_h5mi0_47",nl="_sortButton_h5mi0_73",sl="_body_h5mi0_98",il="_rowCell_h5mi0_101",tl="_row_h5mi0_101",h={table:ll,header:al,headerCell:rl,sortButton:nl,body:sl,rowCell:il,row:tl},Ke=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),dl=a=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(a),Ue=a=>(a==null?void 0:a.querySelector(Ke))??null,ol=a=>Array.from(a.querySelectorAll(Ke)),U=(a,r)=>a.children[r],cl=(a,r)=>{const n=a.closest("tr");if(!n)return null;const s=Array.from(n.children).indexOf(a);switch(r){case"ArrowUp":{const t=n.previousElementSibling;return t?U(t,s):null}case"ArrowDown":{const t=n.nextElementSibling;return t?U(t,s):null}case"ArrowLeft":return a.previousElementSibling;case"ArrowRight":return a.nextElementSibling;case"Home":case"End":{const t=Array.from(n.querySelectorAll("td, th"));return t[r==="Home"?0:t.length-1]}}},Je=(a,r)=>{const n=cl(a,r);return n?Ue(n)?n:Je(n,r):null},J=(a,r)=>{if(!dl(a.key))return;const n=Je(r,a.key);if(!n)return;const s=Ue(n);s&&(a.preventDefault(),s.focus())},bl=(a,r,n)=>{var b;const s=ol(r),t=s.indexOf(n);if(t===-1)return;const d=(t+(a.key==="ArrowLeft"?-1:1)+s.length)%s.length;a.preventDefault(),(b=s[d])==null||b.focus()},ml=a=>{const r=a.target,n=r.closest("td, th"),s=r.closest("table");if(s){if(n&&(a.key==="ArrowUp"||a.key==="ArrowDown")){J(a,n);return}if(a.ctrlKey&&n&&(a.key==="Home"||a.key==="End")){J(a,n);return}(a.key==="ArrowLeft"||a.key==="ArrowRight")&&bl(a,s,r)}},$=m.forwardRef(({caption:a,layout:r="fixed",fullWidth:n=!0,children:s,"aria-label":t,"aria-describedby":i,"aria-busy":d=!1},b)=>e.jsx("div",{ref:b,onKeyDown:ml,role:"grid",tabIndex:-1,children:e.jsxs("table",{className:h.table,"data-layout":r,"data-full-width":n,"aria-label":t,"aria-describedby":i,"aria-busy":d,children:[a&&e.jsx("caption",{children:a}),s]})}));$.displayName="Table.Root";const V=m.forwardRef(({children:a,sticky:r=!1,"aria-label":n,"aria-busy":s},t)=>e.jsx("thead",{ref:t,className:h.header,"data-sticky":r,"aria-label":n,"aria-busy":s,children:a}));V.displayName="Table.Header";const W=m.forwardRef(({sortDirection:a,width:r,align:n="left",truncate:s=!1,sortTranslations:t,noShrink:i=!1,scope:d="col",onSortChange:b,children:c},_)=>{const C=m.useId(),I=m.useMemo(()=>{const E=typeof c=="string"?c:"";return a==="ascending"?((t==null?void 0:t.sortDescending)??"Sort by {column} descending").replace("{column}",E):((t==null?void 0:t.sortAscending)??"Sort by {column} ascending").replace("{column}",E)},[c,a,t]),T=()=>{if(!b)return;b(a===void 0||a==="descending"?"ascending":"descending")};return e.jsx("th",{ref:_,className:h.headerCell,style:{textAlign:n,width:r},"data-truncate":s,"data-no-shrink":i,role:"columnheader",scope:d,children:b?e.jsxs("button",{id:C,onClick:T,className:h.sortButton,"aria-label":I,children:[c,a==="ascending"?e.jsx(Ye,{size:"12"}):a==="descending"?e.jsx(Qe,{size:"12"}):null]}):c})});W.displayName="Table.HeaderCell";const z=m.forwardRef(({stickyFirstColumn:a,"aria-busy":r,children:n},s)=>e.jsx("tbody",{ref:s,className:h.body,"data-sticky-first-column":a,"aria-busy":r,children:n}));z.displayName="Table.Body";const P=m.forwardRef(({selected:a=!1,disabled:r=!1,href:n,onNavigate:s,onClick:t,children:i,"aria-label":d},b)=>{const c=(t!==void 0||s!==void 0)&&!r,_=!!(s&&n),C=()=>{r||(s?s():t&&t())},I=T=>{c&&(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),C())};return e.jsx("tr",{ref:b,className:h.row,"data-href":n,"data-selected":a,"data-interactive":c,"data-disabled":r,role:_?"link":c?"button":"row",tabIndex:c?0:void 0,"aria-selected":a,"aria-disabled":r,"aria-label":d,onClick:c?C:void 0,onKeyDown:c?I:void 0,children:i})});P.displayName="Table.Row";const q=m.forwardRef(({truncate:a,align:r="left","aria-label":n,children:s},t)=>e.jsx("td",{ref:t,"data-truncate":a,className:h.rowCell,style:{textAlign:r},"aria-label":n,children:s}));q.displayName="Table.RowCell";const l={Root:$,Header:V,HeaderCell:W,Body:z,Row:P,RowCell:q};$.__docgenInfo={description:"",methods:[],displayName:"Table.Root",props:{layout:{defaultValue:{value:"'fixed'",computed:!1},required:!1},fullWidth:{defaultValue:{value:"true",computed:!1},required:!1},"aria-busy":{defaultValue:{value:"false",computed:!1},required:!1}}};V.__docgenInfo={description:"",methods:[],displayName:"Table.Header",props:{sticky:{defaultValue:{value:"false",computed:!1},required:!1}}};W.__docgenInfo={description:"",methods:[],displayName:"Table.HeaderCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1},noShrink:{defaultValue:{value:"false",computed:!1},required:!1},scope:{defaultValue:{value:"'col'",computed:!1},required:!1}}};z.__docgenInfo={description:"",methods:[],displayName:"Table.Body"};P.__docgenInfo={description:"",methods:[],displayName:"Table.Row",props:{selected:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};q.__docgenInfo={description:"",methods:[],displayName:"Table.RowCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1}}};const Wl={component:l},o=[{id:1,firstName:"Chris",lastName:"Glasser",name:"Chris Glasser",age:32,role:"Senior Developer",email:"c.a.glasser@outlook.com",invited:"Rhonda Rhodes",lastSeen:"Oct 23, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:2,firstName:"David",lastName:"Elson",name:"David Elson",age:28,role:"Product Manager",email:"david29@gmail.com",invited:"Rodger Struck",lastSeen:"Oct 21, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:3,firstName:"Eddie",lastName:"Lake",name:"Eddie Lake",age:35,role:"UX Designer",email:"eddie_lake@gmail.com",invited:"Frances Swann",lastSeen:"Nov 11, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:4,firstName:"James",lastName:"Hall",name:"James Hall",age:41,role:"Technical Lead",email:"james_hall@gmail.com",invited:"Alex Buckmaster",lastSeen:"Nov 12, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:5,firstName:"Jerry",lastName:"Helfer",name:"Jerry Helfer",age:39,role:"Frontend Developer",email:"jerry73@aol.com",invited:"Bradley Lawlor",lastSeen:"Nov 1, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:6,firstName:"Judith",lastName:"Rodriguez",name:"Judith Rodriguez",age:33,role:"Product Designer",email:"judith403@gmail.com",invited:"John Dukes",lastSeen:"Oct 30, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:7,firstName:"Kathy",lastName:"Pacheco",name:"Kathy Pacheco",age:36,role:"Backend Developer",email:"k_pacheco@gmail.com",invited:"James Hall",lastSeen:"Nov 7, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:8,firstName:"Kimberly",lastName:"Mastrangelo",name:"Kimberly Mastrangelo",age:29,role:"QA Engineer",email:"k.r.mastrangelo@outlook.com",invited:"Corina McCoy",lastSeen:"Oct 29, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:9,firstName:"Mary",lastName:"Freund",name:"Mary Freund",age:44,role:"System Architect",email:"m.k.freund@aol.com",invited:"Autumn Phillips",lastSeen:"Oct 31, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:10,firstName:"Patricia",lastName:"Sanders",name:"Patricia Sanders",age:31,role:"DevOps Engineer",email:"patricia95@outlook.com",invited:"Patricia Sanders",lastSeen:"Oct 28, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:11,firstName:"Ricky",lastName:"Smith",name:"Ricky Smith",age:37,role:"Data Engineer",email:"r.m.smith@gmail.com",invited:"Iva Ryan",lastSeen:"Oct 20, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24},{id:12,firstName:"Stephanie",lastName:"Sharkey",name:"Stephanie Sharkey",age:34,role:"Full Stack Developer",email:"s.t.sharkey@outlook.com",invited:"Kenneth Allen",lastSeen:"Oct 26, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0,analytics:24,guidelines:24,libraries:24,projects:24,groups:24,targets:24}],x={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"80px",children:"Admin"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"}),e.jsx(l.HeaderCell,{width:"100px",children:"Analytics access"}),e.jsx(l.HeaderCell,{width:"100px",children:"Guidelines"}),e.jsx(l.HeaderCell,{width:"100px",children:"Libraries"}),e.jsx(l.HeaderCell,{width:"100px",children:"Projects"}),e.jsx(l.HeaderCell,{width:"100px",children:"Groups"}),e.jsx(l.HeaderCell,{width:"100px",children:"Targets"}),e.jsx(l.HeaderCell,{width:"80px",children:"Actions"})]})}),e.jsx(l.Body,{children:o.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:e.jsx(G,{"aria-label":"Admin"})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsxs(l.RowCell,{children:[" ",e.jsx(G,{"aria-label":"Analytics"})]}),e.jsx(l.RowCell,{children:a.guidelines}),e.jsx(l.RowCell,{children:a.libraries}),e.jsx(l.RowCell,{children:a.projects}),e.jsx(l.RowCell,{children:a.groups}),e.jsx(l.RowCell,{children:a.targets}),e.jsx(l.RowCell,{children:e.jsxs(D,{gap:"0.25rem",children:[e.jsx(O,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Xe,{size:16})}),e.jsx(O,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Ze,{size:16})})]})})]},a.email))})]})},u={render:()=>e.jsxs(l.Root,{layout:"auto",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:o.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},R={render:()=>e.jsxs(l.Root,{layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:o.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},p={render:()=>e.jsxs(l.Root,{fullWidth:!1,children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:o.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},g={render:()=>{const[a,r]=m.useState(null),[n,s]=m.useState(),t=[...o].sort((i,d)=>{if(!a||!n)return 0;const b=i[a],c=d[a];return n==="ascending"?b>c?1:-1:b<c?1:-1});return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",sortDirection:a==="name"?n:void 0,onSortChange:i=>{r("name"),s(i)},children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",sortDirection:a==="invited"?n:void 0,onSortChange:i=>{r("invited"),s(i)},children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",sortDirection:a==="lastSeen"?n:void 0,onSortChange:i=>{r("lastSeen"),s(i)},children:"Last seen"})]})}),e.jsx(l.Body,{children:t.map(i=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:i.name}),e.jsx("div",{className:"text-sm text-gray-500",children:i.email})]})})}),e.jsx(l.RowCell,{children:i.invited}),e.jsx(l.RowCell,{children:i.lastSeen})]},i.email))})]})}},j={render:()=>e.jsx("div",{className:"h-96 overflow-auto border rounded-lg",children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"})]})}),e.jsx(l.Body,{children:[...o,...o,...o].map((a,r)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},`${a.email}-${r}`))})]})})},H={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:o.map(a=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},y={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:o.map(a=>e.jsxs(l.Row,{href:`/users/${a.email}`,onNavigate:()=>alert(`Navigating to ${a.email}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},f={render:()=>e.jsx("div",{style:{width:"700px",overflow:"auto"},children:e.jsxs(l.Root,{layout:"auto",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"}),e.jsx(l.HeaderCell,{children:"Analytics"}),e.jsx(l.HeaderCell,{children:"Guidelines"}),e.jsx(l.HeaderCell,{children:"Libraries"}),e.jsx(l.HeaderCell,{children:"Projects"}),e.jsx(l.HeaderCell,{children:"Groups"}),e.jsx(l.HeaderCell,{children:"Targets"})]})}),e.jsx(l.Body,{stickyFirstColumn:!0,children:o.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:a.analytics}),e.jsx(l.RowCell,{children:a.guidelines}),e.jsx(l.RowCell,{children:a.libraries}),e.jsx(l.RowCell,{children:a.projects}),e.jsx(l.RowCell,{children:a.groups}),e.jsx(l.RowCell,{children:a.targets})]},a.email))})]})})},v={render:()=>e.jsxs(l.Root,{loading:!0,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:Array.from({length:5}).map((a,r)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-gray-200 animate-pulse"}),e.jsxs("div",{children:[e.jsx("div",{className:"w-32 h-4 bg-gray-200 rounded animate-pulse"}),e.jsx("div",{className:"w-48 h-3 mt-1 bg-gray-200 rounded animate-pulse"})]})]})}),e.jsx(l.RowCell,{children:e.jsx("div",{className:"w-24 h-4 bg-gray-200 rounded animate-pulse"})}),e.jsx(l.RowCell,{children:e.jsx("div",{className:"w-20 h-4 bg-gray-200 rounded animate-pulse"})})]},r))})]})},S={render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:o.map((a,r)=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),disabled:r%3===0,children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},N={render:()=>e.jsxs(l.Root,{caption:"User Management Dashboard",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"})]})}),e.jsx(l.Body,{children:o.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},A={render:()=>e.jsx("div",{style:{width:"200px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{truncate:!0,children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{truncate:!0,children:"Last seen"})]})}),e.jsx(l.Body,{children:o.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{truncate:!0,children:a.name}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{truncate:!0,children:a.lastSeen})]},a.email))})]})})},L={render:()=>{const[a,r]=m.useState(""),[n,s]=m.useState("all"),t=m.useMemo(()=>{let i=[...o];return a&&(i=i.filter(d=>d.firstName.toLowerCase().includes(a.toLowerCase())||d.lastName.toLowerCase().includes(a.toLowerCase()))),n!=="all"&&(i=i.filter(d=>n==="young"?d.age<30:d.age>=30)),i},[a,n]);return e.jsxs(D,{direction:"column",gap:"1rem",children:[e.jsxs(D,{gap:"1rem",children:[e.jsx(K,{placeholder:"Search...",value:a,onChange:i=>r(i.target.value),children:e.jsx(K.Slot,{children:e.jsx(el,{})})}),e.jsxs(w.Root,{children:[e.jsx(w.Trigger,{children:e.jsx(O,{children:"Filter by age"})}),e.jsxs(w.Content,{children:[e.jsx(w.Item,{onSelect:()=>s("all"),children:"All"}),e.jsx(w.Item,{onSelect:()=>s("young"),children:"Young"}),e.jsx(w.Item,{onSelect:()=>s("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"}),e.jsx(l.HeaderCell,{children:"Role"})]})}),e.jsx(l.Body,{children:t.map(i=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${i.firstName}`),children:[e.jsx(l.RowCell,{children:i.name}),e.jsx(l.RowCell,{children:i.age}),e.jsx(l.RowCell,{children:i.role})]},i.id))})]})]})}},B={render:()=>{const[a,r]=m.useState(new Set),n=()=>{a.size===o.length?r(new Set):r(new Set(o.map(d=>d.id)))},s=(d,b)=>{d.stopPropagation();const c=new Set(a);c.has(b)?c.delete(b):c.add(b),r(c)},t=a.size===o.length,i=a.size>0&&a.size<o.length;return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(M,{value:i?"indeterminate":t,onChange:n})}),e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"})]})}),e.jsx(l.Body,{children:o.map(d=>e.jsxs(l.Row,{selected:a.has(d.id),onClick:()=>console.log(`View details for ${d.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(M,{value:a.has(d.id),onChange:b=>s(b,d.id)})}),e.jsx(l.RowCell,{children:d.name}),e.jsx(l.RowCell,{children:d.age})]},d.id))})]})}},k={name:"Cell Alignment Options",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:o.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s user`),children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(D,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.invited}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},F={render:()=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"100px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"50%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:o.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.lastLogin}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})};var Y,Q,X;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(X=(Q=x.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,le;u.parameters={...u.parameters,docs:{...(Z=u.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(le=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:le.source}}};var ae,re,ne;R.parameters={...R.parameters,docs:{...(ae=R.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(ne=(re=R.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var se,ie,te;p.parameters={...p.parameters,docs:{...(se=p.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(te=(ie=p.parameters)==null?void 0:ie.docs)==null?void 0:te.source}}};var de,oe,ce;g.parameters={...g.parameters,docs:{...(de=g.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(ce=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};var be,me,he;j.parameters={...j.parameters,docs:{...(be=j.parameters)==null?void 0:be.docs,source:{originalSource:`{
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
}`,...(he=(me=j.parameters)==null?void 0:me.docs)==null?void 0:he.source}}};var we,Te,Ce;H.parameters={...H.parameters,docs:{...(we=H.parameters)==null?void 0:we.docs,source:{originalSource:`{
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
}`,...(Ce=(Te=H.parameters)==null?void 0:Te.docs)==null?void 0:Ce.source}}};var xe,ue,Re;y.parameters={...y.parameters,docs:{...(xe=y.parameters)==null?void 0:xe.docs,source:{originalSource:`{
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
}`,...(Re=(ue=y.parameters)==null?void 0:ue.docs)==null?void 0:Re.source}}};var pe,ge,je;f.parameters={...f.parameters,docs:{...(pe=f.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(je=(ge=f.parameters)==null?void 0:ge.docs)==null?void 0:je.source}}};var He,ye,fe;v.parameters={...v.parameters,docs:{...(He=v.parameters)==null?void 0:He.docs,source:{originalSource:`{
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
}`,...(fe=(ye=v.parameters)==null?void 0:ye.docs)==null?void 0:fe.source}}};var ve,Se,Ne;S.parameters={...S.parameters,docs:{...(ve=S.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(Ne=(Se=S.parameters)==null?void 0:Se.docs)==null?void 0:Ne.source}}};var Ae,Le,Be;N.parameters={...N.parameters,docs:{...(Ae=N.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(Be=(Le=N.parameters)==null?void 0:Le.docs)==null?void 0:Be.source}}};var ke,Fe,De;A.parameters={...A.parameters,docs:{...(ke=A.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(De=(Fe=A.parameters)==null?void 0:Fe.docs)==null?void 0:De.source}}};var _e,Ie,Ee;L.parameters={...L.parameters,docs:{...(_e=L.parameters)==null?void 0:_e.docs,source:{originalSource:`{
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
}`,...(Ee=(Ie=L.parameters)==null?void 0:Ie.docs)==null?void 0:Ee.source}}};var Oe,$e,Ve;B.parameters={...B.parameters,docs:{...(Oe=B.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
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
}`,...(Ve=($e=B.parameters)==null?void 0:$e.docs)==null?void 0:Ve.source}}};var We,ze,Pe;k.parameters={...k.parameters,docs:{...(We=k.parameters)==null?void 0:We.docs,source:{originalSource:`{
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
}`,...(Pe=(ze=k.parameters)==null?void 0:ze.docs)==null?void 0:Pe.source}}};var qe,Me,Ge;F.parameters={...F.parameters,docs:{...(qe=F.parameters)==null?void 0:qe.docs,source:{originalSource:`{
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
}`,...(Ge=(Me=F.parameters)==null?void 0:Me.docs)==null?void 0:Ge.source}}};const zl=["Basic","AutoLayout","FixedLayout","NonFullWidth","Sortable","StickyHeader","Interactive","WithLinks","StickyFirstColumn","LoadingState","Disabled","WithCaption","TruncatedContent","WithSearchAndFilters","WithSelection","CellAlignments","WidthControl"];export{u as AutoLayout,x as Basic,k as CellAlignments,S as Disabled,R as FixedLayout,H as Interactive,v as LoadingState,p as NonFullWidth,g as Sortable,f as StickyFirstColumn,j as StickyHeader,A as TruncatedContent,F as WidthControl,N as WithCaption,y as WithLinks,L as WithSearchAndFilters,B as WithSelection,zl as __namedExportsOrder,Wl as default};
