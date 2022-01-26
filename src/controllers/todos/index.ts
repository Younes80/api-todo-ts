import { Request, Response } from 'express';
import { Todo } from '../../models/todo';

const getTodos = async (req: Request, res: Response) => {
	try {
		const todos = await Todo.find({});
		res.status(200).json({ todos });
	} catch (error) {
		throw error;
	}
};

const addTodo = async (req: Request, res: Response) => {
	try {
		const { name, description, status } = req.body;
		const todo = Todo.build({ name, description, status });
		console.log(todo);

		const newTodo = await todo.save();
		const allTodos = await Todo.find();

		return res
			.status(201)
			.json({ message: 'Todo added', todo: newTodo, todos: allTodos });
	} catch (error) {
		console.log('err addTodo ' + error);
		throw error;
	}
};

const updateTodo = async (req: Request, res: Response) => {
	try {
		const {
			params: { id },
			body,
		} = req;
		const updateTodo = await Todo.findByIdAndUpdate({ _id: id }, body);
		const allTodos = await Todo.find();
		res.status(200).json({
			message: 'Todo updated',
			todo: updateTodo,
			todos: allTodos,
		});
	} catch (error) {
		throw error;
	}
};

const deleteTodo = async (req: Request, res: Response) => {
	try {
		const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
		const allTodos = await Todo.find();
		res.status(200).json({
			message: 'Todo deleted',
			todo: deletedTodo,
			todos: allTodos,
		});
	} catch (error) {
		throw error;
	}
};

export { getTodos, addTodo, updateTodo, deleteTodo };
