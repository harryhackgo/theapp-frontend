import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const blockUsers = async (ids: number[]) => {
  const response = await axiosInstance.patch("/users/block", { ids });
  return response.data;
};

export const unblockUsers = async (ids: number[]) => {
  const response = await axiosInstance.patch("/users/unblock", { ids });
  return response.data;
};

export const deleteUsers = async (ids: number[]) => {
  const response = await axiosInstance.delete("/users", { data: { ids } });
  return response.data;
};

export const deleteUnverifiedUsers = async (ids: number[]) => {
  const response = await axiosInstance.delete("/users/unverified", {
    data: ids,
  });
  return response.data;
};
