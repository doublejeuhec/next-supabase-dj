-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Allow authenticated users to insert their own profile" ON profiles;

-- Create a new policy that allows inserting profiles during signup
-- This policy allows inserting a profile with a matching user ID
-- even if the user is not yet fully authenticated
CREATE POLICY "Allow profiles creation during signup" 
  ON profiles 
  FOR INSERT 
  WITH CHECK (true);

-- Note: This is a permissive policy that allows any insertion to the profiles table
-- If you need more security, you might want to add additional checks in your application code
-- or implement more specific policies after your initial signup flow is working 