export type User = {
    id: string;
    avatar_url?: string;
    created_at: string; // TIMESTAMPTZ stored as ISO string
    updated_at?: string;
    email: string;
    first_name: string;
    last_name: string;
    nickname?: string;
    join_year: number;
    phone_number?: string;
    company?: string;
    job?: string;
    other_hec_asso?: string[]; // Array of strings for associations
  };
  