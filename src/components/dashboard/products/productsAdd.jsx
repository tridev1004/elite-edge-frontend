import { useState } from "react";
import { useDispatch } from "react-redux";

// form validation
import { Form, Formik } from "formik";
import * as Yup from "yup";

// components
import axiosInstance from "../../../apis/config";
import ProductForm from "./productForm";
import "./product.css"
// style
import style from "../../../pages/dashboard/dashboard.module.css";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProductsAdd = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [stockError, setStockError] = useState(false);
  const [showBtnSpinner, SetShowBtnSpinner] = useState(false);
  const [loading, setLoading]=useState(false);
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().min(1, "minimum is 1").required("Price is required"),
    discount: Yup.number()
      .min(0, "minimum is 0")
      .integer("discount is integer")
      .required("Discount is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    colors: Yup.array()
      .min(1, "Please select a color")
      .required("Color is required"),
  });

  const handleAddProduct = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    setLoading(true)
    // check if there're errors
    if (imageError || stockError) return;
    if (selectedImages.length === 0) {
      setImageError("Enter at least one image");
      return;
    }
    SetShowBtnSpinner(true);
    const token = localStorage.getItem("userToken");
    // append data to formData
    const formData = new FormData();
    values.colors.forEach((color) =>
      formData.append("colors[]", JSON.stringify(color))
    );
    selectedImages.forEach((image) => formData.append("images", image));
    Object.keys(values).forEach((key) => {
      if (key === "colors") {
        return;
      }
      formData.append(key, values[key]);
    });
    // post data
    axiosInstance
      .post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      })
      .then((res) => {
        toast.success("Product added successfully");
        resetForm();
        setSelectedImages([]);
        SetShowBtnSpinner(false);
      })
      .catch((error) => {
        toast.error("Error adding product");
        SetShowBtnSpinner(false);
        console.log(error);
      });
      setLoading(false)
  };

  const onImageInput = (e) => {
    let files = Array.from(e.target.files);
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith("image")) {
        setImageError("Invalid file, Images only");
        return;
      }
      setImageError("");
    }
    setSelectedImages([...selectedImages, ...files]);
  };

  return (
    <div className="px-3 px-md-4">
      <h1 className="h4 mb-4 py-3">Add Product</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: 1,
          discount: 0,
          category: "",
          brand: "",
          colors: [],
        }}
        validationSchema={formSchema}
        onSubmit={handleAddProduct}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <ProductForm
              form="add"
              errors={errors}
              touched={touched}
              values={values}
              imageError={imageError}
              onStockError={(value) => setStockError(value)}
              productName={values.name}
              selectedImages={selectedImages}
              onImageInput={onImageInput}
              setFieldValue={setFieldValue}
              setSelectedImages={setSelectedImages}
            />
            {!showBtnSpinner ? (
              
              <button type="submit" className={`btn ${style["dash-btn"]}`}>
               
               {loading? <Loader2 className="loader-spin me-2  "/>: "Add"}
              </button>
            ) : (
              <button
                type="button"
                className={`btn ${style["dash-btn"]} text-center`}
              >
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductsAdd;
