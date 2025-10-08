import React from 'react'
import TaskCard from './TaskCard';
import EmptyTask from './EmptyTask';



const TaskList = ({filteredTasks, filter, handleTaskChanged}) => {
  if(!filteredTasks || filteredTasks.length === 0)
  {
    return <EmptyTask filter={filter}/>;
  }
  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (

      <TaskCard
        key={task.id ?? index}
        task={task} 
        index={index}
        handleTaskChanged={handleTaskChanged}
        /> 
      ))}

    </div>
  );
};

export default TaskList;