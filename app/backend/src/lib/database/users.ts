import { UserNameAlreadyExistsError, UserNotFoundError } from '@/error';
import { db } from '@/lib/database';
import { checkExistsUser } from '@/lib/database/utils';
import { addNomihodaiFlag, isAvailableNomihodai } from '@/services/nomihodai';
import { generateId } from '@/utils/generateId';

const isExistsUser = async (userId: string) => {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', userId)
    .executeTakeFirst();
  return user !== undefined;
};

const isAvailableUserName = async (name: string) => {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('name', '=', name)
    .executeTakeFirst();
  return user === undefined;
};

const isAvailableUserId = async (userId: string) => {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', userId)
    .executeTakeFirst();
  return user === undefined;
};

const isActiveUser = async (userId: string) => {
  const user = await db
    .selectFrom('users')
    .select('isActive')
    .where('id', '=', userId)
    .executeTakeFirst();

  if (user === undefined) {
    throw new UserNotFoundError(userId);
  }
  return user.isActive;
};

const getUsers = async (isActive?: boolean, isNomihodai?: boolean) => {
  const query = (() => {
    let q = db.selectFrom('users').selectAll();
    if (isActive !== undefined) {
      q = q.where('isActive', '=', isActive);
    }
    return q;
  })();

  const users = await query.execute();

  return addNomihodaiFlag(
    isNomihodai === undefined
      ? users
      : users.filter(
          (user) => isAvailableNomihodai(user.nomihodaiEndAt) === isNomihodai
        )
  );
};

const getUser = async (userId: string) => {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', userId)
    .executeTakeFirst();

  if (user === undefined) {
    throw new UserNotFoundError(userId);
  }
  return addNomihodaiFlag([user])[0];
};

const registerUser = async (name: string) => {
  if (!(await isAvailableUserName(name))) {
    throw new UserNameAlreadyExistsError(name);
  }
  const userId = await (async () => {
    let id = '';
    do {
      id = generateId();
    } while (!(await isAvailableUserId(id)));
    return id;
  })();

  await db
    .insertInto('users')
    .values({
      id: userId,
      name,
    })
    .execute();
  return userId;
};

const switchUserStatus = async (userId: string, status: boolean) => {
  await checkExistsUser(userId);

  return await db
    .updateTable('users')
    .set({ isActive: status })
    .where('id', '=', userId)
    .executeTakeFirst();
};

const updateTime = async (userId: string, time: Date) => {
  await checkExistsUser(userId);
  await db
    .updateTable('users')
    .set({ time })
    .where('id', '=', userId)
    .execute();
};

const addFee = async (userId: string, fee: number) => {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', userId)
    .executeTakeFirst();

  if (user === undefined) {
    throw new UserNotFoundError(userId);
  }

  await db
    .updateTable('users')
    .set({ fee: user.fee + fee })
    .where('id', '=', userId)
    .execute();
};

const resetFee = async (userId: string) =>
  await db
    .updateTable('users')
    .set({ fee: 0 })
    .where('id', '=', userId)
    .execute();

const getEnterTime = async (userId: string) => {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', userId)
    .executeTakeFirst();

  if (user === undefined) {
    throw new UserNotFoundError(userId);
  }
  return user.time;
};

const getNomihodaiEndAt = async (userId: string) => {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', userId)
    .executeTakeFirst();

  if (user === undefined) {
    throw new UserNotFoundError(userId);
  }
  return user.nomihodaiEndAt;
};

const updateNomihodaiEndAt = async (userId: string, nomihodaiEndAt: Date) => {
  await checkExistsUser(userId);
  await db
    .updateTable('users')
    .set({ nomihodaiEndAt })
    .where('id', '=', userId)
    .execute();
};

export {
  addFee,
  getEnterTime,
  getNomihodaiEndAt,
  getUser,
  getUsers,
  isActiveUser,
  isAvailableUserId,
  isAvailableUserName,
  isExistsUser,
  registerUser,
  resetFee,
  switchUserStatus,
  updateNomihodaiEndAt,
  updateTime,
};
