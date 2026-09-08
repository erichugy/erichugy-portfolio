import { MarkerType, type Edge } from "@xyflow/react";

import {
  measureNodeHeight,
  NODE_WIDTH,
  type DiagramRelation,
  type NodePosition,
  type ParsedTable,
} from "@/tools/sql-erd";

import type { ErdSelection, RelationEdgeData, TableNode } from "../sql-erd.types";

const HANDLE_SEPARATOR = "::";

// Hoisted so every rebuild reuses one object: a fresh marker each render churns
// React Flow's marker definitions and makes the arrowheads flicker.
const ARROW_MARKER = { type: MarkerType.ArrowClosed, width: 14, height: 14 } as const;

export function makeHandleId(columnName: string, side: "left" | "right"): string {
  return `${columnName}${HANDLE_SEPARATOR}${side}`;
}

export function parseHandleId(handleId: string | null | undefined): string | null {
  if (!handleId) {
    return null;
  }

  const separatorIndex = handleId.lastIndexOf(HANDLE_SEPARATOR);

  return separatorIndex === -1 ? handleId : handleId.slice(0, separatorIndex);
}

export interface BuildNodesOptions {
  tables: ParsedTable[];
  relations: DiagramRelation[];
  positions: Record<string, NodePosition>;
  collapsedTableIds: ReadonlySet<string>;
  accentByFileId: Record<string, string>;
  nameByFileId: Record<string, string>;
  selection: ErdSelection;
  /** Nodes React Flow itself has selected — a click, or a marquee covering several. */
  selectedNodeIds: ReadonlySet<string>;
}

/** Tables directly involved in the current selection, used to focus the canvas. */
function computeHighlightedTables(
  relations: DiagramRelation[],
  selection: ErdSelection,
): Set<string> | null {
  if (selection.kind === "table") {
    const highlighted = new Set<string>([selection.id]);

    for (const relation of relations) {
      if (relation.sourceTable === selection.id) {
        highlighted.add(relation.targetTable);
      }

      if (relation.targetTable === selection.id) {
        highlighted.add(relation.sourceTable);
      }
    }

    return highlighted;
  }

  if (selection.kind === "relation") {
    const relation = relations.find((entry) => entry.id === selection.id);

    return relation ? new Set([relation.sourceTable, relation.targetTable]) : null;
  }

  return null;
}

export function buildNodes(options: BuildNodesOptions): TableNode[] {
  const { tables, relations, positions, collapsedTableIds, accentByFileId, nameByFileId } = options;

  const connectedColumns = new Map<string, Set<string>>();

  const track = (tableId: string, columns: string[]) => {
    const existing = connectedColumns.get(tableId) ?? new Set<string>();

    for (const column of columns) {
      existing.add(column.toLowerCase());
    }

    connectedColumns.set(tableId, existing);
  };

  for (const relation of relations) {
    track(relation.sourceTable, relation.sourceColumns);
    track(relation.targetTable, relation.targetColumns);
  }

  const highlighted = computeHighlightedTables(relations, options.selection);

  return tables.map((table) => {
    const collapsed = collapsedTableIds.has(table.id);
    const height = measureNodeHeight(table, collapsed);

    return {
      id: table.id,
      type: "erdTable" as const,
      position: positions[table.id] ?? { x: 0, y: 0 },
      selected:
        options.selectedNodeIds.has(table.id) ||
        (options.selection.kind === "table" && options.selection.id === table.id),
      deletable: false,
      // Declared rather than measured so the minimap and auto-layout agree with the DOM.
      width: NODE_WIDTH,
      height,
      // `measured` must be set too: React Flow drops a node's cached handle bounds
      // whenever a node object changes without it, so every drag frame would leave the
      // dragged node's edges unable to resolve their endpoints, unmounting them.
      measured: { width: NODE_WIDTH, height },
      data: {
        table,
        accent: accentByFileId[table.fileId] ?? "#0EA5C9",
        fileName: nameByFileId[table.fileId] ?? "unknown",
        collapsed,
        connectedColumns: connectedColumns.get(table.id) ?? new Set<string>(),
        highlighted: highlighted?.has(table.id) ?? false,
        dimmed: highlighted ? !highlighted.has(table.id) : false,
      },
    };
  });
}

export interface BuildEdgesOptions {
  relations: DiagramRelation[];
  positions: Record<string, NodePosition>;
  selection: ErdSelection;
}

export function buildEdges({ relations, positions, selection }: BuildEdgesOptions): Edge<RelationEdgeData>[] {
  return relations.map((relation) => {
    const sourceCenter = (positions[relation.sourceTable]?.x ?? 0) + NODE_WIDTH / 2;
    const targetCenter = (positions[relation.targetTable]?.x ?? 0) + NODE_WIDTH / 2;
    const targetIsRight = targetCenter >= sourceCenter;

    const sourceColumn = relation.sourceColumns[0] ?? "";
    const targetColumn = relation.targetColumns[0] ?? "";
    // Cardinality now reads off the edge ends, so the midpoint carries only a custom label.
    const label = relation.label?.trim() ?? "";
    const isSelected = selection.kind === "relation" && selection.id === relation.id;
    const isDimmed =
      selection.kind === "table" &&
      relation.sourceTable !== selection.id &&
      relation.targetTable !== selection.id;

    return {
      id: relation.id,
      type: "erdRelation",
      source: relation.sourceTable,
      target: relation.targetTable,
      sourceHandle: makeHandleId(sourceColumn, targetIsRight ? "right" : "left"),
      targetHandle: makeHandleId(targetColumn, targetIsRight ? "left" : "right"),
      selected: isSelected,
      reconnectable: true,
      markerEnd: ARROW_MARKER,
      data: { relation, label },
      className: isDimmed ? "erd-edge-dimmed" : undefined,
    };
  });
}
