import { createStore } from '@udecode/plate-core';

export type FloatingButtonMode = '' | 'insert' | 'edit';

export const floatingButtonStore = createStore('floatingButton')({
    open: false,
    mouseDown: false,
    updated: false,
    url: '',
    text: '',
    newTab: false,
    mode: '' as FloatingButtonMode,
    isEditing: false,
})
    .extendActions((set) => ({
        reset: () => {
            set.url('');
            set.text('');
            set.newTab(false);
            set.mode('');
            set.isEditing(false);
        },
    }))
    .extendActions((set) => ({
        show: (mode: FloatingButtonMode) => {
            set.mode(mode);
            set.isEditing(false);
            set.open(true);
        },
        hide: () => {
            set.open(false);
            set.reset();
        },
    }));

export const floatingButtonActions = floatingButtonStore.set;
export const floatingButtonSelectors = floatingButtonStore.get;
export const useFloatingButtonSelectors = () => floatingButtonStore.use;
