import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLanguage12 from './IconLanguage12';
import IconLanguage16 from './IconLanguage16';
import IconLanguage20 from './IconLanguage20';
import IconLanguage24 from './IconLanguage24';
import IconLanguage32 from './IconLanguage32';

const IconLanguage = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLanguage12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLanguage16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLanguage20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLanguage24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLanguage32 {...props} />}
        </span>
    );
};
IconLanguage.displayName = 'FondueIconLanguage';

export default memo(IconLanguage);
