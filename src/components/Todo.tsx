import React from 'react'
import { ITodo } from '../store/api/todosApi';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../store/api/todosApi';

interface IProps extends ITodo {}

const Todo: React.FC<IProps> = ({id, title, completed}) => {
	const [updateTodo, { data, isLoading, isError, error }] = useUpdateTodoMutation({});
	const [ handleDelete ] = useDeleteTodoMutation();

	function handleUpdate(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		updateTodo({ id: id!, payload: { completed: !completed }})
	}

  return (
	<li style={{ display: "flex" }}>
		<input
			type="checkbox"
			checked={completed}
			onChange={handleUpdate}
			disabled={isLoading}
		/>
		<p>{title}</p>
		<button onClick={() => handleDelete(id!)}>X</button>
	</li>
  )
}

export default Todo