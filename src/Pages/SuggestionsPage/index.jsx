import React, { useState, useEffect } from 'react';
import FormComponent from '../FormComponent';
import axios from 'axios';

const initialFormState = {
  title: '',
  category: 'Characters',
  description: '',
  url: '' // Replaced file with url
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
      if (editingIndex) {
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
    setFormData({ ...commentToEdit}); // Assuming file handling is separate
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
        <div className="">
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
              <p>Your Idea:{comment.description}</p>
              {comment.url && <p>URL: <a href={comment.url} target="_blank">{comment.url}</a></p>}
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
