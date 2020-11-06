// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Board, List, Card } = initSchema(schema);

export {
  Board,
  List,
  Card
};