import React, { useCallback, useState } from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";

import { useModal } from "../contexts/ModalContext";
import styles from "./RequestInviteModal.module.css";
import { useRequestInvite } from "../hooks/useRequestInvite";
import { Waveform } from "@uiball/loaders";
import { ApiErrorMessage } from "../hooks/requestInviteApi";
import FormError from "./FormError";
import RequestInviteCompletion from "./RequestInviteCompletion";

const RequestInviteModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [formCompleted, setFormCompleted] = useState(false);
  const { loading, requestInvite } = useRequestInvite();
  const { setModalState, isModalOpen } = useModal();

  const closeModal = () => {
    setModalState(false);
  };

  const onSubmit = async (data: any) => {
    const { email, fullName } = data;
    const [isError, resp] = await requestInvite(fullName, email);

    if (!isError) {
      setFormCompleted(true);
    }

    const error = resp as ApiErrorMessage;
    setError("apiError", { message: error?.errorMessage || "" });
  };

  const clearApiErrors = useCallback(() => {
    if (errors.apiError) {
      clearErrors("apiError");
    }
  }, [clearErrors, errors.apiError]);

  return (
    <ReactModal
      ariaHideApp={false}
      className={styles.modal}
      style={customStyles}
      isOpen={isModalOpen}
      contentLabel="Minimal Modal Example"
      onRequestClose={closeModal}
    >
      {formCompleted ? (
        <RequestInviteCompletion />
      ) : (
        <form
          className={styles.emailNameForm}
          onSubmit={handleSubmit(onSubmit)}
        >
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
              onChange: () => {
                clearApiErrors();
              },
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
              onChange: () => {
                clearApiErrors();
              },
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

          <FormError errors={errors} name="apiError" />

          {loading ? (
            <Waveform />
          ) : (
            <button type="submit" className={styles.submitButton}>
              <span className={styles.submitButtonText}>Send</span>
            </button>
          )}
        </form>
      )}
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
