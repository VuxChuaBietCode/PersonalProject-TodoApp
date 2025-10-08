import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StartAndFilters from "@/components/StartAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter"; 
import Footer from "@/components/Footer";
import React, {useState, useEffect } from "react";
import  {toast}  from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";



const HomePage = () => {
const [taskBuffer, setTaskBuffer] = useState([]);
const [activeTaskCount, setactiveTaskCount] = useState(0);
const [completeTaskCount, setcompleteTaskCount] = useState(0);
const [filter, setFilter] = useState("all");
const [dateQuery, setDateQuery] = useState("today");
const [page, setPage] = useState(1);

useEffect(() => {
  fetchTasks();
}, [dateQuery]);

const fetchTasks = async () => {
  try{
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setactiveTaskCount(res.data.activeCount);
      setcompleteTaskCount(res.data.completeCount);
  }catch(error){
  console.error("Lỗi xảy ra khi truy xuất", error);
  toast.error("Lỗi xảy ra khi truy xuất tasks.");
  };
};

const handleTaskChanged = () => {
  fetchTasks();
};

const handleNext = () => {

  if (page < totalPages) {
    setPage((prev) => prev + 1);
  };
}

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //biến lọc
const filteredTasks =  taskBuffer.filter(task => {
  switch (filter) {
    case "active":
      return task.status === "active";
    case "completed":
      return task.status === "complete";
    default:
      return true;
 };
    });


const visibleTasks = filteredTasks.slice(
  (page - 1) *  visibleTaskLimit,
  page * visibleTaskLimit
);

if(visibleTasks.length === 0 ) {
  handlePrev();
}

const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);


  return (


<div className="min-h-screen w-full relative bg-white">
  {/* Soft Green Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at center, #8FFFB0, transparent)
      `,
    }}
  />
     {/* Your Content/Components */}



    <div className="container pt-8 mx-auto relative z-10">
      <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
        {/* Header */}
        <Header />

        {/* Thêm công việc */}
        <AddTask handleNewTaskAdded={handleTaskChanged}/>

        {/* Bộ lọc */}
        <StartAndFilters 
        filter = {filter}
        setFilter = {setFilter}
        activeTaskCount={activeTaskCount}
        completeTaskCount={completeTaskCount}
        />
      

        {/* Danh sách nhiệm vụ */}
        <TaskList 
        filteredTasks = {visibleTasks}
        filter={filter}
        handleTaskChanged={handleTaskChanged}
         />

        {/* Phân trang và lọc theo ngày */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <TaskListPagination 
          handleNext={handleNext}
          handlePrev={handlePrev}
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
          />
          <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
        </div>

        {/* Footer */}
        <Footer 
         activeTaskCount={activeTaskCount}
          completedTaskCount={completeTaskCount}
        />
      </div>
    </div>
  </div>
  );
};

export default HomePage;
