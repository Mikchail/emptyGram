<template>
	<div class="container" @click="clearFields">
		
		<form class="form" v-on:submit.prevent="login">
      <h2 class="form__title">Login</h2>
			<p class="error-my" :v-model="errors.error">{{ errors.error }}</p>
			<p class="error-my" :v-model="errors.email">{{errors.email}}</p>
			<p>E-mail</p>
			<input type="text" @blur="$v.form.email.$touch()" name="email" v-model="form.email"/>
			<p class="error-my" :v-model="errors.password">{{errors.password}}</p>
			<p>Password</p>
			<input type="password" name="password" v-model="form.password"/>
			<button class="form__btn" type="submit" :disabled="$v.$invalid || loading">submit</button>
		</form>
	</div>
</template>

<script>
	import {required, email} from "vuelidate/lib/validators";

	export default {
		data() {
			return {
				form: {
					password: "",
					email: ""
				},
				errors: {
					password: "",
					email: "",
					error: ""
				}
			};
		},
		validations: {
			form: {
				email: {
					required,
					email,
					uniqEmail: function (v) {
						return true;
						//запрос к сервер что бы он проверил на уникальность
						// только для регистрации это лучше делать))
					}
				}
			}
		},

		methods: {
			login() {
				let data = {
					email: this.form.email,
					password: this.form.password
				};
				this.$store
					.dispatch("login", data)
					.then(() => this.$router.push("/"))
					.catch(() => {
					});

			},
			clearFields() {
				this.errors.password = "";
				this.errors.email = "";
				this.errors.error = "";
			}
		},
		mounted() {
		},
		computed: {
			loading() {
				return this.$store.getters.loading;
			}
		},
		created() {
			if(this.$route.query['loginError']){
				this.$store.dispatch('setError','Please log in to access this page ...')
			}
		}
	};
</script>
<style lang="scss" scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;

}
.form{
  max-width: 300px;
  width: 100%;
  &__title{
    text-align: center
  }
  &__btn{
  }
}
	p {
		padding: 0;
	}

	h1 {
		color: red;
		font-size: 55px;
	}

	input {
		display: block;
		width: 100%;
		max-width: 400px;
		border: 1px solid #ccc;
		padding: 5px;
		margin-bottom: 4px;
	}

	button {
		width: 100%;
		max-width: 400px;
		margin-top: 20px;
		border: 1px solid antiquewhite;
		padding: 10px;
		background-color: black;
		color: white;
		transition: background-color 0.3s ease, color 0.3s ease;

		&:hover {
			background-color: azure;
			color: black;
		}
	}
</style>
