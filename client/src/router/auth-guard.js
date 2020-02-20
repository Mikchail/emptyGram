import store from '../store'

export default async function(to,from,next){
	
	if(store.getters.getUser){
		next()
	}	else {
		next('/login?loginError=true')
	}



}
