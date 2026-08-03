/**
 * SM9 CBT - Admin Panel Logic
 */

(function() {
  const supabase = window.SM9Supabase.getClient();
  const user = window.SM9User;

  if (!user || user.role !== "admin") {
    alert("Access denied. Admin only.");
    window.location.href = "index.html";
    return;
  }

  // Set admin name
  document.getElementById("admin-name").textContent = user.full_name || "Admin";

  // Logout
  document.getElementById("logout-btn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("sm9_device_token");
    localStorage.removeItem("sm9_user");
    window.location.href = "index.html";
  });

  // Create User Form
  document.getElementById("create-user-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("new-email").value.trim();
    const fullName = document.getElementById("new-name").value.trim();
    const password = document.getElementById("new-password").value;
    const msgEl = document.getElementById("user-msg");

    msgEl.hidden = true;

    try {
      // Create user via Supabase Auth (Admin must have service role for this in production)
      // For now, we use the anon key and let the user sign up later
      // Better approach: Use Edge Function in future

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (error) throw error;

      // Create profile entry
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          full_name: fullName,
          role: "user",
          active_device_token: crypto.randomUUID()
        });

      if (profileError) throw profileError;

      msgEl.textContent = `User created successfully! Email: ${email}`;
      msgEl.className = "msg success";
      msgEl.hidden = false;

      document.getElementById("create-user-form").reset();
      loadUsers();

    } catch (err) {
      msgEl.textContent = "Error: " + err.message;
      msgEl.className = "msg error";
      msgEl.hidden = false;
    }
  });

  // Upload Paper Form
  document.getElementById("upload-paper-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("paper-title").value.trim();
    const examId = document.getElementById("exam-id").value.trim();
    const duration = parseInt(document.getElementById("duration").value);
    const jsonText = document.getElementById("paper-json").value.trim();
    const msgEl = document.getElementById("paper-msg");

    msgEl.hidden = true;

    try {
      let jsonData;
      try {
        jsonData = JSON.parse(jsonText);
      } catch {
        throw new Error("Invalid JSON format");
      }

      const { error } = await supabase.from("papers").insert({
        title,
        exam_id: examId,
        duration_minutes: duration,
        json_data: jsonData,
        created_by: user.id
      });

      if (error) throw error;

      msgEl.textContent = "Paper uploaded successfully!";
      msgEl.className = "msg success";
      msgEl.hidden = false;

      document.getElementById("upload-paper-form").reset();

    } catch (err) {
      msgEl.textContent = "Error: " + err.message;
      msgEl.className = "msg error";
      msgEl.hidden = false;
    }
  });

  // Load Users
  async function loadUsers() {
    const container = document.getElementById("users-list");

    try {
      const { data: users, error } = await supabase
        .from("profiles")
        .select("id, full_name, role, last_login_at")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (!users || users.length === 0) {
        container.innerHTML = "<p>No users found.</p>";
        return;
      }

      let html = `
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
      `;

      users.forEach(u => {
        const lastLogin = u.last_login_at 
          ? new Date(u.last_login_at).toLocaleDateString() 
          : "Never";

        html += `
          <tr>
            <td>${u.full_name || "—"}</td>
            <td><span class="role-badge">${u.role}</span></td>
            <td>${lastLogin}</td>
            <td>
              <button class="btn btn-sm btn-ghost" onclick="resetDevice('${u.id}')">Reset Device</button>
            </td>
          </tr>
        `;
      });

      html += `</tbody></table>`;
      container.innerHTML = html;

    } catch (err) {
      container.innerHTML = `<p style="color:#ef4444">Failed to load users.</p>`;
    }
  }

  // Global function for resetting device token
  window.resetDevice = async function(userId) {
    if (!confirm("Reset device token for this user? They will be logged out from all devices.")) return;

    try {
      const newToken = crypto.randomUUID();
      await supabase.from("profiles").update({
        active_device_token: newToken
      }).eq("id", userId);

      alert("Device token reset successfully.");
      loadUsers();
    } catch (err) {
      alert("Failed to reset device: " + err.message);
    }
  };

  // Initial load
  loadUsers();
})();