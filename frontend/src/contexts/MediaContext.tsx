import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { 
  MediaItem, 
  MediaContextType, 
  MediaStats, 
  MediaFilters, 
  CreateMediaItemData, 
  UpdateMediaItemData 
} from '../types';
import { mediaAPI } from '../services/api';
import { useAuth } from './AuthContext';

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};

interface MediaProviderProps {
  children: ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<MediaStats | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchMediaItems = async (filters?: MediaFilters): Promise<void> => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await mediaAPI.getMediaItems(filters);
      
      if (response.success) {
        setMediaItems(response.data);
      } else {
        setError('Failed to fetch media items');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch media items';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createMediaItem = async (data: CreateMediaItemData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await mediaAPI.createMediaItem(data);
      
      if (response.success && response.data) {
        setMediaItems(prev => [response.data!, ...prev]);
        toast.success('Media item added successfully!');
        await fetchStats(); // Update stats
      } else {
        throw new Error(response.message || 'Failed to create media item');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create media item';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateMediaItem = async (id: string, data: UpdateMediaItemData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await mediaAPI.updateMediaItem(id, data);
      
      if (response.success && response.data) {
        setMediaItems(prev => 
          prev.map(item => item._id === id ? response.data! : item)
        );
        toast.success('Media item updated successfully!');
        await fetchStats(); // Update stats
      } else {
        throw new Error(response.message || 'Failed to update media item');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update media item';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteMediaItem = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await mediaAPI.deleteMediaItem(id);
      
      if (response.success) {
        setMediaItems(prev => prev.filter(item => item._id !== id));
        toast.success('Media item deleted successfully!');
        await fetchStats(); // Update stats
      } else {
        throw new Error(response.message || 'Failed to delete media item');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete media item';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleWatchStatus = async (id: string): Promise<void> => {
    try {
      setError(null);
      const response = await mediaAPI.toggleWatchStatus(id);
      
      if (response.success && response.data) {
        setMediaItems(prev => 
          prev.map(item => item._id === id ? response.data! : item)
        );
        toast.success('Watch status updated!');
        await fetchStats(); // Update stats
      } else {
        throw new Error(response.message || 'Failed to update watch status');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update watch status';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    }
  };

  const fetchStats = async (): Promise<void> => {
    if (!isAuthenticated) return;
    
    try {
      const response = await mediaAPI.getStats();
      
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch stats:', error);
    }
  };

  // Fetch initial data when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMediaItems();
      fetchStats();
    } else {
      setMediaItems([]);
      setStats(null);
    }
  }, [isAuthenticated]);

  const value: MediaContextType = {
    mediaItems,
    loading,
    error,
    stats,
    fetchMediaItems,
    createMediaItem,
    updateMediaItem,
    deleteMediaItem,
    toggleWatchStatus,
    fetchStats,
  };

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  );
};