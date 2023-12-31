const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user:{},
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			login:(email,password) => {
				const user = {
					email:email,
					password:password
				}
				fetch(process.env.BACKEND_URL + "/api/login",{
					method:"POST",
					headers:{"Content-Type": "application/json"},
					body:JSON.stringify(user)
		
				  })
				  .then((response) => response.json())
				  .then((result)=> getActions().protected(result.access_token))
				  .catch(error => console.log('error', error));
			   },
			   

		 protected:(token) => {

			fetch(process.env.BACKEND_URL + "/api/protected",{
			method: "GET",
			headers: {
				Authorization:`Bearer ${token}`
			}

			})
			.then((response) => response.json())
		    .then(result => setStore({user:result}))
		    .catch(error => ('error', error));

			
		},
		logout:() =>{
		setStore({user:{}})	
		},
				
         signup:(email,password) =>{
			const user = {
				email:email,
				password:password
			}
           fetch(process.env.BACKEND_URL + "/api/signup",{
			method:"POST",
			headers:{"Content-Type": "application/json"},
			body:JSON.stringify(user)
			
		})
		.then((response) => response.json())
		.then((result) => setStore({user:result}))
		.catch(error => console.log('error', error));
			
		 },
		
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
