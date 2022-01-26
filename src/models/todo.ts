import mongoose, { Model, model, Schema } from 'mongoose';

interface ITodo {
	name: string;
	description: string;
	status: boolean;
}

interface todoModelInterface extends Model<TodoDoc> {
	build(attr: ITodo): TodoDoc;
}

interface TodoDoc extends Document {
	name: string;
	description: string;
	status: boolean;
}

const todoSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
);

todoSchema.statics.build = (attr: ITodo) => {
	return new Todo(attr);
};

const Todo = mongoose.model<TodoDoc, todoModelInterface>('Todo', todoSchema);

Todo.build({
	name: 'some name',
	description: 'some description',
	status: false,
});

export { Todo };
