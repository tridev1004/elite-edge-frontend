import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

//components
import axiosInstance from "../../../apis/config";
import CategoryForm from "./categoryForm";
import { toast } from "sonner";


const AddCategory = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const[loading,setLoading ]=useState(false)

  const handleSubmit = (values) => {
    setLoading(true)
    if (!values.image) {
      setErrorMessage("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);

    axiosInstance
      .post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Category added successfully!");
          setTimeout(() => {
            navigate("/dashboard/categories");
          }, 4000);
        } else {
          toast.error("Failed to add category, please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Unable to add category, please try again.");
      });
      setLoading(false)
  };

  return (
    <div className="px-4 py-4">
      <h1 className={`py-4 fs-4`}>Add New Category</h1>
      {errorMessage ? (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {" "}
          <FontAwesomeIcon icon={faTimes} /> {errorMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setErrorMessage(null)}
          ></button>
        </div>
      ) : null}

      <div>
        <CategoryForm
        loading={loading}
          initialValues={{
            name: "",
            image: null,
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddCategory;
