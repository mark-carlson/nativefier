import fields from './fields';

function resultArrayToObject(fieldResults) {
  return fieldResults.reduce(
    (accumulator, value) => ({ ...accumulator, ...value }),
    {},
  );
}

function inferredOptions(oldOptions, fieldResults) {
  const newOptions = resultArrayToObject(fieldResults);
  return { ...oldOptions, ...newOptions };
}

// Takes the options object and infers new values
// which may need async work
export default async function(options) {
  const tasks = fields(options);
  const fieldResults = await Promise.all(tasks);
  return inferredOptions(options, fieldResults);
}
