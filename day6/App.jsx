import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null); // ✅ track editing note

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/notes", {
        headers: { "ngrok-skip-browser-warning": "true" },
      })
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching notes :", error));
  }, []);

  const sendData = (e) => {
    e.preventDefault();

    if (editId) {
      // ✅ Update existing note
      axios
        .put(
          `http://localhost:8080/api/notes/${editId}`,
          { title, content },
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setData(
            data.map((note) => (note.id === editId ? response.data : note))
          );
          setTitle("");
          setContent("");
          setEditId(null); // reset edit mode
        })
        .catch((error) => console.error("Error updating note:", error));
    } else {
      // ✅ Create new note
      axios
        .post(
          "http://localhost:8080/api/notes",
          { title, content },
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setData([response.data, ...data]);
          setTitle("");
          setContent("");
        })
        .catch((error) => console.error("Error adding note:", error));
    }
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:8080/api/notes/${id}`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      })
      .then(() => setData(data.filter((note) => note.id !== id)))
      .catch((error) => console.error("Error deleting note:", error));
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id); // ✅ put form into edit mode
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        {data.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-gray-200 rounded flex flex-col justify-between"
          >
            <div>
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.content}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => editNote(note)}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendData} className="p-4 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          rows="4"
          required
        />
        <button
          type="submit"
          className={`${
            editId
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white p-2 rounded`}
        >
          {editId ? "Update" : "Submit"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setTitle("");
              setContent("");
            }}
            className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </form>
    </>
  );
}

export default App;
