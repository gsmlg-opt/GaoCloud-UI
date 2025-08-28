import { ucfirst } from '../../../src/utils/index.js';

const schema = [
  'time',
  'namespace',
  'kind',
  'name',
  'type',
  'reason',
  'message',
  'source',
];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
}));

export default tableSchema;
