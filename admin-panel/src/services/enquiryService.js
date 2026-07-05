import API from "./api";

export const getEnquiries = async () => {
  const res = await API.get("/enquiries");
  return res.data;
};

export const createEnquiry = async (data) => {
  const res = await API.post("/enquiries", data);
  return res.data;
};

export const updateEnquiry = async (id, data) => {
  const res = await API.put(`/enquiries/${id}`, data);
  return res.data;
};

export const deleteEnquiry = async (id) => {
  const res = await API.delete(`/enquiries/${id}`);
  return res.data;
};