import { useState } from "react";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    condition: "",
    price: "",
    subject: "",
    userId: "",
    image: null,
  });

  const [imageUrl, setImageUrl] = useState("");

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

    // Upload image to Cloudinary
    const formDataForCloudinary = new FormData();
    formDataForCloudinary.append("file", formData.image);
    formDataForCloudinary.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

    const cloudinaryResponse = await fetch(
      "CLOUDINARY_URL=cloudinary://684392245889468:3Rs7pO2lxB_a68FnPqHksfHSUZs@dy9arp5xw", // Replace with your Cloudinary URL
      {
        method: "POST",
        body: formDataForCloudinary,
      }
    );
    const cloudinaryData = await cloudinaryResponse.json();
    const imageUrl = cloudinaryData.secure_url;
      
      /*!SECTION
    // Send book data along with image URL to your backend API
    const bookData = {
      name: formData.name,
      author: formData.author,
      condition: formData.condition,
      price: parseFloat(formData.price),
      categoryID: formData.subject,
      userId: formData.userId,
      image: imageUrl,
    };

    const response = await fetch("http://localhost:3001/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (response.ok) {
      alert("Textbook added successfully!");
    } else {
      alert("Failed to add textbook.");
    }
  };
  */

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
        <label>Subject</label>
        <select
          name="subject"
          value={formData.subject}
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
}
export default AddBookForm;