import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextFormatUnderline12 from './IconTextFormatUnderline12';
import IconTextFormatUnderline16 from './IconTextFormatUnderline16';
import IconTextFormatUnderline20 from './IconTextFormatUnderline20';
import IconTextFormatUnderline24 from './IconTextFormatUnderline24';
import IconTextFormatUnderline32 from './IconTextFormatUnderline32';

const IconTextFormatUnderline = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextFormatUnderline12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextFormatUnderline16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextFormatUnderline20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextFormatUnderline24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextFormatUnderline32 {...props} />}
        </span>
    );
};

const MemoizedIconTextFormatUnderline = memo(IconTextFormatUnderline);
MemoizedIconTextFormatUnderline.displayName = 'FondueIconTextFormatUnderline';

export default MemoizedIconTextFormatUnderline;
