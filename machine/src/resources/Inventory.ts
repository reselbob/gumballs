import {Gumball} from './Gumball';
import {logger} from '../logger';
import {GumballBuyer} from './GumballBuyer';

export class Inventory {
  private static gumballs: Array<Gumball> = new Array<Gumball>();

  public static async get(): Promise<Gumball> {
    // take the first gumball off the stack
    if (this.gumballs.length === 0) {
      logger.info('Buying more gumballs');
      const buyer = new GumballBuyer();
      const gbs = await buyer.buy(10);
      logger.info(`Bought more gumballs: ${gbs}`);
      const arr = this.gumballs.concat(gbs);
      this.gumballs = arr;
    }

    const gb = this.gumballs.shift();
    return gb;
  }
}
