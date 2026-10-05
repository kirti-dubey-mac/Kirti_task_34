
import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userForm, setUserForm] = useState({ name: "", email: "" });
  const [postForm, setPostForm] = useState({ title: "", content: "", user: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [u, p] = await Promise.all([api.get("/users"), api.get("/posts")]);
      setUsers(u.data);
      setPosts(p.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await api.post("/users", userForm);
      setUserForm({ name: "", email: "" });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Could not add user");
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await api.post("/posts", postForm);
      setPostForm({ title: "", content: "", user: "" });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Could not add post");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Users and Posts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Add User</h2>
      <form onSubmit={addUser}>
        <input placeholder="Name" value={userForm.name}
          onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
        <input placeholder="Email" value={userForm.email}
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
        <button type="submit">Add User</button>
      </form>

      <h2>Add Post</h2>
      <form onSubmit={addPost}>
        <input placeholder="Title" value={postForm.title}
          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} />
        <input placeholder="Content" value={postForm.content}
          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} />
        <select value={postForm.user}
          onChange={(e) => setPostForm({ ...postForm, user: e.target.value })}>
          <option value="">Select user</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>
        <button type="submit">Add Post</button>
      </form>

      <h2>Posts</h2>
      {loading && <p>Loading...</p>}
      {!loading && posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <small>By {p.user?.name} ({p.user?.email})</small>
        </div>
      ))}
    </div>
  );
}

export default App;