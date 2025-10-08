import React from 'react'

const Footer = ({ completedTaskCount = 2, activeTaskCount = 3 }) => {
   return (
   <>
  {activeTaskCount + completedTaskCount > 0 && (
    <div className="text-center">
      <p className="text-sm text-muted-foreground">
        {completedTaskCount > 0 &&(
          <>
            Tốt lắm! Bạn đã hoàn thành {completedTaskCount} 
            {activeTaskCount > 0 && 
            ` còn ${activeTaskCount} việc cần làm. cố gắng nào!`}
          </>
        )}
        {completedTaskCount === 0 && activeTaskCount > 0 && (
          <>
            Hãy bắt đầu làm {activeTaskCount} việc thôi Bro
          </>
        )}
      </p>
    </div>
    )}
  </>

  ); 
};

export default Footer;