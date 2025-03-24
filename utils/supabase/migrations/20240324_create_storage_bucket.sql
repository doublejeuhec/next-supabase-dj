-- Create a bucket for user content including avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-content', 'user-content', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the user-content bucket

-- Allow users to read any file in the bucket (since it's public)
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'user-content');

-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Allow authenticated users to upload to their folder" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'user-content' AND
  (storage.foldername(name))[1] = 'avatars' AND
  (storage.foldername(name))[2] = auth.uid()::text
);

-- Allow users to update and delete their own files
CREATE POLICY "Allow users to update their own avatars" ON storage.objects
FOR UPDATE TO authenticated USING (
  bucket_id = 'user-content' AND
  (storage.foldername(name))[1] = 'avatars' AND
  (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Allow users to delete their own avatars" ON storage.objects
FOR DELETE TO authenticated USING (
  bucket_id = 'user-content' AND
  (storage.foldername(name))[1] = 'avatars' AND
  (storage.foldername(name))[2] = auth.uid()::text
); 