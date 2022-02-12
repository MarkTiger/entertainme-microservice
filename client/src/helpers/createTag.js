export default function createTag(string) {
  return string
    .trim()
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length);
}
