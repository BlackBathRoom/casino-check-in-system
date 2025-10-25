import type { users } from '@/lib/database/schema';

const NOMIHODAI_TIME_HOURS = 1;
const MS_PER_HOUR = 60 * 60 * 1000;

const isAvailableNomihodai = (nomihodaiEndAt: Date | null): boolean => {
  if (nomihodaiEndAt === null) {
    return false;
  }
  return new Date() < nomihodaiEndAt;
};

type User = Required<typeof users.$inferInsert>;

const addNomihodaiFlag = (users: User[]) =>
  users.map((user) => ({
    ...user,
    isNomihodai: isAvailableNomihodai(user.nomihodaiEndAt),
  }));

const calcNomihodaiEndAt = (startAt: Date = new Date()): Date =>
  new Date(startAt.getTime() + NOMIHODAI_TIME_HOURS * MS_PER_HOUR);

export { addNomihodaiFlag, calcNomihodaiEndAt, isAvailableNomihodai };
