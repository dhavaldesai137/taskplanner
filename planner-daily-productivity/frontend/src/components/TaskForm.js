import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { predictPriority, loadModel } from '../ai/taskAI';

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Other');
  const [reminder, setReminder] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTitle(transcript); // title
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('Speech Recognition API not supported in this browser.');
    }
  }, []);

  const startVoiceInput = () => {
    if (recognition) {
      recognition.start();
    } else {
      console.error('Speech recognition is not initialized.');
    }
  };

  const handlePredictPriority = async () => {
    await loadModel();
    const predictedPriority = await predictPriority([title.length, description.length]);
    setPriority(predictedPriority);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      category,
      reminder: reminder ? new Date(reminder).toISOString() : null,
    };
    console.log('Submitting task:', taskData); // Debugging log

    try {
      const response = await axios.post('http://localhost:4000/api/tasks', taskData);
      console.log('Task added:', response.data); // Debugging log
      fetchTasks();
      setTitle('');
      setDescription('');
      setPriority('Low');
      setDueDate('');
      setCategory('Other');
      setReminder('');
    } catch (error) {
      console.error('Error adding task:', error.response ? error.response.data : error.message); // Log error details
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="input-field"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea-field"
      />


      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      {/* <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="datetime-local"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      /> */}


      <button type="button" onClick={handlePredictPriority}>Suggest Priority</button>
      <button type="submit">Add Task</button>
      <button type="button" onClick={startVoiceInput}>Add Task by Voice</button>
    </form>
  );
};

export default TaskForm;
