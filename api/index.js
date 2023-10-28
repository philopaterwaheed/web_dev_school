const express  = require ('express')
const app = express() ; // object :
app.use(express.json());

let users = [
	{id : 1 , email: 'email1@email'},
	{id : 2 , email: 'email2@email'},
	{id : 3 , email: 'email3@email'},
	{id : 4 , email: 'email4@email'},
];
app.get('/',(req , res)=>{ // when acessing the rout of tqhe website
	res.send('eello world ')

});

// app.get ('/api/users', (req, res)=> {
// 	res.send(users);
// });


// app.get ('/api/users/:id', (req, res)=> {
// 	// res.send(req.query); ; // to )get parameter
// 	// res.send(req.params.id) ; // to )get parameter
// 	let usesr_by_id = users.find(c => c.id === parseInt(req.params.id));
// 	let usesr_by_email = users.find(c => c.name === (req.params.name));
// 		if (!usesr_by_id || !usesr_by_email) // 404
// 			res.status(404).send('No users like that ');
// 		res.send(usesr_by_id);
//
// });


app.get ('/api/users', (req, res)=> {
 const filters = req.query; 
  const filteredUsers = users.filter(user => { 
    let isValid = true; 
    for (key in filters) { 
      console.log(key, user[key], filters[key]); 
      isValid = isValid && user[key] == filters[key]; 
    } 
    return isValid; 
  }); 
  res.send(filteredUsers); 
}); 
app.post ('/api/users/', (req, res)=> {
	const userIndex = users.findIndex(user => user.email == req.body.email);
	if (!req.body.email || req.body.email.length < 3 || userIndex !== -1 ){
		res.status(400).send('not valid');
		return;
	}
	const user = {
		id : req.body.id, 
		email : req.body.email 
	}
	users.push(user);
	res.send(user);
	

});

app.delete ('/api/users/:id', (req, res)=> {
	const userId = parseInt(req.params.id);
	  const userIndex = users.findIndex(user => user.id === userId);

	  // If user is found, remove it from the array
	  if (userIndex !== -1) {
	    users.splice(userIndex, 1);
	    res.status(200).json({ message: 'User deleted successfully' });
	  } else {
	    res.status(404).json({ message: 'User not found' });
	  }
	res.send(users);
});
app.listen(3000, ()=> console.log('entered node') )
