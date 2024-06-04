import AddIcon from "@/icons/AddIcon";
import DeleteIcon from "@/icons/deleteIcon";
import type { Column, Id, Task } from "@/types/kanbanBoard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

interface Props {
  column: Column;
  tasks: Task[];
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: Column["title"]) => void;
  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: Task["content"]) => void;
  deleteTask: (id: Id) => void;
}

export default function ColumnContainer(props: Props) {
  const t = useTranslations("Column");

  const {
    column,
    tasks,
    deleteColumn,
    updateColumn,
    createTask,
    deleteTask,
    updateTask,
  } = props;

  const [editMode, setEditMode] = useState<boolean>(false);

  const tasksId = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

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
        className="border-prymary flex h-[550px] max-h-[550px] w-[272px] flex-col rounded-lg border-[1px] bg-card opacity-40"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-prymary flex h-[550px] max-h-[550px] w-[272px] flex-col rounded-lg border-[1px] bg-card"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="text-md flex h-[45px] w-full cursor-grab items-center justify-between rounded-md rounded-b-none border-primary bg-primary p-3 font-bold"
      >
        <div className="flex w-full items-center gap-2 text-primary-foreground">
          {/* <div className="flex items-center justify-center rounded border bg-[#ddd6fe] p-2 text-sm text-[#09090b]">
            0
          </div> */}

          <div className="w-full flex-grow">
            {!editMode ? (
              column.title
            ) : (
              <input
                className="rounded border-2 py-1 pl-1 text-base font-medium text-[#f5f3ff] outline-none focus:w-full focus:border-[#8b5cf6] focus:bg-[#8b5cf6]"
                placeholder={t("colTitle")}
                //value={column.title}
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
            className="rounded stroke-rose-300 px-1 py-2 hover:bg-rose-100 hover:stroke-red-500"
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <div className="p-2">
        <Button
          onClick={() => createTask(column.id)}
          className="flex w-full items-center justify-start gap-1 rounded-md bg-[#fff] text-[#09090b] hover:bg-[#f1f5f9]"
        >
          <AddIcon />
          {t("addTaskBtn")}
        </Button>
      </div>
    </div>
  );
}
