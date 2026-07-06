export const uploadImages = async (req, res) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Images Uploaded",
      });
    }

    const images = req.files.map(file => ({
      filename: file.filename,
      url: file.path,
    }));

    res.status(201).json({
      success: true,
      images,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};