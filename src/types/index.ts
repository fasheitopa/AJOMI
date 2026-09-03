export type Role = 'SUPER_ADMIN' | 'TENANT_OWNER' | 'MANAGER' | 'COLLECTOR' | 'ACCOUNTANT' | 'CUSTOMER' | 'CONTRIBUTOR';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  phone?: string;
  tenant_id?: string;
  account_type?: 'TENANT_COLLECTOR' | 'CONTRIBUTOR';
}

export interface Tenant {
  id: string;
  name: string;
  owner_id: string;
  currency: string;
  status: 'ACTIVE' | 'TRIAL' | 'SUSPENDED';
}
