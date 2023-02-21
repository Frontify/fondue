import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconAnnotationLines12 from './IconAnnotationLines12';
import IconAnnotationLines16 from './IconAnnotationLines16';
import IconAnnotationLines20 from './IconAnnotationLines20';
import IconAnnotationLines24 from './IconAnnotationLines24';
import IconAnnotationLines32 from './IconAnnotationLines32';

const IconAnnotationLines = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconAnnotationLines12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconAnnotationLines16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconAnnotationLines20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconAnnotationLines24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconAnnotationLines32 {...props} />}
        </span>
    );
};

const MemoizedIconAnnotationLines = memo(IconAnnotationLines);
MemoizedIconAnnotationLines.displayName = 'FondueIconAnnotationLines';

export default MemoizedIconAnnotationLines;
