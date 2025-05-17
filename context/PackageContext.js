import React, { createContext, useContext, useState } from 'react';

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);

  const addPackage = (location) => {
    const exists = packages.find(
      (p) => p.latitude === location.latitude && p.longitude === location.longitude
    );

    if (exists) {
      setPackages((prev) =>
        prev.map((p) =>
          p.latitude === location.latitude && p.longitude === location.longitude
            ? { ...p, count: p.count + 1 }
            : p
        )
      );
    } else {
      setPackages((prev) => [...prev, { ...location, count: 1 }]);
    }
  };

  return (
    <PackageContext.Provider value={{ packages, addPackage }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackages = () => useContext(PackageContext);
