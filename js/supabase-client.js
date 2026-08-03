/**
 * SM9 CBT - Secure Supabase Client
 * Centralized configuration with security best practices
 */

const SUPABASE_CONFIG = {
  url: "https://jjfdatlxwqpjqxakynvx.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmRhdGx4d3FwanF4YWt5bnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2OTQ4NTksImV4cCI6MjEwMTI3MDg1OX0.fzVvUoQeyGYjaH2gJCRfpRhxLbCCcvSJ8ZCDraaLsC0"
};

// Initialize Supabase client
let supabaseClient = null;

function getSupabase() {
  if (!supabaseClient) {
    if (typeof window.supabase === 'undefined') {
      console.error("Supabase CDN not loaded. Please include the Supabase script.");
      return null;
    }
    supabaseClient = window.supabase.createClient(
      SUPABASE_CONFIG.url,
      SUPABASE_CONFIG.anonKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      }
    );
  }
  return supabaseClient;
}

// Export for other modules
window.SM9Supabase = {
  getClient: getSupabase,
  config: SUPABASE_CONFIG
};