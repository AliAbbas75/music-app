import API from "../api";

// Change password
export const changePassword = async (oldPassword, newPassword) => {
  const res = await API.post("/user/change-password", {
    oldPassword,
    newPassword,
  });
  return res.data;
};

// Upload profile image
export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const res = await API.post("/user/upload-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
