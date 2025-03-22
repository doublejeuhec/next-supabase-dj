-- Create a table for public profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  nickname TEXT,
  avatar_url TEXT,
  join_year INTEGER NOT NULL,
  phone_number TEXT,
  company TEXT,
  job TEXT,
  other_hec_asso TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ
);

-- Create Row Level Security policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to profiles
CREATE POLICY "Allow public read access" 
  ON profiles 
  FOR SELECT 
  USING (true);

-- Allow authenticated users to update their own profile
CREATE POLICY "Allow authenticated users to update their own profile" 
  ON profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Allow authenticated users to insert their own profile
CREATE POLICY "Allow authenticated users to insert their own profile" 
  ON profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Allow service role to insert new profiles (for signup process)
CREATE POLICY "Allow service role to insert new profiles"
  ON profiles
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles (email); 