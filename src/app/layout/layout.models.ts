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
    link: '/trailer',
  },
  {
    title: 'Избранные',
    link: '/favorites',
  },
];

export const dropMenuAvatarItems: IDropMenuItem[] = [
  {
    title: 'Выйти',
    link: '/login',
    icon: 'log-out',
  },
  {
    title: 'Настройки',
    link: '/settings',
    icon: 'settings',
  }
]
