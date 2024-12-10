import React from 'react'
import { useGetTodosQuery } from '../store/api/todosApi'
import Todo from './Todo';

const TodoList = () => {
	const { data, isError, isLoading, error } = useGetTodosQuery();

  return (
	<>
		{ isLoading ? <p>Loading...</p> : ""}
		{ isError ? <p>{JSON.stringify(error)}</p> : ""}
		<ul>
			{
				data?.map(item => <Todo key={item.id} {...item}/>)
			}
		</ul>
	</>

  )
}

export default TodoList