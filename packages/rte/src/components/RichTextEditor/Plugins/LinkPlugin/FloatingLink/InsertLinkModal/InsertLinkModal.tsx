/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InsertModal } from './InsertModal';
import { useInsertModal } from './useInsertModal';

export const InsertLinkModal = () => <InsertModal {...useInsertModal()} testId="floating-link-insert" />;
