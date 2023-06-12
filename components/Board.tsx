"use client";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { isMobile } from "react-device-detect";
export default function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  function handleOnDragEnd(result: DropResult) {
    const { destination, source, type } = result;
    if (!destination) return; // check if the item was dropped outside of a droppable
    if (type === "column") {
      // handle column dnd
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);

      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({ ...board, columns: rearrangedColumns });
      return;
    }
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];
    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };
    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };
    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol === finishCol) return;
    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);
    const newCol = {
      id: startCol.id,
      todos: newTodos,
    };
    const newColumns = new Map(board.columns);
    if (startCol.id === finishCol.id) {
      //same Col drag
      newTodos.splice(destination.index, 0, todoMoved);

      newColumns.set(startCol.id, newCol);
    } else {
      // diff Col drag
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(source.index, 0, todoMoved);

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });
    }
    updateTodoInDB(todoMoved, finishCol.id);
    setBoardState({ ...board, columns: newColumns });
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable
        droppableId="board"
        direction={isMobile ? "vertical" : "horizontal"}
        type="column"
      >
        {(provided) => (
          <div
            className="grid grid-cols-1 gap-5 p-5 mx-auto md:grid-cols-3 max-w-7xl"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
