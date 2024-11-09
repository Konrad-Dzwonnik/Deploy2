import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddAvailabilityForm = () => {
  const { id } = useParams(); 
  console.log("Sitter ID:", id);

  const [availability, setAvailability] = useState([
    { day: '', startTime: '', endTime: '' }
  ]);

  const handleChange = (index, e) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][e.target.name] = e.target.value;
    setAvailability(updatedAvailability);
  };

  const addAvailabilitySlot = () => {
    setAvailability([...availability, { day: '', startTime: '', endTime: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("/api/sitter/:sitterId/add-availability", { availability });
        alert('Availability added successfully');
    } catch (err) {
        console.error('Error adding availability:', err);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      {availability.map((slot, index) => (
        <div key={index}>
          <label>
            Day of the Week:
            <select
              name="day"
              value={slot.day}
              onChange={(e) => handleChange(index, e)}
              required
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>
          <label>
            Start Time:
            <input
              type="time"
              name="startTime"
              value={slot.startTime}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              name="endTime"
              value={slot.endTime}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={addAvailabilitySlot}>
        Add Another Time Slot
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddAvailabilityForm;