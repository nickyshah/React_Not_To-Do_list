
import { useState } from 'react';
import './App.css';

function App() {
  const [form, SetForm] = useState({})
  const [taskList, setTaskList] = useState([])
  const [ttlHrs, setTtlHrs] = useState(0)

  const totalHrs = taskList.reduce((acc, item) => acc + +item.hr, 0)

  const hoursWeek = 168

  const handleOnChange = (e) => {
    // console.log(e);
    const { name, value } = e.target

    SetForm({
      ...form,
      [name]: value
    })
    // const obj = {
    //   // task: "coding",
    //   // hr: "33"
    //   [name] = value,
    // }

  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (totalHrs + +form.hr > hoursWeek){
      return alert ("Sorry boss You can't add any more task")
    }
    const obj = {
      ...form,
      type: "entry",
      id: randomStr()
    }

    setTaskList([
      ...taskList, obj])
  }

  const randomStr = () => {
    const charLength = 6
    const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"

    let id = ""
    for (let i = 0; i < charLength; i++) {
      const randNum = Math.round(Math.random() * (str.length - 1))
      id += str[randNum]
    }
    return id
  }
  // console.log(taskList)

  const handleOnDelete = (id) => {
    if (window.confirm("Are You Sure Want To Delete? ")){

      // filter 
      const filterArg = taskList.filter((item) => item.id !== id)
      setTaskList(filterArg)

    }

  }

  const switchTask = (id, type) => {
    const arg = taskList.map((item) => {
      if(item.id=== id){
        return{
          ...item, 
          type,
        }
      }
      return item
    })
    setTaskList(arg)
  }
const entry = taskList.filter(item => item.type=== "entry")
const bad = taskList.filter(item => item.type=== "bad")

const total = () => {
  const ttl = taskList.reduce((acc, item) => acc + +item.hr, 0)
  // console.log(acc, item)
   return setTtlHrs(ttl)
  // console.log(setTtlHrs(ttl));
}


return (
  <div className="wrapper">

    <div className="container">
      {/* <!-- Top Title --> */}
      <div className="row gap-2">
        <div className="col mt-5 text-center">
          <h1>Not to do list</h1>
        </div>

      </div>




      {/* <!-- form --> */}
      <form action="javascript:void(0)" onSubmit={handleOnSubmit} className="mt-5 border p-4 rounded shadow-lg bg-transparent ">
        <div className="row  g-2" >
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Coding.." aria-label="First name" name="task" onChange={handleOnChange} />
          </div>
          <div className="col-md-3">
            <input type="number" min="1" className="form-control" placeholder="00.00" aria-label="Last name" name="hr" required onChange={handleOnChange} />
          </div>
          <div className="col-md-3">
            <div className="d-grid">
              <button className="btn btn-primary">Add task</button>
            </div>
          </div>

        </div>
      </form>
      {/* <!-- Table area  --> */}
      <div className="row mt-5 pt-2">
        {/* <!-- Entry List  --> */}
        <div className="col-md">
          <h3 className="text-center">Task Entry List</h3>
          <hr />
          <table className="table table-striped table-hover border ">
            <tbody id="entry">
              {
                entry.map((item, i) =>
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.task}</td>
                    <td>{item.hr}hr</td>
                    <td className="text-end">
                      <button
                        onClick={() => handleOnDelete(item.id)}
                        className="btn btn-danger"><i className="fa-solid fa-trash"></i>
                      </button>
                      <button onClick={() => switchTask(item.id, "bad")} className="btn btn-success"><i className="fa-solid fa-arrow-right"></i>
                      </button>

                    </td>
                  </tr>
                  // console.log(item, i)
                )
              }
            </tbody>
          </table>
        </div>


        {/* <!-- Bad List --> */}
        <div className="col-md">
          <h3 className="text-center">Bad list</h3>
          <hr />
          <table className="table table-striped table-hover border ">
            <tbody id="bad">
            {
                bad.map((item, i) =>
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.task}</td>
                    <td>{item.hr}hr</td>
                    <td className="text-end g-2" >
                    <button onClick={() => switchTask(item.id, "entry")} className="btn btn-warning"><i className="fa-solid fa-arrow-left"></i>
                      </button>
                      <button
                        onClick={() => handleOnDelete(item.id)}
                        className="btn btn-danger"><i className="fa-solid fa-trash"></i>
                      </button>
                      

                    </td>
                  </tr>
                  // console.log(item, i)
                )
              }
            </tbody>
          </table>
          <div className="alert alert-info" >You could have saved = <span id="badHr">{bad.reduce((acc, item) =>acc + +item.hr, 0)}</span>hr</div>
        </div>
      </div>

      {/* <!-- Total Time allocated --> */}
      <div className="alert alert-info" >
        Total hrs per week allocated = <span id="totalHr" >{
          totalHrs
        }</span>hr
      </div>
    </div>
  </div>





);
}

export default App;
