import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

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
    condition: "",
    price: "",
    category: "",
    userId: "",
    image: null,
  });

  const [imageUrl, setImageUrl] = useState("");

  // GraphQL mutation hook from Apollo Client
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
      // Upload image to Cloudinary
      const formDataForCloudinary = new FormData();
      formDataForCloudinary.append("file", formData.image);
      formDataForCloudinary.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", // Replace with your Cloudinary URL
        {
          method: "POST",
          body: formDataForCloudinary,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      const uploadedImageUrl = cloudinaryData.secure_url;

      // Set imageUrl state after uploading
      setImageUrl(uploadedImageUrl);

      // Prepare book data
      const bookData = {
        name: formData.name,
        author: formData.author,
        condition: formData.condition,
        price: parseFloat(formData.price),
        category: formData.category,
        userId: formData.userId,
        imageUrl: uploadedImageUrl, // Using the URL from Cloudinary
      };

      // Call the GraphQL mutation to add the book
      const { data } = await addBook({
        variables: { input: bookData },
      });

      if (data) {
        alert("Textbook added successfully!");
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
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
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