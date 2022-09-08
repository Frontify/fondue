import { LinkPlugin, PlatePlugin } from '@udecode/plate';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';

export const linkPlugin: Partial<PlatePlugin<LinkPlugin>> = {
    renderAfterEditable: CustomFloatingLink,
};
