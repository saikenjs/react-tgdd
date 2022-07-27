import { atom } from 'recoil';
import { User } from '../../types/User';

export const userAtom = atom<User>({
  key: 'user',
  default: undefined,
});
