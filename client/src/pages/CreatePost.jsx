import { useState, useEffect } from "react";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  //  Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        setCategories(res.data.data); //  must access the nested data
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !content || !category) {
      alert("Please fill in all fields");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);
  
    try {
      const res = await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("✅ Post created:", res.data);
      alert("Post created successfully!");
    } catch (err) {
      console.error("❌ Post creation error:", err.response?.data || err.message);
      alert("Failed to create post. Check console for details.");
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        ✍️ Create New Post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-32 dark:bg-gray-800 dark:text-white"
          required
        />
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border rounded px-2 py-1 w-full"
>
  <option value="">Select category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>


        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
          className="w-full p-2 border rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-56 object-cover rounded-lg"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          🚀 Publish Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;



// import { useState, useEffect } from "react";
// import axios from "axios";

// function CreatePost() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // ✅ Fetch categories
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/categories")
//       .then((res) => {
//         // your backend returns { success: true, categories: [...] }
//         setCategories(res.data.categories || []);
//       })
//       .catch((err) => {
//         console.error("Error loading categories:", err);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !content || !category) {
//       alert("Please fill all fields!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     formData.append("category", category);
//     if (image) formData.append("image", image);

//     try {
//       await axios.post("http://localhost:5000/api/posts", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("✅ Post created successfully!");
//       setTitle("");
//       setContent("");
//       setCategory("");
//       setImage(null);
//       setPreview(null);
//     } catch (err) {
//       console.error("Error creating post:", err);
//       alert("Failed to create post");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
//         ✍️ Create New Post
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
//           required
//         />

//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full p-2 border rounded h-32 dark:bg-gray-800 dark:text-white"
//           required
//         />

//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
//           required
//         >
//           <option value="">Select Category</option>
//           {categories.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="file"
//           onChange={(e) => {
//             setImage(e.target.files[0]);
//             setPreview(URL.createObjectURL(e.target.files[0]));
//           }}
//           className="w-full p-2 border rounded"
//         />

//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-full h-56 object-cover rounded-lg"
//           />
//         )}

//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           🚀 Publish Post
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreatePost;
