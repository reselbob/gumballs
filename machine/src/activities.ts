//import * as activity from '@temporalio/activity';
import {Gumball} from './resources/Interfaces';
import {logger} from './logger';
import axios from 'axios';

export const createActivities = (supplierURL: string, quantity: number) => {
  return {
    async buyGumballs(): Promise<Gumball[]> {
      let strUrl = supplierURL;
      if (strUrl.substring(strUrl.length - 1) !== '/') {
        strUrl = strUrl + '/';
      }
      const url = `${strUrl}${quantity}`;
      logger.info(`Buying gumballs as ${url}`);
      const response = await axios.get(url);
      logger.info(`Bought gumballs as ${url}`);
      return response.data;
    },
  };
};
