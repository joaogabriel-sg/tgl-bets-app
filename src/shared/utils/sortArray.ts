export function sortArray<T>(array: T[], isDecreasing: boolean = false): T[] {
  return isDecreasing
    ? array.sort((a, b) => Number(b) - Number(a))
    : array.sort((a, b) => Number(a) - Number(b));
}
