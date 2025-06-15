import axios from 'axios';
import { UrlType } from '../types';

const API_BASE_URL = 'https://urlshortener-140e.onrender.com/api';

export const shortenUrl = async (originalUrl: string, customCode?: string): Promise<UrlType> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shorten`, {
      originalUrl,
      customCode: customCode || undefined,
    });
    
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to shorten URL. Please try again.');
  }
};

export const getRecentUrls = async (): Promise<UrlType[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/urls`);
    return response.data;
  } catch (error) {
    console.error('Error fetching URLs:', error);
    throw new Error('Failed to fetch recent URLs');
  }
};

export const getUrlAnalytics = async (shortCode: string): Promise<UrlType> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analytics/${shortCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching URL analytics:', error);
    throw new Error('Failed to fetch URL analytics');
  }
};
