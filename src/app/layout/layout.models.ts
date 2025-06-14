export interface IHeaderItem {
  title: string;
  link: string;
}

export interface IDropMenuItem {
  title: string;
  link: string;
  icon:string;
}

export const headerItems: IHeaderItem[] = [
  {
    title: 'Главная',
    link: '/home',
  },
  {
    title: 'Подборка',
    link: '/collections',
  },
  {
    title: 'Трейлеры',
    link: '/',
  },
  {
    title: 'Избранные',
    link: '/',
  },
];

export const dropMenuAvatarItems: IDropMenuItem[] = [
  {
    title: 'Выйти',
    link: '/login',
    icon: 'log-out',
  }
]
