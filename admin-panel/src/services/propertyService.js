import API from "./api";

// =============================
// Get All Properties
// =============================
export const getProperties = async () => {
  const res = await API.get("/properties");
  return res.data;
};

// =============================
// Get Single Property
export const getPropertyById = async (id) => {
  const res = await API.get(`/properties/${id}`);
  return res.data;
};

// =============================
// Create Property
// =============================
export const createProperty = async (data) => {
  const res = await API.post("/properties", data);
  return res.data;
};

// =============================
// Update Property
// =============================
export const updateProperty = async (id, data) => {
  const res = await API.put(`/properties/${id}`, data);
  return res.data;
};

// =============================
// Delete Property
// =============================
export const deleteProperty = async (id) => {
  const res = await API.delete(`/properties/${id}`);
  return res.data;
};

// =============================
// Search Property
// =============================
export const searchProperty = async (keyword) => {
  const res = await API.get(
    `/properties/search?keyword=${keyword}`
  );
  return res.data;
};

// =============================
// Featured Properties
// =============================
export const featuredProperties = async () => {
  const res = await API.get("/properties/featured");
  return res.data;
};

// =============================
// Available Properties
// =============================
export const availableProperties = async () => {
  const res = await API.get("/properties/available");
  return res.data;
};