"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  Position,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";
import { memo } from "react";

import { CARDINALITY_ENDPOINTS } from "@/tools/sql-erd";

import type { RelationEdgeData } from "../sql-erd.types";

/** How far along the edge, away from the node, each cardinality symbol sits. */
const ENDPOINT_INSET = 15;
/** Lifts the symbol clear of the line and of the arrowhead. */
const ENDPOINT_RISE = 9;

/** Endpoints leave the node horizontally, so the inset follows the handle's side. */
function insetFor(position: Position): number {
  return position === Position.Left ? -ENDPOINT_INSET : ENDPOINT_INSET;
}

function EdgeBadge({
  x,
  y,
  text,
  selected,
  emphasised,
}: {
  x: number;
  y: number;
  text: string;
  selected: boolean;
  emphasised?: boolean;
}) {
  return (
    <div
      className={`nodrag nopan pointer-events-none absolute rounded border px-1 font-mono leading-4 ${
        emphasised ? "text-[10px] font-semibold" : "text-[9px]"
      } ${selected ? "border-accent bg-accent text-accent-text" : "border-border bg-card text-muted"}`}
      style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
    >
      {text}
    </div>
  );
}

function ErdRelationEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  selected,
  data,
}: EdgeProps<Edge<RelationEdgeData>>) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 12,
  });

  const relation = data?.relation;
  const isManual = relation?.origin === "manual";
  const [sourceSymbol, targetSymbol] = relation
    ? CARDINALITY_ENDPOINTS[relation.cardinality]
    : ["", ""];
  const isSelected = Boolean(selected);

  return (
    <>
      <BaseEdge
        path={path}
        markerEnd={markerEnd}
        interactionWidth={18}
        style={{
          stroke: isSelected ? "var(--color-accent)" : "var(--color-muted)",
          strokeWidth: isSelected ? 2 : 1.25,
          strokeDasharray: isManual ? "5 3" : undefined,
        }}
      />
      <EdgeLabelRenderer>
        {sourceSymbol ? (
          <EdgeBadge
            x={sourceX + insetFor(sourcePosition)}
            y={sourceY - ENDPOINT_RISE}
            text={sourceSymbol}
            selected={isSelected}
            emphasised
          />
        ) : null}

        {targetSymbol ? (
          <EdgeBadge
            x={targetX + insetFor(targetPosition)}
            y={targetY - ENDPOINT_RISE}
            text={targetSymbol}
            selected={isSelected}
            emphasised
          />
        ) : null}

        {data?.label ? (
          <EdgeBadge x={labelX} y={labelY} text={data.label} selected={isSelected} />
        ) : null}
      </EdgeLabelRenderer>
    </>
  );
}

export default memo(ErdRelationEdge);
