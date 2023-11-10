import React, { useState, useEffect } from 'react';
import FormComponent from '../FormComponent';

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
    const savedComments = JSON.parse(localStorage.getItem('comments'));
    if (savedComments) {
      setComments(savedComments);
    }
  }, []);

  const handleFormSubmit = (formData) => {
    let newComments;
    if (editingIndex !== null) {
      newComments = [...comments];
      newComments[editingIndex] = formData;
      setEditingIndex(null);
    } else {
      newComments = [...comments, formData];
    }
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
    setFormData(initialFormState);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const commentToEdit = comments[index];
    setFormData({ ...commentToEdit, file: null }); // rreset file for simplicity
  };

  const handleDelete = (index) => {
    const newComments = comments.filter((_, i) => i !== index);
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
  };

  return (
    <div className="App">
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
  <div key={index}>
    <h2>{comment.title}</h2>
    <p>Category: {comment.category}</p>
    <p>{comment.description}</p>
    {comment.file && <p>File: {comment.file.name}</p>}
    <button onClick={() => handleEdit(index)}>Edit</button>
    <button onClick={() => handleDelete(index)}>Delete</button>
  </div>
))}
      </div>
    </div>
  );
}

export default SuggestionPage;
