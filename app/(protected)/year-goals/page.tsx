"use client";

import { useRef, useState } from "react";
import { GripVertical, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useYearGoals, tempId, type LocalGoal } from "./year-goals-provider";

export default function Step1Page() {
  const { localGoals, update } = useYearGoals();

  const wantGoals = localGoals
    .filter((g) => g.category === "want")
    .sort((a, b) => a.display_order - b.display_order);
  const mustGoals = localGoals
    .filter((g) => g.category === "must")
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <GoalColumn
        title="하고 싶은 일"
        category="want"
        goals={wantGoals}
        update={update}
        accentClass="border-border bg-muted dark:bg-muted/20"
        headerClass="text-want-foreground"
      />
      <GoalColumn
        title="해야 하는 일"
        category="must"
        goals={mustGoals}
        update={update}
        accentClass="border-border bg-muted dark:bg-muted/20"
        headerClass="text-must-foreground"
      />
    </div>
  );
}

function GoalColumn({
  title,
  category,
  goals,
  update,
  accentClass,
  headerClass,
}: {
  title: string;
  category: "want" | "must";
  goals: LocalGoal[];
  update: (fn: (prev: LocalGoal[]) => LocalGoal[]) => void;
  accentClass: string;
  headerClass: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const dragItemIdx = useRef<number | null>(null);

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const content = (fd.get("content") as string)?.trim();
    if (!content) return;

    const maxOrder = goals.length > 0 ? Math.max(...goals.map((g) => g.display_order)) : -1;

    update((prev) => [
      ...prev,
      {
        id: tempId(),
        content,
        category,
        display_order: maxOrder + 1,
        urgency: null,
        importance: null,
      },
    ]);

    form.reset();
    inputRef.current?.focus();
  }

  function handleDelete(id: string) {
    update((prev) => prev.filter((g) => g.id !== id));
  }

  function handleEditSave(id: string) {
    const trimmed = editContent.trim();
    if (!trimmed) return;
    update((prev) => prev.map((g) => (g.id === id ? { ...g, content: trimmed } : g)));
    setEditingId(null);
  }

  function handleDragStart(idx: number) {
    dragItemIdx.current = idx;
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIdx(idx);
  }

  function handleDrop(e: React.DragEvent, dropIdx: number) {
    e.preventDefault();
    setDragOverIdx(null);
    const fromIdx = dragItemIdx.current;
    dragItemIdx.current = null;
    if (fromIdx === null || fromIdx === dropIdx) return;

    const reordered = [...goals];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(dropIdx, 0, moved);

    const reorderedWithOrder = reordered.map((g, i) => ({ ...g, display_order: i }));
    const reorderedIds = new Set(reorderedWithOrder.map((g) => g.id));

    update((prev) => [...prev.filter((g) => !reorderedIds.has(g.id)), ...reorderedWithOrder]);
  }

  function handleDragEnd() {
    dragItemIdx.current = null;
    setDragOverIdx(null);
  }

  return (
    <Card className={accentClass}>
      <CardHeader>
        <CardTitle className={headerClass}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
      <form onSubmit={handleAdd} className="mb-3 flex gap-2">
        <Input
          ref={inputRef}
          name="content"
          placeholder="목표를 입력하세요..."
          required
          className="flex-1 bg-background"
        />
        <Button type="submit" size="sm">
          <Plus className="size-3.5" />
        </Button>
      </form>

      {goals.length === 0 ? (
        <p className="py-4 text-center text-xs text-muted-foreground">아직 항목이 없습니다.</p>
      ) : (
        <ul className="space-y-1.5">
          {goals.map((goal, idx) => (
            <li
              key={goal.id}
              draggable={editingId !== goal.id}
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragLeave={() => setDragOverIdx(null)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`group flex cursor-grab items-center gap-1 rounded-md border bg-background px-2 py-1 transition-all active:cursor-grabbing hover:!bg-accent ${
                dragOverIdx === idx ? "border-primary ring-1 ring-primary/30" : ""
              }`}
            >
              {editingId === goal.id ? (
                <>
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="flex-1"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEditSave(goal.id);
                      }
                      if (e.key === "Escape") setEditingId(null);
                    }}
                  />
                  <Button size="xs" onClick={() => handleEditSave(goal.id)}>
                    저장
                  </Button>
                  <Button size="xs" variant="ghost" onClick={() => setEditingId(null)}>
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <GripVertical className="size-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
                  <span className="flex-1 text-sm">{goal.content}</span>
                  <div className="flex items-center gap-0.5 opacity-50 transition-opacity group-hover:opacity-100">
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(goal.id);
                        setEditContent(goal.content);
                      }}
                    >
                      <Pencil className="size-3" />
                    </Button>
                    <Button size="icon-xs" variant="destructive" onClick={() => handleDelete(goal.id)}>
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      </CardContent>
    </Card>
  );
}
