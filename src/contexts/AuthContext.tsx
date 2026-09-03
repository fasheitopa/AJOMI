import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Tenant } from '../types';

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  login: (email: string) => void;
  logout: () => void;
  updateTenant: (tenant: Partial<Tenant>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);

  // Load from local storage for preview persistence
  useEffect(() => {
    const storedUser = localStorage.getItem('ajomi_user');
    const storedTenant = localStorage.getItem('ajomi_tenant');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedTenant) setTenant(JSON.parse(storedTenant));
  }, []);

  const login = (email: string) => {
    // Mock login that creates a tenant owner
    const mockUser: User = {
      id: 'usr_123',
      email,
      name: email.split('@')[0],
      role: 'TENANT_OWNER',
      tenant_id: 'tnt_123',
    };
    
    // Only set tenant if they have completed onboarding (simulated by checking if tenant exists)
    // For demo, we'll pretend they don't have a tenant yet so they go to onboarding,
    // UNLESS they already have one in local storage.
    const storedTenant = localStorage.getItem('ajomi_tenant');
    
    setUser(mockUser);
    localStorage.setItem('ajomi_user', JSON.stringify(mockUser));
    
    if (storedTenant) {
      setTenant(JSON.parse(storedTenant));
    }
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
    localStorage.removeItem('ajomi_user');
    localStorage.removeItem('ajomi_tenant');
  };

  const updateTenant = (tenantData: Partial<Tenant>) => {
    const updatedTenant = { 
      id: 'tnt_123', 
      name: tenantData.name || 'My Business',
      owner_id: user?.id || 'usr_123',
      currency: tenantData.currency || 'NGN',
      status: 'ACTIVE' as const,
      ...tenantData 
    };
    setTenant(updatedTenant);
    localStorage.setItem('ajomi_tenant', JSON.stringify(updatedTenant));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      tenant, 
      login, 
      logout, 
      updateTenant,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
