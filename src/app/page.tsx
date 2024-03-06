import Link from "next/link"
import { prisma } from "./db"
import TodoItem, { TodoItemProps } from "@/components/TodoItem"
import { redirect } from "next/navigation"

const getTodos = () => {
  return prisma.todo.findMany()
}

const toggleTodo = async (id: string, complete: boolean) => {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete } })
}

const deleteTodo = async (id: string) => {
  "use server"

  await prisma.todo.delete({ where: { id } })
  redirect("/")
}

// await prisma.todo.create({ data: { title: "Learn Prisma", complete: false } })

export default async function Home() {
  const todos = await getTodos()

  const groupedTodos = todos.reduce((groups, todo) => {
    const date = new Date(
      (todo.createdAt as Date).toString()
    ).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })

    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push({
      ...todo,
      toggleTodo: toggleTodo,
      deleteTodo: deleteTodo,
    })
    return groups
  }, {} as Record<string, TodoItemProps[]>)
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none text-xl"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        <div>
          {Object.entries(groupedTodos).map(([date, todos]) => (
            <div key={date} className="mb-4">
              <h2 className="mb-2 text-xl">{date}</h2>
              {todos.map((todo) => (
                <TodoItem key={todo.id} {...todo} />
              ))}
            </div>
          ))}
        </div>
      </ul>
    </>
  )
}
