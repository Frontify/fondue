import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconAnnotationNumbers12 from './IconAnnotationNumbers12';
import IconAnnotationNumbers16 from './IconAnnotationNumbers16';
import IconAnnotationNumbers20 from './IconAnnotationNumbers20';
import IconAnnotationNumbers24 from './IconAnnotationNumbers24';
import IconAnnotationNumbers32 from './IconAnnotationNumbers32';

const IconAnnotationNumbers = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconAnnotationNumbers12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconAnnotationNumbers16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconAnnotationNumbers20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconAnnotationNumbers24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconAnnotationNumbers32 {...props} />}
        </span>
    );
};
IconAnnotationNumbers.displayName = 'FondueIconAnnotationNumbers';

export default memo(IconAnnotationNumbers);
