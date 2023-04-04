export function dispatchActivationClick(element: HTMLElement) {
  const event = new MouseEvent('click', { bubbles: true });
  element.dispatchEvent(event);
  return event;
}

export function isActivationClick(event: Event) {
  // Event must start at the event target.
  if (event.currentTarget !== event.target) {
    return false;
  }
  // Event must not be retargeted from shadowRoot.
  if (event.composedPath()[0] !== event.target) {
    return false;
  }
  // Target must not be disabled; this should only occur for a synthetically
  // dispatched click.
  if ((event.target as EventTarget & { disabled: boolean }).disabled) {
    return false;
  }
  // This is an activation if the event should not be squelched.
  return !squelchEvent(event);
}

// TODO(https://bugzilla.mozilla.org/show_bug.cgi?id=1804576)
//  Remove when Firefox bug is addressed.
function squelchEvent(event: Event) {
  const squelched = isSquelchingEvents;
  if (squelched) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  squelchEventsForMicrotask();
  return squelched;
}

// Ignore events for one microtask only.
let isSquelchingEvents = false;
async function squelchEventsForMicrotask() {
  isSquelchingEvents = true;
  // Need to pause for just one microtask.
  // tslint:disable-next-line
  await null;
  isSquelchingEvents = false;
}
