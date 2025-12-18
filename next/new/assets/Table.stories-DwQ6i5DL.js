import{j as e,F as b,r as _}from"./iframe-B9WO36g8.js";import{h as M,i as W,j as ma,k as Ca}from"./fondue-icons369-D6ap94_o.js";import{B as i}from"./Button-Cek6yi4L.js";import{a as $}from"./Checkbox-Dgw2McXL.js";import{h as E}from"./Dropdown-CfBrp-7c.js";import{S as U}from"./Switch-o1T8E10P.js";import{T as V}from"./TextInput-CddozNZA.js";import{T as Ra,a as ua,b as ha,c as xa,d as Ha,e as pa,f as l}from"./Table-fYWKZG8R.js";import"./preload-helper-mNEUNaaY.js";import"./index-D7GDaycB.js";import"./index-Bs6hBZzB.js";import"./index-DCejnND8.js";import"./index-CiQ4WyZq.js";import"./index-P_3ej46k.js";import"./index-CnCr7RGM.js";import"./index-CMI8xJPu.js";import"./index-DdNxcxH5.js";import"./index-BbhV4El_.js";import"./component-DctXj91L.js";import"./index-QW7dSKAk.js";import"./useTranslation-DkHcHqZ6.js";import"./LoadingCircle-V1VmjbZ6.js";import"./useSyncRefs-DnoHjq6h.js";import"./domUtilities-DGDVwu3_.js";import"./Box-Df4tUZOZ.js";const Ya={title:"Components/Table",component:pa,subcomponents:{"Table.Header":Ha,"Table.HeaderCell":xa,"Table.Body":ha,"Table.Row":ua,"Table.RowCell":Ra},tags:["autodocs"],parameters:{status:{type:"released"}},args:{"aria-label":"User Management Table"},argTypes:{layout:{control:{type:"select"},options:["auto","fixed"],defaultValue:"auto"},gutter:{control:{type:"text"},description:'Spacing between table cells (horizontal gutter). Accepts any CSS length value (e.g., "16px", "1rem", "48px")',defaultValue:"0px"}}},r=[{id:1,firstName:"Chris",lastName:"Glasser",name:"Chris Glasser",age:32,role:"Senior Developer",email:"c.a.glasser@outlook.com",invited:"Rhonda Rhodes",lastSeen:"Oct 23, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:2,firstName:"David",lastName:"Elson",name:"David Elson",age:28,role:"Product Manager",email:"david29@gmail.com",invited:"Rodger Struck",lastSeen:"Oct 21, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:3,firstName:"Eddie",lastName:"Lake",name:"Eddie Lake",age:35,role:"UX Designer",email:"eddie_lake@gmail.com",invited:"Frances Swann",lastSeen:"Nov 11, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:4,firstName:"James",lastName:"Hall",name:"James Hall",age:41,role:"Technical Lead",email:"james_hall@gmail.com",invited:"Alex Buckmaster",lastSeen:"Nov 12, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:5,firstName:"Jerry",lastName:"Helfer",name:"Jerry Helfer",age:39,role:"Frontend Developer",email:"jerry73@aol.com",invited:"Bradley Lawlor",lastSeen:"Nov 1, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0}],w={render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Admin"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"}),e.jsx(l.HeaderCell,{children:"Analytics access"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{children:r.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:e.jsx(U,{size:"small","aria-label":"Admin"})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:e.jsx(U,{size:"small","aria-label":"Analytics"})}),e.jsx(l.RowCell,{children:e.jsxs(b,{gap:"0.25rem",children:[e.jsx(i,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(M,{size:16})}),e.jsx(i,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(W,{size:16})})]})})]},a.email))})]})},m={render:({...n})=>e.jsxs(l.Root,{...n,fontSize:"small",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:r.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},C={render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:r.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},R={render:({...n})=>e.jsxs(l.Root,{...n,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:r.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},u={render:({...n})=>{const[a,t]=_.useState(null),[d,T]=_.useState(),z=[...r].sort((s,o)=>{if(!a||!d)return 0;const c=s[a],I=o[a];return d==="ascending"?c>I?1:-1:c<I?1:-1});return e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortDirection:a==="name"?d:void 0,onSortChange:s=>{t("name"),T(s)},children:"Name"}),e.jsx(l.HeaderCell,{truncate:!0,sortDirection:a==="invited"?d:void 0,onSortChange:s=>{t("invited"),T(s)},state:"loading",loadingStateAriaLabel:"Loading Data",children:"Invited by"}),e.jsx(l.HeaderCell,{sortDirection:a==="lastSeen"?d:void 0,onSortChange:s=>{t("lastSeen"),T(s)},children:"Last seen"})]})}),e.jsx(l.Body,{children:z.map(s=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:s.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:s.email})]})})}),e.jsx(l.RowCell,{truncate:!0,children:s.invited}),e.jsx(l.RowCell,{children:s.lastSeen})]},s.email))})]})}},h={render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"})]})}),e.jsx(l.Body,{children:[...r,...r,...r,...r,...r,...r].map((a,t)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},`${a.email}-${t}`))})]})},x={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"})]})}),e.jsx(l.Body,{firstColumnSticky:!0,children:r.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},a.email))})]})},H={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"})]})}),e.jsx(l.Body,{firstColumnSticky:!0,children:[...r,...r,...r].map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},a.email))})]})},p={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{lastColumnSticky:!0,children:r.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-small tw-text-primary-on-primary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:e.jsxs(b,{gap:"0.25rem",children:[e.jsx(i,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(M,{size:16})}),e.jsx(i,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(W,{size:16})})]})})]},a.email))})]})},g={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{lastColumnSticky:!0,children:[...r,...r,...r].map((a,t)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-small tw-text-primary-on-primary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:e.jsxs(b,{gap:"0.25rem",children:[e.jsx(i,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(M,{size:16})}),e.jsx(i,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(W,{size:16})})]})})]},`${a.email}-${t}`))})]})},j={name:"Sticky Header, Left & Right Columns",parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{firstColumnSticky:!0,lastColumnSticky:!0,children:[...r,...r,...r].map((a,t)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-small tw-text-primary-on-primary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:e.jsxs(b,{gap:"0.25rem",children:[e.jsx(i,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(M,{size:16})}),e.jsx(i,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(W,{size:16})})]})})]},`${a.email}-${t}`))})]})},v={render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Action"})]})}),e.jsx(l.Body,{children:r.map(a=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:e.jsx(i,{onPress:()=>alert("Button pressed — this does NOT trigger row click"),children:e.jsx("span",{children:"Press me"})})})]},a.email))})]})},y={render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:r.map((a,t)=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),disabled:t%3===0,children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},A={render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Caption,{children:"User Management Dashboard"}),e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:r.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},S={render:({...n})=>e.jsx("div",{style:{width:"500px"},children:e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{truncate:!0,children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{truncate:!0,children:"Last seen"})]})}),e.jsx(l.Body,{children:r.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{truncate:!0,children:a.name}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{truncate:!0,children:a.lastSeen})]},a.email))})]})})},B={render:({...n})=>{const[a,t]=_.useState(""),[d,T]=_.useState("all"),z=_.useMemo(()=>{let s=[...r];return a&&(s=s.filter(o=>o.firstName.toLowerCase().includes(a.toLowerCase())||o.lastName.toLowerCase().includes(a.toLowerCase()))),d!=="all"&&(s=s.filter(o=>d==="young"?o.age<30:o.age>=30)),s},[a,d]);return e.jsxs(b,{direction:"column",gap:"1rem",children:[e.jsxs(b,{gap:"1rem",children:[e.jsx(V,{placeholder:"Search...",value:a,onChange:s=>t(s.target.value),children:e.jsx(V.Slot,{children:e.jsx(ma,{size:"16"})})}),e.jsxs(E.Root,{children:[e.jsx(E.Trigger,{children:e.jsxs(i,{emphasis:"default",children:[e.jsx(Ca,{size:"16"}),"Filter by age"]})}),e.jsxs(E.Content,{children:[e.jsx(E.Item,{onSelect:()=>T("all"),children:"All"}),e.jsx(E.Item,{onSelect:()=>T("young"),children:"Young"}),e.jsx(E.Item,{onSelect:()=>T("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"}),e.jsx(l.HeaderCell,{children:"Role"})]})}),e.jsx(l.Body,{children:z.map(s=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${s.firstName}`),children:[e.jsx(l.RowCell,{children:s.name}),e.jsx(l.RowCell,{children:s.age}),e.jsx(l.RowCell,{children:s.role})]},s.id))})]})]})}},L={render:({...n})=>{const[a,t]=_.useState(()=>new Set),d=()=>{a.size===r.length?t(new Set):t(new Set(r.map(o=>o.id)))},T=(o,c)=>{o.stopPropagation();const I=new Set(a);I.has(c)?I.delete(c):I.add(c),t(I)},z=a.size===r.length,s=a.size>0&&a.size<r.length;return e.jsxs(l.Root,{...n,"aria-multiselectable":!0,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx($,{value:s?"indeterminate":z,onChange:d})}),e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"})]})}),e.jsx(l.Body,{children:r.map(o=>e.jsxs(l.Row,{selected:a.has(o.id),onClick:()=>console.log(`View details for ${o.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx($,{value:a.has(o.id),onChange:c=>T(c,o.id)})}),e.jsx(l.RowCell,{children:o.name}),e.jsx(l.RowCell,{children:o.age})]},o.id))})]})}},N={name:"Cell Alignment Options",render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:r.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(b,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.invited}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},f={render:({...n})=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{...n,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"100px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"50%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:r.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.lastLogin}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})},k={name:"No Border (Within Container)",render:({...n})=>e.jsxs(b,{direction:"column",gap:"2rem",children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"Without noBorder (default)"}),e.jsx("div",{style:{border:"1px solid var(--color-line-mid)",borderRadius:"8px",padding:"0 1rem"},children:e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:r.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"With noBorder=true"}),e.jsx("div",{style:{border:"1px solid var(--color-line-mid)",borderRadius:"8px",padding:"0 1rem"},children:e.jsxs(l.Root,{...n,noBorder:!0,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:r.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})})]})]})},D={name:"Custom Gutter Spacing",render:({...n})=>e.jsxs(b,{direction:"column",gap:"2rem",children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"Default (no extra gutter)"}),e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:r.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"16px gutter"}),e.jsxs(l.Root,{...n,gutter:"16px",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:r.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"48px gutter"}),e.jsxs(l.Root,{...n,gutter:"48px",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:r.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})]})]})},F={name:"Minimum Width Columns (Last Expands)",render:({...n})=>e.jsxs(l.Root,{...n,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{noShrink:!0,children:"Name"}),e.jsx(l.HeaderCell,{noShrink:!0,children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen (Expands)"})]})}),e.jsx(l.Body,{children:r.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})};var O,P,q;w.parameters={...w.parameters,docs:{...(O=w.parameters)==null?void 0:O.docs,source:{code:`const Basic = () => (
  <Table.Root aria-label="User Management Table">
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
      {TABLE_DATA.map((user) => (
        <Table.Row key={user.email}>
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-body-small tw-text-secondary">
                  {user.email}
                </div>
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
          <Table.RowCell>{user.twoFa ? "Yes" : "No"}</Table.RowCell>
          <Table.RowCell>
            <Switch size="small" aria-label="Analytics" />
          </Table.RowCell>

          <Table.RowCell>
            <Flex gap="0.25rem">
              <Button size="small" aspect="square" emphasis="weak">
                <IconPen size={16} />
              </Button>
              <Button
                variant="danger"
                size="small"
                aspect="square"
                emphasis="weak"
              >
                <IconTrashBin size={16} />
              </Button>
            </Flex>
          </Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(q=(P=w.parameters)==null?void 0:P.docs)==null?void 0:q.source}}};var Y,G,J;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{code:`const SmallText = () => (
  <Table.Root aria-label="User Management Table" fontSize="small">
    <Table.Header>
      <tr>
        <Table.HeaderCell width="100px">Name</Table.HeaderCell>
        <Table.HeaderCell>Role</Table.HeaderCell>
        <Table.HeaderCell>Last Seen</Table.HeaderCell>
      </tr>
    </Table.Header>
    <Table.Body>
      {TABLE_DATA.map((user) => (
        <Table.Row key={user.id}>
          <Table.RowCell>{user.name}</Table.RowCell>
          <Table.RowCell>{user.role}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(J=(G=m.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var X,K,Q;C.parameters={...C.parameters,docs:{...(X=C.parameters)==null?void 0:X.docs,source:{code:`const AutoLayout = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Header>
      <tr>
        <Table.HeaderCell width="100px">Name</Table.HeaderCell>
        <Table.HeaderCell>Role</Table.HeaderCell>
        <Table.HeaderCell>Last Seen</Table.HeaderCell>
      </tr>
    </Table.Header>
    <Table.Body>
      {TABLE_DATA.map((user) => (
        <Table.Row key={user.id}>
          <Table.RowCell>{user.name}</Table.RowCell>
          <Table.RowCell>{user.role}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(Q=(K=C.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var Z,ee,le;R.parameters={...R.parameters,docs:{...(Z=R.parameters)==null?void 0:Z.docs,source:{code:`const FixedLayout = () => (
  <Table.Root aria-label="User Management Table" layout="fixed">
    <Table.Header>
      <tr>
        <Table.HeaderCell width="100px">Name</Table.HeaderCell>
        <Table.HeaderCell>Role</Table.HeaderCell>
        <Table.HeaderCell>Last Seen</Table.HeaderCell>
      </tr>
    </Table.Header>
    <Table.Body>
      {TABLE_DATA.map((user) => (
        <Table.Row key={user.id}>
          <Table.RowCell>{user.name}</Table.RowCell>
          <Table.RowCell>{user.role}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(le=(ee=R.parameters)==null?void 0:ee.docs)==null?void 0:le.source}}};var ae,ne,re;u.parameters={...u.parameters,docs:{...(ae=u.parameters)==null?void 0:ae.docs,source:{code:`const Sortable = () => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >();

  const sortedUsers = [...TABLE_DATA].sort((a, b) => {
    if (!sortField || !sortDirection) {
      return 0;
    }

    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (sortDirection === "ascending") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <Table.Root aria-label="User Management Table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sortDirection={sortField === "name" ? sortDirection : undefined}
            onSortChange={(direction) => {
              setSortField("name");
              setSortDirection(direction);
            }}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            truncate
            sortDirection={sortField === "invited" ? sortDirection : undefined}
            onSortChange={(direction) => {
              setSortField("invited");
              setSortDirection(direction);
            }}
            state="loading"
            loadingStateAriaLabel="Loading Data"
          >
            Invited by
          </Table.HeaderCell>
          <Table.HeaderCell
            sortDirection={sortField === "lastSeen" ? sortDirection : undefined}
            onSortChange={(direction) => {
              setSortField("lastSeen");
              setSortDirection(direction);
            }}
          >
            Last seen
          </Table.HeaderCell>
          {/* Other columns without sorting */}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedUsers.map((user) => (
          <Table.Row key={user.email}>
            <Table.RowCell>
              <div className="tw-flex tw-items-center tw-gap-2">
                <div>
                  <div className="tw-font-medium">{user.name}</div>
                  <div className="tw-body-small tw-text-secondary">
                    {user.email}
                  </div>
                </div>
              </div>
            </Table.RowCell>
            <Table.RowCell truncate>{user.invited}</Table.RowCell>
            <Table.RowCell>{user.lastSeen}</Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
`,...(re=(ne=u.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var se,oe,te;h.parameters={...h.parameters,docs:{...(se=h.parameters)==null?void 0:se.docs,source:{code:`const StickyHead = () => (
  <Table.Root aria-label="User Management Table">
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
      {[
        ...TABLE_DATA,
        ...TABLE_DATA,
        ...TABLE_DATA,
        ...TABLE_DATA,
        ...TABLE_DATA,
        ...TABLE_DATA,
      ].map((user, index) => (
        <Table.Row key={\`\${user.email}-\${index}\`}>
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-body-small tw-text-secondary">
                  {user.email}
                </div>
              </div>
            </div>
          </Table.RowCell>
          <Table.RowCell>{user.invited}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
          <Table.RowCell>{user.initialLogin}</Table.RowCell>
          <Table.RowCell>{user.lastLogin}</Table.RowCell>
          <Table.RowCell>{user.twoFa ? "Yes" : "No"}</Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(te=(oe=h.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var de,ie,Te;x.parameters={...x.parameters,docs:{...(de=x.parameters)==null?void 0:de.docs,source:{code:`const StickyFirstColumn = () => (
  <Table.Root aria-label="User Management Table">
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
    <Table.Body firstColumnSticky>
      {TABLE_DATA.map((user) => (
        <Table.Row key={user.email}>
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-body-small tw-text-secondary">
                  {user.email}
                </div>
              </div>
            </div>
          </Table.RowCell>
          <Table.RowCell>{user.invited}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
          <Table.RowCell>{user.initialLogin}</Table.RowCell>
          <Table.RowCell>{user.lastLogin}</Table.RowCell>
          <Table.RowCell>{user.twoFa ? "Yes" : "No"}</Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(Te=(ie=x.parameters)==null?void 0:ie.docs)==null?void 0:Te.source}}};var be,ce,we;H.parameters={...H.parameters,docs:{...(be=H.parameters)==null?void 0:be.docs,source:{code:`const StickyHeadAndCol = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Header sticky>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Invited by</Table.HeaderCell>
        <Table.HeaderCell>Last seen</Table.HeaderCell>
        <Table.HeaderCell>Initial login</Table.HeaderCell>
        <Table.HeaderCell>Last login</Table.HeaderCell>
        <Table.HeaderCell>2FA</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body firstColumnSticky>
      {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user) => (
        <Table.Row key={user.email}>
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-body-small tw-text-secondary">
                  {user.email}
                </div>
              </div>
            </div>
          </Table.RowCell>
          <Table.RowCell>{user.invited}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
          <Table.RowCell>{user.initialLogin}</Table.RowCell>
          <Table.RowCell>{user.lastLogin}</Table.RowCell>
          <Table.RowCell>{user.twoFa ? "Yes" : "No"}</Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(we=(ce=H.parameters)==null?void 0:ce.docs)==null?void 0:we.source}}};var me,Ce,Re;p.parameters={...p.parameters,docs:{...(me=p.parameters)==null?void 0:me.docs,source:{code:`const StickyRightColumn = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Invited by</Table.HeaderCell>
        <Table.HeaderCell>Last seen</Table.HeaderCell>
        <Table.HeaderCell>Initial login</Table.HeaderCell>
        <Table.HeaderCell>Last login</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body lastColumnSticky>
      {TABLE_DATA.map((user) => (
        <Table.Row key={user.email}>
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-text-small tw-text-primary-on-primary">
                  {user.email}
                </div>
              </div>
            </div>
          </Table.RowCell>
          <Table.RowCell>{user.invited}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
          <Table.RowCell>{user.initialLogin}</Table.RowCell>
          <Table.RowCell>{user.lastLogin}</Table.RowCell>
          <Table.RowCell>
            <Flex gap="0.25rem">
              <Button size="small" aspect="square" emphasis="weak">
                <IconPen size={16} />
              </Button>
              <Button
                variant="danger"
                size="small"
                aspect="square"
                emphasis="weak"
              >
                <IconTrashBin size={16} />
              </Button>
            </Flex>
          </Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(Re=(Ce=p.parameters)==null?void 0:Ce.docs)==null?void 0:Re.source}}};var ue,he,xe;g.parameters={...g.parameters,docs:{...(ue=g.parameters)==null?void 0:ue.docs,source:{code:`const StickyHeaderAndRightColumn = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Header sticky>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Invited by</Table.HeaderCell>
        <Table.HeaderCell>Last seen</Table.HeaderCell>
        <Table.HeaderCell>Initial login</Table.HeaderCell>
        <Table.HeaderCell>Last login</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body lastColumnSticky>
      {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => (
        <Table.Row key={\`\${user.email}-\${index}\`}>
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-text-small tw-text-primary-on-primary">
                  {user.email}
                </div>
              </div>
            </div>
          </Table.RowCell>
          <Table.RowCell>{user.invited}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
          <Table.RowCell>{user.initialLogin}</Table.RowCell>
          <Table.RowCell>{user.lastLogin}</Table.RowCell>
          <Table.RowCell>
            <Flex gap="0.25rem">
              <Button size="small" aspect="square" emphasis="weak">
                <IconPen size={16} />
              </Button>
              <Button
                variant="danger"
                size="small"
                aspect="square"
                emphasis="weak"
              >
                <IconTrashBin size={16} />
              </Button>
            </Flex>
          </Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(xe=(he=g.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var He,pe,ge;j.parameters={...j.parameters,docs:{...(He=j.parameters)==null?void 0:He.docs,source:{code:`const StickyAllDirections = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Header sticky>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Invited by</Table.HeaderCell>
        <Table.HeaderCell>Last seen</Table.HeaderCell>
        <Table.HeaderCell>Initial login</Table.HeaderCell>
        <Table.HeaderCell>Last login</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body firstColumnSticky lastColumnSticky>
      {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => (
        <Table.Row key={\`\${user.email}-\${index}\`}>
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-text-small tw-text-primary-on-primary">
                  {user.email}
                </div>
              </div>
            </div>
          </Table.RowCell>
          <Table.RowCell>{user.invited}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
          <Table.RowCell>{user.initialLogin}</Table.RowCell>
          <Table.RowCell>{user.lastLogin}</Table.RowCell>
          <Table.RowCell>
            <Flex gap="0.25rem">
              <Button size="small" aspect="square" emphasis="weak">
                <IconPen size={16} />
              </Button>
              <Button
                variant="danger"
                size="small"
                aspect="square"
                emphasis="weak"
              >
                <IconTrashBin size={16} />
              </Button>
            </Flex>
          </Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(ge=(pe=j.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var je,ve,ye;v.parameters={...v.parameters,docs:{...(je=v.parameters)==null?void 0:je.docs,source:{code:`const Interactive = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Invited by</Table.HeaderCell>
        <Table.HeaderCell>Last seen</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {TABLE_DATA.map((user) => (
        <Table.Row
          key={user.email}
          onClick={() => alert(\`Clicked on \${user.name}\`)}
        >
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-body-small tw-text-secondary">
                  {user.email}
                </div>
              </div>
            </div>
          </Table.RowCell>
          <Table.RowCell>{user.invited}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
          <Table.RowCell>
            <Button
              onPress={() =>
                alert("Button pressed — this does NOT trigger row click")
              }
            >
              <span>Press me</span>
            </Button>
          </Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(ye=(ve=v.parameters)==null?void 0:ve.docs)==null?void 0:ye.source}}};var Ae,Se,Be;y.parameters={...y.parameters,docs:{...(Ae=y.parameters)==null?void 0:Ae.docs,source:{code:`const Disabled = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Invited by</Table.HeaderCell>
        <Table.HeaderCell>Last seen</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {TABLE_DATA.map((user, index) => (
        <Table.Row
          key={user.email}
          onClick={() => alert(\`Clicked on \${user.name}\`)}
          disabled={index % 3 === 0}
        >
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-body-small tw-text-secondary">
                  {user.email}
                </div>
              </div>
            </div>
          </Table.RowCell>
          <Table.RowCell>{user.invited}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(Be=(Se=y.parameters)==null?void 0:Se.docs)==null?void 0:Be.source}}};var Le,Ne,fe;A.parameters={...A.parameters,docs:{...(Le=A.parameters)==null?void 0:Le.docs,source:{code:`const WithCaption = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Caption>User Management Dashboard</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Invited by</Table.HeaderCell>
        <Table.HeaderCell>Last seen</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {TABLE_DATA.slice(0, 5).map((user) => (
        <Table.Row key={user.email}>
          <Table.RowCell>
            <div className="tw-flex tw-items-center tw-gap-2">
              <div>
                <div className="tw-font-medium">{user.name}</div>
                <div className="tw-body-small tw-text-secondary">
                  {user.email}
                </div>
              </div>
            </div>
          </Table.RowCell>
          <Table.RowCell>{user.invited}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(fe=(Ne=A.parameters)==null?void 0:Ne.docs)==null?void 0:fe.source}}};var ke,De,Fe;S.parameters={...S.parameters,docs:{...(ke=S.parameters)==null?void 0:ke.docs,source:{code:`const TruncatedContent = () => (
  <div style={{ width: "500px" }}>
    <Table.Root aria-label="User Management Table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell truncate>Name</Table.HeaderCell>
          <Table.HeaderCell>Invited by</Table.HeaderCell>
          <Table.HeaderCell truncate>Last seen</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {TABLE_DATA.slice(0, 5).map((user) => (
          <Table.Row key={user.email}>
            <Table.RowCell truncate>{user.name}</Table.RowCell>
            <Table.RowCell>{user.invited}</Table.RowCell>
            <Table.RowCell truncate>{user.lastSeen}</Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </div>
);
`,...(Fe=(De=S.parameters)==null?void 0:De.docs)==null?void 0:Fe.source}}};var Ie,Ee,_e;B.parameters={...B.parameters,docs:{...(Ie=B.parameters)==null?void 0:Ie.docs,source:{code:`const WithSearchAndFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState<"all" | "young" | "old">("all");

  const filteredAndSortedData = useMemo(() => {
    let result = [...TABLE_DATA];

    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (ageFilter !== "all") {
      result = result.filter((user) =>
        ageFilter === "young" ? user.age < 30 : user.age >= 30,
      );
    }

    return result;
  }, [searchTerm, ageFilter]);

  return (
    <Flex direction="column" gap="1rem">
      <Flex gap="1rem">
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        >
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
            <Dropdown.Item onSelect={() => setAgeFilter("all")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => setAgeFilter("young")}>
              Young
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => setAgeFilter("old")}>
              Old
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </Flex>
      <Table.Root aria-label="User Management Table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredAndSortedData.map((user) => (
            <Table.Row
              key={user.id}
              onClick={() => console.log(\`View details for \${user.firstName}\`)}
            >
              <Table.RowCell>{user.name}</Table.RowCell>
              <Table.RowCell>{user.age}</Table.RowCell>
              <Table.RowCell>{user.role}</Table.RowCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};
`,...(_e=(Ee=B.parameters)==null?void 0:Ee.docs)==null?void 0:_e.source}}};var ze,Me,We;L.parameters={...L.parameters,docs:{...(ze=L.parameters)==null?void 0:ze.docs,source:{code:`const WithSelection = () => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(
    () => new Set(),
  );

  const handleSelectAll = () => {
    if (selectedRows.size === TABLE_DATA.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(TABLE_DATA.map((user) => user.id)));
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
  const isPartiallySelected =
    selectedRows.size > 0 && selectedRows.size < TABLE_DATA.length;

  return (
    <Table.Root aria-label="User Management Table" aria-multiselectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Checkbox
              value={isPartiallySelected ? "indeterminate" : isAllSelected}
              onChange={handleSelectAll}
            />
          </Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Age</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {TABLE_DATA.map((user) => (
          <Table.Row
            key={user.id}
            selected={selectedRows.has(user.id)}
            onClick={() => console.log(\`View details for \${user.firstName}\`)}
          >
            <Table.RowCell>
              <Checkbox
                value={selectedRows.has(user.id)}
                onChange={(event) => handleSelectRow(event, user.id)}
              />
            </Table.RowCell>
            <Table.RowCell>{user.name}</Table.RowCell>
            <Table.RowCell>{user.age}</Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
`,...(We=(Me=L.parameters)==null?void 0:Me.docs)==null?void 0:We.source}}};var $e,Ue,Ve;N.parameters={...N.parameters,docs:{...($e=N.parameters)==null?void 0:$e.docs,source:{code:`const CellAlignments = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell align="left">Left Header</Table.HeaderCell>
        <Table.HeaderCell align="center">Centered Header</Table.HeaderCell>
        <Table.HeaderCell align="right">Right Header</Table.HeaderCell>
        <Table.HeaderCell align="left">Mixed Alignment</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {TABLE_DATA.map((user) => (
        <Table.Row key={user.id}>
          <Table.RowCell align="left">{user.firstName}</Table.RowCell>
          <Table.RowCell align="center">{user.role}</Table.RowCell>
          <Table.RowCell align="right">{user.age}</Table.RowCell>
          <Table.RowCell>
            <Flex justify="space-between" align="center">
              <span>{user.invited}</span>
              <span>{user.lastLogin}</span>
            </Flex>
          </Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(Ve=(Ue=N.parameters)==null?void 0:Ue.docs)==null?void 0:Ve.source}}};var Oe,Pe,qe;f.parameters={...f.parameters,docs:{...(Oe=f.parameters)==null?void 0:Oe.docs,source:{code:`const WidthControl = () => (
  <div style={{ width: "800px" }}>
    <Table.Root aria-label="User Management Table" layout="fixed">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="100px">
            Fixed Width & No Shrink
          </Table.HeaderCell>
          <Table.HeaderCell width="100px" truncate>
            Truncated Very Long Header Title That Should Be Cut Off
          </Table.HeaderCell>
          <Table.HeaderCell width="50%">Percentage Width</Table.HeaderCell>
          <Table.HeaderCell>Auto Width</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {TABLE_DATA.map((user) => (
          <Table.Row key={user.id}>
            <Table.RowCell>Fixed Width Content</Table.RowCell>
            <Table.RowCell truncate>
              {\`\${user.firstName} \${user.lastName} - \${user.role} - \${user.lastLogin}\`}
            </Table.RowCell>
            <Table.RowCell>Normal Cell</Table.RowCell>
            <Table.RowCell>Auto Width Content</Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </div>
);
`,...(qe=(Pe=f.parameters)==null?void 0:Pe.docs)==null?void 0:qe.source}}};var Ye,Ge,Je;k.parameters={...k.parameters,docs:{...(Ye=k.parameters)==null?void 0:Ye.docs,source:{code:`const NoBorder = () => (
  <Flex direction="column" gap="2rem">
    <div>
      <h3 style={{ marginBottom: "0.5rem" }}>Without noBorder (default)</h3>
      <div
        style={{
          border: "1px solid var(--color-line-mid)",
          borderRadius: "8px",
          padding: "0 1rem",
        }}
      >
        <Table.Root aria-label="User Management Table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Last Seen</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {TABLE_DATA.slice(0, 3).map((user) => (
              <Table.Row key={user.id}>
                <Table.RowCell>{user.name}</Table.RowCell>
                <Table.RowCell>{user.role}</Table.RowCell>
                <Table.RowCell>{user.lastSeen}</Table.RowCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
    <div>
      <h3 style={{ marginBottom: "0.5rem" }}>With noBorder=true</h3>
      <div
        style={{
          border: "1px solid var(--color-line-mid)",
          borderRadius: "8px",
          padding: "0 1rem",
        }}
      >
        <Table.Root aria-label="User Management Table" noBorder>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Last Seen</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {TABLE_DATA.slice(0, 3).map((user) => (
              <Table.Row key={user.id}>
                <Table.RowCell>{user.name}</Table.RowCell>
                <Table.RowCell>{user.role}</Table.RowCell>
                <Table.RowCell>{user.lastSeen}</Table.RowCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  </Flex>
);
`,...(Je=(Ge=k.parameters)==null?void 0:Ge.docs)==null?void 0:Je.source}}};var Xe,Ke,Qe;D.parameters={...D.parameters,docs:{...(Xe=D.parameters)==null?void 0:Xe.docs,source:{code:`const CustomGutter = () => (
  <Flex direction="column" gap="2rem">
    <div>
      <h3 style={{ marginBottom: "0.5rem" }}>Default (no extra gutter)</h3>
      <Table.Root aria-label="User Management Table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Last Seen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {TABLE_DATA.slice(0, 3).map((user) => (
            <Table.Row key={user.id}>
              <Table.RowCell>{user.name}</Table.RowCell>
              <Table.RowCell>{user.role}</Table.RowCell>
              <Table.RowCell>{user.lastSeen}</Table.RowCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
    <div>
      <h3 style={{ marginBottom: "0.5rem" }}>16px gutter</h3>
      <Table.Root aria-label="User Management Table" gutter="16px">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Last Seen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {TABLE_DATA.slice(0, 3).map((user) => (
            <Table.Row key={user.id}>
              <Table.RowCell>{user.name}</Table.RowCell>
              <Table.RowCell>{user.role}</Table.RowCell>
              <Table.RowCell>{user.lastSeen}</Table.RowCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
    <div>
      <h3 style={{ marginBottom: "0.5rem" }}>48px gutter</h3>
      <Table.Root aria-label="User Management Table" gutter="48px">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Last Seen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {TABLE_DATA.slice(0, 3).map((user) => (
            <Table.Row key={user.id}>
              <Table.RowCell>{user.name}</Table.RowCell>
              <Table.RowCell>{user.role}</Table.RowCell>
              <Table.RowCell>{user.lastSeen}</Table.RowCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  </Flex>
);
`,...(Qe=(Ke=D.parameters)==null?void 0:Ke.docs)==null?void 0:Qe.source}}};var Ze,el,ll;F.parameters={...F.parameters,docs:{...(Ze=F.parameters)==null?void 0:Ze.docs,source:{code:`const MinimumWidthColumnsWithExpandingLast = () => (
  <Table.Root aria-label="User Management Table">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell noShrink>Name</Table.HeaderCell>
        <Table.HeaderCell noShrink>Role</Table.HeaderCell>
        <Table.HeaderCell>Last Seen (Expands)</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {TABLE_DATA.slice(0, 3).map((user) => (
        <Table.Row key={user.id}>
          <Table.RowCell>{user.name}</Table.RowCell>
          <Table.RowCell>{user.role}</Table.RowCell>
          <Table.RowCell>{user.lastSeen}</Table.RowCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
`,...(ll=(el=F.parameters)==null?void 0:el.docs)==null?void 0:ll.source}}};var al,nl,rl;w.parameters={...w.parameters,docs:{...(al=w.parameters)==null?void 0:al.docs,source:{originalSource:`{
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
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
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
}`,...(rl=(nl=w.parameters)==null?void 0:nl.docs)==null?void 0:rl.source}}};var sl,ol,tl;m.parameters={...m.parameters,docs:{...(sl=m.parameters)==null?void 0:sl.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} fontSize="small">
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
}`,...(tl=(ol=m.parameters)==null?void 0:ol.docs)==null?void 0:tl.source}}};var dl,il,Tl;C.parameters={...C.parameters,docs:{...(dl=C.parameters)==null?void 0:dl.docs,source:{originalSource:`{
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
}`,...(Tl=(il=C.parameters)==null?void 0:il.docs)==null?void 0:Tl.source}}};var bl,cl,wl;R.parameters={...R.parameters,docs:{...(bl=R.parameters)==null?void 0:bl.docs,source:{originalSource:`{
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
}`,...(wl=(cl=R.parameters)==null?void 0:cl.docs)==null?void 0:wl.source}}};var ml,Cl,Rl;u.parameters={...u.parameters,docs:{...(ml=u.parameters)==null?void 0:ml.docs,source:{originalSource:`{
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
                        <Table.HeaderCell truncate sortDirection={sortField === 'invited' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('invited');
            setSortDirection(direction);
          }} state="loading" loadingStateAriaLabel="Loading Data">
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
                                <div className="tw-flex tw-items-center tw-gap-2">
                                    <div>
                                        <div className="tw-font-medium">{user.name}</div>
                                        <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell truncate>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(Rl=(Cl=u.parameters)==null?void 0:Cl.docs)==null?void 0:Rl.source}}};var ul,hl,xl;h.parameters={...h.parameters,docs:{...(ul=h.parameters)==null?void 0:ul.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
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
                                <div className="tw-flex tw-items-center tw-gap-2">
                                    <div>
                                        <div className="tw-font-medium">{user.name}</div>
                                        <div className="tw-body-small tw-text-secondary">{user.email}</div>
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
}`,...(xl=(hl=h.parameters)==null?void 0:hl.docs)==null?void 0:xl.source}}};var Hl,pl,gl;x.parameters={...x.parameters,docs:{...(Hl=x.parameters)==null?void 0:Hl.docs,source:{originalSource:`{
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
  }) => <Table.Root {...args}>
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
            <Table.Body firstColumnSticky>
                {TABLE_DATA.map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
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
}`,...(gl=(pl=x.parameters)==null?void 0:pl.docs)==null?void 0:gl.source}}};var jl,vl,yl;H.parameters={...H.parameters,docs:{...(jl=H.parameters)==null?void 0:jl.docs,source:{originalSource:`{
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
  }) => <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body firstColumnSticky>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
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
}`,...(yl=(vl=H.parameters)==null?void 0:vl.docs)==null?void 0:yl.source}}};var Al,Sl,Bl;p.parameters={...p.parameters,docs:{...(Al=p.parameters)==null?void 0:Al.docs,source:{originalSource:`{
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
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body lastColumnSticky>
                {TABLE_DATA.map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
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
}`,...(Bl=(Sl=p.parameters)==null?void 0:Sl.docs)==null?void 0:Bl.source}}};var Ll,Nl,fl;g.parameters={...g.parameters,docs:{...(Ll=g.parameters)==null?void 0:Ll.docs,source:{originalSource:`{
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
  }) => <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body lastColumnSticky>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => <Table.Row key={\`\${user.email}-\${index}\`}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
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
}`,...(fl=(Nl=g.parameters)==null?void 0:Nl.docs)==null?void 0:fl.source}}};var kl,Dl,Fl;j.parameters={...j.parameters,docs:{...(kl=j.parameters)==null?void 0:kl.docs,source:{originalSource:`{
  name: 'Sticky Header, Left & Right Columns',
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
  }) => <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body firstColumnSticky lastColumnSticky>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => <Table.Row key={\`\${user.email}-\${index}\`}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
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
}`,...(Fl=(Dl=j.parameters)==null?void 0:Dl.docs)==null?void 0:Fl.source}}};var Il,El,_l;v.parameters={...v.parameters,docs:{...(Il=v.parameters)==null?void 0:Il.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email} onClick={() => alert(\`Clicked on \${user.name}\`)}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>
                            <Button onPress={() => alert('Button pressed — this does NOT trigger row click')}>
                                <span>Press me</span>
                            </Button>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(_l=(El=v.parameters)==null?void 0:El.docs)==null?void 0:_l.source}}};var zl,Ml,Wl;y.parameters={...y.parameters,docs:{...(zl=y.parameters)==null?void 0:zl.docs,source:{originalSource:`{
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
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Wl=(Ml=y.parameters)==null?void 0:Ml.docs)==null?void 0:Wl.source}}};var $l,Ul,Vl;A.parameters={...A.parameters,docs:{...($l=A.parameters)==null?void 0:$l.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Caption>User Management Dashboard</Table.Caption>
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
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Vl=(Ul=A.parameters)==null?void 0:Ul.docs)==null?void 0:Vl.source}}};var Ol,Pl,ql;S.parameters={...S.parameters,docs:{...(Ol=S.parameters)==null?void 0:Ol.docs,source:{originalSource:`{
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
}`,...(ql=(Pl=S.parameters)==null?void 0:Pl.docs)==null?void 0:ql.source}}};var Yl,Gl,Jl;B.parameters={...B.parameters,docs:{...(Yl=B.parameters)==null?void 0:Yl.docs,source:{originalSource:`{
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
}`,...(Jl=(Gl=B.parameters)==null?void 0:Gl.docs)==null?void 0:Jl.source}}};var Xl,Kl,Ql;L.parameters={...L.parameters,docs:{...(Xl=L.parameters)==null?void 0:Xl.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(() => new Set());
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
    return <Table.Root {...args} aria-multiselectable>
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
}`,...(Ql=(Kl=L.parameters)==null?void 0:Kl.docs)==null?void 0:Ql.source}}};var Zl,ea,la;N.parameters={...N.parameters,docs:{...(Zl=N.parameters)==null?void 0:Zl.docs,source:{originalSource:`{
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
}`,...(la=(ea=N.parameters)==null?void 0:ea.docs)==null?void 0:la.source}}};var aa,na,ra;f.parameters={...f.parameters,docs:{...(aa=f.parameters)==null?void 0:aa.docs,source:{originalSource:`{
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
}`,...(ra=(na=f.parameters)==null?void 0:na.docs)==null?void 0:ra.source}}};var sa,oa,ta;k.parameters={...k.parameters,docs:{...(sa=k.parameters)==null?void 0:sa.docs,source:{originalSource:`{
  name: 'No Border (Within Container)',
  render: ({
    ...args
  }) => <Flex direction="column" gap="2rem">
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>Without noBorder (default)</h3>
                <div style={{
        border: '1px solid var(--color-line-mid)',
        borderRadius: '8px',
        padding: '0 1rem'
      }}>
                    <Table.Root {...args}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                                <Table.HeaderCell>Last Seen</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                    <Table.RowCell>{user.name}</Table.RowCell>
                                    <Table.RowCell>{user.role}</Table.RowCell>
                                    <Table.RowCell>{user.lastSeen}</Table.RowCell>
                                </Table.Row>)}
                        </Table.Body>
                    </Table.Root>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>With noBorder=true</h3>
                <div style={{
        border: '1px solid var(--color-line-mid)',
        borderRadius: '8px',
        padding: '0 1rem'
      }}>
                    <Table.Root {...args} noBorder>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                                <Table.HeaderCell>Last Seen</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                    <Table.RowCell>{user.name}</Table.RowCell>
                                    <Table.RowCell>{user.role}</Table.RowCell>
                                    <Table.RowCell>{user.lastSeen}</Table.RowCell>
                                </Table.Row>)}
                        </Table.Body>
                    </Table.Root>
                </div>
            </div>
        </Flex>
}`,...(ta=(oa=k.parameters)==null?void 0:oa.docs)==null?void 0:ta.source}}};var da,ia,Ta;D.parameters={...D.parameters,docs:{...(da=D.parameters)==null?void 0:da.docs,source:{originalSource:`{
  name: 'Custom Gutter Spacing',
  render: ({
    ...args
  }) => <Flex direction="column" gap="2rem">
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>Default (no extra gutter)</h3>
                <Table.Root {...args}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Last Seen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </div>
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>16px gutter</h3>
                <Table.Root {...args} gutter="16px">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Last Seen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </div>
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>48px gutter</h3>
                <Table.Root {...args} gutter="48px">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Last Seen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </div>
        </Flex>
}`,...(Ta=(ia=D.parameters)==null?void 0:ia.docs)==null?void 0:Ta.source}}};var ba,ca,wa;F.parameters={...F.parameters,docs:{...(ba=F.parameters)==null?void 0:ba.docs,source:{originalSource:`{
  name: 'Minimum Width Columns (Last Expands)',
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell noShrink>Name</Table.HeaderCell>
                    <Table.HeaderCell noShrink>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen (Expands)</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(wa=(ca=F.parameters)==null?void 0:ca.docs)==null?void 0:wa.source}}};const Ga=["Basic","SmallText","AutoLayout","FixedLayout","Sortable","StickyHead","StickyFirstColumn","StickyHeadAndCol","StickyRightColumn","StickyHeaderAndRightColumn","StickyAllDirections","Interactive","Disabled","WithCaption","TruncatedContent","WithSearchAndFilters","WithSelection","CellAlignments","WidthControl","NoBorder","CustomGutter","MinimumWidthColumnsWithExpandingLast"];export{C as AutoLayout,w as Basic,N as CellAlignments,D as CustomGutter,y as Disabled,R as FixedLayout,v as Interactive,F as MinimumWidthColumnsWithExpandingLast,k as NoBorder,m as SmallText,u as Sortable,j as StickyAllDirections,x as StickyFirstColumn,h as StickyHead,H as StickyHeadAndCol,g as StickyHeaderAndRightColumn,p as StickyRightColumn,S as TruncatedContent,f as WidthControl,A as WithCaption,B as WithSearchAndFilters,L as WithSelection,Ga as __namedExportsOrder,Ya as default};
