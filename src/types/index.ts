export type Role = 'SUPER_ADMIN' | 'TENANT_OWNER' | 'MANAGER' | 'COLLECTOR' | 'ACCOUNTANT' | 'CUSTOMER';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  tenant_id?: string;
}

export interface Tenant {
  id: string;
  name: string;
  owner_id: string;
  currency: string;
  status: 'ACTIVE' | 'TRIAL' | 'SUSPENDED';
}
