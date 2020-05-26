/**
 * Returns a shuffled version of the passed array. ES6 version
 * @param {Array} array items An array containing the items.
 */
export function shuffle(array) {
  const a = array.slice();

  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}