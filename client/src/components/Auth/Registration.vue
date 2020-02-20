<template>
	<div class="container">

		<form class="form" v-on:submit.prevent="registration">
		<h2 class="form__title">Registration</h2>

			<p :v-model="error">{{error}}</p>
			<p>Name</p>
			<input v-model="name" type="text" name="name"/>
			<!--			<p >{{name}}</p>-->
			<p>E-mail</p>
			<input v-model="email" type="text" name="email"/>
			<!--			<p >{{email}}</p>-->
			<p>Password</p>
			<input v-model="password" type="password" name="password"/>
			<!--			<p>{{password}}</p>-->
			<p>Secret key</p>
			<input type="text" v-model="secretkey" name="secretkey"/>

			<button :loading="loading" :disabled="loading" type="submit">submit</button>
		</form>

	</div>
</template>

<script>
	import axios from "axios";
	import httpServices from "../../utils/httpService"
	import router from "../../router";

	export default {
		data() {
			return {
				error: '',
				password: '',
				email: '',
				name: '',
				secretkey: '',
			};
		},
		computed: {
			loading() {
				return this.$store.getters.loading;
			}
		},
		methods: {
			registration() {
				let data = {
					email: this.email,
					password: this.password,
					name: this.name,
					secretkey: this.secretkey
				};

				this.$store
					.dispatch("registration", data)
					.then(() => {
						this.$router.push("/")
					})
					.catch(() => {

					});
			},
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
		margin: 0;
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
		transition: background-color 0.3s ease,
		color 0.3s ease;

		&:hover {
			background-color: azure;
			color: black;
		}
	}
</style>
