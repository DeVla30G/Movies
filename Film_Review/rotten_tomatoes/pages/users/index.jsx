import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Link } from "../../components/Link";
import { Spinner } from "../../components/Spinner";

import { userService} from "../../services/user.service";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const [comments, setComments] = useState(null);
  const router = useRouter();

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
    // commentService.getAll().then((x) => setComments(x));
  }, []);

  if (userService.userValue?.data.role =="0") {
    router.push({
      pathname: "/",
    });
  }

  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }
  function deleteComment(id) {
    setComments(
      comments.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    commentService.delete(id).then(() => {
      setComments((comments) => comments.filter((x) => x.id !== id));
    });
  }

  return (
 <>
      <h1>Users</h1>
      <Link href="/users/add" className="btn btn-sm btn-success mb-2">
        Add User
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Role</th>

          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/users/edit/${user.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    disabled={user.isDeleting}
                  >
                    {user.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {users && !users.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Users To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </>
  );
}
