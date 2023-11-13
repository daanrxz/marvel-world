import React, { useState, useEffect } from 'react';
import FormComponent from '../FormComponent';
import axios from 'axios';

const initialFormState = {
  title: '',
  category: 'Characters',
  description: '',
  file: null
};

function SuggestionPage() {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:5179/comments');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      if (editingIndex !== null) {
        // Edit existing comment
        const response = await axios.put(`http://localhost:5179/comments/${comments[editingIndex].id}`, formData);
        const updatedComments = [...comments];
        updatedComments[editingIndex] = response.data;
        setComments(updatedComments);
        setEditingIndex(null);
      } else {
        // Add new comment
        const response = await axios.post("http://localhost:5179/comments", formData);
        setComments([...comments, response.data]);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
    setFormData(initialFormState);
  }

  const handleEdit = (index) => {
    setEditingIndex(index);
    const commentToEdit = comments[index];
    setFormData({ ...commentToEdit, file: null }); // Assuming file handling is separate
  };

  const handleDelete = async (index) => {
    const commentToDelete = comments[index];
    try {
      await axios.delete(`http://localhost:5179/comments/${commentToDelete.id}`);
      const updatedComments = comments.filter((_, i) => i !== index);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <div className="suggestion-main">
        <div className="form-container">
          <FormComponent
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            isEditing={editingIndex !== null}
          />
        </div>
        <div className="display-container">
          {comments.map((comment, index) => (
            <div className='comment-box' key={index}>
              
              <h2>Title: {comment.title}</h2>
              <p>Category: {comment.category}</p>
              <p>{comment.description}</p>
              {comment.file && <p>File: {comment.file.name}</p>}
              <button className='buttons-box' onClick={() => handleEdit(index)}>Edit</button>
              <button className='buttons-box' onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestionPage;
