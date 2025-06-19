import { postRequest } from '../request';
import configs from '../../config';

const API_BASE_URL = configs.apiUrl;

// Endpoint URL
export const detectFacesRoute = `${API_BASE_URL}/process_video/`;

// The face detection function to upload video file and get detected faces
export const detectFaces = async (videoFile) => {
  const formData = new FormData();
  formData.append('video', videoFile);

  return await postRequest(detectFacesRoute, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
