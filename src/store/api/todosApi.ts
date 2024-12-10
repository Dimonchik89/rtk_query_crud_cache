import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from './todosApi';

export interface ITodo {
	id?: number,
	title?: string
	completed?: boolean
}

export const todoApi = createApi({
	reducerPath: "todoApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/todos" }),
	tagTypes: ['todos'],
	endpoints: builder => ({
		getTodos: builder.query<ITodo[], void>({
			query: () => '',
			providesTags: ['todos']
		}),
		updateTodo: builder.mutation<ITodo, { id: number, payload: { completed: boolean }}>({
			query: ({ id, payload }) => ({
				url: `${id}`,
				method: 'PATCH',
				body: payload
			}),
			// invalidatesTags: ['todos'],
			async onQueryStarted({ id, payload }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(todoApi.util.updateQueryData		('getTodos', undefined, (draft) => {
					const taskIndex = draft.findIndex((el) => el.id === id);
					draft[taskIndex] = { ...draft[taskIndex], ...payload };
				}))

				try {
					await queryFulfilled
				} catch(error) {
					patchResult.undo()
				}
			}
		}),
		deleteTodo: builder.mutation<ITodo, number>({
			query: (id) => ({
				url: `${id}`,
				method: "DELETE"
			}),
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					todoApi.util.updateQueryData('getTodos', undefined, draft => {
						const todoIndex = draft.findIndex(item => item.id === id);
						draft.splice(todoIndex, 1)
					})
				)
			}
		}),
		createTodo: builder.mutation<ITodo, ITodo>({
			query: (todo) => ({
				url: '',
				method: "POST",
				body: todo
			}),
			async onQueryStarted(todo, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					todoApi.util.updateQueryData('getTodos', undefined, draft => {
						draft.push({ id: Date.now(), ...todo })
					})
				)
			}
		})
	})
})

export const { useGetTodosQuery, useUpdateTodoMutation, useDeleteTodoMutation, useCreateTodoMutation } = todoApi;