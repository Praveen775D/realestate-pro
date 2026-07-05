import { useDropzone } from "react-dropzone";

function ImageUploader({ images, setImages }) {
  const onDrop = (acceptedFiles) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  return (
    <div>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-xl p-10 text-center cursor-pointer hover:bg-blue-50"
      >
        <input {...getInputProps()} />

        <p className="text-lg">
          Click or Drag Images Here
        </p>

      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">

        {images.map((img, index) => (

          <img
            key={index}
            src={URL.createObjectURL(img)}
            className="h-32 w-full rounded-xl object-cover"
            alt=""
          />

        ))}

      </div>

    </div>
  );
}

export default ImageUploader;