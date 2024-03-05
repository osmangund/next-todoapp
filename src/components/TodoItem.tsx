"use client"

export type TodoItemProps = {
  id: string
  title: string
  complete: boolean
  toggleTodo: (id: string, complete: boolean) => void
  deleteTodo: (id: string) => void
  createdAt: object
}

export default function TodoItem({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
  createdAt,
}: TodoItemProps) {
  return (
    <li className="flex gap-1 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-xl peer-checked:line-through peer-checked:text-slate-500 flex gap-4 items-center"
      >
        <span>{title}</span>
        <button className="text-sm" onClick={() => deleteTodo(id)}>
          X
        </button>
      </label>
    </li>
  )
}
