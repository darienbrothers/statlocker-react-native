import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AiSession, AiTone } from '../types';

export const STORAGE_KEYS = {
  tone: 'aiCoach:tone',
  current: 'aiCoach:currentSession',
  sessions: 'aiCoach:sessions',
} as const;

export async function getTone(): Promise<AiTone | null> {
  const v = await AsyncStorage.getItem(STORAGE_KEYS.tone);
  return (v as AiTone) || null;
}

export async function setTone(tone: AiTone): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.tone, tone);
}

export async function getCurrentSession(): Promise<AiSession | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.current);
  return raw ? (JSON.parse(raw) as AiSession) : null;
}

export async function setCurrentSession(session: AiSession): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.current, JSON.stringify(session));
}

export async function getSessionsIndex(): Promise<Pick<AiSession, 'id' | 'topic' | 'updatedAt'>[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.sessions);
  return raw ? (JSON.parse(raw) as Pick<AiSession, 'id' | 'topic' | 'updatedAt'>[]) : [];
}

export async function upsertSessionIndex(entry: Pick<AiSession, 'id' | 'topic' | 'updatedAt'>): Promise<void> {
  const list = await getSessionsIndex();
  const others = list.filter((x) => x.id !== entry.id);
  const next = [entry, ...others].slice(0, 20);
  await AsyncStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(next));
}


