// lib/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:7777';

export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${API_URL}/tasks`);
  return response.data;
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axios.post<Task>(`${API_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (id: number, updatedTask: Partial<Task>): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};
