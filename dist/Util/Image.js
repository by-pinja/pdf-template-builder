export function getSizeOf(base64, callback) {
  var img = new Image();

  img.src = base64;

  img.onload = function () {
    callback({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  };
}

export function scaleWidthTo(target, size) {
  return { width: target, height: size.height / (size.width / target) };
}