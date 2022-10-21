//redux imports;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

//my imoprts;

import './SideBar.css'
import { getAllProTasks, addTaskToProject } from "../../store/actions/projectActions";
import { deleteTask } from "../../store/actions/projectActions";
import ProjectInput from "../projectComponents/ProjectInput";
import check from "../../assets/images/check-mark.png";
import cross from "../../assets/images/close.png";
import trash from "../../assets/images/trash-can.png";
import Started from "../projectComponents/Start";
import Completed from "../projectComponents/Completed";
import UpdateTask from "../projectComponents/updateTask";
//sidebar component;

const SideBar = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [selected, setSelected] = useState("");
  const [addT, setAddT] = useState(false);
  const [addP, setAddP] = useState(false);

  const projects = useSelector((state) => state.projectReducer.projects);
  const tasks = useSelector((state) => state.projectReducer.tasks);
  const dispatch = useDispatch();
  const firstProject = projects[0];
  console.log(firstProject);
  // useEffect(() => {
  //   setSelected(firstProject._id);
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTaskToProject(selected, text));
    setText("");
    setAddT(false);
  };

  return (
    <div  className="container-fluid">
      <div  className="row">
        <div
        id="bgcolor"
          style={{ width: 200 }}
          className="sideBarTextColor col-md-4 col-auto side__bar"
        >
            <h3>Projects</h3>
            <hr className="hrColor"></hr>
          <ul>
            {projects.map((project) => {
              return (
                <li                
                cursor="pointer"
                  key={project._id}
                  onClick={() => {
                    setSelected(project._id);
                    dispatch(getAllProTasks(project._id));
                  }}
                >
                  <a style={{cursor: "pointer"}} className="nav-link px-2">{project.text}</a>
                </li>
              );
            })}
          </ul>
          <ProjectInput addP={addP} setAddP={setAddP}/>
        </div>
        <div className="col-md-8" style={{padding: 80}}>
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
          {tasks.map((task) => {
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
       
        {addT ? (
          <form onSubmit={handleSubmit}>
            <input className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter Task"
            />
            <br />
            <button onClick={handleSubmit} className="btn btn-secondary">Add</button>
          </form>
        ) : (
          <button onClick={() => setAddT(true)} type="button" className="btn btn-outline-primary" data-mdb-ripple-color="dark">Add</button>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default SideBar;
