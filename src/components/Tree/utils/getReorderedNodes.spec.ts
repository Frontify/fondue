import { TreeFlatListItem } from "@components/Tree";
import { DraggableItem, DropZonePosition } from "@utilities/dnd";
import { getReorderedNodes } from "@components/Tree/utils/getReorderedNodes";

const nodes = [
    {
        id: "1",
        sort: null,
        parentId: null,
    },
    {
        id: "2",
        sort: null,
        parentId: null,
    },
    {
        id: "3",
        sort: null,
        parentId: "1",
    },
    {
        id: "4",
        sort: null,
        parentId: "2",
    },
] as DraggableItem<TreeFlatListItem>[];

describe("getReorderedItems", () => {
    it("handles moving items between different parents after", () => {
        const result = getReorderedNodes(nodes[2], nodes[3], DropZonePosition.After, nodes);

        expect(result).to.be.instanceof(Array);
        expect(result.length).to.equal(2);
        expect(result[0].id).to.equal(nodes[2].id);
        expect(result[1].id).to.equal(nodes[3].id);
        expect(result[0].parentId).to.equal("1");
        expect(result[0].sort).to.equal(0);
        expect(result[1].sort).to.equal(1);
    });

    it("handles moving items between different parents before", () => {
        const result = getReorderedNodes(nodes[2], nodes[3], DropZonePosition.Before, nodes);

        expect(result).to.be.instanceof(Array);
        expect(result.length).to.equal(1);
        expect(result[0].id).to.equal(nodes[3].id);
        expect(result[0].parentId).to.equal("1");
        expect(result[0].sort).to.equal(0);
    });

    it("handles moving items between different parents within", () => {
        const result = getReorderedNodes(nodes[0], nodes[3], DropZonePosition.Within, nodes);

        expect(result).to.be.instanceof(Array);
        expect(result.length).to.equal(1);
        expect(result[0].id).to.equal(nodes[3].id);
        expect(result[0].parentId).to.equal("1");
        expect(result[0].sort).to.equal(0);
    });
});
