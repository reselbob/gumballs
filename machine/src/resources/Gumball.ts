export class Gumball {
  constructor(public color: Color, public flavor: Flavor) {}
}

export enum Flavor {
  Lemon = 'LEMON',
  Cherry = 'CHERRY',
  Peppermint = 'PEPPERMINT',
  Spearmint = 'SPEARMINT',
}

export enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Yellow = 'YELLOW',
  Clear = 'CLEAR',
}
