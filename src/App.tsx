import Inputs from "./components/ui/inputs";
import { Button } from "./components/ui/button";
import { DeleteIcon } from "lucide-react";
import { Checkbox } from "./components/ui/checkbox";
import { use, useEffect, useState } from "react";

interface Task {
  id: number;
  task: string;
  completed: boolean;
}
function App() {
  const [task, setTask] = useState<Task[]>(
    JSON.parse(localStorage.getItem("task") ?? "[]")
  );
  const [inp, setInp] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(task);
  const handlecheck = (id: number) => {
    const newTask: Task[] = task.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    localStorage.setItem("task", JSON.stringify(newTask));
    setTask(newTask);
  };

  const handleDelete = (id: number) => {
    console.log(id);
    const newTask: Task[] = task.filter((item) => item.id !== id);
    localStorage.setItem("task", JSON.stringify(newTask));
    setTask(newTask);
  };
  useEffect(()=>{
   const Timer =  setTimeout(() => {
      setSearch(inp);
      
    }, 300);
    return ()=>clearTimeout(Timer);
  },[inp])
  useEffect(()=>{
    const filteredTasks = task.filter((item) =>
        item.task.toLowerCase().includes(inp.toLowerCase())
      );
      setFilteredTasks(filteredTasks);
      if (inp.length <= 0) {
        setFilteredTasks(task);
      }
  },[search])

  const addList = () => {
    if (inp.trim().length <= 0) return 0;
    const inputTask = {
      id: Date.now(),
      task: inp,
      completed: false,
    };
    if (task.length > 0) {
      task.map((item) => {
        if (item.task === inp) {
          alert("Task already exists");
          setInp("");
          console.log("Task already exists");
          return 0;
        } else {
          localStorage.setItem("task", JSON.stringify([...task, inputTask]));
          setTask((prev) => [...prev, inputTask]);
          setInp("");
          console.log("Task added");
        }
      });
    } else {
      localStorage.setItem("task", JSON.stringify([inputTask]));
      setTask((prev) => [...prev, inputTask]);
      setInp("");
    }
  };
  return (
    <>
      <div className="flex justify-center  items-center flex-col gap-y-2">
        <h1>TODO LIST</h1>
        <div className="flex justify-center items-center w-96 gap-x-2">
          <Inputs
            placeholder="Search"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />
         
          
          <Button onClick={addList}>add</Button>
        </div>
        
        {filteredTasks ? filteredTasks.map((item: any) => (
        <div
            key={item.id}
            className="flex flex-row justify-start items-center gap-x-1.5"
          >
            <Checkbox
              checked={item.completed}
              className=""
              onClick={() => handlecheck(item.id)}
            />
            <p
              className={` w-56 ${
                item.completed ? "text-decoration-line-through" : ""
              }`}
            >
              {item.task}
            </p>
            <Button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500"
            >
              <DeleteIcon />
            </Button>
          </div>
        )):
        task.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-row justify-start items-center gap-x-1.5"
          >
            <Checkbox
              checked={item.completed}
              className=""
              onClick={() => handlecheck(item.id)}
            />
            <p
              className={` w-56 ${
                item.completed ? "text-decoration-line-through" : ""
              }`}
            >
              {item.task}
            </p>
            <Button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500"
            >
              <DeleteIcon />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
