import API from "./api";

export const sendEnquiry = async (data) => {

  const res = await API.post(
    "/enquiries",
    data
  );

  return res.data;

};