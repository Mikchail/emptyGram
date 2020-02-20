<template>

	<div class="container">

				<h1 class="title">Посты</h1>

		<Posts/>

	</div>
</template>

<script>
	import Posts from '@/components/Posts/Posts'


	export default {
		data (){
			return{

			}
		},
		components:{
			Posts
		},
	}

</script>
<style lang="scss" scoped>
	.container{

	}
</style>
