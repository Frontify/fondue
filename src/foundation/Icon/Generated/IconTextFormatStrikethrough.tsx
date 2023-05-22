import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextFormatStrikethrough12 from './IconTextFormatStrikethrough12';
import IconTextFormatStrikethrough16 from './IconTextFormatStrikethrough16';
import IconTextFormatStrikethrough20 from './IconTextFormatStrikethrough20';
import IconTextFormatStrikethrough24 from './IconTextFormatStrikethrough24';
import IconTextFormatStrikethrough32 from './IconTextFormatStrikethrough32';

const IconTextFormatStrikethrough = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextFormatStrikethrough12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextFormatStrikethrough16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextFormatStrikethrough20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextFormatStrikethrough24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextFormatStrikethrough32 {...props} />}
        </span>
    );
};
IconTextFormatStrikethrough.displayName = 'FondueIconTextFormatStrikethrough';

export default memo(IconTextFormatStrikethrough);
