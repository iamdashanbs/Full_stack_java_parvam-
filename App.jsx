import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [data, setData] = useState([]);

  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
  ];

  useEffect(() => {
    // Example data if API is not ready
    const localData = [
      { id: 1, title: "Meeting Notes", content: "Project milestones", createdAt: "2025-09-26T10:01:11.54676" },
      { id: 2, title: "Workout Plan", content: "Push-ups 50, Squats 50", createdAt: "2025-09-26T10:06:49.262757" },
      { id: 3, title: "Study Schedule", content: "Math 2 hrs, Physics 1.5 hrs", createdAt: "2025-09-26T10:15:00.654321" },
    ];
    setData(localData);

    // Uncomment below to fetch from API
    /*
    axios.get("http://10.201.14.129:8080/api/notes")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
    */
  }, []);

  // Handle drag end
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  };

  return (
    <div className="bg-yellow-50 flex flex-col w-full min-h-screen items-center justify-center p-6">
      <h1 className="font-bold text-4xl mb-8 text-center">My Notes</h1>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {data.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${colors[index % colors.length]} p-6 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer`}
                    >
                      <h2 className="font-semibold text-2xl mb-2">{note.title}</h2>
                      <p className="truncate">{note.content}</p>
                      <small className="text-gray-700 mt-2 block">
                        {new Date(note.createdAt).toLocaleString()}
                      </small>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
