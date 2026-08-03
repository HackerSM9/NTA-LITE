/**
 * SM9 CBT - Security Guard (Maximum Protection)
 * 
 * This script runs on EVERY protected page.
 * - Checks authentication
 * - Enforces single-device login via active_device_token
 * - Instantly redirects unauthorized users to login
 * - Prevents session sharing / multiple devices
 */

(function() {
  "use strict";

  const LOGIN_PAGE = "index.html";
  const PROTECTED_PAGES = ["dashboard.html", "exam.html", "history.html", "insights.html", "admin.html"];

  // Get current page name
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Skip guard on login page
  if (currentPage === LOGIN_PAGE || currentPage === "") {
    return;
  }

  // Check if this page needs protection
  const isProtected = PROTECTED_PAGES.some(page => currentPage.includes(page));
  if (!isProtected) return;

  async function enforceSecurity() {
    const supabase = window.SM9Supabase?.getClient?.();
    if (!supabase) {
      console.error("Supabase client not available");
      window.location.href = LOGIN_PAGE;
      return;
    }

    try {
      // 1. Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session || !session.user) {
        console.warn("No active session. Redirecting to login...");
        window.location.href = LOGIN_PAGE;
        return;
      }

      const userId = session.user.id;

      // 2. Fetch profile with device token
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, role, active_device_token, full_name")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        console.warn("Profile not found or error. Logging out...");
        await supabase.auth.signOut();
        window.location.href = LOGIN_PAGE;
        return;
      }

      // 3. Get current device token from localStorage (set during login)
      const storedDeviceToken = localStorage.getItem("sm9_device_token");

      if (!storedDeviceToken || storedDeviceToken !== profile.active_device_token) {
        // Device mismatch — someone logged in from another device
        console.warn("Device token mismatch. Possible session sharing detected.");
        
        // Force logout
        await supabase.auth.signOut();
        localStorage.removeItem("sm9_device_token");
        localStorage.removeItem("sm9_user");

        // Show security message
        alert("Your session has been terminated because you (or someone) logged in from another device.\n\nFor security reasons, only one device is allowed at a time.");
        
        window.location.href = LOGIN_PAGE;
        return;
      }

      // 4. Store user info for the app
      window.SM9User = {
        id: profile.id,
        full_name: profile.full_name || "User",
        role: profile.role || "user",
        deviceToken: profile.active_device_token
      };

      // 5. Optional: Update last_login_at (non-blocking)
      supabase.from("profiles")
        .update({ last_login_at: new Date().toISOString() })
        .eq("id", userId)
        .then(() => {});

      console.log("%c[SM9 Security] Auth guard passed. User authenticated.", "color:#22c55e");

    } catch (err) {
      console.error("Security check failed:", err);
      window.location.href = LOGIN_PAGE;
    }
  }

  // Run security check immediately
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enforceSecurity);
  } else {
    enforceSecurity();
  }

  // Also run on visibility change (in case tab is reactivated)
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      enforceSecurity();
    }
  });

})();