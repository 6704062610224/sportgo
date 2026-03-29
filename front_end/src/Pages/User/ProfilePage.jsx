import { useState } from "react";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";

export default function ProfilePage({ user, setUser }) {
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const username = newUsername.trim();
    const oldPw = oldPassword.trim();
    const password = newPassword.trim();
    const confirm = confirmPassword.trim();

    if (!username) {
      toast.error("กรุณากรอก username");
      return false;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      toast.error("Username ใช้ได้เฉพาะ a-z, 0-9, _ และต้องมี 3-20 ตัวอักษร");
      return false;
    }

    if (oldPw || password || confirm) {
      if (!oldPw || !password || !confirm) {
        toast.error("กรุณากรอกรหัสผ่านให้ครบทุกช่อง");
        return false;
      }

      if (password.length < 6) {
        toast.error("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร");
        return false;
      }

      if (password !== confirm) {
        toast.error("รหัสผ่านใหม่ไม่ตรงกัน");
        return false;
      }

      if (password === oldPw) {
        toast.error("รหัสผ่านใหม่ต้องไม่เหมือนรหัสผ่านเดิม");
        return false;
      }
    }

    return true;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const username = newUsername.trim();
      const oldPw = oldPassword.trim();
      const password = newPassword.trim();

      if (password) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: oldPw,
        });

        if (signInError) {
          toast.error("รหัสผ่านเดิมไม่ถูกต้อง");
          setOldPassword("");
          return;
        }

        const { error: authError } = await supabase.auth.updateUser({
          password,
        });

        if (authError) throw authError;
      }

      if (username !== user.username) {
        const { data, error } = await supabase
          .from("users")
          .update({ username })
          .eq("id", user.id)
          .select();

        if (error) throw error;

        if (!data || data.length === 0) {
          throw new Error("ไม่มีสิทธิ์แก้ไข (RLS blocked)");
        }

        setUser({ ...user, username });
      }

      toast.success("อัปเดตโปรไฟล์สำเร็จ!");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleUpdateProfile}
        className="bg-white p-6 rounded-xl shadow-lg w-[350px]"
      >
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {/* Username */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="username (3-20 ตัว)"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
        />

        {/* Divider */}
        <p className="text-sm text-gray-500 mb-3">
          เปลี่ยนรหัสผ่าน (ถ้าไม่ต้องการเปลี่ยนให้เว้นว่าง)
        </p>

        {/* Old Password */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          รหัสผ่านเดิม
        </label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
        />

        {/* New Password */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          รหัสผ่านใหม่
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password (อย่างน้อย 6 ตัว)"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
        />

        {/* Confirm Password */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ยืนยันรหัสผ่านใหม่
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full mb-5 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "กำลังบันทึก..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}