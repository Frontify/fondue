import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconHighlighter12 from './IconHighlighter12';
import IconHighlighter16 from './IconHighlighter16';
import IconHighlighter20 from './IconHighlighter20';
import IconHighlighter24 from './IconHighlighter24';
import IconHighlighter32 from './IconHighlighter32';

const IconHighlighter = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconHighlighter12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconHighlighter16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconHighlighter20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconHighlighter24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconHighlighter32 {...props} />}
        </span>
    );
};
IconHighlighter.displayName = 'FondueIconHighlighter';

export default memo(IconHighlighter);
