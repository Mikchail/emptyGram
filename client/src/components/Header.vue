<template>
	<nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
		<div class="container">
			<a class="navbar-brand" href="/">EmptyGram</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
          <template v-if="islogin">
					<li class="nav-item">
						<router-link class="nav-link" to="/allposts">
							<i class="fa fa-globe"></i>
							All Posts
						</router-link>
					</li>
					<li class="nav-item">
						<!-- <router-link class="nav-link" to="/feed">
							<i class="fa fa-rss"></i>
							Feed
						</router-link> -->
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/admin">
							<i class="fa fa-rss"></i>
							Add post
						</router-link>
					</li>
          </template>
				</ul>
				<ul class="navbar-nav">

					<template v-if="islogin">
						<li class="nav-item dropdown">
							<b-nav-item-dropdown :text="this.$store.getters.getUser.name" right>
								<b-dropdown-item to="/user">Account</b-dropdown-item>
								<b-dropdown-item @click="logout">logout</b-dropdown-item>
							</b-nav-item-dropdown>
						</li>
					</template>

					<template v-if="!islogin">
						<li class="nav-item">
							<!--							<a class="nav-link" @click="logout">-->
							<router-link class="nav-link" to="/login">
								<i class="fa fa-sign-in"></i>
								Log In
							</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/registration">
								<i class="fa fa-user-plus"></i>
								Register
							</router-link>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>


</template>

<script>
	export default {
		computed: {
			getUser() {
				return this.$store.getters.getUser;
			},
			getError() {
				return this.$store.getters.error;
			},
			islogin() {
				return this.$store.getters.getUser;

			}
		},

		methods: {
			logout: function (e) {
				this.$store.dispatch('logout').then(() => {
					this.$router.push('/')
				}).catch()
			},
		}
	}
</script>

<style lang="scss">

	.header {
		padding: 40px 0;
		background-color: rgb(59, 89, 152);
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05),
		inset 0 -1px 0 rgba(0, 0, 0, 0.1);
	}

	.nav {
		&__item {
			margin-right: 1px;
			align-self: flex-end;

			&:last-child {
				margin-left: auto;
			}
		}

		&__logout {
			border: 1px solid #b0c6f5;
			color: #b0c6f5;

			&:hover {
				border: 1px solid #c3f79c;
				color: #c3f79c;
			}
		}

		&__link {
			display: block;
			height: 100%;
			position: relative;
			padding: 0;
			padding-bottom: 3px;
			color: #b0c6f5;
			transition: color 0.3s ease;
			font-size: 18px;

			&::before {
				content: "";
				position: absolute;
				width: 100%;
				height: 2px;
				background-color: #b0c6f5;
				bottom: 0;
				left: 0;
				transition: background-color 0.3s ease;
			}

			&:hover {
				text-decoration: none;
				color: #c3f79c;

				&::before {
					background-color: #c3f79c;
				}
			}
		}

		.active {
			a {
				color: #c3f79c;

				&::before {
					background-color: #c3f79c;
				}
			}
		}

	}

	.home-link {
		display: block;
	}
</style>
