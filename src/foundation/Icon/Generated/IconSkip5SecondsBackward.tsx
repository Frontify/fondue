import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSkip5SecondsBackward12 from './IconSkip5SecondsBackward12';
import IconSkip5SecondsBackward16 from './IconSkip5SecondsBackward16';
import IconSkip5SecondsBackward20 from './IconSkip5SecondsBackward20';
import IconSkip5SecondsBackward24 from './IconSkip5SecondsBackward24';
import IconSkip5SecondsBackward32 from './IconSkip5SecondsBackward32'

function IconSkip5SecondsBackward(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSkip5SecondsBackward12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconSkip5SecondsBackward16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconSkip5SecondsBackward20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconSkip5SecondsBackward24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconSkip5SecondsBackward32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconSkip5SecondsBackward);
export default Memo;