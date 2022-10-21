import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/actions/taskActions";
import moment from "moment";
import UpdateTask from "./updateTask";
import trash from "../../assets/images/trash-can.png";
import check from "../../assets/images/check-mark.png";
import cross from "../../assets/images/close.png";
import Started from "./Start";
import Completed from "./Completed";

const ListAllTasks = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.taskReducer.tasks);

  return (
    <div>
      {/* <h1 className="display-6">All tasks</h1> */}
      <h1>All tasks</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Completed</th>
            <th scope="col">Created AT</th>
            <th scope="col">Task</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {allTasks.map((task) => {
            return (
              <tr key={task._id}>
                {task.status === "completed" ? (
                  <td>
                    <img
                      alt="complete icon"
                      src={check}
                      style={{ width: 20 }}
                    ></img>
                  </td>
                ) : (
                  <td>
                    <img
                      alt="incomplete icon"
                      src={cross}
                      style={{ width: 20 }}
                    ></img>
                  </td>
                )}
                <td>{moment(task.createdAt).format("hh:mma")}</td>
                <td>{task.text}</td>
                <td>
                  <UpdateTask task={task} />
                </td>
                <td>
                  {" "}
                  <img
                    alt="delete"
                    onClick={() => dispatch(deleteTask(task._id))}
                    src={trash}
                    style={{ width: 25, cursor: "pointer" }}
                  ></img>
                </td>
                {task.status === "pending" ? (
                  <td>{<Started id={task._id} />}</td>
                ) : task.status === "started" ? (
                  <td>
                    <Completed id={task._id} />
                  </td>
                ) : (
                  <td>
                    <button className="btn btn-secondary">completed</button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListAllTasks;
