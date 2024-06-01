import DeleteIcon from "@/icons/deleteIcon";
import type { Column, Id } from "@/types/kanbanBoard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: Column["title"]) => void;
}

export default function ColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn } = props;
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[500px] max-h-[500px] w-[272px] flex-col rounded-md border-4 bg-card opacity-40"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-[500px] max-h-[500px] w-[272px] flex-col rounded-md border-4 bg-card"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="text-md flex h-[56px] w-full cursor-grab items-center justify-between rounded-[1px] rounded-b-none bg-primary p-3 font-bold"
      >
        <div className="flex w-full items-center gap-2 text-primary-foreground">
          <div className="flex items-center justify-center rounded border bg-[#ddd6fe] p-2 text-sm text-[#09090b]">
            0
          </div>

          <div className="w-full flex-grow">
            {!editMode ? (
              column.title
            ) : (
              <input
                className="text-[#f5f3ff rounded border-2 py-1 pl-1 text-base font-medium outline-none focus:w-full focus:border-[#ddd6fe] focus:bg-[#8b5cf6]"
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                autoFocus
                onBlur={() => setEditMode(false)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            )}
          </div>
          <Button
            onClick={() => deleteColumn(column.id)}
            className="self-end rounded stroke-[#ddd6fe] px-1 py-2 hover:bg-[#8b5cf6] hover:stroke-[#f5f3ff]"
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        Content
      </div>
      <div className="p-2">Footer</div>
    </div>
  );
}
