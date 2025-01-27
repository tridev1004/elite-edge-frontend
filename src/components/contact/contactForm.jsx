import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import emailjs from "emailjs-com";

//formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//component

//style
import style from "../../pages/contact/contact.module.css";
import { toast } from "sonner";

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
     const formRef = useRef(null);
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        email: "",
        message: "",
    };

    const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    message: Yup.string().required("Message is required"),
    });

    const sendEmail = async (values, { resetForm }) => {
    const templateParams = {
        from_email: values.email,
        from_name: values.name,
        message: values.message,
    };
    setIsSubmitting(true);
    try {
      // Send email using EmailJS API
        await emailjs.send(
        "service_besq8bj",
        "template_0enywyn",
        templateParams,
        "vzmsbh2u2QyE9m6Ee"
        );
    
        toast.success("Thanks for contacting us. We'll get back to you as soon as possible.")
        
    } 
    catch (error) {
        
        toast.error("Failed to send Message! Please try again later!");
    }
    setIsSubmitting(false);
    resetForm();
    };
    const handleFormSubmit = async (values, { resetForm }) => {
    await sendEmail(values, { resetForm });
    };
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        >
        {({ errors, touched }) => (
        <Form ref={formRef}>
            <div className="mb-3 pt-3">
            <Field
                type="text"
                name="name"
                className={`form-control bg-light rounded-0 border-light ${
                    touched.name && errors.name ? "is-invalid" : ""
                } ${style["placeholder-style"]}`}
                placeholder="Name"
                autoComplete="off"
            />
            <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
            />
            </div>
            <div className="mb-3">
            <Field
                type="email"
                name="email"
                className={`form-control rounded-0 bg-light border-light ${
                    touched.email && errors.email ? "is-invalid" : ""
                } ${style["placeholder-style"]}`}
                placeholder="Email"
                autoComplete="off"
            />
            <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
            />
            </div>
            <div className="mb-3">
            <Field
                as="textarea"
                name="message"
                className={`form-control bg-light rounded-0 border-light ${
                    touched.message && errors.message ? "is-invalid" : ""
                }`}
                rows="4"
                placeholder="Message"
                autoComplete="off"
            />
            <ErrorMessage
                name="message"
                component="div"
                className="invalid-feedback"
            />
            </div>
            <button
            type="submit"
            className="btn btn-bg-dark p-2 submit-btn rounded-0 border-0 text-light d-block w-100"
            disabled={isSubmitting}
            >
            {isSubmitting ? (
                <>
                <span className="spinner-border spinner-border-sm me-2" />
                Sending...
                </>
            ) : (
                "Send Message"
            )}
            </button>
        </Form>
        )}
    </Formik>
    );
};

export default ContactForm;
