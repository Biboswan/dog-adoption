import { apiClient } from './client';

export const login = async (email: string, name: string) => {
    try {
        const response = await apiClient.post('/auth/login', {
            name,
            email
        });

        localStorage.setItem('user',JSON.stringify({name, email}));
        const now = new Date();
        now.setHours(now.getHours() + 1);
        localStorage.setItem('expiryTime',now.toString());

        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

export const logout = async () => {
    try {
        const response = await apiClient.post('/auth/logout');

        localStorage.removeItem('user');
        localStorage.removeItem('expiryTime');

        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

export const checkAuth = async () => {
  try {
      const response = await apiClient.post('/auth/checkAuth');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}