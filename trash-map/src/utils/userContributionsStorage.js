/**
 * Manages user-contributed trash bins using localStorage
 * Persists user contributions across browser sessions
 */

const STORAGE_KEY = 'trash_map_user_contributions';

/**
 * Loads all user contributions from localStorage
 * @returns {Array} Array of user-contributed bin objects
 */
export const loadUserContributions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading user contributions:', error);
    return [];
  }
};

/**
 * Saves a new user contribution
 * @param {Object} bin - Bin object with name, latitude, longitude, type
 * @returns {Object} The saved bin with added id and source metadata
 */
export const saveUserContribution = (bin) => {
  try {
    const contributions = loadUserContributions();
    const newBin = {
      id: Date.now(),
      name: bin.name,
      latitude: bin.latitude,
      longitude: bin.longitude,
      type: bin.type,
      source: 'user_contribution',
      createdAt: new Date().toISOString()
    };
    
    contributions.push(newBin);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contributions));
    
    return newBin;
  } catch (error) {
    console.error('Error saving user contribution:', error);
    return null;
  }
};

/**
 * Deletes a user contribution by ID
 * @param {number} id - The bin ID to delete
 * @returns {boolean} True if successful
 */
export const deleteUserContribution = (id) => {
  try {
    const contributions = loadUserContributions();
    const filtered = contributions.filter(bin => bin.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting user contribution:', error);
    return false;
  }
};

/**
 * Clears all user contributions
 * @returns {boolean} True if successful
 */
export const clearAllContributions = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing contributions:', error);
    return false;
  }
};

/**
 * Exports user contributions as CSV format
 * Useful for syncing to backend or creating backups
 * @returns {string} CSV formatted string
 */
export const exportContributionsAsCSV = () => {
  const contributions = loadUserContributions();
  if (contributions.length === 0) return '';
  
  const headers = ['name', 'latitude', 'longitude', 'type', 'source'];
  const rows = contributions.map(bin =>
    [
      `"${bin.name.replace(/"/g, '""')}"`,
      bin.latitude,
      bin.longitude,
      bin.type,
      bin.source
    ].join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
};

/**
 * Gets count of user contributions by type
 * @returns {Object} Object with counts per type
 */
export const getContributionStats = () => {
  const contributions = loadUserContributions();
  const stats = {
    total: contributions.length,
    general: 0,
    plastic: 0,
    organic: 0
  };
  
  contributions.forEach(bin => {
    if (stats.hasOwnProperty(bin.type)) {
      stats[bin.type]++;
    }
  });
  
  return stats;
};
