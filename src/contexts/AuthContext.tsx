import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Tenant, Role } from '../types';

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  login: (email: string, options?: { name?: string; role?: Role; accountType?: 'TENANT_COLLECTOR' | 'CONTRIBUTOR'; phone?: string }) => void;
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

  const login = (
    email: string, 
    options?: { name?: string; role?: Role; accountType?: 'TENANT_COLLECTOR' | 'CONTRIBUTOR'; phone?: string }
  ) => {
    const role: Role = options?.role || (options?.accountType === 'CONTRIBUTOR' ? 'CONTRIBUTOR' : 'TENANT_OWNER');
    const name = options?.name || email.split('@')[0];

    const mockUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name,
      phone: options?.phone,
      role,
      account_type: options?.accountType || (role === 'CONTRIBUTOR' ? 'CONTRIBUTOR' : 'TENANT_COLLECTOR'),
      tenant_id: role === 'CONTRIBUTOR' ? undefined : 'tnt_123',
    };
    
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
