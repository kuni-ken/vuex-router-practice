function get(url, params){
  console.log(url, params);
  return new Promise((resolve, reject) => {
    setInterval(() => {
      try{
        resolve()
      }catch(e){
        reject(e);
      }
    }, 1000);
  });
}

function post(url, params){
  console.log(url, params);
  return new Promise((resolve, reject) => {
    setInterval(() => {
      try{
        resolve()
      }catch(e){
        reject(e);
      }
    }, 1000);
  });
}

export default { get, post }
