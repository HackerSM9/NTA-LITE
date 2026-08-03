/**
 * SM9 CBT - Dashboard Logic
 */

(function() {
  const supabase = window.SM9Supabase.getClient();

  async function loadDashboard() {
    // Load user info
    const user = window.SM9User;
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    // Set user name and role
    document.getElementById("user-name").textContent = user.full_name || "User";
    document.getElementById("welcome-name").textContent = (user.full_name || "User").split(" ")[0];
    document.getElementById("user-role").textContent = user.role;

    // Load stats
    await loadStats(user.id);

    // Load recent tests
    await loadRecentTests(user.id);

    // Logout handler
    document.getElementById("logout-btn").addEventListener("click", async () => {
      await supabase.auth.signOut();
      localStorage.removeItem("sm9_device_token");
      localStorage.removeItem("sm9_user");
      window.location.href = "index.html";
    });
  }

  async function loadStats(userId) {
    try {
      const { data: attempts, error } = await supabase
        .from("attempts")
        .select("score, max_score, ended_at")
        .eq("user_id", userId)
        .order("ended_at", { ascending: false });

      if (error) throw error;

      const total = attempts.length;
      document.getElementById("total-tests").textContent = total;

      if (total > 0) {
        const avg = Math.round(
          attempts.reduce((sum, a) => sum + (a.score / a.max_score) * 100, 0) / total
        );
        document.getElementById("avg-score").textContent = avg + "%";

        const lastDate = new Date(attempts[0].ended_at);
        document.getElementById("last-test").textContent = lastDate.toLocaleDateString();
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }

  async function loadRecentTests(userId) {
    const container = document.getElementById("recent-tests");

    try {
      const { data: attempts, error } = await supabase
        .from("attempts")
        .select("id, score, max_score, ended_at, papers(title)")
        .eq("user_id", userId)
        .order("ended_at", { ascending: false })
        .limit(4);

      if (error) throw error;

      if (!attempts || attempts.length === 0) {
        container.innerHTML = `<div class="empty-state">No tests taken yet. Start your first test!</div>`;
        return;
      }

      container.innerHTML = attempts.map(attempt => {
        const percentage = Math.round((attempt.score / attempt.max_score) * 100);
        const date = new Date(attempt.ended_at).toLocaleDateString();
        const paperTitle = attempt.papers?.title || "Unknown Paper";

        return `
          <a href="history.html" class="recent-item">
            <div class="recent-info">
              <h4>${paperTitle}</h4>
              <div class="meta">${date}</div>
            </div>
            <div class="recent-score">${attempt.score}/${attempt.max_score} (${percentage}%)</div>
          </a>
        `;
      }).join("");

    } catch (err) {
      console.error("Failed to load recent tests:", err);
      container.innerHTML = `<div class="empty-state">Unable to load recent tests.</div>`;
    }
  }

  // Initialize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadDashboard);
  } else {
    loadDashboard();
  }
})();