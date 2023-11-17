import React, { useState, useEffect } from 'react';
import FormComponent from '../FormComponent';
import axios from 'axios';
import Footer from '../Footer';

/* INITIAL FORM STATE  */

const initialFormState = {
  title: '',
  category: 'Characters',
  description: '',
  url: ''
};

function SuggestionPage() {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('https://marvel-world-backend.onrender.com/comments');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);
      /* Distinguishes between adding a new comment and editing an existing one based on the editingIndex.
    For edits, sends a PUT request; for new comments, a POST request.
    Updates the comments state accordingly and resets the form and editingIndex. */
  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      if (editingIndex !== null) {
        // Edit existing comment .put
        const response = await axios.put(`https://marvel-world-backend.onrender.com/comments/${comments[editingIndex].id}`, formData);
        const updatedComments = [...comments];
        updatedComments[editingIndex] = response.data;
        setComments(updatedComments);
        setEditingIndex(null);
      } else {
        // Add new comment .post
        const response = await axios.post("https://marvel-world-backend.onrender.com/comments", formData);
        setComments([...comments, response.data]);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
    setFormData(initialFormState);
  }
  /* Sets the editingIndex and updates
     the formData with the data of the comment to be edited. */
  const handleEdit = (index) => {
    setEditingIndex(index);
    const commentToEdit = comments[index];
    setFormData({ ...commentToEdit});
  };
  /* Sends a DELETE request to the backend and 
     updates the comments state by filtering out the deleted comment. */
  const handleDelete = async (index) => {
    const commentToDelete = comments[index];
    try {
      await axios.delete(`https://marvel-world-backend.onrender.com/comments/${commentToDelete.id}`);
      const updatedComments = comments.filter((comment, i) => i !== index);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <div className='header-idea'>
         <h2 className='suggestion-page-title'>Have an idea?</h2>
          <p>Help us with new ideas for our Universe</p>
      </div>
      <div className="suggestion-main">
        <div className="form-box">
          <FormComponent
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            isEditing={editingIndex !== null}
          />
        </div>
        <div className="display-container grid-container">
          {comments.map((comment, index) => (
            <div className='comment-box grid-item' key={index}>
              <h2><span style={{ color: "#ECA800" }}>Title: </span> {comment.title}</h2>
              <p><span style={{ color: "#ECA800" }}>Category: </span>{comment.category}</p>
              <p><span style={{ color: "#ECA800" }}>Your Idea: </span>{comment.description}</p>
              <p>
                <span style={{ color: "#ECA800" }}>URL: </span> 
                <a className="comment-link" href={comment.url} target="_blank" rel="noopener noreferrer">{comment.url}</a>
              </p>
              <div className='buttons-box-container'>
              <button className='marvel-button' onClick={() => handleEdit(index)}>Edit</button>
              <button className='marvel-button' onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='footer-div'><Footer/></div> 
    </div>
  );
}

export default SuggestionPage;
