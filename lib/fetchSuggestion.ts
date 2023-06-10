import { formatTodosForAI } from "./formatTodosForAI";

export const fetchSuggestions = async (board: Board) => {
  const todos = formatTodosForAI(board);

  // if you have a valid openAI key use this
  //   try {
  //     const res = await fetch("/api/generateSummary", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ todos }),
  //     });

  //     const GPTdata = await res.json();

  //     const { content } = GPTdata;
  //     return content;
  //   } catch (error) {
  //     console.error(error);
  //   }

  // if you dont you can use this

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("");
    }, Math.floor(Math.random() * 1000) + 1000);
  });

  return `Hello Mr. Chahine, welcome to the Trello-2.0 Todo App! You currently have ${
    todos.todo
  } ${todos.todo === 1 ? "task" : "tasks"} to do, ${todos.inprogress} ${
    todos.inprogress === 1 ? "task" : "tasks"
  } in progress and ${todos.done} ${
    todos.done === 1 ? "task" : "tasks"
  } that's already done. Thank you for keeping track of your tasks. Have a productive day!  `;
};
