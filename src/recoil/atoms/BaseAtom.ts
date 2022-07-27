import { atom } from 'recoil';

interface BaseAtom {
  collapsed: boolean;
}

export const BaseAtom = atom<BaseAtom>({
  key: 'base',
  default: {
    collapsed: true,
  },
});
