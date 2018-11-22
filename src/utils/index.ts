/**
 * Provided word, returns it in titlecase...
 * @param word {string} word to titlecase
 * @return {string} titlecase'd word...
 */
export function titleCase(word: string) {
  return word
    .split(/[^a-z0-9]+/i)
    .map(l => l[0].toUpperCase() + l.slice(1, l.length))
    .join(' ');

}