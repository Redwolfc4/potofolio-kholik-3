export function whenMotionEnabled<T extends object>(enabled: boolean, props: T): T | Record<string, never> {
  return enabled ? props : {};
}
