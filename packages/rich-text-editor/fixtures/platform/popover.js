import { jsx } from 'react/jsx-runtime';

export const Menu = () => jsx('div', { popover: 'auto' });
export const open = (element) => element.showPopover();
