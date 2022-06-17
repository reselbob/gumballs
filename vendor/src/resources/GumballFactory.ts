import {Color, Flavor, Gumball} from './Gumball';
export class GumballFactory {
  public catalog: Array<Gumball>;

  constructor() {
    const arr = [
      new Gumball(Color.Red, Flavor.Cherry),
      new Gumball(Color.Green, Flavor.Spearmint),
      new Gumball(Color.Yellow, Flavor.Lemon),
      new Gumball(Color.Clear, Flavor.Peppermint),
    ];
    this.catalog = arr;
  }

  public getGumballs(count: number): Array<Gumball> {
    const arr = new Array<Gumball>();
    for (let i = 0; i < count; i++) {
      arr.push(this.getRandomGumball());
    }
    return arr;
  }

  private getRandomGumball(): Gumball {
    return this.catalog[Math.floor(Math.random() * this.catalog.length)];
  }
}
