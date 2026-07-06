import Property from "../models/Property.js";

// ==========================================
// CREATE PROPERTY
// ==========================================

export const createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
    };

    // Save Cloudinary image URL
    if (req.file) {
      propertyData.image = req.file.path;
    }

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: "Property Created Successfully",
      property,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL PROPERTIES
// ==========================================

export const getAllProperties = async (req, res) => {
  try {

    const properties = await Property.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: properties.length,
      properties,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// GET SINGLE PROPERTY
// ==========================================

export const getPropertyById = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    property.views += 1;

    await property.save();

    res.status(200).json({
      success: true,
      property,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// UPDATE PROPERTY
// ==========================================

export const updateProperty = async (req, res) => {
  try {

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property Updated Successfully",
      property,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// DELETE PROPERTY
// ==========================================

export const deleteProperty = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: "Property Deleted Successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// FEATURED PROPERTIES
// ==========================================

export const getFeaturedProperties = async (req, res) => {
  try {

    const properties = await Property.find({
      featured: true,
    });

    res.status(200).json({
      success: true,
      properties,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// AVAILABLE PROPERTIES
// ==========================================

export const getAvailableProperties = async (req, res) => {
  try {

    const properties = await Property.find({
      status: "Available",
    });

    res.status(200).json({
      success: true,
      properties,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// SEARCH PROPERTY
// ==========================================

export const searchProperties = async (req, res) => {
  try {

    const keyword = req.query.keyword || "";

    const properties = await Property.find({
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          "location.city": {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          "location.state": {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json({
      success: true,
      total: properties.length,
      properties,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};