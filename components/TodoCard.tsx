"use client";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
interface Props {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null;
}
export default function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  return (
    <div
      className="space-y-2 bg-white rounded-md drop-shadow-md"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex items-center justify-between p-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="w-8 h-8 ml-5" />
        </button>
      </div>
    </div>
  );
}
