import when from 'when';

const loadImage = (src) => {
  const deferred = when.defer();
  const img = document.createElement('img');
  img.onload = () => {
    deferred.resolve(img);
  };
  img.onerror = () => {
    deferred.reject(new Error('Image not found: ' + src));
  };
  img.src = src;

  return deferred.promise;
};

export default loadImage;
