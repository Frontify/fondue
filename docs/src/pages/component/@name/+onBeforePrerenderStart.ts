export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
  return ["/component/ggg", "/component/aaaa", "/component/bbb"];
}
