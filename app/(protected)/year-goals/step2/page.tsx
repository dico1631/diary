"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useYearGoals } from "../year-goals-provider";

const QUADRANT_LABELS = [
  { x: 75, y: 25, text: "지금 당장 해야할 일" },
  { x: 25, y: 25, text: "시간 계획을 하여\n미뤄지지 않도록 관리할 일" },
  { x: 25, y: 75, text: "자동화를 고민해볼 일" },
  { x: 75, y: 75, text: "중요한 일을 못하게 하는\n방해 요인" },
];

export default function Step2Page() {
  const { localGoals, update } = useYearGoals();
  const graphRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const allGoals = [
    ...localGoals.filter((g) => g.category === "want").sort((a, b) => a.display_order - b.display_order),
    ...localGoals.filter((g) => g.category === "must").sort((a, b) => a.display_order - b.display_order),
  ];

  const numberedGoals = allGoals.map((g, i) => ({ ...g, number: i + 1 }));
  const placedGoals = numberedGoals.filter((g) => g.urgency !== null && g.importance !== null);
  const unplacedGoals = numberedGoals.filter((g) => g.urgency === null || g.importance === null);

  function handleDragStart(e: React.DragEvent, id: string) {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    setDraggingId(id);
  }

  function handleDragEnd() {
    setDraggingId(null);
  }

  function handleGraphDrop(e: React.DragEvent) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id || !graphRef.current) return;

    const rect = graphRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const urgency = Math.max(0, Math.min(100, Math.round(x)));
    const importance = Math.max(0, Math.min(100, Math.round(100 - y)));

    update((prev) => prev.map((g) => (g.id === id ? { ...g, urgency, importance } : g)));
    setDraggingId(null);
  }

  function handleGraphDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleRemoveFromGraph(id: string) {
    update((prev) => prev.map((g) => (g.id === id ? { ...g, urgency: null, importance: null } : g)));
  }

  return (
    <div className="flex gap-6">
      {/* 왼쪽: 사분면 그래프 */}
      <div className="flex-1 max-w-[600px]">
        <div className="relative">
          <div className="mb-1 text-center text-xs font-medium text-muted-foreground">중요 ↑</div>

          <div className="flex items-center gap-2">
            <div className="shrink-0 text-xs font-medium text-muted-foreground">긴급 ↓</div>

            <div
              ref={graphRef}
              onDrop={handleGraphDrop}
              onDragOver={handleGraphDragOver}
              className={`relative aspect-square w-full rounded-lg border-2 transition-colors ${
                draggingId ? "border-primary border-dashed bg-primary/5" : "border-border bg-muted/30"
              }`}
            >
              <div className="absolute left-1/2 top-0 h-full w-px bg-border" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-border" />

              {QUADRANT_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="absolute flex items-center justify-center text-center"
                  style={{
                    left: `${label.x}%`,
                    top: `${label.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: "40%",
                  }}
                >
                  <span className="whitespace-pre-line text-xs text-muted-foreground/50 select-none">
                    {label.text}
                  </span>
                </div>
              ))}

              {placedGoals.map((goal) => (
                <div
                  key={goal.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, goal.id)}
                  onDragEnd={handleDragEnd}
                  className="absolute flex size-7 cursor-grab items-center justify-center rounded-full border bg-primary text-xs font-bold text-primary-foreground shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing"
                  style={{
                    left: `${goal.urgency}%`,
                    top: `${100 - (goal.importance ?? 0)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  title={`${goal.number}. ${goal.content}`}
                  onDoubleClick={() => handleRemoveFromGraph(goal.id)}
                >
                  {goal.number}
                </div>
              ))}
            </div>

            <div className="shrink-0 text-xs font-medium text-muted-foreground">긴급 ↑</div>
          </div>

          <div className="mt-1 text-center text-xs font-medium text-muted-foreground">중요 ↓</div>
        </div>
      </div>

      {/* 오른쪽: 목표 항목 리스트 */}
      <div className="w-64 shrink-0 space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">목표 항목</h3>
        {unplacedGoals.length > 0 && (
          <p className="text-xs text-muted-foreground">그래프로 드래그해서 배치하세요</p>
        )}

        {unplacedGoals.length === 0 && placedGoals.length > 0 ? (
          <p className="text-xs text-muted-foreground">
            모든 항목이 배치되었습니다. 더블클릭으로 해제할 수 있습니다.
          </p>
        ) : unplacedGoals.length === 0 ? (
          <p className="text-xs text-muted-foreground">Step 1에서 먼저 목표를 추가해주세요.</p>
        ) : null}

        <div className="flex flex-col gap-1.5">
          {unplacedGoals.map((goal) => (
            <div
              key={goal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, goal.id)}
              onDragEnd={handleDragEnd}
              className={`flex cursor-grab items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all active:cursor-grabbing ${
                draggingId === goal.id ? "opacity-50" : "hover:border-primary/50 hover:shadow-sm"
              } ${
                goal.category === "want"
                  ? "border-want/30 bg-want/10"
                  : "border-must/30 bg-must/10"
              }`}
            >
              <Badge className="shrink-0">{goal.number}</Badge>
              <span className="truncate">{goal.content}</span>
            </div>
          ))}
        </div>

        {placedGoals.length > 0 && (
          <>
          <Separator className="my-3" />
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-muted-foreground">배치된 항목</h4>
            <div className="flex flex-col gap-0.5">
              {placedGoals.map((goal) => (
                <span key={goal.id} className="text-xs text-muted-foreground">
                  <span className="font-semibold">{goal.number}</span>. {goal.content}
                </span>
              ))}
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
