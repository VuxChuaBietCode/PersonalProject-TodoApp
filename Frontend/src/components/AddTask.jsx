import React from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import api from '@/lib/axios'

const AddTask = ({handleNewTaskAdded}) => {
 const [newTaskTitle, setNewTaskTitle] = useState("");
 const addTask = async() => {
  if(newTaskTitle.trim()){
    try{
      await api.post("/tasks", { title: newTaskTitle});
      toast.success(`Công việc ${newTaskTitle} đã được thêm!`);
      handleNewTaskAdded();
    }catch(error){
        console.error("Lỗi khi thêm task", error);
        toast.error("Lỗi khi thêm task. Vui lòng thử lại.");
    }
    setNewTaskTitle("");
  }else{
    toast.error("Hãy nhập nội dung công việc của bạn!")
  }
 };


 const handleKeyPress = (event) => {
  if(event.key === "Enter"){
    addTask();
  }
}

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custon-lg">
     <div className="flex flex-col gap-3 sm:flex-row">
       <Input
         type=" text"
         placeholder=" Nhập tên công việc cần thêm..."
         className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress= {handleKeyPress}
       />
      <Button 
        variant="gradient"
        size= "xl"
        className="px-6"
        onClick={addTask}
        disabled={!newTaskTitle.trim()}
        >
        <Plus className="size-5"/>
        Thêm 
      </Button>
     </div>
    </Card>
  )
}

export default AddTask;