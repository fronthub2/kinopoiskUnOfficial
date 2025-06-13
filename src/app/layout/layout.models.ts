export interface IHeaderItem {
  title: string;
  link: string;
}

export const headerItems: IHeaderItem[] = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Подборка',
    link: '/login',
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
