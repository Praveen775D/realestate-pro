// client/src/services/propertyService.js
import API from "./api";

// Get All Properties
export const getProperties = async () => {

  const res = await API.get("/properties");

  return res.data;

};

// Get Featured Properties
export const getFeaturedProperties = async () => {

  const res = await API.get("/properties/featured");

  return res.data;

};

// Get Single Property
export const getPropertyById = async (id) => {

  const res = await API.get(`/properties/${id}`);

  return res.data;

};

// Search
export const searchProperties = async (keyword) => {

  const res = await API.get(
    `/properties/search?keyword=${keyword}`
  );

  return res.data;

};