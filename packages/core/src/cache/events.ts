export interface CacheChangeEventDetail {
  key: string;
  oldValue: string;
  newValue: string;
}

export interface CacheChangeEvent extends CustomEvent<CacheChangeEventDetail> {}

export const createCacheChangeClickedEvent = (key: string, oldValue: string, newValue: string) => {
  return new CustomEvent<CacheChangeEventDetail>('cache-change', {
    detail: {
      key,
      oldValue,
      newValue,
    },
    bubbles: true,
    composed: true,
  });
};
