const d=(t,n=10)=>{let e;return(...o)=>{clearTimeout(e),e=window.setTimeout(()=>t.apply(void 0,o),n)}};export{d};
