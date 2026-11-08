import type { Card } from '../types/card'

export const cards = [
  {
    id: 'ryu',
    name: 'Ryu',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/11/portrait-ryu-stats-2.jpg',
    attributes: { attack: 60, defense: 50, magic: 70 },
  },
  {
    id: 'chun-li',
    name: 'Chun-Li',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/11/portrait-chun-li-2.jpg',
    attributes: { attack: 60, defense: 40, magic: 70 },
  },
  {
    id: 'm-bison',
    name: 'M. Bison',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/11/portrait-mbison-stats-2.jpg',
    attributes: { attack: 90, defense: 60, magic: 80 },
  },
  {
    id: 'ken',
    name: 'Ken',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/11/portrait-ken-2.jpg',
    attributes: { attack: 70, defense: 50, magic: 60 },
  },
  {
    id: 'cammy',
    name: 'Cammy',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/11/portrait-cammy-2.jpg',
    attributes: { attack: 70, defense: 50, magic: 40 },
  },
  {
    id: 'vega',
    name: 'Vega',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/11/portrait-vega-2.jpg',
    attributes: { attack: 70, defense: 40, magic: 40 },
  },
  {
    id: 'zangief',
    name: 'Zangief',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/11/portrait-zangief-2.jpg',
    attributes: { attack: 90, defense: 60, magic: 30 },
  },
  {
    id: 'guile',
    name: 'Guile',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2016/04/portrait-guile.jpg',
    attributes: { attack: 70, defense: 80, magic: 70 },
  },
  {
    id: 'balrog',
    name: 'Balrog',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2016/06/portrait-balrog.jpg',
    attributes: { attack: 80, defense: 70, magic: 30 },
  },
  {
    id: 'blanka',
    name: 'Blanka',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2018/02/portrait-blanka.jpg',
    attributes: { attack: 70, defense: 60, magic: 70 },
  },
  {
    id: 'e-honda',
    name: 'E. Honda',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/07/portrait-ehonda.jpg',
    attributes: { attack: 70, defense: 60, magic: 30 },
  },
  {
    id: 'sagat',
    name: 'Sagat',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2018/08/portrait-sagat.jpg',
    attributes: { attack: 80, defense: 60, magic: 60 },
  },
  {
    id: 'dhalsim',
    name: 'Dhalsim',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/11/portrait-dhalsim-2.jpg',
    attributes: { attack: 60, defense: 40, magic: 80 },
  },
  {
    id: 'coringa',
    name: 'Akuma',
    kind: 'wild',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2016/12/portrait-akuma.jpg',
    attributes: { attack: 90, defense: 60, magic: 70 },
  },
  {
    id: 'sakura',
    name: 'Sakura',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2018/01/featured-sakura.jpg',
    attributes: { attack: 50, defense: 40, magic: 60 },
  },
  {
    id: 'especial',
    name: 'Kage',
    kind: 'special',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2018/12/featured-kage.jpg',
    attributes: { attack: 70, defense: 60, magic: 90 },
  },
    {
    id: 'laura',
    name: 'Laura',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2019/11/featured-laura-2.jpg',
    attributes: { attack: 60, defense: 50, magic: 30 },
  },
  {
    id: 'juri',
    name: 'Juri',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2016/07/featured-juri.jpg',
    attributes: { attack: 60, defense: 40, magic: 50 },
  },
    {
    id: 'ibuki',
    name: 'Ibuki',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2016/06/featured-ibuki.jpg',
    attributes: { attack: 60, defense: 30, magic: 40 },
  },
      {
    id: 'rose',
    name: 'Rose',
    kind: 'fighter',
    imageUrl:
      'https://www.streetfighter.com/5/en-us/wp-content/uploads/2021/04/featured-rose.jpg',
    attributes: { attack: 50, defense: 40, magic: 70 },
  }
] satisfies Card[]