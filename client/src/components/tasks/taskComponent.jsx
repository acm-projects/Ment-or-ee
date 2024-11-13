import React, { useState, useEffect } from "react";
import Navbar from "../../common/navbar";
import LeftBox from "../../common/LeftBox";
import TaskStatus from "../../common/TaskStatus";
import ProgressChart from "../../common/ProgressChart";
import { useTasks } from "../../context/TasksContext";
import { useMatches } from "../../context/MatchesContext";
import { TbBrandZoom } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
// import Zoom from "../zoom/Zoom.jsx"; // Import the Zoom component

const TaskComponent = ({ user, ogMentees }) => {
  // const { tasks, assignTask, fetchTasks } = useTasks();
  const { assignTask } = useTasks();

  // const [mentees, setMentees] = useState([
  //   {
  //     name: "Mentee 1",
  //     role: "Mentee",
  //     mentor: user.name,
  //     tasks: [],
  //     resources: [],
  //   },
  //   {
  //     name: "Mentee 2",
  //     role: "Mentee",
  //     mentor: user.name,
  //     tasks: [],
  //     resources: [],
  //   },
  //   {
  //     name: "Mentee 3",
  //     role: "Mentee",
  //     mentor: user.name,
  //     tasks: [],
  //     resources: [],
  //   },
  // ]);

  const [mentees, setMentees] = useState(
    ogMentees.map((item) => ({
      name: item.name,
      role: item.role,
      id: item._id,
      mentor: user.name,
      tasks: [],
      resources: [],
    }))
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchTasksForAllMentees = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const updatedMentees = await Promise.all(
  //         mentees.map(async (mentee) => {
  //           const tasks = await fetchTasks(mentee.id);
  //           console.log(tasks); //testing
  //           return { ...mentee, tasks };
  //         })
  //       );

  //       setMentees(updatedMentees);
  //     } catch (error) {
  //       setError("Failed to fetch tasks for mentees");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTasksForAllMentees();
  // }, [fetchTasks]);

  // console.log("mapped", mentees); //testing

  const [showZoom, setShowZoom] = useState(false);
  const [showZoomForm, setShowZoomForm] = useState(false);
  const [zoomForm, setZoomForm] = useState({});
  const [zooms, setZooms] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState(null);

  // const updateZoomForm = (data) => {
  //   setZoomForm((prevData) => ({ ...prevData, ...data }));
  // };

  // Set initial mentee ID based on sender/receiver role
  // useEffect(() => {
  //   const menteeId =
  //     selectedMentee.role === "Mentee" ? selectedMentee.id : user.id;
  //   const mentorId =
  //     selectedMentee.role === "Mentor" ? selectedMentee.id : user.id;
  //   setZoomForm({ menteeId, mentorId });
  // }, [selectedMentee, user]);

  // const handleZoomSubmit = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/zoom", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(zoomForm),
  //     });
  //     if (response.ok) {
  //       setZooms([...zooms, zoomForm]);
  //       setZoomForm({});
  //       setShowZoomForm(false);
  //     } else {
  //       console.error("Failed to create Zoom meeting.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newResource, setNewResource] = useState({ link: "", description: "" });
  const [editingResourceId, setEditingResourceId] = useState(null);

  useEffect(() => {
    if (user.role !== "Mentee" && mentees.length > 0) {
      setSelectedMentee(mentees[0]);
    }
  }, [user.role, mentees]);

  const handleMenteeSelect = (mentee) => {
    setSelectedMentee(mentee);
    setNewTask({ title: "", description: "", deadline: "" });
    setEditingTaskId(null);
    setNewResource({ link: "", description: "" });
    setEditingResourceId(null);
  };

  const handleAddOrEditTask = () => {
    if (!selectedMentee) {
      alert("Please select a mentee before adding a task.");
      return;
    }

    assignTask({
      creator: user.id,
      receiver: selectedMentee.id,
      deadline: newTask.deadline,
      description: newTask.description,
      title: newTask.title,
    })
      .then((result) => {
        console.log("Task assigned successfully:", result);
      })
      .catch((error) => {
        console.error("Failed to assign task:", error);
      });

    const updatedMentees = mentees.map((mentee) => {
      if (mentee.name === selectedMentee.name) {
        const updatedTasks = editingTaskId
          ? mentee.tasks.map((task) =>
              task.id === editingTaskId ? { ...task, ...newTask } : task
            )
          : [
              ...mentee.tasks,
              { ...newTask, id: Date.now(), status: TaskStatus.NOT_COMPLETE },
            ];
        return { ...mentee, tasks: updatedTasks };
      }
      return mentee;
    });

    setMentees(updatedMentees);
    setNewTask({ title: "", description: "", deadline: "" });
    setEditingTaskId(null);
  };

  const handleEditClick = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
    });
    setEditingTaskId(task.id);
  };

  const handleDeleteClick = (taskId) => {
    const updatedMentees = mentees.map((mentee) => {
      if (mentee.name === selectedMentee.name) {
        const updatedTasks = mentee.tasks.filter((task) => task.id !== taskId);
        return { ...mentee, tasks: updatedTasks };
      }
      return mentee;
    });
    setMentees(updatedMentees);
  };

  const handleStatusChange = (taskId) => {
    const updatedMentees = mentees.map((mentee) => {
      if (mentee.name === selectedMentee.name) {
        const updatedTasks = mentee.tasks.map((task) => {
          if (task.id === taskId) {
            const newStatus =
              task.status === "COMPLETE" ? "NOT_COMPLETE" : "COMPLETE";
            return { ...task, status: newStatus };
          }
          return task;
        });
        return { ...mentee, tasks: updatedTasks };
      }
      return mentee;
    });
    setMentees(updatedMentees);
  };

  // Handle Add/Edit Resource
  const handleAddOrEditResource = () => {
    if (!selectedMentee) {
      alert("Please select a mentee before adding a resource.");
      return;
    }

    const updatedMentees = mentees.map((mentee) => {
      if (mentee.name === selectedMentee.name) {
        const updatedResources = editingResourceId
          ? mentee.resources.map((resource) =>
              resource.id === editingResourceId
                ? { ...resource, ...newResource }
                : resource
            )
          : [...mentee.resources, { ...newResource, id: Date.now() }];
        return { ...mentee, resources: updatedResources };
      }
      return mentee;
    });

    setMentees(updatedMentees);
    setNewResource({ link: "", description: "" });
    setEditingResourceId(null);
  };

  const handleAddResource = (newResource) => {
    const updatedMentees = mentees.map((mentee) => {
      if (mentee.name === selectedMentee.name) {
        return { ...mentee, resources: [...mentee.resources, newResource] };
      }
      return mentee;
    });
    setMentees(updatedMentees);
  };

  const handleEditResourceClick = (resource) => {
    setNewResource({ link: resource.link, description: resource.description });
    setEditingResourceId(resource.id);
  };

  const handleDeleteResourceClick = (resourceId) => {
    const updatedMentees = mentees.map((mentee) => {
      if (mentee.name === selectedMentee.name) {
        const updatedResources = mentee.resources.filter(
          (resource) => resource.id !== resourceId
        );
        return { ...mentee, resources: updatedResources };
      }
      return mentee;
    });
    setMentees(updatedMentees);
  };

  const filteredTasks = selectedMentee ? selectedMentee.tasks : [];

  const currentTasks = filteredTasks.filter(
    (task) => task.status === TaskStatus.NOT_COMPLETE
  );
  const pastTasks = filteredTasks.filter(
    (task) => task.status === TaskStatus.COMPLETE
  );

  const resources = selectedMentee ? selectedMentee.resources : [];

  if (user.role !== "Mentee") {
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className="mt-[80px]">
          <div className="flex flex-row space-x-6 p-12 px-4">
            {/* LeftBox component */}
            <div className="flex-none w-1/4 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
              <LeftBox title="Mentees" name={user.name} role={user.role}>
                <ul className="bg-white rounded-lg shadow-md p-4">
                  {mentees.map((mentee, index) => (
                    <li
                      key={index}
                      className={`py-1 cursor-pointer ${
                        selectedMentee?.name === mentee.name
                          ? "font-bold text-blue-500"
                          : ""
                      }`}
                      onClick={() => handleMenteeSelect(mentee)}
                    >
                      {mentee.name}
                    </li>
                  ))}
                </ul>
              </LeftBox>
            </div>

            {/* Main task section - spans 50% width */}
            <div className="flex-1 bg-gray-100 rounded-lg shadow-lg p-4 w-2/4">
              <h1 className="text-3xl font-semibold text-center mb-4 text-[#000000]">
                Task List
              </h1>

              {/* Zoom Form and Button */}
              <div className="text-center mb-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => setShowZoomForm(!showZoomForm)}
                >
                  <TbBrandZoom className="inline-block mr-2" />
                  {showZoomForm ? "Close Zoom Form" : "Create Zoom Meeting"}
                </button>

                {showZoomForm && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // handleZoomSubmit();
                    }}
                    className="space-y-4 mt-4"
                  >
                    <input
                      type="text"
                      placeholder="Meeting Topic"
                      className="w-full p-2 border rounded"
                      value={zoomForm.topic || ""}
                      onChange={(e) =>
                        setZoomForm({ ...zoomForm, topic: e.target.value })
                      }
                    />
                    <input
                      type="datetime-local"
                      className="w-full p-2 border rounded"
                      value={zoomForm.time || ""}
                      onChange={(e) =>
                        setZoomForm({ ...zoomForm, time: e.target.value })
                      }
                    />
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                      Schedule Meeting
                    </button>
                  </form>
                )}
              </div>

              {/* List Zoom Meetings */}
              {zooms.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-center mb-2">
                    Scheduled Zoom Meetings
                  </h2>
                  <ul className="bg-white rounded-lg shadow-md p-4">
                    {zooms.map((meeting, index) => (
                      <li key={index} className="py-1">
                        {meeting.topic} - {meeting.time}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Task Form and Task Tables */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-center mb-2">
                  {editingTaskId ? "Edit" : "Add New"} Task
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddOrEditTask();
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={newTask.deadline}
                    onChange={(e) =>
                      setNewTask({ ...newTask, deadline: e.target.value })
                    }
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#1F2839] text-white py-2 rounded"
                  >
                    {editingTaskId ? "Update Task" : "Add Task"}
                  </button>
                </form>
              </div>

              {/* Current and Past Task Tables */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-center mb-2">
                  Current Tasks
                </h2>
                <table className="table-auto w-full bg-white rounded-lg shadow-md p-4">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-center">Title</th>
                      <th className="px-4 py-2 text-center">Description</th>
                      <th className="px-4 py-2 text-center">Due Date</th>
                      <th className="px-4 py-2 text-center">Status</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTasks.map((task) => (
                      <tr key={task.id} className="border-b">
                        <td className="px-4 py-2 text-center">{task.title}</td>
                        <td className="px-4 py-2 text-center">
                          {task.description}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {task.deadline}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={task.status === "COMPLETE"}
                            onChange={() => handleStatusChange(task.id)}
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => handleEditClick(task)}
                            className="text-blue-500 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(task.id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Past Tasks */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-center mb-2">
                  Past Tasks
                </h2>
                <table className="table-auto w-full bg-white rounded-lg shadow-md p-4">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-center">Title</th>
                      <th className="px-4 py-2 text-center">Description</th>
                      <th className="px-4 py-2 text-center">Due Date</th>
                      <th className="px-4 py-2 text-center">Status</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastTasks.map((task) => (
                      <tr key={task.id} className="border-b">
                        <td className="px-4 py-2 text-center">{task.title}</td>
                        <td className="px-4 py-2 text-center">
                          {task.description}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {task.deadline}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={task.status === "COMPLETE"}
                            onChange={() => handleStatusChange(task.id)}
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => handleEditClick(task)}
                            className="text-blue-500 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(task.id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Extra Resources Section - spans 25% width */}
            <div className="flex-none w-1/4 bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold text-center mb-4">
                Extra Resources
              </h2>
              <div>
                {resources.length > 0 ? (
                  <ul className="bg-white rounded-lg shadow-md p-4">
                    {resources.map((resource) => (
                      <li
                        key={resource.id}
                        className="flex justify-between items-center mt-2"
                      >
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          {resource.description}
                        </a>
                        <button
                          onClick={() => handleEditResourceClick(resource)}
                          className="ml-2 text-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteResourceClick(resource.id)}
                          className="ml-2 text-red-500"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No resources available</p>
                )}
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={newResource.link}
                  onChange={(e) =>
                    setNewResource({ ...newResource, link: e.target.value })
                  }
                  placeholder="Resource Link"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="text"
                  value={newResource.description}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      description: e.target.value,
                    })
                  }
                  placeholder="Resource Description"
                  className="border p-2 w-full mb-2"
                />
                <button
                  onClick={handleAddOrEditResource}
                  className="bg-[#1F2839] text-white p-2 rounded-lg w-full"
                >
                  {editingResourceId ? "Update Resource" : "Add Resource"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="mt-[80px]">
        <div className="flex flex-row space-x-6 p-12 px-4">
          {/* LeftBox component with ProgressChart */}
          <div className="flex-none w-1/4 bg-gray-100 rounded-lg shadow-lg">
            <LeftBox title="Profile" name={user.name} role={user.role} />
            <ProgressChart currentTasks={currentTasks} pastTasks={pastTasks} />
          </div>

          {/* Main task section */}
          <div className="flex-1 bg-gray-100 rounded-lg shadow-lg p-4">
            <h1 className="text-3xl font-semibold text-center mb-4 text-[#000000]">
              Task List
            </h1>

            {/* Current Tasks */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-center mb-2">
                Current Tasks
              </h2>
              <div className="bg-white rounded-lg shadow-md p-4">
                <table className="table-auto w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-center">Title</th>
                      <th className="px-4 py-2 text-center">Description</th>
                      <th className="px-4 py-2 text-center">Due Date</th>
                      <th className="px-4 py-2 text-center">Status</th>
                      <th className="px-4 py-2 text-center">Mentor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTasks.map((task) => (
                      <tr key={task.id} className="border-b">
                        <td className="px-4 py-2 text-center">{task.title}</td>
                        <td className="px-4 py-2 text-center">
                          {task.description}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {task.deadline}
                        </td>
                        <td className="px-4 py-2 text-center">{task.status}</td>
                        <td className="px-4 py-2 text-center">{task.mentor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Past Tasks */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-center mb-2">
                Past Tasks
              </h2>
              <div className="bg-white rounded-lg shadow-md p-4">
                <table className="table-auto w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-center">Title</th>
                      <th className="px-4 py-2 text-center">Description</th>
                      <th className="px-4 py-2 text-center">Due Date</th>
                      <th className="px-4 py-2 text-center">Status</th>
                      <th className="px-4 py-2 text-center">Mentor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastTasks.map((task) => (
                      <tr key={task.id} className="border-b">
                        <td className="px-4 py-2 text-center">{task.title}</td>
                        <td className="px-4 py-2 text-center">
                          {task.description}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {task.deadline}
                        </td>
                        <td className="px-4 py-2 text-center">{task.status}</td>
                        <td className="px-4 py-2 text-center">{task.mentor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Extra Resources Section */}
          <div className="flex-none w-1/4 bg-gray-100 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-center mb-4">
              Extra Resources
            </h2>
            <ul className="bg-white rounded-lg shadow-md p-4">
              {resources.map((resource, index) => (
                <li key={index} className="py-1">
                  {resource.mentor}:
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline ml-1"
                  >
                    {resource.description}
                  </a>
                </li>
              ))}
            </ul>
            {user.role === "Mentor" && (
              <div className="mt-4">
                <button
                  onClick={() =>
                    handleAddResource({
                      mentor: user.name,
                      description: "New Resource",
                      link: "#",
                    })
                  }
                  className="bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                  Add Resource
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
