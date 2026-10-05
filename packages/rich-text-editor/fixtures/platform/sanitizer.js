export const render = (element, html) => element.setHTML(html, { sanitizer: new Sanitizer() });
