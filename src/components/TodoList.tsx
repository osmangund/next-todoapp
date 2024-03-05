import TodoItem, { TodoItemProps } from "./TodoItem"

type TodoListProps = {
  todos: TodoItemProps[]
}

export default function TodoList({ todos }: TodoListProps) {
  // Group todos by creation date
  const groupedTodos = todos.reduce((groups, todo) => {
    const date = new Date((todo.createdAt as Date).toString()).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(todo)
    return groups
  }, {} as Record<string, TodoItemProps[]>)

  return (
    <div>
      {Object.entries(groupedTodos).map(([date, todos]) => (
        <div key={date}>
          <h2>{date}</h2>
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </div>
      ))}
    </div>
  )
}
