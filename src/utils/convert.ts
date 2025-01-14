import { ResponsiveValue } from 'styled-system';

import { Breakpoints } from '../scales/breakpoints';

const convert = (breakpoints: Breakpoints) => {
  const valueToArray = <T>(val: T, optimal: boolean = true) => [
    val,
    ...Array<null>(breakpoints.length)
  ].fill(optimal ? null : val, 1);

  const objToArray = <T>(obj: Record<string, T>, optimal: boolean = true): (T | null)[] =>
    ['_', ...breakpoints.aliases]
      .reduce((acc, val, i) => [
        ...acc,
        obj[val] ? obj[val] : optimal || i === 0 ? null : acc[i - 1]
      ], [] as (T | null)[]);

  const toArray = <T extends string | number | boolean>(
    val: ResponsiveValue<T> | undefined,
    optimal: boolean = true
  ): (T | null)[] =>
    val === undefined
      ? []
      : typeof val === 'object'
        ? val instanceof Array
          ? val
          : objToArray<T>(val as Record<string, T>, optimal)
        : valueToArray(val, optimal);

  const narrow = <T extends string | number | boolean>(val: (T | null)[]) => val.reduce((acc, x, i) => [
    ...acc,
    i === 0
      ? x
      : val[i - 1] === x
        ? null
        : x
  ], [] as (T | null)[]);

  return { valueToArray, objToArray, toArray, narrow };
};

export const getArrayValue = <T>(val: (T | null)[], i: number) => val[i]
  ? val[i]
  : val.reduceRight(
    (acc, v, ii) => !acc && ii <= i && v ? v : acc,
    null as T | null
  ) as T;

export default convert;
