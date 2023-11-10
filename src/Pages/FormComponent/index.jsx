import React from 'react';

function FormComponent({ formData, setFormData, onSubmit, isEditing}) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        placeholder="Title" 
        value={formData.title} 
        onChange={handleChange} 
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Characters">Characters</option>
        <option value="Comics">Comics</option>
        <option value="Series">Series</option>
      </select>
      <textarea 
        name="description" 
        placeholder="Description" 
        value={formData.description} 
        onChange={handleChange} 
      />
      <input 
        type="file" 
        name="file" 
        onChange={handleChange} 
      />
       <button type="submit">{isEditing ? 'Edit' : 'Submit'}</button>
    </form>
  );
}

export default FormComponent;
