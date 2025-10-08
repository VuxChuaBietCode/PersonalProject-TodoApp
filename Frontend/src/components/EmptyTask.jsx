import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'


const EmptyTask= ({filter}) => {
  return (
    <Card
        className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
            <div className="space-y-3">
                <Circle className="mx-auto size-12 text-muted-foreground"/>
                <div>
                    <h3 className="font-medium text-foreground">
                        {filter === "active"
                          ? "Không có nhiệm vụ đang thực hiện"
                          :filter === "completed"
                          ? "Không có nhiệm vụ đã hoàn thành."
                          : "Không có nhiệm vụ nào."}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        {filter === "all"
                        ? "Hãy thêm nhiệm vụ đầu tiên của bạn!"
                        : `Chuyển sang tab "tất cả" để thấy các nhiệm vụ cần làm ${
                            filter === "active" ? "đã hoàn thành." : "đang thực hiện."
                        }`}
                        
                        
                    </p>
                </div>
            </div>

    </Card>
  );
};

export default EmptyTask;