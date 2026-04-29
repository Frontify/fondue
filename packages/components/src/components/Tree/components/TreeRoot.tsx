/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssistiveTreeDescription } from '@headless-tree/react';
import { IconCaretDown, IconCaretRight, IconDocument, IconFolder, IconGrabHandle } from '@frontify/fondue-icons';

import { useTreeController } from '../hooks/useTreeController';
import styles from '../styles/tree.module.scss';
import { type Item, type TreeRootProps } from '../types';
import { parseChildren } from '../utils/parseChildren';

export const TreeRoot = ({ children, onChange }: TreeRootProps) => {
    const parsedChildren = parseChildren(children, 'root');
    const items: Item[] = [
        {
            id: 'root',
            name: 'Root',
            children: parsedChildren.filter((item) => item.parentId === 'root').map((item) => item.id),
            isFolder: true,
        },
        ...parsedChildren,
    ];

    const tree = useTreeController({ items, onChange });

    return (
        <div {...tree.getContainerProps()} className={styles.tree}>
            <AssistiveTreeDescription tree={tree} />
            {tree.getItems().map((item) => {
                const level = item.getItemMeta().level;
                const isFolder = item.isFolder();
                const isExpanded = item.isExpanded();
                return (
                    <button key={item.getId()} type="button" {...item.getProps()} className={styles.row}>
                        {level > 0 && (
                            <span className={styles.guides} aria-hidden>
                                {Array.from({ length: level }).map((_, i) => (
                                    <span key={i} className={styles.guide} />
                                ))}
                            </span>
                        )}
                        <div
                            className={styles.item}
                            data-focused={item.isFocused()}
                            data-expanded={isExpanded}
                            data-selected={item.isSelected()}
                            data-folder={isFolder}
                            data-drop={item.isDragTarget()}
                        >
                            <span className={styles.handle} aria-hidden>
                                <IconGrabHandle size={16} />
                            </span>
                            <span className={styles.chevron} aria-hidden>
                                {isFolder ? (
                                    isExpanded ? (
                                        <IconCaretDown size={12} />
                                    ) : (
                                        <IconCaretRight size={12} />
                                    )
                                ) : null}
                            </span>
                            <span className={styles.icon} aria-hidden>
                                {isFolder ? <IconFolder size={16} /> : <IconDocument size={16} />}
                            </span>
                            <span className={styles.label}>{item.getItemName()}</span>
                        </div>
                    </button>
                );
            })}
            <div style={tree.getDragLineStyle()} className={styles.dragline} />
        </div>
    );
};
TreeRoot.displayName = 'TreeRoot';
