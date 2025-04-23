export interface User {
	id: string;
	firstName: string;
	lastName: string;
}

export interface ChatMessage {
  text: string;
  userId: string;
  userName: string;
  timestamp: string;
}