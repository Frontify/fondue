/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useEffect, useState } from 'react';

import { Tree } from '../../Tree';

const Leaf = ({
    id,
    isSelected,
    onSelectChange,
}: {
    id: string;
    isSelected?: boolean;
    onSelectChange?: (value: boolean) => void;
}) => (
    <Tree.Item id={id} isSelected={isSelected} onSelectChange={onSelectChange}>
        <Tree.Label>{id}</Tree.Label>
    </Tree.Item>
);

const Pair = ({ a, b }: { a: string; b: string }) => (
    <>
        <Leaf id={a} />
        <Leaf id={b} />
    </>
);

export const MixedRoot = () => (
    <Tree.Root>
        <Tree.Item id="A">
            <Tree.Label>A</Tree.Label>
        </Tree.Item>
        <Pair a="B" b="C" />
        <Tree.Item id="D">
            <Tree.Label>D</Tree.Label>
        </Tree.Item>
    </Tree.Root>
);

export const AllWrapperRoot = () => (
    <>
        <button type="button">before</button>
        <Tree.Root>
            <Pair a="X" b="Y" />
        </Tree.Root>
    </>
);

const FolderContents = ({ folderId }: { folderId: string }) => {
    const [ids, setIds] = useState<string[] | null>(null);
    useEffect(() => {
        const timer = setTimeout(() => setIds([`${folderId}-1`, `${folderId}-2`]), 400);
        return () => clearTimeout(timer);
    }, [folderId]);
    if (!ids) {
        return <Tree.Loading />;
    }
    return ids.map((id) => <Leaf key={id} id={id} />);
};

export const LazyWrapperTree = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <Tree.Root>
            <Tree.Folder id="lazy" isExpanded={isExpanded} onExpandChange={setIsExpanded}>
                <Tree.FolderHeader>
                    <Tree.Label>Lazy</Tree.Label>
                </Tree.FolderHeader>
                {isExpanded && <FolderContents folderId="lazy" />}
            </Tree.Folder>
        </Tree.Root>
    );
};

const SubTree = ({ depth }: { depth: number }) => {
    if (depth === 0) {
        return <Leaf id="deep-leaf" />;
    }
    return (
        <Tree.Folder id={`level-${depth}`} isExpanded>
            <Tree.FolderHeader>
                <Tree.Label>{`level-${depth}`}</Tree.Label>
            </Tree.FolderHeader>
            <SubTree depth={depth - 1} />
        </Tree.Folder>
    );
};

export const NestedWrapperTree = () => (
    <Tree.Root>
        <SubTree depth={3} />
        <Leaf id="after" />
    </Tree.Root>
);

const GrowingWrapper = () => {
    const [ids, setIds] = useState(['g1', 'g2']);
    useEffect(() => {
        const timer = setTimeout(() => setIds((prev) => [...prev, 'g3']), 400);
        return () => clearTimeout(timer);
    }, []);
    return ids.map((id) => <Leaf key={id} id={id} />);
};

export const ToggleWrapperTree = () => {
    const [isShown, setIsShown] = useState(true);
    return (
        <>
            <button type="button" onClick={() => setIsShown((prev) => !prev)}>
                toggle
            </button>
            <Tree.Root>
                <Leaf id="static" />
                {isShown && <GrowingWrapper />}
            </Tree.Root>
        </>
    );
};

const SelectableChildren = ({
    selected,
    onToggle,
}: {
    selected: Set<string>;
    onToggle: (id: string, value: boolean) => void;
}) =>
    ['c1', 'c2'].map((id) => (
        <Leaf key={id} id={id} isSelected={selected.has(id)} onSelectChange={(value) => onToggle(id, value)} />
    ));

export const MultiSelectWrapperTree = () => {
    const [selected, setSelected] = useState<Set<string>>(() => new Set());
    const onToggle = (id: string, value: boolean) =>
        setSelected((prev) => {
            const next = new Set(prev);
            if (value) {
                next.add(id);
            } else {
                next.delete(id);
            }
            return next;
        });
    return (
        <>
            <output data-test-id="selected">{[...selected].sort().join(',')}</output>
            <Tree.Root multiSelect>
                <Tree.Folder id="parent" isExpanded>
                    <Tree.FolderHeader>
                        <Tree.Label>parent</Tree.Label>
                    </Tree.FolderHeader>
                    <SelectableChildren selected={selected} onToggle={onToggle} />
                </Tree.Folder>
            </Tree.Root>
        </>
    );
};

const ProbeContext = createContext('outside');
const ContextReader = () => <span data-test-id="ctx">{useContext(ProbeContext)}</span>;

export const ContextWrapperTree = () => (
    <Tree.Root>
        <ProbeContext.Provider value="inside">
            <Tree.Item id="ctx-row">
                <Tree.Label>ctx-row</Tree.Label>
                <Tree.Decorator>
                    <ContextReader />
                </Tree.Decorator>
            </Tree.Item>
        </ProbeContext.Provider>
    </Tree.Root>
);

const Chunk = ({ start, size }: { start: number; size: number }) =>
    Array.from({ length: size }, (_, offset) => <Leaf key={start + offset} id={`n${start + offset}`} />);

export const BigTree = ({ count, wrapped }: { count: number; wrapped: boolean }) => {
    const chunkSize = 100;
    const chunks = Array.from({ length: count / chunkSize }, (_, index) => index * chunkSize);
    return (
        <Tree.Root>
            {wrapped
                ? chunks.map((start) => <Chunk key={start} start={start} size={chunkSize} />)
                : chunks.flatMap((start) => Chunk({ start, size: chunkSize }))}
        </Tree.Root>
    );
};
