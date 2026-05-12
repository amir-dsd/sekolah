-- Run this in Supabase SQL Editor

-- Admin users table (separate from Supabase Auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nama TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RPC: verify login credentials, returns user info if valid
CREATE OR REPLACE FUNCTION admin_login(input_email TEXT, input_password TEXT)
RETURNS TABLE(id UUID, nama TEXT, role TEXT) AS $$
  SELECT id, nama, role
  FROM admin_users
  WHERE email = input_email
    AND is_active = true
    AND password_hash = extensions.crypt(input_password, password_hash);
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public, extensions;

-- RPC: create a new admin user (password hashed in DB)
CREATE OR REPLACE FUNCTION create_admin_user(
  input_email TEXT,
  input_password TEXT,
  input_nama TEXT,
  input_role TEXT,
  input_created_by UUID
)
RETURNS UUID AS $$
DECLARE new_id UUID;
BEGIN
  INSERT INTO admin_users (email, password_hash, nama, role, created_by)
  VALUES (
    input_email,
    extensions.crypt(input_password, extensions.gen_salt('bf')),
    input_nama,
    input_role,
    input_created_by
  )
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

-- Insert initial super admin (email: superadmin@sman1.sch.id, password: dsd54321)
INSERT INTO admin_users (email, password_hash, nama, role)
VALUES (
  'superadmin@sman1.sch.id',
  extensions.crypt('dsd54321', extensions.gen_salt('bf')),
  'Super Administrator',
  'super_admin'
) ON CONFLICT (email) DO NOTHING;
