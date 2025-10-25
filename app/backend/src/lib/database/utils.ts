import { UserNotFoundError } from '@/error';
import { isExistsUser } from '@/lib/database/users';

/**
 * Check if a user exists by user ID.
 *
 * Throws an error if the user does not exist.
 *
 * @param userId - The ID of the user to check.
 * @throws {UserNotFoundError} If the user does not exist.
 */
const checkExistsUser = async (userId: string) => {
  if (!(await isExistsUser(userId))) {
    throw new UserNotFoundError(userId);
  }
};

export { checkExistsUser };
