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
    <div>
    <form className='form-container' onSubmit={handleSubmit}>
      <div>
        <h2>Please submit here :</h2>
      </div>
      <input 
        type="text"
        name="title" 
        placeholder="* Name / Title" 
        value={formData.title} 
        onChange={handleChange} 
        required
      />
      <select name="category" value={formData.category} onChange={handleChange} className='select-button'>
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
    </div>
  );
}

export default FormComponent;
