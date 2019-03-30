import item from './item';

const dummyHTMLElement = document.createElement('div');

it('should return null when no argument', () => {
  expect(item()).toBeNull();
  expect(item(undefined)).toBeNull();
  expect(item(null)).toBeNull();
});

it('should return object when instance of HTMLElement is given', () => {
  //expect(dummyHTMLElement).toBeInstanceOf(HTMLElement);
  expect(item(dummyHTMLElement)).toBeInstanceOf(Object);
});

describe('Module result', () => {
  const instance = item(dummyHTMLElement);

  it('should have reference property', () => {
    expect(instance).toHaveProperty('reference');
    expect(instance.reference).toBeInstanceOf(HTMLElement);
  });
  it('should have type property', () => {
    expect(instance).toHaveProperty('type');
    expect(instance.type).toBeDefined();
  });
});


