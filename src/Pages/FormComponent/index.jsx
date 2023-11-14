import React from 'react';

function FormComponent({ formData, setFormData, onSubmit, isEditing}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <div>
        <h1>Have an idea? Submit here.</h1>
      </div>
      <input 
        type="text"
        name="title" 
        placeholder="* Name / Title" 
        value={formData.title} 
        onChange={handleChange} 
        required
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Characters">Characters</option>
        <option value="Comics">Comics</option>
        <option value="Series">Series</option>
      </select>
      <textarea 
        name="description" 
        placeholder="* Description" 
        value={formData.description} 
        onChange={handleChange}
        required 
      />
      <input 
    type="url" 
    name="url" 
    placeholder="Enter URL" 
    value={formData.url || ''} 
    onChange={handleChange} 
  />
       <button type="submit">{isEditing ? 'Edit' : 'Submit'}</button>
    </form>
  );
}

export default FormComponent;
