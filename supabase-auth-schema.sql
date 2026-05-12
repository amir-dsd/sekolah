-- Run this in Supabase SQL Editor

-- 1. Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nama_lengkap TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'siswa' CHECK (role IN ('siswa', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, nama_lengkap, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nama_lengkap', ''),
    'siswa'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 3. Add user_id to pendaftaran table
ALTER TABLE pendaftaran ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
