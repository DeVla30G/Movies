import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "../Link";
import { userService } from "../../services/user.service";
import { alertService } from "../../services/alert.service";

export { AddEdit };

function AddEdit(props) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    email: Yup.string().required("Email is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(isAddMode ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.user;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(user.id, data);
  }

  function createUser(data) {
    return userService
      .register(data)
      .then(() => {
        alertService.success("User added", { keepAfterRouteChange: true });
        router.push("/users");
      })
      .catch(alertService.error);
  }

  function updateUser(id, data) {
    return userService
      .update(id, data)
      .then(() => {
        alertService.success("User updated", { keepAfterRouteChange: true });
        router.push("/profile");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col">
          <label>Firstname</label>
          <input
            name="firstname"
            type="text"
            {...register("firstname")}
            className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.firstname?.message}</div>
        </div>
        <div className="form-group col">
          <label>Lastname</label>
          <input
            name="lastname"
            type="text"
            {...register("lastname")}
            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>
        <div className="form-group col">
          <label>Email</label>
          <input
            name="email"
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email ?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <label>
            Password
            {!isAddMode && (
              <em className="ml-1">(Leave blank to keep the same password)</em>
            )}
          </label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <label>Role</label>
          <input
            name="role"
            type="text"
            {...register("role")}
            className={`form-control ${errors.role ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.role?.message}</div>

        </div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary mr-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
        <Link href="/users" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
