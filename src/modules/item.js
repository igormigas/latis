export default function (ref) {
  if (ref === undefined || ref === null) {
    return null;
  }
  if (!ref instanceof HTMLElement) {
    return false;
  }

  let reference = ref;
  return {
    reference,
    type: null,
  };
}
