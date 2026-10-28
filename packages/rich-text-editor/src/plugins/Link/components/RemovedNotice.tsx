/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';

import { type LinkPopoverStrings } from '../helpers/linkPopoverModel';
import styles from '../styles/links.module.scss';

export type RemovedNoticeProps = {
    id: string;
    strings: LinkPopoverStrings;
    onInsert: () => void;
};

/** The notice that the linked text was removed, with the action that inserts the visible text as a new link. */
export const RemovedNotice = ({ id, strings, onInsert }: RemovedNoticeProps) => (
    <div className={styles.removed}>
        <p id={id} className={styles.error}>
            {strings.removed}
        </p>
        <Button emphasis="default" onPress={onInsert}>
            {strings.insertNew}
        </Button>
    </div>
);

RemovedNotice.displayName = 'RemovedNotice';
