import { icon } from './icon';
import { userAgent } from './userAgent';
import { name } from './name';

const fields = [
  {
    field: 'userAgent',
    task: userAgent,
  },
  {
    field: 'icon',
    task: icon,
  },
  {
    field: 'name',
    task: name,
  },
];

// Modifies the result of each promise from a scalar
// value to a object containing its fieldname
async function wrap(fieldName: string, promise, args): Promise<any> {
  const result = await promise(args);

  return {
    [fieldName]: result,
  };
}

// Returns a list of promises which will all resolve
// with the following result: {[fieldName]: fieldvalue}
export function getFields(options) {
  return fields.map(({ field, task }) => wrap(field, task, options));
}
