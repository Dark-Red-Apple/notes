// This code is taken from codepen 
// This code needs babel and script tag and <script type="text/babel">

const useState = React.useState
const useEffect = React.useEffect

function AddPetForm(props){
  
  const [name, setName] = useState()
   const [species, setSpecies] = useState()
   const [age, setAge] = useState()

  function handleSubmit(e){
    //by deafult the browser is going to referesh the page. It's javascript
    e.preventDefault();
    // since the name of the value and key are the same just write one
    props.setPets(prev => prev.concat({name, species, age, id: Date.now()}))
    setName("")
    setSpecies("")
    setAge("")
    
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        <input value = {name} onChange ={e => setName(e.target.value)} placeholder="Name" />&nbsp;
        <input value = {species} onChange ={e => setSpecies(e.target.value)} placeholder="Species" />&nbsp;
        <input value = {age} onChange ={e => setAge(e.target.value)} placeholder="Age In Years" />&nbsp;
        <button>Add Pet</button>
      </fieldset>
    </form>
    
  )
}

function OurApp(){
// const [pets,setPets] = useState([
// { name: "Meowsalot", species: "cat", age: "5", id: 456486953},
// { name: "Barksalot", species: "dog", age: "3", id: 456490456 },
// {name: "Fluffy", species: "rabbit", age: "2", id: 456856456},
// {name: "Purrsloud", species: "cat", age: "1", id: 456456456},
// {name: "Paws", species: "dog", age: "6", id: 789789789 }])

  const [pets,setPets] = useState([])
  
  // only run once the first time this componet is rendered
  useEffect(()=>{
    if (localStorage.getItem("examplePetData"))
      setPets(JSON.parse(localStorage.getItem("examplePetData")))
  }, [])
  // run every time our pet state changes
  useEffect(()=>{

    localStorage.setItem("examplePetData", JSON.stringify(pets)  )
  }, [pets])
  
	return (
	<>
		<OurHeader />
    <TimeArea />
    <AddPetForm setPets={setPets} />
		<ul>
      {pets.map(pet=> <Pet setPets={setPets} id = {pet.id} name={pet.name} species={pet.species} age={pet.age} key={pet.id} /> )}
		</ul>
	</>
)}

function Pet(props){
  function handleDelete (){
    props.setPets(prev => prev.filter(pet => pet.id != props.id))
  }
	return (
    <li> The pet's name is <bold>{props.name}</bold> and is a {props.species} and is {props.age} years old. 
      &nbsp;<button onClick = {handleDelete}>Delete</button>
    </li>

)}

function TimeArea(){
  const [theTime, setTheTime] = useState(new Date().toLocaleString())
  
  // we don't want ongoing number of intervals going since if the state changes the 
  useEffect(()=>{
   const inteval = setInterval(()=> setTheTime(new Date().toLocaleString()), 1000)
   return () => clearInterval(interval)
  },[])
  
  return <p>The current Time is {theTime}. </p>
}

function OurHeader(){
	return 
	<>
    <h1 style={{color: red}}>This page has</h1>
	</>
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(React.createElement(OurApp))

