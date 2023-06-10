export default function classNames(...args: Array<unknown>) {
  return args
    .filter((item) => item && item)
    .join(' ');
}

export type Mods = Record<string, boolean | string | undefined>;

export function classNamesRedesigned(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = [],
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
