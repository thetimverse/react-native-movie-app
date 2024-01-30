import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const updateFavoritesInStorage = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error updating favorites in storage:', error);
    }
  };

  const addFavorite = async (id) => {
    const updatedFavorites = [...favorites, id];
    await updateFavoritesInStorage(updatedFavorites);
    setFavorites(updatedFavorites);
  };

  const removeFavorite = async (faveId) => {
    const updatedFavorites = favorites.filter((id) => id !== faveId);
    await updateFavoritesInStorage(updatedFavorites);
    setFavorites(updatedFavorites);
    
  };

  const isFavorite = (id) => favorites.includes(id);

  const loadFavoritesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from storage:', error);
    }
  };
  useEffect(() => {
    loadFavoritesFromStorage();
  }, []); 

  return { favorites, addFavorite, removeFavorite, isFavorite };
};