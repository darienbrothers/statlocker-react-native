export type MessageType = 'text' | 'announcement';

export type ChannelType = 'announcements' | 'chat';

export interface ChannelMeta {
  id: string;
  name: string;
  type: ChannelType;
  createdBy: string;
  createdAt: number;
}

export interface DMMeta {
  id: string;
  name?: string;
  isGroup: boolean;
  members: string[];
  createdAt: number;
}

export interface ReactionMap {
  [emoji: string]: string[]; // userIds who reacted
}

export interface Message {
  id: string;
  threadId: string; // channelId or dmId
  isChannel: boolean;
  type: MessageType;
  text?: string;
  authorId: string;
  createdAt: number;
  editedAt?: number;
  reactions: ReactionMap;
  replyToId?: string;
}

export interface ReadReceipt {
  userId: string;
  lastReadAt: number;
}

export interface Presence {
  typing: string[]; // userIds currently typing
  online: string[]; // userIds online
}

export interface Thread {
  id: string; // channelId or dmId
  isChannel: boolean;
  name: string;
  members: string[]; // userIds
  pinnedMessageIds: string[];
  readReceipts: ReadReceipt[];
}

export interface UserSummary {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: 'coach' | 'athlete';
}

export type ThreadSummary = {
  id: string;
  isChannel: boolean;
  name: string;
  type?: ChannelType; // if channel
  lastMessageAt?: number;
  unreadCount?: number;
};


