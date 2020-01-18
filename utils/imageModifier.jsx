export default class ImageModifier {
  resize = (f, h) => {
    return new Promise((resolve, reject) => {
      const file = f;
      const height = h;

      const fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;

        (img.onload = () => {
          const elem = document.createElement("canvas");
          const scaleFactor = height / img.height;
          elem.height = height;
          elem.width = img.width * scaleFactor;

          const ctx = elem.getContext("2d");
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, img.width * scaleFactor, height);

          ctx.canvas.toBlob(
            blob => {
              const file = new File([blob], fileName, {
                type: "image/jpeg",
                lastModified: Date.now()
              });
              resolve(file);
            },
            "image/jpeg",
            1
          );
        }),
          (reader.onerror = error => reject(error));
      };
    });
  };

  fileObject = async img => {
    let newFile;
    await fetch(img.src)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "dot.png", blob);

        newFile = file;
      });
    return newFile;
  };
}
