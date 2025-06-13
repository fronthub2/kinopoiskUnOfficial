export interface IHeaderItem {
  title: string;
  link: string;
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
