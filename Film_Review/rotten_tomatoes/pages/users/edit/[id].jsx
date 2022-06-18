import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { AddEdit } from "../../../components/users/AddEdit";
import { Spinner } from "../../../components/Spinner";
import { userService } from "../../../services/user.service";
import { alertService } from "../../../services/alert.service";

export default Edit;

function Edit({ id }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  /* if (!userService.userValue || userService.userValue?.role === "user" && userService.userValue?.id !== parseInt(id)) {
    router.push({
      pathname: "/",
    });
  }*/

  useEffect(() => {
    // fetch user and set default form values if in edit mode
    userService
      .getById(id)
      .then((x) => setUser(x))
      .catch(alertService.error);

  }, []);

  return (

    <div className="p-4" >
    <div className="container">
      <h1>Edit User</h1>
      {user ? <AddEdit user={user} /> : <Spinner />}
      </div>
        </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
