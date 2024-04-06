export const day2min = (days: number) => days * 24 * 60;
export const min2ms = (mins: number) => mins * 60 * 1000;

export const createPolling = (callback: () => void, interval: number) => {
  // closure to keep the callback and interval
  const polling = () => {
    callback();
    setTimeout(polling, interval);
  }

  return polling;
}
