import { atom } from 'recoil';

export interface Filter {
  category?: { id: number; name: string };
  location?: { id: number; name: string };
}

export const filterAtom = atom<Filter>({
  key: 'filter',
  default: {},
});
