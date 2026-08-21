import { apiFetch } from "@/lib/api";

export type MessagePriority = "URGENT" | "HIGH" | "NORMAL" | "LOW";
export type MessageUserRole = "ADMIN" | "SECRETARY" | "DOCTOR";

export interface MessageUser {
  id: string;
  clinicId: string;
  fullName: string;
  email: string;
  role: MessageUserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  clinicId: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  priority: MessagePriority;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  sender: MessageUser;
  receiver: MessageUser;
}

export interface ListMessagesOptions {
  isRead?: boolean;
  priority?: MessagePriority;
}

export interface CreateMessageInput {
  receiverId: string;
  subject: string;
  content: string;
  priority?: MessagePriority;
}

export interface UpdateMessageInput {
  isRead: boolean;
}

export function listMessages(options: ListMessagesOptions = {}): Promise<Message[]> {
  const params = new URLSearchParams();
  if (options.isRead !== undefined) params.set("isRead", String(options.isRead));
  if (options.priority !== undefined) params.set("priority", options.priority);
  const query = params.toString();
  return apiFetch<Message[]>(`/messages${query ? `?${query}` : ""}`);
}

export function getMessage(id: string): Promise<Message> {
  return apiFetch<Message>(`/messages/${id}`);
}

export function createMessage(input: CreateMessageInput): Promise<Message> {
  return apiFetch<Message>("/messages", { method: "POST", body: JSON.stringify(input) });
}

export function updateMessage(id: string, input: UpdateMessageInput): Promise<Message> {
  return apiFetch<Message>(`/messages/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}
