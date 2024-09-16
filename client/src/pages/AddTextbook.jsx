import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
/*
import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const App = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dy9arp5xw' } });
  
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
        .image('cld-sample-5')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  return (<AdvancedImage cldImg={img}/>);
};
*/

// Define the GraphQL mutation for adding a book
const ADD_BOOK_MUTATION = gql`
  mutation AddBook($input: AddBookInput!) {
    addBook(input: $input) {
      id
      name
      author
      condition
      price
      category
      userId
      imageUrl
    }
  }
`;

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    condition: "new", // Default value
    price: "",
    category: "science", // Default value
    userId: "",
    image: null,
  });

  const [addBook] = useMutation(ADD_BOOK_MUTATION);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if an image file is selected
      if (!formData.image) {
        alert("Please select an image file.");
        return;
      }
  
      // Create a FormData object to upload the image
      const imageData = new FormData();
      imageData.append("file", formData.image);
      imageData.append("upload_preset", "your_upload_preset"); // Your Cloudinary upload preset
  
      // Upload image to Cloudinary
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: imageData,
        }
      );
      const cloudinaryData = await cloudinaryResponse.json();
  
      // Prepare book data with the uploaded image URL
      const bookData = {
        name: formData.name,
        author: formData.author,
        condition: formData.condition,
        price: parseFloat(formData.price),
        category: formData.category,
        userId: formData.userId,
        imageUrl: cloudinaryData.secure_url, // Image URL from Cloudinary
      };
  
      // Call the GraphQL mutation to add the book
      const { data } = await addBook({
        variables: { input: bookData },
      });
  
      if (data) {
        alert("Book added successfully!");
        // Optionally, clear the form
        setFormData({
          name: "",
          author: "",
          condition: "new",
          price: "",
          category: "science",
          userId: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Error uploading image or adding book:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Condition:</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
        > 
          <option value="new">New</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="poor">Poor</option>
        </select>
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="$10"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="science">Science</option>
          <option value="math">Math</option>
          <option value="literature">Literature</option>
          <option value="social-studies">Social Studies</option>
          <option value="language">Language</option>
        </select>
      </div>
      <div>
        <label>Book Image:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
