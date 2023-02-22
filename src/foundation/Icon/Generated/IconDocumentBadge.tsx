import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDocumentBadge12 from './IconDocumentBadge12';
import IconDocumentBadge16 from './IconDocumentBadge16';
import IconDocumentBadge20 from './IconDocumentBadge20';
import IconDocumentBadge24 from './IconDocumentBadge24';
import IconDocumentBadge32 from './IconDocumentBadge32';

const IconDocumentBadge = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDocumentBadge12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDocumentBadge16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDocumentBadge20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDocumentBadge24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDocumentBadge32 {...props} />}
        </span>
    );
};
IconDocumentBadge.displayName = 'FondueIconDocumentBadge';

export default memo(IconDocumentBadge);
