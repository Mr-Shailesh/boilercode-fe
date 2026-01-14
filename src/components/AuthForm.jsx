"use client";

import { useState } from "react";
import "./AuthForm.css";

export const AuthForm = ({
  title,
  fields,
  buttonLabel,
  onSubmit,
  loading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    try {
      await onSubmit(formData);
    } catch (err) {
      setFormError(err.response?.data?.message || err.message);
    }
  };

  const displayError = formError || error;

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{title}</h2>

        {displayError && <div className="error-message">{displayError}</div>}

        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required !== false}
              disabled={loading}
            />
          </div>
        ))}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : buttonLabel}
        </button>
      </form>
    </div>
  );
};
