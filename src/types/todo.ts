import { Document } from 'mongoose';

export interface ITodo extends Document {
	name: String;
	description: String;
	status: boolean;
}
