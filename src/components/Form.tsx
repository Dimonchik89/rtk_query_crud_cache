import React, { useState } from 'react'
import { useCreateTodoMutation } from '../store/api/todosApi';

const Form = () => {
	const [value, setValue] = useState<string>('');
	const [handleCreate, { data, isLoading, isError, error }] = useCreateTodoMutation();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		handleCreate({ title: value, completed: false })
	}

  return (
	<div>
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button type="submit" disabled={isLoading}>Add Todo</button>
		</form>
	</div>
  )
}

export default Form