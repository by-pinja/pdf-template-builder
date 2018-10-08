export function getSizeOf(base64, callback) {
  const img = new Image();

  img.src = base64;

  img.onload = () => {
    callback({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  };
}

export function scaleWidthTo(target, size) {
  return { width: target, height: size.height / (size.width / target) };
}