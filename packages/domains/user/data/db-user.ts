import { Users } from '../model/users';

export function readUser(userId) {
  return Users.findOne(userId);
}
