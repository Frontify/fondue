import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDocumentCheck12 from './IconDocumentCheck12';
import IconDocumentCheck16 from './IconDocumentCheck16';
import IconDocumentCheck20 from './IconDocumentCheck20';
import IconDocumentCheck24 from './IconDocumentCheck24';
import IconDocumentCheck32 from './IconDocumentCheck32';

const IconDocumentCheck = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDocumentCheck12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDocumentCheck16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDocumentCheck20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDocumentCheck24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDocumentCheck32 {...props} />}
        </span>
    );
};
IconDocumentCheck.displayName = 'FondueIconDocumentCheck';

export default memo(IconDocumentCheck);
