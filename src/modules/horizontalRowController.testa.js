import horizontalRowController from './horizontalRowController';

describe('GET function', () => {
  it('should return null when array is empty', () => {
    const instance = horizontalRowController();
    const get = instance.get();
    expect(get).toBeInstanceOf(Array);
    expect(get).toHaveLength(0);
  });
  it('should return null when position given but empty', () => {
    const instance = horizontalRowController();
    const value = 'test';
    instance.add(value);
    expect(instance.get(1)).toBeNull();
  });
  it('should return the value of not empty position', () => {
    const instance = horizontalRowController();
    const value = 'test';
    instance.add(value);
    expect(instance.get(0)).toBe(value);
  });
});

describe('Row width', () => {
  const instance = horizontalRowController();
  it('should be accessible by property', () => {
    expect(instance).toHaveProperty('rowWidth');
  });
  it('should be a number', () => {
    expect(instance.setWidth('1920px')).toEqual(1920);
    expect(instance.setWidth('1920')).toEqual(1920);
    expect(instance.setWidth(1920)).toEqual(1920);
  });
});

describe('Gutter width', () => {
  const instance = horizontalRowController();
  it('should be accessible by property', () => {
    expect(instance).toHaveProperty('gutterWidth');
  });
  it('should be a number', () => {
    expect(instance.setGutter('20px')).toEqual(20);
    expect(instance.setGutter('20')).toEqual(20);
    expect(instance.setGutter(20)).toEqual(20);
  });
});
