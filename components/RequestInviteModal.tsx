import React, { useState, useRef } from "react";
import { useModal } from "../contexts/ModalContext";
import ReactModal from "react-modal";
import styles from "./RequestInviteModal.module.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface Props {
  errors: ReturnType<typeof useForm>["formState"]["errors"];
  name: string;
}

const FormError: React.FC<Props> = ({ errors, name }) => {
  if (errors[name]) {
    return (
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className={styles.errorMessaging}>{message}</p>
        )}
      />
    );
  }
  return <div style={{ height: 16 }}></div>;
};

const RequestInviteModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { setModalState, isModalOpen } = useModal();

  const closeModal = () => {
    setModalState(false);
  };

  const onSubmit = (data: any) => console.log(data);

  console.log("errors", errors);
  console.log("errors", errors);

  return (
    <ReactModal
      className={styles.modal}
      style={customStyles}
      isOpen={isModalOpen}
      contentLabel="Minimal Modal Example"
      onRequestClose={closeModal}
    >
      <form className={styles.emailNameForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          id="fullName"
          className={`${styles.formInput} ${styles.errorOutline}`}
          style={errors.fullName && { borderColor: "#dc3545" }}
          type="text"
          aria-invalid={errors.fullName ? "true" : "false"}
          placeholder="Full Name"
          {...register("fullName", {
            required: "Please provide a full name.",
          })}
        />
        <FormError errors={errors} name="fullName" />

        <input
          id="email"
          className={styles.formInput}
          style={errors.email && { borderColor: "#dc3545" }}
          type="text"
          placeholder="Email"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "Please provide an email.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please provide a valid email.",
            },
          })}
        />
        <FormError errors={errors} name="email" />

        <input
          id="confirmEmail"
          className={styles.formInput}
          type="text"
          style={errors.confirmEmail && { borderColor: "#dc3545" }}
          placeholder="Confirm Email"
          aria-invalid={errors.confirmEmail ? "true" : "false"}
          {...register("confirmEmail", {
            required: "Please provide a confirmation email.",
            validate: (val: string) => {
              if (watch("email") != val) {
                return "Your email do no match.";
              }
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please provide a valid email.",
            },
          })}
        />
        <FormError errors={errors} name="confirmEmail" />

        <button type="submit" className={styles.submitButton}>
          <span className={styles.submitButtonText}>Send</span>
        </button>
      </form>
    </ReactModal>
  );
};

const customStyles = {
  content: {
    backgroundColor: "#F5F4EF",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default RequestInviteModal;
