<template>
	<div class="container">

				<h1>Добавить пост</h1>
<!--				<h2 :v-model="name">Hello {{name | upperCase()}}</h2>-->
				<AddPosts/>

	</div>
</template>
<script>
	import AddPosts from "@/components/Posts/AddPosts"
	export default {
		name: "Login",
		data() {
			return {
				name: ""

			}
		},
		components:{
			AddPosts
		},
		methods: {

		},
		created() {
			// this.getUserData()

		},
		filters: {
			upperCase(value) {
				if (!value) return '';
				value = value.toString();
				return value.charAt(0).toUpperCase() + value.slice(1)
			}
		},


	}
</script>
