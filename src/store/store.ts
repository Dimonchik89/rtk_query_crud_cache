import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./api/todosApi";

const store = configureStore({
	reducer: {
		[todoApi.reducerPath]: todoApi.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoApi.middleware),
	devTools: true
})

export default store;