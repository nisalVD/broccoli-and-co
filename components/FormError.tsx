import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import styles from "./FormError.module.css";

interface Props {
  errors: ReturnType<typeof useForm>["formState"]["errors"];
  name: string;
}

const FormError: React.FC<Props> = ({ errors, name }) => {
  return (
    <div className={styles.container}>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className={styles.errorMessaging}>{message}</p>
        )}
      />
    </div>
  );
};

export default FormError;
