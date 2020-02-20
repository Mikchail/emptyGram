<template>
	<div id="main">


		<Header/>
		<div class="container">

			<div class="spiner">
				<Spiner v-if="loading"/>
			</div>
			<div class="div">
			<b-alert
				:show="!!getError"
				dismissible
				variant="warning"
			>{{getError}}
			</b-alert>
			<b-alert
				:show="!!getSuccess"
				dismissible
				variant="success"
			>{{getSuccess}}
			</b-alert>
				</div>
			<router-view></router-view>
		</div>
	</div>
</template>
<!--getUser-->
<script>
	import Header from '@/components/Header'
	import Spiner from '@/components/Spiner'


	export default {
		data() {
			return {
				drawer: false,
				dismissSecs: 10,
				dismissCountDown: 0,
				showDismissibleAlert: false
			};
		},
		components: {
			Header,
			Spiner
		},
		methods: {

			countDownChanged(dismissCountDown) {
				this.dismissCountDown = dismissCountDown
			},
			showAlert() {
				this.dismissCountDown = this.dismissSecs
			}
		},
		computed: {

			getError() {
				return this.$store.getters.error;
			},
			getSuccess() {
				return this.$store.getters.success;
			},
			loading() {
				return this.$store.getters.loading;
			},

		},
		async beforeCreate() {
			//либо this.(getUserData)
			// подключить import {mapGetters, mapActions} from "vuex";
			// и добавить mapGetters в computed mapActions в methods
			// await this.$store.dispatch('getUserData')
			// 	.then(() => {
			// 	})
			// 	.catch(() => {
			// 	});
		},

	}
</script>


<style lang="scss">


	.spiner {
		padding: 10px;
		min-height: 50px;
	}

	#main {
		background-color: #ffe8e6;
		min-height: 100vh;
	}


</style>
