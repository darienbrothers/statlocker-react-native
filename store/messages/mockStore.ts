import { ChannelMeta, ChannelType, DMMeta, Message, Presence, ReadReceipt, Thread, ThreadSummary, UserSummary } from '../../types/messages';

type EventType =
  | 'message:new'
  | 'message:edit'
  | 'reaction:toggle'
  | 'thread:read'
  | 'presence:typing'
  | 'pin:changed';

type EventPayloadMap = {
  'message:new': { message: Message };
  'message:edit': { message: Message };
  'reaction:toggle': { messageId: string; emoji: string; userId: string };
  'thread:read': { threadId: string; userId: string; lastReadAt: number };
  'presence:typing': { threadId: string; typing: string[] };
  'pin:changed': { threadId: string; pinnedMessageIds: string[] };
};

type EventCallback<K extends EventType> = (payload: EventPayloadMap[K]) => void;

class EventBus {
  private listeners: { [K in EventType]?: Array<EventCallback<K>> } = {} as any;

  subscribe<K extends EventType>(event: K, cb: EventCallback<K>) {
    if (!this.listeners[event]) this.listeners[event] = [] as any;
    (this.listeners[event] as Array<EventCallback<K>>).push(cb);
    return () => {
      this.listeners[event] = (this.listeners[event] || []).filter((fn) => fn !== cb) as any;
    };
  }

  emit<K extends EventType>(event: K, payload: EventPayloadMap[K]) {
    (this.listeners[event] || []).forEach((cb) => (cb as any)(payload));
  }
}

// Mock users
const users: UserSummary[] = [
  { id: 'u_me', name: 'Erica Brothers', role: 'athlete' },
  { id: 'u_coach', name: 'Coach Miller', role: 'coach' },
  { id: 'u_teammate', name: 'Alex Kim', role: 'athlete' },
];

// Seed channels and DMs
const channels: ChannelMeta[] = [
  { id: 'c_announce', name: '#announcements', type: 'announcements', createdBy: 'u_coach', createdAt: Date.now() - 1000 * 60 * 60 * 24 },
  { id: 'c_team', name: '#team-chat', type: 'chat', createdBy: 'u_coach', createdAt: Date.now() - 1000 * 60 * 60 * 23 },
];

const dms: DMMeta[] = [
  { id: 'd_alex', name: 'Alex Kim', isGroup: false, members: ['u_me', 'u_teammate'], createdAt: Date.now() - 1000 * 60 * 60 * 5 },
];

// Thread state
const threads: Record<string, Thread> = {
  c_announce: {
    id: 'c_announce',
    isChannel: true,
    name: '#announcements',
    members: users.map((u) => u.id),
    pinnedMessageIds: [],
    readReceipts: users.map((u) => ({ userId: u.id, lastReadAt: 0 })),
  },
  c_team: {
    id: 'c_team',
    isChannel: true,
    name: '#team-chat',
    members: users.map((u) => u.id),
    pinnedMessageIds: [],
    readReceipts: users.map((u) => ({ userId: u.id, lastReadAt: 0 })),
  },
  d_alex: {
    id: 'd_alex',
    isChannel: false,
    name: 'Alex Kim',
    members: ['u_me', 'u_teammate'],
    pinnedMessageIds: [],
    readReceipts: ['u_me', 'u_teammate'].map((u) => ({ userId: u, lastReadAt: 0 })),
  },
};

let messages: Message[] = [];

const now = Date.now();

// Seed messages
messages.push(
  {
    id: 'm1',
    threadId: 'c_announce',
    isChannel: true,
    type: 'announcement',
    text: 'Game moved to 6:00 PM. Be on the field by 5:15 for warm-ups.',
    authorId: 'u_coach',
    createdAt: now - 1000 * 60 * 60 * 4,
    reactions: { '👍': ['u_me', 'u_teammate'] },
  },
  {
    id: 'm2',
    threadId: 'c_team',
    isChannel: true,
    type: 'text',
    text: 'Nice win today team! 🔥',
    authorId: 'u_teammate',
    createdAt: now - 1000 * 60 * 60 * 3,
    reactions: {},
  },
  {
    id: 'm3',
    threadId: 'c_team',
    isChannel: true,
    type: 'text',
    text: 'Thanks! Save % trending up — great defense too. @Alex Kim',
    authorId: 'u_me',
    createdAt: now - 1000 * 60 * 60 * 3 + 5000,
    reactions: { '👏': ['u_coach'] },
  },
  {
    id: 'm4',
    threadId: 'd_alex',
    isChannel: false,
    type: 'text',
    text: 'Want to do wall ball tomorrow? 50 reps full speed.',
    authorId: 'u_me',
    createdAt: now - 1000 * 60 * 30,
    reactions: {},
  }
);

// Auto-pin announcements
threads.c_announce.pinnedMessageIds = ['m1'];

const presence: Record<string, Presence> = {
  c_announce: { typing: [], online: users.map((u) => u.id) },
  c_team: { typing: [], online: users.map((u) => u.id) },
  d_alex: { typing: [], online: ['u_me', 'u_teammate'] },
};

const bus = new EventBus();

// Utilities
function getUser(userId: string) {
  return users.find((u) => u.id === userId);
}

function isCoach(userId: string) {
  return getUser(userId)?.role === 'coach';
}

function computeUnread(threadId: string, userId: string) {
  const thread = threads[threadId];
  const rr = thread.readReceipts.find((r) => r.userId === userId);
  const lastRead = rr?.lastReadAt ?? 0;
  return messages.filter((m) => m.threadId === threadId && m.createdAt > lastRead).length;
}

// Public API
export const mockMessagesStore = {
  // events
  subscribe: bus.subscribe.bind(bus),

  // lists
  listChannels(): ThreadSummary[] {
    return channels.map((c) => ({
      id: c.id,
      isChannel: true,
      name: c.name,
      type: c.type,
      lastMessageAt: messages.filter((m) => m.threadId === c.id).reduce((acc, m) => Math.max(acc, m.createdAt), 0),
      unreadCount: computeUnread(c.id, 'u_me'),
    }));
  },

  listDMs(): ThreadSummary[] {
    return dms.map((d) => ({
      id: d.id,
      isChannel: false,
      name: d.name || 'Direct Message',
      lastMessageAt: messages.filter((m) => m.threadId === d.id).reduce((acc, m) => Math.max(acc, m.createdAt), 0),
      unreadCount: computeUnread(d.id, 'u_me'),
    }));
  },

  getThread(threadId: string) {
    const thread = threads[threadId];
    const threadMessages = messages
      .filter((m) => m.threadId === threadId)
      .sort((a, b) => a.createdAt - b.createdAt);
    const pres = presence[threadId];
    return { thread, messages: threadMessages, presence: pres } as {
      thread: Thread;
      messages: Message[];
      presence: Presence;
    };
  },

  sendMessage(params: { threadId: string; authorId: string; text: string; type?: Message['type'] }) {
    const thread = threads[params.threadId];
    if (!thread) throw new Error('Thread not found');

    // Only coaches can post announcements in announcements channel
    const channel = channels.find((c) => c.id === params.threadId);
    const isAnnouncement = (params.type || 'text') === 'announcement';
    if (channel?.type === 'announcements' && isAnnouncement && !isCoach(params.authorId)) {
      throw new Error('Only coaches can post announcements');
    }

    const message: Message = {
      id: 'm_' + Math.random().toString(36).slice(2, 9),
      threadId: params.threadId,
      isChannel: thread.isChannel,
      type: (params.type || (channel?.type === 'announcements' ? 'announcement' : 'text')) as Message['type'],
      text: params.text,
      authorId: params.authorId,
      createdAt: Date.now(),
      reactions: {},
    };
    messages.push(message);
    bus.emit('message:new', { message });
    return message;
  },

  toggleReaction(params: { threadId: string; messageId: string; userId: string; emoji: string }) {
    const msg = messages.find((m) => m.id === params.messageId && m.threadId === params.threadId);
    if (!msg) return;
    const current = msg.reactions[params.emoji] || [];
    const has = current.includes(params.userId);
    msg.reactions[params.emoji] = has ? current.filter((u) => u !== params.userId) : [...current, params.userId];
    bus.emit('reaction:toggle', { messageId: msg.id, emoji: params.emoji, userId: params.userId });
  },

  markRead(params: { threadId: string; userId: string }) {
    const rr = threads[params.threadId].readReceipts.find((r) => r.userId === params.userId);
    const ts = Date.now();
    if (rr) rr.lastReadAt = ts; else threads[params.threadId].readReceipts.push({ userId: params.userId, lastReadAt: ts });
    bus.emit('thread:read', { threadId: params.threadId, userId: params.userId, lastReadAt: ts });
  },

  setTyping(params: { threadId: string; userId: string; typing: boolean }) {
    const pres = presence[params.threadId];
    if (!pres) return;
    const has = pres.typing.includes(params.userId);
    if (params.typing && !has) pres.typing.push(params.userId);
    if (!params.typing && has) pres.typing = pres.typing.filter((u) => u !== params.userId);
    bus.emit('presence:typing', { threadId: params.threadId, typing: [...pres.typing] });
  },

  pinMessage(params: { threadId: string; messageId: string }) {
    const t = threads[params.threadId];
    if (!t.pinnedMessageIds.includes(params.messageId)) t.pinnedMessageIds.push(params.messageId);
    bus.emit('pin:changed', { threadId: params.threadId, pinnedMessageIds: [...t.pinnedMessageIds] });
  },

  unpinMessage(params: { threadId: string; messageId: string }) {
    const t = threads[params.threadId];
    t.pinnedMessageIds = t.pinnedMessageIds.filter((id) => id !== params.messageId);
    bus.emit('pin:changed', { threadId: params.threadId, pinnedMessageIds: [...t.pinnedMessageIds] });
  },
};

export type MockMessagesStore = typeof mockMessagesStore;


