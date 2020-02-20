<template>
	<div>
		<b-jumbotron :header="getUser.name">
			<p>Email: {{getUser.email}}</p>
			<img class="avatar" :src="'http://127.0.0.1:3000/'+getUser.avatar"/>
			<br>
			<br>
			<b-button variant="primary" href="#">More Info</b-button>
		</b-jumbotron>


		<p>Загрузить аватарку</p>
		<form @submit.prevent="onSubmit" enctype="multipart/form-data">
			<input @change="processFile($event)" type="file">
			<b-button type="submit" variant="primary">Submit</b-button>
		</form>
	</div>
</template>
<script>
	import httpService from '../utils/httpService'
	import server from "../utils/server"
	const config = { headers: { 'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL' } }
	export default {
		data() {
			return {
				user: '',
				file: null
			}
		},
		computed: {
			getUser() {
				return this.$store.getters.getUser;
			},
		},
		methods: {
			processFile() {
				this.file = event.target.files[0]
			},

			onSubmit() {
				let formData = new FormData();
					formData.append('file', this.file);

				console.log(this.file)
				if (!this.file) return
				httpService.post('/avatar', formData, config)
					.then(res => console.log(res))
					.catch(e => console.log(e))
			}
		}

	}
</script>
<style>
	.avatar{
		max-width: 100px;
		max-height: 100px;
		min-width: 100px;
		min-height: 100px;
		border-radius: 50%;
		width: 100%;
		object-fit: cover;
	}
</style>
