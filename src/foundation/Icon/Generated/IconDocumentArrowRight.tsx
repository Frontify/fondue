import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDocumentArrowRight12 from './IconDocumentArrowRight12';
import IconDocumentArrowRight16 from './IconDocumentArrowRight16';
import IconDocumentArrowRight20 from './IconDocumentArrowRight20';
import IconDocumentArrowRight24 from './IconDocumentArrowRight24';
import IconDocumentArrowRight32 from './IconDocumentArrowRight32';

const IconDocumentArrowRight = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDocumentArrowRight12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDocumentArrowRight16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDocumentArrowRight20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDocumentArrowRight24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDocumentArrowRight32 {...props} />}
        </span>
    );
};
IconDocumentArrowRight.displayName = 'FondueIconDocumentArrowRight';

export default memo(IconDocumentArrowRight);
