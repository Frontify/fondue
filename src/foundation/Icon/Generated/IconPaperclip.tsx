import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPaperclip12 from './IconPaperclip12';
import IconPaperclip16 from './IconPaperclip16';
import IconPaperclip20 from './IconPaperclip20';
import IconPaperclip24 from './IconPaperclip24';
import IconPaperclip32 from './IconPaperclip32';

const IconPaperclip = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPaperclip12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPaperclip16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPaperclip20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPaperclip24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPaperclip32 {...props} />}
        </span>
    );
};
IconPaperclip.displayName = 'FondueIconPaperclip';

export default memo(IconPaperclip);
