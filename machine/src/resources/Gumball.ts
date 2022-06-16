export class Gumball {
  public color: Color;
  public flavor: Flavor;

  constructor(color: Color, flavor: Flavor) {
    this.color = color;
    this.flavor = flavor;
  }
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
  Purple = 'PURPLE',
  Clear = 'CLEAR',
}
