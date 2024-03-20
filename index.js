const app=require("./app");
const PORT=2000;

const startapp=()=>{
  app.listen(PORT || 2000,()=>{
    console.log('Auth Backend running on port ',`${PORT}`);
  })
};

startapp();